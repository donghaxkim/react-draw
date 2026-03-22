// packages/cli/src/generate.ts
// Phase 2B: AI-powered code generation from visual annotations
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import type { SerializedAnnotations, FileChange, GenerateStage } from "@sketch-ui/shared";

interface GenerateOptions {
  annotations: SerializedAnnotations;
  apiKey: string;
  projectRoot: string;
  onProgress: (stage: GenerateStage, message: string) => void;
}

export interface UndoFileEntry {
  filePath: string;
  content: string;
}

interface GenerateResult {
  success: boolean;
  changes: FileChange[];
  undoEntries: UndoFileEntry[];
  error?: string;
}

/**
 * Collect all unique file paths referenced in the annotations.
 */
function getReferencedFiles(annotations: SerializedAnnotations): string[] {
  const files = new Set<string>();

  for (const move of annotations.moves) {
    if (move.file) files.add(move.file);
  }
  for (const ann of annotations.annotations) {
    if (ann.startFile) files.add(ann.startFile);
    if (ann.targetFile) files.add(ann.targetFile);
  }
  for (const cc of annotations.colorChanges) {
    if (cc.file) files.add(cc.file);
  }

  return Array.from(files);
}

/**
 * Read source files and return a map of filePath → content.
 * Paths are resolved relative to projectRoot if not absolute.
 */
function readSourceFiles(
  filePaths: string[],
  projectRoot: string,
): Map<string, string> {
  const sources = new Map<string, string>();

  for (const fp of filePaths) {
    const resolved = path.isAbsolute(fp) ? fp : path.resolve(projectRoot, fp);
    try {
      const content = fs.readFileSync(resolved, "utf-8");
      sources.set(fp, content);
    } catch {
      // File might not exist or be unreadable — skip
      console.warn(`[SketchUI] Could not read source file: ${fp}`);
    }
  }

  return sources;
}

/**
 * Build the prompt for Claude, including annotations and source files.
 */
function buildPrompt(
  annotations: SerializedAnnotations,
  sources: Map<string, string>,
): string {
  let prompt = `You are a frontend code modifier for a React application using Tailwind CSS.

The user has made visual changes using a design overlay tool. Your job is to modify the source code to implement these changes.

## Rules
- Only modify the files referenced in the annotations
- Use Tailwind CSS classes (not inline styles) for styling changes
- Preserve the existing code structure — only change what the annotations specify
- Return the COMPLETE modified file contents (not diffs)
- If an annotation is ambiguous, make a reasonable interpretation

## User's Visual Changes

`;

  // Moves
  if (annotations.moves.length > 0) {
    prompt += `### Component Moves\n`;
    for (const move of annotations.moves) {
      prompt += `- **${move.component}** (${move.file}:${move.line}): moved from (${Math.round(move.from.left)}, ${Math.round(move.from.top)}) to (${Math.round(move.to.x)}, ${Math.round(move.to.y)})\n`;
      const dx = Math.round(move.to.x - move.from.left);
      const dy = Math.round(move.to.y - move.from.top);
      prompt += `  Offset: ${dx > 0 ? "+" : ""}${dx}px horizontal, ${dy > 0 ? "+" : ""}${dy}px vertical\n`;
    }
    prompt += `\nFor moves, add appropriate Tailwind positioning or margin classes to achieve the visual offset. Consider whether relative positioning, margin adjustments, or layout changes are most appropriate.\n\n`;
  }

  // Color changes
  if (annotations.colorChanges.length > 0) {
    prompt += `### Color Changes\n`;
    for (const cc of annotations.colorChanges) {
      const prop = cc.property === "backgroundColor" ? "background color" : "text color";
      prompt += `- **${cc.component}** (${cc.file}:${cc.line}): ${prop} changed from \`${cc.from}\` to \`${cc.to}\`\n`;
    }
    prompt += `\nFor color changes, find the closest Tailwind color class. If no exact match, use arbitrary value syntax like \`bg-[#hex]\` or \`text-[#hex]\`.\n\n`;
  }

  // Draw/text annotations
  const drawAnns = annotations.annotations.filter(a => a.type === "draw");
  const textAnns = annotations.annotations.filter(a => a.type === "text");

  if (textAnns.length > 0) {
    prompt += `### Text Annotations (User Instructions)\n`;
    for (const ann of textAnns) {
      const target = ann.targetComponent
        ? `near **${ann.targetComponent}** (${ann.targetFile}:${ann.targetLine})`
        : `at position (${Math.round(ann.position!.x)}, ${Math.round(ann.position!.y)})`;
      prompt += `- "${ann.content}" — placed ${target}\n`;
    }
    prompt += `\nText annotations are instructions from the user. Interpret them as code change requests for the nearest referenced component.\n\n`;
  }

  if (drawAnns.length > 0) {
    prompt += `### Drawing Annotations\n`;
    for (const ann of drawAnns) {
      const target = ann.startComponent
        ? `near **${ann.startComponent}** (${ann.startFile}:${ann.startLine})`
        : "on the page";
      const points = ann.points?.length ?? 0;
      prompt += `- Drawing with ${points} points ${target} (color: ${ann.color})\n`;
    }
    prompt += `\nDrawings typically circle or highlight areas the user wants changed. Consider them as visual emphasis on the nearby components.\n\n`;
  }

  // Source files
  prompt += `## Source Files\n\n`;
  for (const [filePath, content] of sources) {
    const ext = path.extname(filePath).slice(1) || "tsx";
    prompt += `### \`${filePath}\`\n\`\`\`${ext}\n${content}\n\`\`\`\n\n`;
  }

  prompt += `## Response Format

For each file you modify, respond with a section like this:

### FILE: path/to/file.tsx
\`\`\`tsx
// complete modified file contents
\`\`\`

### DESCRIPTION: path/to/file.tsx
Brief description of what was changed.

Only include files that need changes. Include the COMPLETE file content, not just the changed parts.`;

  return prompt;
}

/**
 * Parse Claude's response into file changes.
 */
function parseResponse(
  responseText: string,
  projectRoot: string,
): Array<{ filePath: string; content: string; description: string }> {
  const changes: Array<{ filePath: string; content: string; description: string }> = [];

  // Match FILE sections: ### FILE: path\n```lang\ncontent\n```
  const fileRegex = /### FILE:\s*(.+?)\n```\w*\n([\s\S]*?)```/g;
  let match;

  while ((match = fileRegex.exec(responseText)) !== null) {
    const filePath = match[1].trim();
    const content = match[2];
    changes.push({ filePath, content, description: "" });
  }

  // Match DESCRIPTION sections: ### DESCRIPTION: path\ntext
  const descRegex = /### DESCRIPTION:\s*(.+?)\n([\s\S]*?)(?=###|$)/g;
  while ((match = descRegex.exec(responseText)) !== null) {
    const filePath = match[1].trim();
    const description = match[2].trim();
    const change = changes.find(c => c.filePath === filePath);
    if (change) {
      change.description = description;
    }
  }

  return changes;
}

/**
 * Main generate function — orchestrates the full flow.
 */
export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const { annotations, apiKey, projectRoot, onProgress } = options;

  try {
    // 1. Analyze — collect referenced files
    onProgress("analyzing", "Reading source files...");

    const referencedFiles = getReferencedFiles(annotations);
    if (referencedFiles.length === 0) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "No source files referenced in annotations",
      };
    }

    const sources = readSourceFiles(referencedFiles, projectRoot);
    if (sources.size === 0) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "Could not read any referenced source files",
      };
    }

    // 2. Generate — call Claude API
    onProgress("generating", "Generating code changes...");

    const client = new Anthropic({ apiKey });
    const prompt = buildPrompt(annotations, sources);

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map(block => block.text)
      .join("\n");

    if (!responseText) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "Empty response from Claude API",
      };
    }

    // 3. Apply — parse response and write files
    onProgress("applying", "Applying changes...");

    const parsedChanges = parseResponse(responseText, projectRoot);
    if (parsedChanges.length === 0) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "Could not parse any file changes from AI response",
      };
    }

    const appliedChanges: FileChange[] = [];
    const undoEntries: Array<{ filePath: string; content: string }> = [];

    for (const change of parsedChanges) {
      const resolved = path.isAbsolute(change.filePath)
        ? change.filePath
        : path.resolve(projectRoot, change.filePath);

      // Save original for undo
      try {
        const original = fs.readFileSync(resolved, "utf-8");
        undoEntries.push({ filePath: resolved, content: original });
      } catch {
        // New file — no undo needed
      }

      // Write the modified content
      fs.writeFileSync(resolved, change.content, "utf-8");
      appliedChanges.push({
        filePath: change.filePath,
        description: change.description || "Modified by AI",
      });
    }

    onProgress("complete", `Modified ${appliedChanges.length} file(s)`);

    return {
      success: true,
      changes: appliedChanges,
      undoEntries,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    // Friendly error messages for common failures
    if (message.includes("401") || message.includes("authentication")) {
      return { success: false, changes: [], undoEntries: [], error: "Invalid API key. Check your ANTHROPIC_API_KEY." };
    }
    if (message.includes("429") || message.includes("rate")) {
      return { success: false, changes: [], undoEntries: [], error: "Rate limited. Please wait a moment and try again." };
    }
    if (message.includes("insufficient") || message.includes("credit")) {
      return { success: false, changes: [], undoEntries: [], error: "Insufficient API credits. Check your Anthropic account." };
    }

    return { success: false, changes: [], undoEntries: [], error: message };
  }
}

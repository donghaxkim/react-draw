// packages/cli/src/generate.ts
// Phase 2B: AI-powered code generation from visual annotations
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import type { SerializedAnnotations, FileChange, GenerateStage } from "@sketch-ui/shared";
import jscodeshift from "jscodeshift";
import { getParser } from "./transform.js";

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

// --- Helpers ---

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
 * Also saves original content for undo BEFORE any API call (#3).
 */
function readSourceFiles(
  filePaths: string[],
  projectRoot: string,
): { sources: Map<string, string>; undoEntries: UndoFileEntry[] } {
  const sources = new Map<string, string>();
  const undoEntries: UndoFileEntry[] = [];

  for (const fp of filePaths) {
    const resolved = path.isAbsolute(fp) ? fp : path.resolve(projectRoot, fp);
    try {
      const content = fs.readFileSync(resolved, "utf-8");
      sources.set(fp, content);
      // Save undo entry NOW, before any API call or file write (#3)
      undoEntries.push({ filePath: resolved, content });
    } catch {
      console.warn(`[SketchUI] Could not read source file: ${fp}`);
    }
  }

  return { sources, undoEntries };
}

/**
 * Estimate token count from a string (rough: 1 token ≈ 4 chars). (#5)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Format estimated cost based on token count (Sonnet pricing).
 */
function formatCost(inputTokens: number, outputTokens: number): string {
  // Sonnet pricing: $3/M input, $15/M output
  const cost = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15;
  if (cost < 0.01) return "<$0.01";
  return `~$${cost.toFixed(2)}`;
}

/**
 * Build the prompt for Claude, including annotations and numbered source files (#4).
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
- Return the COMPLETE modified file contents (not diffs, not fragments)
- If an annotation is ambiguous, make a reasonable interpretation
- Source files include line numbers for reference (e.g. "42: <Button>")

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

  // Source files with line numbers (#4)
  prompt += `## Source Files\n\n`;
  for (const [filePath, content] of sources) {
    const ext = path.extname(filePath).slice(1) || "tsx";
    const numberedLines = content
      .split("\n")
      .map((line, i) => `${i + 1}: ${line}`)
      .join("\n");
    prompt += `### \`${filePath}\`\n\`\`\`${ext}\n${numberedLines}\n\`\`\`\n\n`;
  }

  prompt += `## Response Format

For each file you modify, respond with EXACTLY this format:

\`\`\`
FILE: path/to/file.tsx
\`\`\`
\`\`\`tsx
// complete modified file contents (WITHOUT line numbers)
\`\`\`
\`\`\`
DESCRIPTION: path/to/file.tsx
Brief description of what was changed.
\`\`\`

Only include files that need changes. Include the COMPLETE file content, not fragments or diffs. Do NOT include the line numbers in your output — those are only for reference.`;

  return prompt;
}

/**
 * Parse Claude's response into file changes. (#2 - more robust parsing)
 */
function parseResponse(responseText: string): Array<{ filePath: string; content: string; description: string }> {
  const changes: Array<{ filePath: string; content: string; description: string }> = [];

  // Match FILE blocks: FILE: path followed by a code fence
  const fileRegex = /FILE:\s*(.+?)\n```\w*\n([\s\S]*?)```/g;
  let match;

  while ((match = fileRegex.exec(responseText)) !== null) {
    const filePath = match[1].trim();
    const content = match[2];
    // Skip if this looks like a description block, not a file block
    if (filePath.startsWith("DESCRIPTION")) continue;
    changes.push({ filePath, content, description: "" });
  }

  // Match DESCRIPTION blocks
  const descRegex = /DESCRIPTION:\s*(.+?)\n([\s\S]*?)(?=(?:FILE:|DESCRIPTION:|```)|$)/g;
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
 * Validate a parsed file change before writing. (#2)
 * Returns null if valid, error string if invalid.
 */
function validateChange(
  change: { filePath: string; content: string },
  originalContent: string | undefined,
  projectRoot: string,
): string | null {
  const resolved = path.isAbsolute(change.filePath)
    ? change.filePath
    : path.resolve(projectRoot, change.filePath);

  // Check file exists
  if (!fs.existsSync(resolved)) {
    return `File does not exist: ${change.filePath}`;
  }

  // Check content is not empty
  if (!change.content.trim()) {
    return `Empty content for ${change.filePath}`;
  }

  // Check content length is reasonable (50-200% of original)
  if (originalContent) {
    const ratio = change.content.length / originalContent.length;
    if (ratio < 0.3) {
      return `Content too short for ${change.filePath} (${Math.round(ratio * 100)}% of original — likely a fragment)`;
    }
    if (ratio > 3.0) {
      return `Content too long for ${change.filePath} (${Math.round(ratio * 100)}% of original — likely includes explanation text)`;
    }
  }

  // Try to parse as JSX/TSX to catch syntax errors
  const ext = path.extname(change.filePath);
  if ([".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    try {
      const parserName = getParser(resolved);
      const j = jscodeshift.withParser(parserName);
      j(change.content); // Throws if syntax is invalid
    } catch {
      return `Invalid syntax in generated content for ${change.filePath}`;
    }
  }

  return null;
}

// --- Main ---

/**
 * Main generate function — orchestrates the full flow.
 */
export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const { annotations, apiKey, projectRoot, onProgress } = options;

  try {
    // 1. Analyze — collect referenced files and save originals for undo (#3)
    onProgress("analyzing", "Reading source files...");

    const referencedFiles = getReferencedFiles(annotations);
    if (referencedFiles.length === 0) {
      return { success: false, changes: [], undoEntries: [], error: "No source files referenced in annotations" };
    }

    // Read files AND capture undo entries BEFORE the API call (#3)
    const { sources, undoEntries } = readSourceFiles(referencedFiles, projectRoot);
    if (sources.size === 0) {
      return { success: false, changes: [], undoEntries: [], error: "Could not read any referenced source files" };
    }

    // 2. Build prompt and estimate tokens (#5)
    const prompt = buildPrompt(annotations, sources);
    const inputTokens = estimateTokens(prompt);
    const estimatedOutputTokens = Math.min(inputTokens, 8192); // Conservative estimate
    const costEstimate = formatCost(inputTokens, estimatedOutputTokens);

    onProgress("generating", `Sending ~${Math.round(inputTokens / 1000)}K tokens to Claude (${costEstimate})...`);

    // 3. Call Claude API
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16384,
      messages: [{ role: "user", content: prompt }],
    });

    // Check for truncation (#7)
    if (response.stop_reason === "max_tokens") {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "Response was truncated — too many changes at once. Try generating with fewer annotations.",
      };
    }

    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map(block => block.text)
      .join("\n");

    if (!responseText) {
      return { success: false, changes: [], undoEntries: [], error: "Empty response from Claude API" };
    }

    // 4. Parse and validate response (#2)
    onProgress("applying", "Validating and applying changes...");

    const parsedChanges = parseResponse(responseText);
    if (parsedChanges.length === 0) {
      return { success: false, changes: [], undoEntries: [], error: "Could not parse any file changes from AI response" };
    }

    const appliedChanges: FileChange[] = [];
    const skippedFiles: string[] = [];

    for (const change of parsedChanges) {
      const resolved = path.isAbsolute(change.filePath)
        ? change.filePath
        : path.resolve(projectRoot, change.filePath);

      // Validate before writing (#2)
      const originalContent = sources.get(change.filePath);
      const validationError = validateChange(change, originalContent, projectRoot);
      if (validationError) {
        console.warn(`[SketchUI] Skipping ${change.filePath}: ${validationError}`);
        skippedFiles.push(`${change.filePath}: ${validationError}`);
        continue;
      }

      // Write the modified content
      fs.writeFileSync(resolved, change.content, "utf-8");
      appliedChanges.push({
        filePath: change.filePath,
        description: change.description || "Modified by AI",
      });
    }

    if (appliedChanges.length === 0) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: `All changes failed validation:\n${skippedFiles.join("\n")}`,
      };
    }

    const msg = skippedFiles.length > 0
      ? `Modified ${appliedChanges.length} file(s), skipped ${skippedFiles.length}`
      : `Modified ${appliedChanges.length} file(s)`;
    onProgress("complete", msg);

    return { success: true, changes: appliedChanges, undoEntries };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

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

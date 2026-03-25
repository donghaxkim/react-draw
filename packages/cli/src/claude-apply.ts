// packages/cli/src/claude-apply.ts
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ApplyChange, FileChange } from "@frameup/shared";
import {
  parseDiffResponse,
  applyReplacements,
  validateDiffChange,
  readSourceFiles,
  type UndoFileEntry,
} from "./claude-shared.js";
import { resolveProjectFilePath } from "./path-resolver.js";

const HAIKU_MODEL = "claude-haiku-4-5-20251001";
const SONNET_MODEL = "claude-sonnet-4-6-20250514";

function getModelForChanges(changes: ApplyChange[]): string {
  return changes.some((c) => c.type === "reorder") ? SONNET_MODEL : HAIKU_MODEL;
}

const SYSTEM_PROMPT = `You are a precision frontend code modifier for a React application using Tailwind CSS.

A user has made visual changes in a design overlay tool. You must reproduce their exact intent in the source code.

## Critical Rules
- Match the user's changes EXACTLY — do not interpret, optimize, or "improve"
- Only modify the specific elements described — leave everything else untouched
- Preserve all existing code structure, formatting, and whitespace
- For className changes: only swap the specified classes, keep all others in place
- For text changes: only change the text content, preserve surrounding JSX exactly
- For reorders: move the complete JSX block (including children), preserve indentation
- For moves: add the specified Tailwind spacing classes

## Element Location Strategy
Each change provides multiple signals to locate the exact element:
1. **className string** — most reliable, find it as an exact substring in the JSX
2. **Text content** — disambiguates elements with same tag/class
3. **nthOfType** — "the Nth <tag> in this component" for structural elements
4. **Parent context** — parent tag + parent className narrows the search
5. **Component name** — which React component function/const to look in
6. **Line hint** — approximate line number (may be stale, do not rely exclusively)

For elements WITHOUT a className, combine text content, nthOfType, and parent context.

## Response Format

For each file you modify, respond with one or more SEARCH/REPLACE blocks:

\`\`\`
FILE: path/to/file.tsx
\`\`\`
\`\`\`
LINES: 42-48
<<<<<<< SEARCH
exact lines to find in the original file
=======
replacement lines
>>>>>>> REPLACE
\`\`\`
\`\`\`
DESCRIPTION: path/to/file.tsx
Brief description of what was changed.
\`\`\`

Rules for SEARCH/REPLACE blocks:
- Every SEARCH/REPLACE block MUST start with a LINES: start-end directive
- SEARCH content must match the original file EXACTLY (including whitespace)
- Each block should be the minimal change needed
- Order blocks from top-of-file to bottom-of-file
- Do NOT include line numbers in SEARCH/REPLACE content`;

/** Build the user message for Claude from grouped changes + file contents. */
export function buildApplyPrompt(
  changes: ApplyChange[],
  sources: Map<string, string>,
): string {
  const byFile = new Map<string, ApplyChange[]>();
  for (const change of changes) {
    const file = change.filePath;
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file)!.push(change);
  }

  let message = "";
  let changeNum = 1;

  for (const [filePath, fileChanges] of byFile) {
    const content = sources.get(filePath) || "[file not found]";
    const numbered = content
      .split("\n")
      .map((line, i) => `${i + 1}: ${line}`)
      .join("\n");

    message += `## File: ${filePath}\n\`\`\`tsx\n${numbered}\n\`\`\`\n\n`;
    message += `### Changes to apply:\n\n`;

    for (const change of fileChanges) {
      message += `${changeNum}. `;
      message += formatChange(change);
      message += "\n\n";
      changeNum++;
    }
  }

  return message;
}

function formatChange(change: ApplyChange): string {
  const locator = change.type !== "reorder" && change.className
    ? `Current className: "${change.className}"`
    : change.type !== "reorder"
      ? `No className. ${formatStructuralLocator(change)}`
      : "";

  switch (change.type) {
    case "property": {
      let s = `**Property change** on <${change.tag}> in ${change.componentName} component (~line ${change.lineHint})\n`;
      if (change.textContent) s += `   Text content: "${change.textContent}"\n`;
      s += `   ${locator}\n`;
      s += `   Changes:\n`;
      for (const u of change.updates) {
        if (u.relatedOldClasses.length > 0) {
          s += `     - The element has shorthand class \`${u.relatedOldClasses.join("\`, \`")}\`. `;
          s += `Split it: replace the shorthand with individual side classes, `;
          s += `using \`${u.newClass}\` for the \`${u.tailwindPrefix}\` side.\n`;
        } else if (u.oldClass) {
          s += `     - Replace class \`${u.oldClass}\` with \`${u.newClass}\`\n`;
        } else {
          s += `     - Add class \`${u.newClass}\`\n`;
        }
      }
      s += `   Keep all other classes exactly as they are.`;
      return s;
    }
    case "text": {
      let s = `**Text change** on <${change.tag}> in ${change.componentName} component (~line ${change.lineHint})\n`;
      s += `   ${locator}\n`;
      s += `   Current text: "${change.originalText}"\n`;
      s += `   New text: "${change.newText}"\n`;
      s += `   Change ONLY the text content. Preserve JSX tags, className, and all attributes.`;
      return s;
    }
    case "reorder": {
      let s = `**Reorder** children of <${change.tag}> in ${change.componentName} component (~line ${change.lineHint})\n`;
      s += `   Parent className: "${change.parentClassName}"\n`;
      s += `   Current child order:\n`;
      change.childrenContext.forEach((child, i) => {
        s += `     ${i + 1}. <${child.tag} className="${child.className}">${child.textContent ? ` "${child.textContent.slice(0, 30)}"` : ""}\n`;
      });
      s += `   Move child at position ${change.fromIndex + 1} to position ${change.toIndex + 1}.\n`;
      s += `   Move the COMPLETE JSX block. Do not modify content.`;
      return s;
    }
    case "move": {
      let s = `**Move** <${change.tag}> in ${change.componentName} component (~line ${change.lineHint})\n`;
      s += `   ${locator}\n`;
      s += `   Dragged ${change.delta.dx}px right, ${change.delta.dy}px down.\n`;
      if (change.resolvedDx) s += `   Add class: ${change.resolvedDx}\n`;
      if (change.resolvedDy) s += `   Add class: ${change.resolvedDy}\n`;
      s += `   Add the spacing classes to the existing className.`;
      return s;
    }
  }
}

function formatStructuralLocator(change: ApplyChange): string {
  if (change.type === "reorder") return "";
  const nth = change.nthOfType;
  const ordinal = nth === 1 ? "1st" : nth === 2 ? "2nd" : nth === 3 ? "3rd" : `${nth}th`;
  let s = `This is the ${ordinal} <${change.tag}>`;
  if (change.parentClassName) {
    s += ` inside <${change.parentTag} className="${change.parentClassName}">`;
  } else if (change.parentTag) {
    s += ` inside <${change.parentTag}>`;
  }
  return s;
}

export interface ApplyResult {
  success: boolean;
  appliedCount: number;
  failedCount: number;
  undoEntries: UndoFileEntry[];
  changes: FileChange[];
  error?: string;
}

/** Apply all changes via Claude API. */
export async function applyAllChanges(opts: {
  changes: ApplyChange[];
  apiKey: string;
  projectRoot: string;
  onProgress?: (message: string) => void;
}): Promise<ApplyResult> {
  const { changes, apiKey, projectRoot, onProgress } = opts;

  const filePaths = [...new Set(changes.map((c) => c.filePath))];
  const { sources, undoEntries } = readSourceFiles(filePaths, projectRoot);

  if (sources.size === 0) {
    return { success: false, appliedCount: 0, failedCount: changes.length, changes: [], undoEntries: [], error: "Could not read any source files" };
  }

  onProgress?.("Sending changes to Claude...");

  const userMessage = buildApplyPrompt(changes, sources);
  const model = getModelForChanges(changes);

  const client = new Anthropic({ apiKey });
  const response = await client.messages.create({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const responseText = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  onProgress?.("Applying changes...");

  const parsed = parseDiffResponse(responseText);
  let appliedCount = 0;
  let failedCount = 0;
  const appliedChanges: FileChange[] = [];

  // Collect all replacements per file FIRST, then write once.
  const replacementsByFile = new Map<string, { resolvedPath: string; replacements: any[]; descriptions: string[] }>();

  for (const diff of parsed) {
    const filePath = diff.filePath;
    const resolvedPath = resolveProjectFilePath(filePath, projectRoot) ?? path.resolve(projectRoot, filePath);
    const original = sources.get(filePath);
    if (!original) {
      failedCount++;
      continue;
    }

    const validation = validateDiffChange(diff, original, resolvedPath);
    if (validation !== null) {
      failedCount++;
      continue;
    }

    if (!replacementsByFile.has(filePath)) {
      replacementsByFile.set(filePath, { resolvedPath, replacements: [], descriptions: [] });
    }
    const entry = replacementsByFile.get(filePath)!;
    entry.replacements.push(...diff.replacements);
    entry.descriptions.push(diff.description || "Applied changes");
  }

  // Write each file exactly once
  for (const [filePath, { resolvedPath, replacements, descriptions }] of replacementsByFile) {
    const original = sources.get(filePath)!;
    const newContent = applyReplacements(original, replacements);
    fs.writeFileSync(resolvedPath, newContent, "utf-8");

    const undoEntry = undoEntries.find((u) => u.filePath === resolvedPath);
    if (undoEntry) undoEntry.afterContent = newContent;

    appliedCount += descriptions.length;
    appliedChanges.push({ filePath, description: descriptions.join("; ") });
  }

  return {
    success: failedCount === 0,
    appliedCount,
    failedCount,
    undoEntries: undoEntries.filter((u) => u.afterContent !== ""),
    changes: appliedChanges,
  };
}

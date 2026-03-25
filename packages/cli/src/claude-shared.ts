// packages/cli/src/claude-shared.ts
// Shared utilities for Claude API integrations (generate + apply).

import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import { getParser } from "./transform.js";

export interface UndoFileEntry {
  filePath: string;
  content: string;
  afterContent: string;
}

export interface Replacement {
  search: string;
  replace: string;
  lines?: { start: number; end: number };
}

export interface ParsedChange {
  filePath: string;
  replacements: Replacement[];
  description: string;
}

/**
 * Read source files and return a map of filePath → content.
 * Also saves original content for undo BEFORE any API call (#3).
 */
export function readSourceFiles(
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
      // afterContent will be filled in after the write
      undoEntries.push({ filePath: resolved, content, afterContent: "" });
    } catch {
      console.warn(`[FrameUp] Could not read source file: ${fp}`);
    }
  }

  return { sources, undoEntries };
}

/**
 * Parse SEARCH/REPLACE block format.
 */
export function parseDiffResponse(responseText: string): ParsedChange[] {
  const changes: ParsedChange[] = [];

  const fileSections = responseText.split(/(?=FILE:\s*)/);

  for (const section of fileSections) {
    const fileMatch = section.match(/^FILE:\s*(.+?)(?:\n|$)/);
    if (!fileMatch) continue;

    const filePath = fileMatch[1].trim();
    if (filePath.startsWith("DESCRIPTION")) continue;

    // Primary regex: with LINES directive
    const linesBlockRegex = /LINES:\s*(\d+)-(\d+)\n<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
    // Fallback regex: without LINES directive
    const plainBlockRegex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;

    const replacements: Replacement[] = [];

    // First pass: extract blocks with LINES
    const linesMatched = new Map<number, number>(); // position → match length
    let blockMatch;
    while ((blockMatch = linesBlockRegex.exec(section)) !== null) {
      linesMatched.set(blockMatch.index, blockMatch[0].length);
      replacements.push({
        search: blockMatch[3],
        replace: blockMatch[4],
        lines: { start: parseInt(blockMatch[1], 10), end: parseInt(blockMatch[2], 10) },
      });
    }

    // Second pass: pick up any blocks without LINES (fallback)
    while ((blockMatch = plainBlockRegex.exec(section)) !== null) {
      const searchStart = blockMatch.index;
      const alreadyCaptured = Array.from(linesMatched).some(([pos, len]) => {
        return searchStart >= pos && searchStart < pos + len;
      });
      if (alreadyCaptured) continue;

      replacements.push({
        search: blockMatch[1],
        replace: blockMatch[2],
        lines: undefined,
      });
    }

    if (replacements.length === 0) continue;

    let description = "";
    const descMatch = section.match(/DESCRIPTION:\s*.+?\n([\s\S]*?)(?=(?:FILE:|$))/);
    if (descMatch) {
      description = descMatch[1].trim();
    }

    const existing = changes.find(c => c.filePath === filePath);
    if (existing) {
      existing.replacements.push(...replacements);
      if (description && !existing.description) existing.description = description;
    } else {
      changes.push({ filePath, replacements, description });
    }
  }

  // Also pick up DESCRIPTION blocks that appear outside file sections
  const descRegex = /DESCRIPTION:\s*(.+?)\n([\s\S]*?)(?=(?:FILE:|DESCRIPTION:|```)|$)/g;
  let descMatch;
  while ((descMatch = descRegex.exec(responseText)) !== null) {
    const fp = descMatch[1].trim();
    const desc = descMatch[2].trim();
    const existing = changes.find(c => c.filePath === fp);
    if (existing && !existing.description) {
      existing.description = desc;
    }
  }

  return changes;
}

/**
 * Find the character offset of the correct occurrence of `search` in `content`.
 * Returns the offset, or -1 if disambiguation fails.
 *
 * - Single occurrence: returns its offset (ignores lines)
 * - Multiple occurrences + lines present: returns the one in range
 * - Multiple occurrences + no lines: returns -1 (ambiguous)
 * - No occurrences: returns -1
 */
export function resolveReplacementOffset(
  content: string,
  search: string,
  lines?: { start: number; end: number },
): number {
  // Find all occurrences
  const offsets: number[] = [];
  let pos = 0;
  while ((pos = content.indexOf(search, pos)) !== -1) {
    offsets.push(pos);
    pos += search.length;
  }

  if (offsets.length === 0) return -1;
  if (offsets.length === 1) return offsets[0];

  // Multiple occurrences — need lines to disambiguate
  if (!lines) return -1;

  // Build line-start-offset table
  const lineStarts = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\n') lineStarts.push(i + 1);
  }

  // Find which line each occurrence starts on (1-indexed)
  function lineAt(offset: number): number {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1; // 1-indexed
  }

  const matching = offsets.filter(o => {
    const line = lineAt(o);
    return line >= lines.start && line <= lines.end;
  });

  return matching.length === 1 ? matching[0] : -1;
}

/**
 * Apply search/replace blocks to original content.
 *
 * Blocks arrive top-to-bottom (prompt instructs Claude to order them that way
 * for readability), but we apply bottom-to-top so that earlier offsets remain
 * valid after each splice. All offsets are computed against the original content
 * before any replacements.
 */
export function applyReplacements(original: string, replacements: Replacement[]): string {
  // Resolve all offsets against the original content upfront
  const entries = replacements.map(r => ({
    offset: resolveReplacementOffset(original, r.search, r.lines),
    length: r.search.length,
    replace: r.replace,
  }));

  // Sort by offset descending (bottom-of-file first)
  entries.sort((a, b) => b.offset - a.offset);

  let result = original;
  for (const { offset, length, replace } of entries) {
    if (offset === -1) continue; // skip unresolvable (validation should catch this)
    result = result.slice(0, offset) + replace + result.slice(offset + length);
  }
  return result;
}

/**
 * Count non-overlapping occurrences of a substring.
 */
export function countOccurrences(text: string, sub: string): number {
  let count = 0;
  let pos = 0;
  while ((pos = text.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}

/**
 * Validate a diff-based change before applying.
 * Returns null if valid, error string if invalid.
 */
export function validateDiffChange(
  change: ParsedChange,
  originalContent: string | undefined,
  projectRoot: string,
): string | null {
  const resolved = path.isAbsolute(change.filePath)
    ? change.filePath
    : path.resolve(projectRoot, change.filePath);

  if (!fs.existsSync(resolved)) {
    return `File does not exist: ${change.filePath}`;
  }

  if (!originalContent) {
    return `No original content available for ${change.filePath}`;
  }

  // Validate each replacement can be located
  for (let i = 0; i < change.replacements.length; i++) {
    const { search, lines } = change.replacements[i];
    const offset = resolveReplacementOffset(originalContent, search, lines);
    if (offset === -1) {
      const occurrences = countOccurrences(originalContent, search);
      const snippet = search.length > 80 ? search.slice(0, 80) + "..." : search;
      if (occurrences === 0) {
        return `SEARCH block ${i + 1} not found in ${change.filePath}: "${snippet}"`;
      }
      return `SEARCH block ${i + 1} matches ${occurrences} locations in ${change.filePath} (must be unique or disambiguated by LINES): "${snippet}"`;
    }
  }

  // Trial-apply all replacements using line-aware logic and syntax-check the result
  const result = applyReplacements(originalContent, change.replacements);

  const ext = path.extname(change.filePath);
  if ([".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    try {
      const parserName = getParser(resolved);
      const j = jscodeshift.withParser(parserName);
      j(result);
    } catch {
      return `Invalid syntax after applying replacements to ${change.filePath}`;
    }
  }

  return null;
}

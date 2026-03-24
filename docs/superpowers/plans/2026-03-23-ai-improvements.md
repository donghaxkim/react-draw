# AI Generate Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `--model` CLI flag, required LINES directive with line-range disambiguation in SEARCH/REPLACE, and generate button locked-state UX.

**Architecture:** Three independent improvements touching `generate.ts` (model flag + LINES validation), `index.ts`/`server.ts` (model threading), and overlay `index.ts` (button UX). The LINES work is the largest — it adds a `resolveReplacementOffset` helper, updates the parser, validator, and applicator, and requires new tests.

**Tech Stack:** TypeScript, vitest, commander, `@anthropic-ai/sdk`, WebSocket

**Spec:** `docs/superpowers/specs/2026-03-23-ai-improvements-design.md`

---

## File Structure

| File | Role | Action |
|------|------|--------|
| `packages/cli/src/generate.ts` | Claude API call, prompt, parsing, validation, application | Modify — all three features touch this |
| `packages/cli/src/server.ts` | WebSocket server, generate handler | Modify — thread `model` |
| `packages/cli/src/index.ts` | CLI entry, commander options | Modify — add `--model` flag |
| `packages/overlay/src/index.ts` | Generate button handler | Modify — disable/enable + toast |
| `packages/cli/src/__tests__/generate.test.ts` | Tests for parser, validator, applicator | Create |

---

### Task 1: `--model` CLI Flag

**Files:**
- Modify: `packages/cli/src/index.ts:11-44` (commander option + threading)
- Modify: `packages/cli/src/server.ts:17-20,52-55,273` (SketchServerOptions + generate call)
- Modify: `packages/cli/src/generate.ts:11-17,89-94,622-625` (GenerateOptions + formatCost + API call)

- [ ] **Step 1: Add `model` to `GenerateOptions` and `formatCost`**

In `packages/cli/src/generate.ts`:

Add to `GenerateOptions` interface:
```typescript
interface GenerateOptions {
  annotations: SerializedAnnotations;
  apiKey: string;
  projectRoot: string;
  model?: string;
  tokens?: TailwindTokenMap | null;
  onProgress: (stage: GenerateStage, message: string) => void;
}
```

Add default constant and update `formatCost`:
```typescript
const DEFAULT_MODEL = "claude-sonnet-4-20250514";

function formatCost(inputTokens: number, outputTokens: number, model: string): string {
  if (model !== DEFAULT_MODEL) {
    return `~${Math.round((inputTokens + outputTokens) / 1000)}K tokens`;
  }
  // Sonnet pricing: $3/M input, $15/M output
  const cost = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15;
  if (cost < 0.01) return "<$0.01";
  return `~$${cost.toFixed(2)}`;
}
```

In the `generate` function, use `options.model`:
```typescript
const model = options.model || DEFAULT_MODEL;
// ... later:
const costEstimate = formatCost(inputTokens, estimatedOutputTokens, model);
// ... and:
const response = await client.messages.create({
  model,
  max_tokens: 16384,
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: userMessage }],
});
```

- [ ] **Step 2: Thread `model` through `server.ts`**

In `packages/cli/src/server.ts`:

Update `SketchServerOptions`:
```typescript
interface SketchServerOptions {
  port: number;
  apiKey?: string;
  model?: string;
}
```

Update destructuring in `createSketchServer`:
```typescript
const { port, apiKey, model } = typeof portOrOptions === "number"
  ? { port: portOrOptions, apiKey: undefined, model: undefined }
  : portOrOptions;
```

Thread into `generate()` call (inside the `"generate"` case):
```typescript
generate({
  annotations: msg.annotations,
  apiKey: resolvedKey,
  projectRoot: projectRoot,
  model: model,
  tokens: resolvedTokens,
  onProgress(stage, message) {
    send(ws, { type: "generateProgress", stage, message });
  },
})
```

- [ ] **Step 3: Add `--model` option to CLI and startup log**

In `packages/cli/src/index.ts`:

Add commander option:
```typescript
.option("--model <model>", "Claude model to use", "claude-sonnet-4-20250514")
```

Thread to `createSketchServer`:
```typescript
const sketchServer = createSketchServer({ port: wsPort, apiKey, model: opts.model });
```

Update startup log (replace existing AI Generate line):
```typescript
const modelInfo = opts.model !== "claude-sonnet-4-20250514"
  ? chalk.dim(`, model: ${opts.model}`)
  : "";
console.log(
  chalk.dim("  AI Generate: ") +
    (apiKey
      ? chalk.green("enabled") + chalk.dim(` (key: ...${apiKey.slice(-6)}${modelInfo})`)
      : chalk.yellow("disabled") + chalk.dim(" (set ANTHROPIC_API_KEY to enable)"))
);
```

- [ ] **Step 4: Verify build**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/index.ts packages/cli/src/server.ts packages/cli/src/generate.ts
git commit -m "feat: add --model CLI flag for configurable Claude model"
```

---

### Task 2: Export Internal Functions for Testing

**Files:**
- Modify: `packages/cli/src/generate.ts` (add exports)

The parser, validator, and applicator are currently private functions. Export them for unit testing.

- [ ] **Step 1: Add named exports**

In `packages/cli/src/generate.ts`, change these from `function` to `export function`:
- `parseDiffResponse`
- `validateDiffChange`
- `applyReplacements`
- `countOccurrences`

Also export the types:
```typescript
export interface ParsedChange {
  filePath: string;
  replacements: Replacement[];
  description: string;
}
```

Note: `Replacement` type doesn't exist yet — it will be introduced in Task 3. For now, just add `export` to `parseDiffResponse`, `validateDiffChange`, `applyReplacements`, `countOccurrences`, and the `ParsedChange` interface.

- [ ] **Step 2: Verify build**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/generate.ts
git commit -m "refactor: export generate internals for unit testing"
```

---

### Task 3: LINES Directive — Parser Update

**Files:**
- Modify: `packages/cli/src/generate.ts:340-413` (types, regex, parser)
- Create: `packages/cli/src/__tests__/generate.test.ts`

- [ ] **Step 1: Write failing tests for parser**

Create `packages/cli/src/__tests__/generate.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { parseDiffResponse } from "../generate.js";

describe("parseDiffResponse", () => {
  it("parses SEARCH/REPLACE with LINES directive", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].filePath).toBe("src/App.tsx");
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
  });

  it("parses multiple SEARCH/REPLACE blocks with different LINES", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
LINES: 12-14
<<<<<<< SEARCH
<Card className="mt-2">
=======
<Card className="mt-4">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated spacing.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(2);
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
    expect(changes[0].replacements[1].lines).toEqual({ start: 12, end: 14 });
  });

  it("fallback: parses SEARCH/REPLACE without LINES directive", () => {
    const response = `FILE: src/App.tsx
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: FAIL — `parseDiffResponse` doesn't export yet (or the `lines` field doesn't exist)

- [ ] **Step 3: Implement `Replacement` type and updated parser**

In `packages/cli/src/generate.ts`:

Replace the `ParsedChange` interface and `parseDiffResponse` function:

```typescript
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
```

Update `parseDiffResponse`:

```typescript
export function parseDiffResponse(responseText: string): ParsedChange[] {
  const changes: ParsedChange[] = [];

  // Split response by FILE: markers to process each file's blocks
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
      // Skip if this block's <<<<<<< SEARCH position falls within a LINES-matched block
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

    // Check for description
    let description = "";
    const descMatch = section.match(/DESCRIPTION:\s*.+?\n([\s\S]*?)(?=(?:FILE:|$))/);
    if (descMatch) {
      description = descMatch[1].trim();
    }

    // Merge with existing entry for same file, or create new
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: All 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/generate.ts packages/cli/src/__tests__/generate.test.ts
git commit -m "feat: parse LINES directive in SEARCH/REPLACE blocks"
```

---

### Task 4: LINES Directive — `resolveReplacementOffset` Helper

**Files:**
- Modify: `packages/cli/src/generate.ts` (add helper)
- Modify: `packages/cli/src/__tests__/generate.test.ts` (add tests)

- [ ] **Step 1: Write failing tests for `resolveReplacementOffset`**

Append to `packages/cli/src/__tests__/generate.test.ts`:

```typescript
import { resolveReplacementOffset } from "../generate.js";

describe("resolveReplacementOffset", () => {
  const content = [
    '<div>',            // line 1
    '  <Button>A</Button>',  // line 2
    '  <Card>X</Card>',      // line 3
    '  <Button>A</Button>',  // line 4
    '</div>',           // line 5
  ].join('\n');

  it("single occurrence — returns offset regardless of lines", () => {
    const offset = resolveReplacementOffset(content, '<Card>X</Card>', { start: 3, end: 3 });
    expect(offset).toBe(content.indexOf('<Card>X</Card>'));
  });

  it("single occurrence — returns offset even with no lines", () => {
    const offset = resolveReplacementOffset(content, '<Card>X</Card>', undefined);
    expect(offset).toBe(content.indexOf('<Card>X</Card>'));
  });

  it("multiple occurrences — disambiguates by line range", () => {
    const search = '<Button>A</Button>';
    const firstOffset = content.indexOf(search);
    const secondOffset = content.indexOf(search, firstOffset + 1);

    // Target line 2
    expect(resolveReplacementOffset(content, search, { start: 2, end: 2 })).toBe(firstOffset);
    // Target line 4
    expect(resolveReplacementOffset(content, search, { start: 4, end: 4 })).toBe(secondOffset);
  });

  it("multiple occurrences — no lines → returns -1 (ambiguous)", () => {
    const offset = resolveReplacementOffset(content, '<Button>A</Button>', undefined);
    expect(offset).toBe(-1);
  });

  it("no occurrences — returns -1", () => {
    const offset = resolveReplacementOffset(content, '<NotHere>', { start: 1, end: 5 });
    expect(offset).toBe(-1);
  });

  it("multiple occurrences — lines don't match any → returns -1", () => {
    const offset = resolveReplacementOffset(content, '<Button>A</Button>', { start: 99, end: 99 });
    expect(offset).toBe(-1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: FAIL — `resolveReplacementOffset` is not exported / doesn't exist

- [ ] **Step 3: Implement `resolveReplacementOffset`**

In `packages/cli/src/generate.ts`, add and export:

```typescript
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/generate.ts packages/cli/src/__tests__/generate.test.ts
git commit -m "feat: add resolveReplacementOffset for line-range disambiguation"
```

---

### Task 5: LINES Directive — Update `validateDiffChange` and `applyReplacements`

**Files:**
- Modify: `packages/cli/src/generate.ts:462-536` (validation + application)
- Modify: `packages/cli/src/__tests__/generate.test.ts` (add tests)

- [ ] **Step 1: Write failing tests for validation and application**

Append to `packages/cli/src/__tests__/generate.test.ts`:

```typescript
import { applyReplacements, validateDiffChange } from "../generate.js";
import type { Replacement } from "../generate.js";
import * as fs from "node:fs";
import { vi } from "vitest";

describe("validateDiffChange", () => {
  // Mock fs.existsSync to avoid filesystem dependency in tests
  vi.spyOn(fs, "existsSync").mockReturnValue(true);

  it("single occurrence without lines — valid", () => {
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",  // .txt avoids jscodeshift syntax check
        replacements: [{ search: "<Card>", replace: "<Card large>", lines: undefined }],
        description: "",
      },
      "export default function App() {\n  return <Card>;\n}",
      "/project",
    );
    expect(result).toBeNull();
  });

  it("multiple occurrences without lines — rejects", () => {
    const content = "<Button>A</Button>\n<Button>A</Button>";
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",
        replacements: [{ search: "<Button>A</Button>", replace: "<Button>B</Button>", lines: undefined }],
        description: "",
      },
      content,
      "/project",
    );
    expect(result).toContain("matches 2 locations");
  });

  it("multiple occurrences with lines — disambiguates", () => {
    const content = "<Button>A</Button>\n<Button>A</Button>";
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",
        replacements: [{ search: "<Button>A</Button>", replace: "<Button>B</Button>", lines: { start: 2, end: 2 } }],
        description: "",
      },
      content,
      "/project",
    );
    expect(result).toBeNull();
  });
});

describe("applyReplacements", () => {
  it("applies single replacement", () => {
    const original = '<Button className="px-2">';
    const result = applyReplacements(original, [
      { search: 'className="px-2"', replace: 'className="px-6"', lines: { start: 1, end: 1 } },
    ]);
    expect(result).toBe('<Button className="px-6">');
  });

  it("applies multiple replacements in reverse-offset order", () => {
    const original = '<div>\n  <A>first</A>\n  <B>second</B>\n</div>';
    const result = applyReplacements(original, [
      { search: '<A>first</A>', replace: '<A>changed-first</A>', lines: { start: 2, end: 2 } },
      { search: '<B>second</B>', replace: '<B>changed-second</B>', lines: { start: 3, end: 3 } },
    ]);
    expect(result).toBe('<div>\n  <A>changed-first</A>\n  <B>changed-second</B>\n</div>');
  });

  it("disambiguates duplicate blocks using lines", () => {
    const original = '<Button>A</Button>\n<Button>A</Button>';
    const result = applyReplacements(original, [
      { search: '<Button>A</Button>', replace: '<Button>B</Button>', lines: { start: 2, end: 2 } },
    ]);
    // Only the second occurrence (line 2) should be replaced
    expect(result).toBe('<Button>A</Button>\n<Button>B</Button>');
  });

  it("fallback: single occurrence without lines applies normally", () => {
    const original = '<Card>unique</Card>\n<Button>other</Button>';
    const result = applyReplacements(original, [
      { search: '<Card>unique</Card>', replace: '<Card>changed</Card>', lines: undefined },
    ]);
    expect(result).toBe('<Card>changed</Card>\n<Button>other</Button>');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: FAIL — current signatures don't match

- [ ] **Step 3: Update `validateDiffChange`**

In `packages/cli/src/generate.ts`, replace `validateDiffChange`:

```typescript
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
```

- [ ] **Step 4: Update `applyReplacements`**

In `packages/cli/src/generate.ts`, replace `applyReplacements`:

```typescript
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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: All tests PASS

- [ ] **Step 6: Run existing tests to verify no regressions**

Run: `cd packages/cli && npx vitest run`
Expected: All existing tests PASS (transform, tailwind-resolver, resolve-intent, etc.)

- [ ] **Step 7: Commit**

```bash
git add packages/cli/src/generate.ts packages/cli/src/__tests__/generate.test.ts
git commit -m "feat: line-range disambiguation for SEARCH/REPLACE validation and application"
```

---

### Task 6: Update System Prompt with Required LINES Directive

**Files:**
- Modify: `packages/cli/src/generate.ts:100-151` (system prompt)

- [ ] **Step 1: Update `SYSTEM_PROMPT`**

In `packages/cli/src/generate.ts`, make two changes to the `SYSTEM_PROMPT` template literal (lines 100-151):

**Change A:** In the response format example (lines 132-138), insert `LINES: 42-48` between the opening backtick fence and `<<<<<<< SEARCH`. The existing backtick fencing pattern stays exactly as-is. The result should look like this in the source (where backticks are escaped as `\`` in the template literal):

```
\`\`\`                          ← existing fence (line 132)
LINES: 42-48                    ← NEW: insert this line
<<<<<<< SEARCH                  ← existing (was line 133)
exact lines to find...          ← existing
=======                         ← existing
replacement lines               ← existing
>>>>>>> REPLACE                 ← existing
\`\`\`                          ← existing fence (was line 138)
```

**Change B:** Update the rules list (lines 144-151). Replace the existing rules with:

```
Rules for SEARCH/REPLACE blocks:
- Every SEARCH/REPLACE block MUST start with a LINES: start-end directive indicating the target line range in the original file
- SEARCH content must match the original file EXACTLY (including whitespace and indentation)
- You can have multiple SEARCH/REPLACE blocks per file
- Each block should be the minimal change needed
- Order blocks from top-of-file to bottom-of-file
- Include enough context lines in SEARCH to uniquely identify the location
- Do NOT include line numbers in SEARCH/REPLACE content — those are only for reference
- Only include files that need changes
```

Everything above the response format section (Rules, Annotation Type Guidelines) is unchanged.

- [ ] **Step 2: Verify build**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/generate.ts
git commit -m "feat: require LINES directive in system prompt for SEARCH/REPLACE blocks"
```

---

### Task 7: Generate Button Locked-State UX

**Files:**
- Modify: `packages/overlay/src/index.ts:266-308` (generate handler + completion handler)

- [ ] **Step 1: Disable button on generate start**

In `packages/overlay/src/index.ts`, update the `setOnGenerate` callback. After `generating = true;`, add `updateGenerateButton(false);`:

```typescript
setOnGenerate(() => {
  if (generating) {
    showToast("Generation in progress");
    return;
  }
  // (#8) Cooldown after errors
  const now = Date.now();
  if (now < cooldownUntil) {
    const remaining = Math.ceil((cooldownUntil - now) / 1000);
    showToast(`Please wait ${remaining}s before retrying`);
    return;
  }
  const data = serializeAnnotations();
  if (!data.moves.length && !data.annotations.length && !data.colorChanges.length && !data.textEdits.length) {
    showToast("Nothing to confirm — make some visual changes first");
    return;
  }
  generating = true;
  updateGenerateButton(false);
  showToast("Generating...");
  send({ type: "generate", annotations: data });
});
```

- [ ] **Step 2: Re-enable button on generate complete**

In the `generateComplete` handler, add `updateGenerateButton(hasChanges());` right after `generating = false;`:

```typescript
if (msg.type === "generateComplete") {
  generating = false;
  updateGenerateButton(hasChanges());
  if (msg.success) {
    // ... existing success handling ...
  } else {
    // ... existing error handling ...
  }
}
```

- [ ] **Step 3: Build overlay bundle**

Run: `cd packages/overlay && pnpm build`
Expected: Build succeeds, `dist/overlay.js` updated

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/index.ts
git commit -m "feat: disable generate button during generation with toast fallback"
```

---

### Task 8: Build Overlay Bundle + Full Verification

**Files:**
- Modify: `packages/overlay/dist/overlay.js` (rebuilt bundle)

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: All packages build successfully

- [ ] **Step 2: Run all tests**

Run: `pnpm test`
Expected: All tests pass (existing + new generate tests)

- [ ] **Step 3: Run generate-specific tests**

Run: `cd packages/cli && npx vitest run src/__tests__/generate.test.ts`
Expected: All generate tests pass — parser, resolveReplacementOffset, validateDiffChange, applyReplacements

- [ ] **Step 4: Type check**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit built overlay**

```bash
git add packages/overlay/dist/overlay.js
git commit -m "build: rebuild overlay bundle with generate button UX"
```

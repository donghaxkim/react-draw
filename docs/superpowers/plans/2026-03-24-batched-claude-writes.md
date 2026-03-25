# Batched Claude API Writes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace immediate AST writes with a dual-path system: direct AST (no key) + batched Claude API writes (with key), underpinned by grep-based file discovery when fiber resolution fails.

**Architecture:** Three layers: (1) file discovery via grep when `getOwnerStack()` fails, (2) pending changes store that accumulates visual previews, (3) Claude API write path using Haiku/Sonnet with SEARCH/REPLACE format. Path A (direct AST) kept as fallback.

**Tech Stack:** TypeScript, @anthropic-ai/sdk (already installed), jscodeshift (existing), grep/rg (system), WebSocket (existing)

**Spec:** `docs/superpowers/specs/2026-03-24-batched-claude-writes-design.md`

**PR Strategy:** Split into two independently shippable PRs:
- **PR1 (Tasks 1–6):** File discovery — grep-based resolution when fiber fails. Independently valuable, improves all users.
- **PR2 (Tasks 7–20):** Batched Claude writes — pending store, Claude API apply, confirm/discard UX.

---

## File Structure

| File | Responsibility |
|---|---|
| `packages/cli/src/file-discovery.ts` | **New** — `discoverFile()` grep + `followReexport()` |
| `packages/overlay/src/file-discovery-cache.ts` | **New** — 30s TTL cache for discovered file paths |
| `packages/overlay/src/pending-changes.ts` | **New** — pending change store + `addToPending()` / `confirmAll()` / `discardAll()` |
| `packages/overlay/src/config.ts` | **New** — typed config module, `hasApiKey()` getter (replaces window global) |
| `packages/cli/src/claude-shared.ts` | **New** — extracted `parseDiffResponse()`, `applyReplacements()`, `resolveReplacementOffset()` from generate.ts |
| `packages/cli/src/claude-apply.ts` | **New** — `applyAllChanges()` orchestration using Claude API |
| `packages/shared/src/types.ts` | Add `ApplyChange`, `applyAllChanges`, `applyAllComplete`, `discoverFile`, `discoverFileResult` message types |
| `packages/cli/src/server.ts` | Add `discoverFile` + `applyAllChanges` handlers |
| `packages/overlay/src/bridge.ts` | Add `requestFileDiscovery()` + handle `applyAllComplete` |
| `packages/overlay/src/selection.ts` | Add Layer 2 fallback after empty filePath |
| `packages/overlay/src/tools/resolve-helper.ts` | Same Layer 2 fallback |
| `packages/overlay/src/properties/property-controller.ts` | Path B: replace `commit()` with `addToPending()`, read-only mode |
| `packages/overlay/src/inline-text-edit.ts` | Path B: replace `updateText` send with `addToPending()` |
| `packages/overlay/src/drag.ts` | Path B: replace `reorder` send with `addToPending()` |
| `packages/overlay/src/tools/move.ts` | Path B: replace `move` send with `addToPending()` |
| `packages/overlay/src/utils/nth-of-type.ts` | **New** — shared `computeNthOfType(el)` utility |
| `packages/overlay/src/toolbar.ts` | Add "Confirm Changes" + "Discard" buttons |
| `packages/overlay/src/changelog.ts` | Add pending/active state tracking for batched changes |
| `packages/cli/src/generate.ts` | Refactor to import from claude-shared.ts |

---

## Task 1: File Discovery — `discoverFile()` utility

**Files:**
- Create: `packages/cli/src/file-discovery.ts`
- Create: `packages/cli/src/__tests__/file-discovery.test.ts`

- [ ] **Step 1: Write failing tests for `discoverFile()`**

```typescript
// packages/cli/src/__tests__/file-discovery.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { discoverFile } from "../file-discovery.js";

describe("discoverFile", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "frameup-test-"));
    fs.mkdirSync(path.join(tmpDir, "src/components"), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, "src/app"), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("finds function declaration", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Button.tsx"),
      'export function Button() { return <button>Click</button>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBe("src/components/Button.tsx");
  });

  it("finds const arrow function", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Card.tsx"),
      'export const Card = () => <div>Card</div>;'
    );
    expect(await discoverFile("Card", tmpDir)).toBe("src/components/Card.tsx");
  });

  it("finds export default function", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/app/page.tsx"),
      'export default function HomePage() { return <main>Home</main>; }'
    );
    expect(await discoverFile("HomePage", tmpDir)).toBe("src/app/page.tsx");
  });

  it("skips barrel files and finds real definition", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/index.ts"),
      'export { CheckoutForm } from "./checkout-form";'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/checkout-form.tsx"),
      'export function CheckoutForm() { return <form>Checkout</form>; }'
    );
    expect(await discoverFile("CheckoutForm", tmpDir)).toBe("src/components/checkout-form.tsx");
  });

  it("follows re-export when only barrel file matches", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/index.ts"),
      'export { NavBar } from "./nav-bar";'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/nav-bar.tsx"),
      'export function NavBar() { return <nav>Nav</nav>; }'
    );
    // Only the barrel mentions NavBar in a definition-like context
    expect(await discoverFile("NavBar", tmpDir)).toBe("src/components/nav-bar.tsx");
  });

  it("prefers src/ files over root files", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBe("src/components/Button.tsx");
  });

  it("returns null for nonexistent component", async () => {
    expect(await discoverFile("DoesNotExist", tmpDir)).toBeNull();
  });

  it("ignores node_modules", async () => {
    fs.mkdirSync(path.join(tmpDir, "node_modules/some-lib"), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, "node_modules/some-lib/Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter frameup exec vitest run src/__tests__/file-discovery.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `discoverFile()` and `followReexport()`**

```typescript
// packages/cli/src/file-discovery.ts
import * as fs from "node:fs";
import * as path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Discover which source file defines a React component by name.
 * Greps the project asynchronously (won't block the event loop),
 * ranks results by definition likelihood,
 * follows re-exports in barrel files.
 */
export async function discoverFile(
  componentName: string,
  projectRoot: string,
): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "grep",
      ["-rn", componentName, "--include=*.tsx", "--include=*.ts", "--include=*.jsx", "--include=*.js", "--exclude-dir=node_modules", "--exclude-dir=.next", "--exclude-dir=dist", "."],
      { cwd: projectRoot, timeout: 3000 },
    );
    const result = stdout.trim();

    if (!result) return null;

    const lines = result.split("\n").filter(Boolean);

    const DEFINITION_PATTERNS = [
      new RegExp(`function\\s+${componentName}\\b`),
      new RegExp(`const\\s+${componentName}\\s*[=:]`),
      new RegExp(`let\\s+${componentName}\\s*=`),
      new RegExp(`class\\s+${componentName}\\s`),
      new RegExp(`export\\s+default\\s+function\\s+${componentName}\\b`),
    ];
    const REEXPORT_PATTERN = new RegExp(
      `export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from`,
    );

    const definitions: string[] = [];
    const reexports: string[] = [];

    for (const line of lines) {
      const parts = line.split(":");
      let filePath = parts[0];
      if (filePath.startsWith("./")) filePath = filePath.slice(2);
      const content = parts.slice(2).join(":");

      if (DEFINITION_PATTERNS.some((p) => p.test(content))) {
        definitions.push(filePath);
      } else if (REEXPORT_PATTERN.test(content)) {
        reexports.push(filePath);
      }
    }

    const isBarrelFile = (f: string) =>
      /\/index\.(ts|tsx|js|jsx)$/.test(f) || /^index\.(ts|tsx|js|jsx)$/.test(f);

    const realDefinitions = definitions.filter((f) => !isBarrelFile(f));
    if (realDefinitions.length > 0) {
      return (
        realDefinitions.find((f) => f.startsWith("src/") || f.startsWith("app/")) ||
        realDefinitions[0]
      );
    }

    // Follow re-exports from barrel files
    const barrelSources = [
      ...reexports,
      ...definitions.filter(isBarrelFile),
    ];
    for (const barrel of barrelSources) {
      const resolved = followReexport(barrel, componentName, projectRoot);
      if (resolved) return resolved;
    }

    // Fallback: any non-barrel file mentioning the name
    const allFiles = [
      ...new Set(
        lines
          .map((l) => {
            const f = l.split(":")[0];
            return f.startsWith("./") ? f.slice(2) : f;
          })
          .filter((f) => !isBarrelFile(f) && !f.includes("node_modules")),
      ),
    ];
    if (allFiles.length > 0) {
      return (
        allFiles.find((f) => f.startsWith("src/") || f.startsWith("app/")) ||
        allFiles[0]
      );
    }
  } catch {
    // grep found nothing or failed
  }

  return null;
}

function followReexport(
  barrelFilePath: string,
  componentName: string,
  projectRoot: string,
): string | null {
  try {
    const fullPath = path.resolve(projectRoot, barrelFilePath);
    const content = fs.readFileSync(fullPath, "utf-8");
    const match = content.match(
      new RegExp(
        `export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from\\s*["']([^"']+)["']`,
      ),
    );
    if (!match) return null;

    const importPath = match[1];
    const barrelDir = path.dirname(fullPath);
    for (const ext of [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
      const candidate = path.resolve(barrelDir, importPath + ext);
      if (fs.existsSync(candidate)) {
        return path.relative(projectRoot, candidate);
      }
    }
    const direct = path.resolve(barrelDir, importPath);
    if (fs.existsSync(direct)) {
      return path.relative(projectRoot, direct);
    }
  } catch {
    // barrel read failed
  }
  return null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm --filter frameup exec vitest run src/__tests__/file-discovery.test.ts`
Expected: All 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/file-discovery.ts packages/cli/src/__tests__/file-discovery.test.ts
git commit -m "feat(cli): add discoverFile() grep-based component→file resolver"
```

---

## Task 2: File Discovery Cache (Overlay)

**Files:**
- Create: `packages/overlay/src/file-discovery-cache.ts`

- [ ] **Step 1: Create the cache module**

```typescript
// packages/overlay/src/file-discovery-cache.ts

const CACHE_TTL_MS = 30_000; // 30 seconds

interface CacheEntry {
  filePath: string | null;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/** Returns filePath if cached and fresh, null if cached as not-found, undefined if not looked up. */
export function getCachedFilePath(componentName: string): string | null | undefined {
  const entry = cache.get(componentName);
  if (!entry) return undefined;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(componentName);
    return undefined;
  }
  return entry.filePath;
}

export function setCachedFilePath(componentName: string, filePath: string | null): void {
  cache.set(componentName, { filePath, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}
```

- [ ] **Step 2: Verify overlay build**

Run: `pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/file-discovery-cache.ts
git commit -m "feat(overlay): add file discovery cache with 30s TTL"
```

---

## Task 3: WebSocket Messages — `discoverFile` types (PR1)

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add discoverFile message to `ClientMessage`**

In `packages/shared/src/types.ts`, add to the `ClientMessage` union (after the `revertChanges` variant, ~line 63):

```typescript
  | { type: "discoverFile"; componentName: string }
```

- [ ] **Step 2: Add `discoverFileResult` to `ServerMessage`**

Add to the `ServerMessage` union (~line 86):

```typescript
  | { type: "discoverFileResult"; componentName: string; filePath: string | null }
```

- [ ] **Step 3: Build shared package**

Run: `pnpm build:shared`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add discoverFile/discoverFileResult message types"
```

---

## Task 3.5: WebSocket Messages — `applyAllChanges` + `ApplyChange` types (PR2)

> **Note:** This task is part of PR2. Do not implement until PR1 (Tasks 1–6) is merged.

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add `applyAllChanges` to `ClientMessage`**

```typescript
  | { type: "applyAllChanges"; changes: ApplyChange[] }
```

- [ ] **Step 2: Add `ApplyChange` type above `ClientMessage`**

Before `export type ClientMessage =` (~line 8), add:

```typescript
export type ApplyChange =
  | {
      type: "property";
      componentName: string;
      tag: string;
      filePath: string;
      textContent: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      updates: Array<{
        cssProperty: string;
        tailwindPrefix: string;
        tailwindToken: string | null;
        value: string;
        oldClass: string;
        newClass: string;
      }>;
    }
  | {
      type: "text";
      componentName: string;
      tag: string;
      filePath: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      originalText: string;
      newText: string;
    }
  | {
      type: "reorder";
      componentName: string;
      tag: string;
      filePath: string;
      parentClassName: string;
      lineHint: number;
      childrenContext: Array<{
        tag: string;
        className: string;
        textContent: string;
      }>;
      fromIndex: number;
      toIndex: number;
    }
  | {
      type: "move";
      componentName: string;
      tag: string;
      filePath: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      delta: { dx: number; dy: number };
      resolvedDx: string | null;
      resolvedDy: string | null;
    };
```

- [ ] **Step 3: Add `applyAllComplete` and `config` to `ServerMessage`**

Add to the `ServerMessage` union (~line 86):

```typescript
  | {
      type: "applyAllComplete";
      success: boolean;
      appliedCount: number;
      failedCount: number;
      error?: string;
      undoIds: string[];
    }
  | { type: "config"; hasApiKey: boolean }
```

Note: `discoverFileResult` was already added in Task 3 (PR1).

- [ ] **Step 4: Add `RevertData` variant**

Add to the `RevertData` union (~line 268):

```typescript
  | { type: "batchApplyUndo"; undoIds: string[] }
```

- [ ] **Step 5: Build shared package**

Run: `pnpm build:shared`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add ApplyChange, applyAllComplete, config message types"
```

---

## Task 4: Server — `discoverFile` handler

**Files:**
- Modify: `packages/cli/src/server.ts`

- [ ] **Step 1: Add import for `discoverFile`**

At the top of `server.ts`, add:

```typescript
import { discoverFile } from "./file-discovery.js";
```

- [ ] **Step 2: Add `discoverFile` case to the inline message switch**

In the `ws.on("message")` handler (~line 322), add a new case alongside `"ping"` and `"getSiblings"`:

```typescript
      case "discoverFile": {
        // Async — won't block the event loop during grep
        discoverFile(msg.componentName, projectRoot).then((filePath) => {
          respond({ type: "discoverFileResult", componentName: msg.componentName, filePath });
        });
        break;
      }
```

- [ ] **Step 3: Build and test**

Run: `pnpm build && pnpm test`
Expected: All tests pass, build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(server): add discoverFile handler for component→file resolution"
```

---

## Task 5: Bridge — `requestFileDiscovery()` (PR1)

**Files:**
- Modify: `packages/overlay/src/bridge.ts`

- [ ] **Step 1: Read bridge.ts to understand current structure**

Read: `packages/overlay/src/bridge.ts`
Note the `send()` function (~line 79), `onMessage()` (~line 85), and the message dispatch in `ws.onmessage` (~line 38-55).

- [ ] **Step 2: Add `requestFileDiscovery()` function**

After the existing `onCommitResult()` export, add:

```typescript
/** Request file discovery from CLI. Returns a promise that resolves with filePath or null. */
export function requestFileDiscovery(componentName: string): Promise<string | null> {
  return new Promise((resolve) => {
    const unsub = onMessage((msg) => {
      if (msg.type === "discoverFileResult" && msg.componentName === componentName) {
        unsub();
        resolve(msg.filePath);
      }
    });
    send({ type: "discoverFile", componentName });
    // Timeout after 5 seconds
    setTimeout(() => { unsub(); resolve(null); }, 5000);
  });
}
```

- [ ] **Step 3: Build overlay**

Run: `pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/bridge.ts
git commit -m "feat(bridge): add requestFileDiscovery() for grep-based file lookup"
```

---

## Task 6: Wire file discovery into selection.ts

**Files:**
- Modify: `packages/overlay/src/selection.ts`

- [ ] **Step 1: Add imports**

Add at the top of `selection.ts`:

```typescript
import { getCachedFilePath, setCachedFilePath } from "./file-discovery-cache.js";
import { requestFileDiscovery } from "./bridge.js";
```

- [ ] **Step 2: Add Layer 2 fallback after `resolveComponentFromElement()`**

In `selectElement()` (or wherever `resolveComponentFromElement` is called and the result is used), add after the resolution returns:

```typescript
// Layer 2: grep-based discovery when filePath is empty
if (resolved && !resolved.filePath && resolved.componentName) {
  const cached = getCachedFilePath(resolved.componentName);
  if (cached === undefined) {
    // Not looked up yet — ask CLI
    const discovered = await requestFileDiscovery(resolved.componentName);
    setCachedFilePath(resolved.componentName, discovered);
    if (discovered) {
      resolved.filePath = discovered;
      for (const frame of resolved.stack) {
        if (frame.componentName === resolved.componentName && !frame.filePath) {
          frame.filePath = discovered;
        }
      }
    }
  } else if (cached) {
    resolved.filePath = cached;
    for (const frame of resolved.stack) {
      if (frame.componentName === resolved.componentName && !frame.filePath) {
        frame.filePath = cached;
      }
    }
  }
}
```

- [ ] **Step 3: Apply same pattern in `resolve-helper.ts`**

Both `resolveComponentAtPoint()` and `resolveComponentFromElement()` in `packages/overlay/src/tools/resolve-helper.ts` need the same fallback after their owner stack resolution returns with empty filePath.

- [ ] **Step 4: Build and manual test**

Run: `pnpm build`
Expected: Build succeeds. Manual test: launch FrameUp, click an element that previously showed "Source file couldn't be resolved" — it should now resolve via grep.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/selection.ts packages/overlay/src/tools/resolve-helper.ts
git commit -m "feat(selection): add Layer 2 grep-based file discovery fallback"
```

---

> **PR1 boundary.** Tasks 1–6 are an independent PR: file discovery + cache + wiring. Ship this first. Everything below is PR2.

---

## Task 7: Extract shared Claude utilities from generate.ts

**Files:**
- Create: `packages/cli/src/claude-shared.ts`
- Modify: `packages/cli/src/generate.ts`
- Test: existing generate tests must still pass

- [ ] **Step 1: Create `claude-shared.ts` with extracted functions**

Extract these functions from `generate.ts`:
- `parseDiffResponse()` (~line 355–431)
- `resolveReplacementOffset()` (~line 536–578)
- `applyReplacements()` (~line 588–605)
- `readSourceFiles()` (~line 60–81) — **currently non-exported**, must be newly exported
- `validateDiffChange()` (~line 466–512)
- Related types: `ParsedChange`, `Replacement`, `UndoFileEntry` — **Note:** `UndoFileEntry` is a local type in `generate.ts` (distinct from `UndoEntry` in shared types). It has `filePath`, `content` (before), and `afterContent` fields. Extract it alongside the functions.

```typescript
// packages/cli/src/claude-shared.ts
// Shared utilities for Claude API integrations (generate + apply).

import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import { getParser } from "./transform.js";

// [Move the above functions and their types here, keeping exact same code]
// Export all of them.
```

- [ ] **Step 2: Update `generate.ts` to import from `claude-shared.ts`**

Replace the moved functions with imports:

```typescript
import {
  parseDiffResponse,
  applyReplacements,
  resolveReplacementOffset,
  readSourceFiles,
  validateDiffChange,
  type ParsedChange,
  type Replacement,
  type UndoFileEntry,
} from "./claude-shared.js";
```

Remove the function bodies that were moved out.

- [ ] **Step 3: Run existing generate tests**

Run: `pnpm test`
Expected: All 108 tests pass — behavior unchanged, just moved code.

- [ ] **Step 4: Commit**

```bash
git add packages/cli/src/claude-shared.ts packages/cli/src/generate.ts
git commit -m "refactor(cli): extract shared Claude utilities into claude-shared.ts"
```

---

## Task 7.5: Config module + Bridge PR2 additions

**Files:**
- Create: `packages/overlay/src/config.ts`
- Modify: `packages/overlay/src/bridge.ts`

- [ ] **Step 1: Create typed config module**

```typescript
// packages/overlay/src/config.ts
// Centralized config — no window globals.

let _hasApiKey = false;

/** Called once when the CLI sends its config message on WebSocket connect. */
export function setHasApiKey(value: boolean): void {
  _hasApiKey = value;
}

/** Whether the CLI has an ANTHROPIC_API_KEY configured. */
export function hasApiKey(): boolean {
  return _hasApiKey;
}
```

- [ ] **Step 2: Add config + applyAllComplete handling in bridge.ts**

In bridge.ts `ws.onmessage` handler, add:

```typescript
import { setHasApiKey } from "./config.js";

// In the message dispatch:
if (parsed.type === "config") {
  setHasApiKey(parsed.hasApiKey);
}
```

Also add the `onApplyAllComplete` listener:

```typescript
let applyAllCompleteListener: ((msg: Extract<ServerMessage, { type: "applyAllComplete" }>) => void) | null = null;

export function onApplyAllComplete(
  cb: (msg: Extract<ServerMessage, { type: "applyAllComplete" }>) => void,
): void {
  applyAllCompleteListener = cb;
}

// In ws.onmessage dispatch:
if (parsed.type === "applyAllComplete" && applyAllCompleteListener) {
  applyAllCompleteListener(parsed);
}
```

- [ ] **Step 3: Build overlay**

Run: `pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/config.ts packages/overlay/src/bridge.ts
git commit -m "feat(overlay): add typed config module and applyAllComplete bridge handler"
```

---

## Task 8: `claude-apply.ts` — Claude API write module

**Files:**
- Create: `packages/cli/src/claude-apply.ts`
- Create: `packages/cli/src/__tests__/claude-apply.test.ts`

- [ ] **Step 1: Write tests for the user message builder**

```typescript
// packages/cli/src/__tests__/claude-apply.test.ts
import { describe, it, expect } from "vitest";
import { buildApplyPrompt } from "../claude-apply.js";

describe("buildApplyPrompt", () => {
  it("builds property change prompt with className locator", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "property",
        componentName: "Button",
        tag: "button",
        filePath: "src/Button.tsx",
        textContent: "Submit",
        className: "bg-red-500 p-2",
        nthOfType: 1,
        parentTag: "form",
        parentClassName: "flex flex-col",
        lineHint: 10,
        updates: [{
          cssProperty: "background-color",
          tailwindPrefix: "bg",
          tailwindToken: "bg-blue-500",
          value: "#3b82f6",
          oldClass: "bg-red-500",
          newClass: "bg-blue-500",
        }],
      }],
      new Map([["src/Button.tsx", '1: export function Button() {\n2:   return <button className="bg-red-500 p-2">Submit</button>;\n3: }']]),
    );
    expect(prompt).toContain("src/Button.tsx");
    expect(prompt).toContain("bg-red-500");
    expect(prompt).toContain("bg-blue-500");
    expect(prompt).toContain("Button");
  });

  it("builds text change prompt for classless element", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "text",
        componentName: "Hero",
        tag: "p",
        filePath: "src/Hero.tsx",
        className: "",
        nthOfType: 2,
        parentTag: "section",
        parentClassName: "hero-content",
        lineHint: 15,
        originalText: "Founded in 2024",
        newText: "Founded in 2025",
      }],
      new Map([["src/Hero.tsx", "..."]]),
    );
    expect(prompt).toContain("2nd <p>");
    expect(prompt).toContain("hero-content");
    expect(prompt).toContain("Founded in 2024");
    expect(prompt).toContain("Founded in 2025");
  });

  it("builds move prompt with delta and resolved classes", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "move",
        componentName: "Card",
        tag: "div",
        filePath: "src/Card.tsx",
        className: "p-4 rounded",
        nthOfType: 1,
        parentTag: "section",
        parentClassName: "grid",
        lineHint: 8,
        delta: { dx: 16, dy: 0 },
        resolvedDx: "ml-4",
        resolvedDy: null,
      }],
      new Map([["src/Card.tsx", "..."]]),
    );
    expect(prompt).toContain("Move");
    expect(prompt).toContain("ml-4");
    expect(prompt).toContain("16px right");
  });

  it("builds prompt for classless element using structural locator", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "text",
        componentName: "About",
        tag: "p",
        filePath: "src/About.tsx",
        className: "",
        nthOfType: 3,
        parentTag: "div",
        parentClassName: "content-wrapper",
        lineHint: 20,
        originalText: "Old text",
        newText: "New text",
      }],
      new Map([["src/About.tsx", "..."]]),
    );
    expect(prompt).toContain("3rd <p>");
    expect(prompt).toContain("content-wrapper");
    expect(prompt).toContain("No className");
  });

  it("builds reorder prompt with child context", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "reorder",
        componentName: "Dashboard",
        tag: "div",
        filePath: "src/Dashboard.tsx",
        parentClassName: "grid grid-cols-3",
        lineHint: 5,
        childrenContext: [
          { tag: "StatsCard", className: "p-6", textContent: "Stats" },
          { tag: "Chart", className: "col-span-2", textContent: "" },
        ],
        fromIndex: 1,
        toIndex: 0,
      }],
      new Map([["src/Dashboard.tsx", "..."]]),
    );
    expect(prompt).toContain("Reorder");
    expect(prompt).toContain("grid grid-cols-3");
    expect(prompt).toContain("StatsCard");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter frameup exec vitest run src/__tests__/claude-apply.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement `claude-apply.ts`**

```typescript
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

const HAIKU_MODEL = "claude-haiku-4-5-20251001";
const SONNET_MODEL = "claude-sonnet-4-6-20250514";

function getModelForChanges(changes: ApplyChange[]): string {
  // v1: whole batch uses one model. If any change is a reorder, use Sonnet.
  // Known cost optimization for later: split batch — send property/text/move
  // to Haiku, send reorders to Sonnet, merge results. Not worth the
  // complexity for v1, but document it here for future reference.
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
  // Group changes by file
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
    // Add line numbers to content
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
  const locator = change.className
    ? `Current className: "${change.className}"`
    : `No className. ${formatStructuralLocator(change)}`;

  switch (change.type) {
    case "property": {
      let s = `**Property change** on <${change.tag}> in ${change.componentName} component (~line ${change.lineHint})\n`;
      if (change.textContent) s += `   Text content: "${change.textContent}"\n`;
      s += `   ${locator}\n`;
      s += `   Changes:\n`;
      for (const u of change.updates) {
        s += `     - Replace class \`${u.oldClass}\` with \`${u.newClass}\`\n`;
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

  // Collect referenced files
  const filePaths = [...new Set(changes.map((c) => c.filePath))];
  const { sources, undoEntries } = readSourceFiles(filePaths, projectRoot);

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

  // IMPORTANT: Collect all replacements per file FIRST, then write once.
  // If two diffs target the same file and we write after each one,
  // the second applyReplacements would work against stale content.
  const replacementsByFile = new Map<string, { resolvedPath: string; replacements: any[]; descriptions: string[] }>();

  for (const diff of parsed) {
    const filePath = diff.filePath;
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(projectRoot, filePath);
    const original = sources.get(filePath);
    if (!original) {
      failedCount++;
      continue;
    }

    const validation = validateDiffChange(diff, original, resolvedPath);
    if (!validation.valid) {
      failedCount++;
      continue;
    }

    if (!replacementsByFile.has(filePath)) {
      replacementsByFile.set(filePath, { resolvedPath, replacements: [], descriptions: [] });
    }
    const entry = replacementsByFile.get(filePath)!;
    entry.replacements.push(...validation.replacements!);
    entry.descriptions.push(diff.description || "Applied changes");
  }

  // Now write each file exactly once with all its replacements merged
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
```

- [ ] **Step 4: Run tests**

Run: `pnpm --filter frameup exec vitest run src/__tests__/claude-apply.test.ts`
Expected: All 5 prompt builder tests pass

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/claude-apply.ts packages/cli/src/__tests__/claude-apply.test.ts
git commit -m "feat(cli): add claude-apply.ts for batched Claude API writes"
```

---

## Task 9: Server — `applyAllChanges` handler

**Files:**
- Modify: `packages/cli/src/server.ts`

- [ ] **Step 1: Add import**

```typescript
import { applyAllChanges } from "./claude-apply.js";
```

- [ ] **Step 2: Add `applyAllChanges` case to the inline message switch**

In the `ws.on("message")` handler, alongside the `"generate"` case (~line 342), add:

```typescript
      case "applyAllChanges": {
        if (generateLocked) {
          respond({
            type: "applyAllComplete",
            success: false,
            appliedCount: 0,
            failedCount: msg.changes.length,
            undoIds: [],
            error: "Another operation is in progress",
          });
          break;
        }
        generateLocked = true;

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          generateLocked = false;
          respond({
            type: "applyAllComplete",
            success: false,
            appliedCount: 0,
            failedCount: msg.changes.length,
            undoIds: [],
            error: "ANTHROPIC_API_KEY not set in .env",
          });
          break;
        }

        applyAllChanges({
          changes: msg.changes,
          apiKey,
          projectRoot,
        })
          .then((result) => {
            // Push undo entries
            const undoIds: string[] = [];
            for (const entry of result.undoEntries) {
              const undoId = `apply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
              undoStack.push({
                id: undoId,
                filePath: entry.filePath,
                content: entry.content,
                afterContent: entry.afterContent,
                timestamp: Date.now(),
              });
              undoIds.push(undoId);
            }
            respond({
              type: "applyAllComplete",
              success: result.success,
              appliedCount: result.appliedCount,
              failedCount: result.failedCount,
              undoIds,
              error: result.error,
            });
          })
          .catch((err) => {
            respond({
              type: "applyAllComplete",
              success: false,
              appliedCount: 0,
              failedCount: msg.changes.length,
              undoIds: [],
              error: err instanceof Error ? err.message : "Unknown error",
            });
          })
          .finally(() => {
            generateLocked = false;
            processQueue();
          });
        break;
      }
```

- [ ] **Step 3: Build and test**

Run: `pnpm build && pnpm test`
Expected: All tests pass, build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(server): add applyAllChanges handler with generateLocked guard"
```

---

## Task 10: Shared `computeNthOfType()` utility

**Files:**
- Create: `packages/overlay/src/utils/nth-of-type.ts`

- [ ] **Step 1: Create the utility**

```typescript
// packages/overlay/src/utils/nth-of-type.ts

/** Count how many preceding siblings share the same tagName (1-indexed). */
export function computeNthOfType(el: HTMLElement): number {
  const parent = el.parentElement;
  if (!parent) return 1;
  let nth = 1;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === el) break;
    if (parent.children[i].tagName === el.tagName) nth++;
  }
  return nth;
}
```

- [ ] **Step 2: Build overlay**

Run: `pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/utils/nth-of-type.ts
git commit -m "feat(overlay): add shared computeNthOfType utility"
```

---

## Task 11: Pending Changes Store (Overlay)

**Files:**
- Create: `packages/overlay/src/pending-changes.ts`
- Create: `packages/overlay/src/__tests__/pending-changes.test.ts`
- Modify: `packages/overlay/src/toolbar.ts` (update `showToast` signature)

- [ ] **Step 0: Update `showToast` to accept severity level**

The existing `showToast(message: string)` in `toolbar.ts` only accepts a message. The pending store needs severity levels for different toast types. Update the signature:

```typescript
export function showToast(
  message: string,
  level: "info" | "success" | "warning" | "error" = "info",
): void {
  // Existing implementation — optionally style background based on level:
  // info: #1f2937, success: #065f46, warning: #92400e, error: #991b1b
}
```

- [ ] **Step 1: Implement the pending changes store**

```typescript
// packages/overlay/src/pending-changes.ts
import type { ApplyChange } from "@frameup/shared";
import { send, onApplyAllComplete } from "./bridge.js";
import { showToast } from "./toolbar.js";

type PendingElementKey = string;

/**
 * Identity-based key using component name, file path, line/column, and tag.
 * Stable within one HMR cycle. We clear pending changes after each apply,
 * so line drift across HMR boundaries is fine.
 */
function makeElementKey(change: ApplyChange): PendingElementKey {
  return `${change.componentName}:${change.filePath}:${change.lineHint}:${change.tag}`;
}

const APPLY_TIMEOUT_MS = 30_000;

const pending = new Map<PendingElementKey, ApplyChange>();
let applying = false;
let applyTimeoutId: ReturnType<typeof setTimeout> | null = null;
let onCountChange: ((count: number) => void) | null = null;

export function setOnCountChange(cb: (count: number) => void): void {
  onCountChange = cb;
}

export function addToPending(change: ApplyChange): void {
  if (!change.filePath) {
    showToast("Cannot track changes — source file not resolved", "warning");
    return;
  }
  const key = makeElementKey(change);

  // Merge property updates on same element
  const existing = pending.get(key);
  if (existing && existing.type === "property" && change.type === "property") {
    for (const update of change.updates) {
      const idx = existing.updates.findIndex((u) => u.cssProperty === update.cssProperty);
      if (idx >= 0) {
        existing.updates[idx] = update;
      } else {
        existing.updates.push(update);
      }
    }
  } else {
    pending.set(key, change);
  }

  onCountChange?.(pending.size);
}

export function pendingCount(): number {
  return pending.size;
}

export function isApplying(): boolean {
  return applying;
}

export function getAllPending(): ApplyChange[] {
  return [...pending.values()];
}

export function clearAll(): void {
  pending.clear();
  onCountChange?.(0);
}

/**
 * Discard all pending changes and remove inline CSS previews.
 * Called when user clicks "Discard" or presses Escape.
 *
 * v1 limitation: inline CSS previews applied by property-controller
 * are not automatically reverted on discard. The user must refresh
 * the page to clear stale previews. This is acceptable for v1 because:
 * - HMR will reset styles on next code change
 * - The visual inconsistency is temporary and non-destructive
 * - Proper cleanup requires tracking applied inline overrides per element,
 *   which is a non-trivial addition better suited for a follow-up.
 */
export function discardAll(): void {
  clearAll();
  showToast("Discarded all pending changes", "info");
}

export function confirmAll(): void {
  if (pending.size === 0 || applying) return;
  applying = true;
  onCountChange?.(pending.size); // triggers UI update to show spinner

  send({ type: "applyAllChanges", changes: getAllPending() });

  // Safety timeout — if no response comes back (e.g. WebSocket disconnect),
  // reset state so the user isn't stuck in limbo.
  applyTimeoutId = setTimeout(() => {
    if (applying) {
      applying = false;
      onCountChange?.(pending.size);
      showToast("Apply timed out — changes still pending, try again", "error");
    }
  }, APPLY_TIMEOUT_MS);
}

// Listen for result
onApplyAllComplete((msg) => {
  applying = false;
  if (applyTimeoutId) {
    clearTimeout(applyTimeoutId);
    applyTimeoutId = null;
  }
  if (msg.success) {
    clearAll();
    showToast(`Applied ${msg.appliedCount} change${msg.appliedCount === 1 ? "" : "s"}`, "success");
  } else if (msg.appliedCount > 0) {
    // Partial success — clear applied, keep failures
    showToast(`Applied ${msg.appliedCount}, failed ${msg.failedCount}`, "warning");
    // For simplicity, clear all — Claude already wrote what it could
    clearAll();
  } else {
    showToast(msg.error || "Failed to apply changes", "error");
  }
  onCountChange?.(pending.size);
});
```

- [ ] **Step 2: Write unit tests for pending store**

```typescript
// packages/overlay/src/__tests__/pending-changes.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock bridge before import
vi.mock("../bridge.js", () => ({
  send: vi.fn(),
  onApplyAllComplete: vi.fn(),
}));
vi.mock("../toolbar.js", () => ({
  showToast: vi.fn(),
}));

import { addToPending, pendingCount, clearAll, getAllPending, discardAll } from "../pending-changes.js";
import type { ApplyChange } from "@frameup/shared";

describe("pending-changes store", () => {
  beforeEach(() => {
    clearAll();
  });

  it("adds a change and increments count", () => {
    const change: ApplyChange = {
      type: "text",
      componentName: "Hero",
      tag: "p",
      filePath: "src/Hero.tsx",
      className: "text-lg",
      nthOfType: 1,
      parentTag: "section",
      parentClassName: "hero",
      lineHint: 10,
      originalText: "Hello",
      newText: "World",
    };
    addToPending(change);
    expect(pendingCount()).toBe(1);
  });

  it("merges property updates on the same element", () => {
    const base = {
      type: "property" as const,
      componentName: "Button",
      tag: "button",
      filePath: "src/Button.tsx",
      textContent: "Submit",
      className: "bg-red-500 p-2",
      nthOfType: 1,
      parentTag: "form",
      parentClassName: "flex",
      lineHint: 5,
    };
    addToPending({ ...base, updates: [{ cssProperty: "background-color", tailwindPrefix: "bg", tailwindToken: "bg-blue-500", value: "#3b82f6", oldClass: "bg-red-500", newClass: "bg-blue-500" }] });
    addToPending({ ...base, updates: [{ cssProperty: "padding", tailwindPrefix: "p", tailwindToken: "p-4", value: "16px", oldClass: "p-2", newClass: "p-4" }] });
    expect(pendingCount()).toBe(1);
    const all = getAllPending();
    expect(all[0].type === "property" && all[0].updates.length).toBe(2);
  });

  it("clearAll resets count to 0", () => {
    addToPending({
      type: "text",
      componentName: "X",
      tag: "p",
      filePath: "src/X.tsx",
      className: "",
      nthOfType: 1,
      parentTag: "div",
      parentClassName: "",
      lineHint: 1,
      originalText: "a",
      newText: "b",
    });
    expect(pendingCount()).toBe(1);
    clearAll();
    expect(pendingCount()).toBe(0);
  });

  it("rejects changes with empty filePath", () => {
    addToPending({
      type: "text",
      componentName: "X",
      tag: "p",
      filePath: "",
      className: "",
      nthOfType: 1,
      parentTag: "div",
      parentClassName: "",
      lineHint: 1,
      originalText: "a",
      newText: "b",
    });
    expect(pendingCount()).toBe(0);
  });
});
```

- [ ] **Step 3: Run tests**

Run: `pnpm --filter @frameup/overlay exec vitest run src/__tests__/pending-changes.test.ts`
Expected: All 4 tests pass

- [ ] **Step 4: Build overlay**

Run: `pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/pending-changes.ts packages/overlay/src/__tests__/pending-changes.test.ts
git commit -m "feat(overlay): add pending changes store with merge, confirmAll, and tests"
```

---

## Task 12: Server sends API key config on WebSocket connect

> Config message type already added in Task 3.5. Bridge handler already added in Task 7.5. This task wires the server side.

**Files:**
- Modify: `packages/cli/src/server.ts`

- [ ] **Step 1: Send config on WebSocket connect**

In `server.ts`, in the `ws.on("connection")` handler, send immediately after connection:

```typescript
ws.send(JSON.stringify({
  type: "config",
  hasApiKey: !!process.env.ANTHROPIC_API_KEY,
}));
```

- [ ] **Step 2: Build and test**

Run: `pnpm build && pnpm test`
Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(server): send API key config flag to overlay on WebSocket connect"
```

---

## Task 13: "Confirm Changes" + "Discard" buttons in toolbar

**Files:**
- Modify: `packages/overlay/src/toolbar.ts`

- [ ] **Step 1: Read toolbar.ts to find the HTML template and button pattern**

Read: `packages/overlay/src/toolbar.ts` lines 186–220

- [ ] **Step 2: Add "Confirm Changes" and "Discard" buttons to the toolbar HTML template**

Add buttons **before the close button** in the template (~line 197), so they appear between the generate and close buttons:

```html
<div class="pending-actions" style="display:none">
  <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
  <button class="discard-btn" title="Discard all pending changes">✕</button>
</div>
```

- [ ] **Step 3: Add styling for the pending action buttons**

Add CSS in the toolbar's `<style>` block:

```css
.pending-actions {
  display: none;
  align-items: center;
  gap: 4px;
}
.confirm-btn {
  padding: 4px 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-family: ${FONT_FAMILY};
  cursor: pointer;
  white-space: nowrap;
}
.confirm-btn:hover { background: #1d4ed8; }
.confirm-btn:disabled { opacity: 0.5; cursor: wait; }
.discard-btn {
  padding: 4px 8px;
  background: transparent;
  color: #9ca3af;
  border: 1px solid #374151;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}
.discard-btn:hover { color: #ef4444; border-color: #ef4444; }
```

- [ ] **Step 4: Wire up button clicks + count updates + Escape key**

In `mountToolbar()`, after existing button listeners:

```typescript
const pendingActions = shadow.querySelector(".pending-actions") as HTMLDivElement;
const confirmBtn = shadow.querySelector(".confirm-btn") as HTMLButtonElement;
const discardBtn = shadow.querySelector(".discard-btn") as HTMLButtonElement;

// Update button visibility and text when pending count changes
setOnCountChange((count) => {
  if (count > 0 && !isApplying()) {
    pendingActions.style.display = "flex";
    confirmBtn.textContent = `Confirm Changes (${count})`;
    confirmBtn.disabled = false;
  } else if (isApplying()) {
    pendingActions.style.display = "flex";
    confirmBtn.textContent = "Applying...";
    confirmBtn.disabled = true;
    discardBtn.style.display = "none";
  } else {
    pendingActions.style.display = "none";
    discardBtn.style.display = "inline-block";
  }
});

confirmBtn.addEventListener("click", () => {
  confirmAll();
});

discardBtn.addEventListener("click", () => {
  discardAll();
});

// Escape key discards all pending changes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pendingCount() > 0 && !isApplying()) {
    discardAll();
  }
});
```

Add imports at top of toolbar.ts:

```typescript
import { setOnCountChange, confirmAll, discardAll, isApplying, pendingCount } from "./pending-changes.js";
```

- [ ] **Step 5: Build and manual test**

Run: `pnpm build`
Expected: Build succeeds. Button should appear when changes are pending.

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/toolbar.ts
git commit -m "feat(toolbar): add Confirm Changes button with count badge"
```

---

## Task 14: Wire property-controller.ts to pending store (Path B)

**Files:**
- Modify: `packages/overlay/src/properties/property-controller.ts`

- [ ] **Step 1: Read the commit() and scheduledCommit() functions**

Read: `packages/overlay/src/properties/property-controller.ts` lines 395–401 (scheduledCommit) and 676–774 (commit)

- [ ] **Step 2: Add Path B conditional in `scheduledCommit()`**

Replace the body of `scheduledCommit()` (~line 395–401):

**Important:** This step depends on Task 7.5 (config module) and Task 12 (API key flag) being implemented first. The overlay runs in the browser and can't read `process.env`. Task 12 sends the flag via WebSocket; Task 7.5's config module exposes `hasApiKey()`.

```typescript
function scheduledCommit(): void {
  // Path B: API key present → batch, don't write immediately
  if (hasApiKey()) {
    addPendingFromCurrentState();
    return;
  }
  // Path A: no API key → existing immediate write behavior
  clearTimeout(commitTimer);
  commitTimer = window.setTimeout(commit, COMMIT_DEBOUNCE_MS);
}
```

- [ ] **Step 3: Add `addPendingFromCurrentState()` helper**

```typescript
import { addToPending } from "../pending-changes.js";
import { computeNthOfType } from "../utils/nth-of-type.js";
import { hasApiKey } from "../config.js";

function addPendingFromCurrentState(): void {
  if (!state.selectedElement || !state.componentInfo || state.pendingBatch.size === 0) return;

  const el = state.selectedElement;
  const info = state.componentInfo;
  const parentEl = el.parentElement;

  // PendingUpdate has: property, cssProperty, value, tailwindPrefix, tailwindToken, originalValue
  // We need to compute oldClass/newClass from the className string + prefix.
  const currentClassName = el.className || "";
  const updates: Array<{ cssProperty: string; tailwindPrefix: string; tailwindToken: string | null; value: string; oldClass: string; newClass: string }> = [];
  for (const [cssProperty, entry] of state.pendingBatch) {
    // Find the old class: the class in the original className that starts with this prefix
    const classes = currentClassName.split(/\s+/);
    const oldClass = state.originalValues.has(entry.property)
      ? classes.find((c) => c.startsWith(entry.tailwindPrefix + "-") || c === entry.tailwindPrefix) || ""
      : "";
    const newClass = entry.tailwindToken || "";
    updates.push({
      cssProperty,
      tailwindPrefix: entry.tailwindPrefix,
      tailwindToken: entry.tailwindToken,
      value: entry.value,
      oldClass,
      newClass,
    });
  }

  addToPending({
    type: "property",
    componentName: info.componentName,
    tag: info.tagName,
    filePath: info.filePath,
    textContent: (el.textContent || "").slice(0, 50),
    className: el.className,
    nthOfType: computeNthOfType(el),
    parentTag: parentEl?.tagName.toLowerCase() || "",
    parentClassName: parentEl?.className || "",
    lineHint: info.lineNumber,
    updates,
  });
}
```

- [ ] **Step 4: Wire `commitAndDeselect()` to pending store (no auto-confirm)**

In `commitAndDeselect()` (~line 822), add to pending but do NOT auto-confirm. The change stays pending until the user explicitly clicks "Confirm Changes". This avoids surprise 2-3s API calls when the user is just previewing.

```typescript
function commitAndDeselect(): void {
  if (hasApiKey()) {
    addPendingFromCurrentState();
    deselect();
    return;
  }
  // Path A: existing immediate behavior
  // ...existing code...
}
```

- [ ] **Step 5: Add read-only "Preview only" mode when filePath is empty**

In `inspect()` (~line 533), after checking `info.filePath`:

```typescript
if (!info.filePath) {
  state.readOnly = true;
}
```

**Read-only mode UI specification:**

1. **Banner at top of sidebar:** A yellow/amber banner with icon: `"⚠ Preview only — source file not found"`. Styled with `background: #fef3c7; color: #92400e; padding: 8px 12px; border-radius: 6px; font-size: 11px; margin-bottom: 8px;`

2. **All property controls disabled:** Add `pointer-events: none; opacity: 0.5;` to all slider, color picker, and input elements when `state.readOnly` is true. Users can still see computed values but cannot interact.

3. **No text editing:** Suppress double-click-to-edit text when `state.readOnly` is true (check in the inline-text-edit entry point).

4. **No drag:** Suppress drag initiation when the selected element is in read-only mode.

5. **Why it matters:** Without this, users click a library wrapper element (e.g., framer-motion), see the sidebar open, try to change something, and get a confusing error when the change can't be applied. Read-only mode sets expectations upfront.

- [ ] **Step 6: Build and test**

Run: `pnpm build && pnpm test`
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "feat(property-controller): add Path B pending store + read-only mode"
```

---

## Task 15: Wire inline-text-edit.ts to pending store (Path B)

**Files:**
- Modify: `packages/overlay/src/inline-text-edit.ts`

- [ ] **Step 1: Read the commit path**

Read: `packages/overlay/src/inline-text-edit.ts` lines 354–371

- [ ] **Step 2: Add Path B conditional in `commitAndExit()`**

In `commitAndExit()`, before the existing `send({ type: "updateText" ... })` block (~line 354):

```typescript
import { addToPending } from "./pending-changes.js";
import { computeNthOfType } from "./utils/nth-of-type.js";
import { hasApiKey } from "./config.js";

// Path B: API key present → add to pending store
if (hasApiKey() && componentInfo.filePath) {
  const el = editingElement;
  const parentEl = el?.parentElement;

  addToPending({
    type: "text",
    componentName: componentInfo.componentName,
    tag: componentInfo.tagName,
    filePath: componentInfo.filePath,
    className: el?.className || "",
    nthOfType: el ? computeNthOfType(el) : 1,
    parentTag: parentEl?.tagName.toLowerCase() || "",
    parentClassName: parentEl?.className || "",
    lineHint: componentInfo.lineNumber,
    originalText: originalTextContent,
    newText,
  });
  exitEditMode();
  return;
}
// Path A: existing immediate write
```

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/inline-text-edit.ts
git commit -m "feat(inline-text-edit): add Path B pending store for text edits"
```

---

## Task 16: Wire drag.ts to pending store (Path B)

**Files:**
- Modify: `packages/overlay/src/drag.ts`

- [ ] **Step 1: Read the reorder send path**

Read: `packages/overlay/src/drag.ts` lines 234–241

- [ ] **Step 2: Add Path B conditional in `handleDragEnd()`**

Before the existing `send({ type: "reorder" ... })` block (~line 234):

```typescript
import { addToPending } from "./pending-changes.js";
import { hasApiKey } from "./config.js";

// Path B: API key present → add to pending store
if (hasApiKey()) {
  const parentEl = dragSelection.element?.parentElement;
  const children = parentEl ? Array.from(parentEl.children) : [];
  const childrenContext = children.map((child) => ({
    tag: child.tagName.toLowerCase(),
    className: (child as HTMLElement).className || "",
    textContent: (child.textContent || "").slice(0, 30),
  }));

  addToPending({
    type: "reorder",
    componentName: dragSelection.componentName,
    tag: dragSelection.element?.tagName.toLowerCase() || "div",
    filePath: dragSelection.filePath,
    parentClassName: parentEl?.className || "",
    lineHint: dragSelection.lineNumber,
    childrenContext,
    fromIndex: /* current index of dragged element */,
    toIndex: /* target index from drop position */,
  });
  cleanupDrag();
  return;
}
// Path A: existing immediate write
```

Note: The exact `fromIndex`/`toIndex` calculation depends on how the drag system tracks position. Read the existing drag state to extract these values.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/drag.ts
git commit -m "feat(drag): add Path B pending store for reorder"
```

---

## Task 17: Wire move.ts to pending store (Path B)

**Files:**
- Modify: `packages/overlay/src/tools/move.ts`

- [ ] **Step 1: Read the move commit path**

Read: `packages/overlay/src/tools/move.ts` — find where the `move` message is sent via WebSocket.

- [ ] **Step 2: Add Path B conditional before the existing move send**

```typescript
import { addToPending } from "../pending-changes.js";
import { computeNthOfType } from "../utils/nth-of-type.js";
import { hasApiKey } from "../config.js";

// Path B: API key present → add to pending store
if (hasApiKey() && componentInfo.filePath) {
  const el = moveState.element;
  const parentEl = el?.parentElement;

  addToPending({
    type: "move",
    componentName: componentInfo.componentName,
    tag: componentInfo.tagName,
    filePath: componentInfo.filePath,
    className: el?.className || "",
    nthOfType: el ? computeNthOfType(el) : 1,
    parentTag: parentEl?.tagName.toLowerCase() || "",
    parentClassName: parentEl?.className || "",
    lineHint: componentInfo.lineNumber,
    delta: { dx: moveState.totalDx, dy: moveState.totalDy },
    resolvedDx: moveState.resolvedDx || null,
    resolvedDy: moveState.resolvedDy || null,
  });
  cleanupMove();
  return;
}
// Path A: existing immediate write
```

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/tools/move.ts
git commit -m "feat(move): add Path B pending store for move edits"
```

---

## Task 18: Changelog integration for batched changes

**Files:**
- Modify: `packages/overlay/src/changelog.ts`
- Modify: `packages/overlay/src/pending-changes.ts`

- [ ] **Step 1: Read changelog.ts to understand the existing entry format**

Read: `packages/overlay/src/changelog.ts`
Note the `addEntry()` function, `ChangelogEntry` type, and how revert data is structured.

- [ ] **Step 2: Add "pending" state to changelog entries**

When `addToPending()` is called, create a changelog entry with `state: "pending"`:

```typescript
// In pending-changes.ts, after adding to the pending map:
import { addEntry } from "./changelog.js";

addEntry({
  description: formatPendingDescription(change),
  state: "pending",
  // No revert data yet — change hasn't been applied to disk
});
```

- [ ] **Step 3: Promote entries to "active" on successful apply**

In the `onApplyAllComplete` handler, promote all pending entries to active:

```typescript
// After msg.success:
promoteAllPending(); // Mark all "pending" entries as "active"
```

- [ ] **Step 4: Remove pending entries on discard**

In `discardAll()`, remove all changelog entries with `state: "pending"`.

- [ ] **Step 5: Build and test**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/changelog.ts packages/overlay/src/pending-changes.ts
git commit -m "feat(changelog): track pending/active state for batched changes"
```

---

## Task 19: Full integration test

- [ ] **Step 1: Build everything**

Run: `pnpm build`
Expected: All packages build successfully

- [ ] **Step 2: Run all tests**

Run: `pnpm test && pnpm --filter @frameup/overlay exec vitest run`
Expected: All CLI tests (108+) and overlay tests (48+) pass

- [ ] **Step 3: Manual test — Path A (no API key)**

1. Remove `ANTHROPIC_API_KEY` from `.env`
2. Start test app: `cd test-app && pnpm dev`
3. Start FrameUp: `node ../packages/cli/bin/frameup.js 3000`
4. Click an element → verify file path resolves (Layer 1 or Layer 2)
5. Change a property → verify immediate write (Path A behavior)
6. Verify no "Confirm Changes" button appears

- [ ] **Step 4: Manual test — Path B (with API key)**

1. Set `ANTHROPIC_API_KEY=sk-ant-...` in `.env`
2. Restart FrameUp
3. Click an element → change font-size → verify preview only (no file write)
4. Click a second element → verify first element's change stays pending (no auto-confirm)
5. Verify "Confirm Changes (2)" button appears with discard (✕) button
6. Click "Confirm Changes" → verify all changes apply and file updates
7. Verify HMR fires and page updates

- [ ] **Step 4.5: Manual test — Discard flow**

1. Make changes to 2-3 elements (Path B, API key set)
2. Verify "Confirm Changes (N)" shows in toolbar
3. Press Escape → verify all pending changes cleared, inline previews removed, toast shows "Discarded"
4. Alternatively: click the ✕ discard button → same behavior
5. Verify changelog panel cleared pending entries

- [ ] **Step 5: Manual test — file discovery (Layer 2)**

1. Find a component where fiber resolution returns empty filePath
2. Click it → verify the CLI terminal shows `[FrameUp] discoverFile: ComponentName → src/...`
3. Verify the property panel opens normally (not read-only)

- [ ] **Step 6: Manual test — read-only mode (Layer 3)**

1. Click on a framer-motion library element where even grep can't find the source
2. Verify the property panel opens in read-only mode with "Preview only" indicator
3. Verify the user can see computed styles but cannot edit

- [ ] **Step 7: Commit**

```bash
git add packages/
git commit -m "feat: complete batched Claude API writes with dual-path system"
```

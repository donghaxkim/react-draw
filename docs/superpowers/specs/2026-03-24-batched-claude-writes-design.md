# Batched Claude API Writes — Design Spec

**Date:** 2026-03-24
**Status:** Draft (v2 — incorporates review feedback)

## Problem

FrameUp currently writes to source files immediately on every property change via jscodeshift AST transforms. This requires exact `line:col` coordinates from React fiber resolution, which fails frequently on React 19 + Next.js because:

1. `getOwnerStack()` returns bundler-mangled URLs that can't be resolved to file paths
2. Library wrapper components (framer-motion, etc.) resolve instead of the user's component
3. Coordinates drift after each file write + HMR cycle, breaking subsequent edits

## Solution

A **dual-path write system**:

- **Path A (Direct AST):** When valid `filePath` + `line:col` are available and no API key is configured, use the existing jscodeshift transforms. Instant, free, zero setup.
- **Path B (Claude API):** When an API key is configured, batch all changes and write via Claude Haiku. More reliable, handles classless elements, survives coordinate drift.

Changes accumulate as visual previews. Writes happen either:
- **On element deselect / switch** (auto-confirm) — single-element changes apply automatically, preserving the current instant-edit UX
- **On "Confirm Changes" button click** — for batched multi-element workflows

## Architecture

### Write Path Selection

```
User clicks element
       ↓
Resolve filePath:
  Layer 1: getOwnerStack() + extractFilePath()     [overlay, ~10ms]
  Layer 2: discoverFile(componentName) via CLI grep  [CLI, ~50ms, cached]
  Layer 3: all failed → read-only mode
       ↓ filePath resolved
User makes a change
       ↓
Has ANTHROPIC_API_KEY?
  ├─ YES → Path B (Claude API) — batched, auto-confirm on deselect or manual confirm
  └─ NO  → Path A (Direct AST) — immediate write if coordinates valid
                 ├─ Coordinates valid? → jscodeshift transform (current behavior)
                 └─ Coordinates invalid? → toast: "Add API key for reliable edits"
```

File discovery (Layer 1 + 2) runs **once per component** at selection time. Results are cached for the session. Both Path A and Path B benefit from it.

Path A is the zero-setup experience. Path B is the premium experience for users who configure an API key.

### Flow (Path B — Claude API)

```
User tweaks properties on element A (preview only — inline CSS)
User clicks element B → auto-confirm triggers for A
User tweaks element B, edits text on C, moves D
       ↓
Changes stored in pendingChanges store (overlay memory)
       ↓
Auto-confirm on deselect (single change) OR
User clicks "Confirm Changes (3)" for batch
       ↓
Overlay sends { type: "applyAllChanges", changes: [...] } via WebSocket
       ↓
CLI calls Claude API with file contents + structured change descriptions
       ↓
Claude returns SEARCH/REPLACE blocks
       ↓
CLI applies edits, writes files → HMR fires → pending state clears
```

### What Goes Through Claude (Path B)

**Everything:**
- Property/className changes
- Text content edits
- Element reorder/move
- Color changes

### What Stays the Same

- Visual preview system (inline CSS overrides, CSS transforms for moves)
- Element selection and fiber resolution (still needed for component name + context)
- WebSocket communication between overlay and CLI
- Undo/revert system (CLI still saves before/after content)
- Changelog entries (still tracked per-change)
- Path A: existing jscodeshift pipeline (kept as fallback and no-key default)

## File Discovery — Solving the Root Cause

### The Core Problem

On React 19 + Next.js, `getOwnerStack()` returns bundler-mangled URLs that can't be resolved to file paths. The `extractFilePath()` utility (added earlier this session) handles many cases, but library wrappers (framer-motion, etc.) and certain bundler configurations still produce empty `filePath`. Without a file path, neither Path A nor Path B can work.

However, the **component name** (`fiber.type.name`) is always available — it comes directly from the React fiber, not from source maps. This is the key insight.

### Solution: `discoverFile()` — grep-based file resolution

New utility: `packages/cli/src/file-discovery.ts`

When the overlay resolves a component but `filePath` is empty, it sends the `componentName` to the CLI, which greps the project to find the file.

```typescript
import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";

/**
 * Discover which source file defines a React component by name.
 * Uses ripgrep (rg) if available, falls back to grep.
 *
 * Searches for: function ComponentName, const ComponentName, class ComponentName
 * Scoped to src/ and app/ directories, excludes node_modules, .next, dist.
 */
export function discoverFile(
  componentName: string,
  projectRoot: string
): string | null {
  // Step 1: Broad grep — find ALL files mentioning this component name
  // Then rank by definition likelihood
  try {
    const result = execSync(
      `grep -rn "${componentName}" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist .`,
      { cwd: projectRoot, timeout: 3000, encoding: "utf-8" }
    ).trim();

    if (!result) return null;

    const lines = result.split("\n").filter(Boolean);

    // Step 2: Rank matches — definitions score higher than usages
    const DEFINITION_PATTERNS = [
      new RegExp(`function\\s+${componentName}\\b`),
      new RegExp(`const\\s+${componentName}\\s*[=:]`),
      new RegExp(`let\\s+${componentName}\\s*=`),
      new RegExp(`class\\s+${componentName}\\s`),
      new RegExp(`export\\s+default\\s+function\\s+${componentName}\\b`),
    ];
    const REEXPORT_PATTERN = new RegExp(
      `export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from`
    );

    const definitions: string[] = [];
    const reexports: string[] = [];

    for (const line of lines) {
      const [fileWithLine] = line.split(":");
      const filePath = fileWithLine.replace(/^\.\//, "");
      const content = line.slice(line.indexOf(":", line.indexOf(":") + 1) + 1);

      if (DEFINITION_PATTERNS.some(p => p.test(content))) {
        definitions.push(filePath);
      } else if (REEXPORT_PATTERN.test(content)) {
        reexports.push(filePath);
      }
    }

    // Step 3: Prefer definitions over re-exports
    // Skip barrel/index files — they re-export, not define
    const isBarrelFile = (f: string) =>
      f.endsWith("/index.ts") || f.endsWith("/index.tsx") || f.endsWith("/index.js");

    const realDefinitions = definitions.filter(f => !isBarrelFile(f));
    if (realDefinitions.length > 0) {
      // Prefer src/ or app/ files
      const preferred = realDefinitions.find(f => f.startsWith("src/") || f.startsWith("app/"));
      return preferred || realDefinitions[0];
    }

    // Step 4: If only found in barrel files, follow the re-export
    if (reexports.length > 0 || definitions.filter(isBarrelFile).length > 0) {
      // Parse the re-export to find the actual source
      const barrelFile = reexports[0] || definitions.filter(isBarrelFile)[0];
      const resolved = followReexport(barrelFile, componentName, projectRoot);
      if (resolved) return resolved;
    }

    // Step 5: Fallback — any non-import mention in a non-barrel file
    const allFiles = [...new Set(lines.map(l => {
      const f = l.split(":")[0];
      return f.startsWith("./") ? f.slice(2) : f;
    }))].filter(f => !isBarrelFile(f) && !f.includes("node_modules"));

    if (allFiles.length > 0) {
      const preferred = allFiles.find(f => f.startsWith("src/") || f.startsWith("app/"));
      return preferred || allFiles[0];
    }
  } catch {
    // grep failed
  }

  return null;
}

/**
 * Follow a re-export in a barrel file to find the actual source file.
 * Handles: export { Foo } from "./foo"
 */
function followReexport(
  barrelFilePath: string,
  componentName: string,
  projectRoot: string
): string | null {
  try {
    const fullPath = path.resolve(projectRoot, barrelFilePath);
    const content = fs.readFileSync(fullPath, "utf-8");
    const reexportMatch = content.match(
      new RegExp(`export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from\\s*["']([^"']+)["']`)
    );
    if (!reexportMatch) return null;

    const importPath = reexportMatch[1];
    const barrelDir = path.dirname(fullPath);
    // Try common extensions
    for (const ext of [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
      const candidate = path.resolve(barrelDir, importPath + ext);
      if (fs.existsSync(candidate)) {
        return path.relative(projectRoot, candidate);
      }
    }
    // Try without extension (might already have it)
    const direct = path.resolve(barrelDir, importPath);
    if (fs.existsSync(direct)) {
      return path.relative(projectRoot, direct);
    }
  } catch {
    // barrel file read/parse failed
  }
  return null;
}
```

### Resolution Pipeline (Updated)

The full resolution pipeline now has three layers:

```
User clicks element
       ↓
Layer 1: getOwnerStack() + extractFilePath()    [overlay, ~10ms]
  → filePath found? Use it.
       ↓ empty
Layer 2: discoverFile(componentName, projectRoot) [CLI, ~50ms]
  → Overlay sends: { type: "discoverFile", componentName: "CheckoutForm" }
  → CLI greps project, responds: { filePath: "src/app/checkout/page.tsx" }
  → filePath found? Use it.
       ↓ not found
Layer 3: Property panel opens in read-only "Preview only" mode
  → Toast: "Source file not found for CheckoutForm"
```

Layer 2 is a **one-time cost per component** — results are cached in the overlay for the session. Subsequent clicks on elements from the same component use the cached file path.

### WebSocket Messages for File Discovery

```typescript
// ClientMessage
| { type: "discoverFile"; componentName: string }

// ServerMessage
| { type: "discoverFileResult"; componentName: string; filePath: string | null }
```

### Cache (Overlay)

```typescript
// packages/overlay/src/file-discovery-cache.ts

const CACHE_TTL_MS = 30_000; // 30 seconds — grep is ~50ms, short TTL is fine

interface CacheEntry {
  filePath: string | null;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export function getCachedFilePath(componentName: string): string | null | undefined {
  const entry = cache.get(componentName);
  if (!entry) return undefined; // not looked up yet
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(componentName);
    return undefined; // expired
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

**TTL of 30 seconds** covers file renames and moves during active development. Grep at ~50ms is cheap enough that frequent re-lookups don't matter.

### Integration Points

**selection.ts** — after `resolveComponentFromElement()` returns with empty `filePath`:
```typescript
const resolved = await resolveComponentFromElement(el);
if (resolved && !resolved.filePath) {
  // Try CLI-side discovery
  const discovered = await requestFileDiscovery(resolved.componentName);
  if (discovered) {
    resolved.filePath = discovered;
    // Also update stack entries for the same component
    for (const frame of resolved.stack) {
      if (frame.componentName === resolved.componentName) {
        frame.filePath = discovered;
      }
    }
  }
}
```

**resolve-helper.ts** — same pattern for annotation tools.

**property-controller.ts** — same pattern for `resolveFreshComponentInfo()` after HMR reacquisition.

### What This Unblocks

| Scenario | Before | After |
|---|---|---|
| React 19 + Next.js, bundler URLs | `filePath: ""` → blocked | Layer 1 `extractFilePath()` handles most cases |
| framer-motion wrapper | Resolves to library file → rejected | Layer 1 skips library frame, Layer 2 finds user's file by component name |
| Unknown bundler format | `filePath: ""` → blocked | Layer 2 greps project, finds file |
| Component not in any file (HOC, dynamic) | `filePath: ""` → blocked | Layer 3 read-only mode (graceful degradation) |

### File Changes for Discovery

| File | Change |
|---|---|
| `packages/cli/src/file-discovery.ts` | **New** — `discoverFile()` grep utility |
| `packages/overlay/src/file-discovery-cache.ts` | **New** — session cache for discovered paths |
| `packages/overlay/src/selection.ts` | Add Layer 2 fallback after empty filePath |
| `packages/overlay/src/tools/resolve-helper.ts` | Same fallback |
| `packages/overlay/src/properties/property-controller.ts` | Same fallback |
| `packages/cli/src/server.ts` | Add `discoverFile` message handler |
| `packages/shared/src/types.ts` | Add `discoverFile` / `discoverFileResult` messages |

---

## Detailed Design

### 1. Pending Changes Store (Overlay)

New module: `packages/overlay/src/pending-changes.ts`

```typescript
/**
 * Element dedup key — does NOT use lineNumber/columnNumber because these
 * become stale after any file write + HMR cycle. Uses signals that are
 * stable across HMR: component name, file path, tag, and text content.
 */
type PendingElementKey = string;

function makeElementKey(
  componentName: string, filePath: string, tag: string, textContent: string
): PendingElementKey {
  return `${componentName}:${filePath}:${tag}:${textContent.slice(0, 50)}`;
}

interface PendingPropertyChange {
  type: "property";
  componentName: string;
  tag: string;
  filePath: string;
  textContent: string;         // first 50 chars for element identification
  className: string;           // full className at time of first change
  lineHint: number;            // approximate line (may be stale, hint only)
  updates: Map<string, {       // keyed by cssProperty
    tailwindPrefix: string;
    tailwindToken: string | null;
    value: string;
    oldClass: string;          // e.g. "bg-red-500"
    newClass: string;          // e.g. "bg-blue-500"
  }>;
}

interface PendingTextChange {
  type: "text";
  componentName: string;
  tag: string;
  filePath: string;
  className: string;
  lineHint: number;
  originalText: string;
  newText: string;
}

interface PendingReorderChange {
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

interface PendingMoveChange {
  type: "move";
  componentName: string;
  tag: string;
  filePath: string;
  className: string;
  lineHint: number;
  delta: { dx: number; dy: number };
  resolvedDx: string | null;
  resolvedDy: string | null;
}

type PendingChange = PendingPropertyChange | PendingTextChange
                   | PendingReorderChange | PendingMoveChange;
```

**Key behaviors:**
- Changes keyed by `PendingElementKey` (`componentName:filePath:tag:textContent`) — no coordinates in the key, stable across HMR cycles
- Editing the same element's properties merges into one entry
- Text changes overwrite previous text changes for the same element
- `pendingCount()` returns total number of changed elements
- `clearAll()` resets after successful apply
- `revertAll()` removes all inline CSS overrides and clears store
- **Color changes** are property changes with `cssProperty: "backgroundColor"` or `"color"` — no separate type

**Empty filePath handling:** By the time the user sees the property panel, the 3-layer resolution pipeline (Layer 1: extractFilePath, Layer 2: discoverFile grep, Layer 3: give up) has already run. If all three layers fail, the property panel opens in **read-only preview mode** with a clear indicator: "Preview only — source file not found." The user sees CSS values but cannot edit them. This avoids the confusing UX of letting someone make changes and then rejecting them later.

**Stale pending changes:** If an element is removed by external HMR, the pending change remains. On confirm, Claude attempts the edit. If the SEARCH block doesn't match, that change follows the partial-failure path (Section 9).

### 2. Confirm UX — Auto-Confirm + Manual Button

Two confirmation modes to avoid mandatory extra clicks:

#### Auto-confirm on deselect (default for single changes)
When the user deselects an element (clicks away or selects a new element):
- If there is exactly **1 pending change** for the deselected element → auto-confirm immediately
- This preserves the current UX of "edit, click away, done"
- The apply happens in the background; if it fails, a toast appears

#### Manual "Confirm Changes" button (for batches)
When `pendingCount() > 1`:
- **"Confirm Changes (N)"** button appears in toolbar
- Click applies all pending changes in one Claude API call
- Disabled while apply is in progress (shows spinner: "Applying...")
- On success: clears pending state, success toast
- On failure: error toast, pending changes preserved (retry possible)
- On partial failure: clears successful changes, reports failures

#### Summary

| Scenario | Behavior |
|---|---|
| Edit one element, click away | Auto-confirm (same UX as today) |
| Edit multiple elements | "Confirm Changes (N)" button appears |
| Edit one element, select another | Auto-confirm first, then select second |
| No API key (Path A) | Immediate AST write on deselect (current behavior) |

### 3. Element Location Strategy — Handling Classless Elements

The `className` is the primary locator, but many elements don't have one. The overlay builds a **locator chain** with multiple signals, ordered by reliability:

```typescript
interface ElementLocator {
  componentName: string;       // always available from fiber
  tag: string;                 // always available from DOM
  className: string;           // may be empty
  textContent: string;         // may be empty
  nthOfType: number;           // e.g. "3rd <p> in this component"
  parentTag: string;           // immediate parent's tag
  parentClassName: string;     // immediate parent's className
  attributes: Record<string, string>; // id, href, src, data-*, etc.
}
```

The user message builder uses the richest available signals:

| Element has | Locator used in prompt |
|---|---|
| className | `<button className="bg-red-500 p-2">` (exact SEARCH match) |
| No className, has text | `the <p> containing "Welcome to our store"` + nthOfType |
| No className, no text | `the 3rd <div> inside ComponentName` + parent context |
| Has id or data-* | `<input id="email">` or `<div data-testid="hero">` |

The system prompt instructs Claude to use ALL signals together, not just className.

### 4. WebSocket Messages (Shared Types)

New `ClientMessage` variant:

```typescript
type ApplyChange =
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

// ClientMessage addition
| { type: "applyAllChanges"; changes: ApplyChange[] }
```

New `ServerMessage` variant:

```typescript
| {
    type: "applyAllComplete";
    success: boolean;
    appliedCount: number;
    failedCount: number;
    error?: string;
    undoIds: string[];
  }
```

New `RevertData` variant:

```typescript
| { type: "batchApplyUndo"; undoIds: string[] }
```

### 5. Claude API Integration (CLI)

New module: `packages/cli/src/claude-apply.ts`

This is a **thin wrapper** around shared utilities extracted from `generate.ts`. Both `generate.ts` and `claude-apply.ts` call Claude and parse SEARCH/REPLACE — the shared pieces are factored out to prevent drift.

#### Shared module: `packages/cli/src/claude-shared.ts`

Extracted from `generate.ts`:
- `callClaude(systemPrompt, userMessage, options)` — API call wrapper
- `parseDiffResponse(response)` — SEARCH/REPLACE parser
- `applyReplacements(source, replacements)` — edit applier
- `readSourceFiles(paths, projectRoot)` — file reader + undo entry creator

Both `generate.ts` and `claude-apply.ts` import from `claude-shared.ts`.

#### Model Selection

```typescript
function getModelForChange(change: ApplyChange): string {
  // Reorders require understanding JSX tree structure — use Sonnet
  if (change.type === "reorder") return "claude-sonnet-4-6-20250514";
  // Property, text, move edits are simple find-and-replace — Haiku is sufficient
  return "claude-haiku-4-5-20251001";
}
```

Changes are grouped by model before sending. In practice, most confirms will be all-Haiku (cheap, fast). Reorders use Sonnet for reliability.

#### System Prompt

```
You are a precision frontend code modifier for a React application using Tailwind CSS.

A user has made visual changes in a design overlay tool. You must reproduce their
exact intent in the source code.

## Critical Rules
- Match the user's changes EXACTLY — do not interpret, optimize, or "improve"
- Only modify the specific elements described — leave everything else untouched
- Preserve all existing code structure, formatting, and whitespace
- For className changes: only swap the specified classes, keep all others in place
- For text changes: only change the text content, preserve surrounding JSX exactly
- For reorders: move the complete JSX block (including children), preserve indentation
- For moves: add the specified Tailwind spacing classes

## Element Location Strategy
Each change provides multiple signals to locate the exact element. Use them in
this priority order:

1. **className string** — most reliable, find it as an exact substring in the JSX
2. **Text content** — disambiguates elements with same tag/class
3. **nthOfType** — "the Nth <tag> in this component" for structural elements
4. **Parent context** — parent tag + parent className narrows the search
5. **Component name** — which React component function/const to look in
6. **Line hint** — approximate line number (may be stale, do not rely exclusively)

For elements WITHOUT a className, combine text content, nthOfType, and parent
context to locate the element. Example: "the 2nd <p> inside the <section> with
className 'hero-content' in HeroSection component."

## Response Format
[Same SEARCH/REPLACE format as generate.ts]
```

#### User Message Examples

**Element with className:**
```
1. **Property change** on <button> in CheckoutForm component (~line 24)
   Text content: "Submit Order"
   Current className: "bg-red-500 p-2 text-sm rounded-lg hover:bg-red-600"
   Changes:
     - Replace class `bg-red-500` with `bg-blue-500`
     - Replace class `text-sm` with `text-lg`
   Keep all other classes exactly as they are.
```

**Element WITHOUT className (text edit on bare `<p>`):**
```
2. **Text change** on <p> in AboutSection component (~line 42)
   This is the 2nd <p> inside <section className="about-content">
   No className on this element.
   Current text: "Founded in 2024"
   New text: "Founded in 2025"
   Change ONLY the text content.
```

**Reorder (uses Sonnet):**
```
3. **Reorder** children of <div> in Dashboard component (~line 15)
   Parent className: "grid grid-cols-3 gap-6"
   Current child order:
     1. <StatsCard className="bg-white rounded-xl shadow-sm p-6">
     2. <ChartPanel className="bg-white rounded-xl shadow-sm col-span-2">
     3. <ActivityFeed className="bg-white rounded-xl shadow-sm">
   New order: [3, 1, 2] — move ActivityFeed BEFORE StatsCard
   Move each child's COMPLETE JSX block. Do not modify content.
```

### 6. Server Handler (CLI)

Handled in the message router directly (like `generate`), with locking:

```typescript
case "applyAllChanges": {
  if (generateLocked) {
    respond({ type: "applyAllComplete", success: false, appliedCount: 0,
              failedCount: msg.changes.length, undoIds: [],
              error: "Another operation is in progress" });
    break;
  }
  generateLocked = true;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    generateLocked = false;
    respond({ type: "applyAllComplete", success: false, appliedCount: 0,
              failedCount: msg.changes.length, undoIds: [],
              error: "ANTHROPIC_API_KEY not set" });
    break;
  }

  try {
    // Group changes by file + model tier
    // Read referenced files via claude-shared.readSourceFiles()
    // Call Claude API via claude-apply.ts (Haiku for property/text/move, Sonnet for reorder)
    // Parse with claude-shared.parseDiffResponse()
    // Apply with claude-shared.applyReplacements()
    // Write files + save undo entries
    // Respond with result + undoIds
  } finally {
    generateLocked = false;
  }
}
```

**Undo during in-flight apply:** If the user triggers undo while an apply is in progress, the undo message enters the sequential queue. The queue is paused during `generateLocked`, so the undo will execute immediately after the apply completes. The overlay should show a visual indicator ("Applying...") to set expectations.

### 7. Removing Immediate Write Paths (Path B only)

When `ANTHROPIC_API_KEY` is set, the following triggers change:

| Current trigger | Path B behavior |
|---|---|
| `scheduledCommit()` 300ms timer | Removed — changes stay in pending store |
| `commit()` in property-controller | Becomes `addToPending()` |
| `commitAndDeselect()` on click away | `addToPending()` + auto-confirm (single change) |
| `updateText` on text edit blur | `addToPending()` + auto-confirm |
| `reorder` on drag end | `addToPending()` + auto-confirm |

When `ANTHROPIC_API_KEY` is **not** set (Path A), all of the above remain unchanged — current jscodeshift behavior.

**What always writes immediately (both paths):**
- `revertChanges` / undo — file-based undo from CLI's undo stack
- `generate` — AI generation is already batched and user-initiated

### 8. Undo/Revert

**Before confirm (pending state):**
- Revert by removing inline CSS overrides — no file write needed
- "Discard Changes" clears the pending store

**After confirm (applied state):**
- CLI saves before/after content per file as undo entries
- `undoIds` returned to overlay for `revertChanges` support
- Existing revert mechanism works unchanged

### 9. Error Handling

| Scenario | Behavior |
|---|---|
| No API key (Path A) | Direct AST write. If coordinates invalid: toast "Source not resolved — add API key for reliable edits" |
| No API key + empty filePath | Property panel opens read-only with "Preview only" indicator |
| API call fails (network) | Error toast, pending changes preserved, retry possible |
| Claude returns invalid response | Error toast, pending changes preserved |
| Partial edit failure | Apply successful edits, report failures, clear only successful changes |
| File changed externally | Claude reads current file, edits against latest state |
| Undo during in-flight apply | Queued, executes after apply completes |
| Concurrent apply + generate | Second operation rejected: "Another operation is in progress" |

### 10. File Changes Summary

| File | Change |
|---|---|
| **File Discovery (unblocks both paths)** | |
| `packages/cli/src/file-discovery.ts` | **New** — `discoverFile()` grep-based component→file resolver |
| `packages/overlay/src/file-discovery-cache.ts` | **New** — session cache for discovered file paths |
| `packages/overlay/src/selection.ts` | Add Layer 2 fallback when filePath is empty |
| `packages/overlay/src/tools/resolve-helper.ts` | Same Layer 2 fallback |
| `packages/overlay/src/properties/property-controller.ts` | Same Layer 2 fallback + read-only mode when all layers fail |
| **Pending Changes Store (Path B)** | |
| `packages/overlay/src/pending-changes.ts` | **New** — pending change store |
| `packages/overlay/src/toolbar.ts` | Add "Confirm Changes" button (visible when pendingCount > 1) |
| `packages/overlay/src/properties/property-controller.ts` | Replace `commit()`/`scheduledCommit()` with `addToPending()` (Path B) |
| `packages/overlay/src/inline-text-edit.ts` | Replace text write with `addToPending()` (Path B) |
| `packages/overlay/src/drag.ts` | Replace reorder write with `addToPending()` (Path B) |
| `packages/overlay/src/tools/move.ts` | Add move changes to pending store (Path B) |
| **Claude API Integration (Path B)** | |
| `packages/cli/src/claude-shared.ts` | **New** — shared Claude API utilities (extracted from generate.ts) |
| `packages/cli/src/claude-apply.ts` | **New** — batched apply via Claude API |
| `packages/cli/src/generate.ts` | Refactor to import from claude-shared.ts |
| **Shared** | |
| `packages/overlay/src/bridge.ts` | Handle `applyAllComplete` + `discoverFileResult` messages |
| `packages/overlay/src/changelog.ts` | Changelog entries: "pending" on add, promote to "active" after confirm |
| `packages/shared/src/types.ts` | Add `ApplyChange`, `applyAllChanges`, `applyAllComplete`, `batchApplyUndo`, `discoverFile`, `discoverFileResult` |
| `packages/cli/src/server.ts` | Add `applyAllChanges` + `discoverFile` handlers |

### 11. What This Keeps (Not Deletes)

The existing jscodeshift pipeline is **kept** as Path A:
- `transform.ts`: `updateClassName()`, `updateTextContent()` — still used when no API key
- `server.ts`: `updateProperty`, `updateProperties`, `updateText` handlers — still used
- `source-resolve.ts` — still needed for Path A coordinate resolution

This is a launch requirement, not a follow-up. Zero-setup must work.

## Cost Analysis

| Usage | Cost (realistic estimates with 300-line files) |
|---|---|
| Single auto-confirm (1 property edit, 1 file) | ~$0.005 (Haiku) |
| Batch confirm (5 edits across 2 files) | ~$0.01-0.02 (Haiku) |
| Batch confirm with reorder | ~$0.04-0.06 (Sonnet for reorder + Haiku for rest) |
| Heavy day (50 confirms, mixed) | ~$0.50-1.00 |
| Heavy month | ~$10-20 |

## Non-Goals

- Model selection UI — hardcoded Haiku/Sonnet per change type
- Streaming responses — batch is fast enough (~500ms-2s)
- Real-time collaboration — single user only

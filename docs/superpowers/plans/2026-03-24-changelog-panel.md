# Changelog Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a collapsible changelog panel that logs every code change with per-entry revert.

**Architecture:** A self-contained `changelog.ts` module in the overlay creates the panel UI and manages change entries. The CLI server gains undo IDs on every write response and a new `revertChanges` message handler. Integration hooks are added at each commit point (property, move, text, generate) — all in the async response handlers, not at commit time.

**Tech Stack:** TypeScript, Shadow DOM, WebSocket messaging, existing design tokens

**Spec:** `docs/superpowers/specs/2026-03-24-changelog-panel-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `packages/shared/src/types.ts` | `ChangeEntry`, `RevertData` types, `UndoEntry.id`/`afterContent` fields, updated `ServerMessage`/`ClientMessage` |
| `packages/cli/src/server.ts` | Undo IDs on write responses, `afterContent` capture, `revertChanges` handler |
| `packages/overlay/src/changelog.ts` | **New** — panel UI, state (Map), coalescing, revert dispatch, listener pattern |
| `packages/overlay/src/index.ts` | Init/destroy changelog, generate changelog entry, keyboard shortcut |
| `packages/overlay/src/properties/property-controller.ts` | Property changelog entries via `onMessage()` |
| `packages/overlay/src/tools/move.ts` | Move changelog entries (pending state) |
| `packages/overlay/src/inline-text-edit.ts` | Text edit changelog entries |

---

### Task 1: Add undo ID and afterContent to shared types

**Files:**
- Modify: `packages/shared/src/types.ts:105-109` (UndoEntry)
- Modify: `packages/shared/src/types.ts:64-83` (ServerMessage)
- Modify: `packages/shared/src/types.ts:8-62` (ClientMessage)

- [ ] **Step 1: Update `UndoEntry` interface**

In `packages/shared/src/types.ts`, add `id` and `afterContent` to `UndoEntry` (line 105):

```typescript
export interface UndoEntry {
  id: string;
  filePath: string;
  content: string;          // beforeContent — the file state before the write
  afterContent: string;     // the file state after the write — for conflict detection
  timestamp: number;
  reverted?: boolean;       // marked true when reverted via revertChanges (not removed from stack)
}
```

- [ ] **Step 2: Add `undoId` to `ServerMessage` response types**

Update the three response variants in `ServerMessage` (line 64):

```typescript
  // line 74-79: add undoId
  | {
      type: "updatePropertyComplete";
      success: boolean;
      error?: string;
      errorCode?: TransformErrorCode;
      undoId?: string;
    }
  // line 82: add undoIds
  | { type: "generateComplete"; success: boolean; changes: FileChange[]; error?: string; undoIds?: string[] }
  // line 83: add undoId
  | { type: "updateTextComplete"; success: boolean; error?: string; reason?: string; undoId?: string }
  // NEW: revertComplete response
  | { type: "revertComplete"; results: Array<{ undoId: string; success: boolean; error?: string }> };
```

- [ ] **Step 3: Add `revertChanges` to `ClientMessage`**

Add to the `ClientMessage` union (after line 62):

```typescript
  | { type: "revertChanges"; undoIds: string[] };
```

- [ ] **Step 4: Add `ChangeEntry` and `RevertData` types**

Add after `CanvasUndoAction` (after line 252):

```typescript
// --- Changelog Types ---

export type RevertData =
  | { type: "cliUndo"; undoIds: string[] }
  | { type: "moveRemove"; moveId: string }
  | { type: "annotationRemove"; annotationId: string; originalInnerHTML: string; elementIdentity: ElementIdentity }
  | { type: "generateUndo"; undoIds: string[] };

export interface ChangeEntry {
  id: string;
  timestamp: number;
  type: "property" | "move" | "textEdit" | "textAnnotation" | "generate";
  componentName: string;
  filePath: string;
  summary: string;
  state: "active" | "reverted" | "pending";
  propertyKey?: string;
  elementIdentity?: ElementIdentity;
  revertData: RevertData;
}
```

- [ ] **Step 5: Verify build**

Run: `cd packages/shared && npx tsc --noEmit`
Expected: No errors (types only, no implementation changes yet)

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(types): add changelog types, undo IDs, and afterContent to UndoEntry"
```

---

### Task 2: CLI — add undo IDs and afterContent to write responses

**Files:**
- Modify: `packages/cli/src/server.ts:59` (undoStack)
- Modify: `packages/cli/src/server.ts:136-167` (updateProperty)
- Modify: `packages/cli/src/server.ts:169-203` (updateProperties)
- Modify: `packages/cli/src/server.ts:205-238` (updateText)
- Modify: `packages/cli/src/server.ts:318-334` (generate)
- Modify: `packages/cli/src/server.ts:87-118` (reorder)

- [ ] **Step 1: Update all undo pushes to include `id` and `afterContent`**

Every `undoStack.push()` currently stores `{ filePath, content, timestamp }`. Update each one to:

1. Generate an ID: `const undoId = crypto.randomUUID();`
2. After the file write succeeds, read back `afterContent` (or use the written content directly)
3. Push: `{ id: undoId, filePath, content: prevContent, afterContent: newSource, timestamp: Date.now() }`

**`updateProperty` case (line 136):** After `fs.writeFileSync` on line 154, the written content is `newSource` (line 146). Restructure to:

```typescript
case "updateProperty": {
  if (!isPathSafe(msg.filePath, projectRoot)) {
    console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
    send(ws, { type: "updatePropertyComplete", success: false, error: "File path is outside the project root" });
    break;
  }
  const resolvedPropPath = resolveFilePath(msg.filePath, projectRoot);
  const prevContent = fs.readFileSync(resolvedPropPath, "utf-8");
  const undoId = crypto.randomUUID();
  try {
    const newSource = updateClassName(resolvedPropPath, msg.lineNumber, msg.columnNumber, [{
      tailwindPrefix: msg.tailwindPrefix,
      tailwindToken: msg.tailwindToken,
      value: msg.value,
      relatedPrefixes: msg.relatedPrefixes,
      classPattern: msg.classPattern,
      standalone: msg.standalone,
    }]);
    fs.writeFileSync(resolvedPropPath, newSource, "utf-8");
    undoStack.push({ id: undoId, filePath: resolvedPropPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
    send(ws, { type: "updatePropertyComplete", success: true, undoId });
  } catch (err) {
    const errorCode = extractErrorCode(err);
    send(ws, {
      type: "updatePropertyComplete",
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode,
    });
  }
  break;
}
```

Key change: push undo entry **after** successful write (not before), so we never push on failure and don't need to pop.

- [ ] **Step 2: Apply same pattern to `updateProperties` (line 169)**

Same restructure — generate `undoId`, push after write, include in response:

```typescript
case "updateProperties": {
  if (!isPathSafe(msg.filePath, projectRoot)) {
    console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
    send(ws, { type: "updatePropertyComplete", success: false, error: "File path is outside the project root" });
    break;
  }
  const resolvedPropsPath = resolveFilePath(msg.filePath, projectRoot);
  const prevContent = fs.readFileSync(resolvedPropsPath, "utf-8");
  const undoId = crypto.randomUUID();
  try {
    const newSource = updateClassName(
      resolvedPropsPath, msg.lineNumber, msg.columnNumber,
      msg.updates.map((u: { tailwindPrefix: string; tailwindToken: string | null; value: string; relatedPrefixes?: string[]; classPattern?: string; standalone?: boolean }) => ({
        tailwindPrefix: u.tailwindPrefix,
        tailwindToken: u.tailwindToken,
        value: u.value,
        relatedPrefixes: u.relatedPrefixes,
        classPattern: u.classPattern,
        standalone: u.standalone,
      }))
    );
    fs.writeFileSync(resolvedPropsPath, newSource, "utf-8");
    undoStack.push({ id: undoId, filePath: resolvedPropsPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
    send(ws, { type: "updatePropertyComplete", success: true, undoId });
  } catch (err) {
    const errorCode = extractErrorCode(err);
    send(ws, {
      type: "updatePropertyComplete",
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode,
    });
  }
  break;
}
```

- [ ] **Step 3: Apply same pattern to `updateText` (line 205)**

```typescript
case "updateText": {
  if (!isPathSafe(msg.filePath, projectRoot)) {
    console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
    send(ws, { type: "updateTextComplete", success: false, error: "File path is outside the project root" });
    break;
  }
  const resolvedTextPath = resolveFilePath(msg.filePath, projectRoot);
  const prevContent = fs.readFileSync(resolvedTextPath, "utf-8");
  try {
    const newSource = updateTextContent(
      resolvedTextPath,
      msg.lineNumber,
      msg.columnNumber,
      msg.originalText,
      msg.newText,
    );
    if (newSource !== null) {
      fs.writeFileSync(resolvedTextPath, newSource, "utf-8");
      const undoId = crypto.randomUUID();
      undoStack.push({ id: undoId, filePath: resolvedTextPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
      send(ws, { type: "updateTextComplete", success: true, undoId });
    } else {
      send(ws, { type: "updateTextComplete", success: false, reason: "no-match" });
    }
  } catch (err) {
    send(ws, {
      type: "updateTextComplete",
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
  break;
}
```

- [ ] **Step 4: Update `reorder` case (line 87) — same pattern**

Apply the same id/afterContent pattern. Push after write, not before.

- [ ] **Step 5: Update `generate` handler (line 318) — add `undoIds` to response**

The generate handler pushes undo entries in a loop (lines 321-327). Update to:

```typescript
}).then((result) => {
  const undoIds: string[] = [];
  if (result.success) {
    for (const entry of result.undoEntries) {
      const undoId = crypto.randomUUID();
      undoStack.push({
        id: undoId,
        filePath: entry.filePath,
        content: entry.content,
        afterContent: entry.afterContent ?? "",
        timestamp: Date.now(),
      });
      undoIds.push(undoId);
    }
  }
  send(ws, {
    type: "generateComplete",
    success: result.success,
    changes: result.changes,
    error: result.error,
    undoIds: result.success ? undoIds : undefined,
  });
```

**Important — `generate.ts` must also return `afterContent`:**

The current `UndoFileEntry` in `generate.ts` (line ~22-25) only has `{ filePath: string; content: string }`. Update it:

1. In `packages/cli/src/generate.ts`, update `UndoFileEntry` to add `afterContent: string`
2. In the apply step where files are written (after `fs.writeFileSync`), capture the written content as `afterContent`
3. The `content` field remains `beforeContent` (captured at read time, line ~72)

```typescript
// In generate.ts UndoFileEntry type:
interface UndoFileEntry {
  filePath: string;
  content: string;        // beforeContent
  afterContent: string;   // the content that was written
}
```

In the apply loop, after writing each file:
```typescript
undoEntries.push({ filePath, content: beforeContent, afterContent: writtenContent });
```

- [ ] **Step 6: Add `crypto` import at top of server.ts**

Add at top of file, using the `node:` prefix convention matching existing imports:

```typescript
import { randomUUID } from "node:crypto";
```

Then replace all `crypto.randomUUID()` calls in this file with `randomUUID()`.

- [ ] **Step 7: Verify CLI build**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add packages/cli/src/server.ts packages/shared/src/types.ts
git commit -m "feat(cli): add undo IDs and afterContent to all write responses"
```

---

### Task 3: CLI — add `revertChanges` message handler

**Files:**
- Modify: `packages/cli/src/server.ts:274-358` (message handler switch)

- [ ] **Step 1: Add `revertChanges` to the queue-based processing**

In the `ws.on("message")` handler (line 274), add `revertChanges` to the sequential queue cases (line 350-358):

```typescript
        case "reorder":
        case "undo":
        case "updateProperty":
        case "updateProperties":
        case "updateText":
        case "revertChanges":  // ← add this
          queue.push({ msg, ws });
          processQueue();
          break;
```

- [ ] **Step 2: Add `revertChanges` case in `processQueue`**

Add before the closing `}` of the switch block (before line 239):

```typescript
case "revertChanges": {
  const results: Array<{ undoId: string; success: boolean; error?: string }> = [];

  // Process in reverse order — later changes undone first
  const entriesToRevert = msg.undoIds
    .map((id: string) => ({ id, entry: undoStack.find((e) => e.id === id) }))
    .filter((r): r is { id: string; entry: UndoEntry } => r.entry !== undefined)
    .sort((a, b) => b.entry.timestamp - a.entry.timestamp);

  for (const { id, entry } of entriesToRevert) {
    try {
      const currentContent = fs.readFileSync(entry.filePath, "utf-8");
      if (currentContent !== entry.afterContent) {
        results.push({ undoId: id, success: false, error: "File has changed since this edit" });
        continue;
      }
      fs.writeFileSync(entry.filePath, entry.content, "utf-8");
      // Mark as reverted in stack (don't remove — preserves Ctrl+Z stack integrity)
      entry.reverted = true;
      results.push({ undoId: id, success: true });
    } catch (err) {
      results.push({ undoId: id, success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  // Add undoIds that weren't found
  for (const id of msg.undoIds) {
    if (!results.some((r) => r.undoId === id)) {
      results.push({ undoId: id, success: false, error: "Undo entry not found" });
    }
  }

  send(ws, { type: "revertComplete", results });
  break;
}
```

- [ ] **Step 3: Verify `revertComplete` is in `ServerMessage`**

Already added in Task 1 Step 2. Confirm it's present — if not, add to `ServerMessage`:

```typescript
  | { type: "revertComplete"; results: Array<{ undoId: string; success: boolean; error?: string }> }
```

- [ ] **Step 4: Verify CLI build**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/server.ts packages/shared/src/types.ts
git commit -m "feat(cli): add revertChanges message handler with conflict detection"
```

---

### Task 4: Changelog module — state management and listener pattern

**Files:**
- Create: `packages/overlay/src/changelog.ts`

This task creates the non-UI state layer. UI rendering comes in Task 5.

- [ ] **Step 1: Create `changelog.ts` with state management**

```typescript
import type { ChangeEntry, ElementIdentity } from "@frameup/shared";
import { send, onMessage } from "./bridge.js";

// --- State ---

const entries = new Map<string, ChangeEntry>();
let panelOpen = false;

// --- Listener pattern (matches canvas-state.ts) ---

type ChangelogListener = () => void;
let changelogListeners: ChangelogListener[] = [];

export function onChangelogChange(fn: ChangelogListener): () => void {
  changelogListeners.push(fn);
  return () => {
    changelogListeners = changelogListeners.filter((f) => f !== fn);
  };
}

function notifyChangelogChange(): void {
  changelogListeners.forEach((fn) => fn());
}

// --- Coalesce window ---

const COALESCE_WINDOW_MS = 3000;

function findCoalesceTarget(
  elementIdentity: ElementIdentity,
  propertyKey: string,
): ChangeEntry | null {
  // Walk entries in reverse insertion order
  const allEntries = Array.from(entries.values());
  for (let i = allEntries.length - 1; i >= 0; i--) {
    const entry = allEntries[i];
    if (
      entry.type === "property" &&
      entry.state === "active" &&
      entry.propertyKey === propertyKey &&
      entry.elementIdentity &&
      entry.elementIdentity.filePath === elementIdentity.filePath &&
      entry.elementIdentity.lineNumber === elementIdentity.lineNumber &&
      entry.elementIdentity.columnNumber === elementIdentity.columnNumber &&
      Date.now() - entry.timestamp < COALESCE_WINDOW_MS
    ) {
      return entry;
    }
    break; // Only check the most recent entry
  }
  return null;
}

// --- Public API ---

export function addChangeEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
): string {
  const id = crypto.randomUUID();
  const fullEntry: ChangeEntry = {
    ...entry,
    id,
    timestamp: Date.now(),
  };
  entries.set(id, fullEntry);
  notifyChangelogChange();
  return id;
}

export function addOrCoalescePropertyEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
  elementIdentity: ElementIdentity,
  propertyKey: string,
  undoId: string,
): string {
  const target = findCoalesceTarget(elementIdentity, propertyKey);
  if (target) {
    // Coalesce: update summary, timestamp, and accumulate undoId
    target.timestamp = Date.now();
    target.summary = entry.summary;
    if (target.revertData.type === "cliUndo") {
      target.revertData.undoIds.push(undoId);
    }
    notifyChangelogChange();
    return target.id;
  }
  return addChangeEntry(entry);
}

export function updateChangeEntry(
  id: string,
  updates: Partial<ChangeEntry>,
): void {
  const entry = entries.get(id);
  if (!entry) return;
  Object.assign(entry, updates);
  notifyChangelogChange();
}

export function revertEntry(id: string): void {
  const entry = entries.get(id);
  if (!entry || entry.state === "reverted") return;

  switch (entry.revertData.type) {
    case "cliUndo":
    case "generateUndo":
      send({ type: "revertChanges", undoIds: entry.revertData.undoIds });
      break;

    case "moveRemove":
      import("./canvas-state.js").then(({ removeMove }) => {
        removeMove(entry.revertData.moveId);
      });
      break;

    case "annotationRemove": {
      const { annotationId, originalInnerHTML, elementIdentity } = entry.revertData;
      import("./canvas-state.js").then(({ removeAnnotation, findElementByIdentity }) => {
        removeAnnotation(annotationId);
        // Restore original text — findElementByIdentity looks up the DOM element
        // by matching componentName/filePath/lineNumber from the resolved fiber tree.
        // If the element is no longer in the DOM (e.g., HMR replaced it), this is a no-op.
        const el = findElementByIdentity(elementIdentity);
        if (el) el.innerHTML = originalInnerHTML;
      });
      break;
    }
  }

  entry.state = "reverted";
  notifyChangelogChange();
}

export function getEntries(): ChangeEntry[] {
  return Array.from(entries.values());
}

export function getChangeCount(): number {
  return entries.size;
}

export function getActiveCount(): number {
  let count = 0;
  for (const entry of entries.values()) {
    if (entry.state !== "reverted") count++;
  }
  return count;
}

export function isChangelogOpen(): boolean {
  return panelOpen;
}

export function setChangelogOpen(open: boolean): void {
  panelOpen = open;
  notifyChangelogChange();
}

export function clearChangelog(): void {
  entries.clear();
  notifyChangelogChange();
}
```

- [ ] **Step 2: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/changelog.ts
git commit -m "feat(changelog): add state management module with coalescing and revert"
```

---

### Task 5: Changelog module — panel UI

**Files:**
- Modify: `packages/overlay/src/changelog.ts`

- [ ] **Step 1: Add panel rendering functions**

Add the following to `changelog.ts` after the state management code. This builds the panel DOM inside Shadow DOM, matching the design tokens used by tools-panel.ts.

```typescript
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";

// --- DOM refs ---

let panelEl: HTMLElement | null = null;
let bodyEl: HTMLElement | null = null;
let countEl: HTMLElement | null = null;
let chevronEl: HTMLElement | null = null;
let cleanupMessageListener: (() => void) | null = null;

// --- Styles ---

const CHANGELOG_STYLES = `
.changelog-panel {
  position: fixed;
  left: 16px;
  bottom: 16px;
  width: 360px;
  max-height: 50vh;
  background: ${COLORS.bgSecondary};
  border: 1px solid ${COLORS.border};
  border-radius: ${RADII.md};
  box-shadow: ${SHADOWS.md};
  font-family: ${FONT_FAMILY};
  font-size: 12px;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.changelog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
  transition: border-color ${TRANSITIONS.fast};
}

.changelog-header:hover {
  background: ${COLORS.bgTertiary};
}

.changelog-header.expanded {
  border-bottom-color: ${COLORS.border};
}

.changelog-count-badge {
  background: ${COLORS.accent};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 99px;
  min-width: 20px;
  text-align: center;
}

.changelog-label {
  color: ${COLORS.textSecondary};
  font-weight: 500;
  margin-left: 8px;
}

.changelog-chevron {
  color: ${COLORS.textTertiary};
  font-size: 10px;
  transition: transform ${TRANSITIONS.fast};
}

.changelog-chevron.expanded {
  transform: rotate(180deg);
}

.changelog-body {
  overflow-y: auto;
  max-height: calc(50vh - 40px);
  transition: max-height ${TRANSITIONS.settle};
}

.changelog-body.collapsed {
  max-height: 0;
  overflow: hidden;
}

.changelog-entry {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  height: 28px;
  gap: 8px;
  position: relative;
  transition: background ${TRANSITIONS.fast};
}

.changelog-entry:hover {
  background: ${COLORS.bgTertiary};
}

.changelog-entry.reverted {
  opacity: 0.5;
  text-decoration: line-through;
}

.changelog-entry.pending {
  font-style: italic;
}

.entry-summary {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${COLORS.textSecondary};
}

.entry-summary .component-name {
  color: ${COLORS.textPrimary};
  font-weight: 600;
}

.entry-summary .arrow {
  color: ${COLORS.textTertiary};
}

.entry-file {
  color: ${COLORS.textTertiary};
  font-size: 11px;
  flex-shrink: 0;
}

.entry-time {
  color: ${COLORS.textTertiary};
  font-size: 11px;
  flex-shrink: 0;
  min-width: 48px;
  text-align: right;
}

.entry-revert {
  display: none;
  background: none;
  border: none;
  color: ${COLORS.accent};
  cursor: pointer;
  padding: 2px 4px;
  font-size: 14px;
  line-height: 1;
  border-radius: ${RADII.xs};
  flex-shrink: 0;
}

.entry-revert:hover {
  background: ${COLORS.accentSoft};
}

.changelog-entry:hover .entry-revert {
  display: block;
}

.changelog-entry.reverted .entry-revert {
  display: none !important;
}

.changelog-empty {
  padding: 12px;
  text-align: center;
  color: ${COLORS.textTertiary};
}
`;

// --- Time formatting ---

function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `0:${String(seconds).padStart(2, "0")} ago`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")} ago`;
}

function getBasename(filePath: string): string {
  return filePath.split("/").pop() || filePath;
}

// --- Rendering ---

function renderEntries(): void {
  if (!bodyEl) return;

  const allEntries = Array.from(entries.values()).reverse(); // Most recent first

  if (allEntries.length === 0) {
    bodyEl.innerHTML = `<div class="changelog-empty">No changes yet</div>`;
    return;
  }

  bodyEl.innerHTML = "";
  for (const entry of allEntries) {
    const entryEl = document.createElement("div");
    entryEl.className = `changelog-entry${entry.state === "reverted" ? " reverted" : ""}${entry.state === "pending" ? " pending" : ""}`;

    entryEl.innerHTML = `
      <span class="entry-summary">
        <span class="component-name">${escapeHtml(entry.componentName)}</span>
        <span class="arrow"> → </span>${escapeHtml(entry.summary)}${entry.state === "pending" ? " (pending)" : ""}
      </span>
      <span class="entry-file">${escapeHtml(getBasename(entry.filePath))}</span>
      <span class="entry-time">${formatRelativeTime(entry.timestamp)}</span>
      <button class="entry-revert" title="Revert this change">↩</button>
    `;

    const revertBtn = entryEl.querySelector(".entry-revert") as HTMLButtonElement;
    revertBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      revertEntry(entry.id);
    });

    bodyEl.appendChild(entryEl);
  }
}

function updateCount(): void {
  if (!countEl) return;
  const count = getActiveCount();
  countEl.textContent = String(count);
  if (count === 0) {
    countEl.style.display = "none";
  } else {
    countEl.style.display = "";
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// --- Init / Destroy ---

export function initChangelog(shadowRoot: ShadowRoot): void {
  // Inject styles
  const style = document.createElement("style");
  style.textContent = CHANGELOG_STYLES;
  shadowRoot.appendChild(style);

  // Build panel
  panelEl = document.createElement("div");
  panelEl.className = "changelog-panel";

  const header = document.createElement("div");
  header.className = "changelog-header";
  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:4px;">
      <span class="changelog-count-badge">0</span>
      <span class="changelog-label">changes</span>
    </div>
    <span class="changelog-chevron">▾</span>
  `;

  countEl = header.querySelector(".changelog-count-badge") as HTMLElement;
  chevronEl = header.querySelector(".changelog-chevron") as HTMLElement;

  header.addEventListener("click", () => {
    setChangelogOpen(!panelOpen);
  });

  bodyEl = document.createElement("div");
  bodyEl.className = "changelog-body collapsed";

  panelEl.appendChild(header);
  panelEl.appendChild(bodyEl);
  shadowRoot.appendChild(panelEl);

  // Subscribe to own state changes to re-render
  onChangelogChange(() => {
    renderEntries();
    updateCount();
    if (bodyEl) {
      bodyEl.className = panelOpen ? "changelog-body" : "changelog-body collapsed";
    }
    if (chevronEl) {
      chevronEl.className = panelOpen ? "changelog-chevron expanded" : "changelog-chevron";
    }
    const headerEl = panelEl?.querySelector(".changelog-header");
    if (headerEl) {
      headerEl.className = panelOpen ? "changelog-header expanded" : "changelog-header";
    }
  });

  // Listen for revertComplete messages
  cleanupMessageListener = onMessage((msg) => {
    if (msg.type === "revertComplete") {
      const failures = msg.results.filter((r: any) => !r.success);
      if (failures.length > 0) {
        // Show toast for first failure — import showToast lazily
        import("./toolbar.js").then(({ showToast }) => {
          showToast(failures[0].error || "Cannot revert — file has changed");
        });
      }
    }
  });

  // Update relative times every 10 seconds
  timeUpdateInterval = window.setInterval(() => {
    if (panelOpen) renderEntries();
  }, 10000);
}

let timeUpdateInterval: number | null = null;

export function destroyChangelog(): void {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
  if (cleanupMessageListener) {
    cleanupMessageListener();
    cleanupMessageListener = null;
  }
  panelEl?.remove();
  panelEl = null;
  bodyEl = null;
  countEl = null;
  chevronEl = null;
  clearChangelog();
  changelogListeners = [];
}
```

- [ ] **Step 2: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/changelog.ts
git commit -m "feat(changelog): add panel UI with entries, coalescing, and revert buttons"
```

---

### Task 6: Wire changelog into overlay init/destroy and generate handler

**Files:**
- Modify: `packages/overlay/src/index.ts:156-335` (init), `packages/overlay/src/index.ts:337-352` (close), `packages/overlay/src/index.ts:289-312` (generate handler)

- [ ] **Step 1: Import changelog in index.ts**

Add to imports at top of file:

```typescript
import { initChangelog, destroyChangelog, addChangeEntry } from "./changelog.js";
```

- [ ] **Step 2: Call `initChangelog()` in `init()`**

After the Shadow DOM root is obtained (the overlay creates `#frameup-root` and attaches shadow), call:

```typescript
initChangelog(shadowRoot);
```

Place this after other init calls (e.g., after `initToolsPanel`).

- [ ] **Step 3: Call `destroyChangelog()` in `close()`**

Add `destroyChangelog();` in the `close()` function (line 337), alongside the other destroy calls.

- [ ] **Step 4: Add changelog entry for generate results**

In the `generateComplete` handler (line 289), after the success check, add a changelog entry:

```typescript
if (msg.type === "generateComplete") {
  generating = false;
  updateGenerateButton(hasChanges());
  if (msg.success) {
    const fileCount = msg.changes.length;
    addChangeEntry({
      type: "generate",
      componentName: "AI Generate",
      filePath: msg.changes[0]?.filePath || "",
      summary: `${fileCount} file${fileCount !== 1 ? "s" : ""} changed`,
      state: "active",
      revertData: { type: "generateUndo", undoIds: msg.undoIds || [] },
    });
    // ... existing success logic
  }
  // ... existing error logic
}
```

- [ ] **Step 5: Add keyboard shortcut for Cmd+Shift+L / Ctrl+Shift+L**

In the keyboard handler section of `init()` (near the existing Ctrl+Z and Ctrl+. handlers), add:

```typescript
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "l") {
    e.preventDefault();
    import("./changelog.js").then(({ isChangelogOpen, setChangelogOpen }) => {
      setChangelogOpen(!isChangelogOpen());
    });
  }
});
```

Or if you prefer static imports, use the already-imported `setChangelogOpen`/`isChangelogOpen`.

- [ ] **Step 6: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/index.ts
git commit -m "feat(changelog): wire init/destroy, generate entries, and keyboard shortcut"
```

---

### Task 7: Property commit → changelog entry

**Files:**
- Modify: `packages/overlay/src/properties/property-controller.ts`

- [ ] **Step 1: Import changelog functions**

Add at top of file:

```typescript
import { addOrCoalescePropertyEntry } from "../changelog.js";
import { onMessage } from "../bridge.js";
```

- [ ] **Step 2: Add a commit snapshot variable and populate it at commit time**

**Race condition context:** The `onCommitResult` callback (single-slot, in bridge.ts) fires *before* `onMessage` handlers in the same message dispatch. By the time `onMessage` runs, `inflightCommit` is already cleared. Solution: save the commit data into a separate snapshot variable at commit time, which the `onMessage` handler reads.

Add a module-level variable in property-controller.ts:

```typescript
// Snapshot of the most recent commit — captured at commit time, read by onMessage handler
let lastCommitSnapshot: {
  componentInfo: ComponentInfo;
  batch: Array<{ cssProperty: string; originalValue: string; value: string }>;
} | null = null;
```

In the `commit()` function (around line 571), just before sending the message, save:

```typescript
lastCommitSnapshot = {
  componentInfo: { ...state.componentInfo },
  batch: pendingBatch.map((u) => ({
    cssProperty: u.cssProperty,
    originalValue: u.originalValue,
    value: u.value,
  })),
};
```

- [ ] **Step 3: Add `onMessage` listener for `updatePropertyComplete` with `undoId`**

In `initPropertyController()`, register a message listener using `onMessage()` (multi-listener pattern, not the single-slot `onCommitResult`):

```typescript
const cleanupChangelogListener = onMessage((msg) => {
  if (msg.type === "updatePropertyComplete" && msg.success && msg.undoId && lastCommitSnapshot) {
    const { componentInfo, batch } = lastCommitSnapshot;
    const identity = {
      componentName: componentInfo.componentName,
      filePath: componentInfo.filePath,
      lineNumber: componentInfo.lineNumber,
      columnNumber: componentInfo.columnNumber,
      tagName: componentInfo.tagName,
    };

    for (const update of batch) {
      addOrCoalescePropertyEntry(
        {
          type: "property",
          componentName: componentInfo.componentName,
          filePath: componentInfo.filePath,
          summary: `${update.cssProperty}: ${update.originalValue} → ${update.value}`,
          state: "active",
          propertyKey: update.cssProperty,
          elementIdentity: identity,
          revertData: { type: "cliUndo", undoIds: [msg.undoId] },
        },
        identity,
        update.cssProperty,
        msg.undoId,
      );
    }
    lastCommitSnapshot = null;
  }
});
```

- [ ] **Step 3: Clean up listener in `destroyPropertyController`**

Call `cleanupChangelogListener()` in the destroy path.

- [ ] **Step 4: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "feat(changelog): add property change entries with coalescing"
```

---

### Task 8: Move settle → changelog entry

**Files:**
- Modify: `packages/overlay/src/tools/move.ts:113-126` (endMove)

- [ ] **Step 1: Import changelog function**

Add at top of `move.ts`:

```typescript
import { addChangeEntry } from "../changelog.js";
```

- [ ] **Step 2: Add changelog entry in `endMove()`**

After `settleDragVisual(dragEntry)` on line 119, before clearing `dragEntry`:

```typescript
export function endMove(): HTMLElement | null {
  if (!dragEntry) return null;
  if (!isNewMove) {
    updateMoveDelta(dragEntry.id, dragEntry.delta, preDragDelta);
  }
  settleDragVisual(dragEntry);
  clearSnapGuides();

  // Add changelog entry — moves are pending (annotation, not source write)
  addChangeEntry({
    type: "move",
    componentName: dragEntry.componentRef.componentName,
    filePath: dragEntry.componentRef.filePath,
    summary: `moved (${Math.round(dragEntry.delta.dx)}px, ${Math.round(dragEntry.delta.dy)}px)`,
    state: "pending",
    elementIdentity: dragEntry.identity,
    revertData: { type: "moveRemove", moveId: dragEntry.id },
  });

  const el = dragEntry.element;
  dragEntry = null;
  isNewMove = false;
  return el;
}
```

- [ ] **Step 3: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/tools/move.ts
git commit -m "feat(changelog): add move entries as pending state"
```

---

### Task 9: Text edit → changelog entry

**Files:**
- Modify: `packages/overlay/src/inline-text-edit.ts`

- [ ] **Step 1: Import changelog function**

Add at top of file:

```typescript
import { addChangeEntry } from "./changelog.js";
```

- [ ] **Step 2: Add changelog entry for successful AST text edit**

In the `updateTextComplete` handler (around line 60-83), when the response is successful (not the "no-match" fallback path), add:

```typescript
// In the onMessage handler for updateTextComplete
if (msg.type === "updateTextComplete" && msg.success && msg.undoId) {
  // pendingCommit has the data we need
  if (pendingCommit) {
    addChangeEntry({
      type: "textEdit",
      componentName: pendingCommit.componentName || "",
      filePath: pendingCommit.filePath || "",
      summary: `"${truncate(pendingCommit.originalText, 20)}" → "${truncate(pendingCommit.newText, 20)}"`,
      state: "active",
      revertData: { type: "cliUndo", undoIds: [msg.undoId] },
    });
  }
}
```

Add a simple `truncate` helper:

```typescript
function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}
```

- [ ] **Step 3: Add changelog entry for annotation fallback**

When the text edit falls back to an annotation (line 60-83, the "no-match" path, and line 289-306, the no-filePath path), add:

```typescript
addChangeEntry({
  type: "textAnnotation",
  componentName: ann.componentName,
  filePath: ann.filePath || "",
  summary: `"${truncate(ann.originalText, 20)}" → "${truncate(ann.newText, 20)}"`,
  state: "pending",
  revertData: {
    type: "annotationRemove",
    annotationId: ann.id,
    originalInnerHTML: originalInnerHTML,
    elementIdentity: identity,
  },
});
```

- [ ] **Step 4: Verify overlay build**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/inline-text-edit.ts
git commit -m "feat(changelog): add text edit entries (AST and annotation fallback)"
```

---

### Task 10: Build, manual test, and fix

**Files:**
- All previously modified files

- [ ] **Step 1: Full build**

Run: `pnpm build`
Expected: No build errors across all packages

- [ ] **Step 2: Fix any TypeScript errors**

Address any type mismatches between shared types and overlay/CLI usage. Common issues:
- `revertComplete` not in `ServerMessage` — make sure Task 3 Step 3 was applied
- Import paths between overlay and shared
- `msg.undoId` not recognized on `ServerMessage` variants — check discriminated union

- [ ] **Step 3: Manual test — property changes**

1. Start test app: `cd test-app && pnpm dev`
2. Start FrameUp: `node ../packages/cli/bin/frameup.js 3000`
3. Select an element, change a property (e.g., font-size)
4. Verify: changelog badge shows "1" at bottom-left
5. Expand changelog: entry shows `ComponentName → font-size: old → new`
6. Rapid-change the same property: verify coalescing (still one entry)

- [ ] **Step 4: Manual test — moves**

1. Select an element, drag to move it
2. Verify: changelog entry shows `ComponentName → moved (Xpx, Ypx) (pending)`
3. Click revert button: move should be undone via `removeMove()`

- [ ] **Step 5: Manual test — text edits**

1. Double-click text to edit, change it, click away
2. If AST write: entry shows with "active" state
3. If annotation fallback: entry shows with "pending" state

- [ ] **Step 6: Manual test — revert**

1. Make a property change
2. Hover the changelog entry, click ↩
3. Verify: file is reverted, entry shows strikethrough/grayed state
4. Verify: the property change is actually undone in the source file

- [ ] **Step 7: Manual test — keyboard shortcut**

1. Press Cmd+Shift+L (Mac) or Ctrl+Shift+L
2. Verify: panel toggles open/closed

- [ ] **Step 8: Fix any issues found during testing**

- [ ] **Step 9: Final build verification**

Run: `pnpm build && pnpm test`
Expected: Build succeeds, existing tests pass (13 CLI tests)

- [ ] **Step 10: Commit any fixes**

```bash
git add -A
git commit -m "fix(changelog): address issues found during manual testing"
```

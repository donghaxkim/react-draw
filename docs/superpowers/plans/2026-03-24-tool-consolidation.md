# Tool Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce five tools (Pointer, Grab, Move, Draw, Text) to two (Select/Move, Text) with spacebar panning.

**Architecture:** The Select tool merges Pointer and Move by integrating drag-to-move into `selection.ts`'s mode state machine. Selection.ts already handles hover, click, marquee, resize, and multi-select via capture-phase document listeners. We add `"pending-move"` and `"move-drag"` modes so dragging a selected element invokes move logic inline. The interaction layer stays `pointer-events: none` for the Select tool (same as current Pointer), preserving all existing selection behavior. Spacebar panning is a document-level keydown/keyup handler in `interaction.ts`. Draw tool and Grab tool are fully removed.

**Tech Stack:** TypeScript, DOM events, CSS transforms, SVG (annotation layer)

---

## File Structure

| File | Change | Responsibility |
|------|--------|---------------|
| `packages/shared/src/types.ts:200` | Modify | `ToolType = "select" \| "text"` — remove pointer, grab, move, draw |
| `packages/overlay/src/selection.ts` | Modify | Add move-drag modes, import move logic, become the Select tool's sole handler |
| `packages/overlay/src/tools/move.ts` | Modify → export functions | Refactor from handler object to exported functions (`startMove`, `updateMove`, `endMove`) callable from selection.ts |
| `packages/overlay/src/interaction.ts` | Modify | Add spacebar pan handlers, remove draw cursor, simplify cursor switch |
| `packages/overlay/src/tools-panel.ts` | Modify | Two buttons (Select, Text), remove draw sub-options, update shortcuts overlay |
| `packages/overlay/src/canvas-state.ts` | Modify | Default tool → `"select"`, remove draw tool options, update undo |
| `packages/overlay/src/index.ts` | Modify | Remove grab/draw/pointer imports and registration, simplify tool change listener |
| `packages/overlay/src/annotation-layer.ts` | Modify | Remove `createLivePath` and `addStrokePath` (draw-specific), keep text/color badge |
| `packages/overlay/src/design-tokens.ts` | Modify | Remove `drawCursorSvg` |
| `packages/overlay/src/tools/pointer.ts` | Delete contents | File emptied or removed — pointer tool no longer exists |
| `packages/overlay/src/tools/grab.ts` | Delete contents | File emptied or removed — grab tool no longer exists |
| `packages/overlay/src/tools/draw.ts` | Delete contents | File emptied or removed — draw tool no longer exists |

---

## Task 1: Update ToolType and Canvas State

**Files:**
- Modify: `packages/shared/src/types.ts:200`
- Modify: `packages/overlay/src/canvas-state.ts:21`

This task updates the type system and default state. Everything downstream will need to conform.

- [ ] **Step 1: Update ToolType union**

In `packages/shared/src/types.ts:200`, change:
```typescript
// Before:
export type ToolType = "pointer" | "grab" | "move" | "draw" | "text";

// After:
export type ToolType = "select" | "text";
```

- [ ] **Step 2: Update default tool in canvas-state.ts**

In `packages/overlay/src/canvas-state.ts:21`, change:
```typescript
// Before:
let activeTool: ToolType = "pointer";

// After:
let activeTool: ToolType = "select";
```

- [ ] **Step 3: Remove draw-related tool options from canvas-state.ts**

In `packages/overlay/src/canvas-state.ts`, remove `brushSize` and `brushColor` from the `toolOptions` object (lines ~24-29). Keep `fontSize` and `textColor` (used by text tool).

```typescript
// Before:
let toolOptions = {
  brushSize: 4,
  brushColor: "#ef4444",
  fontSize: 16,
  textColor: "#ffffff",
};

// After:
let toolOptions = {
  fontSize: 16,
  textColor: "#ffffff",
};
```

- [ ] **Step 4: Remove draw annotation serialization from canvas-state.ts**

In `packages/overlay/src/canvas-state.ts`, find the `serializeAnnotations()` function (~line 362-376). Remove the `if (ann.type === "draw")` block. Keep text, colorChange, and textEdit handling.

- [ ] **Step 5: Verify TypeScript compiles (expect errors in files not yet updated)**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && npx tsc --noEmit -p packages/shared/tsconfig.json 2>&1 | head -20`
Expected: Shared package compiles clean. Overlay package will have errors (we'll fix those in subsequent tasks).

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/types.ts packages/overlay/src/canvas-state.ts
git commit -m "refactor: update ToolType to select|text, remove draw state"
```

---

## Task 2: Remove Draw Tool

**Files:**
- Modify: `packages/overlay/src/tools/draw.ts` → empty/delete
- Modify: `packages/overlay/src/annotation-layer.ts` — remove `createLivePath`, `addStrokePath`
- Modify: `packages/overlay/src/design-tokens.ts` — remove `drawCursorSvg`
- Modify: `packages/overlay/src/interaction.ts` — remove draw cursor case, remove `refreshDrawCursor`

- [ ] **Step 1: Empty draw.ts**

Replace `packages/overlay/src/tools/draw.ts` contents with:
```typescript
// Draw tool removed — tool consolidation (2026-03-24)
```

- [ ] **Step 2: Remove draw-specific exports from annotation-layer.ts**

In `packages/overlay/src/annotation-layer.ts`:
- Remove `addStrokePath` function (lines 46-68)
- Remove `createLivePath` function (lines 157-185)
- Remove `pointsToPathD` helper (lines 148-155) — only used by draw functions
- Keep: `initAnnotationLayer`, `addTextAnnotation`, `addColorBadge`, `removeAnnotationElement`, `clearAnnotationLayer`, `destroyAnnotationLayer`, `syncTransform`

- [ ] **Step 3: Remove drawCursorSvg from design-tokens.ts**

In `packages/overlay/src/design-tokens.ts`, remove the `drawCursorSvg` function export. Also remove `moveCursorSvg` (no longer used after `"move"` cursor case is removed from interaction.ts). Keep `colorCursorSvg`.

- [ ] **Step 4: Remove draw cursor from interaction.ts**

In `packages/overlay/src/interaction.ts`:
- Remove the `case "draw"` from `updateCursor` (line 76)
- Remove the `case "move"` from `updateCursor` (line 75) — move is no longer a tool
- Remove `refreshDrawCursor` function (lines 82-87) and its export
- Remove the `drawCursorSvg` and `moveCursorSvg` imports from design-tokens

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools/draw.ts packages/overlay/src/annotation-layer.ts packages/overlay/src/design-tokens.ts packages/overlay/src/interaction.ts
git commit -m "refactor: remove draw tool, draw cursor, and draw annotation rendering"
```

---

## Task 3: Remove Grab Tool + Add Spacebar Pan

**Files:**
- Modify: `packages/overlay/src/tools/grab.ts` → empty/delete
- Modify: `packages/overlay/src/interaction.ts` — add spacebar pan, remove grab cursor case

- [ ] **Step 1: Empty grab.ts**

Replace `packages/overlay/src/tools/grab.ts` contents with:
```typescript
// Grab tool removed — replaced by spacebar+drag panning (2026-03-24)
```

- [ ] **Step 2: Add spacebar pan handling to interaction.ts**

In `packages/overlay/src/interaction.ts`, add spacebar pan state and handlers. Add these imports:
```typescript
import { panCanvas } from "./canvas-transform.js";
import { isTextEditing } from "./inline-text-edit.js";
```

Add state variables after existing `let` declarations:
```typescript
let isPanning = false;
let panLastX = 0;
let panLastY = 0;
let prePanCursor = "";
```

Add spacebar handlers — attach in `initInteraction()`, detach in `destroyInteraction()`:

```typescript
function onSpaceDown(e: KeyboardEvent): void {
  if (e.key !== " ") return;
  // Don't intercept spacebar during text editing or when typing in inputs
  if (isTextEditing()) return;
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
  if ((active as HTMLElement)?.isContentEditable) return;

  e.preventDefault();
  if (!isPanning && interactionEl) {
    prePanCursor = interactionEl.style.cursor;
    interactionEl.style.cursor = "grab";
    interactionEl.style.pointerEvents = "auto";
    isPanning = true;
  }
}

function onSpaceUp(e: KeyboardEvent): void {
  if (e.key !== " ") return;
  if (!isPanning) return;
  e.preventDefault();
  isPanning = false;
  panLastX = 0;
  panLastY = 0;
  if (interactionEl) {
    interactionEl.style.cursor = prePanCursor;
    // Restore pointer-events based on current tool
    const tool = getActiveTool();
    interactionEl.style.pointerEvents = tool === "select" ? "none" : "auto";
  }
}
```

Modify the existing mousedown/mousemove/mouseup listeners in `initInteraction()` to check `isPanning` first:

```typescript
interactionEl.addEventListener("mousedown", (e) => {
  if (isPanning) {
    panLastX = e.clientX;
    panLastY = e.clientY;
    if (interactionEl) interactionEl.style.cursor = "grabbing";
    e.preventDefault();
    return;
  }
  activeHandler?.onMouseDown?.(e);
});
interactionEl.addEventListener("mousemove", (e) => {
  if (isPanning && panLastX !== 0) {
    panCanvas(e.clientX - panLastX, e.clientY - panLastY);
    panLastX = e.clientX;
    panLastY = e.clientY;
    return;
  }
  activeHandler?.onMouseMove?.(e);
});
interactionEl.addEventListener("mouseup", (e) => {
  if (isPanning) {
    if (interactionEl) interactionEl.style.cursor = "grab";
    panLastX = 0;
    panLastY = 0;
    return;
  }
  activeHandler?.onMouseUp?.(e);
});
```

In `initInteraction()`, add:
```typescript
document.addEventListener("keydown", onSpaceDown);
document.addEventListener("keyup", onSpaceUp);
```

In `destroyInteraction()`, add:
```typescript
document.removeEventListener("keydown", onSpaceDown);
document.removeEventListener("keyup", onSpaceUp);
isPanning = false;
```

Also export `isPanningActive` so selection.ts can guard against pan clicks:
```typescript
export function isPanningActive(): boolean { return isPanning; }
```

- [ ] **Step 3: Add pan guard to selection.ts**

In `packages/overlay/src/selection.ts`, add import:
```typescript
import { isPanningActive } from "./interaction.js";
```

At the top of `handleMouseDown`, `handleMouseMove`, and `handleMouseUp`, add:
```typescript
if (isPanningActive()) return;
```

This prevents selection.ts's capture-phase listeners from processing clicks during spacebar pan. Without this guard, clicking to pan would also trigger element selection.

- [ ] **Step 5: Remove grab cursor case from updateCursor**

In `updateCursor`, remove `case "grab"` (line 74).

- [ ] **Step 6: Update activateInteraction for select tool**

In `activateInteraction`, change:
```typescript
// Before:
interactionEl.style.pointerEvents = tool === "pointer" ? "none" : "auto";

// After:
interactionEl.style.pointerEvents = tool === "select" ? "none" : "auto";
```

And in `updateCursor`, change:
```typescript
// Before:
case "pointer": interactionEl.style.cursor = "default"; break;

// After:
case "select": interactionEl.style.cursor = "default"; break;
```

- [ ] **Step 7: Test spacebar pan manually**

Build and verify:
1. Hold spacebar → cursor changes to grab, pointer-events becomes auto
2. Drag while holding spacebar → canvas pans
3. Release spacebar → cursor restores, pointer-events restores
4. Spacebar while editing text → types a space (no pan)

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build 2>&1 | tail -20`

- [ ] **Step 8: Commit**

```bash
git add packages/overlay/src/tools/grab.ts packages/overlay/src/interaction.ts packages/overlay/src/selection.ts
git commit -m "refactor: remove grab tool, add spacebar+drag panning"
```

---

## Task 4: Remove Pointer Tool + Refactor Move into Selection

This is the most complex task — merging Move tool drag behavior into selection.ts.

**Files:**
- Modify: `packages/overlay/src/tools/pointer.ts` → empty/delete
- Modify: `packages/overlay/src/tools/move.ts` → refactor to exported functions
- Modify: `packages/overlay/src/selection.ts` — add move-drag modes

**Design Decision:** selection.ts currently has modes: `"idle" | "pending" | "marquee" | "pending-drag" | "drag" | "resize-drag"`. The `"pending-drag"` and `"drag"` modes exist but are unused. We replace them with `"pending-move"` and `"move-drag"` for the merged move behavior.

**Key insight:** When the user mousedowns on the currently selected element, we enter `"pending-move"` mode. If they move past the drag threshold (4px), we transition to `"move-drag"` mode which applies move transforms. If they release without exceeding the threshold, it's a click (re-select or no-op).

When the user mousedowns on an element that already has a move entry (previously moved), we immediately enter move-drag mode for that element.

When the user mousedowns on unselected element, we enter `"pending"` mode as before — may become marquee or click-to-select.

- [ ] **Step 1: Empty pointer.ts**

Replace `packages/overlay/src/tools/pointer.ts` contents with:
```typescript
// Pointer tool removed — merged into Select tool (2026-03-24)
```

- [ ] **Step 2: Refactor move.ts to export standalone functions**

Rewrite `packages/overlay/src/tools/move.ts` to export functions instead of a handler object. The functions are called by selection.ts:

```typescript
// packages/overlay/src/tools/move.ts
//
// Move logic — called by selection.ts when the Select tool detects a move-drag.
// No longer a ToolEventHandler; these are standalone functions.

import type { MoveEntry } from "../move-state.js";
import { applyDragVisual, settleDragVisual } from "../move-state.js";
import {
  addMove,
  updateMoveDelta,
  getMoveForElement,
  viewportToPage,
  getCanvasTransform,
} from "../canvas-state.js";
import { getSelection, getSelectedElement } from "../selection.js";
import { computeSnap } from "../snap-guides.js";
import { setSnapGuides, clearSnapGuides } from "../highlight-canvas.js";

let dragEntry: MoveEntry | null = null;
let dragStartMouse = { x: 0, y: 0 };
let preDragDelta = { dx: 0, dy: 0 };
let isNewMove = false;

/**
 * Attempt to start a move for the element at the given mouse position.
 * Returns true if a move was initiated (existing move found, or new move created
 * for the currently selected element). Returns false if no move is possible
 * (element not selected, etc.) — caller should fall through to other behavior.
 */
export function tryStartMove(clientX: number, clientY: number, el: HTMLElement): boolean {
  const pagePos = viewportToPage(clientX, clientY);

  // Check if the element already has a move entry → re-drag it
  const existingForEl = getMoveForElement(el);
  if (existingForEl) {
    dragEntry = existingForEl;
    dragStartMouse = { x: pagePos.x, y: pagePos.y };
    preDragDelta = { ...existingForEl.delta };
    isNewMove = false;
    applyDragVisual(existingForEl.element, existingForEl.delta.dx, existingForEl.delta.dy, existingForEl.existingTransform);
    return true;
  }

  // Element must be the currently selected element to create a new move
  const selection = getSelection();
  const selectedEl = getSelectedElement();
  if (!selection || !selectedEl || el !== selectedEl) return false;

  // Create new move entry
  const originalRect = selectedEl.getBoundingClientRect();
  const originalCssText = selectedEl.style.cssText;
  const existingTransform = getComputedStyle(selectedEl).transform;

  const entry: MoveEntry = {
    id: crypto.randomUUID(),
    componentRef: {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
    },
    element: selectedEl,
    placeholder: null,
    originalRect,
    delta: { dx: 0, dy: 0 },
    originalCssText,
    existingTransform: existingTransform === "none" ? "" : existingTransform,
    identity: {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
      columnNumber: selection.columnNumber,
      tagName: selectedEl.tagName.toLowerCase(),
    },
  };

  addMove(entry);
  dragEntry = entry;
  dragStartMouse = { x: pagePos.x, y: pagePos.y };
  preDragDelta = { dx: 0, dy: 0 };
  isNewMove = true;
  applyDragVisual(selectedEl, 0, 0, entry.existingTransform);
  return true;
}

/** Update the active move drag with new mouse position. Call on mousemove. */
export function updateMovePosition(clientX: number, clientY: number): void {
  if (!dragEntry) return;
  const pagePos = viewportToPage(clientX, clientY);
  const rawDx = preDragDelta.dx + (pagePos.x - dragStartMouse.x);
  const rawDy = preDragDelta.dy + (pagePos.y - dragStartMouse.y);

  applyDragVisual(dragEntry.element, rawDx, rawDy, dragEntry.existingTransform);

  const parent = dragEntry.element.parentElement;
  if (!parent || parent === document.body || parent === document.documentElement) {
    dragEntry.delta = { dx: rawDx, dy: rawDy };
    clearSnapGuides();
    return;
  }

  const elemRect = dragEntry.element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const { scale } = getCanvasTransform();
  const snap = computeSnap(elemRect, parentRect, rawDx, rawDy, 5, scale);

  if (snap.snappedX || snap.snappedY) {
    applyDragVisual(dragEntry.element, snap.dx, snap.dy, dragEntry.existingTransform);
  }

  dragEntry.delta = { dx: snap.dx, dy: snap.dy };
  setSnapGuides(snap.guides);
}

/** End the active move drag. Call on mouseup. Returns the moved element so the caller can re-select it (avoids circular dependency with selection.ts). */
export function endMove(): HTMLElement | null {
  if (!dragEntry) return null;

  if (!isNewMove) {
    updateMoveDelta(dragEntry.id, dragEntry.delta, preDragDelta);
  }
  settleDragVisual(dragEntry);
  clearSnapGuides();

  const el = dragEntry.element;
  dragEntry = null;
  isNewMove = false;
  return el;
}

/** Returns true if a move drag is currently in progress. */
export function isMoveDragging(): boolean {
  return dragEntry !== null;
}

/** Cancel any in-progress move drag without committing. */
export function cancelMove(): void {
  dragEntry = null;
  isNewMove = false;
  clearSnapGuides();
}
```

- [ ] **Step 3: Integrate move-drag into selection.ts**

In `packages/overlay/src/selection.ts`:

**3a.** Add import at top:
```typescript
import { tryStartMove, updateMovePosition, endMove, isMoveDragging, cancelMove } from "./tools/move.js";
import { hasMoveForElement } from "./canvas-state.js";
```

**3b.** Update InteractionMode type (line 164):
```typescript
// Before:
type InteractionMode = "idle" | "pending" | "marquee" | "pending-drag" | "drag" | "resize-drag";

// After:
type InteractionMode = "idle" | "pending" | "marquee" | "pending-move" | "move-drag" | "resize-drag";
```

**3c.** In `handleMouseDown` (line 277), after the resize-handle check and the empty-space check, **replace lines 345-350** (the block from `mouseDownPos = ...` through `mode = "pending"`) with the complete block below. The `mode = "pending"` must be the else-fallback, not a follow-on line:

```typescript
mouseDownPos = { x: e.clientX, y: e.clientY };
mouseDownElement = el;
isShiftClick = e.shiftKey;

// If clicking on an element that already has a move entry → start re-drag immediately
if (hasMoveForElement(el)) {
  if (tryStartMove(e.clientX, e.clientY, el)) {
    mode = "move-drag";
    return;
  }
}

// If clicking on the currently selected element (not shift-click) → prepare for possible move-drag
if (!isShiftClick && selectedElement && el === selectedElement) {
  mode = "pending-move";
  return;
}

// Clicking unselected element → pending (may become marquee or click-to-select)
mode = "pending";
```

**3d.** In `handleMouseMove` (line 353), add move-drag mode handling. Insert before the existing `mode === "pending"` check:

```typescript
// Pending-move → move-drag (drag threshold for selected element)
if (mode === "pending-move" && mouseDownPos) {
  const dx = Math.abs(e.clientX - mouseDownPos.x);
  const dy = Math.abs(e.clientY - mouseDownPos.y);
  if (dx > 4 || dy > 4) {
    // Exceeded drag threshold — start move
    if (mouseDownElement && tryStartMove(mouseDownPos.x, mouseDownPos.y, mouseDownElement)) {
      mode = "move-drag";
      // Immediately update to current mouse position
      updateMovePosition(e.clientX, e.clientY);
    } else {
      // Couldn't start move (e.g., element lost selection) — fall back to marquee
      mode = "marquee";
    }
  }
  return;
}

// Active move-drag — update position
if (mode === "move-drag") {
  updateMovePosition(e.clientX, e.clientY);
  return;
}
```

**3e.** In `handleMouseUp` (line 455), add move-drag completion. Insert after the resize-drag handling:

```typescript
// Complete move-drag
if (prevMode === "move-drag") {
  const movedEl = endMove();
  if (movedEl) selectElementForMove(movedEl);
  mouseDownPos = null;
  mouseDownElement = null;
  return;
}

// Pending-move that didn't exceed threshold → treat as click (re-select)
if (prevMode === "pending-move") {
  // Already selected — no action needed (could open sidebar, etc.)
  mouseDownPos = null;
  mouseDownElement = null;
  return;
}
```

- [ ] **Step 4: Build and check for type errors**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build 2>&1 | tail -30`
Expected: May have errors from index.ts and tools-panel.ts (still referencing old tools). Fix those in Task 5.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools/pointer.ts packages/overlay/src/tools/move.ts packages/overlay/src/selection.ts
git commit -m "refactor: merge pointer+move into select tool via selection.ts move-drag modes"
```

---

## Task 5: Update Tools Panel (UI + Shortcuts)

**Files:**
- Modify: `packages/overlay/src/tools-panel.ts`

- [ ] **Step 1: Update TOOL_DEFS to two tools**

In `packages/overlay/src/tools-panel.ts:25-31`, replace:
```typescript
const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "select", icon: ICONS.pointer, label: "Select", shortcut: "V" },
  { type: "text", icon: ICONS.text, label: "Text", shortcut: "T" },
];
```

Note: The Select tool uses the pointer icon (cursor arrow) — not the move icon.

- [ ] **Step 2: Remove draw sub-options from updateSubOptions**

In `updateSubOptions` (line 587), remove the entire `if (tool === "draw")` block (lines 593-633). Keep the `if (tool === "text")` block.

- [ ] **Step 3: Remove refreshDrawCursor import**

In the imports at top of tools-panel.ts, remove the `refreshDrawCursor` import from `"./interaction.js"` (if it's imported — check line 6 area). The draw cursor refresh was called from the brush size segmented control which we just removed.

- [ ] **Step 4: Update shortcuts overlay**

In `openShortcutsOverlay()` (~line 488), update the sections:
```typescript
const sections: Array<{ label: string; items: Array<{ action: string; keys: string[] }> }> = [
  {
    label: "Tools",
    items: TOOL_DEFS.map(d => ({
      action: d.label,
      keys: [MOD_LABEL, d.shortcut],
    })),
  },
  {
    label: "Actions",
    items: [
      { action: "Undo", keys: [MOD_LABEL, "Z"] },
      { action: "Toggle Originals", keys: [MOD_LABEL, "."] },
      { action: "Keyboard Shortcuts", keys: [MOD_LABEL, "/"] },
      { action: "Cancel / Deselect", keys: ["Esc"] },
    ],
  },
  {
    label: "Canvas",
    items: [
      { action: "Pan", keys: ["Space", "Drag"] },
      { action: "Zoom", keys: [MOD_LABEL, "Scroll"] },
    ],
  },
];
```

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools-panel.ts
git commit -m "refactor: update tools panel to Select+Text, update shortcuts overlay"
```

---

## Task 6: Update Index.ts (Initialization + Tool Change Listener)

**Files:**
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Remove old tool imports**

Remove these imports from index.ts:
```typescript
// Remove:
import { activatePointer, deactivatePointer } from "./tools/pointer.js";
import { grabHandler } from "./tools/grab.js";
import { drawHandler } from "./tools/draw.js";
```

The `moveHandler` import also needs to change since move.ts no longer exports a handler:
```typescript
// Remove:
import { moveHandler } from "./tools/move.js";
```

- [ ] **Step 2: Update tool handler registration**

Replace the registration block (lines 220-224):
```typescript
// Before:
registerToolHandler("grab", grabHandler);
registerToolHandler("move", moveHandler);
registerToolHandler("draw", drawHandler);
registerToolHandler("text", textHandler);

// After:
// Select tool uses selection.ts capture-phase listeners directly (no interaction handler needed).
// Only text tool needs an interaction handler.
registerToolHandler("text", textHandler);
```

- [ ] **Step 3: Simplify tool change listener**

Replace the onToolChange callback (lines 227-242):
```typescript
onToolChange((tool, prev) => {
  dismissOnboarding();
  flashToolButton(tool);

  // Cleanup previous tool
  if (prev === "text") cleanupTextTool();

  // Clear caches on tool switch
  clearElementCache();
  clearVisibilityCache();

  // Select tool: selection.ts is always active (capture-phase listeners),
  // interaction layer has pointer-events: none so clicks pass through.
  // Text tool: interaction layer has pointer-events: auto.
  activateInteraction(tool);
  updateActiveToolUI(tool);
});
```

Note: `activatePointer()`/`deactivatePointer()` calls are removed. Selection.ts listeners are now always attached — they check `isActive` internally. The interaction layer's `pointer-events` toggle in `activateInteraction()` handles the tool switching.

- [ ] **Step 4: Wire setEnabled in tool change listener**

Keep `setEnabled` from selection.ts — it already does exactly what we need (attaches/detaches capture-phase listeners). Have the `onToolChange` callback call it:

```typescript
onToolChange((tool, prev) => {
  dismissOnboarding();
  flashToolButton(tool);

  if (prev === "text") cleanupTextTool();

  clearElementCache();
  clearVisibilityCache();

  // Enable/disable selection capture-phase listeners based on tool
  setEnabled(tool === "select");

  activateInteraction(tool);
  updateActiveToolUI(tool);
});
```

Update the import:
```typescript
import { initSelection, deactivateSelection, clearSelection, setEnabled } from "./selection.js";
```

- [ ] **Step 5: Build and test**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build 2>&1 | tail -20`
Expected: Clean build.

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/index.ts packages/overlay/src/selection.ts
git commit -m "refactor: update initialization for select+text tool set"
```

---

## Task 7: Clean Up Remaining References

**Files:**
- Various files that may still reference old tool names

- [ ] **Step 1: Search for remaining references to old tool names**

Run:
```bash
cd /Users/gimdongha/Desktop/Projects/FrameUp
grep -rn '"pointer"\|"grab"\|"move"\|"draw"' packages/overlay/src/ packages/shared/src/ --include='*.ts' | grep -v node_modules | grep -v '.d.ts'
```

Fix any remaining references. Common locations:
- `canvas-state.ts` — undo action types may reference "draw"
- `interaction.ts` — cursor cases for old tools
- Any file importing from removed tool files

- [ ] **Step 2: Remove DrawAnnotation type if unused**

In `packages/shared/src/types.ts`, check if `DrawAnnotation` type (line 202+) is still referenced. If the only consumer was draw.ts and canvas-state.ts serialization (which we removed), delete the type.

Also check the `Annotation` union type — remove `DrawAnnotation` from it if present.

- [ ] **Step 3: Remove unused imports across overlay**

Check each file for imports from removed modules:
- `tools/draw.ts` — no longer exports `drawHandler`
- `tools/grab.ts` — no longer exports `grabHandler`
- `tools/pointer.ts` — no longer exports `activatePointer`/`deactivatePointer`
- `annotation-layer.ts` — no longer exports `createLivePath`/`addStrokePath`
- `design-tokens.ts` — no longer exports `drawCursorSvg`
- `interaction.ts` — no longer exports `refreshDrawCursor`

- [ ] **Step 4: Full build + test**

Run:
```bash
cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build 2>&1
```
Expected: Clean build with no errors.

Run existing tests:
```bash
cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm test 2>&1
```
Expected: All 13 CLI tests pass. (Overlay tests may need updating if they reference old tools.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: clean up remaining references to removed tools"
```

---

## Task 8: Manual Verification Checklist

- [ ] **Step 1: Build overlay bundle**

```bash
cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build
```

- [ ] **Step 2: Start test app and launch FrameUp**

```bash
# Terminal 1:
cd /Users/gimdongha/Desktop/Projects/FrameUp/test-app && pnpm dev

# Terminal 2:
cd /Users/gimdongha/Desktop/Projects/FrameUp && node packages/cli/bin/frameup.js 3000
```

- [ ] **Step 3: Verify Select/Move tool**

- [ ] Toolbar shows exactly 2 buttons: Select (cursor icon) and Text
- [ ] `Cmd+V` activates Select tool
- [ ] Click element → selects with hover highlight and component label
- [ ] Click empty space → deselects
- [ ] Shift+click → multi-select
- [ ] Drag selected element → moves it (snap guides appear)
- [ ] Click previously-moved element → re-drag to adjust position
- [ ] Small click (no drag) on selected element → stays selected, no accidental move

- [ ] **Step 4: Verify spacebar pan**

- [ ] Hold spacebar → cursor changes to grab hand
- [ ] Hold spacebar + drag → canvas pans smoothly
- [ ] Release spacebar → cursor returns to normal
- [ ] Double-click element to edit text → spacebar types a space (no pan)

- [ ] **Step 5: Verify Text tool**

- [ ] `Cmd+T` activates Text tool
- [ ] Click on canvas → creates text annotation input
- [ ] Text sub-options (color swatch, font size) appear
- [ ] `Cmd+V` switches back to Select tool

- [ ] **Step 6: Verify removed tools**

- [ ] `D` key does nothing (no draw tool)
- [ ] `H`/`G` key does nothing (no grab tool)
- [ ] `M`/`J` key does nothing (no move tool)
- [ ] Shortcuts overlay shows: Select (Cmd+V), Text (Cmd+T), Pan (Space+Drag)

- [ ] **Step 7: Verify generate still works**

- [ ] Move elements, add text annotations
- [ ] Click Generate → serialized data includes moves and text (no draw annotations)

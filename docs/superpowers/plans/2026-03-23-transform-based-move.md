# Transform-Based Move System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ghost-clone move system with CSS transform-based moves so the real DOM element moves, property panel stays functional, and HMR survives.

**Architecture:** Move the actual element via `transform: translate(dx, dy)` with a box-model placeholder holding its original space. Ghost-layer is removed entirely. The move is stored as a delta annotation for the generate step.

**Tech Stack:** TypeScript, CSS transforms, MutationObserver, DOM APIs

**Spec:** `docs/superpowers/specs/2026-03-23-transform-based-move-design.md`

**Note on intermediate commits:** Tasks 3-7 modify tightly coupled modules. Intermediate commits between these tasks will not compile independently. This is expected — the codebase compiles cleanly after Task 7 Step 7. If CI runs per-commit, squash Tasks 3-7 into a single commit at the end.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/shared/src/types.ts` | Modify | Update `CanvasUndoAction` types, `SerializedAnnotations.moves` format |
| `packages/overlay/src/move-state.ts` | Create | `MoveEntry` type, placeholder creation, transform helpers, HMR re-acquisition |
| `packages/overlay/src/canvas-state.ts` | Modify | Replace ghost map/helpers with move map/helpers, update undo + serialization + eye toggle |
| `packages/overlay/src/tools/move.ts` | Rewrite | Transform-based drag instead of ghost creation |
| `packages/overlay/src/selection.ts` | Modify | Remove all ghost branching |
| `packages/overlay/src/index.ts` | Modify | Swap ghost init for move init, update wiring |
| `packages/overlay/src/ghost-layer.ts` | Delete | No longer needed |
| `packages/overlay/src/canvas-transform.ts` | Modify | Remove `data-frameup-ghost` filter |
| `packages/overlay/src/utils/component-filter.ts` | Modify | Remove `data-frameup-ghost` check |
| `packages/overlay/src/highlight-canvas.ts` | Modify | Remove `data-frameup-ghost` attribute |
| `packages/overlay/src/tools/text.ts` | Modify | Replace `data-frameup-ghost` with `data-frameup-overlay` |
| `packages/overlay/src/design-tokens.ts` | Modify | Update ghost comment |

---

## Task 1: Update Shared Types

**Files:**
- Modify: `packages/shared/src/types.ts:226-244`

- [ ] **Step 1: Update CanvasUndoAction types**

Replace ghost undo actions with move undo actions at lines 227-228:

```typescript
export type CanvasUndoAction =
  | { type: "moveCreate"; moveId: string }
  | { type: "moveDelta"; moveId: string; previousDelta: { dx: number; dy: number } }
  | { type: "annotationAdd"; annotationId: string }
  | { type: "colorChange"; annotationId: string; property: string; previousColor: string }
  | {
      type: "propertyChange";
      elementIdentity: ElementIdentity;
      overrides: Array<{ cssProperty: string; previousValue: string; newValue: string }>;
    };
```

- [ ] **Step 2: Update SerializedAnnotations.moves format**

Replace the `moves` array type at lines 238-244:

```typescript
export interface SerializedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    originalRect: { top: number; left: number; width: number; height: number };
    delta: { dx: number; dy: number };
  }>;
  // ... rest unchanged
}
```

- [ ] **Step 3: Build shared package to verify types compile**

Run: `pnpm --filter @frameup/shared build`
Expected: Clean compile, no errors

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): update undo actions and serialization for transform-based moves"
```

---

## Task 2: Create move-state.ts — Core Move Module

**Files:**
- Create: `packages/overlay/src/move-state.ts`

This module owns the `MoveEntry` type, placeholder creation, transform application, and HMR re-acquisition. It is a pure logic module — no UI, no event handlers.

- [ ] **Step 1: Create move-state.ts with MoveEntry type and placeholder factory**

```typescript
import type { ComponentRef, ElementIdentity } from "@frameup/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import { SHADOWS } from "./design-tokens.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MoveEntry {
  id: string;
  componentRef: ComponentRef;
  element: HTMLElement;
  placeholder: HTMLElement | null; // null for absolute/fixed/sticky
  originalRect: DOMRect;
  delta: { dx: number; dy: number };
  originalCssText: string;
  existingTransform: string;
  identity: ElementIdentity;
}

// ---------------------------------------------------------------------------
// Placeholder
// ---------------------------------------------------------------------------

/** Properties to copy from getComputedStyle for an exact box-model match. */
const PLACEHOLDER_PROPS = [
  "display",
  "width", "height",
  "marginTop", "marginRight", "marginBottom", "marginLeft",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "boxSizing",
  // Flex/grid child properties
  "flex", "flexGrow", "flexShrink", "flexBasis",
  "gridColumn", "gridRow",
  "alignSelf", "justifySelf",
  "order",
] as const;

export function createPlaceholder(element: HTMLElement): HTMLElement {
  const ph = document.createElement("div");
  ph.setAttribute("data-frameup-placeholder", "true");
  const computed = getComputedStyle(element);
  for (const prop of PLACEHOLDER_PROPS) {
    (ph.style as any)[prop] = computed[prop as any];
  }
  ph.style.visibility = "hidden";
  return ph;
}

// ---------------------------------------------------------------------------
// Transform helpers
// ---------------------------------------------------------------------------

export function composeTransform(dx: number, dy: number, existingTransform: string): string {
  const base = existingTransform && existingTransform !== "none" ? ` ${existingTransform}` : "";
  return `translate(${dx}px, ${dy}px)${base}`;
}

export function applyMoveTransform(entry: MoveEntry): void {
  entry.element.style.transform = composeTransform(entry.delta.dx, entry.delta.dy, entry.existingTransform);
}

export function clearMoveTransform(entry: MoveEntry): void {
  if (entry.existingTransform && entry.existingTransform !== "none") {
    entry.element.style.transform = entry.existingTransform;
  } else {
    entry.element.style.transform = "";
  }
}

/** Apply dragging visual: elevated shadow + slight scale. */
export function applyDragVisual(element: HTMLElement, dx: number, dy: number, existingTransform: string): void {
  element.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)${existingTransform && existingTransform !== "none" ? ` ${existingTransform}` : ""}`;
  element.style.boxShadow = SHADOWS.lg;
  element.style.transition = "none";
  element.style.zIndex = "2147483644";
}

/** Remove dragging visual, settle to final transform. */
export function settleDragVisual(entry: MoveEntry): void {
  applyMoveTransform(entry);
  entry.element.style.boxShadow = SHADOWS.sm;
  entry.element.style.transition = "";
  entry.element.style.zIndex = "2147483644";
}

// ---------------------------------------------------------------------------
// Position detection
// ---------------------------------------------------------------------------

const OUT_OF_FLOW = new Set(["absolute", "fixed", "sticky"]);

export function isOutOfFlow(element: HTMLElement): boolean {
  return OUT_OF_FLOW.has(getComputedStyle(element).position);
}

// ---------------------------------------------------------------------------
// HMR Re-acquisition (mirrors property-controller.ts pattern)
// ---------------------------------------------------------------------------

export function reacquireMovedElement(identity: ElementIdentity): HTMLElement | null {
  // Strategy 1: synchronous _debugSource fiber walk (React 18)
  const candidates = document.querySelectorAll(identity.tagName);
  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      let fiber = getFiberFromHostInstance(el);
      while (fiber) {
        if (isCompositeFiber(fiber)) {
          const source = (fiber as any)._debugSource;
          const name = getDisplayName(fiber);
          if (
            source &&
            name === identity.componentName &&
            source.fileName?.endsWith(identity.filePath) &&
            source.lineNumber === identity.lineNumber
          ) {
            return el;
          }
        }
        fiber = fiber.return;
      }
    } catch {
      // fiber walk may fail
    }
  }
  return null;
}

export async function reacquireMovedElementAsync(identity: ElementIdentity): Promise<HTMLElement | null> {
  const candidates = document.querySelectorAll(identity.tagName);
  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      const fiber = getFiberFromHostInstance(el);
      if (!fiber) continue;
      const frames = await getOwnerStack(fiber);
      if (!frames || frames.length === 0) continue;
      for (const frame of frames) {
        if (!frame.functionName || frame.functionName !== identity.componentName) continue;
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized) && normalized.endsWith(identity.filePath)) {
            return el;
          }
        }
      }
    } catch {
      // owner stack may fail
    }
  }
  return null;
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors (or only pre-existing ones unrelated to move-state.ts)

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/move-state.ts
git commit -m "feat(overlay): add move-state module with MoveEntry, placeholder, transform helpers"
```

---

## Task 3: Update canvas-state.ts — Replace Ghost Map with Move Map

**Files:**
- Modify: `packages/overlay/src/canvas-state.ts`

This is the largest single change. Replace the ghost map, ghost helpers, ghost undo handling, eye toggle, and serialization.

- [ ] **Step 1: Remove ghost imports and add move imports**

Remove the `GhostEntry` interface definition (lines 7-16). Add import:

```typescript
import type { MoveEntry } from "./move-state.js";
import { applyMoveTransform, clearMoveTransform, createPlaceholder, isOutOfFlow } from "./move-state.js";
```

- [ ] **Step 2: Replace ghost map with moves map**

Replace `let ghosts: Map<string, GhostEntry> = new Map()` (line 26) with:

```typescript
let moves: Map<string, MoveEntry> = new Map();
```

- [ ] **Step 3: Replace ghost accessors with move accessors**

Replace `getGhosts`, `addGhost`, `moveGhost`, `removeGhost` (lines 86-111) with:

```typescript
export function getMoves(): Map<string, MoveEntry> {
  return moves;
}

export function addMove(entry: MoveEntry): void {
  moves.set(entry.id, entry);
  pushUndoAction({ type: "moveCreate", moveId: entry.id });
  notifyStateChange();
}

export function updateMoveDelta(id: string, delta: { dx: number; dy: number }, previousDelta: { dx: number; dy: number }): void {
  const entry = moves.get(id);
  if (!entry) return;
  entry.delta = delta;
  applyMoveTransform(entry);
  pushUndoAction({ type: "moveDelta", moveId: id, previousDelta });
  notifyStateChange();
}

export function removeMove(id: string): void {
  const entry = moves.get(id);
  if (!entry) return;
  // Restore original element state
  entry.element.style.cssText = entry.originalCssText;
  // Remove placeholder
  if (entry.placeholder && entry.placeholder.parentNode) {
    entry.placeholder.parentNode.removeChild(entry.placeholder);
  }
  moves.delete(id);
  notifyStateChange();
}
```

- [ ] **Step 4: Replace hasGhostForElement with hasMoveForElement**

Replace `hasGhostForElement` (lines 169-177) with:

```typescript
export function hasMoveForElement(el: HTMLElement): boolean {
  for (const entry of moves.values()) {
    if (entry.element === el) return true;
    if (entry.element.contains(el) || el.contains(entry.element)) return true;
  }
  return false;
}

export function getMoveForElement(el: HTMLElement): MoveEntry | undefined {
  for (const entry of moves.values()) {
    if (entry.element === el) return entry;
  }
  return undefined;
}
```

- [ ] **Step 5: Update eye toggle (setOriginalsHidden)**

Replace the existing `setOriginalsHidden` implementation (lines 152-167) with:

```typescript
export function setOriginalsHidden(hidden: boolean): void {
  originalsHidden = hidden;
  for (const entry of moves.values()) {
    if (hidden) {
      // "Hidden" = transforms applied (moved state)
      applyMoveTransform(entry);
    } else {
      // "Visible" = transforms cleared (original positions)
      clearMoveTransform(entry);
    }
  }
}
```

Note: the boolean semantics are inverted from the old system. `hidden=true` now means "originals hidden = transforms applied = moved state" which matches the default. `hidden=false` means "show originals = clear transforms = snap back."

- [ ] **Step 6: Update canvasUndo()**

In the `canvasUndo` function, replace the `ghostCreate` and `ghostMove` cases (lines 186-198) with:

```typescript
case "moveCreate":
  removeMove(action.moveId);
  break;
case "moveDelta": {
  const moveEntry = moves.get(action.moveId);
  if (moveEntry) {
    moveEntry.delta = action.previousDelta;
    applyMoveTransform(moveEntry);
  }
  break;
}
```

- [ ] **Step 7: Remove onGhostPositionUpdate callback**

Delete the `onGhostPositionUpdate` function and its callback variable (lines 139-142). This is no longer needed since transforms are applied directly to the real element.

- [ ] **Step 8: Update serializeAnnotations()**

Replace the ghost serialization (lines 320-328) with:

```typescript
const serializedMoves = Array.from(moves.values()).map((entry) => ({
  component: entry.componentRef.componentName,
  file: entry.componentRef.filePath,
  line: entry.componentRef.lineNumber,
  originalRect: {
    top: entry.originalRect.top,
    left: entry.originalRect.left,
    width: entry.originalRect.width,
    height: entry.originalRect.height,
  },
  delta: { dx: entry.delta.dx, dy: entry.delta.dy },
}));
```

And use `serializedMoves` in the returned object where `moves` was previously used.

- [ ] **Step 9: Update clearCanvas to remove moves**

In the `clearCanvas` function (or wherever ghosts are cleared), replace ghost removal with:

```typescript
for (const entry of moves.values()) {
  entry.element.style.cssText = entry.originalCssText;
  if (entry.placeholder && entry.placeholder.parentNode) {
    entry.placeholder.parentNode.removeChild(entry.placeholder);
  }
}
moves.clear();
```

- [ ] **Step 10: Update hasMoves helper for toolbar state**

Replace any function that checks `ghosts.size > 0` (used by toolbar to enable/disable eye toggle and generate button) with equivalent checks on `moves.size`. Specifically, find the `hasChanges()` or equivalent function and update:

```typescript
export function hasChanges(): boolean {
  return moves.size > 0 || annotations.length > 0;
}
```

Also update `hasMoves()` if it exists as a separate export:

```typescript
export function hasMoves(): boolean {
  return moves.size > 0;
}
```

- [ ] **Step 11: Build overlay to verify compilation**

Run: `pnpm --filter @frameup/overlay build`
Expected: Build may fail due to downstream consumers still importing ghost functions. That's expected — we'll fix those in subsequent tasks.

- [ ] **Step 12: Commit**

```bash
git add packages/overlay/src/canvas-state.ts
git commit -m "feat(canvas-state): replace ghost map with moves map, update undo and serialization"
```

---

## Task 4: Rewrite tools/move.ts — Transform-Based Drag

**Files:**
- Rewrite: `packages/overlay/src/tools/move.ts`

- [ ] **Step 1: Rewrite move.ts with transform-based drag**

```typescript
import type { ToolEventHandler } from "../interaction.js";
import type { MoveEntry } from "../move-state.js";
import {
  createPlaceholder,
  applyDragVisual,
  settleDragVisual,
  isOutOfFlow,
} from "../move-state.js";
import {
  addMove,
  updateMoveDelta,
  getMoveForElement,
  hasMoveForElement,
  viewportToPage,
} from "../canvas-state.js";
import { getSelection, getSelectedElement, selectElementForMove, clearSelection } from "../selection.js";
import { getPageElementAtPoint } from "../interaction.js";

let dragEntry: MoveEntry | null = null;
let dragStartMouse = { x: 0, y: 0 };
let preDragDelta = { dx: 0, dy: 0 };
let isNewMove = false;
let isDragging = false;
let pendingClickEl: HTMLElement | null = null;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    pendingClickEl = null;
    isNewMove = false;
    isDragging = false;

    const pagePos = viewportToPage(e.clientX, e.clientY);

    // Check if clicking on an already-moved element
    const clickedEl = getPageElementAtPoint(e.clientX, e.clientY);

    // Clicking empty space → deselect
    if (!clickedEl) {
      clearSelection();
      return;
    }

    // Check if the clicked element already has a move entry
    const existingForClicked = getMoveForElement(clickedEl);
    if (existingForClicked) {
      dragEntry = existingForClicked;
      dragStartMouse = { x: pagePos.x, y: pagePos.y };
      preDragDelta = { ...existingForClicked.delta };
      isNewMove = false;
      isDragging = true;
      applyDragVisual(existingForClicked.element, existingForClicked.delta.dx, existingForClicked.delta.dy, existingForClicked.existingTransform);
      return;
    }

    // Get currently selected element
    const selection = getSelection();
    const selectedEl = getSelectedElement();

    // If clicking a different element than currently selected → switch selection on mouseUp
    if (!selection || !selectedEl || clickedEl !== selectedEl) {
      pendingClickEl = clickedEl;
      return;
    }

    // Clicking the currently selected element → check for existing move or create new
    const existingMove = getMoveForElement(selectedEl);
    if (existingMove) {
      dragEntry = existingMove;
      dragStartMouse = { x: pagePos.x, y: pagePos.y };
      preDragDelta = { ...existingMove.delta };
      isNewMove = false;
      isDragging = true;
      applyDragVisual(existingMove.element, existingMove.delta.dx, existingMove.delta.dy, existingMove.existingTransform);
      return;
    }

    // Create new move
    const originalRect = selectedEl.getBoundingClientRect();
    const originalCssText = selectedEl.style.cssText;
    const existingTransform = getComputedStyle(selectedEl).transform;
    const outOfFlow = isOutOfFlow(selectedEl);

    let placeholder: HTMLElement | null = null;
    if (!outOfFlow) {
      placeholder = createPlaceholder(selectedEl);
      selectedEl.parentNode?.insertBefore(placeholder, selectedEl);
      selectedEl.style.position = "relative";
    }

    const entry: MoveEntry = {
      id: crypto.randomUUID(),
      componentRef: {
        componentName: selection.componentName,
        filePath: selection.filePath,
        lineNumber: selection.lineNumber,
      },
      element: selectedEl,
      placeholder,
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
    isDragging = true;

    applyDragVisual(selectedEl, 0, 0, entry.existingTransform);
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragEntry) return;
    const pagePos = viewportToPage(e.clientX, e.clientY);
    const dx = preDragDelta.dx + (pagePos.x - dragStartMouse.x);
    const dy = preDragDelta.dy + (pagePos.y - dragStartMouse.y);
    dragEntry.delta = { dx, dy };
    applyDragVisual(dragEntry.element, dx, dy, dragEntry.existingTransform);
  },

  onMouseUp() {
    // Complete drag
    if (isDragging && dragEntry) {
      if (!isNewMove) {
        updateMoveDelta(dragEntry.id, dragEntry.delta, preDragDelta);
      }
      settleDragVisual(dragEntry);
    }

    dragEntry = null;
    isDragging = false;
    isNewMove = false;

    // Click-to-select (no drag occurred) — select without sidebar
    if (pendingClickEl) {
      selectElementForMove(pendingClickEl);
      pendingClickEl = null;
    }
  },
};
```

- [ ] **Step 2: Verify compilation**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: May still have errors from other files importing ghost functions — that's fine for now.

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/tools/move.ts
git commit -m "feat(move): rewrite move tool with CSS transform-based drag"
```

---

## Task 5: Update selection.ts — Remove Ghost Branching

**Files:**
- Modify: `packages/overlay/src/selection.ts`

- [ ] **Step 1: Remove ghost imports**

Remove imports of `findGhostAtPoint`, `GhostEntry` from ghost-layer/canvas-state.

- [ ] **Step 2: Remove selectedGhost state variable**

Delete `let selectedGhost: GhostEntry | null = null` (line 151).

- [ ] **Step 3: Remove ghost detection in handleMouseDown**

At lines 331-340, remove the `findGhostAtPoint` call and ghost branching. The element at point is now the real (transformed) element, so standard `elementFromPoint` works.

- [ ] **Step 4: Remove ghost rect branching in selectElement and updateSelectionPosition**

At lines 531-534 and 830-835, remove the ternary that checks `selectedGhost`. Just use `el.getBoundingClientRect()` — CSS transforms are already accounted for.

- [ ] **Step 5: Remove ghost hover detection**

At lines 460-467, remove the ghost-first hover check. Standard `elementFromPoint` hits transformed elements correctly.

- [ ] **Step 6: Remove trackGhostAfterDrop export**

Delete the `trackGhostAfterDrop` function (lines 935-939). No longer needed.

- [ ] **Step 7: Remove selectedGhost from clearSelection**

At line 863, remove `selectedGhost = null`.

- [ ] **Step 8: Verify compilation**

Run: `cd packages/overlay && npx tsc --noEmit`

- [ ] **Step 9: Commit**

```bash
git add packages/overlay/src/selection.ts
git commit -m "refactor(selection): remove all ghost branching, use real element rects"
```

---

## Task 6: Update index.ts — Swap Ghost Init for Move Init

**Files:**
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Remove ghost-layer imports**

Remove `initGhostLayer`, `destroyGhostLayer`, `updateGhostPosition` imports.

- [ ] **Step 2: Remove ghost initialization**

Remove `initGhostLayer()` call (line 170) and the `onGhostPositionUpdate` wiring (lines 174-175).

- [ ] **Step 3: Add HMR observer for moves**

Add a MutationObserver that watches for moved elements being removed from the DOM (HMR). In the init function, after move system is ready:

```typescript
import type { MoveEntry } from "./move-state.js";
import { getMoves, removeMove } from "./canvas-state.js";
import {
  reacquireMovedElement,
  reacquireMovedElementAsync,
  applyMoveTransform,
  createPlaceholder,
  isOutOfFlow,
} from "./move-state.js";

// HMR survival for moved elements
const moveObserver = new MutationObserver(() => {
  for (const [id, entry] of getMoves()) {
    if (!document.contains(entry.element)) {
      setTimeout(() => {
        // Try sync reacquisition first
        let newEl = reacquireMovedElement(entry.identity);
        if (newEl) {
          restoreMoveToElement(id, entry, newEl);
          return;
        }
        // Try async reacquisition
        reacquireMovedElementAsync(entry.identity).then((asyncEl) => {
          if (asyncEl) {
            restoreMoveToElement(id, entry, asyncEl);
          } else {
            removeMove(id);
            showToast(`Component ${entry.componentRef.componentName} removed — move cleared`);
          }
        });
      }, 80);
    }
  }
});

function restoreMoveToElement(id: string, entry: MoveEntry, newEl: HTMLElement): void {
  entry.originalCssText = newEl.style.cssText;
  entry.element = newEl;
  if (!isOutOfFlow(newEl) && !entry.placeholder?.parentNode) {
    entry.placeholder = createPlaceholder(newEl);
    newEl.parentNode?.insertBefore(entry.placeholder, newEl);
    newEl.style.position = "relative";
  }
  applyMoveTransform(entry);
}

moveObserver.observe(document.body, { childList: true, subtree: true });
```

- [ ] **Step 4: Update close/cleanup function**

Replace `destroyGhostLayer()` (line 304) with `moveObserver.disconnect()`.

- [ ] **Step 5: Update eye toggle handler**

In the eye toggle listener (around line 225), verify it calls the updated `setOriginalsHidden()` which now toggles transforms instead of visibility.

- [ ] **Step 6: Verify compilation**

Run: `cd packages/overlay && npx tsc --noEmit`

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/index.ts
git commit -m "feat(index): wire HMR observer for moves, remove ghost layer init"
```

---

## Task 7: Delete ghost-layer.ts and Clean Up Ghost References

**Files:**
- Delete: `packages/overlay/src/ghost-layer.ts`
- Modify: `packages/overlay/src/interaction.ts`
- Modify: `packages/overlay/src/canvas-transform.ts`
- Modify: `packages/overlay/src/utils/component-filter.ts`
- Modify: `packages/overlay/src/highlight-canvas.ts`
- Modify: `packages/overlay/src/tools/text.ts`
- Modify: `packages/overlay/src/design-tokens.ts`

- [ ] **Step 1: Delete ghost-layer.ts**

```bash
rm packages/overlay/src/ghost-layer.ts
```

- [ ] **Step 2: Clean interaction.ts**

In `getPageElementAtPoint()` (around line 116), replace the `data-frameup-ghost` check with `data-frameup-placeholder`:

```typescript
if (el.hasAttribute("data-frameup-placeholder")) continue;
```

- [ ] **Step 4: Clean canvas-transform.ts**

Remove the `data-frameup-ghost` attribute check (around line 96) where children are filtered when moving into the canvas wrapper. Replace with a check for `data-frameup-placeholder`:

```typescript
// Skip FrameUp placeholder elements when wrapping
if (child instanceof HTMLElement && child.hasAttribute("data-frameup-placeholder")) continue;
```

- [ ] **Step 5: Clean component-filter.ts**

Remove the `data-frameup-ghost` check (around line 96). Add `data-frameup-placeholder` to the filter list so placeholders are excluded from component selection.

- [ ] **Step 6: Clean highlight-canvas.ts**

Remove the `data-frameup-ghost` attribute set on the canvas element (around line 70). Use `data-frameup-overlay` instead if an attribute is still needed for filtering.

- [ ] **Step 7: Clean tools/text.ts**

Replace `data-frameup-ghost` attribute (line 44) with `data-frameup-overlay` on the text input element.

- [ ] **Step 8: Clean design-tokens.ts**

Update the comment referencing "ghost shadow on drop" to "move shadow on drop" or similar.

- [ ] **Step 9: Full build**

Run: `pnpm build`
Expected: Clean build across all packages.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: delete ghost-layer, clean all ghost references across codebase"
```

---

## Task 8: Integration Test — Manual Verification

**Files:** None (testing only)

- [ ] **Step 1: Build the full project**

Run: `pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 2: Run existing tests**

Run: `pnpm test`
Expected: All 13 CLI transform tests pass. Any overlay tests that reference ghost types may need updating.

- [ ] **Step 3: Manual test — basic move**

1. Start test-app: `cd test-app && pnpm dev`
2. Start FrameUp: `node packages/cli/bin/frameup.js 3000`
3. Open proxy URL, select a component, switch to Move tool, drag it
4. Verify: element moves with the cursor, placeholder holds space, property panel still works

- [ ] **Step 4: Manual test — property edit after move**

1. Move a component
2. Switch to Pointer tool, click the moved element
3. Change a property (e.g., padding) in the right panel
4. Verify: change is immediately visible on the moved element

- [ ] **Step 5: Manual test — eye toggle**

1. Move a component
2. Click the eye toggle in the toolbar
3. Verify: element snaps back to original position
4. Click eye toggle again
5. Verify: element returns to moved position

- [ ] **Step 6: Manual test — undo**

1. Move a component
2. Press Ctrl+Z (or undo button)
3. Verify: element returns to original position, placeholder removed

- [ ] **Step 7: Manual test — elements with existing transforms**

1. Add `transform: rotate(15deg)` to a test component's style
2. Move that component
3. Verify: rotation is preserved while element translates

- [ ] **Step 8: Manual test — HMR survival**

1. Move a component
2. Edit that component's source file and save (trigger HMR)
3. Verify: moved element re-acquires and transform re-applies

- [ ] **Step 9: Manual test — click-to-select in move mode**

1. Switch to Move tool
2. Click a component (without dragging) — verify it gets selected
3. Click a different component — verify selection switches
4. Click empty space — verify selection clears

- [ ] **Step 10: Manual test — nested moves**

1. Move a parent component
2. Move a child component within it
3. Verify: both transforms stack correctly, child is offset relative to parent
4. Undo child move — verify parent stays moved

- [ ] **Step 11: Manual test — absolute/fixed elements**

1. Find or add a `position: absolute` element in the test app
2. Move it with the Move tool
3. Verify: no placeholder is inserted, element moves via transform

- [ ] **Step 12: Manual test — scroll during drag**

1. In a scrollable container, select a component
2. Start dragging, then scroll the container mid-drag
3. Verify: the element follows the cursor correctly

- [ ] **Step 13: Commit any test fixes**

```bash
git add -A
git commit -m "fix: resolve integration issues from transform-based move migration"
```

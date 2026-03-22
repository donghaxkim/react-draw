// packages/overlay/src/tools/move.ts
import type { ToolEventHandler } from "../interaction.js";
import { getSelection, getSelectedElement, selectElementForMove, trackGhostAfterDrop, clearSelection } from "../selection.js";
import { getGhosts, moveGhost, hasGhostForElement, viewportToPage } from "../canvas-state.js";
import { createGhost, updateGhostPosition, findGhostAtPoint, setGhostDragging, setGhostSettled } from "../ghost-layer.js";
import { getPageElementAtPoint } from "../interaction.js";
import type { GhostEntry } from "../canvas-state.js";

let dragTarget: GhostEntry | null = null;
let dragOffset = { x: 0, y: 0 };
let isDragging = false;
let isNewGhost = false; // true when ghost was just created this drag (ghostCreate undo handles removal)
let preDragPos: { x: number; y: number } | null = null; // position before drag started
// Pending click-to-select: store element to select on mouseUp if no drag occurs
let pendingClickEl: HTMLElement | null = null;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    pendingClickEl = null;
    isNewGhost = false;
    preDragPos = null;

    // Check if clicking an existing ghost — start drag immediately
    const existingGhost = findGhostAtPoint(e.clientX, e.clientY);
    if (existingGhost) {
      dragTarget = existingGhost;
      preDragPos = { ...existingGhost.currentPos };
      const page = viewportToPage(e.clientX, e.clientY);
      dragOffset = {
        x: page.x - existingGhost.currentPos.x,
        y: page.y - existingGhost.currentPos.y,
      };
      isDragging = true;
      setGhostDragging(dragTarget.id);
      return;
    }

    // Check what page element is under the cursor
    const clickedEl = getPageElementAtPoint(e.clientX, e.clientY);

    // Clicking empty space → deselect
    if (!clickedEl) {
      clearSelection();
      return;
    }

    // Check if there's a current selection
    const selection = getSelection();
    const selectedEl = getSelectedElement();

    // If clicking a different element than currently selected → switch selection
    if (!selection || !selectedEl || clickedEl !== selectedEl) {
      pendingClickEl = clickedEl;
      return;
    }

    // Clicking the currently selected element → create ghost and start drag

    // Prevent creating duplicate or nested ghosts for the same element
    if (hasGhostForElement(selectedEl)) {
      for (const ghost of getGhosts().values()) {
        if (ghost.originalEl === selectedEl || ghost.originalEl.contains(selectedEl) || selectedEl.contains(ghost.originalEl)) {
          dragTarget = ghost;
          preDragPos = { ...ghost.currentPos };
          const page = viewportToPage(e.clientX, e.clientY);
          dragOffset = {
            x: page.x - ghost.currentPos.x,
            y: page.y - ghost.currentPos.y,
          };
          isDragging = true;
          setGhostDragging(dragTarget.id);
          return;
        }
      }
    }

    const ghost = createGhost(selectedEl, {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
    });

    dragTarget = ghost;
    isNewGhost = true;
    const page = viewportToPage(e.clientX, e.clientY);
    dragOffset = {
      x: page.x - ghost.currentPos.x,
      y: page.y - ghost.currentPos.y,
    };
    isDragging = true;
    setGhostDragging(dragTarget.id);
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragTarget) return;
    const page = viewportToPage(e.clientX, e.clientY);
    const pageX = page.x - dragOffset.x;
    const pageY = page.y - dragOffset.y;
    updateGhostPosition(dragTarget.id, pageX, pageY);
  },

  onMouseUp(_e: MouseEvent) {
    // Complete drag
    if (isDragging && dragTarget) {
      if (isNewGhost) {
        // New ghost: ghostCreate undo already on stack — no need for ghostMove
        // Just settle the ghost visually
      } else if (preDragPos) {
        // Re-drag of existing ghost: record move with the actual pre-drag position
        moveGhost(dragTarget.id, dragTarget.currentPos, preDragPos);
      }
      setGhostSettled(dragTarget.id);
      trackGhostAfterDrop(dragTarget);
    }
    dragTarget = null;
    isDragging = false;
    isNewGhost = false;
    preDragPos = null;

    // Click-to-select (no drag occurred) — select without sidebar
    if (pendingClickEl) {
      selectElementForMove(pendingClickEl);
      pendingClickEl = null;
    }
  },
};

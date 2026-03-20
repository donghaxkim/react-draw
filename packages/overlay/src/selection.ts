// packages/overlay/src/selection.ts
import { getFiberFromHostInstance, getDisplayName, isCompositeFiber, isInstrumentationActive, instrument } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import type { ComponentInfo } from "@sketch-ui/shared";
import { updateComponentInfo, getShadowRoot } from "./toolbar.js";
import { isInternalName } from "./utils/component-filter.js";

// Ensure bippy instrumentation is active so we can read fiber info
if (!isInstrumentationActive()) {
  instrument({
    onCommitFiberRoot() {
      // no-op — we just need the hook installed
    },
  });
}

type ResolvedComponent = {
  tagName: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  stack: Array<{ componentName: string; filePath: string; lineNumber: number; columnNumber: number }>;
};

/**
 * Resolve component info from a DOM element using bippy's owner stack.
 * Handles both React 18 (_debugSource) and React 19 (owner stacks + source maps).
 */
async function resolveComponentFromElement(el: HTMLElement): Promise<ResolvedComponent | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  // Try bippy/source getOwnerStack first — handles React 19 owner stacks with symbolication
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      const stack: ResolvedComponent["stack"] = [];
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) {
            filePath = normalized;
          }
        }

        stack.push({
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
          columnNumber: frame.columnNumber ?? 0,
        });
      }

      if (stack.length > 0) {
        return {
          tagName: el.tagName.toLowerCase(),
          componentName: stack[0].componentName,
          filePath: stack[0].filePath,
          lineNumber: stack[0].lineNumber,
          columnNumber: stack[0].columnNumber,
          stack,
        };
      }
    }
  } catch (err) {
    console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:", err);
  }

  // Fallback: synchronous fiber walk (works when owner stacks aren't available)
  return resolveComponentFromFiberWalk(el, fiber);
}

/** Synchronous fallback — walks fiber.return chain for component names */
function resolveComponentFromFiberWalk(el: HTMLElement, fiber: any): ResolvedComponent | null {
  const stack: ResolvedComponent["stack"] = [];
  let current = fiber;

  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      const debugSource = current._debugSource || current._debugOwner?._debugSource;

      let filePath = "";
      let lineNumber = 0;
      let columnNumber = 0;

      if (debugSource) {
        filePath = debugSource.fileName || "";
        lineNumber = debugSource.lineNumber || 0;
        columnNumber = debugSource.columnNumber || 0;
      }

      if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
        stack.push({ componentName: name, filePath, lineNumber, columnNumber });
      }
    }
    current = current.return;
  }

  if (stack.length === 0) return null;

  return {
    tagName: el.tagName.toLowerCase(),
    componentName: stack[0].componentName,
    filePath: stack[0].filePath,
    lineNumber: stack[0].lineNumber,
    columnNumber: stack[0].columnNumber,
    stack,
  };
}

/** Synchronous-only resolve for hover labels and marquee (fast path) */
function resolveComponentSync(el: HTMLElement): ResolvedComponent | null {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;
  return resolveComponentFromFiberWalk(el, fiber);
}


let currentSelection: ComponentInfo | null = null;
let selectedElement: HTMLElement | null = null;
let isActive = false;
let listenersAttached = false;

// Overlay elements
let hoverOverlay: HTMLDivElement | null = null;
let selectionOverlay: HTMLDivElement | null = null;
let selectionLabel: HTMLDivElement | null = null;
let marqueeBox: HTMLDivElement | null = null;

// Interaction state machine
type InteractionMode = "idle" | "pending" | "marquee" | "drag";
let mode: InteractionMode = "idle";
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownElement: HTMLElement | null = null;

// Drag callbacks — set by drag.ts via setDragCallbacks
let onDragStartCallback: ((e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void) | null = null;
let onDragMoveCallback: ((e: MouseEvent) => void) | null = null;
let onDragEndCallback: ((e: MouseEvent) => void) | null = null;

const OVERLAY_STYLES = `
  .hover-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #42a5f5;
    background: rgba(66, 165, 245, 0.08);
    z-index: 2147483646;
    transition: all 0.05s ease-out;
    display: none;
  }
  .selection-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #1e88e5;
    background: rgba(30, 136, 229, 0.05);
    z-index: 2147483646;
    display: none;
  }
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: #1e88e5;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 2147483646;
    font-family: -apple-system, BlinkMacSystemFont, monospace;
    white-space: nowrap;
    display: none;
  }
  .marquee-box {
    position: fixed;
    border: 1px dashed #42a5f5;
    background: rgba(66, 165, 245, 0.1);
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;

export function setDragCallbacks(callbacks: {
  onStart: (e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void;
  onMove: (e: MouseEvent) => void;
  onEnd: (e: MouseEvent) => void;
}): void {
  onDragStartCallback = callbacks.onStart;
  onDragMoveCallback = callbacks.onMove;
  onDragEndCallback = callbacks.onEnd;
}

export function initSelection(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = OVERLAY_STYLES;
  shadowRoot.appendChild(style);

  hoverOverlay = document.createElement("div");
  hoverOverlay.className = "hover-overlay";
  shadowRoot.appendChild(hoverOverlay);

  selectionOverlay = document.createElement("div");
  selectionOverlay.className = "selection-overlay";
  shadowRoot.appendChild(selectionOverlay);

  selectionLabel = document.createElement("div");
  selectionLabel.className = "selection-label";
  shadowRoot.appendChild(selectionLabel);

  marqueeBox = document.createElement("div");
  marqueeBox.className = "marquee-box";
  shadowRoot.appendChild(marqueeBox);

  isActive = true;

  // Single set of event listeners — selection.ts owns all mouse dispatch
  document.addEventListener("mousedown", handleMouseDown, true);
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("mouseup", handleMouseUp, true);
  document.addEventListener("keydown", handleKeyDown, true);
  listenersAttached = true;
}

function handleMouseDown(e: MouseEvent): void {
  if (!isActive) return;
  e.preventDefault();
  e.stopPropagation();

  const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (!el || el.closest("#sketch-ui-root")) return;

  mouseDownPos = { x: e.clientX, y: e.clientY };
  mouseDownElement = el;

  // Decide: if clicking on the currently selected element → drag mode
  // Otherwise → selection/marquee mode
  if (currentSelection && selectedElement && selectedElement.contains(el)) {
    mode = "drag";
    // Notify drag system immediately so it can set up preview
    if (onDragStartCallback) {
      onDragStartCallback(e, selectedElement, currentSelection);
    }
  } else {
    mode = "pending"; // Will become "marquee" if dragged > 10px, or "click" on mouseup
  }
}

function handleMouseMove(e: MouseEvent): void {
  if (!isActive) return;

  if (mode === "drag") {
    // Delegate to drag system
    if (onDragMoveCallback) onDragMoveCallback(e);
    return;
  }

  if (mode === "pending" && mouseDownPos) {
    const dx = Math.abs(e.clientX - mouseDownPos.x);
    const dy = Math.abs(e.clientY - mouseDownPos.y);
    if (dx > 10 || dy > 10) {
      mode = "marquee";
    }
  }

  if (mode === "marquee" && mouseDownPos && marqueeBox) {
    const x = Math.min(e.clientX, mouseDownPos.x);
    const y = Math.min(e.clientY, mouseDownPos.y);
    const w = Math.abs(e.clientX - mouseDownPos.x);
    const h = Math.abs(e.clientY - mouseDownPos.y);
    marqueeBox.style.display = "block";
    marqueeBox.style.left = `${x}px`;
    marqueeBox.style.top = `${y}px`;
    marqueeBox.style.width = `${w}px`;
    marqueeBox.style.height = `${h}px`;
    return;
  }

  // Hover highlight (only when idle — no mouse button down)
  if (mode === "idle") {
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root")) {
      hideHoverOverlay();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (hoverOverlay) {
      hoverOverlay.style.display = "block";
      hoverOverlay.style.left = `${rect.left}px`;
      hoverOverlay.style.top = `${rect.top}px`;
      hoverOverlay.style.width = `${rect.width}px`;
      hoverOverlay.style.height = `${rect.height}px`;
    }
  }
}

function handleMouseUp(e: MouseEvent): void {
  if (!isActive) return;

  const prevMode = mode;
  mode = "idle";

  if (prevMode === "drag") {
    if (onDragEndCallback) onDragEndCallback(e);
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  if (prevMode === "marquee" && mouseDownPos) {
    if (marqueeBox) marqueeBox.style.display = "none";
    performMarqueeSelect(
      Math.min(e.clientX, mouseDownPos.x),
      Math.min(e.clientY, mouseDownPos.y),
      Math.max(e.clientX, mouseDownPos.x),
      Math.max(e.clientY, mouseDownPos.y)
    );
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  // prevMode was "pending" — treat as a click (small movement)
  if (mouseDownElement) {
    selectElement(mouseDownElement);
  }
  mouseDownPos = null;
  mouseDownElement = null;
}

async function selectElement(el: HTMLElement): Promise<void> {
  try {
    const resolved = await resolveComponentFromElement(el);
    console.log("[SketchUI] selectElement:", el.tagName, "→", resolved?.componentName, resolved?.filePath, "stack:", resolved?.stack?.map(s => s.componentName));
    if (!resolved) return;

    selectedElement = el;
    currentSelection = {
      tagName: resolved.tagName,
      componentName: resolved.componentName,
      filePath: resolved.filePath,
      lineNumber: resolved.lineNumber,
      columnNumber: resolved.columnNumber,
      stack: resolved.stack,
      boundingRect: {
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
      },
    };

    showSelectionOverlay(el.getBoundingClientRect(), currentSelection);
    hideHoverOverlay();

    // Show element + component: "<a> in <Navbar /> — src/components/Navbar.tsx:7"
    const tagPart = `<${resolved.tagName}>`;
    const compPart = `<${resolved.componentName} />`;
    const locPart = resolved.filePath ? ` — ${resolved.filePath}:${resolved.lineNumber}` : "";
    const display = resolved.tagName === resolved.componentName.toLowerCase()
      ? `${compPart}${locPart}`
      : `${tagPart} in ${compPart}${locPart}`;
    updateComponentInfo(display);

    // Notify listeners (e.g., Move tool's pending-select flow)
    if (onSelectCallback) onSelectCallback();
  } catch (err) {
    console.error("[SketchUI] selectElement error:", err);
  }
}

function performMarqueeSelect(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  const elements: HTMLElement[] = [];
  const allElements = document.querySelectorAll("*");

  for (const el of allElements) {
    if (el.closest("#sketch-ui-root")) continue;
    const rect = el.getBoundingClientRect();
    if (
      rect.left < x2 &&
      rect.right > x1 &&
      rect.top < y2 &&
      rect.bottom > y1 &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      elements.push(el as HTMLElement);
    }
  }

  if (elements.length === 0) return;

  // Use sync resolve for marquee (fast path)
  const stacks: Array<ComponentInfo["stack"]> = [];
  for (const el of elements.slice(0, 50)) {
    const resolved = resolveComponentSync(el);
    if (resolved?.stack?.length) {
      stacks.push(resolved.stack);
    }
  }

  if (stacks.length === 0) return;

  const lca = findLowestCommonAncestor(stacks);
  if (!lca) return;

  for (const el of elements) {
    const resolved = resolveComponentSync(el);
    if (
      resolved &&
      resolved.componentName === lca.componentName
    ) {
      const rect = el.getBoundingClientRect();
      selectedElement = el as HTMLElement;
      currentSelection = {
        tagName: el.tagName.toLowerCase(),
        componentName: lca.componentName,
        filePath: lca.filePath,
        lineNumber: lca.lineNumber,
        columnNumber: lca.columnNumber,
        stack: resolved.stack,
        boundingRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
      };

      showSelectionOverlay(rect, currentSelection);
      updateComponentInfo(
        `<${lca.componentName} /> — ${lca.filePath}:${lca.lineNumber}`
      );
      return;
    }
  }
}

function findLowestCommonAncestor(
  stacks: Array<ComponentInfo["stack"]>
): ComponentInfo["stack"][0] | null {
  if (stacks.length === 0) return null;
  if (stacks.length === 1) return stacks[0][0];

  const firstStack = stacks[0];
  let lastCommon: ComponentInfo["stack"][0] | null = null;

  for (let depth = 0; depth < firstStack.length; depth++) {
    const candidate = firstStack[depth];
    const allMatch = stacks.every(
      (stack) =>
        stack[depth] &&
        stack[depth].filePath === candidate.filePath &&
        stack[depth].lineNumber === candidate.lineNumber
    );
    if (allMatch) {
      lastCommon = candidate;
    } else {
      break;
    }
  }

  return lastCommon;
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!isActive) return;

  if (e.key === "Escape" && currentSelection) {
    // Deselect (hierarchy navigation deferred — see spec notes)
    clearSelection();
    e.preventDefault();
  }
}

function showSelectionOverlay(rect: DOMRect, info: ComponentInfo): void {
  if (selectionOverlay) {
    selectionOverlay.style.display = "block";
    selectionOverlay.style.left = `${rect.left}px`;
    selectionOverlay.style.top = `${rect.top}px`;
    selectionOverlay.style.width = `${rect.width}px`;
    selectionOverlay.style.height = `${rect.height}px`;
  }

  if (selectionLabel) {
    selectionLabel.style.display = "block";
    selectionLabel.style.left = `${rect.left}px`;
    selectionLabel.style.top = `${rect.top - 20}px`;
    selectionLabel.textContent = `<${info.componentName} />`;
  }
}

function hideHoverOverlay(): void {
  if (hoverOverlay) hoverOverlay.style.display = "none";
}

export function clearSelection(): void {
  currentSelection = null;
  selectedElement = null;
  if (selectionOverlay) selectionOverlay.style.display = "none";
  if (selectionLabel) selectionLabel.style.display = "none";
  updateComponentInfo("No selection");
}

export function getSelection(): ComponentInfo | null {
  return currentSelection;
}

export function deactivateSelection(): void {
  isActive = false;
  document.removeEventListener("mousedown", handleMouseDown, true);
  document.removeEventListener("mousemove", handleMouseMove, true);
  document.removeEventListener("mouseup", handleMouseUp, true);
  document.removeEventListener("keydown", handleKeyDown, true);
  listenersAttached = false;
}

/**
 * Enable/disable Phase 1 selection handlers.
 * setEnabled(false) removes capture-phase listeners so the interaction layer can receive events.
 * setEnabled(true) re-attaches them for Pointer mode.
 * Different from deactivateSelection() which is a permanent teardown.
 */
export function setEnabled(enabled: boolean): void {
  if (enabled && !listenersAttached) {
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("keydown", handleKeyDown, true);
    listenersAttached = true;
    isActive = true;
  } else if (!enabled && listenersAttached) {
    document.removeEventListener("mousedown", handleMouseDown, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("keydown", handleKeyDown, true);
    listenersAttached = false;
    isActive = false;
  }
}

export function getSelectedElement(): HTMLElement | null {
  return selectedElement ?? null;
}

// --- Hover highlight helpers (used by Move tool) ---

export function showHoverHighlightAt(clientX: number, clientY: number): void {
  const el = document.elementFromPoint(clientX, clientY) as HTMLElement;
  if (!el || el.closest("#sketch-ui-root") || el.hasAttribute("data-sketch-ui-ghost") || el.hasAttribute("data-sketch-ui-interaction")) {
    hideHoverHighlightExport();
    return;
  }
  const rect = el.getBoundingClientRect();
  if (hoverOverlay) {
    hoverOverlay.style.display = "block";
    hoverOverlay.style.left = `${rect.left}px`;
    hoverOverlay.style.top = `${rect.top}px`;
    hoverOverlay.style.width = `${rect.width}px`;
    hoverOverlay.style.height = `${rect.height}px`;
  }
}

export function hideHoverHighlightExport(): void {
  hideHoverOverlay();
}

// --- Selection callback (used by Move tool's pending-select flow) ---

let onSelectCallback: (() => void) | null = null;

export function setOnSelectCallback(fn: (() => void) | null): void {
  onSelectCallback = fn;
}

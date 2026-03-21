# React-Grab Pattern Adoption — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port react-grab's proven element detection, validation, and rendering patterns into SketchUI's overlay package where functionality overlaps.

**Architecture:** Four focused changes: (1) cached element detection with distance threshold + TTL, (2) robust element validation (visibility + overlay filtering), (3) canvas-based highlight rendering with LERP interpolation, (4) coverage-based lasso/marquee selection. Each change is self-contained and testable independently.

**Tech Stack:** TypeScript, Canvas 2D API, requestAnimationFrame, WeakMap caching

---

### Task 1: Element Detection Caching (Smart `getPageElementAtPoint`)

Port react-grab's `get-element-at-position.ts` caching pattern into SketchUI's existing `getPageElementAtPoint()`.

**Files:**
- Create: `packages/overlay/src/utils/element-cache.ts`
- Modify: `packages/overlay/src/interaction.ts:82-93`

- [ ] **Step 1: Create element-cache.ts with cache + distance threshold logic**

```typescript
// packages/overlay/src/utils/element-cache.ts

/** Constants from react-grab — proven production values */
export const ELEMENT_CACHE_DISTANCE_THRESHOLD_PX = 2;
export const ELEMENT_CACHE_THROTTLE_MS = 16;

interface PositionCache {
  clientX: number;
  clientY: number;
  element: HTMLElement | null;
  timestamp: number;
}

let cache: PositionCache | null = null;

export function getCachedElement(clientX: number, clientY: number): HTMLElement | null | undefined {
  if (!cache) return undefined; // cache miss

  const now = performance.now();
  const dx = Math.abs(clientX - cache.clientX);
  const dy = Math.abs(clientY - cache.clientY);
  const isPositionClose = dx <= ELEMENT_CACHE_DISTANCE_THRESHOLD_PX && dy <= ELEMENT_CACHE_DISTANCE_THRESHOLD_PX;
  const isWithinThrottle = now - cache.timestamp < ELEMENT_CACHE_THROTTLE_MS;

  if (isPositionClose || isWithinThrottle) {
    return cache.element; // cache hit
  }

  return undefined; // cache miss (stale)
}

export function setCachedElement(clientX: number, clientY: number, element: HTMLElement | null): void {
  cache = { clientX, clientY, element, timestamp: performance.now() };
}

export function clearElementCache(): void {
  cache = null;
}
```

- [ ] **Step 2: Update getPageElementAtPoint to use cache**

In `packages/overlay/src/interaction.ts`, update the `getPageElementAtPoint` function:

```typescript
import { getCachedElement, setCachedElement } from "./utils/element-cache.js";

export function getPageElementAtPoint(clientX: number, clientY: number): HTMLElement | null {
  // Check cache first — avoids expensive elementsFromPoint on small mouse movements
  const cached = getCachedElement(clientX, clientY);
  if (cached !== undefined) return cached;

  const elements = document.elementsFromPoint(clientX, clientY);
  let result: HTMLElement | null = null;

  for (const el of elements) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.closest("#sketch-ui-root")) continue;
    if (el.hasAttribute("data-sketch-ui-interaction")) continue;
    if (el.hasAttribute("data-sketch-ui-ghost")) continue;
    if (el === document.body || el === document.documentElement) continue;
    result = el;
    break;
  }

  setCachedElement(clientX, clientY, result);
  return result;
}
```

- [ ] **Step 3: Add scroll listener to invalidate cache**

In `packages/overlay/src/interaction.ts`, inside `initInteraction()`, add:
```typescript
import { clearElementCache } from "./utils/element-cache.js";

// Inside initInteraction(), after creating interactionEl:
document.addEventListener("scroll", clearElementCache, true);
```

And in `destroyInteraction()`:
```typescript
document.removeEventListener("scroll", clearElementCache, true);
```

- [ ] **Step 4: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/utils/element-cache.ts packages/overlay/src/interaction.ts
git commit -m "feat(overlay): add element detection caching from react-grab pattern"
```

---

### Task 2: Robust Element Validation

Port react-grab's `is-valid-grabbable-element.ts` + `is-element-visible.ts` patterns to improve SketchUI's element filtering. Add visibility checks, dev-tool overlay detection, and full-viewport overlay filtering with a cached validation path.

**Files:**
- Modify: `packages/overlay/src/utils/component-filter.ts`

- [ ] **Step 1: Add visibility and overlay validation to component-filter.ts**

Add these functions to `packages/overlay/src/utils/component-filter.ts`:

```typescript
// --- Visibility cache (from react-grab pattern, avoids redundant getComputedStyle) ---
const VISIBILITY_CACHE_TTL_MS = 50;
const VIEWPORT_COVERAGE_THRESHOLD = 0.9;
const DEV_TOOLS_Z_INDEX_THRESHOLD = 2147483600;
const OVERLAY_Z_INDEX_THRESHOLD = 1000;

interface VisibilityEntry {
  isValid: boolean;
  timestamp: number;
}

let visibilityCache = new WeakMap<Element, VisibilityEntry>();

export function clearVisibilityCache(): void {
  visibilityCache = new WeakMap();
}

/** Check if an element is visible (not display:none, visibility:hidden, or opacity:0) */
function isElementVisible(el: Element, style: CSSStyleDeclaration): boolean {
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

/** Detect dev tool overlays like react-scan that cover the viewport with pointer-events:none */
function isDevToolsOverlay(style: CSSStyleDeclaration): boolean {
  const z = parseInt(style.zIndex, 10);
  return style.pointerEvents === "none" && style.position === "fixed" && !isNaN(z) && z >= DEV_TOOLS_Z_INDEX_THRESHOLD;
}

/** Detect transparent/high-z full-viewport overlays */
function isFullViewportOverlay(el: Element, style: CSSStyleDeclaration): boolean {
  const pos = style.position;
  if (pos !== "fixed" && pos !== "absolute") return false;

  const rect = el.getBoundingClientRect();
  if (rect.width / window.innerWidth < VIEWPORT_COVERAGE_THRESHOLD || rect.height / window.innerHeight < VIEWPORT_COVERAGE_THRESHOLD) return false;

  const bg = style.backgroundColor;
  if (bg === "transparent" || bg === "rgba(0, 0, 0, 0)" || parseFloat(style.opacity) < 0.1) return true;

  const z = parseInt(style.zIndex, 10);
  return !isNaN(z) && z > OVERLAY_Z_INDEX_THRESHOLD;
}

/**
 * Validates whether an element is a valid selection/hover target.
 * Ported from react-grab's isValidGrabbableElement with adaptations for SketchUI.
 * Filters out: root elements, SketchUI elements, invisible elements, dev tool overlays, viewport overlays.
 */
export function isValidElement(el: Element): boolean {
  // Fast path: root elements
  const tag = el instanceof HTMLElement ? el.tagName.toLowerCase() : "";
  if (tag === "html" || tag === "body") return false;

  // SketchUI's own elements
  if (el.closest("#sketch-ui-root")) return false;
  if (el instanceof HTMLElement && el.hasAttribute("data-sketch-ui-interaction")) return false;
  if (el instanceof HTMLElement && el.hasAttribute("data-sketch-ui-ghost")) return false;

  // Visibility cache
  const now = performance.now();
  const cached = visibilityCache.get(el);
  if (cached && now - cached.timestamp < VISIBILITY_CACHE_TTL_MS) {
    return cached.isValid;
  }

  const style = window.getComputedStyle(el);

  if (!isElementVisible(el, style)) {
    visibilityCache.set(el, { isValid: false, timestamp: now });
    return false;
  }

  // Only check overlay heuristics for large elements
  const coversViewport = el.clientWidth / window.innerWidth >= VIEWPORT_COVERAGE_THRESHOLD
    && el.clientHeight / window.innerHeight >= VIEWPORT_COVERAGE_THRESHOLD;

  if (coversViewport) {
    if (isDevToolsOverlay(style) || isFullViewportOverlay(el, style)) {
      visibilityCache.set(el, { isValid: false, timestamp: now });
      return false;
    }
  }

  visibilityCache.set(el, { isValid: true, timestamp: now });
  return true;
}
```

- [ ] **Step 2: Keep isFullPageElement unchanged**

`isFullPageElement` and `isValidElement` serve different purposes — keep both independent. `isFullPageElement` is a "is this a page wrapper?" check. `isValidElement` is a comprehensive "can this be selected/hovered?" check. Do NOT delegate one to the other.

- [ ] **Step 3: Update selection.ts hover to use isValidElement**

In `packages/overlay/src/selection.ts`, update the import and hover check:

Change import:
```typescript
import { isInternalName, isFullPageElement, isValidElement } from "./utils/component-filter.js";
```

Change `handleMouseDown` (line ~279-280):
```typescript
const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
if (!el || !isValidElement(el)) return;
```

Change hover in `handleMouseMove` (line ~339-341):
```typescript
const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
if (!el || !isValidElement(el)) {
```

- [ ] **Step 4: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/utils/component-filter.ts packages/overlay/src/selection.ts
git commit -m "feat(overlay): add robust element validation from react-grab pattern"
```

---

### Task 3: Canvas-Based Highlight Rendering with LERP

Replace DOM-based hover/selection overlays with a `<canvas>` element and LERP interpolation. This is the biggest visual upgrade — smooth animated transitions between hover targets instead of choppy DOM repositioning.

**Files:**
- Create: `packages/overlay/src/utils/lerp.ts`
- Create: `packages/overlay/src/highlight-canvas.ts`
- Modify: `packages/overlay/src/selection.ts` (remove DOM overlays, use canvas)
- Modify: `packages/overlay/src/index.ts` (init canvas)

- [ ] **Step 1: Create lerp utility**

```typescript
// packages/overlay/src/utils/lerp.ts
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
```

- [ ] **Step 2: Create highlight-canvas.ts**

This is SketchUI's adaptation of react-grab's `overlay-canvas.tsx` — pure TypeScript (no Solid.js), manages hover and selection highlight layers with LERP-based animation.

```typescript
// packages/overlay/src/highlight-canvas.ts
import { getShadowRoot } from "./toolbar.js";
import { lerp } from "./utils/lerp.js";
import { COLORS } from "./design-tokens.js";

// --- Constants (from react-grab, adapted) ---
const HOVER_LERP_FACTOR = 0.35;
const SELECTION_LERP_FACTOR = 0.3;
const LERP_CONVERGENCE_THRESHOLD = 0.5;
const MIN_DPR = 2;

interface AnimatedRect {
  current: { x: number; y: number; w: number; h: number };
  target: { x: number; y: number; w: number; h: number };
  borderRadius: number;
  opacity: number;
  targetOpacity: number;
  initialized: boolean;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let canvasW = 0;
let canvasH = 0;
let dpr = 1;
let rafId: number | null = null;

let hoverAnim: AnimatedRect | null = null;
let selectionAnim: AnimatedRect | null = null;

// ─── Colors ──────────────────────────────────────────────
// Parse COLORS.accent (#a259ff) for canvas fill/stroke
const ACCENT = COLORS.accent;
const ACCENT_SOFT = "rgba(162,89,255,0.08)";
const ACCENT_MEDIUM = "rgba(162,89,255,0.15)";

// ─── Public API ──────────────────────────────────────────

export function initHighlightCanvas(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  canvas = document.createElement("canvas");
  canvas.setAttribute("data-sketch-ui-ghost", "true");
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `;
  shadowRoot.appendChild(canvas);

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

export function setHoverTarget(rect: DOMRect | null, borderRadius: number = 4): void {
  if (!rect) {
    if (hoverAnim) {
      hoverAnim.targetOpacity = 0;
      scheduleFrame();
    }
    return;
  }

  const target = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

  if (!hoverAnim || !hoverAnim.initialized) {
    hoverAnim = createAnim(target, borderRadius);
  } else {
    hoverAnim.target = target;
    hoverAnim.borderRadius = borderRadius;
    hoverAnim.targetOpacity = 1;
  }
  scheduleFrame();
}

export function setSelectionTarget(rect: DOMRect | null, borderRadius: number = 4): void {
  if (!rect) {
    if (selectionAnim) {
      selectionAnim.targetOpacity = 0;
      scheduleFrame();
    }
    return;
  }

  const target = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

  if (!selectionAnim || !selectionAnim.initialized) {
    selectionAnim = createAnim(target, borderRadius);
  } else {
    selectionAnim.target = target;
    selectionAnim.borderRadius = borderRadius;
    selectionAnim.targetOpacity = 1;
  }
  scheduleFrame();
}

export function clearHighlights(): void {
  hoverAnim = null;
  selectionAnim = null;
  scheduleFrame();
}

export function destroyHighlightCanvas(): void {
  if (rafId !== null) cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resizeCanvas);
  canvas?.remove();
  canvas = null;
  ctx = null;
  hoverAnim = null;
  selectionAnim = null;
}

// ─── Internal ────────────────────────────────────────────

function createAnim(target: { x: number; y: number; w: number; h: number }, borderRadius: number): AnimatedRect {
  return {
    current: { ...target },
    target: { ...target },
    borderRadius,
    opacity: 1,
    targetOpacity: 1,
    initialized: true,
  };
}

function resizeCanvas(): void {
  if (!canvas) return;
  dpr = Math.max(window.devicePixelRatio || 1, MIN_DPR);
  canvasW = window.innerWidth;
  canvasH = window.innerHeight;
  canvas.width = canvasW * dpr;
  canvas.height = canvasH * dpr;
  canvas.style.width = `${canvasW}px`;
  canvas.style.height = `${canvasH}px`;
  ctx = canvas.getContext("2d");
  // Don't ctx.scale here — tick() uses setTransform to reset each frame
  scheduleFrame();
}

function scheduleFrame(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(tick);
}

function tick(): void {
  rafId = null;
  if (!ctx || !canvas) return;

  let needsMore = false;

  // Interpolate hover
  if (hoverAnim?.initialized) {
    if (interpolate(hoverAnim, HOVER_LERP_FACTOR)) needsMore = true;
    // Remove if faded out
    if (hoverAnim.opacity < 0.01 && hoverAnim.targetOpacity === 0) hoverAnim = null;
  }

  // Interpolate selection
  if (selectionAnim?.initialized) {
    if (interpolate(selectionAnim, SELECTION_LERP_FACTOR)) needsMore = true;
    if (selectionAnim.opacity < 0.01 && selectionAnim.targetOpacity === 0) selectionAnim = null;
  }

  // Clear and draw
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (hoverAnim) drawRect(ctx, hoverAnim, ACCENT, ACCENT_SOFT);
  if (selectionAnim) drawRect(ctx, selectionAnim, ACCENT, ACCENT_MEDIUM);

  if (needsMore) rafId = requestAnimationFrame(tick);
}

function interpolate(anim: AnimatedRect, factor: number): boolean {
  const c = anim.current;
  const t = anim.target;

  const nx = lerp(c.x, t.x, factor);
  const ny = lerp(c.y, t.y, factor);
  const nw = lerp(c.w, t.w, factor);
  const nh = lerp(c.h, t.h, factor);
  const no = lerp(anim.opacity, anim.targetOpacity, factor);

  const converged =
    Math.abs(nx - t.x) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(ny - t.y) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(nw - t.w) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(nh - t.h) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(no - anim.targetOpacity) < 0.01;

  if (converged) {
    c.x = t.x; c.y = t.y; c.w = t.w; c.h = t.h;
    anim.opacity = anim.targetOpacity;
    return false;
  }

  c.x = nx; c.y = ny; c.w = nw; c.h = nh;
  anim.opacity = no;
  return true; // still animating
}

function drawRect(
  c: CanvasRenderingContext2D,
  anim: AnimatedRect,
  strokeColor: string,
  fillColor: string,
): void {
  const { x, y, w, h } = anim.current;
  if (w <= 0 || h <= 0) return;

  const r = Math.min(anim.borderRadius, w / 2, h / 2);
  c.globalAlpha = anim.opacity;

  c.beginPath();
  if (r > 0) {
    c.roundRect(x, y, w, h, r);
  } else {
    c.rect(x, y, w, h);
  }

  c.fillStyle = fillColor;
  c.fill();
  c.strokeStyle = strokeColor;
  c.lineWidth = 1.5;
  c.stroke();

  c.globalAlpha = 1;
}
```

- [ ] **Step 3: Update selection.ts to use canvas instead of DOM overlays**

Remove the hover-overlay and selection-overlay DOM elements. Replace with calls to `highlight-canvas.ts`.

In `selection.ts`:

Import:
```typescript
import { setHoverTarget, setSelectionTarget, clearHighlights } from "./highlight-canvas.js";
```

Remove from OVERLAY_STYLES: `.hover-overlay { ... }` and `.selection-overlay { ... }` CSS blocks.

Remove from `initSelection()`: creation of `hoverOverlay` and `selectionOverlay` elements.

Replace `handleMouseMove` hover section (the `mode === "idle"` block):
```typescript
if (mode === "idle") {
  const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (!el || !isValidElement(el)) {
    setHoverTarget(null);
    return;
  }
  const rect = el.getBoundingClientRect();
  const br = parseFloat(getComputedStyle(el).borderRadius) || 4;
  setHoverTarget(rect, br + 2);
}
```

Replace `showSelectionOverlay` entirely:
```typescript
function showSelectionOverlay(rect: DOMRect, _info: any): void {
  if (selectedElement) {
    const br = parseFloat(getComputedStyle(selectedElement).borderRadius) || 4;
    setSelectionTarget(rect, br + 2);
  }

  if (selectionLabel) {
    const labelHeight = 28;
    const gap = 8;
    let top = rect.top - labelHeight - gap;
    let left = rect.left;

    if (top < 0) {
      top = rect.bottom + gap;
    }

    selectionLabel.style.left = `${left}px`;
    selectionLabel.style.top = `${top}px`;
    selectionLabel.style.display = "block";
    selectionLabel.style.right = "auto";

    selectionLabel.innerHTML = `<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>`;
    requestAnimationFrame(() => selectionLabel?.classList.add("visible"));

    requestAnimationFrame(() => {
      if (!selectionLabel) return;
      const labelRect = selectionLabel.getBoundingClientRect();
      if (labelRect.right > window.innerWidth - 8) {
        selectionLabel.style.left = "auto";
        selectionLabel.style.right = "8px";
      }
    });
  }
}
```

Replace `hideHoverOverlay()`:
```typescript
function hideHoverOverlay(): void {
  setHoverTarget(null);
}
```

Replace in `clearSelection()`:
```typescript
export function clearSelection(): void {
  currentSelection = null;
  selectedElement = null;
  setSelectionTarget(null);
  if (selectionLabel) {
    selectionLabel.classList.remove("visible");
    selectionLabel.style.display = "none";
  }
  updateComponentDetail(null);
}
```

Remove the `hoverOverlay` and `selectionOverlay` variables and all direct style manipulation of them.

- [ ] **Step 4: Initialize canvas in index.ts**

In `packages/overlay/src/index.ts`, add:
```typescript
import { initHighlightCanvas, destroyHighlightCanvas } from "./highlight-canvas.js";
```

Call `initHighlightCanvas()` after `initSelection()` in the init function.
Call `destroyHighlightCanvas()` in the `close()` function.

- [ ] **Step 5: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 6: Manual test**

Run the test app and verify:
- Hover highlights smoothly animate between elements (LERP interpolation)
- Selection overlay smoothly transitions
- No DOM overlays remaining (check Shadow DOM)
- Canvas element visible in DevTools

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/utils/lerp.ts packages/overlay/src/highlight-canvas.ts packages/overlay/src/selection.ts packages/overlay/src/index.ts
git commit -m "feat(overlay): canvas-based LERP highlight rendering from react-grab pattern"
```

---

### Task 4: Coverage-Based Lasso/Marquee Selection

Port react-grab's `get-elements-in-drag.ts` pattern for smarter area selection. Instead of iterating all DOM elements with bounding box intersection, use sample-point detection and a 75% coverage threshold.

**Files:**
- Create: `packages/overlay/src/utils/area-selection.ts`
- Modify: `packages/overlay/src/tools/resolve-helper.ts` (add element-based export)
- Modify: `packages/overlay/src/tools/lasso.ts`
- Modify: `packages/overlay/src/selection.ts` (marquee)

- [ ] **Step 1: Create area-selection.ts**

Port the core logic from react-grab's `get-elements-in-drag.ts`, adapted for SketchUI's element filtering:

```typescript
// packages/overlay/src/utils/area-selection.ts
import { isValidElement } from "./component-filter.js";

// Constants from react-grab
const COVERAGE_THRESHOLD = 0.75;
const SAMPLE_SPACING_PX = 32;
const MIN_SAMPLES_PER_AXIS = 3;
const MAX_SAMPLES_PER_AXIS = 20;
const MAX_TOTAL_SAMPLES = 100;
const EDGE_INSET_PX = 1;

interface DragRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function createSamplePoints(rect: DragRect): Array<{ x: number; y: number }> {
  if (rect.width <= 0 || rect.height <= 0) return [];

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { x: left, y: top } = rect;
  const right = left + rect.width;
  const bottom = top + rect.height;
  const cx = left + rect.width / 2;
  const cy = top + rect.height / 2;

  let xCount = clamp(Math.ceil(rect.width / SAMPLE_SPACING_PX), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
  let yCount = clamp(Math.ceil(rect.height / SAMPLE_SPACING_PX), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);

  if (xCount * yCount > MAX_TOTAL_SAMPLES) {
    const scale = Math.sqrt(MAX_TOTAL_SAMPLES / (xCount * yCount));
    xCount = clamp(Math.floor(xCount * scale), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
    yCount = clamp(Math.floor(yCount * scale), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
  }

  const keys = new Set<string>();
  const points: Array<{ x: number; y: number }> = [];

  const add = (x: number, y: number) => {
    const cx = clamp(Math.round(x), 0, vw - 1);
    const cy = clamp(Math.round(y), 0, vh - 1);
    const key = `${cx}:${cy}`;
    if (!keys.has(key)) { keys.add(key); points.push({ x: cx, y: cy }); }
  };

  // Edge and center points
  add(left + EDGE_INSET_PX, top + EDGE_INSET_PX);
  add(right - EDGE_INSET_PX, top + EDGE_INSET_PX);
  add(left + EDGE_INSET_PX, bottom - EDGE_INSET_PX);
  add(right - EDGE_INSET_PX, bottom - EDGE_INSET_PX);
  add(cx, top + EDGE_INSET_PX);
  add(cx, bottom - EDGE_INSET_PX);
  add(left + EDGE_INSET_PX, cy);
  add(right - EDGE_INSET_PX, cy);
  add(cx, cy);

  // Grid
  for (let xi = 0; xi < xCount; xi++) {
    const sx = left + ((xi + 0.5) / xCount) * rect.width;
    for (let yi = 0; yi < yCount; yi++) {
      add(sx, top + ((yi + 0.5) / yCount) * rect.height);
    }
  }

  return points;
}

/**
 * Find all valid elements within a drag/lasso rectangle.
 * Uses sample-point detection and coverage threshold from react-grab.
 * Returns elements sorted in document order with nested elements removed.
 */
export function getElementsInArea(
  rect: DragRect,
  validator: (el: Element) => boolean = isValidElement,
  useCoverage: boolean = true,
): HTMLElement[] {
  const dragBounds = {
    left: rect.x, top: rect.y,
    right: rect.x + rect.width, bottom: rect.y + rect.height,
  };

  const candidates = new Set<Element>();
  const samples = createSamplePoints(rect);

  for (const pt of samples) {
    for (const el of document.elementsFromPoint(pt.x, pt.y)) {
      candidates.add(el);
    }
  }

  const matches: Element[] = [];

  for (const el of candidates) {
    if (!validator(el)) continue;

    const elRect = el.getBoundingClientRect();
    if (elRect.width <= 0 || elRect.height <= 0) continue;

    const elBounds = {
      left: elRect.left, top: elRect.top,
      right: elRect.left + elRect.width, bottom: elRect.top + elRect.height,
    };

    if (useCoverage) {
      // Calculate intersection area / element area
      const iLeft = Math.max(dragBounds.left, elBounds.left);
      const iTop = Math.max(dragBounds.top, elBounds.top);
      const iRight = Math.min(dragBounds.right, elBounds.right);
      const iBottom = Math.min(dragBounds.bottom, elBounds.bottom);
      const iArea = Math.max(0, iRight - iLeft) * Math.max(0, iBottom - iTop);
      const elArea = elRect.width * elRect.height;

      if (elArea > 0 && iArea / elArea >= COVERAGE_THRESHOLD) {
        matches.push(el);
      }
    } else {
      // Simple intersection
      if (dragBounds.left < elBounds.right && dragBounds.right > elBounds.left &&
          dragBounds.top < elBounds.bottom && dragBounds.bottom > elBounds.top) {
        matches.push(el);
      }
    }
  }

  // Remove nested elements — keep only top-level
  const filtered = matches.filter(el =>
    !matches.some(other => other !== el && other.contains(el))
  );

  // Sort by document order
  filtered.sort((a, b) => {
    const pos = a.compareDocumentPosition(b);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });

  return filtered as HTMLElement[];
}
```

- [ ] **Step 2: Add resolveComponentFromElement to resolve-helper.ts**

Add a new export to `packages/overlay/src/tools/resolve-helper.ts` that resolves a component directly from an element (skipping the point lookup):

```typescript
/**
 * Resolve component from a known DOM element (no point lookup needed).
 * Used by lasso when elements are already discovered via area selection.
 */
export async function resolveComponentFromElement(el: HTMLElement): Promise<ComponentRef | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) filePath = normalized;
        }

        return {
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
        };
      }
    }
  } catch {
    // Fall through to fiber walk
  }

  let current = fiber;
  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
        const debugSource = (current as any)._debugSource || (current as any)._debugOwner?._debugSource;
        return {
          componentName: name,
          filePath: debugSource?.fileName || "",
          lineNumber: debugSource?.lineNumber || 0,
        };
      }
    }
    current = current.return;
  }
  return null;
}
```

- [ ] **Step 3: Update lasso.ts to use getElementsInArea**

Replace the manual element scanning in `lassoHandler.onMouseUp`. Note: resolve components directly from elements using `resolveComponentFromElement` rather than re-discovering them via point coordinates (avoids redundant lookups and risk of hitting a different overlapping element):

```typescript
import { getElementsInArea } from "../utils/area-selection.js";
import { resolveComponentFromElement } from "./resolve-helper.js";

// In onMouseUp:
async onMouseUp(_e: MouseEvent) {
  if (lassoPoints.length < 3) {
    cleanupLassoVisual();
    return;
  }

  const bounds = getLassoBounds();
  cleanupLassoVisual();

  const elements = getElementsInArea({
    x: bounds.left,
    y: bounds.top,
    width: bounds.right - bounds.left,
    height: bounds.bottom - bounds.top,
  });

  const seen = new Set<string>();
  const results = await Promise.all(
    elements.map(el => resolveComponentFromElement(el))
  );

  for (let i = 0; i < elements.length; i++) {
    const comp = results[i];
    const el = elements[i];
    if (comp && !seen.has(`${comp.filePath}:${comp.lineNumber}`)) {
      seen.add(`${comp.filePath}:${comp.lineNumber}`);
      selectedElements.push(el);
      showSelectionBorder(el.getBoundingClientRect());
    }
  }
},
```

- [ ] **Step 3: Update selection.ts marquee to use getElementsInArea**

Replace `performMarqueeSelect` to use sample-point detection:

```typescript
import { getElementsInArea } from "./utils/area-selection.js";

function performMarqueeSelect(x1: number, y1: number, x2: number, y2: number): void {
  const elements = getElementsInArea({
    x: x1, y: y1,
    width: x2 - x1, height: y2 - y1,
  });

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
    if (resolved && resolved.componentName === lca.componentName) {
      const rect = el.getBoundingClientRect();
      selectedElement = el;
      currentSelection = {
        tagName: el.tagName.toLowerCase(),
        componentName: lca.componentName,
        filePath: lca.filePath,
        lineNumber: lca.lineNumber,
        columnNumber: lca.columnNumber,
        stack: resolved.stack,
        boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      };
      showSelectionOverlay(rect, currentSelection);
      if (selectionLabel) {
        const pathText = lca.filePath ? `${lca.filePath}:${lca.lineNumber}` : "";
        selectionLabel.innerHTML = `<span class="comp-name">${lca.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
      }
      return;
    }
  }
}
```

- [ ] **Step 4: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/utils/area-selection.ts packages/overlay/src/tools/lasso.ts packages/overlay/src/selection.ts
git commit -m "feat(overlay): coverage-based area selection from react-grab pattern"
```

---

### Task 5: Wire Up Cache Clearing on Tool/Mode Changes

Ensure caches are cleared at the right times to prevent stale data.

**Files:**
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Clear caches on tool change and close**

In `packages/overlay/src/index.ts`, import cache clearing functions and call them when the tool changes:

```typescript
import { clearElementCache } from "./utils/element-cache.js";
import { clearVisibilityCache } from "./utils/component-filter.js";
```

In the tool change listener, add:
```typescript
clearElementCache();
clearVisibilityCache();
```

In the `close()` function, add the same calls.

- [ ] **Step 2: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/index.ts
git commit -m "feat(overlay): clear element/visibility caches on tool change"
```

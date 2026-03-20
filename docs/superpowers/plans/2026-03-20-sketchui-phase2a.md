# SketchUI Phase 2A: Visual Canvas + Tools Panel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visual manipulation layer (tools panel, ghost clones, SVG annotations, canvas undo) on top of the existing SketchUI overlay so users can freely arrange, draw on, and annotate React components without writing to source code.

**Architecture:** Three layers (ghost, annotation, interaction) sit above the live page. A left sidebar provides Figma-style tool switching. A central `canvas-state.ts` module holds all visual changes and exposes `serializeAnnotations()` for Phase 2B consumption. Phase 1's select/reorder behavior is preserved in Pointer mode via a `setEnabled()` toggle on `selection.ts`.

**Tech Stack:** TypeScript, bippy (React Fiber), SVG (annotations), DOM cloning (ghosts), tsup IIFE bundling, Shadow DOM (toolbar + sidebar)

**Spec:** `docs/superpowers/specs/2026-03-20-sketchui-phase2a-design.md`

**Testing note:** The overlay package is a browser IIFE bundle with no test harness. Verification uses `tsc --noEmit` for type safety and manual browser testing via the test-app. The RDP utility (Task 3) is pure logic and gets a vitest unit test.

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `packages/shared/src/types.ts` | Add `ComponentRef`, `ToolType`, annotation types, `CanvasUndoAction`, serialization types |
| `packages/overlay/src/canvas-state.ts` | Central state: ghosts, annotations, active tool, undo stack, serialization |
| `packages/overlay/src/annotation-layer.ts` | SVG overlay creation, rendering helpers, scroll sync |
| `packages/overlay/src/ghost-layer.ts` | Ghost clone creation, positioning, opacity management, scroll sync |
| `packages/overlay/src/tools-panel.ts` | Left sidebar rendering, tool icons, switching, sub-options |
| `packages/overlay/src/interaction.ts` | Interaction layer div, event dispatch to active tool |
| `packages/overlay/src/tools/pointer.ts` | Pointer tool (delegates to selection.ts) |
| `packages/overlay/src/tools/grab.ts` | Grab/pan tool |
| `packages/overlay/src/tools/move.ts` | Move tool (ghost creation/positioning) |
| `packages/overlay/src/tools/draw.ts` | Draw tool (SVG path recording) |
| `packages/overlay/src/tools/color.ts` | Color tool (picker, inline style override) |
| `packages/overlay/src/tools/text.ts` | Text tool (input → foreignObject) |
| `packages/overlay/src/tools/lasso.ts` | Lasso tool (freehand multi-select) |
| `packages/overlay/src/tools/resolve-helper.ts` | Component resolution helper for tool handlers |
| `packages/overlay/src/utils/rdp.ts` | Ramer-Douglas-Peucker point simplification |
| `packages/overlay/src/__tests__/rdp.test.ts` | Unit test for RDP algorithm |

### Modified Files

| File | Changes |
|------|---------|
| `packages/shared/src/types.ts` | Add new types (ComponentRef, ToolType, annotations, etc.) |
| `packages/overlay/src/selection.ts` | Add `setEnabled(boolean)` export that removes/re-attaches capture-phase listeners |
| `packages/overlay/src/toolbar.ts` | Rename Undo → "Undo Reorder", add Eye toggle + Generate button, add toast display |
| `packages/overlay/src/index.ts` | Wire up tools panel, canvas state, layers, interaction |
| `packages/overlay/package.json` | No new deps needed (all browser APIs) |

---

### Task 1: Shared Types

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add ComponentRef, ToolType, and annotation types**

Add these types after the existing `DetectionResult` interface at the end of the file:

```typescript
/** Reference to a resolved component — used across all annotation types */
export interface ComponentRef {
  componentName: string;
  filePath: string;
  lineNumber: number;
}

export type ToolType = "pointer" | "grab" | "move" | "draw" | "color" | "text" | "lasso";

export interface DrawAnnotation {
  type: "draw";
  id: string;
  points: Array<{ x: number; y: number }>;
  color: string;
  strokeWidth: number;
  targetComponent: ComponentRef | null;
}

export interface TextAnnotation {
  type: "text";
  id: string;
  position: { x: number; y: number };
  content: string;
  fontSize: number;
  color: string;
  targetComponent: ComponentRef | null;
}

export interface ColorOverride {
  type: "colorChange";
  id: string;
  component: ComponentRef;
  property: "color" | "backgroundColor";
  fromColor: string;
  toColor: string;
}

export type Annotation = DrawAnnotation | TextAnnotation | ColorOverride;

// Note: CanvasUndoAction.colorChange omits `element: HTMLElement` from the spec
// because shared types must be serializable. The overlay package defines
// ColorOverrideRuntime (in canvas-state.ts) which adds the runtime-only field.
export type CanvasUndoAction =
  | { type: "ghostCreate"; ghostId: string }
  | { type: "ghostMove"; ghostId: string; previousPos: { x: number; y: number } }
  | { type: "annotationAdd"; annotationId: string }
  | { type: "colorChange"; annotationId: string; property: string; previousColor: string };

export interface SerializedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    from: { top: number; left: number; width: number; height: number };
    to: { x: number; y: number };
  }>;
  annotations: Array<{
    type: "draw" | "text";
    startComponent?: string;
    startFile?: string;
    startLine?: number;
    targetComponent?: string;
    targetFile?: string;
    targetLine?: number;
    points?: Array<{ x: number; y: number }>;
    color?: string;
    strokeWidth?: number;
    content?: string;
    position?: { x: number; y: number };
  }>;
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
  }>;
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/shared && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add Phase 2A canvas types — ComponentRef, ToolType, annotations, undo actions"
```

---

### Task 2: Canvas State Module

**Files:**
- Create: `packages/overlay/src/canvas-state.ts`

- [ ] **Step 1: Create canvas-state.ts with state, undo stack, and serialization**

```typescript
// packages/overlay/src/canvas-state.ts
import type {
  ToolType, Annotation, DrawAnnotation, TextAnnotation, ColorOverride,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
} from "@sketch-ui/shared";

export interface GhostEntry {
  id: string;
  componentRef: ComponentRef;
  originalRect: { top: number; left: number; width: number; height: number };
  currentPos: { x: number; y: number };
  cloneEl: HTMLElement;
  originalEl: HTMLElement;
  originalOpacity: string;
  originalVisibility: string;
}

/** Runtime extension of ColorOverride — adds the DOM element reference (not serializable). */
export type ColorOverrideRuntime = ColorOverride & { targetElement: HTMLElement };

let ghosts: Map<string, GhostEntry> = new Map();
let annotations: Annotation[] = [];
let undoStack: CanvasUndoAction[] = [];
let activeTool: ToolType = "pointer";
let originalsHidden = false;

let toolOptions = {
  brushSize: 4,
  brushColor: "#ef4444",
  fontSize: 16,
  textColor: "#ffffff",
};

type ToolChangeListener = (tool: ToolType, prev: ToolType) => void;
type StateChangeListener = () => void;
let toolChangeListeners: ToolChangeListener[] = [];
let stateChangeListeners: StateChangeListener[] = [];

export function onToolChange(fn: ToolChangeListener): () => void {
  toolChangeListeners.push(fn);
  return () => { toolChangeListeners = toolChangeListeners.filter(f => f !== fn); };
}

export function onStateChange(fn: StateChangeListener): () => void {
  stateChangeListeners.push(fn);
  return () => { stateChangeListeners = stateChangeListeners.filter(f => f !== fn); };
}

function notifyStateChange(): void {
  stateChangeListeners.forEach(fn => fn());
}

// --- Tool ---

export function getActiveTool(): ToolType { return activeTool; }

export function setActiveTool(tool: ToolType): void {
  const prev = activeTool;
  if (prev === tool) return;
  activeTool = tool;
  toolChangeListeners.forEach(fn => fn(tool, prev));
}

export function getToolOptions() { return { ...toolOptions }; }

export function setToolOption<K extends keyof typeof toolOptions>(key: K, value: typeof toolOptions[K]): void {
  toolOptions[key] = value;
}

// --- Ghosts ---

export function getGhosts(): Map<string, GhostEntry> { return ghosts; }

export function addGhost(entry: GhostEntry): void {
  ghosts.set(entry.id, entry);
  undoStack.push({ type: "ghostCreate", ghostId: entry.id });
  notifyStateChange();
}

export function moveGhost(id: string, pos: { x: number; y: number }): void {
  const ghost = ghosts.get(id);
  if (!ghost) return;
  const prev = { ...ghost.currentPos };
  ghost.currentPos = pos;
  undoStack.push({ type: "ghostMove", ghostId: id, previousPos: prev });
  notifyStateChange();
}

export function removeGhost(id: string): void {
  const ghost = ghosts.get(id);
  if (!ghost) return;
  ghost.cloneEl.remove();
  ghost.originalEl.style.opacity = ghost.originalOpacity;
  ghost.originalEl.style.visibility = ghost.originalVisibility;
  ghosts.delete(id);
  notifyStateChange();
}

// --- Annotations ---

export function getAnnotations(): Annotation[] { return annotations; }

export function addAnnotation(ann: Annotation): void {
  annotations.push(ann);
  undoStack.push({ type: "annotationAdd", annotationId: ann.id });
  notifyStateChange();
}

export function removeAnnotation(id: string): void {
  annotations = annotations.filter(a => a.id !== id);
  notifyStateChange();
}

// --- Eye Toggle ---

export function getOriginalsHidden(): boolean { return originalsHidden; }

export function setOriginalsHidden(hidden: boolean): void {
  originalsHidden = hidden;
  for (const ghost of ghosts.values()) {
    if (hidden) {
      ghost.originalEl.style.opacity = "0";
      ghost.originalEl.style.visibility = "hidden";
    } else {
      ghost.originalEl.style.opacity = "0.3";
      ghost.originalEl.style.visibility = "visible";
    }
  }
  notifyStateChange();
}

// --- Undo ---

export function canvasUndo(): string | null {
  const action = undoStack.pop();
  if (!action) return null;

  switch (action.type) {
    case "ghostCreate": {
      removeGhost(action.ghostId);
      return "ghost removed";
    }
    case "ghostMove": {
      const ghost = ghosts.get(action.ghostId);
      if (ghost) {
        ghost.currentPos = action.previousPos;
        ghost.cloneEl.style.left = `${action.previousPos.x}px`;
        ghost.cloneEl.style.top = `${action.previousPos.y}px`;
      }
      return "move reverted";
    }
    case "annotationAdd": {
      removeAnnotation(action.annotationId);
      return "annotation removed";
    }
    case "colorChange": {
      const ann = annotations.find(a => a.id === action.annotationId) as ColorOverrideRuntime | undefined;
      if (ann?.targetElement) {
        (ann.targetElement.style as any)[action.property] = action.previousColor;
      }
      removeAnnotation(action.annotationId);
      return "color reverted";
    }
  }
  return null;
}

// --- Reset ---

export function resetCanvas(): void {
  for (const ghost of ghosts.values()) {
    ghost.cloneEl.remove();
    ghost.originalEl.style.opacity = ghost.originalOpacity;
    ghost.originalEl.style.visibility = ghost.originalVisibility;
  }
  // Revert color overrides
  for (const ann of annotations) {
    if (ann.type === "colorChange") {
      const co = ann as ColorOverrideRuntime;
      if (co.targetElement) {
        (co.targetElement.style as any)[co.property] = co.fromColor;
      }
    }
  }
  ghosts = new Map();
  annotations = [];
  undoStack = [];
  originalsHidden = false;
  notifyStateChange();
}

// --- Has Changes ---

export function hasChanges(): boolean {
  return ghosts.size > 0 || annotations.length > 0;
}

// --- Serialization ---

export function serializeAnnotations(): SerializedAnnotations {
  const moves: SerializedAnnotations["moves"] = [];
  for (const ghost of ghosts.values()) {
    moves.push({
      component: ghost.componentRef.componentName,
      file: ghost.componentRef.filePath,
      line: ghost.componentRef.lineNumber,
      from: ghost.originalRect,
      to: ghost.currentPos,
    });
  }

  const anns: SerializedAnnotations["annotations"] = [];
  const colorChanges: SerializedAnnotations["colorChanges"] = [];

  for (const ann of annotations) {
    if (ann.type === "draw") {
      anns.push({
        type: "draw",
        startComponent: ann.targetComponent?.componentName,
        startFile: ann.targetComponent?.filePath,
        startLine: ann.targetComponent?.lineNumber,
        points: ann.points,
        color: ann.color,
        strokeWidth: ann.strokeWidth,
      });
    } else if (ann.type === "text") {
      anns.push({
        type: "text",
        content: ann.content,
        position: ann.position,
        targetComponent: ann.targetComponent?.componentName,
        targetFile: ann.targetComponent?.filePath,
        targetLine: ann.targetComponent?.lineNumber,
      });
    } else if (ann.type === "colorChange") {
      colorChanges.push({
        component: ann.component.componentName,
        file: ann.component.filePath,
        line: ann.component.lineNumber,
        property: ann.property,
        from: ann.fromColor,
        to: ann.toColor,
      });
    }
  }

  return { moves, annotations: anns, colorChanges };
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors (tsup build won't include this file until index.ts imports it, so use tsc directly)

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/canvas-state.ts
git commit -m "feat(overlay): add canvas-state module — ghosts, annotations, undo stack, serialization"
```

---

### Task 3: RDP Point Simplification Utility

**Files:**
- Create: `packages/overlay/src/utils/rdp.ts`
- Create: `packages/overlay/src/__tests__/rdp.test.ts`

- [ ] **Step 1: Create rdp.ts**

```typescript
// packages/overlay/src/utils/rdp.ts

type Point = { x: number; y: number };

/**
 * Ramer-Douglas-Peucker algorithm for simplifying a polyline.
 * Reduces point count while preserving shape within epsilon tolerance.
 */
export function simplifyPoints(points: Point[], epsilon: number = 2): Point[] {
  if (points.length <= 2) return points;

  let maxDist = 0;
  let maxIndex = 0;
  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], start, end);
    if (dist > maxDist) {
      maxDist = dist;
      maxIndex = i;
    }
  }

  if (maxDist > epsilon) {
    const left = simplifyPoints(points.slice(0, maxIndex + 1), epsilon);
    const right = simplifyPoints(points.slice(maxIndex), epsilon);
    return [...left.slice(0, -1), ...right];
  }

  return [start, end];
}

function perpendicularDistance(point: Point, lineStart: Point, lineEnd: Point): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    const ddx = point.x - lineStart.x;
    const ddy = point.y - lineStart.y;
    return Math.sqrt(ddx * ddx + ddy * ddy);
  }

  const num = Math.abs(dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x);
  return num / Math.sqrt(lengthSq);
}
```

- [ ] **Step 2: Write unit test**

```typescript
// packages/overlay/src/__tests__/rdp.test.ts
import { describe, it, expect } from "vitest";
import { simplifyPoints } from "../utils/rdp.js";

describe("simplifyPoints (RDP)", () => {
  it("returns input unchanged for 0, 1, or 2 points", () => {
    expect(simplifyPoints([])).toEqual([]);
    expect(simplifyPoints([{ x: 0, y: 0 }])).toEqual([{ x: 0, y: 0 }]);
    expect(simplifyPoints([{ x: 0, y: 0 }, { x: 10, y: 10 }])).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ]);
  });

  it("removes collinear points", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 10, y: 0 },
    ];
    const result = simplifyPoints(points, 1);
    expect(result).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }]);
  });

  it("preserves points that deviate beyond epsilon", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 5, y: 10 },
      { x: 10, y: 0 },
    ];
    const result = simplifyPoints(points, 1);
    expect(result).toHaveLength(3);
    expect(result[1]).toEqual({ x: 5, y: 10 });
  });

  it("reduces a dense curve to key points", () => {
    // Straight line with slight noise
    const points = Array.from({ length: 100 }, (_, i) => ({
      x: i,
      y: Math.sin(i / 10) * 0.5, // tiny wobble < epsilon
    }));
    const result = simplifyPoints(points, 2);
    expect(result.length).toBeLessThan(points.length);
    expect(result[0]).toEqual(points[0]);
    expect(result[result.length - 1]).toEqual(points[points.length - 1]);
  });
});
```

- [ ] **Step 3: Create vitest config for overlay package**

Create `packages/overlay/vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["src/__tests__/**/*.test.ts"] } });
```

- [ ] **Step 4: Run test**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && npx vitest run packages/overlay/src/__tests__/rdp.test.ts`
Expected: All 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/utils/rdp.ts packages/overlay/src/__tests__/rdp.test.ts packages/overlay/vitest.config.ts
git commit -m "feat(overlay): add RDP point simplification for draw strokes"
```

---

### Task 4: Annotation Layer

**Files:**
- Create: `packages/overlay/src/annotation-layer.ts`

- [ ] **Step 1: Create annotation-layer.ts**

```typescript
// packages/overlay/src/annotation-layer.ts
import { getShadowRoot } from "./toolbar.js";

const SVG_NS = "http://www.w3.org/2000/svg";

let svgEl: SVGSVGElement | null = null;
let rootGroup: SVGGElement | null = null;

export function initAnnotationLayer(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  svgEl = document.createElementNS(SVG_NS, "svg");
  svgEl.setAttribute("style",
    "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"
  );

  rootGroup = document.createElementNS(SVG_NS, "g");
  rootGroup.setAttribute("class", "annotation-root");
  svgEl.appendChild(rootGroup);

  shadowRoot.appendChild(svgEl);

  // Scroll sync — single transform on <g> wrapper
  window.addEventListener("scroll", syncScroll, { passive: true });
  syncScroll();
}

let rafId: number | null = null;

function syncScroll(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    if (rootGroup) {
      rootGroup.setAttribute(
        "transform",
        `translate(${-window.scrollX}, ${-window.scrollY})`
      );
    }
  });
}

// --- Rendering helpers ---

export function addStrokePath(
  id: string,
  points: Array<{ x: number; y: number }>,
  color: string,
  strokeWidth: number
): SVGGElement | null {
  if (!rootGroup || points.length < 2) return null;

  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("data-annotation-id", id);

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pointsToPathD(points));
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", String(strokeWidth));
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("fill", "none");

  g.appendChild(path);
  rootGroup.appendChild(g);
  return g;
}

export function addTextAnnotation(
  id: string,
  x: number,
  y: number,
  content: string,
  fontSize: number,
  color: string
): SVGForeignObjectElement | null {
  if (!rootGroup) return null;

  const fo = document.createElementNS(SVG_NS, "foreignObject");
  fo.setAttribute("data-annotation-id", id);
  fo.setAttribute("x", String(x));
  fo.setAttribute("y", String(y));
  fo.setAttribute("width", "300");
  fo.setAttribute("height", "100");

  const div = document.createElement("div");
  div.style.cssText = `
    background: rgba(0,0,0,0.8);
    color: ${color};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: ${fontSize}px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `;
  div.textContent = content;
  fo.appendChild(div);

  rootGroup.appendChild(fo);
  return fo;
}

export function addColorBadge(
  id: string,
  x: number,
  y: number,
  color: string
): SVGCircleElement | null {
  if (!rootGroup) return null;

  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("data-annotation-id", id);
  circle.setAttribute("cx", String(x));
  circle.setAttribute("cy", String(y));
  circle.setAttribute("r", "6");
  circle.setAttribute("fill", color);
  circle.setAttribute("stroke", "white");
  circle.setAttribute("stroke-width", "1.5");

  rootGroup.appendChild(circle);
  return circle;
}

export function removeAnnotationElement(id: string): void {
  if (!rootGroup) return;
  const el = rootGroup.querySelector(`[data-annotation-id="${id}"]`);
  if (el) el.remove();
}

export function clearAnnotationLayer(): void {
  if (rootGroup) rootGroup.innerHTML = "";
}

export function destroyAnnotationLayer(): void {
  window.removeEventListener("scroll", syncScroll);
  svgEl?.remove();
  svgEl = null;
  rootGroup = null;
}

// --- SVG path helpers ---

function pointsToPathD(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L${points[i].x},${points[i].y}`;
  }
  return d;
}

/** Create a live SVG path that can have points appended during drawing */
export function createLivePath(color: string, strokeWidth: number): {
  path: SVGPathElement;
  group: SVGGElement;
  addPoint: (x: number, y: number) => void;
  getPoints: () => Array<{ x: number; y: number }>;
} | null {
  if (!rootGroup) return null;

  const points: Array<{ x: number; y: number }> = [];
  const g = document.createElementNS(SVG_NS, "g");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", String(strokeWidth));
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("fill", "none");
  g.appendChild(path);
  rootGroup.appendChild(g);

  return {
    path,
    group: g,
    addPoint(x: number, y: number) {
      points.push({ x, y });
      path.setAttribute("d", pointsToPathD(points));
    },
    getPoints() { return points; },
  };
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/annotation-layer.ts
git commit -m "feat(overlay): add annotation layer — SVG overlay with scroll sync and rendering helpers"
```

---

### Task 5: Ghost Layer

**Files:**
- Create: `packages/overlay/src/ghost-layer.ts`

- [ ] **Step 1: Create ghost-layer.ts**

```typescript
// packages/overlay/src/ghost-layer.ts
import type { ComponentRef } from "@sketch-ui/shared";
import { addGhost, removeGhost, getGhosts, getOriginalsHidden, type GhostEntry } from "./canvas-state.js";

const GHOST_Z_INDEX = "2147483644";

export function initGhostLayer(): void {
  // Scroll sync for ghosts (they're position:fixed on document.body)
  window.addEventListener("scroll", syncGhostScroll, { passive: true });
}

let ghostRafId: number | null = null;

function syncGhostScroll(): void {
  if (ghostRafId !== null) return;
  ghostRafId = requestAnimationFrame(() => {
    ghostRafId = null;
    // Ghosts store positions in page coords; convert to viewport via scroll offset
    for (const ghost of getGhosts().values()) {
      ghost.cloneEl.style.left = `${ghost.currentPos.x - window.scrollX}px`;
      ghost.cloneEl.style.top = `${ghost.currentPos.y - window.scrollY}px`;
    }
  });
}

export function createGhost(
  originalEl: HTMLElement,
  componentRef: ComponentRef,
): GhostEntry {
  const rect = originalEl.getBoundingClientRect();
  const cloneEl = originalEl.cloneNode(true) as HTMLElement;

  // Mark as ghost so SketchUI tools skip it and user JS can identify it
  cloneEl.setAttribute("data-sketch-ui-ghost", "true");
  cloneEl.style.position = "fixed";
  cloneEl.style.left = `${rect.left}px`;
  cloneEl.style.top = `${rect.top}px`;
  cloneEl.style.width = `${rect.width}px`;
  cloneEl.style.height = `${rect.height}px`;
  cloneEl.style.zIndex = GHOST_Z_INDEX;
  cloneEl.style.pointerEvents = "none";
  cloneEl.style.margin = "0";
  cloneEl.style.boxSizing = "border-box";

  document.body.appendChild(cloneEl);

  // Store original styles for restore
  const originalOpacity = originalEl.style.opacity || "";
  const originalVisibility = originalEl.style.visibility || "";

  // Dim original
  const hidden = getOriginalsHidden();
  originalEl.style.opacity = hidden ? "0" : "0.3";
  if (hidden) originalEl.style.visibility = "hidden";

  const entry: GhostEntry = {
    id: crypto.randomUUID(),
    componentRef,
    originalRect: { top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height },
    currentPos: { x: rect.left + window.scrollX, y: rect.top + window.scrollY },
    cloneEl,
    originalEl,
    originalOpacity,
    originalVisibility,
  };

  addGhost(entry);
  return entry;
}

export function updateGhostPosition(id: string, pageX: number, pageY: number): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.currentPos = { x: pageX, y: pageY };
  ghost.cloneEl.style.left = `${pageX - window.scrollX}px`;
  ghost.cloneEl.style.top = `${pageY - window.scrollY}px`;
}

export function findGhostAtPoint(clientX: number, clientY: number): GhostEntry | null {
  for (const ghost of getGhosts().values()) {
    const rect = ghost.cloneEl.getBoundingClientRect();
    if (
      clientX >= rect.left && clientX <= rect.right &&
      clientY >= rect.top && clientY <= rect.bottom
    ) {
      return ghost;
    }
  }
  return null;
}

export function destroyGhostLayer(): void {
  window.removeEventListener("scroll", syncGhostScroll);
  // Ghosts cleaned up by resetCanvas()
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/ghost-layer.ts
git commit -m "feat(overlay): add ghost layer — DOM clone creation, positioning, scroll sync"
```

---

### Task 6: Modify selection.ts — Add setEnabled()

**Files:**
- Modify: `packages/overlay/src/selection.ts`

- [ ] **Step 1: Add setEnabled export**

In `selection.ts`, add this new export function after the existing `deactivateSelection()` function (around line 536). Also add a variable to track whether listeners are currently attached:

After line `let isActive = false;` (around line 146), add:
```typescript
let listenersAttached = false;
```

After the `deactivateSelection()` function, add:

```typescript
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
```

Also add a getter for the currently selected DOM element (used by Move tool):

```typescript
export function getSelectedElement(): HTMLElement | null {
  return selectedElement ?? null;
}
```

Where `selectedElement` is the DOM element stored during selection (the element passed to `handleMouseDown`). If selection.ts doesn't already store this, add `let selectedElement: HTMLElement | null = null;` near the state variables, set it in the mousedown handler when a component is selected, and clear it on deselect.

Also update `initSelection()` to set `listenersAttached = true` after attaching listeners, and update `deactivateSelection()` to set `listenersAttached = false`.

- [ ] **Step 2: Verify build**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/selection.ts
git commit -m "feat(overlay): add setEnabled() to selection.ts for tool switching"
```

---

### Task 7: Modify toolbar.ts — Undo Reorder, Eye Toggle, Generate, Toast

**Files:**
- Modify: `packages/overlay/src/toolbar.ts`

The current `toolbar.ts` is 207 lines. This task makes 5 specific edits to it. Each edit references exact line numbers and surrounding code.

- [ ] **Step 1: Add new styles to TOOLBAR_STYLES**

After the existing `.close-btn:hover` rule (line 77), add before the closing backtick (line 79):

```typescript
// Replace the closing `\`; on line 79 with this expanded version:
  .generate-btn {
    background: #1e88e5;
    border: 1px solid #1565c0;
    color: white;
  }
  .generate-btn:hover:not(:disabled) {
    background: #1565c0;
  }
  .eye-btn {
    background: transparent;
    border: 1px solid #444;
    font-size: 14px;
    padding: 4px 6px;
  }
  .toast {
    position: fixed;
    bottom: 60px;
    right: 16px;
    background: #333;
    color: #e0e0e0;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    z-index: 2147483647;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .toast.visible {
    opacity: 1;
  }
`;
```

- [ ] **Step 2: Update toolbar.innerHTML (line 94-100)**

Replace the existing `toolbar.innerHTML` template with:

```typescript
  toolbar.innerHTML = `
    <span class="mode">Select</span>
    <span class="divider"></span>
    <span class="component-info">No selection</span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="eye-btn" title="Toggle originals (.)">👁</button>
    <button class="undo-btn" disabled>Undo Reorder</button>
    <button class="close-btn">&times;</button>
  `;
```

- [ ] **Step 3: Add new variable declarations and query selectors**

At the top of the file, after line 8 (`let undoCount = 0;`), add:

```typescript
let generateBtn: HTMLButtonElement | null = null;
let eyeBtn: HTMLButtonElement | null = null;
let toastEl: HTMLDivElement | null = null;
let toastTimeout: ReturnType<typeof setTimeout> | null = null;
let onEyeToggle: (() => void) | null = null;
let onGenerate: (() => void) | null = null;
let onCanvasUndo: (() => boolean) | null = null;
```

In `mountToolbar()`, after `undoBtn = toolbar.querySelector(".undo-btn");` (line 106), add:

```typescript
  generateBtn = toolbar.querySelector(".generate-btn");
  eyeBtn = toolbar.querySelector(".eye-btn");

  // Toast element
  toastEl = document.createElement("div");
  toastEl.className = "toast";
  shadowRoot.appendChild(toastEl);
```

- [ ] **Step 4: Add event handlers and new exports**

After the `closeBtn!.addEventListener("click", onClose);` line (line 114), add:

```typescript
  // Eye toggle button
  eyeBtn!.addEventListener("click", () => {
    if (onEyeToggle) onEyeToggle();
  });

  // Generate button
  generateBtn!.addEventListener("click", () => {
    if (onGenerate) onGenerate();
  });

  // Keyboard shortcuts: `.` for eye toggle, Ctrl+Z for canvas undo
  document.addEventListener("keydown", (e) => {
    if (e.key === "." && !isTextInputFocused()) {
      if (onEyeToggle) onEyeToggle();
    }
    // Canvas undo — callback returns true if it handled the undo, false if in Pointer mode
    if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !isTextInputFocused()) {
      if (onCanvasUndo?.()) e.preventDefault();
    }
  });
```

After the `getShadowRoot()` export at the end of the file (line 206), add these new exports:

```typescript
export function setOnEyeToggle(fn: () => void): void { onEyeToggle = fn; }
export function setOnGenerate(fn: () => void): void { onGenerate = fn; }
export function setOnCanvasUndo(fn: () => boolean): void { onCanvasUndo = fn; }

export function updateEyeButton(hidden: boolean): void {
  if (eyeBtn) eyeBtn.textContent = hidden ? "👁‍🗨" : "👁";
}

export function updateGenerateButton(enabled: boolean): void {
  if (generateBtn) generateBtn.disabled = !enabled;
}

export function showToast(message: string): void {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl?.classList.remove("visible");
  }, 2000);
}

export function updateModeLabel(label: string): void {
  const modeEl = getShadowRoot()?.querySelector(".mode");
  if (modeEl) modeEl.textContent = label;
}

function isTextInputFocused(): boolean {
  const active = document.activeElement;
  return active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
}
```

- [ ] **Step 5: Verify build**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/toolbar.ts
git commit -m "feat(overlay): update toolbar — Undo Reorder label, eye toggle, generate button, toast"
```

---

### Task 8: Tools Panel (Left Sidebar)

**Files:**
- Create: `packages/overlay/src/tools-panel.ts`

- [ ] **Step 1: Create tools-panel.ts**

```typescript
// packages/overlay/src/tools-panel.ts
import type { ToolType } from "@sketch-ui/shared";
import { getActiveTool, setActiveTool, getToolOptions, setToolOption } from "./canvas-state.js";
import { getShadowRoot } from "./toolbar.js";

const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "pointer", icon: "↖", label: "Pointer", shortcut: "V" },
  { type: "grab", icon: "✋", label: "Grab", shortcut: "H" },
  { type: "move", icon: "⇔", label: "Move", shortcut: "M" },
  { type: "draw", icon: "✏", label: "Draw", shortcut: "D" },
  { type: "color", icon: "💧", label: "Color", shortcut: "C" },
  { type: "text", icon: "T", label: "Text", shortcut: "T" },
  { type: "lasso", icon: "⭕", label: "Lasso", shortcut: "L" },
];

const PANEL_STYLES = `
  .tools-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 48px;
    height: 100vh;
    background: #1a1a2e;
    border-right: 1px solid #333;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
    gap: 4px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    user-select: none;
  }
  .tool-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: #aaa;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
  }
  .tool-btn:hover {
    background: #2a2a3e;
    color: #e0e0e0;
  }
  .tool-btn.active {
    background: #3a3a4e;
    color: #64b5f6;
    border-left-color: #64b5f6;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 52px;
    top: 50%;
    transform: translateY(-50%);
    background: #333;
    color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    pointer-events: none;
  }
  .tool-btn:hover .tooltip {
    display: block;
  }
  .sub-options {
    width: 48px;
    padding: 4px 0;
    border-top: 1px solid #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .sub-options.hidden {
    display: none;
  }
  .size-btn {
    width: 32px;
    height: 24px;
    background: #2a2a3e;
    border: 1px solid #444;
    border-radius: 3px;
    color: #aaa;
    font-size: 10px;
    cursor: pointer;
  }
  .size-btn.active {
    background: #3a3a4e;
    color: #64b5f6;
    border-color: #64b5f6;
  }
  .color-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #444;
    cursor: pointer;
    padding: 0;
    background: #ef4444;
  }
  .clear-btn {
    margin-top: auto;
    margin-bottom: 16px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid #444;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
  }
  .clear-btn:hover {
    border-color: #ef5350;
    color: #ef5350;
  }
`;

let panelEl: HTMLDivElement | null = null;
let subOptionsEl: HTMLDivElement | null = null;
let toolButtons: Map<ToolType, HTMLButtonElement> = new Map();
let onClearAll: (() => void) | null = null;

export function setOnClearAll(fn: () => void): void { onClearAll = fn; }

export function initToolsPanel(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = PANEL_STYLES;
  shadowRoot.appendChild(style);

  panelEl = document.createElement("div");
  panelEl.className = "tools-panel";

  // Tool buttons
  for (const def of TOOL_DEFS) {
    const btn = document.createElement("button");
    btn.className = `tool-btn${def.type === "pointer" ? " active" : ""}`;
    btn.innerHTML = `${def.icon}<span class="tooltip">${def.label} (${def.shortcut})</span>`;
    btn.addEventListener("click", () => setActiveTool(def.type));
    panelEl.appendChild(btn);
    toolButtons.set(def.type, btn);
  }

  // Sub-options container
  subOptionsEl = document.createElement("div");
  subOptionsEl.className = "sub-options hidden";
  panelEl.appendChild(subOptionsEl);

  // Clear All button at bottom
  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.textContent = "✕";
  clearBtn.title = "Clear All";
  clearBtn.addEventListener("click", () => { if (onClearAll) onClearAll(); });
  panelEl.appendChild(clearBtn);

  shadowRoot.appendChild(panelEl);

  // Keyboard shortcuts
  document.addEventListener("keydown", handleToolShortcut, true);
}

function handleToolShortcut(e: KeyboardEvent): void {
  // Suppress shortcuts when text input is focused
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

  const key = e.key.toUpperCase();
  const tool = TOOL_DEFS.find(d => d.shortcut === key);
  if (tool) {
    setActiveTool(tool.type);
    e.preventDefault();
  }
}

export function updateActiveToolUI(tool: ToolType): void {
  for (const [type, btn] of toolButtons) {
    btn.classList.toggle("active", type === tool);
  }
  updateSubOptions(tool);
}

function updateSubOptions(tool: ToolType): void {
  if (!subOptionsEl) return;

  subOptionsEl.innerHTML = "";
  subOptionsEl.classList.add("hidden");

  if (tool === "draw") {
    subOptionsEl.classList.remove("hidden");
    const opts = getToolOptions();

    // Color swatch
    const swatch = document.createElement("input");
    swatch.type = "color";
    swatch.className = "color-swatch";
    swatch.value = opts.brushColor;
    swatch.style.cssText = "width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;";
    swatch.addEventListener("input", () => setToolOption("brushColor", swatch.value));
    subOptionsEl.appendChild(swatch);

    // Stroke width buttons
    for (const size of [2, 4, 8]) {
      const btn = document.createElement("button");
      btn.className = `size-btn${size === opts.brushSize ? " active" : ""}`;
      btn.textContent = `${size}px`;
      btn.addEventListener("click", () => {
        setToolOption("brushSize", size);
        subOptionsEl?.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
      subOptionsEl.appendChild(btn);
    }
  } else if (tool === "text") {
    subOptionsEl.classList.remove("hidden");
    const opts = getToolOptions();

    // Color swatch for text color
    const swatch = document.createElement("input");
    swatch.type = "color";
    swatch.value = opts.textColor;
    swatch.style.cssText = "width:24px;height:24px;border:2px solid #444;border-radius:50%;cursor:pointer;padding:0;background:none;";
    swatch.addEventListener("input", () => setToolOption("textColor", swatch.value));
    subOptionsEl.appendChild(swatch);

    // Font size buttons
    for (const size of [12, 16, 20, 24]) {
      const btn = document.createElement("button");
      btn.className = `size-btn${size === opts.fontSize ? " active" : ""}`;
      btn.textContent = `${size}`;
      btn.addEventListener("click", () => {
        setToolOption("fontSize", size);
        subOptionsEl?.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
      subOptionsEl.appendChild(btn);
    }
  }
}

export function destroyToolsPanel(): void {
  document.removeEventListener("keydown", handleToolShortcut, true);
  panelEl?.remove();
  panelEl = null;
  subOptionsEl = null;
  toolButtons.clear();
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/tools-panel.ts
git commit -m "feat(overlay): add tools panel — left sidebar with 7 tools, sub-options, clear all"
```

---

### Task 9: Interaction Layer

**Files:**
- Create: `packages/overlay/src/interaction.ts`

- [ ] **Step 1: Create interaction.ts**

```typescript
// packages/overlay/src/interaction.ts
import { getActiveTool } from "./canvas-state.js";

export type ToolEventHandler = {
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
};

let interactionEl: HTMLDivElement | null = null;
let activeHandler: ToolEventHandler | null = null;
let toolHandlers: Map<string, ToolEventHandler> = new Map();

export function registerToolHandler(tool: string, handler: ToolEventHandler): void {
  toolHandlers.set(tool, handler);
}

export function initInteraction(): void {
  interactionEl = document.createElement("div");
  interactionEl.setAttribute("data-sketch-ui-interaction", "true");
  interactionEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 48px;
    width: calc(100vw - 48px);
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `;

  document.body.appendChild(interactionEl);

  interactionEl.addEventListener("mousedown", (e) => {
    activeHandler?.onMouseDown?.(e);
  });
  interactionEl.addEventListener("mousemove", (e) => {
    activeHandler?.onMouseMove?.(e);
  });
  interactionEl.addEventListener("mouseup", (e) => {
    activeHandler?.onMouseUp?.(e);
  });
}

export function activateInteraction(tool: string): void {
  activeHandler = toolHandlers.get(tool) || null;
  if (interactionEl) {
    // Pointer mode: interaction layer is transparent, selection.ts handles events
    interactionEl.style.pointerEvents = tool === "pointer" ? "none" : "auto";
  }

  // Update cursor
  const cursors: Record<string, string> = {
    pointer: "default",
    grab: "grab",
    move: "move",
    draw: "crosshair",
    color: "pointer",
    text: "text",
    lasso: "crosshair",
  };
  if (interactionEl) {
    interactionEl.style.cursor = cursors[tool] || "default";
  }
}

export function setInteractionCursor(cursor: string): void {
  if (interactionEl) interactionEl.style.cursor = cursor;
}

export function destroyInteraction(): void {
  interactionEl?.remove();
  interactionEl = null;
  activeHandler = null;
  toolHandlers.clear();
}
```

- [ ] **Step 2: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/interaction.ts
git commit -m "feat(overlay): add interaction layer — event dispatch to active tool"
```

---

### Task 10: Tool Handlers — Pointer, Grab, Move

**Files:**
- Create: `packages/overlay/src/tools/pointer.ts`
- Create: `packages/overlay/src/tools/grab.ts`
- Create: `packages/overlay/src/tools/move.ts`

- [ ] **Step 1: Create pointer.ts**

```typescript
// packages/overlay/src/tools/pointer.ts
// Pointer delegates entirely to selection.ts (Phase 1).
// No interaction layer handler needed — when Pointer is active,
// the interaction layer has pointer-events: none and selection.ts
// capture-phase listeners handle everything.
import { setEnabled } from "../selection.js";

export function activatePointer(): void {
  setEnabled(true);
}

export function deactivatePointer(): void {
  setEnabled(false);
}
```

- [ ] **Step 2: Create grab.ts**

```typescript
// packages/overlay/src/tools/grab.ts
import type { ToolEventHandler } from "../interaction.js";
import { setInteractionCursor } from "../interaction.js";

let dragging = false;
let lastX = 0;
let lastY = 0;

export const grabHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    setInteractionCursor("grabbing");
  },
  onMouseMove(e: MouseEvent) {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    window.scrollBy(-dx, -dy);
    lastX = e.clientX;
    lastY = e.clientY;
  },
  onMouseUp(_e: MouseEvent) {
    dragging = false;
    setInteractionCursor("grab");
  },
};
```

- [ ] **Step 3: Create move.ts**

```typescript
// packages/overlay/src/tools/move.ts
import type { ToolEventHandler } from "../interaction.js";
import { getSelection, getSelectedElement } from "../selection.js";
import { setActiveTool, getGhosts, moveGhost } from "../canvas-state.js";
import { createGhost, updateGhostPosition, findGhostAtPoint } from "../ghost-layer.js";
import type { GhostEntry } from "../canvas-state.js";

let dragTarget: GhostEntry | null = null;
let dragOffset = { x: 0, y: 0 };
let isDragging = false;
let pendingSelect = false;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    // Check if clicking an existing ghost
    const existingGhost = findGhostAtPoint(e.clientX, e.clientY);
    if (existingGhost) {
      dragTarget = existingGhost;
      dragOffset = {
        x: e.clientX + window.scrollX - existingGhost.currentPos.x,
        y: e.clientY + window.scrollY - existingGhost.currentPos.y,
      };
      isDragging = true;
      return;
    }

    // Check if there's a current selection to create a ghost from
    const selection = getSelection();
    if (!selection) {
      // No selection — temporarily switch to pointer to let user select
      pendingSelect = true;
      setActiveTool("pointer");
      return;
    }

    // Use the actual selected DOM element (not elementFromPoint which may hit wrong element)
    const el = getSelectedElement();
    if (!el) return;

    const ghost = createGhost(el, {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
    });

    dragTarget = ghost;
    dragOffset = {
      x: e.clientX + window.scrollX - ghost.currentPos.x,
      y: e.clientY + window.scrollY - ghost.currentPos.y,
    };
    isDragging = true;
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragTarget) return;
    const pageX = e.clientX + window.scrollX - dragOffset.x;
    const pageY = e.clientY + window.scrollY - dragOffset.y;
    updateGhostPosition(dragTarget.id, pageX, pageY);
  },

  onMouseUp(_e: MouseEvent) {
    if (isDragging && dragTarget) {
      // Position already updated — ghost stays where it is
      moveGhost(dragTarget.id, dragTarget.currentPos);
    }
    dragTarget = null;
    isDragging = false;
  },
};

/** Called when pointer mode selects something and we should switch back to move */
export function returnToMoveAfterSelect(): void {
  if (pendingSelect) {
    pendingSelect = false;
    setActiveTool("move");
  }
}
```

- [ ] **Step 4: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools/pointer.ts packages/overlay/src/tools/grab.ts packages/overlay/src/tools/move.ts
git commit -m "feat(overlay): add pointer, grab, and move tool handlers"
```

---

### Task 11: Tool Handlers — Draw, Text, Color, Lasso

**Files:**
- Create: `packages/overlay/src/tools/draw.ts`
- Create: `packages/overlay/src/tools/text.ts`
- Create: `packages/overlay/src/tools/color.ts`
- Create: `packages/overlay/src/tools/lasso.ts`

- [ ] **Step 1: Create draw.ts**

```typescript
// packages/overlay/src/tools/draw.ts
import type { ToolEventHandler } from "../interaction.js";
import type { DrawAnnotation } from "@sketch-ui/shared";
import { getToolOptions, addAnnotation } from "../canvas-state.js";
import { createLivePath, addStrokePath } from "../annotation-layer.js";
import { simplifyPoints } from "../utils/rdp.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";

let livePath: ReturnType<typeof createLivePath> = null;
let startComponent: DrawAnnotation["targetComponent"] = null;

export const drawHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    const opts = getToolOptions();
    livePath = createLivePath(opts.brushColor, opts.brushSize);
    if (livePath) {
      const pageX = e.clientX + window.scrollX;
      const pageY = e.clientY + window.scrollY;
      livePath.addPoint(pageX, pageY);
    }
    // Resolve target from start point
    startComponent = resolveComponentAtPoint(e.clientX, e.clientY);
  },
  onMouseMove(e: MouseEvent) {
    if (!livePath) return;
    const pageX = e.clientX + window.scrollX;
    const pageY = e.clientY + window.scrollY;
    livePath.addPoint(pageX, pageY);
  },
  onMouseUp(_e: MouseEvent) {
    if (!livePath) return;
    const points = livePath.getPoints();
    const opts = getToolOptions();

    // Remove live path
    livePath.group.remove();

    if (points.length < 2) {
      livePath = null;
      startComponent = null;
      return;
    }

    // Simplify and add as permanent annotation
    const simplified = simplifyPoints(points, 2);
    const id = crypto.randomUUID();
    addStrokePath(id, simplified, opts.brushColor, opts.brushSize);
    addAnnotation({
      type: "draw",
      id,
      points: simplified,
      color: opts.brushColor,
      strokeWidth: opts.brushSize,
      targetComponent: startComponent,
    });

    livePath = null;
    startComponent = null;
  },
};
```

- [ ] **Step 2: Create resolve-helper.ts**

A small shared helper that tools use to resolve the component under a point:

```typescript
// packages/overlay/src/tools/resolve-helper.ts
import type { ComponentRef } from "@sketch-ui/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";

const INTERNAL_NAMES = new Set([
  "InnerLayoutRouter", "OuterLayoutRouter", "RedirectErrorBoundary",
  "RedirectBoundary", "HTTPAccessFallbackErrorBoundary", "HTTPAccessFallbackBoundary",
  "LoadingBoundary", "ErrorBoundary", "ScrollAndFocusHandler", "InnerScrollAndFocusHandler",
  "RenderFromTemplateContext", "DevRootHTTPAccessFallbackBoundary",
  "AppDevOverlayErrorBoundary", "AppDevOverlay", "HotReload", "Router",
  "ErrorBoundaryHandler", "AppRouter", "ServerRoot", "SegmentStateProvider",
  "RootErrorBoundary", "Suspense", "Fragment", "StrictMode",
  "ReplaySsrOnlyErrors", "SegmentViewNode", "SegmentTrieNode",
]);

/**
 * Quick synchronous resolve of the nearest React component under a viewport point.
 * Used by draw/text/color tools to attach annotations to components.
 */
export function resolveComponentAtPoint(clientX: number, clientY: number): ComponentRef | null {
  const el = document.elementFromPoint(clientX, clientY) as HTMLElement;
  if (!el || el.closest("#sketch-ui-root") || el.hasAttribute("data-sketch-ui-ghost")) return null;

  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  let current = fiber;
  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      if (name && name[0] === name[0].toUpperCase() && !INTERNAL_NAMES.has(name)
          && !name.startsWith("_") && !name.startsWith("$")
          && !name.includes("Provider") && !name.includes("Context")
          && name !== "Head" && name !== "html" && name !== "body") {
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

- [ ] **Step 3: Create text.ts**

```typescript
// packages/overlay/src/tools/text.ts
import type { ToolEventHandler } from "../interaction.js";
import { getToolOptions, addAnnotation } from "../canvas-state.js";
import { addTextAnnotation } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";

let activeInput: HTMLInputElement | null = null;
let clickPos: { pageX: number; pageY: number } | null = null;
let targetComp: ReturnType<typeof resolveComponentAtPoint> = null;

export const textHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    // If there's an active input, commit it first
    if (activeInput) commitText();

    const pageX = e.clientX + window.scrollX;
    const pageY = e.clientY + window.scrollY;
    clickPos = { pageX, pageY };
    targetComp = resolveComponentAtPoint(e.clientX, e.clientY);

    // Create a text input at the click position
    activeInput = document.createElement("input");
    activeInput.type = "text";
    activeInput.placeholder = "Type annotation...";
    activeInput.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: rgba(0,0,0,0.8);
      color: white;
      border: 1px solid #64b5f6;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: ${getToolOptions().fontSize}px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      outline: none;
      min-width: 120px;
    `;

    activeInput.addEventListener("keydown", (ke) => {
      if (ke.key === "Enter") { commitText(); ke.preventDefault(); }
      if (ke.key === "Escape") { cancelText(); ke.preventDefault(); }
      ke.stopPropagation(); // Prevent tool shortcuts while typing
    });

    document.body.appendChild(activeInput);
    activeInput.focus();
  },
  onMouseMove() {},
  onMouseUp() {},
};

function commitText(): void {
  if (!activeInput || !clickPos) return;
  const content = activeInput.value.trim();
  activeInput.remove();
  activeInput = null;

  if (!content) return;

  const opts = getToolOptions();
  const id = crypto.randomUUID();
  addTextAnnotation(id, clickPos.pageX, clickPos.pageY, content, opts.fontSize, opts.textColor);
  addAnnotation({
    type: "text",
    id,
    position: clickPos,
    content,
    fontSize: opts.fontSize,
    color: opts.textColor,
    targetComponent: targetComp,
  });

  clickPos = null;
  targetComp = null;
}

function cancelText(): void {
  if (activeInput) {
    activeInput.remove();
    activeInput = null;
  }
  clickPos = null;
  targetComp = null;
}

export function cleanupTextTool(): void {
  cancelText();
}
```

- [ ] **Step 4: Create color.ts**

```typescript
// packages/overlay/src/tools/color.ts
import type { ToolEventHandler } from "../interaction.js";
import { addAnnotation, type ColorOverrideRuntime } from "../canvas-state.js";
import { addColorBadge } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";
import { getShadowRoot } from "../toolbar.js";

let pickerEl: HTMLDivElement | null = null;

export const colorHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    // Close existing picker
    if (pickerEl) { pickerEl.remove(); pickerEl = null; }

    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root") || el.hasAttribute("data-sketch-ui-ghost")) return;

    const comp = resolveComponentAtPoint(e.clientX, e.clientY);
    if (!comp) return;

    const computedBg = getComputedStyle(el).backgroundColor;
    const computedColor = getComputedStyle(el).color;

    // Create picker in Shadow DOM
    const shadowRoot = getShadowRoot();
    if (!shadowRoot) return;

    pickerEl = document.createElement("div");
    pickerEl.style.cssText = `
      position: fixed;
      left: ${e.clientX + 10}px;
      top: ${e.clientY + 10}px;
      background: #1a1a2e;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 8px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 12px;
      color: #e0e0e0;
    `;

    let selectedProperty: "backgroundColor" | "color" = "backgroundColor";

    // Property radio buttons
    const radioDiv = document.createElement("div");
    radioDiv.style.cssText = "display:flex;gap:8px;";
    for (const prop of ["backgroundColor", "color"] as const) {
      const label = document.createElement("label");
      label.style.cssText = "display:flex;align-items:center;gap:4px;cursor:pointer;";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "color-prop";
      radio.checked = prop === "backgroundColor";
      radio.addEventListener("change", () => {
        selectedProperty = prop;
        input.value = rgbToHex(prop === "backgroundColor" ? computedBg : computedColor);
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(prop === "backgroundColor" ? "Background" : "Text"));
      radioDiv.appendChild(label);
    }
    pickerEl.appendChild(radioDiv);

    // Native color input
    const input = document.createElement("input");
    input.type = "color";
    input.value = rgbToHex(computedBg);
    input.style.cssText = "width:100%;height:32px;cursor:pointer;border:none;";
    input.addEventListener("input", () => {
      (el.style as any)[selectedProperty] = input.value;
    });

    // Auto-close: commit color on change (native picker confirms)
    input.addEventListener("change", () => {
      const fromColor = selectedProperty === "backgroundColor" ? computedBg : computedColor;
      const toColor = input.value;
      const id = crypto.randomUUID();
      const rect = el.getBoundingClientRect();

      addColorBadge(id, rect.right + window.scrollX, rect.top + window.scrollY, toColor);
      addAnnotation({
        type: "colorChange",
        id,
        component: comp,
        targetElement: el,
        property: selectedProperty,
        fromColor,
        toColor,
      } as ColorOverrideRuntime);

      closePicker();
    });
    pickerEl.appendChild(input);

    shadowRoot.appendChild(pickerEl);

    const closePicker = () => {
      pickerEl?.remove();
      pickerEl = null;
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onClickOutside, true);
    };

    // Close on Escape
    const onKey = (ke: KeyboardEvent) => {
      if (ke.key === "Escape") closePicker();
    };
    document.addEventListener("keydown", onKey, true);

    // Close on click outside
    const onClickOutside = (me: MouseEvent) => {
      if (pickerEl && !pickerEl.contains(me.target as Node)) closePicker();
    };
    // Delay to avoid catching the click that opened the picker
    setTimeout(() => document.addEventListener("mousedown", onClickOutside, true), 0);
  },
  onMouseMove() {},
  onMouseUp() {},
};

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return "#000000";
  return "#" + match.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, "0")).join("");
}

export function cleanupColorTool(): void {
  pickerEl?.remove();
  pickerEl = null;
}
```

- [ ] **Step 5: Create lasso.ts**

```typescript
// packages/overlay/src/tools/lasso.ts
import type { ToolEventHandler } from "../interaction.js";
import { getShadowRoot } from "../toolbar.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";

const SVG_NS = "http://www.w3.org/2000/svg";

let lassoPoints: Array<{ x: number; y: number }> = [];
let lassoPath: SVGPathElement | null = null;
let lassoSvg: SVGSVGElement | null = null;
let selectedElements: HTMLElement[] = [];
let selectionBorders: HTMLDivElement[] = [];

export const lassoHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    clearLassoSelection();
    lassoPoints = [{ x: e.clientX, y: e.clientY }];

    const shadowRoot = getShadowRoot();
    if (!shadowRoot) return;

    // Create temporary SVG for lasso visualization
    lassoSvg = document.createElementNS(SVG_NS, "svg");
    lassoSvg.setAttribute("style",
      "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"
    );
    lassoPath = document.createElementNS(SVG_NS, "path");
    lassoPath.setAttribute("stroke", "#42a5f5");
    lassoPath.setAttribute("stroke-width", "2");
    lassoPath.setAttribute("stroke-dasharray", "4,4");
    lassoPath.setAttribute("fill", "rgba(66,165,245,0.1)");
    lassoSvg.appendChild(lassoPath);
    shadowRoot.appendChild(lassoSvg);
  },

  onMouseMove(e: MouseEvent) {
    if (!lassoPath || lassoPoints.length === 0) return;
    lassoPoints.push({ x: e.clientX, y: e.clientY });
    updateLassoPath();
  },

  onMouseUp(_e: MouseEvent) {
    if (lassoPoints.length < 3) {
      cleanupLassoVisual();
      return;
    }

    // Close the path and find intersecting components
    const bounds = getLassoBounds();
    cleanupLassoVisual();

    // Find all elements within the lasso bounds
    const allElements = document.querySelectorAll("*");
    const seen = new Set<string>();

    for (const el of allElements) {
      if (el.closest("#sketch-ui-root")) continue;
      if ((el as HTMLElement).hasAttribute?.("data-sketch-ui-ghost")) continue;

      const rect = el.getBoundingClientRect();
      if (
        rect.left < bounds.right && rect.right > bounds.left &&
        rect.top < bounds.bottom && rect.bottom > bounds.top &&
        rect.width > 0 && rect.height > 0
      ) {
        const comp = resolveComponentAtPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
        if (comp && !seen.has(`${comp.filePath}:${comp.lineNumber}`)) {
          seen.add(`${comp.filePath}:${comp.lineNumber}`);
          selectedElements.push(el as HTMLElement);
          // Show selection border
          showSelectionBorder(rect);
        }
      }
    }
  },
};

function updateLassoPath(): void {
  if (!lassoPath || lassoPoints.length < 2) return;
  let d = `M${lassoPoints[0].x},${lassoPoints[0].y}`;
  for (let i = 1; i < lassoPoints.length; i++) {
    d += ` L${lassoPoints[i].x},${lassoPoints[i].y}`;
  }
  d += " Z";
  lassoPath.setAttribute("d", d);
}

function getLassoBounds(): { left: number; top: number; right: number; bottom: number } {
  let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
  for (const p of lassoPoints) {
    left = Math.min(left, p.x);
    top = Math.min(top, p.y);
    right = Math.max(right, p.x);
    bottom = Math.max(bottom, p.y);
  }
  return { left, top, right, bottom };
}

function showSelectionBorder(rect: DOMRect): void {
  const border = document.createElement("div");
  border.setAttribute("data-sketch-ui-ghost", "true");
  border.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 2px solid #42a5f5;
    pointer-events: none;
    z-index: 2147483645;
  `;
  document.body.appendChild(border);
  selectionBorders.push(border);
}

function cleanupLassoVisual(): void {
  lassoSvg?.remove();
  lassoSvg = null;
  lassoPath = null;
  lassoPoints = [];
}

export function clearLassoSelection(): void {
  cleanupLassoVisual();
  selectionBorders.forEach(b => b.remove());
  selectionBorders = [];
  selectedElements = [];
}

export function getLassoSelectedElements(): HTMLElement[] {
  return selectedElements;
}
```

- [ ] **Step 6: Verify types compile**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/tools/draw.ts packages/overlay/src/tools/text.ts packages/overlay/src/tools/color.ts packages/overlay/src/tools/lasso.ts packages/overlay/src/tools/resolve-helper.ts
git commit -m "feat(overlay): add draw, text, color, and lasso tool handlers"
```

---

### Task 12: Wire Everything in index.ts

**Files:**
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Update index.ts to initialize all Phase 2A systems**

Replace the current `index.ts` content with:

```typescript
// packages/overlay/src/index.ts
import { connect, disconnect } from "./bridge.js";
import { mountToolbar, destroyToolbar, updateModeLabel, setOnEyeToggle, setOnGenerate, setOnCanvasUndo, updateEyeButton, updateGenerateButton, showToast } from "./toolbar.js";
import { initSelection, deactivateSelection } from "./selection.js";
import { initDrag, deactivateDrag } from "./drag.js";
import { initAnnotationLayer, destroyAnnotationLayer, clearAnnotationLayer, removeAnnotationElement } from "./annotation-layer.js";
import { initGhostLayer, destroyGhostLayer } from "./ghost-layer.js";
import { initToolsPanel, destroyToolsPanel, updateActiveToolUI, setOnClearAll } from "./tools-panel.js";
import { initInteraction, destroyInteraction, activateInteraction, registerToolHandler } from "./interaction.js";
import {
  onToolChange, onStateChange, getActiveTool, setActiveTool,
  canvasUndo, resetCanvas, hasChanges, serializeAnnotations,
  getOriginalsHidden, setOriginalsHidden,
} from "./canvas-state.js";
import { activatePointer, deactivatePointer } from "./tools/pointer.js";
import { grabHandler } from "./tools/grab.js";
import { moveHandler, returnToMoveAfterSelect } from "./tools/move.js";
import { drawHandler } from "./tools/draw.js";
import { textHandler, cleanupTextTool } from "./tools/text.js";
import { colorHandler, cleanupColorTool } from "./tools/color.js";
import { lassoHandler, clearLassoSelection } from "./tools/lasso.js";

declare global {
  interface Window {
    __SKETCH_UI_WS_PORT__?: number;
  }
}

const TOOL_LABELS: Record<string, string> = {
  pointer: "Select",
  grab: "Grab",
  move: "Move",
  draw: "Draw",
  color: "Color",
  text: "Text",
  lasso: "Lasso",
};

function init(): void {
  const wsPort = window.__SKETCH_UI_WS_PORT__;
  if (!wsPort) {
    console.warn("[SketchUI] No WebSocket port found.");
    return;
  }

  if (document.getElementById("sketch-ui-root")) return; // Already initialized

  connect(wsPort);
  mountToolbar(close);

  // Phase 1 systems
  initSelection();
  initDrag();

  // Phase 2A layers
  initAnnotationLayer();
  initGhostLayer();
  initToolsPanel();
  initInteraction();

  // Register tool handlers with interaction layer
  registerToolHandler("grab", grabHandler);
  registerToolHandler("move", moveHandler);
  registerToolHandler("draw", drawHandler);
  registerToolHandler("text", textHandler);
  registerToolHandler("color", colorHandler);
  registerToolHandler("lasso", lassoHandler);

  // Tool change listener — handles mode switching
  onToolChange((tool, prev) => {
    // Cleanup previous tool
    if (prev === "pointer") deactivatePointer();
    if (prev === "text") cleanupTextTool();
    if (prev === "color") cleanupColorTool();
    if (prev === "lasso") clearLassoSelection();

    // Activate new tool
    if (tool === "pointer") activatePointer();
    activateInteraction(tool);
    updateActiveToolUI(tool);
    updateModeLabel(TOOL_LABELS[tool] || tool);
  });

  // State change → update generate button
  onStateChange(() => {
    updateGenerateButton(hasChanges());
  });

  // Eye toggle
  setOnEyeToggle(() => {
    const next = !getOriginalsHidden();
    setOriginalsHidden(next);
    updateEyeButton(next);
  });

  // Generate button (Phase 2A: log to console)
  setOnGenerate(() => {
    const data = serializeAnnotations();
    console.log("[SketchUI] Generate — serialized annotations:", JSON.stringify(data, null, 2));
  });

  // Canvas undo (Ctrl+Z) — returns true if handled, false if Pointer mode (Phase 1 source undo)
  setOnCanvasUndo(() => {
    if (getActiveTool() === "pointer") return false; // Let selection.ts handle Ctrl+Z
    const description = canvasUndo();
    if (description) {
      showToast(`Undo: ${description}`);
      return true;
    }
    return false;
  });

  // Clear All
  setOnClearAll(() => {
    clearAnnotationLayer();
    clearLassoSelection();
    resetCanvas();
    showToast("Canvas cleared");
  });

  console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools");
}

function close(): void {
  deactivateSelection();
  deactivateDrag();
  destroyAnnotationLayer();
  destroyGhostLayer();
  destroyToolsPanel();
  destroyInteraction();
  resetCanvas();
  disconnect();
  destroyToolbar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build:overlay`
Expected: Build succeeds

- [ ] **Step 3: Rebuild CLI**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build:cli`
Expected: Build succeeds, overlay.js copied to CLI dist

- [ ] **Step 4: Manual test**

Start test-app: `cd test-app && pnpm dev`
Start SketchUI: `cd test-app && node ../packages/cli/bin/sketch-ui.js`

Verify:
1. Left sidebar appears with 7 tool icons
2. Pointer mode works (Phase 1 select/reorder)
3. Press `H` → grab tool, drag to scroll
4. Press `M` → move tool, click component, drag to create ghost
5. Press `D` → draw tool, draw a stroke
6. Press `T` → text tool, click and type
7. Press `C` → color tool, click element, pick color
8. Press `L` → lasso tool, draw selection area
9. Ctrl+Z undoes last canvas action with toast
10. Eye toggle (`.` key) hides/shows originals
11. Generate button logs serialized data to console
12. Clear All button resets everything

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/index.ts
git commit -m "feat(overlay): wire up Phase 2A — tools panel, canvas layers, all tools"
```

---

### Task 13: Final Build and Cleanup

**Files:**
- All modified files from previous tasks

- [ ] **Step 1: Full build from clean**

Run:
```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI
pnpm build:overlay && pnpm build:cli
```
Expected: Both succeed, overlay.js ~40-50KB

- [ ] **Step 2: Run existing tests**

Run: `cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm test`
Expected: All Phase 1 transform tests still pass (13 tests)

- [ ] **Step 3: Run RDP test**

Run: `npx vitest run packages/overlay/src/__tests__/rdp.test.ts`
Expected: 4 tests pass

- [ ] **Step 4: Final manual verification**

Full test of all tools against the test-app. Verify each tool works, undo works, eye toggle works, generate logs correct structured data.

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: Phase 2A final build verification and cleanup"
```

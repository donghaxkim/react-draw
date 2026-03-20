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

  async onMouseUp(_e: MouseEvent) {
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

    // Collect candidate elements first, then resolve components in parallel
    const candidates: Array<{ el: HTMLElement; rect: DOMRect }> = [];
    for (const el of allElements) {
      if (el.closest("#sketch-ui-root")) continue;
      if ((el as HTMLElement).hasAttribute?.("data-sketch-ui-ghost")) continue;

      const rect = el.getBoundingClientRect();
      if (
        rect.left < bounds.right && rect.right > bounds.left &&
        rect.top < bounds.bottom && rect.bottom > bounds.top &&
        rect.width > 0 && rect.height > 0
      ) {
        candidates.push({ el: el as HTMLElement, rect });
      }
    }

    // Resolve all components in parallel
    const results = await Promise.all(
      candidates.map(({ rect }) =>
        resolveComponentAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
      )
    );

    for (let i = 0; i < candidates.length; i++) {
      const comp = results[i];
      const { el, rect } = candidates[i];
      if (comp && !seen.has(`${comp.filePath}:${comp.lineNumber}`)) {
        seen.add(`${comp.filePath}:${comp.lineNumber}`);
        selectedElements.push(el);
        showSelectionBorder(rect);
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

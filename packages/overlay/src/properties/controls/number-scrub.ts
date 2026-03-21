import type { PropertyDescriptor } from "@sketch-ui/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { getSnapPoints } from "../tailwind-resolver.js";
import { COLORS, FONT_FAMILY } from "../../design-tokens.js";

export function createNumberScrub(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];
  const scaleName = descriptor.tailwindScale as Parameters<typeof getSnapPoints>[0];

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:4px;`;

  const input = document.createElement("input");
  input.type = "text";
  input.style.cssText = `
    width:60px;
    background:${COLORS.bgTertiary};
    border:1px solid ${COLORS.border};
    border-radius:4px;
    padding:2px 5px;
    font-family:${FONT_FAMILY};
    font-size:11px;
    color:${COLORS.textPrimary};
    cursor:ew-resize;
    outline:none;
    box-sizing:border-box;
  `.trim().replace(/\n\s*/g, " ");

  const tokenLabel = document.createElement("span");
  tokenLabel.style.cssText = `font-size:10px; color:${COLORS.textSecondary}; font-family:${FONT_FAMILY};`;

  container.appendChild(input);
  container.appendChild(tokenLabel);

  // State
  let currentValues = new Map(values);
  let isDragging = false;
  let startX = 0;
  let startValue = 0;

  function getCurrentCssValue(): string {
    return currentValues.get(descriptor.key) ?? descriptor.defaultValue;
  }

  function updateDisplay(cssValue: string): void {
    const num = parseFloat(cssValue);
    input.value = isNaN(num) ? cssValue : String(num);

    // Look up token
    try {
      const snapPoints = getSnapPoints(scaleName, cssValue);
      const match = snapPoints.find((p) => p.cssValue === cssValue);
      if (match?.token) {
        tokenLabel.textContent = `${descriptor.tailwindPrefix}-${match.token}`;
      } else {
        tokenLabel.textContent = "";
      }
    } catch {
      tokenLabel.textContent = "";
    }
  }

  function findNearestSnapPoint(targetValue: number): { cssValue: string; token: string | null } {
    const currentCss = getCurrentCssValue();
    try {
      const snapPoints = getSnapPoints(scaleName, currentCss);
      if (snapPoints.length === 0) {
        return { cssValue: `${targetValue}px`, token: null };
      }

      let nearest = snapPoints[0];
      let minDiff = Math.abs(snapPoints[0].numericValue - targetValue);
      for (const pt of snapPoints) {
        const diff = Math.abs(pt.numericValue - targetValue);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = pt;
        }
      }
      return { cssValue: nearest.cssValue, token: nearest.token };
    } catch {
      return { cssValue: `${targetValue}px`, token: null };
    }
  }

  function getScaleStep(): number {
    const currentCss = getCurrentCssValue();
    try {
      const snapPoints = getSnapPoints(scaleName, currentCss);
      if (snapPoints.length < 2) return 1;
      const currentNum = parseFloat(currentCss);
      const idx = snapPoints.findIndex((p) => p.numericValue >= currentNum);
      if (idx > 0 && idx < snapPoints.length) {
        return Math.abs(snapPoints[idx].numericValue - snapPoints[idx - 1].numericValue) || 1;
      }
      return 1;
    } catch {
      return 1;
    }
  }

  // Convert any CSS value to pixels for drag math
  function toPx(value: string): number {
    const num = parseFloat(value);
    if (isNaN(num)) return 0;
    if (value.includes("rem")) {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return num * rootFontSize;
    }
    return num; // px or unitless
  }

  // Drag handlers
  const onMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;
    const delta = (e.clientX - startX) * 0.5;
    const targetValue = Math.max(descriptor.min ?? 0, startValue + delta);
    const { cssValue } = findNearestSnapPoint(targetValue);
    currentValues.set(descriptor.key, cssValue);
    updateDisplay(cssValue);
    onPreview(descriptor.key, cssValue);
  };

  const onMouseUp = (): void => {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    input.style.cursor = "ew-resize";
    onCommit();
  };

  input.addEventListener("mousedown", (e: MouseEvent) => {
    if (document.activeElement === input) return; // let text editing work when focused
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startValue = toPx(getCurrentCssValue());
    input.style.cursor = "ew-resize";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // Text input editing
  input.addEventListener("focus", () => {
    input.style.cursor = "text";
  });

  input.addEventListener("blur", () => {
    input.style.cursor = "ew-resize";
    const raw = input.value.trim();
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      const cssValue = raw.includes("px") || raw.includes("rem") ? raw : `${num}px`;
      currentValues.set(descriptor.key, cssValue);
      updateDisplay(cssValue);
      onPreview(descriptor.key, cssValue);
      onCommit();
    } else if (raw === "auto" || raw === "none") {
      currentValues.set(descriptor.key, raw);
      updateDisplay(raw);
      onPreview(descriptor.key, raw);
      onCommit();
    } else {
      // Revert
      updateDisplay(getCurrentCssValue());
    }
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      input.blur();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const step = getScaleStep();
      const current = parseFloat(getCurrentCssValue()) || 0;
      const next = e.key === "ArrowUp" ? current + step : Math.max(descriptor.min ?? 0, current - step);
      const { cssValue } = findNearestSnapPoint(next);
      currentValues.set(descriptor.key, cssValue);
      updateDisplay(cssValue);
      onPreview(descriptor.key, cssValue);
      onCommit();
    } else if (e.key === "Escape") {
      updateDisplay(getCurrentCssValue());
      input.blur();
    }
  });

  // Init
  updateDisplay(getCurrentCssValue());

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      currentValues.set(key, cssValue);
      updateDisplay(cssValue);
    },
    destroy(): void {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    },
  };
}

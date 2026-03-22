import type { PropertyDescriptor } from "@sketch-ui/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { COLORS, FONT_FAMILY } from "../../design-tokens.js";

export function createSlider(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];
  const isOpacity = descriptor.key === "opacity";

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:6px;`;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "prop-input";
  input.style.cssText = `width:60px; cursor:text;`;

  const unitLabel = document.createElement("span");
  unitLabel.style.cssText = `
    font-family:${FONT_FAMILY};
    font-size:11px;
    color:${COLORS.textSecondary};
    min-width:16px;
  `.trim().replace(/\n\s*/g, " ");
  if (isOpacity) unitLabel.textContent = "%";

  container.appendChild(input);
  container.appendChild(unitLabel);

  let currentCssValue = values.get(descriptor.key) ?? descriptor.defaultValue;

  function updateDisplay(cssValue: string): void {
    currentCssValue = cssValue;
    const num = parseFloat(cssValue);
    if (isNaN(num)) {
      input.value = cssValue;
    } else {
      // opacity CSS is 0..1, display as 0..100
      input.value = isOpacity ? String(Math.round(num * 100)) : String(num);
    }
  }

  input.addEventListener("blur", () => {
    const raw = input.value.trim();
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      // opacity: convert display 0-100 back to CSS 0-1
      const cssValue = isOpacity ? String(Math.min(100, Math.max(0, num)) / 100) : String(num);
      currentCssValue = cssValue;
      updateDisplay(cssValue);
      onPreview(descriptor.key, cssValue);
      onCommit();
    } else {
      // Revert on invalid input
      updateDisplay(currentCssValue);
    }
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      input.blur();
    } else if (e.key === "Escape") {
      updateDisplay(currentCssValue);
      input.blur();
    }
  });

  updateDisplay(currentCssValue);

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      updateDisplay(cssValue);
    },
    destroy(): void {
      // No document-level listeners
    },
  };
}

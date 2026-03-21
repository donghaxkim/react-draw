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
  const min = descriptor.min ?? 0;
  const max = descriptor.max ?? 100;
  const isOpacity = descriptor.key === "opacity";

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:6px;`;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = String(min);
  slider.max = String(max);
  slider.step = "1";
  slider.className = "prop-slider";
  slider.style.cssText = `flex:1;`;

  const valueDisplay = document.createElement("span");
  valueDisplay.style.cssText = `
    font-family:${FONT_FAMILY};
    font-size:11px;
    color:${COLORS.textPrimary};
    min-width:28px;
    text-align:right;
  `.trim().replace(/\n\s*/g, " ");

  container.appendChild(slider);
  container.appendChild(valueDisplay);

  let currentCssValue = values.get(descriptor.key) ?? descriptor.defaultValue;

  function cssToSlider(cssValue: string): number {
    const num = parseFloat(cssValue);
    if (isNaN(num)) return isOpacity ? max : min;
    // opacity CSS is 0..1, slider is 0..100
    return isOpacity ? Math.round(num * 100) : num;
  }

  function sliderToCss(sliderValue: number): string {
    if (isOpacity) {
      return String(sliderValue / 100);
    }
    return String(sliderValue);
  }

  function updateDisplay(cssValue: string): void {
    currentCssValue = cssValue;
    const sliderVal = cssToSlider(cssValue);
    slider.value = String(sliderVal);
    valueDisplay.textContent = isOpacity ? `${sliderVal}%` : String(sliderVal);
  }

  slider.addEventListener("input", () => {
    const sliderVal = parseInt(slider.value, 10);
    const cssValue = sliderToCss(sliderVal);
    currentCssValue = cssValue;
    valueDisplay.textContent = isOpacity ? `${sliderVal}%` : String(sliderVal);
    onPreview(descriptor.key, cssValue);
  });

  slider.addEventListener("change", () => {
    onCommit();
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

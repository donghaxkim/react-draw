import type { PropertyDescriptor } from "@sketch-ui/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { COLORS, FONT_FAMILY, RADII } from "../../design-tokens.js";
import { openColorPicker, closeColorPicker } from "../../color-picker.js";

export function createColorSwatch(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:6px;`;

  const swatch = document.createElement("div");
  swatch.style.cssText = `
    width:20px;
    height:20px;
    border-radius:${RADII.sm};
    border:1px solid ${COLORS.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g, " ");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "#rrggbb";
  input.style.cssText = `
    flex:1;
    min-width:0;
    background:${COLORS.bgTertiary};
    border:1px solid ${COLORS.border};
    border-radius:4px;
    padding:2px 5px;
    font-family:${FONT_FAMILY};
    font-size:11px;
    color:${COLORS.textPrimary};
    outline:none;
    box-sizing:border-box;
  `.trim().replace(/\n\s*/g, " ");

  container.appendChild(swatch);
  container.appendChild(input);

  let currentValue = values.get(descriptor.key) ?? descriptor.defaultValue;
  let pickerOpen = false;

  function normalizeHex(value: string): string {
    const trimmed = value.trim();
    if (/^[0-9a-fA-F]{3,8}$/.test(trimmed)) {
      return `#${trimmed}`;
    }
    return trimmed;
  }

  function cssColorToHex(cssValue: string): string {
    // Convert rgb(r, g, b) / rgba(r, g, b, a) to hex
    const rgbMatch = cssValue.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    if (/^#[0-9a-fA-F]{3,8}$/.test(cssValue)) return cssValue;
    return "#000000";
  }

  function updateDisplay(cssValue: string): void {
    currentValue = cssValue;
    input.value = cssValue;
    swatch.style.background = cssValue;
  }

  function commitValue(): void {
    if (pickerOpen) return; // Don't commit on blur if picker is open
    const raw = input.value.trim();
    if (!raw) {
      updateDisplay(currentValue);
      return;
    }
    const normalized = normalizeHex(raw);
    updateDisplay(normalized);
    onPreview(descriptor.key, normalized);
    onCommit();
  }

  // Swatch click — open color picker
  swatch.addEventListener("click", () => {
    if (pickerOpen) {
      closeColorPicker();
      pickerOpen = false;
      return;
    }

    const rect = swatch.getBoundingClientRect();
    pickerOpen = true;

    openColorPicker({
      initialColor: cssColorToHex(currentValue),
      position: { x: rect.left - 210, y: rect.top },
      showPropertyToggle: false,
      onColorChange: (hex: string) => {
        updateDisplay(hex);
        onPreview(descriptor.key, hex);
      },
      onClose: () => {
        pickerOpen = false;
        onCommit();
      },
    });
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      commitValue();
      input.blur();
    } else if (e.key === "Escape") {
      updateDisplay(currentValue);
      input.blur();
    }
  });

  input.addEventListener("blur", () => {
    commitValue();
  });

  input.addEventListener("input", () => {
    const raw = input.value.trim();
    const normalized = normalizeHex(raw);
    swatch.style.background = normalized;
  });

  updateDisplay(currentValue);

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      updateDisplay(cssValue);
    },
    destroy(): void {
      if (pickerOpen) {
        closeColorPicker();
        pickerOpen = false;
      }
    },
  };
}

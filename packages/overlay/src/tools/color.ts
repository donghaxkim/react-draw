// packages/overlay/src/tools/color.ts
import type { ToolEventHandler } from "../interaction.js";
import type { ComponentRef } from "@sketch-ui/shared";
import { addAnnotation, type ColorOverrideRuntime } from "../canvas-state.js";
import { addColorBadge } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";
import { getShadowRoot } from "../toolbar.js";

let pickerEl: HTMLDivElement | null = null;

export const colorHandler: ToolEventHandler = {
  async onMouseDown(e: MouseEvent) {
    // Close existing picker
    if (pickerEl) { pickerEl.remove(); pickerEl = null; }

    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root") || el.hasAttribute("data-sketch-ui-ghost")) return;

    const comp = await resolveComponentAtPoint(e.clientX, e.clientY);
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

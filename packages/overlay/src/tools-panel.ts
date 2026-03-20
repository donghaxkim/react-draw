// packages/overlay/src/tools-panel.ts
import type { ToolType } from "@sketch-ui/shared";
import { getActiveTool, setActiveTool, getToolOptions, setToolOption } from "./canvas-state.js";
import { getShadowRoot } from "./toolbar.js";

// Inline SVG icons (18x18, stroke-based, matching react-icons style)
const ICONS = {
  pointer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>`,
  grab: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  move: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
  draw: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  color: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  text: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  lasso: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 22a5 5 0 0 1-2-4"/><path d="M7 16.93c.96.43 1.96.74 2.99.91"/><path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8-4.48 8-10 8a12 12 0 0 1-3-.38"/><path d="M5 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>`,
} as const;

const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "pointer", icon: ICONS.pointer, label: "Pointer", shortcut: "V" },
  { type: "grab", icon: ICONS.grab, label: "Grab", shortcut: "H" },
  { type: "move", icon: ICONS.move, label: "Move", shortcut: "M" },
  { type: "draw", icon: ICONS.draw, label: "Draw", shortcut: "D" },
  { type: "color", icon: ICONS.color, label: "Color", shortcut: "C" },
  { type: "text", icon: ICONS.text, label: "Text", shortcut: "T" },
  { type: "lasso", icon: ICONS.lasso, label: "Lasso", shortcut: "L" },
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
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
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

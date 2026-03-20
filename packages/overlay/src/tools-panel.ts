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

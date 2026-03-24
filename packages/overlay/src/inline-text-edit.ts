import type { ServerMessage, ComponentInfo, ElementIdentity, TextEditAnnotation } from "@frameup/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { send, onMessage } from "./bridge.js";
import { COLORS } from "./design-tokens.js";
import { setInteractionPointerEvents, activateInteraction, getPageElementAtPoint } from "./interaction.js";
import { getActiveTool } from "./canvas-state.js";
import { addTextEditAnnotation } from "./canvas-state.js";
import { isInternalName } from "./utils/component-filter.js";

// --- Blocklist: replaced/void elements where contentEditable is useless ---
const BLOCKED_TAGS = new Set([
  "IMG", "INPUT", "VIDEO", "IFRAME", "CANVAS", "SELECT",
  "TEXTAREA", "HR", "BR", "EMBED", "OBJECT", "PROGRESS",
]);

// --- Internal state ---
let editingElement: HTMLElement | null = null;
let originalTextContent = "";
let originalInnerHTML = "";
let lastKnownText = "";
let componentInfo: ComponentInfo | null = null;
let savedOutline = "";
let unsubscribeMessage: (() => void) | null = null;

// --- Pending commit for annotation fallback ---
let pendingCommit: {
  componentInfo: ComponentInfo;
  originalText: string;
  newText: string;
  originalInnerHTML: string;
  tagName: string;
} | null = null;

// --- Exports ---

export function isTextEditing(): boolean {
  return editingElement !== null;
}

export function initInlineTextEdit(): void {
  document.addEventListener("dblclick", handleDblClick, true);
  unsubscribeMessage = onMessage((msg: ServerMessage) => {
    if (msg.type === "updateTextComplete") {
      handleUpdateTextResponse(msg);
    }
  });
}

export function destroyInlineTextEdit(): void {
  if (editingElement) {
    exitEditMode();
  }
  document.removeEventListener("dblclick", handleDblClick, true);
  unsubscribeMessage?.();
  unsubscribeMessage = null;
}

function handleUpdateTextResponse(msg: Extract<ServerMessage, { type: "updateTextComplete" }>): void {
  if (!msg.success && msg.reason === "no-match" && pendingCommit) {
    const pc = pendingCommit;
    const ann: TextEditAnnotation = {
      type: "textEdit",
      id: `text-edit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      lineNumber: pc.componentInfo.lineNumber,
      columnNumber: pc.componentInfo.columnNumber,
      originalText: pc.originalText,
      newText: pc.newText,
    };
    const identity: ElementIdentity = {
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      lineNumber: pc.componentInfo.lineNumber,
      columnNumber: pc.componentInfo.columnNumber,
      tagName: pc.tagName,
    };
    addTextEditAnnotation(ann, identity, pc.originalInnerHTML);
  }
  pendingCommit = null;
}

// --- Multi-line detection ---

function isMultiLine(el: HTMLElement): boolean {
  if (el.scrollHeight > el.clientHeight + 4) return true;
  if (el.querySelector("br")) return true;
  const style = getComputedStyle(el);
  if (style.whiteSpace !== "nowrap" && el.getClientRects().length > 1) return true;
  return false;
}

// --- Component resolution (matches selection.ts fiber walk pattern) ---

function resolveComponent(el: HTMLElement): ComponentInfo | null {
  try {
    const fiber = getFiberFromHostInstance(el);
    if (!fiber) return null;

    let current = fiber;
    while (current) {
      if (isCompositeFiber(current)) {
        const name = getDisplayName(current.type);
        const debugSource = current._debugSource || current._debugOwner?._debugSource;

        if (name && name[0] === name[0].toUpperCase() && !isInternalName(name) && debugSource) {
          return {
            tagName: el.tagName.toLowerCase(),
            componentName: name,
            filePath: debugSource.fileName || "",
            lineNumber: debugSource.lineNumber || 0,
            columnNumber: debugSource.columnNumber || 0,
            stack: [],
            boundingRect: el.getBoundingClientRect(),
          };
        }
      }
      if (!current.return) break;
      current = current.return;
    }
  } catch {
    // Fiber resolution can fail — not all elements are in React tree
  }
  return null;
}

// --- Double-click handler ---

function handleDblClick(e: MouseEvent): void {
  if (editingElement) {
    commitAndExit();
  }

  let target: HTMLElement | null = null;
  const eventTarget = e.target as HTMLElement;

  if (
    eventTarget instanceof HTMLElement &&
    eventTarget !== document.documentElement &&
    eventTarget !== document.body &&
    !eventTarget.hasAttribute("data-frameup-interaction") &&
    !eventTarget.closest("#frameup-root")
  ) {
    target = eventTarget;
  } else {
    target = getPageElementAtPoint(e.clientX, e.clientY);
  }

  if (!target) return;
  if (BLOCKED_TAGS.has(target.tagName)) return;
  if (!target.textContent?.trim()) return;

  enterEditMode(target);
}

// --- Edit lifecycle ---

function enterEditMode(element: HTMLElement): void {
  editingElement = element;

  originalTextContent = element.textContent || "";
  originalInnerHTML = element.innerHTML;
  lastKnownText = originalTextContent;

  componentInfo = resolveComponent(element);

  savedOutline = element.style.outline;
  element.style.outline = `2px solid ${COLORS.accent}`;

  element.contentEditable = "true";

  setInteractionPointerEvents(false);

  element.focus();
  if (!isMultiLine(element)) {
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.selectAllChildren(element);
    }
  }

  element.addEventListener("blur", handleBlur);
  element.addEventListener("keydown", handleKeydown);
  element.addEventListener("input", handleInput);
}

function handleInput(): void {
  if (editingElement) {
    lastKnownText = editingElement.textContent || "";
  }
}

function handleBlur(): void {
  commitAndExit();
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape") {
    e.preventDefault();
    commitAndExit();
    return;
  }

  if (e.key === "Enter" && editingElement && !isMultiLine(editingElement)) {
    e.preventDefault();
    commitAndExit();
    return;
  }

  e.stopPropagation();
}

function commitAndExit(): void {
  if (!editingElement) return;

  const newText = lastKnownText;
  const changed = newText !== originalTextContent;

  if (changed && componentInfo) {
    pendingCommit = {
      componentInfo,
      originalText: originalTextContent,
      newText,
      originalInnerHTML,
      tagName: componentInfo.tagName,
    };

    send({
      type: "updateText",
      filePath: componentInfo.filePath,
      lineNumber: componentInfo.lineNumber,
      columnNumber: componentInfo.columnNumber,
      originalText: originalTextContent,
      newText,
    });
  }

  exitEditMode();
}

function exitEditMode(): void {
  if (!editingElement) return;

  // Remove listeners BEFORE removeAttribute — removing contenteditable
  // can trigger a synchronous blur event, causing re-entrant commitAndExit
  editingElement.removeEventListener("blur", handleBlur);
  editingElement.removeEventListener("keydown", handleKeydown);
  editingElement.removeEventListener("input", handleInput);

  editingElement.removeAttribute("contenteditable");

  editingElement.style.outline = savedOutline;

  activateInteraction(getActiveTool());

  editingElement = null;
  originalTextContent = "";
  originalInnerHTML = "";
  lastKnownText = "";
  componentInfo = null;
  savedOutline = "";
}

# Inline Text Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Double-click any text element to edit it in-place with contentEditable, persisting changes via AST source write or annotation fallback.

**Architecture:** Self-contained `inline-text-edit.ts` module owns the edit lifecycle. On commit, sends `updateText` WebSocket message to CLI which attempts a position-based AST transform via jscodeshift. If the transform fails (dynamic text), falls back to a `TextEditAnnotation` stored in canvas state for the Generate flow.

**Tech Stack:** TypeScript, jscodeshift (AST transforms), bippy (React fiber resolution), WebSocket, browser contentEditable API

**Spec:** `docs/superpowers/specs/2026-03-24-inline-text-edit-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `packages/shared/src/types.ts` | `updateText` ClientMessage, `updateTextComplete` ServerMessage, `TextEditAnnotation`, updated `Annotation` union, `CanvasUndoAction`, `SerializedAnnotations` |
| `packages/cli/src/transform.ts` | `updateTextContent()` — position-based JSX text replacement |
| `packages/cli/src/__tests__/transform-text.test.ts` | Unit tests for `updateTextContent()` |
| `packages/cli/src/server.ts` | `updateText` WebSocket handler (queue routing + processQueue) |
| `packages/overlay/src/inline-text-edit.ts` | Edit lifecycle: dblclick → contentEditable → commit → persist |
| `packages/overlay/src/canvas-state.ts` | TextEditAnnotation handling, serialization, undo with element re-acquisition |
| `packages/overlay/src/tools-panel.ts` | Suppress keyboard shortcuts during text edit |
| `packages/overlay/src/index.ts` | Init/destroy wiring |

---

### Task 1: Shared Types

Add all new types to the shared package so both CLI and overlay can consume them.

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add `updateText` to `ClientMessage` union**

In `packages/shared/src/types.ts`, find the `ClientMessage` type (line ~54, after the `updateProperties` member). Add before the closing semicolon:

```typescript
  | {
      type: "updateText";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      originalText: string;
      newText: string;
    }
```

- [ ] **Step 2: Add `updateTextComplete` to `ServerMessage` union**

Find `ServerMessage` (line ~74, after the `generateComplete` member). Add before the closing semicolon:

```typescript
  | { type: "updateTextComplete"; success: boolean; error?: string; reason?: string }
```

- [ ] **Step 3: Add `TextEditAnnotation` interface**

After the existing `ColorOverride` interface (line ~220), add:

```typescript
export interface TextEditAnnotation {
  type: "textEdit";
  id: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  originalText: string;
  newText: string;
}
```

- [ ] **Step 4: Update `Annotation` union type**

Find `export type Annotation = DrawAnnotation | TextAnnotation | ColorOverride;` (line ~222). Change to:

```typescript
export type Annotation = DrawAnnotation | TextAnnotation | ColorOverride | TextEditAnnotation;
```

- [ ] **Step 5: Add `textEditRestore` to `CanvasUndoAction`**

Find the `CanvasUndoAction` type (line ~226). Add a new member to the union:

```typescript
  | {
      type: "textEditRestore";
      annotationId: string;
      elementIdentity: ElementIdentity;
      originalInnerHTML: string;
    }
```

This stores the `ElementIdentity` for re-acquiring the element after HMR, and the `originalInnerHTML` for visual restoration.

- [ ] **Step 6: Add `textEdits` to `SerializedAnnotations`**

Find the `SerializedAnnotations` interface (line ~237). Add after the `colorChanges` array:

```typescript
  textEdits: Array<{
    component: string;
    file: string;
    line: number;
    originalText: string;
    newText: string;
  }>;
```

- [ ] **Step 7: Build to verify types compile**

Run: `cd packages/shared && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add inline text edit types — updateText message, TextEditAnnotation, serialization"
```

---

### Task 2: CLI Transform — `updateTextContent()`

Pure function with no DOM dependencies — ideal for TDD. Follows the existing `updateClassName` pattern: parse file with jscodeshift, find JSX element at line:col, manipulate children.

**Files:**
- Create: `packages/cli/src/__tests__/transform-text.test.ts`
- Modify: `packages/cli/src/transform.ts`

**Reference:** Read `packages/cli/src/transform.ts` lines 380-430 for the `updateClassName` pattern — specifically how it finds a JSX element at `lineNumber:columnNumber` using `root.find(j.JSXElement)` and `loc.start.line === lineNumber && loc.start.column === columnNumber`.

- [ ] **Step 1: Write the test file with all test cases**

Create `packages/cli/src/__tests__/transform-text.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { updateTextContent } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

function withTempFile(source: string, ext: string = ".tsx"): string {
  const tmpDir = os.tmpdir();
  const filePath = path.join(tmpDir, `test-text-${Date.now()}${ext}`);
  fs.writeFileSync(filePath, source, "utf-8");
  return filePath;
}

describe("updateTextContent", () => {
  it("replaces JSXText in a simple element", () => {
    // Line 2, column 0 (0-indexed) — the <h1> opening tag
    const source = `function App() {\n  return <h1>Hello World</h1>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Hello World", "Goodbye World");
    expect(result).not.toBeNull();
    expect(result).toContain("Goodbye World");
    expect(result).not.toContain("Hello World");
  });

  it("replaces StringLiteral inside JSXExpressionContainer", () => {
    const source = `function App() {\n  return <button>{"Submit"}</button>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Submit", "Send");
    expect(result).not.toBeNull();
    expect(result).toContain('"Send"');
    expect(result).not.toContain('"Submit"');
  });

  it("returns null when text does not match (dynamic expression)", () => {
    const source = `function App() {\n  return <p>{user.name}</p>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "John", "Jane");
    expect(result).toBeNull();
  });

  it("returns null when no JSX element found at position", () => {
    const source = `function App() {\n  return <p>Hello</p>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 99, 0, "Hello", "World");
    expect(result).toBeNull();
  });

  it("replaces only the first matching text child", () => {
    const source = `function App() {\n  return <div>Hello<span>Hello</span></div>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Hello", "Changed");
    expect(result).not.toBeNull();
    // The direct JSXText child "Hello" should change, but the nested <span>Hello</span> should not
    expect(result).toContain("Changed");
    // The span's content is a child of span, not of div — only direct children are checked
  });

  it("handles empty newText (user deleted all text)", () => {
    const source = `function App() {\n  return <h1>Title</h1>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Title", "");
    expect(result).not.toBeNull();
    expect(result).not.toContain("Title");
  });

  it("handles JSX text with surrounding whitespace", () => {
    // JSXText often has whitespace around it; trimmed comparison should still match
    const source = `function App() {\n  return (\n    <h1>\n      Welcome\n    </h1>\n  );\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 3, 4, "Welcome", "Hello");
    expect(result).not.toBeNull();
    expect(result).toContain("Hello");
  });

  it("handles ternary expressions by returning null", () => {
    const source = `function App() {\n  return <span>{ok ? "Yes" : "No"}</span>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Yes", "Sure");
    expect(result).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/transform-text.test.ts`
Expected: FAIL — `updateTextContent` is not exported from `../transform.js`

- [ ] **Step 3: Implement `updateTextContent`**

In `packages/cli/src/transform.ts`, add this function after the existing `updateClassName` function. Follow the same pattern: read file, parse with jscodeshift, find JSX element at position, manipulate, return source or null.

```typescript
/**
 * Replace text content of a JSX element at the given source position.
 * Returns the new source string, or null if no matching text child was found
 * (signals the overlay to fall back to annotation-based persistence).
 */
export function updateTextContent(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  originalText: string,
  newText: string,
): string | null {
  const source = fs.readFileSync(filePath, "utf-8");
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const quoteStyle = detectQuoteStyle(source);

  // Find JSX element at the given position
  let target: any = null;
  root.find(j.JSXElement).forEach((p) => {
    const loc = p.node.openingElement.loc;
    if (
      loc &&
      loc.start.line === lineNumber &&
      loc.start.column === columnNumber
    ) {
      target = p;
    }
  });

  if (!target) return null;

  // Walk direct children to find matching text
  const children = target.node.children;
  if (!children) return null;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    // Case 1: JSXText node
    if (child.type === "JSXText") {
      if (child.value.trim() === originalText.trim()) {
        // Preserve surrounding whitespace structure, replace the trimmed content
        child.value = child.value.replace(child.value.trim(), newText);
        return root.toSource({ quote: quoteStyle });
      }
    }

    // Case 2: JSXExpressionContainer with StringLiteral
    if (
      child.type === "JSXExpressionContainer" &&
      child.expression.type === "StringLiteral" &&
      child.expression.value === originalText
    ) {
      child.expression.value = newText;
      return root.toSource({ quote: quoteStyle });
    }
  }

  // No matching child found — signal fallback
  return null;
}
```

**Note:** The `getParser` helper already exists in `transform.ts` — it selects `tsx` or `babel` parser based on file extension.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/transform-text.test.ts`
Expected: All 8 tests PASS

- [ ] **Step 5: Fix any failing tests**

The line/column numbers in the test fixtures may need adjustment based on how jscodeshift counts positions. If tests fail:
- jscodeshift uses 1-based lines, 0-based columns
- Check what `loc.start.line` and `loc.start.column` report for each fixture
- Adjust test fixture line/column values accordingly

Run again until all pass.

- [ ] **Step 6: Commit**

```bash
git add packages/cli/src/__tests__/transform-text.test.ts packages/cli/src/transform.ts
git commit -m "feat(cli): add updateTextContent AST transform for inline text editing"
```

---

### Task 3: CLI Server Handler

Add the `updateText` WebSocket message handler. Follows the exact same pattern as `updateProperty`: path safety check → read file → push undo → transform → write or pop undo.

**Files:**
- Modify: `packages/cli/src/server.ts`

**Reference:** Read `packages/cli/src/server.ts` lines 135-166 (the `updateProperty` handler) — copy this pattern exactly.

- [ ] **Step 1: Add import for `updateTextContent`**

At the top of `packages/cli/src/server.ts`, find the existing import from `"./transform.js"` (line ~12-13):

```typescript
import { reorderComponent, getSiblings } from "./transform.js";
import { updateClassName } from "./transform.js";
```

Add `updateTextContent` to the second import:

```typescript
import { updateClassName, updateTextContent } from "./transform.js";
```

- [ ] **Step 2: Add `updateText` handler in `processQueue` switch**

In the `processQueue` function, after the `updateProperties` case (line ~202, before the closing `}` of the switch), add:

```typescript
        case "updateText": {
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "updateTextComplete", success: false, error: "File path is outside the project root" });
            break;
          }
          const resolvedTextPath = resolveFilePath(msg.filePath, projectRoot);
          const prevContent = fs.readFileSync(resolvedTextPath, "utf-8");
          undoStack.push({ filePath: resolvedTextPath, content: prevContent, timestamp: Date.now() });
          try {
            const newSource = updateTextContent(
              resolvedTextPath,
              msg.lineNumber,
              msg.columnNumber,
              msg.originalText,
              msg.newText,
            );
            if (newSource !== null) {
              fs.writeFileSync(resolvedTextPath, newSource, "utf-8");
              send(ws, { type: "updateTextComplete", success: true });
            } else {
              // No matching text child — pop undo, signal fallback to annotation
              undoStack.pop();
              send(ws, { type: "updateTextComplete", success: false, reason: "no-match" });
            }
          } catch (err) {
            undoStack.pop();
            send(ws, {
              type: "updateTextComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          break;
        }
```

- [ ] **Step 3: Add `updateText` to queue routing**

Find the fall-through cases in the `ws.on("message")` handler (line ~313-319):

```typescript
        case "reorder":
        case "undo":
        case "updateProperty":
        case "updateProperties":
          // Sequential processing
          queue.push({ msg, ws });
          processQueue();
          break;
```

Add `"updateText"` to the fall-through:

```typescript
        case "reorder":
        case "undo":
        case "updateProperty":
        case "updateProperties":
        case "updateText":
          // Sequential processing
          queue.push({ msg, ws });
          processQueue();
          break;
```

- [ ] **Step 4: Build to verify compilation**

Run: `cd packages/cli && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(cli): add updateText WebSocket handler with undo support"
```

---

### Task 4: Canvas State — TextEditAnnotation Handling

Add `TextEditAnnotation` support to canvas state: serialization, undo with HMR-safe element re-acquisition.

**Files:**
- Modify: `packages/overlay/src/canvas-state.ts`

**Reference:** Read `packages/overlay/src/canvas-state.ts` — specifically `addAnnotation()` (line ~111), `canvasUndo()` (line ~174), `hasChanges()` (line ~300), `serializeAnnotations()` (line ~310). Also read `packages/overlay/src/move-state.ts` lines 102-130 for the `reacquireMovedElement` pattern using `ElementIdentity`.

- [ ] **Step 1: Update imports**

In `packages/overlay/src/canvas-state.ts`, find the imports from `@frameup/shared` (line ~4):

```typescript
import type {
  ToolType, Annotation, DrawAnnotation, TextAnnotation, ColorOverride,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
} from "@frameup/shared";
```

Add `TextEditAnnotation` and `ElementIdentity`:

```typescript
import type {
  ToolType, Annotation, DrawAnnotation, TextAnnotation, ColorOverride,
  TextEditAnnotation, ElementIdentity,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
} from "@frameup/shared";
```

- [ ] **Step 2: Add element re-acquisition import**

Add import for the existing `reacquireMovedElement` function from move-state:

```typescript
import { reacquireMovedElement } from "./move-state.js";
```

- [ ] **Step 3: Export `addTextEditAnnotation` function**

After the existing `addAnnotation` function (line ~126), add a specialized function for text edit annotations that stores the `ElementIdentity` for HMR-safe undo:

```typescript
export function addTextEditAnnotation(
  ann: TextEditAnnotation,
  elementIdentity: ElementIdentity,
  originalInnerHTML: string,
): void {
  annotations.push(ann);
  undoStack.push({
    type: "textEditRestore",
    annotationId: ann.id,
    elementIdentity,
    originalInnerHTML,
  });
  notifyStateChange();
}
```

- [ ] **Step 4: Add `textEditRestore` undo handler**

In the `canvasUndo()` function (line ~174), find the switch statement. Add a new case after `"propertyChange"`:

```typescript
    case "textEditRestore": {
      // Re-acquire element (survives HMR) and restore original HTML
      const el = reacquireMovedElement(action.elementIdentity);
      if (el) {
        el.innerHTML = action.originalInnerHTML;
      }
      // Use removeAnnotation to trigger annotationRemovedCallback (consistent with other undo paths)
      removeAnnotation(action.annotationId);
      return "text edit reverted";
    }
```

Note: `removeAnnotation` already calls `notifyStateChange()` internally, so no separate call needed. This matches the `"annotationAdd"` and `"colorChange"` undo patterns which also use `removeAnnotation()`.

- [ ] **Step 5: Update `serializeAnnotations` to include text edits**

In the `serializeAnnotations()` function, find the existing for-loop over `annotations` (line ~341) that builds `anns` and `colorChanges`. Add a `textEdits` array before the loop, and add a `"textEdit"` case **inside the existing loop** (not a separate loop):

```typescript
  const textEdits: SerializedAnnotations["textEdits"] = [];

  // Inside the EXISTING for-loop, add this else-if after the colorChange case:
    } else if (ann.type === "textEdit") {
      textEdits.push({
        component: ann.componentName,
        file: ann.filePath,
        line: ann.lineNumber,
        originalText: ann.originalText,
        newText: ann.newText,
      });
    }
```

Then update the return statement to include `textEdits`:

```typescript
  return { moves: serializedMoves, annotations: anns, colorChanges, textEdits };
```

- [ ] **Step 6: Update `hasChanges` to check text edit annotations**

The existing `hasChanges()` already checks `annotations.length > 0`, and `TextEditAnnotation` is now part of the `Annotation` union. No code change needed here — text edit annotations in the array will naturally make `hasChanges()` return true. Verify this is the case by reading the function.

- [ ] **Step 7: Update the empty-check in `index.ts`**

In `packages/overlay/src/index.ts`, find the generate guard (line ~278):

```typescript
    if (!data.moves.length && !data.annotations.length && !data.colorChanges.length) {
```

Add `textEdits` check:

```typescript
    if (!data.moves.length && !data.annotations.length && !data.colorChanges.length && !data.textEdits.length) {
```

- [ ] **Step 8: Build overlay to verify**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors (may need to fix type imports)

- [ ] **Step 9: Commit**

```bash
git add packages/overlay/src/canvas-state.ts packages/overlay/src/index.ts
git commit -m "feat(overlay): add TextEditAnnotation to canvas state with HMR-safe undo"
```

---

### Task 5: Inline Text Edit Module

The core module — contentEditable lifecycle, double-click handling, persistence routing.

**Files:**
- Create: `packages/overlay/src/inline-text-edit.ts`

**Reference:**
- Read `packages/overlay/src/selection.ts` lines 50-144 for component resolution patterns (`resolveComponentSync`, `getFiberFromHostInstance`)
- Read `packages/overlay/src/interaction.ts` lines 62-68 for `activateInteraction` and lines 95-99 for `setInteractionPointerEvents`
- Read `packages/overlay/src/canvas-state.ts` for `getActiveTool`
- Read `packages/overlay/src/design-tokens.ts` for `COLORS`

- [ ] **Step 1: Create the module with blocklist, state, and exports**

Create `packages/overlay/src/inline-text-edit.ts`:

```typescript
import type { ClientMessage, ServerMessage, ComponentInfo, ElementIdentity, TextEditAnnotation } from "@frameup/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import { send, onMessage } from "./bridge.js";
import { COLORS } from "./design-tokens.js";
import { setInteractionPointerEvents, activateInteraction, getPageElementAtPoint } from "./interaction.js";
import { getActiveTool } from "./canvas-state.js";
import { addTextEditAnnotation } from "./canvas-state.js";

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
  // Register persistent message handler for updateTextComplete responses
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

function handleUpdateTextResponse(msg: { success: boolean; reason?: string }): void {
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
```

- [ ] **Step 2: Add multi-line detection helper**

Append to the same file:

```typescript
function isMultiLine(el: HTMLElement): boolean {
  // Check 1: scrollable overflow
  if (el.scrollHeight > el.clientHeight + 4) return true;
  // Check 2: contains <br>
  if (el.querySelector("br")) return true;
  // Check 3: multiple line boxes with wrapping enabled
  const style = getComputedStyle(el);
  if (style.whiteSpace !== "nowrap" && el.getClientRects().length > 1) return true;
  return false;
}
```

- [ ] **Step 3: Add component resolution helper**

Append to the same file. Uses the sync fiber walk pattern from `selection.ts`:

This mirrors `selection.ts`'s `resolveComponentFromFiberWalk` exactly — uses `getDisplayName(current.type)` (not `current`), checks `_debugOwner` fallback, and filters for user-space component names. Imports `isInternalName` from the canonical location (same as selection.ts and resolve-helper.ts).

Add to the imports at the top of the file (Step 1):

```typescript
import { isInternalName } from "./utils/component-filter.js";
```

Then add the resolve function:

```typescript
/**
 * Synchronous component resolution via fiber walk.
 * Matches selection.ts:resolveComponentFromFiberWalk pattern:
 *   - getDisplayName(current.type) — NOT getDisplayName(current)
 *   - _debugSource || _debugOwner?._debugSource — NOT just _debugSource
 */
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
      current = current.return;
    }
  } catch {
    // Fiber resolution can fail — not all elements are in React tree
  }
  return null;
}
```

- [ ] **Step 4: Add double-click handler and target resolution**

Append to the same file:

```typescript
function handleDblClick(e: MouseEvent): void {
  // If already editing, commit current edit first
  if (editingElement) {
    commitAndExit();
  }

  // Resolve target: prefer event target, fall back to hit-test
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

  // Skip blocked elements
  if (BLOCKED_TAGS.has(target.tagName)) return;

  // Skip elements with no visible text
  if (!target.textContent?.trim()) return;

  enterEditMode(target);
}
```

- [ ] **Step 5: Add `enterEditMode`**

Append to the same file:

```typescript
function enterEditMode(element: HTMLElement): void {
  editingElement = element;

  // Snapshot BEFORE any modifications
  originalTextContent = element.textContent || "";
  originalInnerHTML = element.innerHTML;
  lastKnownText = originalTextContent;

  // Resolve component info
  componentInfo = resolveComponent(element);

  // Visual indicator
  savedOutline = element.style.outline;
  element.style.outline = `2px solid ${COLORS.accent}`;

  // Enable editing
  element.contentEditable = "true";

  // Disable interaction layer
  setInteractionPointerEvents(false);

  // Focus and set selection
  element.focus();
  if (!isMultiLine(element)) {
    // Single-line: select all text
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.selectAllChildren(element);
    }
  }
  // Multi-line: browser's native double-click word selection stands

  // Register listeners
  element.addEventListener("blur", handleBlur);
  element.addEventListener("keydown", handleKeydown);
  element.addEventListener("input", handleInput);
}
```

- [ ] **Step 6: Add event handlers and `commitAndExit` / `exitEditMode`**

Append to the same file:

```typescript
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

  // Stop propagation to prevent FrameUp shortcuts (tool switching etc.)
  // but let the event reach the element for normal typing
  e.stopPropagation();
}

function commitAndExit(): void {
  if (!editingElement) return;

  const newText = lastKnownText;
  const changed = newText !== originalTextContent;

  if (changed && componentInfo) {
    // Store pending commit data — handleUpdateTextResponse will use this
    // if the AST write fails (no-match response triggers annotation fallback)
    pendingCommit = {
      componentInfo,
      originalText: originalTextContent,
      newText,
      originalInnerHTML,
      tagName: componentInfo.tagName,
    };

    // Send AST write request via bridge.ts
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

  // Remove contentEditable
  editingElement.removeAttribute("contenteditable");

  // Restore outline
  editingElement.style.outline = savedOutline;

  // Remove listeners
  editingElement.removeEventListener("blur", handleBlur);
  editingElement.removeEventListener("keydown", handleKeydown);
  editingElement.removeEventListener("input", handleInput);

  // Restore interaction layer to tool-appropriate state
  activateInteraction(getActiveTool());

  // Clear state
  editingElement = null;
  originalTextContent = "";
  originalInnerHTML = "";
  lastKnownText = "";
  componentInfo = null;
  savedOutline = "";
}
```

- [ ] **Step 7: Build overlay to verify compilation**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors. If there are import issues (e.g., `activateInteraction` not exported from interaction.ts), fix the imports. Check that `activateInteraction` accepts a `ToolType` or `string` parameter.

- [ ] **Step 8: Commit**

```bash
git add packages/overlay/src/inline-text-edit.ts
git commit -m "feat(overlay): add inline-text-edit module — contentEditable lifecycle and persistence routing"
```

---

### Task 6: Integration — tools-panel, index.ts

Wire everything together: suppress shortcuts during editing, init/destroy the module.

**Files:**
- Modify: `packages/overlay/src/tools-panel.ts`
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Suppress shortcuts in tools-panel.ts**

In `packages/overlay/src/tools-panel.ts`, add the import at the top (after existing imports, line ~7):

```typescript
import { isTextEditing } from "./inline-text-edit.js";
```

Find the `handleToolShortcut` function (line ~432). Add after the existing HTMLInputElement/HTMLTextAreaElement check (line ~435):

```typescript
  if (isTextEditing()) return;
```

So the function starts:

```typescript
function handleToolShortcut(e: KeyboardEvent): void {
  // Suppress shortcuts when text input is focused
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
  if (isTextEditing()) return;
  // ... rest of function
```

- [ ] **Step 2: Wire init/destroy in index.ts**

In `packages/overlay/src/index.ts`, add the import (after existing imports):

```typescript
import { initInlineTextEdit, destroyInlineTextEdit } from "./inline-text-edit.js";
```

Find the init sequence. After `initToolsPanel(...)` (line ~214), add:

```typescript
  initInlineTextEdit();
```

No WebSocket message routing needed in `index.ts` — the `inline-text-edit.ts` module imports `send` and `onMessage` directly from `bridge.js` (same pattern as `drag.ts`, `toolbar.ts`, and other overlay modules). The persistent message handler registered in `initInlineTextEdit()` handles `updateTextComplete` responses automatically.

- [ ] **Step 3: Add destroy call**

In the destroy sequence (line ~343), after `destroyToolsPanel()`, add:

```typescript
  destroyInlineTextEdit();
```

- [ ] **Step 4: Build the full project**

Run: `pnpm build`
Expected: Clean build with no errors

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools-panel.ts packages/overlay/src/index.ts packages/overlay/src/inline-text-edit.ts
git commit -m "feat: wire inline text editing — shortcut suppression, init/destroy, message routing"
```

---

### Task 7: Manual Testing & Polish

Test the full flow end-to-end in the test app.

**Files:**
- Possibly modify any file from Tasks 1-6 for bug fixes

- [ ] **Step 1: Start the test environment**

```bash
# Terminal 1: Start test app
cd test-app && pnpm dev

# Terminal 2: Build overlay and start CLI in watch mode
pnpm dev

# Terminal 3: Launch FrameUp against the test app
cd test-app && node ../packages/cli/bin/frameup.js 3000
```

- [ ] **Step 2: Test basic inline editing**

1. Double-click a heading (`<h1>`) in the test app
2. Verify: element gets purple outline, text is selected, cursor is active
3. Type new text
4. Click away (blur) — verify text persists
5. Check the source file — verify the JSX text was updated

- [ ] **Step 3: Test keyboard behavior**

1. Double-click a single-line element (button, heading)
2. Press Enter — verify it commits (exits edit mode)
3. Double-click a multi-line element (paragraph)
4. Press Enter — verify it inserts a newline (stays in edit mode)
5. Press Escape — verify it commits and exits

- [ ] **Step 4: Test tool shortcut suppression**

1. Double-click to enter edit mode
2. Press `v` (pointer tool shortcut) — verify tool does NOT switch
3. Press `m` (move tool shortcut) — verify tool does NOT switch
4. Click away to exit edit mode
5. Press `v` — verify tool switching works again

- [ ] **Step 5: Test annotation fallback**

1. Find a dynamic text element (e.g., `{user.name}` or `{count}`)
2. Double-click it
3. Edit the text
4. Click away
5. Verify no error — text should visually update, and a TextEditAnnotation should be stored (check via the Generate flow or console logging)

- [ ] **Step 6: Test double-click while editing**

1. Double-click element A to enter edit mode
2. While still editing A, double-click element B
3. Verify: A commits and exits, B enters edit mode

- [ ] **Step 7: Fix any issues found and commit**

```bash
git add -A
git commit -m "fix: address issues found during inline text edit manual testing"
```

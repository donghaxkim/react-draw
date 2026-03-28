import { afterEach, describe, expect, it } from "vitest";
import { addMove, getMoveContainingElement, hasMoveForElement, resetCanvas } from "../canvas-state.js";
import type { MoveEntry } from "../move-state.js";

function createFakeElement(): HTMLElement {
  return {
    style: { cssText: "", transform: "" },
  } as unknown as HTMLElement;
}

function createMoveEntry(element: HTMLElement): MoveEntry {
  return {
    id: crypto.randomUUID(),
    componentRef: {
      componentName: "Card",
      filePath: "Card.tsx",
      lineNumber: 10,
      columnNumber: 1,
    },
    element,
    placeholder: null,
    originalRect: {} as DOMRect,
    delta: { dx: 0, dy: 0 },
    originalCssText: "",
    existingTransform: "",
    identity: {
      componentName: "Card",
      filePath: "Card.tsx",
      lineNumber: 10,
      columnNumber: 1,
      tagName: "div",
    },
  };
}

afterEach(() => {
  resetCanvas();
});

describe("moved element hit testing", () => {
  it("matches only the exact moved element", () => {
    const moved = createFakeElement();
    const child = createFakeElement();

    addMove(createMoveEntry(moved));

    expect(hasMoveForElement(moved)).toBe(true);
    expect(hasMoveForElement(child)).toBe(false);
    expect(getMoveContainingElement(moved)?.element).toBe(moved);
    expect(getMoveContainingElement(child)).toBeUndefined();
  });
});

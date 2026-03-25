import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock bridge before import
vi.mock("../bridge.js", () => ({
  send: vi.fn(),
  onApplyAllComplete: vi.fn(),
}));
vi.mock("../toolbar.js", () => ({
  showToast: vi.fn(),
}));
vi.mock("../changelog.js", () => ({
  addChangeEntry: vi.fn(),
  promoteAllPending: vi.fn(),
  removeAllPending: vi.fn(),
}));

import { addToPending, pendingCount, clearAll, getAllPending, discardAll } from "../pending-changes.js";
import type { ApplyChange } from "@frameup/shared";

describe("pending-changes store", () => {
  beforeEach(() => {
    clearAll();
  });

  it("adds a change and increments count", () => {
    const change: ApplyChange = {
      type: "text",
      componentName: "Hero",
      tag: "p",
      filePath: "src/Hero.tsx",
      className: "text-lg",
      nthOfType: 1,
      parentTag: "section",
      parentClassName: "hero",
      lineHint: 10,
      originalText: "Hello",
      newText: "World",
    };
    addToPending(change);
    expect(pendingCount()).toBe(1);
  });

  it("merges property updates on the same element", () => {
    const base = {
      type: "property" as const,
      componentName: "Button",
      tag: "button",
      filePath: "src/Button.tsx",
      textContent: "Submit",
      className: "bg-red-500 p-2",
      nthOfType: 1,
      parentTag: "form",
      parentClassName: "flex",
      lineHint: 5,
    };
    addToPending({ ...base, updates: [{ cssProperty: "background-color", tailwindPrefix: "bg", tailwindToken: "bg-blue-500", value: "#3b82f6", oldClass: "bg-red-500", newClass: "bg-blue-500", relatedOldClasses: [] }] });
    addToPending({ ...base, updates: [{ cssProperty: "padding", tailwindPrefix: "p", tailwindToken: "p-4", value: "16px", oldClass: "p-2", newClass: "p-4", relatedOldClasses: [] }] });
    expect(pendingCount()).toBe(1);
    const all = getAllPending();
    expect(all[0].type === "property" && all[0].updates.length).toBe(2);
  });

  it("clearAll resets count to 0", () => {
    addToPending({
      type: "text",
      componentName: "X",
      tag: "p",
      filePath: "src/X.tsx",
      className: "",
      nthOfType: 1,
      parentTag: "div",
      parentClassName: "",
      lineHint: 1,
      originalText: "a",
      newText: "b",
    });
    expect(pendingCount()).toBe(1);
    clearAll();
    expect(pendingCount()).toBe(0);
  });

  it("rejects changes with empty filePath", () => {
    addToPending({
      type: "text",
      componentName: "X",
      tag: "p",
      filePath: "",
      className: "",
      nthOfType: 1,
      parentTag: "div",
      parentClassName: "",
      lineHint: 1,
      originalText: "a",
      newText: "b",
    });
    expect(pendingCount()).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { buildApplyPrompt } from "../claude-apply.js";

describe("buildApplyPrompt", () => {
  it("builds property change prompt with className locator", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "property",
        componentName: "Button",
        tag: "button",
        filePath: "src/Button.tsx",
        textContent: "Submit",
        className: "bg-red-500 p-2",
        nthOfType: 1,
        parentTag: "form",
        parentClassName: "flex flex-col",
        lineHint: 10,
        updates: [{
          cssProperty: "background-color",
          tailwindPrefix: "bg",
          tailwindToken: "bg-blue-500",
          value: "#3b82f6",
          oldClass: "bg-red-500",
          newClass: "bg-blue-500",
          relatedOldClasses: [],
        }],
      }],
      new Map([["src/Button.tsx", 'export function Button() {\n  return <button className="bg-red-500 p-2">Submit</button>;\n}']]),
    );
    expect(prompt).toContain("src/Button.tsx");
    expect(prompt).toContain("bg-red-500");
    expect(prompt).toContain("bg-blue-500");
    expect(prompt).toContain("Button");
  });

  it("builds text change prompt for classless element", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "text",
        componentName: "Hero",
        tag: "p",
        filePath: "src/Hero.tsx",
        className: "",
        nthOfType: 2,
        parentTag: "section",
        parentClassName: "hero-content",
        lineHint: 15,
        originalText: "Founded in 2024",
        newText: "Founded in 2025",
      }],
      new Map([["src/Hero.tsx", "..."]]),
    );
    expect(prompt).toContain("2nd <p>");
    expect(prompt).toContain("hero-content");
    expect(prompt).toContain("Founded in 2024");
    expect(prompt).toContain("Founded in 2025");
  });

  it("builds move prompt with delta and resolved classes", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "move",
        componentName: "Card",
        tag: "div",
        filePath: "src/Card.tsx",
        className: "p-4 rounded",
        nthOfType: 1,
        parentTag: "section",
        parentClassName: "grid",
        lineHint: 8,
        delta: { dx: 16, dy: 0 },
        resolvedDx: "ml-4",
        resolvedDy: null,
      }],
      new Map([["src/Card.tsx", "..."]]),
    );
    expect(prompt).toContain("Move");
    expect(prompt).toContain("ml-4");
    expect(prompt).toContain("16px right");
  });

  it("builds prompt for classless element using structural locator", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "text",
        componentName: "About",
        tag: "p",
        filePath: "src/About.tsx",
        className: "",
        nthOfType: 3,
        parentTag: "div",
        parentClassName: "content-wrapper",
        lineHint: 20,
        originalText: "Old text",
        newText: "New text",
      }],
      new Map([["src/About.tsx", "..."]]),
    );
    expect(prompt).toContain("3rd <p>");
    expect(prompt).toContain("content-wrapper");
    expect(prompt).toContain("No className");
  });

  it("builds reorder prompt with child context", () => {
    const prompt = buildApplyPrompt(
      [{
        type: "reorder",
        componentName: "Dashboard",
        tag: "div",
        filePath: "src/Dashboard.tsx",
        parentClassName: "grid grid-cols-3",
        lineHint: 5,
        childrenContext: [
          { tag: "StatsCard", className: "p-6", textContent: "Stats" },
          { tag: "Chart", className: "col-span-2", textContent: "" },
        ],
        fromIndex: 1,
        toIndex: 0,
      }],
      new Map([["src/Dashboard.tsx", "..."]]),
    );
    expect(prompt).toContain("Reorder");
    expect(prompt).toContain("grid grid-cols-3");
    expect(prompt).toContain("StatsCard");
  });
});

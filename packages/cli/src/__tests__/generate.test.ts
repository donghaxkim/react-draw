import { describe, it, expect, vi } from "vitest";
import { parseDiffResponse, resolveReplacementOffset, validateDiffChange, applyReplacements } from "../generate.js";

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, existsSync: vi.fn(() => true) };
});

describe("parseDiffResponse", () => {
  it("parses SEARCH/REPLACE with LINES directive", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].filePath).toBe("src/App.tsx");
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
  });

  it("parses multiple SEARCH/REPLACE blocks with different LINES", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
LINES: 12-14
<<<<<<< SEARCH
<Card className="mt-2">
=======
<Card className="mt-4">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated spacing.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(2);
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
    expect(changes[0].replacements[1].lines).toEqual({ start: 12, end: 14 });
  });

  it("fallback: parses SEARCH/REPLACE without LINES directive", () => {
    const response = `FILE: src/App.tsx
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toBeUndefined();
  });

  it("returns empty array for empty response", () => {
    expect(parseDiffResponse("")).toEqual([]);
  });

  it("returns empty array for response with only DESCRIPTION", () => {
    const response = `DESCRIPTION: src/App.tsx
No changes needed.`;
    expect(parseDiffResponse(response)).toEqual([]);
  });

  it("merges replacements when same file appears in two FILE sections", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button>A</Button>
=======
<Button>B</Button>
>>>>>>> REPLACE
FILE: src/App.tsx
LINES: 20-22
<<<<<<< SEARCH
<Card>X</Card>
=======
<Card>Y</Card>
>>>>>>> REPLACE`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].filePath).toBe("src/App.tsx");
    expect(changes[0].replacements).toHaveLength(2);
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
    expect(changes[0].replacements[1].lines).toEqual({ start: 20, end: 22 });
  });
});

describe("resolveReplacementOffset", () => {
  const content = [
    '<div>',                   // line 1
    '  <Button>A</Button>',    // line 2
    '  <Card>X</Card>',        // line 3
    '  <Button>A</Button>',    // line 4
    '</div>',                  // line 5
  ].join('\n');

  it("single occurrence — returns offset regardless of lines", () => {
    const offset = resolveReplacementOffset(content, '<Card>X</Card>', { start: 3, end: 3 });
    expect(offset).toBe(content.indexOf('<Card>X</Card>'));
  });

  it("single occurrence — returns offset even with no lines", () => {
    const offset = resolveReplacementOffset(content, '<Card>X</Card>', undefined);
    expect(offset).toBe(content.indexOf('<Card>X</Card>'));
  });

  it("multiple occurrences — disambiguates by line range", () => {
    const search = '<Button>A</Button>';
    const firstOffset = content.indexOf(search);
    const secondOffset = content.indexOf(search, firstOffset + 1);

    expect(resolveReplacementOffset(content, search, { start: 2, end: 2 })).toBe(firstOffset);
    expect(resolveReplacementOffset(content, search, { start: 4, end: 4 })).toBe(secondOffset);
  });

  it("multiple occurrences — no lines → returns -1 (ambiguous)", () => {
    const offset = resolveReplacementOffset(content, '<Button>A</Button>', undefined);
    expect(offset).toBe(-1);
  });

  it("no occurrences — returns -1", () => {
    const offset = resolveReplacementOffset(content, '<NotHere>', { start: 1, end: 5 });
    expect(offset).toBe(-1);
  });

  it("multiple occurrences — lines don't match any → returns -1", () => {
    const offset = resolveReplacementOffset(content, '<Button>A</Button>', { start: 99, end: 99 });
    expect(offset).toBe(-1);
  });
});

describe("validateDiffChange", () => {
  it("single occurrence without lines — valid", () => {
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",
        replacements: [{ search: "<Card>", replace: "<Card large>", lines: undefined }],
        description: "",
      },
      "export default function App() {\n  return <Card>;\n}",
      "/project",
    );
    expect(result).toBeNull();
  });

  it("multiple occurrences without lines — rejects", () => {
    const content = "<Button>A</Button>\n<Button>A</Button>";
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",
        replacements: [{ search: "<Button>A</Button>", replace: "<Button>B</Button>", lines: undefined }],
        description: "",
      },
      content,
      "/project",
    );
    expect(result).toContain("matches 2 locations");
  });

  it("multiple occurrences with lines — disambiguates", () => {
    const content = "<Button>A</Button>\n<Button>A</Button>";
    const result = validateDiffChange(
      {
        filePath: "src/App.txt",
        replacements: [{ search: "<Button>A</Button>", replace: "<Button>B</Button>", lines: { start: 2, end: 2 } }],
        description: "",
      },
      content,
      "/project",
    );
    expect(result).toBeNull();
  });
});

describe("applyReplacements", () => {
  it("applies single replacement", () => {
    const original = '<Button className="px-2">';
    const result = applyReplacements(original, [
      { search: 'className="px-2"', replace: 'className="px-6"', lines: { start: 1, end: 1 } },
    ]);
    expect(result).toBe('<Button className="px-6">');
  });

  it("applies multiple replacements in reverse-offset order", () => {
    const original = '<div>\n  <A>first</A>\n  <B>second</B>\n</div>';
    const result = applyReplacements(original, [
      { search: '<A>first</A>', replace: '<A>changed-first</A>', lines: { start: 2, end: 2 } },
      { search: '<B>second</B>', replace: '<B>changed-second</B>', lines: { start: 3, end: 3 } },
    ]);
    expect(result).toBe('<div>\n  <A>changed-first</A>\n  <B>changed-second</B>\n</div>');
  });

  it("disambiguates duplicate blocks using lines", () => {
    const original = '<Button>A</Button>\n<Button>A</Button>';
    const result = applyReplacements(original, [
      { search: '<Button>A</Button>', replace: '<Button>B</Button>', lines: { start: 2, end: 2 } },
    ]);
    expect(result).toBe('<Button>A</Button>\n<Button>B</Button>');
  });

  it("fallback: single occurrence without lines applies normally", () => {
    const original = '<Card>unique</Card>\n<Button>other</Button>';
    const result = applyReplacements(original, [
      { search: '<Card>unique</Card>', replace: '<Card>changed</Card>', lines: undefined },
    ]);
    expect(result).toBe('<Card>changed</Card>\n<Button>other</Button>');
  });

  it("handles length-changing replacements correctly (insertion + deletion)", () => {
    const original = '<div>\n  <Short>x</Short>\n  <VeryLongTagName>content</VeryLongTagName>\n</div>';
    const result = applyReplacements(original, [
      { search: '<Short>x</Short>', replace: '<Short>this is now much longer text</Short>', lines: { start: 2, end: 2 } },
      { search: '<VeryLongTagName>content</VeryLongTagName>', replace: '<V>c</V>', lines: { start: 3, end: 3 } },
    ]);
    expect(result).toBe('<div>\n  <Short>this is now much longer text</Short>\n  <V>c</V>\n</div>');
  });
});

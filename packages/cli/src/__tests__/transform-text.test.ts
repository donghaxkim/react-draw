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

function applyTextEdit(filePath: string, line: number, col: number, originalText: string, newText: string): string | null {
  const result = updateTextContent(filePath, line, col, originalText, newText);
  if (result) {
    fs.writeFileSync(filePath, result, "utf-8");
  }
  return result;
}

function findTagPosition(source: string, tagName: string): { line: number; col: number } {
  const marker = `<${tagName}`;
  const index = source.indexOf(marker);
  if (index === -1) {
    throw new Error(`Tag <${tagName}> not found`);
  }

  const before = source.slice(0, index);
  const lines = before.split("\n");
  return {
    line: lines.length,
    col: lines[lines.length - 1].length,
  };
}

describe("updateTextContent", () => {
  it("replaces JSXText in a simple element", () => {
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
    expect(result).toContain("Changed");
  });

  it("handles empty newText (user deleted all text)", () => {
    const source = `function App() {\n  return <h1>Title</h1>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Title", "");
    expect(result).not.toBeNull();
    expect(result).not.toContain("Title");
  });

  it("handles JSX text with surrounding whitespace", () => {
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

  it("preserves boundary spaces when replacing text across nested elements", () => {
    const source = `function App() {\n  return (\n    <p>\n      i study <strong>math</strong> at <strong>waterloo</strong>\n      and do <strong>software</strong> stuff.\n    </p>\n  );\n}`;
    const filePath = withTempFile(source);

    const result = applyTextEdit(
      filePath,
      3,
      4,
      "i study math at waterloo and do software stuff.",
      "i study math at waterloo and enjoy software.",
    );

    expect(result).not.toBeNull();
    expect(result).toContain('<strong>math</strong>{" "}at{" "}<strong>waterloo</strong>{" "}and enjoy software.');
  });

  it("supports deleting a space at a JSX child boundary", () => {
    const source = `function App() {\n  return (\n    <p>\n      hello <strong>world</strong>\n      again\n    </p>\n  );\n}`;
    const filePath = withTempFile(source);

    const result = applyTextEdit(filePath, 3, 4, "hello world again", "hello worldagain");

    expect(result).not.toBeNull();
    expect(result).toContain("</strong>again");
  });

  it("supports inserting a space at a JSX child boundary", () => {
    const source = `function App() {\n  return (\n    <p>hello <strong>world</strong>again</p>\n  );\n}`;
    const filePath = withTempFile(source);

    const result = applyTextEdit(filePath, 3, 4, "hello worldagain", "hello world again");

    expect(result).not.toBeNull();
    expect(result).toContain('</strong>{" "}again');
  });

  it("supports inserting an extra space at an existing child boundary", () => {
    const source = `function App() {\n  return (\n    <p>hello <strong>world</strong> again</p>\n  );\n}`;
    const filePath = withTempFile(source);

    const result = applyTextEdit(filePath, 3, 4, "hello world again", "hello world  again");

    expect(result).not.toBeNull();
    expect(result).toContain('</strong>{" "}{" "}again');
  });

  it("supports inserting an extra space in plain text without moving another space", () => {
    const source = `function App() {\n  return <p>alpha beta gamma</p>;\n}`;
    const filePath = withTempFile(source);

    const result = applyTextEdit(filePath, 2, 9, "alpha beta gamma", "alpha  beta gamma");

    expect(result).not.toBeNull();
    expect(result).toContain("alpha  beta gamma");
  });

  it("keeps spaces intact across sequential edits", () => {
    const source = `function App() {\n  return (\n    <p>\n      hello <strong>world</strong>\n      again\n    </p>\n  );\n}`;
    const filePath = withTempFile(source);

    const first = applyTextEdit(filePath, 3, 4, "hello world again", "hello worldagain");
    expect(first).not.toBeNull();

    const pos = findTagPosition(fs.readFileSync(filePath, "utf-8"), "p");
    const second = applyTextEdit(filePath, pos.line, pos.col, "hello worldagain", "hello worldlater");
    expect(second).not.toBeNull();
    expect(second).toContain("</strong>later");
  });
});

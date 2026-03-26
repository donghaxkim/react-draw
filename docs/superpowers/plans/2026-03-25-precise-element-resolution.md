# Precise Element Resolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace fuzzy weighted scoring in batch-transform.ts with a deterministic resolution chain that either finds the exact JSX element or fails loudly, plus fix negative margin class conflicts for moves.

**Architecture:** The overlay captures a richer element fingerprint at selection time (tagName, className, parentTagName, parentClassName, nthOfType, id, jsxKey, fileMtime, fileSize). The CLI resolves elements through a strict chain: staleness check → exact line:col → component-scoped scan → jsxKey → nthOfType+parent → fail. Move operations clean up both positive and negative margin variants before applying.

**Tech Stack:** jscodeshift (AST), bippy (React fiber), WebSocket protocol, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-25-precise-element-resolution-design.md`

---

### Task 1: Add fileStat message types and extend BatchOperation

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add fileStat message types**

Add to `ClientMessage` union:

```typescript
| { type: "fileStat"; filePath: string }
```

Add to `ServerMessage` union:

```typescript
| { type: "fileStatResult"; filePath: string; mtime: number; size: number }
```

- [ ] **Step 2: Extend BatchOperation with identity fields**

Replace the current `BatchOperation` type. All non-reorder variants get these new optional fields:

```typescript
export type BatchOperation =
  | {
      op: "updateClass";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      updates: Array<{
        tailwindPrefix: string;
        tailwindToken: string | null;
        value: string;
        relatedPrefixes?: string[];
        classPattern?: string;
        standalone?: boolean;
      }>;
    }
  | {
      op: "updateText";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      originalText: string;
      newText: string;
    }
  | {
      op: "reorder";
      file: string;
      fromLine: number;
      toLine: number;
    }
  | {
      op: "moveSpacing";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      axis: "x" | "y";
      token: string;
      direction: "positive" | "negative";
      layoutContext: "flex" | "grid" | "block" | "positioned";
    };
```

- [ ] **Step 3: Rebuild shared types**

Run: `cd packages/shared && pnpm exec tsc --build`
Expected: Clean exit, no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(types): add fileStat messages and extend BatchOperation with identity fields"
```

---

### Task 2: Add fileStat server handler

**Files:**
- Modify: `packages/cli/src/server.ts`

- [ ] **Step 1: Add fileStat handler in the message switch**

In the `ws.on("message")` handler, add a case for `fileStat` alongside the other concurrent read-only handlers (`ping`, `getSiblings`, `discoverFile`):

```typescript
case "fileStat": {
  const resolvedPath = resolveProjectFilePath(msg.filePath, projectRoot);
  if (!resolvedPath || !isProjectFilePathSafe(msg.filePath, projectRoot)) {
    send(ws, { type: "fileStatResult", filePath: msg.filePath, mtime: 0, size: 0 } as any);
    break;
  }
  try {
    const stat = fs.statSync(resolvedPath);
    send(ws, {
      type: "fileStatResult",
      filePath: msg.filePath,
      mtime: stat.mtimeMs,
      size: stat.size,
    } as any);
  } catch {
    send(ws, { type: "fileStatResult", filePath: msg.filePath, mtime: 0, size: 0 } as any);
  }
  break;
}
```

Add this in the concurrent section (alongside `ping`, `getSiblings`, `discoverFile`), NOT in the queued section. File stat is a read-only operation.

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Clean build, no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(server): add fileStat handler for staleness detection"
```

---

### Task 3: Overlay — capture richer identity and request fileStat

**Files:**
- Modify: `packages/overlay/src/bridge.ts` (add fileStat request helper)
- Modify: `packages/overlay/src/tools/move.ts` (capture identity + fileStat)
- Modify: `packages/overlay/src/canvas-state.ts` (pass identity to batch ops)
- Modify: `packages/overlay/src/move-state.ts` (extend MoveEntry with fileStat)

- [ ] **Step 1: Add fileStat request helper to bridge.ts**

Read `packages/overlay/src/bridge.ts` first. Find the existing `requestFileDiscovery` async helper pattern and add a similar one:

```typescript
export function requestFileStat(filePath: string): Promise<{ mtime: number; size: number }> {
  return new Promise((resolve) => {
    const handler = onMessage((msg) => {
      if (msg.type === "fileStatResult" && (msg as any).filePath === filePath) {
        handler(); // unsubscribe
        resolve({ mtime: (msg as any).mtime, size: (msg as any).size });
      }
    });
    send({ type: "fileStat", filePath } as any);
    // Timeout after 2s — return zeros if server doesn't respond
    setTimeout(() => { handler(); resolve({ mtime: 0, size: 0 }); }, 2000);
  });
}
```

- [ ] **Step 2: Extend MoveEntry with fileStat and nthOfType**

In `packages/overlay/src/move-state.ts`, add to the `MoveEntry` interface:

```typescript
export interface MoveEntry {
  id: string;
  componentRef: ComponentRef;
  element: HTMLElement;
  placeholder: HTMLElement | null;
  originalRect: DOMRect;
  delta: { dx: number; dy: number };
  originalCssText: string;
  existingTransform: string;
  identity: ElementIdentity;
  parentLayout?: ParentLayout;
  // New fields for precise resolution
  nthOfType?: number;
  jsxKey?: string;
  fileMtime?: number;
  fileSize?: number;
}
```

Add a helper to compute nthOfType:

```typescript
/** Count same-tag siblings before this element in its parent (0-indexed). */
export function computeNthOfType(element: HTMLElement): number {
  const parent = element.parentElement;
  if (!parent) return 0;
  const tag = element.tagName;
  let count = 0;
  for (const child of Array.from(parent.children)) {
    if (child === element) break;
    if (child.tagName === tag) count++;
  }
  return count;
}
```

- [ ] **Step 3: Capture richer identity in move.ts**

In `packages/overlay/src/tools/move.ts`, update the move entry creation. Add imports for `computeNthOfType` from move-state.ts, `requestFileStat` from bridge.ts, and `getFiberFromHostInstance` from bippy.

Replace the move entry creation block:

```typescript
  const hostFiber = getFiberFromHostInstance(selectedEl);
  const debugSource = (hostFiber as any)?._debugSource;
  const elementLine = debugSource?.lineNumber ?? selection.lineNumber;
  const elementCol = debugSource?.columnNumber ?? selection.columnNumber;
  const elementFile = debugSource?.fileName
    ? (debugSource.fileName.startsWith("/") ? debugSource.fileName : selection.filePath)
    : selection.filePath;

  // Capture fiber key for list item disambiguation
  const jsxKey = hostFiber?.key != null ? String(hostFiber.key) : undefined;

  // Compute nth-of-type among same-tag siblings in the DOM
  const nthOfType = computeNthOfType(selectedEl);

  // Request file stat for staleness detection (async, non-blocking)
  const filePath = selection.filePath;
  requestFileStat(filePath).then(({ mtime, size }) => {
    entry.fileMtime = mtime;
    entry.fileSize = size;
  });

  const entry: MoveEntry = {
    id: crypto.randomUUID(),
    componentRef: {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
      columnNumber: selection.columnNumber,
    },
    element: selectedEl,
    placeholder: null,
    originalRect,
    delta: { dx: 0, dy: 0 },
    originalCssText,
    existingTransform: existingTransform === "none" ? "" : existingTransform,
    identity: {
      componentName: selection.componentName,
      filePath: elementFile,
      lineNumber: elementLine,
      columnNumber: elementCol,
      tagName: selectedEl.tagName.toLowerCase(),
    },
    parentLayout: captureParentLayout(selectedEl),
    nthOfType,
    jsxKey,
  };
```

- [ ] **Step 4: Update buildBatchOperations to pass all identity fields**

In `packages/overlay/src/canvas-state.ts`, update the moves section of `buildBatchOperations`:

```typescript
  for (const entry of moves.values()) {
    const file = entry.identity.filePath || entry.componentRef.filePath;
    if (!file) continue;

    const line = entry.identity.lineNumber;
    const col = entry.identity.columnNumber;
    const layout = deriveLayoutContext(entry.parentLayout);
    const tagName = entry.element.tagName.toLowerCase();
    const className = entry.element.className || undefined;
    const parentEl = entry.element.parentElement;
    const parentTagName = parentEl?.tagName.toLowerCase();
    const parentClassName = parentEl?.className || undefined;
    const elId = entry.element.id || undefined;

    const baseIdentity = {
      componentName: entry.componentRef.componentName,
      tagName,
      className,
      parentTagName,
      parentClassName,
      nthOfType: entry.nthOfType,
      id: elId,
      jsxKey: entry.jsxKey,
      fileMtime: entry.fileMtime,
      fileSize: entry.fileSize,
    };

    if (Math.abs(entry.delta.dx) >= 1) {
      ops.push({
        op: "moveSpacing",
        file,
        line,
        col,
        ...baseIdentity,
        axis: "x",
        token: snapToSpacingToken(entry.delta.dx),
        direction: entry.delta.dx > 0 ? "positive" : "negative",
        layoutContext: layout,
      });
    }

    if (Math.abs(entry.delta.dy) >= 1) {
      ops.push({
        op: "moveSpacing",
        file,
        line,
        col,
        ...baseIdentity,
        axis: "y",
        token: snapToSpacingToken(entry.delta.dy),
        direction: entry.delta.dy > 0 ? "positive" : "negative",
        layoutContext: layout,
      });
    }
  }
```

- [ ] **Step 5: Build and verify**

Run: `pnpm build`
Expected: Clean build.

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/bridge.ts packages/overlay/src/tools/move.ts packages/overlay/src/canvas-state.ts packages/overlay/src/move-state.ts packages/overlay/dist/overlay.js
git commit -m "feat(overlay): capture richer element identity for precise resolution"
```

---

### Task 4: Deterministic resolution chain in batch-transform.ts

**Files:**
- Modify: `packages/cli/src/batch-transform.ts`

- [ ] **Step 1: Write tests for the resolution chain**

Create `packages/cli/src/__tests__/element-resolution.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { executeBatch } from "../batch-transform.js";
import type { BatchOperation } from "@frameup/shared";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

function useFixture(name: string) {
  const src = path.join(fixturesDir, name);
  const original = fs.readFileSync(src, "utf-8");
  const tmp = path.join(fixturesDir, `_tmp_${Date.now()}_${name}`);
  fs.writeFileSync(tmp, original, "utf-8");
  return {
    filePath: tmp,
    original,
    cleanup: () => { try { fs.unlinkSync(tmp); } catch {} },
  };
}

// Create a fixture with multiple divs for disambiguation tests
const MULTI_DIV_FIXTURE = `export default function Page() {
  return (
    <main className="container mx-auto">
      <div className="header flex gap-4" id="top-bar">
        <h1>Title</h1>
      </div>
      <div className="content flex flex-col">
        <p>First paragraph</p>
      </div>
      <div className="content flex flex-col">
        <p>Second paragraph</p>
      </div>
      <div className="footer mt-8">
        <span>Footer</span>
      </div>
    </main>
  );
}
`;

const KEYED_LIST_FIXTURE = `export default function List() {
  return (
    <ul className="list">
      <li key="alpha" className="item">Alpha</li>
      <li key="beta" className="item">Beta</li>
      <li key="gamma" className="item">Gamma</li>
    </ul>
  );
}
`;

const NEG_MARGIN_FIXTURE = `export default function Card() {
  return (
    <div className="flex -mt-8 p-4 bg-white">
      <h2 className="text-lg -ml-2">Title</h2>
    </div>
  );
}
`;

let fixtures: Array<{ cleanup: () => void }> = [];
afterEach(() => { for (const f of fixtures) f.cleanup(); fixtures = []; });

function setup(content: string, name: string) {
  const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${name}`);
  fs.writeFileSync(filePath, content, "utf-8");
  const f = { filePath, original: content, cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } };
  fixtures.push(f);
  return f;
}

describe("deterministic resolution chain", () => {
  it("resolves by id when present", () => {
    const { filePath } = setup(MULTI_DIV_FIXTURE, "multi-div.tsx");
    const stat = fs.statSync(filePath);
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "div", id: "top-bar",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain('id="top-bar"');
    expect(updated).toMatch(/header.*mt-4/);
  });

  it("resolves by jsxKey for list items", () => {
    const { filePath } = setup(KEYED_LIST_FIXTURE, "keyed-list.tsx");
    const stat = fs.statSync(filePath);
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "li", jsxKey: "beta",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "x", token: "2", direction: "positive", layoutContext: "flex",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // Beta item should have the new class, not alpha or gamma
    const lines = updated.split("\n");
    const betaLine = lines.find(l => l.includes('key="beta"'));
    expect(betaLine).toContain("ml-2");
    const alphaLine = lines.find(l => l.includes('key="alpha"'));
    expect(alphaLine).not.toContain("ml-2");
  });

  it("resolves by nthOfType + parentClassName when ambiguous", () => {
    const { filePath } = setup(MULTI_DIV_FIXTURE, "multi-div2.tsx");
    const stat = fs.statSync(filePath);
    // Target the second "content" div (nthOfType=2 among divs in main)
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "div", className: "content flex flex-col",
        parentTagName: "main", nthOfType: 2,
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // Second "content" div should have mt-4, first should not
    const contentDivs = updated.split("\n").filter(l => l.includes("content flex flex-col"));
    expect(contentDivs[0]).not.toContain("mt-4");
    expect(contentDivs[1]).toContain("mt-4");
  });

  it("rejects when file has changed (staleness)", () => {
    const { filePath } = setup(MULTI_DIV_FIXTURE, "stale.tsx");
    // Capture stat, then modify file
    const stat = fs.statSync(filePath);
    // Wait a tick and rewrite to change mtime
    fs.writeFileSync(filePath, MULTI_DIV_FIXTURE + "\n// modified", "utf-8");

    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "div", id: "top-bar",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(false);
    expect(result.results[0].error).toContain("changed");
  });

  it("fails loudly when no element can be identified", () => {
    const { filePath } = setup(MULTI_DIV_FIXTURE, "no-match.tsx");
    const stat = fs.statSync(filePath);
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "section", // no <section> in fixture
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(false);
  });
});

describe("negative margin handling", () => {
  it("replaces -mt-8 with mt-4 for moveSpacing", () => {
    const { filePath } = setup(NEG_MARGIN_FIXTURE, "neg-margin.tsx");
    const stat = fs.statSync(filePath);
    // Find the div at line 3 (0-indexed line 2)
    const lines = NEG_MARGIN_FIXTURE.split("\n");
    let divLine = 0;
    let divCol = 0;
    for (let i = 0; i < lines.length; i++) {
      const col = lines[i].indexOf('<div className="flex -mt-8');
      if (col !== -1) { divLine = i + 1; divCol = col; break; }
    }

    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: divLine, col: divCol,
        tagName: "div",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("mt-4");
    expect(updated).not.toContain("-mt-8");
  });

  it("does NOT strip negative classes for non-move updateClass ops", () => {
    const { filePath } = setup(NEG_MARGIN_FIXTURE, "neg-keep.tsx");
    const stat = fs.statSync(filePath);
    const lines = NEG_MARGIN_FIXTURE.split("\n");
    let divLine = 0;
    let divCol = 0;
    for (let i = 0; i < lines.length; i++) {
      const col = lines[i].indexOf('<div className="flex -mt-8');
      if (col !== -1) { divLine = i + 1; divCol = col; break; }
    }

    // updateClass to change bg — should NOT touch -mt-8
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: divLine, col: divCol,
        tagName: "div",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        updates: [{ tailwindPrefix: "bg", tailwindToken: "red-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("-mt-8"); // negative margin preserved
    expect(updated).toContain("bg-red-500");
  });
});

describe("className subset matching", () => {
  const CN_FIXTURE = `export default function Card() {
  return (
    <div className={cn("flex gap-4 bg-white", active && "ring-2")}>
      <span className="text-sm font-medium">Label</span>
    </div>
  );
}
`;

  it("matches AST static classes as subset of DOM observed classes", () => {
    const { filePath } = setup(CN_FIXTURE, "cn-subset.tsx");
    const stat = fs.statSync(filePath);
    // DOM className would be "flex gap-4 bg-white ring-2" (active=true)
    // AST static classes are "flex gap-4 bg-white" from first arg of cn()
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "div", className: "flex gap-4 bg-white ring-2",
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
  });
});

describe("parentClassName disambiguation", () => {
  const PARENT_FIXTURE = `export default function Layout() {
  return (
    <div className="sidebar bg-gray-100">
      <div className="item">Sidebar item</div>
    </div>
    <div className="main bg-white">
      <div className="item">Main item</div>
    </div>
  );
}
`;

  it("disambiguates same nthOfType by parent className", () => {
    const { filePath } = setup(PARENT_FIXTURE, "parent-ctx.tsx");
    const stat = fs.statSync(filePath);
    // Both "item" divs are nthOfType=0 in their respective parents
    // Target the one inside "main bg-white"
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 0, col: 0,
        tagName: "div", className: "item",
        parentTagName: "div", parentClassName: "main bg-white",
        nthOfType: 0,
        fileMtime: stat.mtimeMs, fileSize: stat.size,
        axis: "y", token: "4", direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // Only the "Main item" div should have mt-4
    const lines = updated.split("\n");
    const sidebarItem = lines.find(l => l.includes("Sidebar item"));
    const mainItem = lines.find(l => l.includes("Main item"));
    expect(sidebarItem).not.toContain("mt-4");
    expect(mainItem).toContain("mt-4");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/cli && pnpm exec vitest run src/__tests__/element-resolution.test.ts`
Expected: Tests fail (resolution chain not implemented yet).

- [ ] **Step 3: Implement the deterministic resolution chain**

Replace the contents of `resolveNodes`, `findJSXElementFuzzy`, `getJSXTagName`, `getJSXClassName` in `packages/cli/src/batch-transform.ts` with:

```typescript
/**
 * Get the tag name from a JSX opening element AST node.
 */
function getJSXTagName(node: any): string | null {
  const name = node.openingElement?.name;
  if (!name) return null;
  if (name.type === "JSXIdentifier") return name.name;
  if (name.type === "JSXMemberExpression") return `${name.object?.name}.${name.property?.name}`;
  return null;
}

/**
 * Get the static className string(s) from a JSX element's attributes.
 * Returns an array of class strings found in the AST (may be partial for dynamic classNames).
 */
function getJSXStaticClasses(node: any): string[] {
  const attrs = node.openingElement?.attributes;
  if (!attrs) return [];
  for (const attr of attrs) {
    if (attr.type === "JSXAttribute" && attr.name?.name === "className") {
      const val = attr.value;
      if (val?.type === "StringLiteral" || val?.type === "Literal") {
        return val.value.split(/\s+/).filter(Boolean);
      }
      if (val?.type === "JSXExpressionContainer") {
        const expr = val.expression;
        if (expr.type === "TemplateLiteral" && expr.quasis?.[0]) {
          return (expr.quasis[0].value?.raw ?? "").split(/\s+/).filter(Boolean);
        }
        if (expr.type === "CallExpression" && expr.arguments?.[0]?.type === "StringLiteral") {
          return expr.arguments[0].value.split(/\s+/).filter(Boolean);
        }
      }
      return [];
    }
  }
  return [];
}

/**
 * Get the id attribute from a JSX element.
 */
function getJSXId(node: any): string | null {
  const attrs = node.openingElement?.attributes;
  if (!attrs) return null;
  for (const attr of attrs) {
    if (attr.type === "JSXAttribute" && attr.name?.name === "id") {
      if (attr.value?.type === "StringLiteral" || attr.value?.type === "Literal") {
        return attr.value.value;
      }
    }
  }
  return null;
}

/**
 * Get the key prop from a JSX element.
 */
function getJSXKey(node: any): string | null {
  const attrs = node.openingElement?.attributes;
  if (!attrs) return null;
  for (const attr of attrs) {
    if (attr.type === "JSXAttribute" && attr.name?.name === "key") {
      if (attr.value?.type === "StringLiteral" || attr.value?.type === "Literal") {
        return attr.value.value;
      }
      // JSXExpressionContainer with a string — e.g., key={`item-${id}`} — skip (not static)
    }
  }
  return null;
}

/**
 * Check if the AST node's static classes are a subset of the DOM's observed classes.
 * This accommodates runtime-added classes (CSS-in-JS, cn(), clsx()).
 */
function classNameSubsetMatch(astClasses: string[], domClassName?: string): boolean {
  if (!domClassName || astClasses.length === 0) return false;
  const domClasses = new Set(domClassName.split(/\s+/).filter(Boolean));
  return astClasses.every(c => domClasses.has(c));
}

/**
 * Find the enclosing function/arrow component that contains the given line.
 * Returns the AST node's body range { start, end } in line numbers.
 */
function findEnclosingComponent(j: any, root: any, hintLine: number): { start: number; end: number } | null {
  let best: { start: number; end: number } | null = null;
  let bestSize = Infinity;

  // Check arrow functions and function declarations
  const functionTypes = [j.ArrowFunctionExpression, j.FunctionDeclaration, j.FunctionExpression];
  for (const type of functionTypes) {
    root.find(type).forEach((p: any) => {
      const loc = p.node.loc;
      if (!loc) return;
      const start = loc.start.line;
      const end = loc.end.line;
      if (hintLine >= start && hintLine <= end) {
        const size = end - start;
        if (size < bestSize) {
          bestSize = size;
          best = { start, end };
        }
      }
    });
  }

  return best;
}

/**
 * Count same-tag JSXElement siblings before this node in its parent.
 */
function computeASTNthOfType(nodePath: any): number {
  const parent = nodePath.parent?.node;
  if (!parent?.children) return 0;
  const tagName = getJSXTagName(nodePath.node);
  if (!tagName) return 0;

  let count = 0;
  for (const child of parent.children) {
    if (child === nodePath.node) break;
    if (child.type === "JSXElement" && getJSXTagName(child) === tagName) {
      count++;
    }
  }
  return count;
}

/**
 * Deterministic resolution chain — finds the exact JSX element or fails.
 * Never applies to a "best guess" element.
 */
function resolveNodes(
  j: any,
  root: any,
  ops: Array<{ index: number; op: BatchOperation }>,
  resolvedPath: string,
): ResolvedOp[] {
  const resolved: ResolvedOp[] = [];

  for (const { index, op } of ops) {
    if (op.op === "reorder") {
      resolved.push({ index, op, node: null, priority: 1 });
      continue;
    }

    // Step 1: Staleness check
    if (op.fileMtime && op.fileSize) {
      try {
        const stat = fs.statSync(resolvedPath);
        if (Math.abs(stat.mtimeMs - op.fileMtime) > 1 || stat.size !== op.fileSize) {
          resolved.push({
            index, op, node: null, priority: 0,
            error: "File changed since selection — re-select the element and try again",
          });
          continue;
        }
      } catch {
        // Can't stat — proceed without staleness check
      }
    }

    // Step 2: Exact line:col
    let node = findJSXElementAt(j, root, op.line, op.col);
    if (node) {
      const foundTag = getJSXTagName(node.node);
      if (!op.tagName || (foundTag && foundTag.toLowerCase() === op.tagName.toLowerCase())) {
        resolved.push({ index, op, node, priority: op.op === "moveSpacing" || op.op === "updateClass" || op.op === "updateText" ? 0 : 1 });
        continue;
      }
      // Tag mismatch — owner stack pointed to wrong spot, continue chain
      node = null;
    }

    // Step 3: Component-scoped scan
    const scope = findEnclosingComponent(j, root, op.line);
    const candidates: any[] = [];

    root.find(j.JSXElement).forEach((p: any) => {
      const tag = getJSXTagName(p.node);
      if (!tag || !op.tagName || tag.toLowerCase() !== op.tagName.toLowerCase()) return;

      const loc = p.node.openingElement?.loc?.start;
      if (!loc) return;

      // If we have a scope, filter to it
      if (scope && (loc.line < scope.start || loc.line > scope.end)) return;

      candidates.push(p);
    });

    if (candidates.length === 1) {
      node = candidates[0];
      const loc = node.node.openingElement?.loc?.start;
      console.log(`[commitBatch] Component-scoped match <${op.tagName}> → ${loc?.line}:${loc?.column}`);
      resolved.push({ index, op, node, priority: 0 });
      continue;
    }

    if (candidates.length === 0) {
      resolved.push({
        index, op, node: null, priority: 0,
        error: `No <${op.tagName}> found in component scope (hint: ${op.line})`,
      });
      continue;
    }

    // Multiple candidates — disambiguate

    // Step 3.5: Try id match
    if (op.id) {
      const idMatch = candidates.find(c => getJSXId(c.node) === op.id);
      if (idMatch) {
        node = idMatch;
        const loc = node.node.openingElement?.loc?.start;
        console.log(`[commitBatch] ID match <${op.tagName}#${op.id}> → ${loc?.line}:${loc?.column}`);
        resolved.push({ index, op, node, priority: 0 });
        continue;
      }
    }

    // Step 4: jsxKey
    if (op.jsxKey) {
      const keyMatch = candidates.find(c => getJSXKey(c.node) === op.jsxKey);
      if (keyMatch) {
        node = keyMatch;
        const loc = node.node.openingElement?.loc?.start;
        console.log(`[commitBatch] Key match <${op.tagName} key="${op.jsxKey}"> → ${loc?.line}:${loc?.column}`);
        resolved.push({ index, op, node, priority: 0 });
        continue;
      }
    }

    // Step 5: nthOfType + parent context
    if (op.nthOfType != null) {
      const nthMatches = candidates.filter(c => computeASTNthOfType(c) === op.nthOfType);
      if (nthMatches.length === 1) {
        node = nthMatches[0];
        const loc = node.node.openingElement?.loc?.start;
        console.log(`[commitBatch] nthOfType match <${op.tagName}>[${op.nthOfType}] → ${loc?.line}:${loc?.column}`);
        resolved.push({ index, op, node, priority: 0 });
        continue;
      }

      // Use parentClassName to narrow further
      if (op.parentClassName && nthMatches.length > 1) {
        const parentFiltered = nthMatches.filter(c => {
          const parentNode = c.parent?.node;
          if (!parentNode) return false;
          const parentTag = getJSXTagName(parentNode);
          if (op.parentTagName && parentTag?.toLowerCase() !== op.parentTagName.toLowerCase()) return false;
          const parentClasses = getJSXStaticClasses(parentNode);
          return classNameSubsetMatch(parentClasses, op.parentClassName);
        });
        if (parentFiltered.length === 1) {
          node = parentFiltered[0];
          const loc = node.node.openingElement?.loc?.start;
          console.log(`[commitBatch] Parent context match <${op.tagName}> → ${loc?.line}:${loc?.column}`);
          resolved.push({ index, op, node, priority: 0 });
          continue;
        }
      }
    }

    // Step 5.5: className subset as last heuristic before failure
    if (op.className) {
      const classMatches = candidates.filter(c => {
        const astClasses = getJSXStaticClasses(c.node);
        return classNameSubsetMatch(astClasses, op.className);
      });
      if (classMatches.length === 1) {
        node = classMatches[0];
        const loc = node.node.openingElement?.loc?.start;
        console.log(`[commitBatch] className subset match <${op.tagName}> → ${loc?.line}:${loc?.column}`);
        resolved.push({ index, op, node, priority: 0 });
        continue;
      }
    }

    // Step 6: Fail loudly
    resolved.push({
      index, op, node: null, priority: 0,
      error: `Ambiguous: ${candidates.length} <${op.tagName}> elements in scope, could not disambiguate (hint: ${op.line})`,
    });
  }

  return resolved;
}
```

- [ ] **Step 4: Update `resolveNodes` call site in `executeBatch`**

The `resolveNodes` function now takes `resolvedPath` as a 4th argument. Update the call in `executeBatch`:

Find:
```typescript
const resolved = resolveNodes(j, root, ops);
```

Replace with:
```typescript
const resolved = resolveNodes(j, root, ops, resolvedPath);
```

- [ ] **Step 5: Implement negative margin removal in `applyOp` for moveSpacing**

In the `applyOp` function's `"moveSpacing"` case, add negative class cleanup before calling `mutateClassName`:

```typescript
    case "moveSpacing": {
      const prefix = getMovePrefix(op.axis, op.direction, op.layoutContext);

      // Move-scoped: remove both positive and negative variants before applying
      // e.g., for prefix "mt", remove both "mt-*" and "-mt-*"
      const openingElement = node.node.openingElement;
      const attrs = openingElement?.attributes ?? [];
      const classNameAttr = attrs.find(
        (a: any) => a.type === "JSXAttribute" && a.name?.name === "className"
      );
      if (classNameAttr?.value) {
        const val = classNameAttr.value;
        if (val.type === "StringLiteral" || val.type === "Literal") {
          const classes = val.value.split(/\s+/).filter(Boolean);
          val.value = classes.filter((c: string) => {
            // Remove both "mt-*" and "-mt-*" for the target prefix
            if (c.startsWith(`${prefix}-`) || c === prefix) return false;
            if (c.startsWith(`-${prefix}-`) || c === `-${prefix}`) return false;
            return true;
          }).join(" ");
        }
      }

      const updates: ClassNameUpdate[] = [{
        tailwindPrefix: prefix,
        tailwindToken: op.token,
        value: "",
      }];
      mutateClassName(j, node, updates);
      return undefined;
    }
```

- [ ] **Step 6: Remove old fuzzy matching code**

Delete the old `findJSXElementFuzzy` function and its `getJSXClassName` helper (replaced by the new resolution chain). The `getJSXClassName` is replaced by `getJSXStaticClasses`.

- [ ] **Step 7: Run tests**

Run: `pnpm test`
Expected: All tests pass including the new element-resolution tests.

- [ ] **Step 8: Commit**

```bash
git add packages/cli/src/batch-transform.ts packages/cli/src/__tests__/element-resolution.test.ts
git commit -m "feat(batch): deterministic resolution chain with staleness check and negative margin handling"
```

---

### Task 5: Cleanup and final verification

**Files:**
- Modify: `packages/cli/src/server.ts` (remove debug logs)

- [ ] **Step 1: Remove debug console.log from commitBatch handler**

Remove the two `console.log` lines from the commitBatch handler in server.ts:

```typescript
// Remove these:
console.log(`[commitBatch] Received ${msg.operations.length} operations:`, ...);
console.log(`[commitBatch] Results:`, ...);
```

- [ ] **Step 2: Remove debug console.log from overlay index.ts**

Remove the debug log from the confirm button handler:

```typescript
// Remove this:
console.log("[FrameUp] Confirm pressed. batchOps:", batchOps.length, "hasTextAnnotations:", hasTextAnnotations());
```

- [ ] **Step 3: Run full test suite**

Run: `pnpm test`
Expected: All tests pass (134 existing + new element-resolution tests).

- [ ] **Step 4: Full build**

Run: `pnpm build`
Expected: Clean build for shared, overlay, and CLI.

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/server.ts packages/overlay/src/index.ts packages/overlay/dist/overlay.js
git commit -m "chore: remove debug logging from batch transform pipeline"
```

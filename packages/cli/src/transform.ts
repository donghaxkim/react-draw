import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import type { SiblingInfo } from "@frameup/shared";
import { detectQuoteStyle } from "./utils.js";

export function getParser(filePath: string): string {
  const ext = path.extname(filePath);
  return ext === ".tsx" || ext === ".ts" ? "tsx" : "babel";
}

// ── I/O-free helpers (used by both single-op wrappers and batch engine) ──

/**
 * Parse source code into a jscodeshift Collection.
 * Pure function — no file I/O.
 */
export function parseSource(source: string, filePath: string) {
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const quoteStyle = detectQuoteStyle(source);
  return { j, root, quoteStyle };
}

/**
 * Find a JSXElement at a given line:col in the AST.
 * Returns the ASTPath or null.
 */
export function findJSXElementAt(j: any, root: any, line: number, col: number): any | null {
  let target: any = null;
  root.find(j.JSXElement).forEach((p: any) => {
    const loc = p.node.openingElement.loc;
    if (loc && loc.start.line === line && loc.start.column === col) {
      target = p;
    }
  });
  return target;
}

/**
 * Reorder JSX siblings by swapping elements at the given lines.
 * Mutates the AST in place — no I/O.
 */
export function mutateReorder(j: any, root: any, fromLine: number, toLine: number): void {
  const jsxElements = root.find(j.JSXElement);
  const jsxFragments = root.find(j.JSXFragment);

  const findAtLine = (collection: any, line: number) => {
    let found: any = null;
    collection.forEach((p: any) => {
      const startLine = p.node.openingElement
        ? p.node.openingElement.loc?.start.line
        : p.node.openingFragment?.loc?.start.line;
      if (startLine === line) {
        found = p;
      }
    });
    return found;
  };

  const fromNode = findAtLine(jsxElements, fromLine) || findAtLine(jsxFragments, fromLine);
  const toNode = findAtLine(jsxElements, toLine) || findAtLine(jsxFragments, toLine);

  if (!fromNode) throw new Error(`Component not found at line ${fromLine}. If you have unsaved changes in your editor, save your files and try again.`);
  if (!toNode) throw new Error(`Component not found at line ${toLine}. If you have unsaved changes in your editor, save your files and try again.`);

  function getMovableNode(nodePath: any): any {
    let current = nodePath;
    while (current.parent) {
      const parentNode = current.parent.node;
      if (parentNode.children && parentNode.children.indexOf(current.node) !== -1) {
        return current;
      }
      current = current.parent;
    }
    return nodePath;
  }

  const fromMovable = getMovableNode(fromNode);
  const toMovable = getMovableNode(toNode);

  const fromParent = fromMovable.parent;
  const toParent = toMovable.parent;

  if (!fromParent || !fromParent.node.children) {
    throw new Error("Elements are not siblings in the same parent container");
  }

  const children = fromParent.node.children;
  const fromIndex = children.indexOf(fromMovable.node);
  const toIndex = children.indexOf(toMovable.node);

  if (fromIndex === -1 || toIndex === -1 || fromParent.node !== toParent.node) {
    throw new Error("Elements are not siblings in the same parent");
  }

  const fromWhitespace = fromIndex > 0 && children[fromIndex - 1]?.type === "JSXText"
    ? children[fromIndex - 1]
    : null;

  if (fromWhitespace) {
    const wsIndex = children.indexOf(fromWhitespace);
    children.splice(wsIndex, 2);
  } else {
    children.splice(fromIndex, 1);
  }

  const newToIndex = children.indexOf(toMovable.node);

  const toWsIndex = newToIndex > 0 && children[newToIndex - 1]?.type === "JSXText"
    ? newToIndex - 1
    : newToIndex;

  if (fromWhitespace) {
    children.splice(toWsIndex, 0, fromWhitespace, fromMovable.node);
  } else {
    children.splice(toWsIndex, 0, fromMovable.node);
  }
}

export function reorderComponent(
  filePath: string,
  fromLine: number,
  toLine: number
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  mutateReorder(j, root, fromLine, toLine);
  return root.toSource({ quote: quoteStyle });
}

export function getSiblings(
  filePath: string,
  parentLine: number
): SiblingInfo[] {
  const source = fs.readFileSync(filePath, "utf-8");
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);

  // Find the parent element at the given line
  let parentNode: any = null;

  root.find(j.JSXElement).forEach((p) => {
    if (p.node.openingElement.loc?.start.line === parentLine) {
      parentNode = p;
    }
  });

  if (!parentNode) {
    root.find(j.JSXFragment).forEach((p) => {
      if (p.node.openingFragment?.loc?.start.line === parentLine) {
        parentNode = p;
      }
    });
  }

  if (!parentNode) {
    throw new Error(`No JSX element found at line ${parentLine}`);
  }

  const siblings: SiblingInfo[] = [];

  for (const child of parentNode.node.children) {
    if (child.type === "JSXElement") {
      const name =
        child.openingElement.name.type === "JSXIdentifier"
          ? child.openingElement.name.name
          : child.openingElement.name.type === "JSXMemberExpression"
            ? `${child.openingElement.name.object.name}.${child.openingElement.name.property.name}`
            : "Unknown";
      siblings.push({
        componentName: name,
        lineNumber: child.openingElement.loc?.start.line ?? 0,
      });
    } else if (child.type === "JSXExpressionContainer") {
      // Look inside for JSX elements (e.g., {cond && <Comp />})
      const expr = child.expression;
      if (expr.type === "LogicalExpression" && expr.right?.type === "JSXElement") {
        const innerName =
          expr.right.openingElement.name.type === "JSXIdentifier"
            ? expr.right.openingElement.name.name
            : "Unknown";
        siblings.push({
          componentName: innerName,
          lineNumber: child.loc?.start.line ?? 0,
        });
      } else if (expr.type === "ConditionalExpression") {
        // {cond ? <A /> : <B />} — treat as a single sibling
        const consequent = expr.consequent;
        if (consequent?.type === "JSXElement") {
          const innerName =
            consequent.openingElement.name.type === "JSXIdentifier"
              ? consequent.openingElement.name.name
              : "Unknown";
          siblings.push({
            componentName: innerName,
            lineNumber: child.loc?.start.line ?? 0,
          });
        }
      }
    }
    // Skip JSXText (whitespace), JSXSpreadChild, etc.
  }

  return siblings;
}

// ── updateClassName ─────────────────────────────────────────────────────

export interface ClassNameUpdate {
  tailwindPrefix: string;
  tailwindToken: string | null;
  value: string;
  relatedPrefixes?: string[];
  classPattern?: string;
  standalone?: boolean;
}

const SHORTHAND_SPLITS: Record<
  string,
  { sides: string[]; extractToken: (cls: string) => string }
> = {
  p: {
    sides: ["pt", "pr", "pb", "pl"],
    extractToken: (cls) => cls.replace(/^p-/, ""),
  },
  px: {
    sides: ["pl", "pr"],
    extractToken: (cls) => cls.replace(/^px-/, ""),
  },
  py: {
    sides: ["pt", "pb"],
    extractToken: (cls) => cls.replace(/^py-/, ""),
  },
  m: {
    sides: ["mt", "mr", "mb", "ml"],
    extractToken: (cls) => cls.replace(/^m-/, ""),
  },
  mx: {
    sides: ["ml", "mr"],
    extractToken: (cls) => cls.replace(/^mx-/, ""),
  },
  my: {
    sides: ["mt", "mb"],
    extractToken: (cls) => cls.replace(/^my-/, ""),
  },
  rounded: {
    sides: ["rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
    extractToken: (cls) =>
      cls === "rounded" ? "DEFAULT" : cls.replace(/^rounded-/, ""),
  },
  "rounded-t": {
    sides: ["rounded-tl", "rounded-tr"],
    extractToken: (cls) => cls === "rounded-t" ? "DEFAULT" : cls.replace(/^rounded-t-/, ""),
  },
  "rounded-r": {
    sides: ["rounded-tr", "rounded-br"],
    extractToken: (cls) => cls === "rounded-r" ? "DEFAULT" : cls.replace(/^rounded-r-/, ""),
  },
  "rounded-b": {
    sides: ["rounded-br", "rounded-bl"],
    extractToken: (cls) => cls === "rounded-b" ? "DEFAULT" : cls.replace(/^rounded-b-/, ""),
  },
  "rounded-l": {
    sides: ["rounded-tl", "rounded-bl"],
    extractToken: (cls) => cls === "rounded-l" ? "DEFAULT" : cls.replace(/^rounded-l-/, ""),
  },
};

/**
 * Build the target class string from an update descriptor.
 */
function buildClass(update: ClassNameUpdate): string {
  if (update.standalone) {
    return update.tailwindToken ?? `${update.tailwindPrefix}-[${update.value}]`;
  }
  return update.tailwindToken
    ? `${update.tailwindPrefix}-${update.tailwindToken}`
    : `${update.tailwindPrefix}-[${update.value}]`;
}

/**
 * Check whether a class string matches a given Tailwind prefix.
 * E.g. prefix "p" matches "p-4", "p-[13px]", but not "px-4" or "pl-2".
 */
function classMatchesPrefix(cls: string, prefix: string): boolean {
  // Skip variant-prefixed classes (e.g. hover:bg-blue-700, dark:bg-gray-900).
  // These are intentional state/responsive overrides and should not be
  // matched when replacing the base utility class.
  if (cls.includes(":")) return false;
  // Exact match for standalone classes like "rounded"
  if (cls === prefix) return true;
  // prefix- followed by something
  return cls.startsWith(`${prefix}-`);
}

/**
 * Apply a single update to an array of class strings.
 * Returns the modified array.
 */
function applyUpdate(classes: string[], update: ClassNameUpdate): string[] {
  const newClass = buildClass(update);
  const result = [...classes];

  // 1. Check relatedPrefixes for shorthand splitting
  for (const relatedPrefix of update.relatedPrefixes ?? []) {
    const existingIdx = result.findIndex((c) =>
      classMatchesPrefix(c, relatedPrefix)
    );
    if (existingIdx === -1) continue;

    const existingCls = result[existingIdx];
    const split = SHORTHAND_SPLITS[relatedPrefix];
    if (!split) continue;

    const token = split.extractToken(existingCls);
    // Remove the shorthand class
    result.splice(existingIdx, 1);
    // Insert individual side classes, replacing the edited side with the new value
    const expansions: string[] = [];
    for (const side of split.sides) {
      if (side === update.tailwindPrefix) {
        expansions.push(newClass);
      } else {
        expansions.push(token === "DEFAULT" ? side : `${side}-${token}`);
      }
    }
    result.splice(existingIdx, 0, ...expansions);
    return result;
  }

  // 2. Find and replace existing class with same prefix
  const directIdx = result.findIndex((c) =>
    update.classPattern
      ? new RegExp(update.classPattern).test(c)
      : classMatchesPrefix(c, update.tailwindPrefix)
  );

  if (directIdx !== -1) {
    result[directIdx] = newClass;
  } else {
    result.push(newClass);
  }

  return result;
}

/**
 * Apply updates to a class string (space-separated list of classes).
 */
function updateClassString(
  classStr: string,
  updates: ClassNameUpdate[]
): string {
  let classes = classStr.split(/\s+/).filter(Boolean);
  for (const update of updates) {
    classes = applyUpdate(classes, update);
  }
  return classes.join(" ");
}

/**
 * Check if a cn()/clsx() call has the prefix in a conditional argument.
 */
function checkConflictingConditional(
  args: any[],
  prefix: string
): boolean {
  for (const arg of args) {
    // LogicalExpression: `active && "bg-blue-500"`
    if (arg.type === "LogicalExpression") {
      if (
        arg.right?.type === "StringLiteral" &&
        arg.right.value
          .split(/\s+/)
          .some((c: string) => classMatchesPrefix(c, prefix))
      ) {
        return true;
      }
    }
    // ConditionalExpression: `active ? "bg-blue-500" : "bg-red-500"`
    if (arg.type === "ConditionalExpression") {
      for (const branch of [arg.consequent, arg.alternate]) {
        if (
          branch?.type === "StringLiteral" &&
          branch.value
            .split(/\s+/)
            .some((c: string) => classMatchesPrefix(c, prefix))
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Apply className updates to a JSX element node.
 * Mutates the AST in place — no I/O. The `j` parameter is the jscodeshift API instance.
 * Throws on dynamic className or conflicting conditional classes.
 */
export function mutateClassName(j: any, target: any, updates: ClassNameUpdate[]): void {
  const openingElement = target.node.openingElement;
  const attrs = openingElement.attributes ?? [];

  const classNameAttr = attrs.find(
    (a: any) =>
      a.type === "JSXAttribute" &&
      a.name?.type === "JSXIdentifier" &&
      a.name.name === "className"
  );

  if (!classNameAttr) {
    const allClasses = updates.map(buildClass).join(" ");
    openingElement.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier("className"),
        j.stringLiteral(allClasses)
      )
    );
    return;
  }

  const attrValue = classNameAttr.value;

  // Handle both StringLiteral (jscodeshift tsx parser) and Literal (babel parser)
  if (attrValue.type === "StringLiteral" || attrValue.type === "Literal") {
    attrValue.value = updateClassString(attrValue.value, updates);
    return;
  }

  if (attrValue.type === "JSXExpressionContainer") {
    const expr = attrValue.expression;

    if (expr.type === "TemplateLiteral") {
      let anyQuasiMatched = false;
      for (const quasi of expr.quasis) {
        const raw = quasi.value.raw;
        const classes = raw.split(/\s+/).filter(Boolean);
        if (classes.length === 0) continue;

        let hasMatch = false;
        for (const update of updates) {
          const allPrefixes = [
            update.tailwindPrefix,
            ...(update.relatedPrefixes ?? []),
          ];
          if (classes.some((c: string) =>
            allPrefixes.some((p) => classMatchesPrefix(c, p)) ||
            (update.classPattern && new RegExp(update.classPattern).test(c))
          )) {
            hasMatch = true;
            break;
          }
        }

        if (hasMatch) {
          anyQuasiMatched = true;
          const leadingWs = raw.match(/^(\s*)/)?.[1] ?? "";
          const trailingWs = raw.match(/(\s*)$/)?.[1] ?? "";
          const updated = updateClassString(raw.trim(), updates);
          quasi.value = {
            raw: `${leadingWs}${updated}${trailingWs}`,
            cooked: `${leadingWs}${updated}${trailingWs}`,
          };
        }
      }
      // If no quasi had a matching class, append to the LAST quasi (tail)
      // so our class comes AFTER any dynamic interpolations and wins in Tailwind specificity
      if (!anyQuasiMatched) {
        const lastQuasi = expr.quasis[expr.quasis.length - 1];
        const raw = lastQuasi.value.raw;
        const newClasses = updates.map(buildClass).join(" ");
        // Append with a leading space
        const updated = raw.trimEnd().length > 0
          ? `${raw.trimEnd()} ${newClasses}`
          : ` ${newClasses}`;
        lastQuasi.value = { raw: updated, cooked: updated };
      }
      return;
    }

    if (expr.type === "CallExpression") {
      const args = expr.arguments;

      for (const update of updates) {
        if (checkConflictingConditional(args, update.tailwindPrefix)) {
          throw new Error(
            `CONFLICTING_CLASS: "${update.tailwindPrefix}" appears in a conditional argument`
          );
        }

        let found = false;
        for (const arg of args) {
          if (arg.type === "StringLiteral") {
            const classes = arg.value.split(/\s+/).filter(Boolean);
            const allPrefixes = [
              update.tailwindPrefix,
              ...(update.relatedPrefixes ?? []),
            ];
            if (classes.some((c: string) => allPrefixes.some((p) => classMatchesPrefix(c, p)))) {
              arg.value = updateClassString(arg.value, [update]);
              found = true;
              break;
            }
          }
        }

        if (!found) {
          const firstStr = args.find((a: any) => a.type === "StringLiteral");
          if (firstStr) {
            const newClass = buildClass(update);
            firstStr.value = firstStr.value
              ? `${firstStr.value} ${newClass}`
              : newClass;
          }
        }
      }
      return;
    }

    throw new Error(
      `DYNAMIC_CLASSNAME: className is a dynamic expression that cannot be statically modified`
    );
  }

  throw new Error(`Unsupported className value type: ${attrValue.type}`);
}

export function updateClassName(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  updates: ClassNameUpdate[]
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  const target = findJSXElementAt(j, root, lineNumber, columnNumber);
  if (!target) {
    throw new Error(
      `No JSX element found at ${lineNumber}:${columnNumber}`
    );
  }

  mutateClassName(j, target, updates);
  return root.toSource({ quote: quoteStyle });
}

// ── updateTextContent ────────────────────────────────────────────────────

/**
 * Replace text content of a JSX element node.
 * Mutates the AST in place — no I/O.
 * Returns true if a matching text child was found and replaced.
 *
 * Handles three cases:
 * 1. Exact match: originalText matches a single JSXText child exactly
 * 2. Substring diff: originalText is the full concatenated textContent (includes child elements),
 *    we diff against newText to find what changed, then replace in the matching JSXText fragment
 * 3. Expression match: text is in a JSXExpressionContainer StringLiteral
 */
export function mutateTextContent(
  target: any,
  originalText: string,
  newText: string,
  source?: string,
  cursorOffset?: number,
): boolean {
  const children = target.node.children;
  const tag = target.node.openingElement?.name?.name || target.node.openingElement?.name?.property?.name || "?";
  const line = target.node.openingElement?.loc?.start?.line;
  console.log(`[mutateText] target=<${tag}> line=${line} children=${children?.length ?? "null"} original="${originalText.slice(0,60)}" new="${newText.slice(0,60)}"`);
  if (!children) return false;
  if (source) {
    materializeBoundarySpaces(target.node, source);
  }

  // Diagnostic: dump children types and values to see what we're working with
  for (let i = 0; i < children.length; i++) {
    const c = children[i];
    if (c.type === "JSXText") {
      console.log(`[mutateText]   child[${i}] JSXText: "${c.value.slice(0, 80).replace(/\n/g, "\\n")}"`);
    } else if (c.type === "JSXElement") {
      const childTag = c.openingElement?.name?.name || c.openingElement?.name?.property?.name || "?";
      console.log(`[mutateText]   child[${i}] JSXElement: <${childTag}>`);
    } else if (c.type === "JSXExpressionContainer") {
      console.log(`[mutateText]   child[${i}] JSXExpr: ${c.expression?.type} = "${String(c.expression?.value ?? c.expression?.type).slice(0, 60)}"`);
    } else {
      console.log(`[mutateText]   child[${i}] ${c.type}`);
    }
  }

  // Case 1: Exact match against a single JSXText child
  // Use normalizeWs because React collapses JSX whitespace (newlines → spaces)
  // but the AST retains raw whitespace — DOM textContent won't match without this.
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === "JSXText") {
      const trimmed = child.value.trim();
      if (normalizeWs(trimmed) === normalizeWs(originalText.trim())) {
        const idx = child.value.indexOf(trimmed);
        const prefixWs = child.value.slice(0, idx);
        const suffixWs = child.value.slice(idx + trimmed.length);
        child.value = prefixWs + newText + suffixWs;
        return true;
      }
    }
    if (
      child.type === "JSXExpressionContainer" &&
      child.expression.type === "StringLiteral" &&
      child.expression.value === originalText
    ) {
      child.expression.value = newText;
      return true;
    }
  }

  // Case 2: originalText is concatenated textContent from DOM (includes child element text).
  // Diff originalText vs newText to find the changed substring, then search ALL JSXText nodes
  // recursively (the changed text might be inside a <strong>, <em>, <a>, etc.)
  const diffResult = findTextDiff(originalText, newText);
  console.log("[mutateText] diff:", diffResult ? `old="${diffResult.oldSubstring.slice(0,30)}" new="${diffResult.newSubstring.slice(0,30)}" prefix=${diffResult.prefixLen}` : "null");
  if (diffResult) {
    if (diffResult.oldSubstring) {
      const whitespaceSensitive = !/\S/.test(diffResult.oldSubstring) || !/\S/.test(diffResult.newSubstring);
      if (!whitespaceSensitive) {
        // Replace or delete — search with whitespace-flexible matching
        const found = replaceInJSXTextRecursive(target.node, diffResult.oldSubstring, diffResult.newSubstring);
        if (found) return true;
      }
      // If single-node search failed, the old text likely spans across child elements
      // (e.g. "do <strong>software</strong> stuff" → flat "do software stuff").
      // Try cross-element replacement.
      const crossFound = replaceCrossElementText(target.node, diffResult.oldSubstring, diffResult.newSubstring, source, diffResult.prefixLen);
      if (crossFound) return true;
    } else if (diffResult.newSubstring && diffResult.prefixLen > 0) {
      // Pure insertion — find the JSXText child that contains the character at prefixLen,
      // then insert the new text at the right position within that child
      const insertionOffset = cursorOffset != null
        ? Math.max(0, cursorOffset - diffResult.newSubstring.length)
        : diffResult.prefixLen;
      const found = insertInJSXTextAtOffset(target.node, insertionOffset, diffResult.newSubstring, source);
      if (found) return true;
    } else if (diffResult.newSubstring) {
      // Insertion at the very start — prepend to the first JSXText child
      const firstText = findFirstJSXText(target.node);
      if (firstText) {
        const ws = firstText.value.match(/^(\s*)/)?.[1] ?? "";
        firstText.value = ws + diffResult.newSubstring + firstText.value.slice(ws.length);
        return true;
      }
    }
  }

  return false;
}

/**
 * Recursively search JSXText nodes in an AST subtree for a substring and replace it.
 * Uses whitespace-flexible matching: the search term (from DOM text) has collapsed
 * whitespace, but the JSX source may have newlines/indentation. We build a regex
 * from oldSub that treats each space as \s+ to bridge this gap.
 */
function replaceInJSXTextRecursive(node: any, oldSub: string, newSub: string, depth = 0): boolean {
  const children = node.children;
  if (!children) return false;

  // Build a regex that matches oldSub with flexible whitespace
  const flexPattern = oldSub.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  const flexRe = new RegExp(flexPattern);

  for (const child of children) {
    if (child.type === "JSXText") {
      const trimmed = child.value.trim();
      // Try exact match first, then whitespace-flexible match
      if (child.value.includes(oldSub)) {
        console.log(`[replaceRecursive] d=${depth} FOUND exact "${oldSub.slice(0,30)}" in "${trimmed.slice(0,30)}"`);
        child.value = child.value.replace(oldSub, newSub);
        return true;
      }
      const flexMatch = child.value.match(flexRe);
      if (flexMatch) {
        console.log(`[replaceRecursive] d=${depth} FOUND flex "${oldSub.slice(0,30)}" in "${trimmed.slice(0,30)}"`);
        child.value = child.value.replace(flexRe, newSub);
        return true;
      }
    }
    if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
      if (child.expression.value.includes(oldSub)) {
        child.expression.value = child.expression.value.replace(oldSub, newSub);
        return true;
      }
    }
    // Recurse into child JSX elements
    if (child.type === "JSXElement") {
      if (replaceInJSXTextRecursive(child, oldSub, newSub, depth + 1)) return true;
    }
  }
  return false;
}

/**
 * Get the normalized text content of a JSX element recursively.
 */
function getElementTextNormalized(node: any): string {
  let text = "";
  const children = node.children;
  if (!children) return text;
  for (const child of children) {
    if (child.type === "JSXText") {
      text += normalizeWs(child.value);
    } else if (child.type === "JSXElement") {
      text += getElementTextNormalized(child);
    } else if (child.type === "JSXExpressionContainer") {
      const expr = child.expression;
      if (expr?.type === "StringLiteral" || expr?.type === "Literal") {
        text += String(expr.value ?? "");
      }
    }
  }
  return text;
}

function getLineStarts(source: string): number[] {
  const starts = [0];
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "\n") starts.push(i + 1);
  }
  return starts;
}

function getNodeIndex(node: any, edge: "start" | "end", lineStarts: number[]): number | null {
  const direct = edge === "start" ? node.start : node.end;
  if (typeof direct === "number") return direct;

  const loc = node.loc?.[edge];
  if (!loc) return null;
  const lineIndex = lineStarts[loc.line - 1];
  if (lineIndex == null) return null;
  return lineIndex + loc.column;
}

function getSourceBetween(prevNode: any, nextNode: any, source?: string, lineStarts?: number[]): string {
  if (!source) return "";
  const starts = lineStarts ?? getLineStarts(source);
  const prevEnd = getNodeIndex(prevNode, "end", starts);
  const nextStart = getNodeIndex(nextNode, "start", starts);
  if (prevEnd == null || nextStart == null || nextStart < prevEnd) return "";
  return source.slice(prevEnd, nextStart);
}

function getRenderedChildText(child: any, source?: string, lineStarts?: number[]): string {
  if (child.type === "JSXText") return child.value;
  if (child.type === "JSXElement") return getRenderedElementText(child, source, lineStarts);
  if (child.type === "JSXExpressionContainer") {
    const expr = child.expression;
    if (expr?.type === "StringLiteral" || expr?.type === "Literal") {
      return String(expr.value ?? "");
    }
  }
  return "";
}

function needsBoundarySpace(previousText: string, nextText: string, sourceBetween: string): boolean {
  if (!previousText || !nextText) return false;
  if (/\s$/.test(previousText) || /^\s/.test(nextText)) return false;
  return /\s/.test(sourceBetween);
}

function getRenderedElementText(node: any, source?: string, lineStarts?: number[]): string {
  const children = node.children;
  if (!children) return "";

  let text = "";
  let previousChild: any | null = null;
  let previousText = "";

  for (const child of children) {
    const childText = getRenderedChildText(child, source, lineStarts);
    if (!childText) continue;

    if (previousChild) {
      const sourceBetween = getSourceBetween(previousChild, child, source, lineStarts);
      if (needsBoundarySpace(previousText, childText, sourceBetween)) {
        text += " ";
      }
    }

    text += childText;
    previousChild = child;
    previousText = childText;
  }

  return text;
}

function prependToChildText(child: any, text: string): boolean {
  if (child.type === "JSXText") {
    child.value = text + child.value;
    return true;
  }
  if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
    child.expression.value = text + String(child.expression.value ?? "");
    return true;
  }
  return false;
}

function appendToChildText(child: any, text: string): boolean {
  if (child.type === "JSXText") {
    child.value += text;
    return true;
  }
  if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
    child.expression.value = String(child.expression.value ?? "") + text;
    return true;
  }
  return false;
}

function stripLeadingWhitespace(child: any): void {
  if (child.type === "JSXText") {
    child.value = child.value.replace(/^\s+/, "");
    return;
  }
  if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
    child.expression.value = String(child.expression.value ?? "").replace(/^\s+/, "");
  }
}

function stripTrailingWhitespace(child: any): void {
  if (child.type === "JSXText") {
    child.value = child.value.replace(/\s+$/, "");
    return;
  }
  if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
    child.expression.value = String(child.expression.value ?? "").replace(/\s+$/, "");
  }
}

function createSpaceExpressionNode(): any {
  return {
    type: "JSXExpressionContainer",
    expression: {
      type: "StringLiteral",
      value: " ",
    },
  };
}

function isTextLikeChild(child: any): boolean {
  return child.type === "JSXText" || (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral");
}

function isEmptyTextLikeChild(child: any): boolean {
  if (child.type === "JSXText") return child.value === "";
  if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
    return String(child.expression.value ?? "") === "";
  }
  return false;
}

function materializeBoundarySpaces(node: any, source: string, lineStarts = getLineStarts(source)): void {
  const children = node.children;
  if (!children || children.length === 0) return;

  for (const child of children) {
    if (child.type === "JSXElement") {
      materializeBoundarySpaces(child, source, lineStarts);
    }
  }

  for (let i = 1; i < children.length; i++) {
    const previousChild = children[i - 1];
    const nextChild = children[i];
    const previousText = getRenderedChildText(previousChild, source, lineStarts);
    const nextText = getRenderedChildText(nextChild, source, lineStarts);
    const sourceBetween = getSourceBetween(previousChild, nextChild, source, lineStarts);
    const boundaryWhitespaceInChildren = Boolean(
      previousText &&
      nextText &&
      (previousChild.type !== "JSXText" || nextChild.type !== "JSXText") &&
      (/\s$/.test(previousText) || /^\s/.test(nextText))
    );
    const hasBoundaryWhitespace = Boolean(previousText && nextText) &&
      (/\s/.test(sourceBetween) || boundaryWhitespaceInChildren);
    if (!hasBoundaryWhitespace) continue;

    const preferExplicitBoundary = previousChild.type !== "JSXText" || nextChild.type !== "JSXText";
    if (preferExplicitBoundary) {
      stripTrailingWhitespace(previousChild);
      stripLeadingWhitespace(nextChild);
      children.splice(i, 0, createSpaceExpressionNode());
      i++;
      continue;
    }

    if (prependToChildText(nextChild, " ")) continue;
    if (appendToChildText(previousChild, " ")) continue;

    children.splice(i, 0, { type: "JSXText", value: " " });
    i++;
  }

  const firstTextLike = children.findIndex(isTextLikeChild);
  if (firstTextLike !== -1) {
    stripLeadingWhitespace(children[firstTextLike]);
  }

  for (let i = children.length - 1; i >= 0; i--) {
    if (isTextLikeChild(children[i])) {
      stripTrailingWhitespace(children[i]);
      break;
    }
  }

  for (let i = children.length - 1; i >= 0; i--) {
    if (isEmptyTextLikeChild(children[i])) {
      children.splice(i, 1);
    }
  }
}

type ImmediateTextSegment =
  | { type: "child"; text: string; childIndex: number }
  | { type: "boundary"; text: string; leftChildIndex: number; rightChildIndex: number };

function buildImmediateTextSegments(parentNode: any, source?: string): ImmediateTextSegment[] {
  const children = parentNode.children;
  if (!children || children.length === 0) return [];

  const lineStarts = source ? getLineStarts(source) : undefined;
  const segments: ImmediateTextSegment[] = [];
  let previousChildIndex: number | null = null;
  let previousText = "";

  for (let i = 0; i < children.length; i++) {
    const childText = getRenderedChildText(children[i], source, lineStarts);
    if (!childText) continue;

    if (previousChildIndex != null) {
      const boundarySource = getSourceBetween(children[previousChildIndex], children[i], source, lineStarts);
      if (needsBoundarySpace(previousText, childText, boundarySource)) {
        segments.push({ type: "boundary", text: " ", leftChildIndex: previousChildIndex, rightChildIndex: i });
      }
    }

    segments.push({ type: "child", text: childText, childIndex: i });
    previousChildIndex = i;
    previousText = childText;
  }

  return segments;
}

function getSegmentsText(segments: ImmediateTextSegment[]): string {
  return segments.map((segment) => segment.text).join("");
}

function flattenRangeIntoText(parentNode: any, firstChildIndex: number, lastChildIndex: number, replacementText: string): boolean {
  const children = parentNode.children;
  if (!children) return false;
  if (replacementText === "") {
    children.splice(firstChildIndex, lastChildIndex - firstChildIndex + 1);
    return true;
  }
  children.splice(firstChildIndex, lastChildIndex - firstChildIndex + 1, { type: "JSXText", value: replacementText });
  return true;
}

function createInsertionNode(text: string): any {
  if (text === " ") return createSpaceExpressionNode();
  return { type: "JSXText", value: text };
}

function insertBetweenImmediateChildren(node: any, leftChildIndex: number, rightChildIndex: number, insertion: string): boolean {
  const children = node.children;
  if (!children || !insertion) return false;

  const leftChild = children[leftChildIndex];
  const rightChild = children[rightChildIndex];
  const preferExplicitBoundary = leftChild?.type !== "JSXText" || rightChild?.type !== "JSXText";
  if (!preferExplicitBoundary && rightChild?.type === "JSXText" && leftChildIndex + 1 === rightChildIndex) {
    rightChild.value = insertion + rightChild.value;
    return true;
  }

  children.splice(rightChildIndex, 0, createInsertionNode(insertion));
  return true;
}

/**
 * Replace text that spans across multiple child elements.
 *
 * When DOM textContent is "do software stuff" but the JSX is
 * "do <strong>software</strong> stuff", no single JSXText node contains
 * the full substring. This function builds a concatenated text from all
 * children, finds the match, then surgically modifies the affected nodes:
 * - First affected text node: trim matched portion, append newSub
 * - Middle children (fully consumed): removed
 * - Last affected text node: trim matched portion from start
 */
function replaceCrossElementText(parentNode: any, oldSub: string, newSub: string, source?: string, matchStartHint?: number): boolean {
  const children = parentNode.children;
  if (!children || children.length === 0) return false;
  const segments = buildImmediateTextSegments(parentNode, source);
  const concat = getSegmentsText(segments);

  // Find oldSub in the concatenated text
  const hintedMatch = matchStartHint != null && concat.slice(matchStartHint, matchStartHint + oldSub.length) === oldSub
    ? matchStartHint
    : -1;
  const matchStart = hintedMatch !== -1 ? hintedMatch : concat.indexOf(oldSub);
  if (matchStart === -1) return false;
  const matchEnd = matchStart + oldSub.length;

  let cursor = 0;
  let firstChildIndex = -1;
  let lastChildIndex = -1;
  let prefix = "";
  let suffix = "";

  for (const segment of segments) {
    const segmentStart = cursor;
    const segmentEnd = cursor + segment.text.length;
    cursor = segmentEnd;

    if (segmentEnd <= matchStart || segmentStart >= matchEnd) continue;

    if (segment.type === "boundary") {
      if (firstChildIndex === -1) firstChildIndex = segment.leftChildIndex;
      lastChildIndex = segment.rightChildIndex;
      continue;
    }

    if (firstChildIndex === -1) {
      firstChildIndex = segment.childIndex;
      prefix = segment.text.slice(0, Math.max(0, matchStart - segmentStart));
    }

    lastChildIndex = segment.childIndex;
    suffix = segment.text.slice(Math.max(0, matchEnd - segmentStart));
  }

  if (firstChildIndex === -1 || lastChildIndex === -1) return false;

  console.log(`[crossElement] match spans children[${firstChildIndex}..${lastChildIndex}], replacing "${oldSub.slice(0, 40)}" → "${newSub.slice(0, 40)}"`);
  return flattenRangeIntoText(parentNode, firstChildIndex, lastChildIndex, prefix + newSub + suffix);
}

/**
 * Find the differing substring between two strings.
 */
/** Collapse all whitespace runs (including newlines) to a single space. */
function normalizeWs(s: string): string {
  return s.replace(/\s+/g, " ");
}

function findTextDiff(oldText: string, newText: string): { oldSubstring: string; newSubstring: string; prefixLen: number } | null {
  if (oldText === newText) return null;

  let prefixLen = 0;
  while (prefixLen < oldText.length && prefixLen < newText.length && oldText[prefixLen] === newText[prefixLen]) {
    prefixLen++;
  }

  let oldSuffixStart = oldText.length;
  let newSuffixStart = newText.length;
  while (
    oldSuffixStart > prefixLen &&
    newSuffixStart > prefixLen &&
    oldText[oldSuffixStart - 1] === newText[newSuffixStart - 1]
  ) {
    oldSuffixStart--;
    newSuffixStart--;
  }

  const oldSubstring = oldText.slice(prefixLen, oldSuffixStart);
  const newSubstring = newText.slice(prefixLen, newSuffixStart);

  if (!oldSubstring && !newSubstring) return null;
  return { oldSubstring, newSubstring, prefixLen };
}

/**
 * Find the first JSXText node in an AST subtree.
 */
function findFirstJSXText(node: any): any | null {
  if (!node.children) return null;
  for (const child of node.children) {
    if (child.type === "JSXText" && child.value.trim()) return child;
    if (child.type === "JSXElement") {
      const found = findFirstJSXText(child);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Insert text at a character offset within the concatenated JSXText of a subtree.
 * Walks through JSXText nodes, tracking cumulative offset, and inserts when found.
 */
function insertInJSXTextAtOffset(node: any, offset: number, insertion: string, source?: string): boolean {
  const segments = buildImmediateTextSegments(node, source);
  if (segments.length === 0) return false;

  let cursor = 0;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentStart = cursor;
    const segmentEnd = cursor + segment.text.length;
    cursor = segmentEnd;

    if (offset < segmentStart || offset > segmentEnd) continue;

    if (segment.type === "boundary") {
      return insertBetweenImmediateChildren(node, segment.leftChildIndex, segment.rightChildIndex, insertion);
    }

    const child = node.children?.[segment.childIndex];
    if (!child) return false;

    const nextSegment = segments[i + 1];
    if (
      offset === segmentEnd &&
      nextSegment?.type === "child" &&
      nextSegment.childIndex !== segment.childIndex
    ) {
      return insertBetweenImmediateChildren(node, segment.childIndex, nextSegment.childIndex, insertion);
    }

    if (child.type === "JSXText") {
      const localOffset = Math.max(0, Math.min(child.value.length, offset - segmentStart));
      child.value = child.value.slice(0, localOffset) + insertion + child.value.slice(localOffset);
      return true;
    }

    if (child.type === "JSXElement") {
      return insertInJSXTextAtOffset(child, offset - segmentStart, insertion, source);
    }

    if (child.type === "JSXExpressionContainer" && child.expression?.type === "StringLiteral") {
      const value = String(child.expression.value ?? "");
      const localOffset = Math.max(0, Math.min(value.length, offset - segmentStart));
      child.expression.value = value.slice(0, localOffset) + insertion + value.slice(localOffset);
      return true;
    }

    return false;
  }

  const lastSegment = segments[segments.length - 1];
  if (lastSegment.type === "child") {
    const child = node.children?.[lastSegment.childIndex];
    if (child?.type === "JSXText") {
      child.value += insertion;
      return true;
    }
  }

  return false;
}

function collectJSXTextNodes(node: any, result: any[]): void {
  if (!node.children) return;
  for (const child of node.children) {
    if (child.type === "JSXText") result.push(child);
    if (child.type === "JSXElement") collectJSXTextNodes(child, result);
  }
}

/**
 * Replace text content of a JSX element at the given source position.
 * Returns the new source string, or null if no matching text child was found.
 */
export function updateTextContent(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  originalText: string,
  newText: string,
  cursorOffset?: number,
): string | null {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  const target = findJSXElementAt(j, root, lineNumber, columnNumber);
  if (!target) return null;

  if (mutateTextContent(target, originalText, newText, source, cursorOffset)) {
    return root.toSource({ quote: quoteStyle });
  }
  return null;
}

# Property Inspector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visual property inspector sidebar that enables instant inline preview (Layer 1), commit to source via Tailwind className AST transforms (Layer 2), and undo/cancel integration (Layer 3) for ~30 CSS properties.

**Architecture:** Unified PropertyController owns the lifecycle (inspect → preview → commit/cancel). Properties are defined declaratively via descriptor objects. ~5 reusable control components render UI based on descriptor type. Browser reads Tailwind tokens from CSS custom properties + CLI-sent config. CLI runs jscodeshift transforms to update className in source files.

**Tech Stack:** TypeScript, jscodeshift (AST), tsup (IIFE bundle), WebSocket, Tailwind CSS v3+v4, bippy (React fiber traversal), vitest (testing)

**Spec:** `docs/superpowers/specs/2026-03-21-property-inspector-design.md`

---

## File Map

### New Files

| File | Responsibility |
|------|---------------|
| `packages/shared/src/types.ts` | (modify) Add PropertyDescriptor, TailwindTokenMap, new message types, TransformErrorCode, CanvasUndoAction |
| `packages/overlay/src/properties/property-descriptors.ts` | ~30 property descriptor constants |
| `packages/overlay/src/properties/tailwind-resolver.ts` | Read CSS custom props from live page, merge with CLI tokens, expose token maps |
| `packages/overlay/src/properties/controls/number-scrub.ts` | Drag-to-scrub number input with Tailwind snap points |
| `packages/overlay/src/properties/controls/segmented.ts` | Icon segmented control for enum properties |
| `packages/overlay/src/properties/controls/color-swatch.ts` | Color swatch + text input, opens existing color picker |
| `packages/overlay/src/properties/controls/slider.ts` | Horizontal slider (opacity) |
| `packages/overlay/src/properties/controls/box-model.ts` | Nested rectangle diagram for padding/margin |
| `packages/overlay/src/properties/section-renderer.ts` | Groups descriptors by group, renders collapsible sections, instantiates controls |
| `packages/overlay/src/properties/property-sidebar.ts` | Sidebar container: slide in/out, resize handle, scroll, header |
| `packages/overlay/src/properties/property-controller.ts` | Lifecycle owner: inspect/preview/commit/cancel/deselect, HMR survival |
| `packages/cli/src/tailwind-resolver.ts` | Resolve Tailwind config (v3 resolveConfig, v4 @theme parsing), build reverse map, send tokens |
| `packages/cli/src/__tests__/fixtures/classname-string.tsx` | Test fixture: string literal className |
| `packages/cli/src/__tests__/fixtures/classname-cn.tsx` | Test fixture: cn()/clsx() className |
| `packages/cli/src/__tests__/fixtures/classname-template.tsx` | Test fixture: template literal className |
| `packages/cli/src/__tests__/fixtures/classname-dynamic.tsx` | Test fixture: dynamic className |
| `packages/cli/src/__tests__/fixtures/classname-none.tsx` | Test fixture: no className prop |
| `packages/cli/src/__tests__/update-classname.test.ts` | Tests for the new updateClassName transform |
| `packages/overlay/src/properties/__tests__/tailwind-resolver.test.ts` | Tests for CSS custom property reading + merge logic |

### Modified Files

| File | Changes |
|------|---------|
| `packages/shared/src/types.ts` | New types: PropertyDescriptor, ControlType, PropertyGroup, EnumOption, TailwindTokenMap, TransformErrorCode, new ClientMessage/ServerMessage variants, new CanvasUndoAction variant |
| `packages/cli/src/transform.ts` | New export: `updateClassName()` function |
| `packages/cli/src/server.ts` | New cases in processQueue: `updateProperty`, `updateProperties`. New on-connection: send `tailwindTokens`. Import tailwind-resolver. |
| `packages/overlay/src/canvas-state.ts` | New CanvasUndoAction `propertyChange`, `peekUndoStack()` helper |
| `packages/overlay/src/selection.ts` | Hook into `selectElement()` to call property controller `inspect()`. Hook into `clearSelection()` to call `deselect()`. Hook into `handleKeyDown` for Escape → cancel/deselect. Export `selectedElement` getter. |
| `packages/overlay/src/bridge.ts` | Handle `tailwindTokens` message, store received tokens |
| `packages/overlay/src/index.ts` | Initialize property controller, connect bridge token handler |
| `packages/overlay/src/interaction.ts` | Wire Escape key → property controller cancel/deselect priority |

---

## Task 1: Shared Types

**Files:**
- Modify: `packages/shared/src/types.ts`

- [ ] **Step 1: Add PropertyDescriptor and related types**

Add after the existing `SiblingInfo` interface (around line 54):

```typescript
// --- Property Inspector Types ---

export type ControlType = "number-scrub" | "segmented" | "color-swatch" | "slider" | "box-model";
export type PropertyGroup = "layout" | "spacing" | "size" | "typography" | "background" | "border" | "effects";

export interface PropertyDescriptor {
  key: string;
  label: string;
  group: PropertyGroup;
  controlType: ControlType;
  cssProperty: string;
  tailwindPrefix: string;
  tailwindScale: string;
  relatedPrefixes?: string[];
  defaultValue: string;
  enumValues?: EnumOption[];
  min?: number;
  max?: number;
  compound?: boolean;
  compoundGroup?: string;
  /** When true, the Tailwind class is a standalone utility (e.g. "flex", "block")
   *  not a prefix-value pair. The tailwindValue from enumValues IS the full class name. */
  standalone?: boolean;
  /** Regex pattern to match this property's Tailwind classes. Resolves prefix collisions
   *  (e.g. "text" is used by fontSize, textAlign, and color). If not provided,
   *  defaults to matching `tailwindPrefix-*`. */
  classPattern?: string;
}

export interface EnumOption {
  value: string;
  tailwindValue: string;
  icon?: string;
  label: string;
}

export interface TailwindTokenMap {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  borderRadius: Record<string, string>;
  borderWidth: Record<string, string>;
  opacity: Record<string, string>;
  letterSpacing: Record<string, string>;
  lineHeight: Record<string, string>;
  spacingReverse: Record<string, string>;
  colorsReverse: Record<string, string>;
  fontSizeReverse: Record<string, string>;
  fontWeightReverse: Record<string, string>;
  borderRadiusReverse: Record<string, string>;
  borderWidthReverse: Record<string, string>;
  opacityReverse: Record<string, string>;
  letterSpacingReverse: Record<string, string>;
  lineHeightReverse: Record<string, string>;
}

export type TransformErrorCode =
  | "DYNAMIC_CLASSNAME"
  | "FILE_CHANGED"
  | "MAPPED_ELEMENT"
  | "CONFLICTING_CLASS";

export interface ElementIdentity {
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  tagName: string;
}
```

- [ ] **Step 2: Add new ClientMessage variants**

Add to the `ClientMessage` union:

```typescript
  | {
      type: "updateProperty";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      property: string;
      cssProperty: string;
      value: string;
      tailwindPrefix: string;
      tailwindToken: string | null;
      relatedPrefixes?: string[];
      originalValue: string;
      framework: "tailwind";
    }
  | {
      type: "updateProperties";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      updates: Array<{
        property: string;
        cssProperty: string;
        value: string;
        tailwindPrefix: string;
        tailwindToken: string | null;
        relatedPrefixes?: string[];
        originalValue: string;
      }>;
      framework: "tailwind";
    }
```

- [ ] **Step 3: Add new ServerMessage variants**

Add to the `ServerMessage` union:

```typescript
  | {
      type: "updatePropertyComplete";
      success: boolean;
      error?: string;
      errorCode?: TransformErrorCode;
    }
  | { type: "tailwindTokens"; tokens: TailwindTokenMap }
```

- [ ] **Step 4: Add new CanvasUndoAction variant**

Add to the `CanvasUndoAction` union:

```typescript
  | {
      type: "propertyChange";
      elementIdentity: ElementIdentity;
      overrides: Array<{ cssProperty: string; previousValue: string; newValue: string }>;
    }
```

- [ ] **Step 5: Build and verify**

Run: `cd packages/shared && pnpm build`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add property inspector types — descriptors, messages, token map"
```

---

## Task 2: Property Descriptors

**Files:**
- Create: `packages/overlay/src/properties/property-descriptors.ts`

- [ ] **Step 1: Create the descriptors file with all ~30 property definitions**

This is pure data — no logic. Each descriptor defines a property's identity, control type, Tailwind mapping, and behavior hints. The file structure:

```typescript
import type { PropertyDescriptor } from "@sketch-ui/shared";

// --- Layout ---
export const LAYOUT_DESCRIPTORS: PropertyDescriptor[] = [
  {
    key: "display",
    label: "Display",
    group: "layout",
    controlType: "segmented",
    cssProperty: "display",
    tailwindPrefix: "",            // standalone: class IS the value (flex, block, grid, hidden)
    tailwindScale: "display",
    defaultValue: "block",
    standalone: true,              // class is bare utility name, not prefix-value
    classPattern: "^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",
    enumValues: [
      { value: "block", tailwindValue: "block", label: "Block" },
      { value: "flex", tailwindValue: "flex", label: "Flex" },
      { value: "grid", tailwindValue: "grid", label: "Grid" },
      { value: "inline-flex", tailwindValue: "inline-flex", label: "Inline Flex" },
      { value: "none", tailwindValue: "hidden", label: "None" },
    ],
  },
  {
    key: "flexDirection",
    label: "Direction",
    group: "layout",
    controlType: "segmented",
    cssProperty: "flex-direction",
    tailwindPrefix: "flex",
    tailwindScale: "flexDirection",
    defaultValue: "row",
    // classPattern disambiguates from flex-1, flex-wrap, etc.
    classPattern: "^flex-(row|col|row-reverse|col-reverse)$",
    enumValues: [
      { value: "row", tailwindValue: "row", label: "Row", icon: "→" },
      { value: "column", tailwindValue: "col", label: "Column", icon: "↓" },
      { value: "row-reverse", tailwindValue: "row-reverse", label: "Row Reverse", icon: "←" },
      { value: "column-reverse", tailwindValue: "col-reverse", label: "Column Reverse", icon: "↑" },
    ],
  },
  {
    key: "justifyContent",
    label: "Justify",
    group: "layout",
    controlType: "segmented",
    cssProperty: "justify-content",
    tailwindPrefix: "justify",
    tailwindScale: "justifyContent",
    defaultValue: "flex-start",
    enumValues: [
      { value: "flex-start", tailwindValue: "start", label: "Start" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "flex-end", tailwindValue: "end", label: "End" },
      { value: "space-between", tailwindValue: "between", label: "Between" },
      { value: "space-around", tailwindValue: "around", label: "Around" },
      { value: "space-evenly", tailwindValue: "evenly", label: "Evenly" },
    ],
  },
  {
    key: "alignItems",
    label: "Align",
    group: "layout",
    controlType: "segmented",
    cssProperty: "align-items",
    tailwindPrefix: "items",
    tailwindScale: "alignItems",
    defaultValue: "stretch",
    enumValues: [
      { value: "flex-start", tailwindValue: "start", label: "Start" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "flex-end", tailwindValue: "end", label: "End" },
      { value: "stretch", tailwindValue: "stretch", label: "Stretch" },
      { value: "baseline", tailwindValue: "baseline", label: "Baseline" },
    ],
  },
  {
    key: "gap",
    label: "Gap",
    group: "layout",
    controlType: "number-scrub",
    cssProperty: "gap",
    tailwindPrefix: "gap",
    tailwindScale: "spacing",
    defaultValue: "0",
    min: 0,
  },
];

// --- Spacing (compound: box-model) ---
export const SPACING_DESCRIPTORS: PropertyDescriptor[] = [
  // Padding
  { key: "paddingTop", label: "Top", group: "spacing", controlType: "box-model", cssProperty: "padding-top", tailwindPrefix: "pt", tailwindScale: "spacing", relatedPrefixes: ["p", "py"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingRight", label: "Right", group: "spacing", controlType: "box-model", cssProperty: "padding-right", tailwindPrefix: "pr", tailwindScale: "spacing", relatedPrefixes: ["p", "px"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingBottom", label: "Bottom", group: "spacing", controlType: "box-model", cssProperty: "padding-bottom", tailwindPrefix: "pb", tailwindScale: "spacing", relatedPrefixes: ["p", "py"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingLeft", label: "Left", group: "spacing", controlType: "box-model", cssProperty: "padding-left", tailwindPrefix: "pl", tailwindScale: "spacing", relatedPrefixes: ["p", "px"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  // Margin
  { key: "marginTop", label: "Top", group: "spacing", controlType: "box-model", cssProperty: "margin-top", tailwindPrefix: "mt", tailwindScale: "spacing", relatedPrefixes: ["m", "my"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginRight", label: "Right", group: "spacing", controlType: "box-model", cssProperty: "margin-right", tailwindPrefix: "mr", tailwindScale: "spacing", relatedPrefixes: ["m", "mx"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginBottom", label: "Bottom", group: "spacing", controlType: "box-model", cssProperty: "margin-bottom", tailwindPrefix: "mb", tailwindScale: "spacing", relatedPrefixes: ["m", "my"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginLeft", label: "Left", group: "spacing", controlType: "box-model", cssProperty: "margin-left", tailwindPrefix: "ml", tailwindScale: "spacing", relatedPrefixes: ["m", "mx"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
];

// --- Size ---
export const SIZE_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "width", label: "W", group: "size", controlType: "number-scrub", cssProperty: "width", tailwindPrefix: "w", tailwindScale: "spacing", defaultValue: "auto", min: 0 },
  { key: "height", label: "H", group: "size", controlType: "number-scrub", cssProperty: "height", tailwindPrefix: "h", tailwindScale: "spacing", defaultValue: "auto", min: 0 },
  { key: "minWidth", label: "Min W", group: "size", controlType: "number-scrub", cssProperty: "min-width", tailwindPrefix: "min-w", tailwindScale: "spacing", defaultValue: "0", min: 0 },
  { key: "maxWidth", label: "Max W", group: "size", controlType: "number-scrub", cssProperty: "max-width", tailwindPrefix: "max-w", tailwindScale: "spacing", defaultValue: "none" },
  { key: "minHeight", label: "Min H", group: "size", controlType: "number-scrub", cssProperty: "min-height", tailwindPrefix: "min-h", tailwindScale: "spacing", defaultValue: "0", min: 0 },
  { key: "maxHeight", label: "Max H", group: "size", controlType: "number-scrub", cssProperty: "max-height", tailwindPrefix: "max-h", tailwindScale: "spacing", defaultValue: "none" },
];

// --- Typography ---
export const TYPOGRAPHY_DESCRIPTORS: PropertyDescriptor[] = [
  // text- prefix is shared by fontSize, textAlign, and color.
  // classPattern disambiguates: fontSize matches text-(xs|sm|base|lg|xl|...|[...])
  { key: "fontSize", label: "Size", group: "typography", controlType: "number-scrub", cssProperty: "font-size", tailwindPrefix: "text", tailwindScale: "fontSize", defaultValue: "16px", min: 0, classPattern: "^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$" },
  {
    key: "fontWeight", label: "Weight", group: "typography", controlType: "segmented", cssProperty: "font-weight", tailwindPrefix: "font", tailwindScale: "fontWeight", defaultValue: "400",
    enumValues: [
      { value: "100", tailwindValue: "thin", label: "100" },
      { value: "200", tailwindValue: "extralight", label: "200" },
      { value: "300", tailwindValue: "light", label: "300" },
      { value: "400", tailwindValue: "normal", label: "400" },
      { value: "500", tailwindValue: "medium", label: "500" },
      { value: "600", tailwindValue: "semibold", label: "600" },
      { value: "700", tailwindValue: "bold", label: "700" },
      { value: "800", tailwindValue: "extrabold", label: "800" },
      { value: "900", tailwindValue: "black", label: "900" },
    ],
  },
  { key: "lineHeight", label: "Height", group: "typography", controlType: "number-scrub", cssProperty: "line-height", tailwindPrefix: "leading", tailwindScale: "lineHeight", defaultValue: "normal" },
  { key: "letterSpacing", label: "Spacing", group: "typography", controlType: "number-scrub", cssProperty: "letter-spacing", tailwindPrefix: "tracking", tailwindScale: "letterSpacing", defaultValue: "normal" },
  {
    key: "textAlign", label: "Align", group: "typography", controlType: "segmented", cssProperty: "text-align", tailwindPrefix: "text", tailwindScale: "textAlign", defaultValue: "left",
    classPattern: "^text-(left|center|right|justify|start|end)$",
    enumValues: [
      { value: "left", tailwindValue: "left", label: "Left" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "right", tailwindValue: "right", label: "Right" },
      { value: "justify", tailwindValue: "justify", label: "Justify" },
    ],
  },
  // text- for color matches text-{color}-{shade} and text-[#hex]
  { key: "color", label: "Color", group: "typography", controlType: "color-swatch", cssProperty: "color", tailwindPrefix: "text", tailwindScale: "colors", defaultValue: "#000000", classPattern: "^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$" },
];

// --- Background ---
export const BACKGROUND_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "backgroundColor", label: "Color", group: "background", controlType: "color-swatch", cssProperty: "background-color", tailwindPrefix: "bg", tailwindScale: "colors", defaultValue: "transparent" },
];

// --- Border ---
export const BORDER_DESCRIPTORS: PropertyDescriptor[] = [
  // border- prefix is shared by borderWidth, borderColor, borderStyle.
  // classPattern disambiguates each.
  { key: "borderWidth", label: "Width", group: "border", controlType: "number-scrub", cssProperty: "border-width", tailwindPrefix: "border", tailwindScale: "borderWidth", defaultValue: "0", min: 0, classPattern: "^border-(\\d+|\\[.+\\])$" },
  { key: "borderColor", label: "Color", group: "border", controlType: "color-swatch", cssProperty: "border-color", tailwindPrefix: "border", tailwindScale: "colors", defaultValue: "#000000", classPattern: "^border-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$" },
  {
    key: "borderStyle", label: "Style", group: "border", controlType: "segmented", cssProperty: "border-style", tailwindPrefix: "border", tailwindScale: "borderStyle", defaultValue: "none",
    classPattern: "^border-(solid|dashed|dotted|double|none)$",
    enumValues: [
      { value: "solid", tailwindValue: "solid", label: "Solid" },
      { value: "dashed", tailwindValue: "dashed", label: "Dashed" },
      { value: "dotted", tailwindValue: "dotted", label: "Dotted" },
      { value: "none", tailwindValue: "none", label: "None" },
    ],
  },
  // border-radius: shorthand + 4 individual corners
  { key: "borderRadius", label: "Radius", group: "border", controlType: "number-scrub", cssProperty: "border-radius", tailwindPrefix: "rounded", tailwindScale: "borderRadius", defaultValue: "0", min: 0 },
  { key: "borderTopLeftRadius", label: "TL", group: "border", controlType: "number-scrub", cssProperty: "border-top-left-radius", tailwindPrefix: "rounded-tl", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-t", "rounded-l"], defaultValue: "0", min: 0 },
  { key: "borderTopRightRadius", label: "TR", group: "border", controlType: "number-scrub", cssProperty: "border-top-right-radius", tailwindPrefix: "rounded-tr", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-t", "rounded-r"], defaultValue: "0", min: 0 },
  { key: "borderBottomRightRadius", label: "BR", group: "border", controlType: "number-scrub", cssProperty: "border-bottom-right-radius", tailwindPrefix: "rounded-br", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-b", "rounded-r"], defaultValue: "0", min: 0 },
  { key: "borderBottomLeftRadius", label: "BL", group: "border", controlType: "number-scrub", cssProperty: "border-bottom-left-radius", tailwindPrefix: "rounded-bl", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-b", "rounded-l"], defaultValue: "0", min: 0 },
];

// --- Effects ---
export const EFFECTS_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "opacity", label: "Opacity", group: "effects", controlType: "slider", cssProperty: "opacity", tailwindPrefix: "opacity", tailwindScale: "opacity", defaultValue: "1", min: 0, max: 100 },
];

// All descriptors in group order
export const ALL_DESCRIPTORS: PropertyDescriptor[] = [
  ...LAYOUT_DESCRIPTORS,
  ...SPACING_DESCRIPTORS,
  ...SIZE_DESCRIPTORS,
  ...TYPOGRAPHY_DESCRIPTORS,
  ...BACKGROUND_DESCRIPTORS,
  ...BORDER_DESCRIPTORS,
  ...EFFECTS_DESCRIPTORS,
];
```

- [ ] **Step 2: Verify file compiles**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors (may need to wait for shared types from Task 1)

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/property-descriptors.ts
git commit -m "feat(overlay): add ~30 property descriptors for inspector"
```

---

## Task 3: CLI Tailwind Config Resolver

**Files:**
- Create: `packages/cli/src/tailwind-resolver.ts`

- [ ] **Step 1: Write tests for Tailwind resolution**

Create `packages/cli/src/__tests__/tailwind-resolver.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveTailwindConfig, parseThemeBlock } from "../tailwind-resolver.js";

describe("parseThemeBlock", () => {
  it("extracts CSS custom properties from @theme block", () => {
    const css = `
      @theme {
        --color-brand: #1a2b3c;
        --spacing-18: 4.5rem;
      }
    `;
    const result = parseThemeBlock(css);
    expect(result).toEqual({
      "--color-brand": "#1a2b3c",
      "--spacing-18": "4.5rem",
    });
  });

  it("returns empty object when no @theme block", () => {
    const css = `body { margin: 0; }`;
    expect(parseThemeBlock(css)).toEqual({});
  });

  it("handles multiple @theme blocks", () => {
    const css = `
      @theme {
        --color-a: red;
      }
      @theme {
        --color-b: blue;
      }
    `;
    const result = parseThemeBlock(css);
    expect(result["--color-a"]).toBe("red");
    expect(result["--color-b"]).toBe("blue");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/cli && npx vitest run src/__tests__/tailwind-resolver.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement the Tailwind resolver**

Create `packages/cli/src/tailwind-resolver.ts`. Key functions:
- `detectTailwindVersion(projectRoot)` — reads `node_modules/tailwindcss/package.json`
- `parseThemeBlock(css)` — extracts `--key: value` pairs from `@theme { ... }` blocks
- `resolveV3Config(projectRoot)` — uses `require('tailwindcss/resolveConfig')`
- `resolveV4Config(projectRoot)` — finds CSS file with `@theme`, parses it, merges with defaults
- `buildTokenMap(theme)` — builds forward + reverse maps for all scales
- `resolveTailwindConfig(projectRoot)` — main entry, returns `TailwindConfig`

The v4 `@theme` parser is a simple regex:
```typescript
export function parseThemeBlock(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const themeBlockRegex = /@theme\s*\{([^}]+)\}/g;
  let match;
  while ((match = themeBlockRegex.exec(css)) !== null) {
    const block = match[1];
    const propRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let propMatch;
    while ((propMatch = propRegex.exec(block)) !== null) {
      tokens[propMatch[1].trim()] = propMatch[2].trim();
    }
  }
  return tokens;
}
```

Include a hardcoded `DEFAULT_V4_THEME` snapshot with Tailwind v4's default spacing (0-96), colors (all standard palettes), fontSize (xs-9xl), fontWeight, borderRadius, opacity scales.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/cli && npx vitest run src/__tests__/tailwind-resolver.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/tailwind-resolver.ts packages/cli/src/__tests__/tailwind-resolver.test.ts
git commit -m "feat(cli): add Tailwind config resolver with v3 resolveConfig and v4 @theme parsing"
```

---

## Task 4: updateClassName AST Transform

**Files:**
- Create: `packages/cli/src/__tests__/fixtures/classname-string.tsx`
- Create: `packages/cli/src/__tests__/fixtures/classname-cn.tsx`
- Create: `packages/cli/src/__tests__/fixtures/classname-template.tsx`
- Create: `packages/cli/src/__tests__/fixtures/classname-dynamic.tsx`
- Create: `packages/cli/src/__tests__/fixtures/classname-none.tsx`
- Create: `packages/cli/src/__tests__/update-classname.test.ts`
- Modify: `packages/cli/src/transform.ts`

- [ ] **Step 1: Create test fixtures**

`classname-string.tsx`:
```tsx
export default function Card() {
  return (
    <div className="flex p-4 bg-white rounded-lg">
      <h2 className="text-lg font-bold">Title</h2>
      <p className="text-sm text-gray-500">Description</p>
    </div>
  );
}
```

`classname-cn.tsx`:
```tsx
import { cn } from "@/lib/utils";
export default function Button({ active }: { active: boolean }) {
  return (
    <button className={cn("flex p-4", active && "bg-blue-500", "text-white")}>
      Click
    </button>
  );
}
```

`classname-template.tsx`:
```tsx
export default function Badge({ color }: { color: string }) {
  return (
    <span className={`flex px-4 py-2 ${color}`}>Badge</span>
  );
}
```

`classname-dynamic.tsx`:
```tsx
export default function Dynamic({ cls }: { cls: string }) {
  return <div className={cls}>Dynamic</div>;
}
```

`classname-none.tsx`:
```tsx
export default function Bare() {
  return <button>Click me</button>;
}
```

- [ ] **Step 2: Write tests for updateClassName**

Create `packages/cli/src/__tests__/update-classname.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { updateClassName } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

function findElement(fixture: string, tag: string): { line: number; col: number } {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const col = lines[i].indexOf(`<${tag}`);
    if (col !== -1) return { line: i + 1, col }; // 0-indexed col
  }
  throw new Error(`<${tag}> not found in ${fixture}`);
}

describe("updateClassName", () => {
  describe("string literal className", () => {
    it("replaces an existing Tailwind class", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-6");
      expect(result).not.toContain("p-4");
    });

    it("splits px shorthand when editing one side", () => {
      const fixture = path.join(fixturesDir, "classname-template.tsx");
      const { line, col } = findElement("classname-template.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "pl",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: ["p", "px"],
      }]);
      expect(result).toContain("pl-6");
      expect(result).toContain("pr-4");
      expect(result).not.toContain("px-4");
    });

    it("writes arbitrary value when no token match", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: null,
        value: "13px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-[13px]");
      expect(result).not.toContain("p-4");
    });
  });

  describe("cn()/clsx() className", () => {
    it("modifies the correct string argument", () => {
      const fixture = path.join(fixturesDir, "classname-cn.tsx");
      const { line, col } = findElement("classname-cn.tsx", "button");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-6");
      expect(result).not.toContain("p-4");
    });

    it("throws CONFLICTING_CLASS when prefix is in conditional arg", () => {
      const fixture = path.join(fixturesDir, "classname-cn.tsx");
      const { line, col } = findElement("classname-cn.tsx", "button");
      expect(() => updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "red-500",
        value: "#ef4444",
        relatedPrefixes: [],
      }])).toThrow(/CONFLICTING_CLASS/);
    });
  });

  describe("no className", () => {
    it("creates className prop with the new class", () => {
      const fixture = path.join(fixturesDir, "classname-none.tsx");
      const { line, col } = findElement("classname-none.tsx", "button");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain('className="p-4"');
    });
  });

  describe("dynamic className", () => {
    it("throws DYNAMIC_CLASSNAME error", () => {
      const fixture = path.join(fixturesDir, "classname-dynamic.tsx");
      const { line, col } = findElement("classname-dynamic.tsx", "div");
      expect(() => updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }])).toThrow(/DYNAMIC_CLASSNAME/);
    });
  });

  describe("template literal className", () => {
    it("replaces class in static part of template literal", () => {
      const fixture = path.join(fixturesDir, "classname-template.tsx");
      const { line, col } = findElement("classname-template.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "py",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: ["p"],
      }]);
      expect(result).toContain("py-4");
      expect(result).not.toContain("py-2");
    });
  });

  describe("full shorthand splitting (p-4 → individual sides)", () => {
    it("splits p-4 into all four sides when editing one", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "pt",
        tailwindToken: "8",
        value: "32px",
        relatedPrefixes: ["p", "py"],
      }]);
      expect(result).toContain("pt-8");
      expect(result).toContain("pr-4");
      expect(result).toContain("pb-4");
      expect(result).toContain("pl-4");
      expect(result).not.toContain(" p-4");
    });
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd packages/cli && npx vitest run src/__tests__/update-classname.test.ts`
Expected: FAIL — `updateClassName` not exported

- [ ] **Step 4: Implement updateClassName in transform.ts**

Add to `packages/cli/src/transform.ts`. The function needs to:

1. Parse file with jscodeshift
2. Find JSX element at line:column (extend existing `findAtLine` to `findAtLineCol`)
3. Find className attribute — handle string literal, template literal, call expression (cn/clsx), or missing
4. For each update: build target class, scan existing classes, split shorthands via `SHORTHAND_SPLITS` table, replace
5. Return modified source

The `SHORTHAND_SPLITS` table (from spec) goes in `transform.ts`. Export `updateClassName`.

Key implementation details:
- Use `j.JSXAttribute` to find `className` on the element
- For string literals: split on spaces, find/replace the class, join
- For call expressions: iterate `arguments`, find `StringLiteral` args, scan each for the prefix
- For conditionals in call args (`LogicalExpression`): if the prefix is found there, throw `CONFLICTING_CLASS`
- If no className: create a `j.jsxAttribute(j.jsxIdentifier("className"), j.stringLiteral(newClass))`
- Column matching: `node.openingElement.loc.start.column === columnNumber` (both 0-indexed)
- **Class matching uses `classPattern` when available**: instead of simple prefix matching,
  use `new RegExp(descriptor.classPattern)` to test each class. This resolves collisions
  where multiple properties share a prefix (text-lg vs text-left vs text-red-500,
  border-2 vs border-solid vs border-red-500). When `classPattern` is not provided,
  fall back to `class.startsWith(prefix + "-")`.
- **Standalone properties** (display): when `standalone: true`, the class IS the value
  (e.g. "flex", "block"). Scan existing classes against `classPattern` to find the
  one to replace, and write the new `tailwindValue` directly as the class name.

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd packages/cli && npx vitest run src/__tests__/update-classname.test.ts`
Expected: PASS

- [ ] **Step 6: Run existing transform tests to ensure no regressions**

Run: `cd packages/cli && npx vitest run`
Expected: All 13 existing tests + new tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/cli/src/transform.ts packages/cli/src/__tests__/update-classname.test.ts packages/cli/src/__tests__/fixtures/classname-*.tsx
git commit -m "feat(cli): add updateClassName AST transform with shorthand splitting"
```

---

## Task 5: CLI Server — Handle updateProperty Messages

**Files:**
- Modify: `packages/cli/src/server.ts`

- [ ] **Step 1: Add updateProperty/updateProperties cases to processQueue**

In `server.ts`, import `updateClassName` from `./transform.js` and `resolveTailwindConfig` from `./tailwind-resolver.js`.

Add new cases in the `processQueue` switch:

```typescript
case "updateProperty": {
  const prevContent = fs.readFileSync(msg.filePath, "utf-8");
  undoStack.push({ filePath: msg.filePath, content: prevContent, timestamp: Date.now() });
  try {
    const newSource = updateClassName(msg.filePath, msg.lineNumber, msg.columnNumber, [{
      tailwindPrefix: msg.tailwindPrefix,
      tailwindToken: msg.tailwindToken,
      value: msg.value,
      relatedPrefixes: msg.relatedPrefixes,
    }]);
    fs.writeFileSync(msg.filePath, newSource, "utf-8");
    send(ws, { type: "updatePropertyComplete", success: true });
  } catch (err) {
    undoStack.pop();
    const errorCode = extractErrorCode(err);
    send(ws, {
      type: "updatePropertyComplete",
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode,
    });
  }
  break;
}

case "updateProperties": {
  const prevContent = fs.readFileSync(msg.filePath, "utf-8");
  undoStack.push({ filePath: msg.filePath, content: prevContent, timestamp: Date.now() });
  try {
    const newSource = updateClassName(
      msg.filePath, msg.lineNumber, msg.columnNumber,
      msg.updates.map(u => ({
        tailwindPrefix: u.tailwindPrefix,
        tailwindToken: u.tailwindToken,
        value: u.value,
        relatedPrefixes: u.relatedPrefixes,
      }))
    );
    fs.writeFileSync(msg.filePath, newSource, "utf-8");
    send(ws, { type: "updatePropertyComplete", success: true });
  } catch (err) {
    undoStack.pop();
    const errorCode = extractErrorCode(err);
    send(ws, {
      type: "updatePropertyComplete",
      success: false,
      error: err instanceof Error ? err.message : String(err),
      errorCode,
    });
  }
  break;
}
```

Add `"updateProperty"` and `"updateProperties"` to the sequential processing switch in the `ws.on("message")` handler (alongside `"reorder"` and `"undo"`).

- [ ] **Step 2: Send tailwindTokens on connection**

In the `wss.on("connection")` handler, after setting `activeClient`:

```typescript
// Resolve and send Tailwind tokens
try {
  const projectRoot = process.cwd(); // or pass from CLI args
  const config = resolveTailwindConfig(projectRoot);
  send(ws, { type: "tailwindTokens", tokens: config.tokens });
} catch (err) {
  console.warn("[SketchUI] Could not resolve Tailwind config:", err);
  // Continue without tokens — browser can still read CSS custom properties
}
```

- [ ] **Step 3: Add extractErrorCode helper**

```typescript
function extractErrorCode(err: unknown): TransformErrorCode | undefined {
  if (err instanceof Error) {
    const match = err.message.match(/^(DYNAMIC_CLASSNAME|FILE_CHANGED|MAPPED_ELEMENT|CONFLICTING_CLASS)/);
    if (match) return match[1] as TransformErrorCode;
  }
  return undefined;
}
```

- [ ] **Step 4: Build and verify**

Run: `cd packages/cli && pnpm build`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat(cli): handle updateProperty/updateProperties messages and send tailwindTokens on connect"
```

---

## Task 6: Overlay Tailwind Resolver (Browser-Side)

**Files:**
- Create: `packages/overlay/src/properties/tailwind-resolver.ts`
- Create: `packages/overlay/src/properties/__tests__/tailwind-resolver.test.ts`

- [ ] **Step 1: Write tests**

```typescript
import { describe, it, expect } from "vitest";
import { readCSSCustomProperties, mergeTokenMaps, resolveTokenForValue } from "../tailwind-resolver.js";

describe("resolveTokenForValue", () => {
  it("returns token name when value matches", () => {
    const reverseMap = new Map([["16px", "4"], ["24px", "6"]]);
    expect(resolveTokenForValue("16px", reverseMap)).toBe("4");
  });

  it("returns null for arbitrary values", () => {
    const reverseMap = new Map([["16px", "4"], ["24px", "6"]]);
    expect(resolveTokenForValue("13px", reverseMap)).toBeNull();
  });
});

describe("mergeTokenMaps", () => {
  it("CLI tokens override browser tokens", () => {
    const browser = { spacing: { "4": "16px" }, spacingReverse: { "16px": "4" } };
    const cli = { spacing: { "4": "16px", "18": "72px" }, spacingReverse: { "16px": "4", "72px": "18" } };
    const merged = mergeTokenMaps(browser, cli);
    expect(merged.spacing.get("18")).toBe("72px");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/overlay/src/properties/__tests__/tailwind-resolver.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement browser-side tailwind resolver**

The resolver does:
1. `readCSSCustomProperties()` — reads `getComputedStyle(document.documentElement)` and extracts Tailwind-shaped CSS variables (`--spacing-*`, `--color-*`, etc.)
2. `mergeTokenMaps(browserTokens, cliTokens)` — merges both sources, CLI wins on conflict. Converts `Record<string, string>` to `Map<string, string>` internally.
3. `resolveTokenForValue(cssValue, reverseMap)` — looks up a CSS value in the reverse map, returns token name or null
4. `getSnapPoints(scale, currentValue)` — returns sorted snap points for a given scale, including the current arbitrary value if off-scale
5. Stores the merged token map in module state, updated when CLI sends `tailwindTokens`

- [ ] **Step 4: Run tests**

Run: `npx vitest run packages/overlay/src/properties/__tests__/tailwind-resolver.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/properties/tailwind-resolver.ts packages/overlay/src/properties/__tests__/tailwind-resolver.test.ts
git commit -m "feat(overlay): add browser-side Tailwind token resolver with CSS custom property reading"
```

---

## Task 7: Number Scrub Control

**Files:**
- Create: `packages/overlay/src/properties/controls/number-scrub.ts`

- [ ] **Step 1: Implement the number-scrub control**

This is the most complex control — used by ~20 properties. Implements `PropertyControl` interface.

Key behaviors:
- Text input showing current value, small label showing Tailwind token name
- Horizontal drag-to-scrub: `mousedown` on input → `mousemove` changes value, snapping to token scale stops
- Current arbitrary value is always included as a snap stop
- Tactile feedback: scale animation on token label at each snap point (102% → 100% over 80ms)
- Type to edit: focus → type value → Enter/blur → `onCommit()`
- Arrow Up/Down: increment/decrement by one scale step
- Uses `getSnapPoints()` from tailwind-resolver to build the snap point list

The control creates this DOM:
```html
<div class="number-scrub">
  <input type="text" class="scrub-input" value="16" />
  <span class="scrub-label">p-4</span>
</div>
```

Drag scrub implementation:
```typescript
let isDragging = false;
let startX = 0;
let startValue = 0;

input.addEventListener("mousedown", (e) => {
  if (document.activeElement === input) return; // Already focused — let normal input work
  isDragging = true;
  startX = e.clientX;
  startValue = parseFloat(input.value) || 0;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onDragEnd);
});

function onDrag(e: MouseEvent) {
  const delta = e.clientX - startX;
  const sensitivity = 0.5; // px per pixel of mouse movement
  const rawValue = startValue + delta * sensitivity;
  const snapped = findNearestSnapPoint(rawValue, snapPoints);
  input.value = snapped.display;
  labelEl.textContent = snapped.tokenName || snapped.display;
  onPreview(descriptors[0].key, snapped.cssValue);
}

function onDragEnd() {
  isDragging = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", onDragEnd);
  onCommit();
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd packages/overlay && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/controls/number-scrub.ts
git commit -m "feat(overlay): add number-scrub control with drag-to-scrub and Tailwind snap points"
```

---

## Task 8: Segmented Control

**Files:**
- Create: `packages/overlay/src/properties/controls/segmented.ts`

- [ ] **Step 1: Implement segmented control**

Renders a row of buttons, one per `enumValues` option. Highlights the active option. Click → `onPreview(key, value)` + `onCommit()` immediately (no pending state).

DOM structure:
```html
<div class="segmented-control">
  <button class="seg-btn active" title="Row">→</button>
  <button class="seg-btn" title="Column">↓</button>
  <button class="seg-btn" title="Row Reverse">←</button>
  <button class="seg-btn" title="Column Reverse">↑</button>
</div>
```

Uses SVG icons from `EnumOption.icon` when available, falls back to text label.

- [ ] **Step 2: Verify it compiles**

Run: `cd packages/overlay && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/controls/segmented.ts
git commit -m "feat(overlay): add segmented control for enum properties"
```

---

## Task 9: Color Swatch Control

**Files:**
- Create: `packages/overlay/src/properties/controls/color-swatch.ts`

- [ ] **Step 1: Implement color swatch control**

Renders a colored square + text input. Click swatch → opens existing `color-picker.ts` via `openColorPicker()`. Text input accepts Tailwind names or hex values.

DOM:
```html
<div class="color-swatch-control">
  <div class="swatch" style="background: #3b82f6"></div>
  <input type="text" class="swatch-input" value="blue-500" />
</div>
```

On color picker change: `onPreview(key, hexValue)`. On close: `onCommit()`.
Text input: `#` prefix → hex. Otherwise → token lookup from tailwind-resolver reverse map. Invalid token → red border + brief shake animation (add/remove CSS class).

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/properties/controls/color-swatch.ts
git commit -m "feat(overlay): add color swatch control with Tailwind token input"
```

---

## Task 10: Slider Control

**Files:**
- Create: `packages/overlay/src/properties/controls/slider.ts`

- [ ] **Step 1: Implement slider control**

Horizontal slider for opacity. Renders `<input type="range">` + number input. Snaps to Tailwind opacity scale. Drag fires `onPreview()`, release fires `onCommit()`.

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/properties/controls/slider.ts
git commit -m "feat(overlay): add slider control for opacity"
```

---

## Task 11: Box Model Control

**Files:**
- Create: `packages/overlay/src/properties/controls/box-model.ts`

- [ ] **Step 1: Implement box model control**

Compound control receiving all 8 spacing descriptors. Renders nested rectangles (margin outer, padding inner). Each side shows a label with the current value. Click side → editable input. Click center → all 4 inputs of that layer.

This is the most visually complex control. DOM structure:
```html
<div class="box-model">
  <div class="box-margin">
    <span class="box-side top" data-key="marginTop">0</span>
    <span class="box-side right" data-key="marginRight">0</span>
    <span class="box-side bottom" data-key="marginBottom">0</span>
    <span class="box-side left" data-key="marginLeft">0</span>
    <div class="box-padding">
      <span class="box-side top" data-key="paddingTop">16</span>
      <span class="box-side right" data-key="paddingRight">16</span>
      <span class="box-side bottom" data-key="paddingBottom">16</span>
      <span class="box-side left" data-key="paddingLeft">16</span>
      <div class="box-content">W × H</div>
    </div>
  </div>
</div>
```

Click a side label → replace with `<input>`, type value, Enter → `onPreview(key, value)` + `onCommit()`.
Click padding center → all 4 padding inputs activate, type value applies to all 4 → batch `onPreview` for each, then `onCommit()`.

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/properties/controls/box-model.ts
git commit -m "feat(overlay): add box model control for padding/margin"
```

---

## Task 12: Section Renderer

**Files:**
- Create: `packages/overlay/src/properties/section-renderer.ts`

- [ ] **Step 1: Implement section renderer**

Groups descriptors by `PropertyGroup`. For each group, renders a collapsible section with a sticky header. Within each section, iterates descriptors and instantiates the correct control based on `controlType`.

Handles compound grouping: collects descriptors with the same `compoundGroup`, passes the array to a single control instance (box-model).

```typescript
import type { PropertyDescriptor, PropertyGroup, TailwindTokenMap } from "@sketch-ui/shared";
import type { PropertyControl } from "./controls/types.js";
import { createNumberScrub } from "./controls/number-scrub.js";
import { createSegmented } from "./controls/segmented.js";
import { createColorSwatch } from "./controls/color-swatch.js";
import { createSlider } from "./controls/slider.js";
import { createBoxModel } from "./controls/box-model.js";

const GROUP_LABELS: Record<PropertyGroup, string> = {
  layout: "Layout",
  spacing: "Spacing",
  size: "Size",
  typography: "Typography",
  background: "Background",
  border: "Border",
  effects: "Effects",
};

const CONTROL_FACTORIES: Record<string, (descriptors: PropertyDescriptor[], values: Map<string, string>, tokens: TailwindTokenMap) => PropertyControl> = {
  "number-scrub": createNumberScrub,
  "segmented": createSegmented,
  "color-swatch": createColorSwatch,
  "slider": createSlider,
  "box-model": createBoxModel,
};

export function renderSections(
  descriptors: PropertyDescriptor[],
  currentValues: Map<string, string>,
  tokens: TailwindTokenMap,
  onPreview: (key: string, cssValue: string) => void,
  onCommit: () => void,
): { container: HTMLElement; controls: PropertyControl[] }
```

The function groups descriptors, handles compound groups, instantiates controls, wires `onPreview`/`onCommit` callbacks, and returns the DOM container + control references for later `setValue()` calls.

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/properties/section-renderer.ts
git commit -m "feat(overlay): add section renderer — groups descriptors, instantiates controls"
```

---

## Task 13: Property Sidebar

**Files:**
- Create: `packages/overlay/src/properties/property-sidebar.ts`

- [ ] **Step 1: Implement sidebar container**

Creates a fixed-position div on the right edge, full viewport height. Features:
- Slide in/out via CSS `transform: translateX()` transition
- Resize handle on left edge (drag to resize, 260px min, 380px max)
- Width persisted to `localStorage` key `"sketch-ui-sidebar-width"`
- Header showing component name + file path
- Scrollable content area for section groups
- Lives inside Shadow DOM

```typescript
export function createSidebar(shadowRoot: ShadowRoot): {
  show: (componentName: string, filePath: string, lineNumber: number, content: HTMLElement) => void;
  hide: () => void;
  isVisible: () => boolean;
  getElement: () => HTMLElement;
}
```

Sidebar styles use existing design tokens (COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY).

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/properties/property-sidebar.ts
git commit -m "feat(overlay): add resizable property sidebar with slide in/out animation"
```

---

## Task 14: Property Controller

**Files:**
- Create: `packages/overlay/src/properties/property-controller.ts`

- [ ] **Step 1: Implement property controller — the lifecycle owner**

This is the central module. It coordinates:

```typescript
import type { ComponentInfo, TailwindTokenMap, ElementIdentity } from "@sketch-ui/shared";
import { ALL_DESCRIPTORS } from "./property-descriptors.js";
import { renderSections } from "./section-renderer.js";
import { createSidebar } from "./property-sidebar.js";
import { getTokenMap, resolveTokenForValue } from "./tailwind-resolver.js";
import { send, onMessage } from "../bridge.js";
import { pushUndoAction, peekUndoStack, type PropertyChangeRuntime } from "../canvas-state.js";

interface PendingUpdate { /* from spec */ }

let state = {
  selectedElement: null as HTMLElement | null,
  componentInfo: null as ComponentInfo | null,
  elementIdentity: null as ElementIdentity | null,
  currentValues: new Map<string, string>(),
  originalValues: new Map<string, string>(),
  activeOverrides: new Map<string, string>(),
  pendingBatch: new Map<string, PendingUpdate>(),
};

let controls: PropertyControl[] = [];
let sidebar: ReturnType<typeof createSidebar>;
let reacquireTimer: ReturnType<typeof setTimeout>;

// --- INSPECT ---
export function inspect(element: HTMLElement, info: ComponentInfo): void {
  // If there are active overrides, commit them first (commit-on-focus-change)
  if (state.activeOverrides.size > 0) commit();

  state.selectedElement = element;
  state.componentInfo = info;
  state.elementIdentity = {
    componentName: info.componentName,
    filePath: info.filePath,
    lineNumber: info.lineNumber,
    columnNumber: info.columnNumber,
    tagName: info.tagName,
  };

  // Read computed styles for all descriptors
  const computed = getComputedStyle(element);
  state.currentValues.clear();
  state.originalValues.clear();
  for (const desc of ALL_DESCRIPTORS) {
    const value = computed.getPropertyValue(desc.cssProperty);
    state.currentValues.set(desc.key, value);
    state.originalValues.set(desc.key, value);
  }

  // Render sections
  const tokens = getTokenMap();
  const { container, controls: newControls } = renderSections(
    ALL_DESCRIPTORS, state.currentValues, tokens,
    (key, cssValue) => preview(key, cssValue),
    () => commit(),
  );
  controls = newControls;

  // Show sidebar
  sidebar.show(info.componentName, info.filePath, info.lineNumber, container);
}

// --- PREVIEW ---
export function preview(key: string, cssValue: string): void {
  const desc = ALL_DESCRIPTORS.find(d => d.key === key);
  if (!desc || !state.selectedElement) return;

  // Layer 1: instant inline style override
  (state.selectedElement.style as any)[desc.key] = cssValue;
  state.activeOverrides.set(key, cssValue);
  state.currentValues.set(key, cssValue);

  // Resolve Tailwind token
  const tokens = getTokenMap();
  const scale = tokens[desc.tailwindScale + "Reverse"] as Map<string, string> | undefined;
  const tailwindToken = scale ? resolveTokenForValue(cssValue, scale) : null;

  // Add to pending batch
  state.pendingBatch.set(key, {
    property: key,
    cssProperty: desc.cssProperty,
    value: cssValue,
    tailwindPrefix: desc.tailwindPrefix,
    tailwindToken,
    relatedPrefixes: desc.relatedPrefixes,
    originalValue: state.originalValues.get(key) || desc.defaultValue,
  });

  // Bidirectional sync — update related controls
  for (const control of controls) {
    control.setValue(key, cssValue);
  }
}

// --- COMMIT ---
export function commit(): void {
  if (state.pendingBatch.size === 0) return;
  if (!state.componentInfo) return;

  const filePath = state.componentInfo.filePath;
  const lineNumber = state.componentInfo.lineNumber;
  const columnNumber = state.componentInfo.columnNumber - 1; // Convert 1-indexed to 0-indexed

  if (state.pendingBatch.size === 1) {
    const update = [...state.pendingBatch.values()][0];
    send({
      type: "updateProperty",
      filePath, lineNumber, columnNumber,
      ...update,
      framework: "tailwind",
    });
  } else {
    send({
      type: "updateProperties",
      filePath, lineNumber, columnNumber,
      updates: [...state.pendingBatch.values()],
      framework: "tailwind",
    });
  }

  // Push to undo stack
  // ... (add propertyChange action with overrides)

  // Update originalValues to new values (for next edit cycle)
  for (const [key, update] of state.pendingBatch) {
    state.originalValues.set(key, update.value);
  }

  state.pendingBatch.clear();
}

// --- CANCEL ---
export function cancel(): void {
  if (state.activeOverrides.size === 0) return;

  // Revert all inline style overrides
  for (const [key, _] of state.activeOverrides) {
    const desc = ALL_DESCRIPTORS.find(d => d.key === key);
    if (desc && state.selectedElement) {
      const original = state.originalValues.get(key) || "";
      (state.selectedElement.style as any)[desc.key] = original;
      state.currentValues.set(key, original);
    }
  }

  state.activeOverrides.clear();
  state.pendingBatch.clear();

  // Refresh controls
  for (const control of controls) {
    for (const [key, value] of state.currentValues) {
      control.setValue(key, value);
    }
  }
}

// --- DESELECT ---
export function deselect(): void {
  if (state.activeOverrides.size > 0) cancel();
  state.selectedElement = null;
  state.componentInfo = null;
  state.elementIdentity = null;
  state.currentValues.clear();
  state.originalValues.clear();
  controls = [];
  sidebar.hide();
}

// --- HMR SURVIVAL ---
// MutationObserver setup
const observer = new MutationObserver(() => {
  if (state.selectedElement && !document.contains(state.selectedElement)) {
    clearTimeout(reacquireTimer);
    reacquireTimer = setTimeout(reacquireElement, 50);
  }
});

function reacquireElement(): void {
  // Walk fiber tree via bippy, bounded to 500 nodes / 100ms
  // On success: inspect(newElement, newComponentInfo) — no slide animation
  // On failure: deselect() + show toast
}

// --- INIT ---
export function initPropertyController(shadowRoot: ShadowRoot): void {
  sidebar = createSidebar(shadowRoot);
  observer.observe(document.body, { childList: true, subtree: true });
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd packages/overlay && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "feat(overlay): add property controller — lifecycle owner with HMR survival"
```

---

## Task 15: Canvas State — Undo Integration

**Files:**
- Modify: `packages/overlay/src/canvas-state.ts`

- [ ] **Step 1: Add runtime type, `pushUndoAction`, `peekUndoStack`, and propertyChange handling**

In `canvas-state.ts`, add:

1. A runtime-extended type (same pattern as `ColorOverrideRuntime`):
```typescript
/** Runtime extension of propertyChange — adds DOM element reference (not serializable). */
export type PropertyChangeRuntime = Extract<CanvasUndoAction, { type: "propertyChange" }> & {
  element: HTMLElement;
};
```

2. A generic undo push function (so the property controller can push actions without accessing undoStack directly):
```typescript
export function pushUndoAction(action: CanvasUndoAction): void {
  undoStack.push(action);
  notifyStateChange();
}
```

3. A peek helper:
```typescript
export function peekUndoStack(): CanvasUndoAction | null {
  return undoStack.length > 0 ? undoStack[undoStack.length - 1] : null;
}
```

4. Add `propertyChange` case to the `canvasUndo()` switch:

```typescript
case "propertyChange": {
  // Cast to runtime type to access element field
  const propAction = action as PropertyChangeRuntime;
  if (propAction.element && document.contains(propAction.element)) {
    for (const override of propAction.overrides) {
      (propAction.element.style as any)[override.cssProperty] = override.previousValue;
    }
  }
  return "property reverted";
}
```

- [ ] **Step 2: Build and verify**

Run: `cd packages/overlay && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/canvas-state.ts
git commit -m "feat(overlay): add propertyChange undo action and peekUndoStack helper"
```

---

## Task 16: Wire Selection → Property Controller

**Files:**
- Modify: `packages/overlay/src/selection.ts`
- Modify: `packages/overlay/src/bridge.ts`
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Hook selection.ts into property controller**

In `selection.ts`, import the property controller:

```typescript
import { inspect, deselect, cancel, commit } from "./properties/property-controller.js";
```

In the `selectElement()` function, after resolving the component and setting `currentSelection`, call:

```typescript
inspect(el, currentSelection);
```

In `clearSelection()`, call:

```typescript
deselect();
```

In `handleKeyDown`, modify the Escape handler to check for active preview first:

```typescript
if (e.key === "Escape") {
  // Priority: cancel active preview > deselect
  const controller = getPropertyController();
  if (controller.hasActiveOverrides()) {
    controller.cancel();
  } else if (currentSelection) {
    clearSelection();
  }
  e.preventDefault();
}
```

- [ ] **Step 2: Hook bridge.ts to receive tailwindTokens**

In `bridge.ts`, add handling for `tailwindTokens` message:

```typescript
import { setCliTokens } from "./properties/tailwind-resolver.js";

// In the onmessage handler, or add a specific handler:
onMessage((msg) => {
  if (msg.type === "tailwindTokens") {
    setCliTokens(msg.tokens);
  }
});
```

- [ ] **Step 3: Initialize property controller in index.ts**

In `index.ts`, wherever the overlay initializes (after Shadow DOM is set up):

```typescript
import { initPropertyController } from "./properties/property-controller.js";

// After getShadowRoot() is available:
initPropertyController(shadowRoot);
```

- [ ] **Step 4: Build the full overlay and verify**

Run: `pnpm build` (from root)
Expected: Build succeeds, overlay.js is produced

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/selection.ts packages/overlay/src/bridge.ts packages/overlay/src/index.ts
git commit -m "feat(overlay): wire selection → property controller, receive tailwindTokens from CLI"
```

---

## Task 17: Manual Integration Test

**Files:** None (testing only)

- [ ] **Step 1: Start test-app and SketchUI**

```bash
cd test-app && pnpm dev
# In another terminal:
pnpm build && node packages/cli/bin/sketch-ui.js 3000
```

- [ ] **Step 2: Verify sidebar appears on element selection**

1. Open the SketchUI overlay in the browser
2. Use the pointer tool to click an element
3. Verify the right sidebar slides in showing property sections
4. Verify computed values are displayed correctly

- [ ] **Step 3: Verify inline preview works (Layer 1)**

1. Drag-to-scrub a padding value in the sidebar
2. Verify the element updates instantly (no network delay)
3. Press Escape — verify the element reverts to original value

- [ ] **Step 4: Verify commit to source works (Layer 2)**

1. Change a padding value and release (commit)
2. Verify the source file is updated (check the file on disk)
3. Verify HMR fires and the page reloads
4. Verify the sidebar re-acquires the element and shows updated values

- [ ] **Step 5: Verify undo works (Layer 3)**

1. Make a property change
2. Press Ctrl+Z
3. Verify the inline style reverts and the file is restored

- [ ] **Step 6: Commit any fixes from manual testing**

```bash
git add -A
git commit -m "fix: integration fixes from manual testing"
```

---

## Task 18: Border Radius Corner Handles (Deferred Enhancement)

> This task creates the on-canvas corner handles for border-radius. It can be deferred to after the core property inspector is working. The sidebar's border-radius number-scrub from Task 7 provides basic editing without this.

**Files:**
- Modify: `packages/overlay/src/highlight-canvas.ts` or create `packages/overlay/src/properties/corner-handles.ts`

- [ ] **Step 1: Add corner handle rendering**

When an element is selected and has border-radius, render 4 small circular handles at the element's corners in the selection overlay layer.

- [ ] **Step 2: Add drag interaction**

Drag a handle → calls `controller.preview("borderTopLeftRadius", newValue)`. Release → `controller.commit()`. Shift+drag → all 4 corners.

- [ ] **Step 3: Add bidirectional sync**

Handle drag updates the sidebar's border-radius number-scrub via `control.setValue()`. Sidebar number-scrub change updates handle positions.

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/properties/corner-handles.ts
git commit -m "feat(overlay): add on-canvas border-radius corner handles"
```

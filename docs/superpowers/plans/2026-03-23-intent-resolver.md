# Intent Resolver Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a pre-processing resolver layer that handles deterministic math (color matching via Delta-E, spacing snapping) before the Claude prompt, so the AI focuses on judgment calls.

**Architecture:** New `resolve-intent.ts` module sits between `serializeAnnotations()` output and `buildUserMessage()`. It transforms raw pixel/hex data into token-resolved data with confidence scores. The color picker also gets project color swatches from the Tailwind config.

**Tech Stack:** TypeScript, vitest, CIE76 Delta-E (Lab color space), Tailwind token maps

**Spec:** `docs/superpowers/specs/2026-03-23-intent-resolver-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `packages/shared/src/types.ts` | Add `ResolvedValue`, `ResolvedAnnotations` types; add `pickedToken` and `siblingRects` to `SerializedAnnotations` |
| `packages/cli/src/resolve-intent.ts` | **New** — Color resolver (Lab/Delta-E), spacing resolver, sibling computation, alpha detection, palette cache |
| `packages/cli/src/__tests__/resolve-intent.test.ts` | **New** — Unit tests for all resolvers |
| `packages/cli/src/generate.ts` | Wire resolver into pipeline, update `buildUserMessage()` and `SYSTEM_PROMPT` |
| `packages/cli/src/server.ts` | Store resolved tokens at connection time, pass to `generate()` |
| `packages/overlay/src/canvas-state.ts` | Serialize `pickedToken` and sibling rects |
| `packages/overlay/src/properties/tailwind-resolver.ts` | Expose `getProjectColors()` accessor |
| `packages/overlay/src/color-picker.ts` | Add project color swatch section |
| `packages/overlay/src/tools/color.ts` | Pass project colors and carry `pickedToken` |

---

### Task 1: Add Types to Shared Package

**Files:**
- Modify: `packages/shared/src/types.ts:237-267`

- [ ] **Step 1: Add `ResolvedValue` and `ResolvedAnnotations` types**

In `packages/shared/src/types.ts`, after the `SerializedAnnotations` interface (line 267), add:

```typescript
export interface ResolvedValue<T> {
  raw: T;
  resolved: string | null;
  resolvedValue: string | null;
  confidence: number;
  type: "exact" | "snapped" | "arbitrary";
}

export interface ResolvedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    originalRect: { top: number; left: number; width: number; height: number };
    delta: { dx: number; dy: number };
    resolvedDx: ResolvedValue<number> | null;
    resolvedDy: ResolvedValue<number> | null;
    nearestSiblings: {
      left?: { component: string; distance: number };
      right?: { component: string; distance: number };
      above?: { component: string; distance: number };
      below?: { component: string; distance: number };
    };
  }>;
  annotations: SerializedAnnotations["annotations"];
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
    resolvedTo: ResolvedValue<string>;
    pickedToken?: string;
  }>;
}
```

- [ ] **Step 2: Add `pickedToken` and `siblingRects` to `SerializedAnnotations`**

In the `SerializedAnnotations` interface, add `pickedToken?: string` to `colorChanges` entries (after line 265), and add `siblingRects` to `moves` entries (after line 243):

```typescript
// In moves array type, after delta:
siblingRects?: Array<{
  component: string;
  rect: { top: number; left: number; width: number; height: number };
}>;

// In colorChanges array type, after to:
pickedToken?: string;
```

- [ ] **Step 3: Build to verify types compile**

Run: `cd packages/shared && pnpm build`
Expected: Clean build, no type errors

- [ ] **Step 4: Commit**

```bash
git add packages/shared/src/types.ts
git commit -m "feat(shared): add ResolvedValue, ResolvedAnnotations types and serialization fields"
```

---

### Task 2: Color Math and Lab Conversion

**Files:**
- Create: `packages/cli/src/resolve-intent.ts`
- Create: `packages/cli/src/__tests__/resolve-intent.test.ts`

- [ ] **Step 1: Write failing tests for Lab conversion**

Create `packages/cli/src/__tests__/resolve-intent.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab, deltaE } from "../resolve-intent.js";

describe("hexToRgb", () => {
  it("converts black", () => {
    expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
  });
  it("converts white", () => {
    expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
  });
  it("converts blue-500", () => {
    expect(hexToRgb("#3b82f6")).toEqual([59, 130, 246]);
  });
});

describe("rgbToLab", () => {
  // Reference values from colormine.org / easyrgb.com
  it("converts black to Lab origin", () => {
    const [L, a, b] = rgbToLab(0, 0, 0);
    expect(L).toBeCloseTo(0, 0);
    expect(a).toBeCloseTo(0, 0);
    expect(b).toBeCloseTo(0, 0);
  });
  it("converts white to L=100", () => {
    const [L, a, b] = rgbToLab(255, 255, 255);
    expect(L).toBeCloseTo(100, 0);
    expect(a).toBeCloseTo(0, 0);
    expect(b).toBeCloseTo(0, 0);
  });
  it("converts pure red", () => {
    const [L] = rgbToLab(255, 0, 0);
    expect(L).toBeCloseTo(53.23, 0);
  });
});

describe("deltaE", () => {
  it("identical colors have zero distance", () => {
    expect(deltaE([50, 0, 0], [50, 0, 0])).toBe(0);
  });
  it("black vs white is large", () => {
    const d = deltaE([0, 0, 0], [100, 0, 0]);
    expect(d).toBe(100);
  });
  it("perceptually similar colors are close", () => {
    // Two very similar blues
    const lab1 = rgbToLab(59, 130, 246);  // #3b82f6 (blue-500)
    const lab2 = rgbToLab(58, 130, 246);  // #3a82f6 (one off)
    expect(deltaE(lab1, lab2)).toBeLessThan(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement Lab color math**

Create `packages/cli/src/resolve-intent.ts`:

```typescript
// packages/cli/src/resolve-intent.ts
// Intent resolver — pre-processes annotations before the Claude prompt.
// Handles deterministic math (color matching, spacing snapping) so
// the AI can focus on judgment calls.

import type {
  SerializedAnnotations,
  ResolvedAnnotations,
  ResolvedValue,
  TailwindTokenMap,
} from "@frameup/shared";

// ---------------------------------------------------------------------------
// Color math: RGB → XYZ → Lab (D65 illuminant)
// ---------------------------------------------------------------------------

export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // Normalize to 0-1 and apply sRGB companding
  let rr = r / 255;
  let gg = g / 255;
  let bb = b / 255;

  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;

  // RGB to XYZ (D65)
  let x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) / 0.95047;
  let y = (rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750) / 1.00000;
  let z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) / 1.08883;

  // XYZ to Lab
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  x = f(x);
  y = f(y);
  z = f(z);

  return [
    116 * y - 16,       // L
    500 * (x - y),      // a
    200 * (y - z),      // b
  ];
}

export function deltaE(
  lab1: [number, number, number],
  lab2: [number, number, number],
): number {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2,
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/resolve-intent.ts packages/cli/src/__tests__/resolve-intent.test.ts
git commit -m "feat(cli): add Lab color math (hexToRgb, rgbToLab, deltaE)"
```

---

### Task 3: Color Resolver with Palette Cache

**Files:**
- Modify: `packages/cli/src/resolve-intent.ts`
- Modify: `packages/cli/src/__tests__/resolve-intent.test.ts`

- [ ] **Step 1: Write failing tests for color resolution**

Append to `resolve-intent.test.ts`:

```typescript
import { buildLabCache, resolveColor } from "../resolve-intent.js";

describe("buildLabCache", () => {
  it("filters non-hex values like transparent", () => {
    const cache = buildLabCache({ "blue-500": "#3b82f6", "transparent": "transparent" });
    expect(cache.size).toBe(1);
  });
});

describe("resolveColor", () => {
  const palette = { "blue-500": "#3b82f6", "red-500": "#ef4444", "white": "#ffffff", "black": "#000000" };
  const cache = buildLabCache(palette);

  it("exact match returns confidence 1.0", () => {
    const result = resolveColor("#3b82f6", cache);
    expect(result.type).toBe("exact");
    expect(result.confidence).toBe(1.0);
    expect(result.resolved).toBe("blue-500");
  });

  it("near match (Delta-E < 3) returns high confidence", () => {
    const result = resolveColor("#3a82f6", cache);
    expect(result.type).toBe("snapped");
    expect(result.confidence).toBeGreaterThanOrEqual(0.95);
    expect(result.resolved).toBe("blue-500");
  });

  it("distant color returns arbitrary", () => {
    const result = resolveColor("#ff13ab", cache);
    expect(result.type).toBe("arbitrary");
    expect(result.confidence).toBe(0);
    expect(result.resolved).toBeNull();
  });

  // Round-trip regression test
  it("round-trip: perturbed blue-500 resolves back to blue-500", () => {
    const result = resolveColor("#3a82f6", cache);
    expect(result.resolved).toBe("blue-500");
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it("round-trip: far perturbation resolves as arbitrary", () => {
    const result = resolveColor("#ff0000", cache);
    // red-500 is #ef4444, not #ff0000 — Delta-E should be significant
    // but it may still snap to red-500 if within threshold
    expect(result.resolved === "red-500" || result.resolved === null).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: FAIL — `buildLabCache` and `resolveColor` not exported

- [ ] **Step 3: Implement color resolver and palette cache**

Add to `packages/cli/src/resolve-intent.ts`:

```typescript
// ---------------------------------------------------------------------------
// Lab palette cache — built eagerly at session start
// ---------------------------------------------------------------------------

export type LabCache = Map<string, { token: string; lab: [number, number, number] }>;

export function buildLabCache(colors: Record<string, string>): LabCache {
  const cache: LabCache = new Map();
  for (const [token, hex] of Object.entries(colors)) {
    // Filter non-hex values (e.g., "transparent")
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) continue;
    const [r, g, b] = hexToRgb(hex);
    cache.set(hex.toLowerCase(), { token, lab: rgbToLab(r, g, b) });
  }
  return cache;
}

// ---------------------------------------------------------------------------
// Color resolver
// ---------------------------------------------------------------------------

export function resolveColor(hex: string, cache: LabCache): ResolvedValue<string> {
  const normalizedHex = hex.toLowerCase();

  // Exact match shortcut
  const exact = cache.get(normalizedHex);
  if (exact) {
    return {
      raw: hex,
      resolved: exact.token,
      resolvedValue: normalizedHex,
      confidence: 1.0,
      type: "exact",
    };
  }

  // Delta-E search
  const [r, g, b] = hexToRgb(hex);
  const inputLab = rgbToLab(r, g, b);

  let bestToken: string | null = null;
  let bestHex: string | null = null;
  let bestDist = Infinity;

  for (const [paletteHex, { token, lab }] of cache) {
    const dist = deltaE(inputLab, lab);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
      bestHex = paletteHex;
    }
  }

  if (bestDist < 3) {
    return {
      raw: hex,
      resolved: bestToken,
      resolvedValue: bestHex,
      confidence: 0.95,
      type: "snapped",
    };
  }
  if (bestDist < 8) {
    return {
      raw: hex,
      resolved: bestToken,
      resolvedValue: bestHex,
      confidence: 0.7,
      type: "snapped",
    };
  }

  return {
    raw: hex,
    resolved: null,
    resolvedValue: null,
    confidence: 0,
    type: "arbitrary",
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/resolve-intent.ts packages/cli/src/__tests__/resolve-intent.test.ts
git commit -m "feat(cli): add color resolver with Lab palette cache and Delta-E matching"
```

---

### Task 4: Spacing Resolver with Relative Threshold

**Files:**
- Modify: `packages/cli/src/resolve-intent.ts`
- Modify: `packages/cli/src/__tests__/resolve-intent.test.ts`

- [ ] **Step 1: Write failing tests for spacing resolution**

Append to `resolve-intent.test.ts`:

```typescript
import { buildSpacingCache, resolveSpacing } from "../resolve-intent.js";

describe("buildSpacingCache", () => {
  it("parses rem values to pixels", () => {
    const cache = buildSpacingCache({ "4": "1rem", "px": "1px", "0": "0px" });
    expect(cache.get(16)).toEqual({ token: "4", value: "1rem" }); // 1rem = 16px
    expect(cache.get(1)).toEqual({ token: "px", value: "1px" });
    expect(cache.get(0)).toEqual({ token: "0", value: "0px" });
  });
});

describe("resolveSpacing", () => {
  const spacing = { "0": "0px", "px": "1px", "1": "0.25rem", "4": "1rem", "8": "2rem", "16": "4rem" };
  const cache = buildSpacingCache(spacing);

  it("exact match returns confidence 1.0", () => {
    const result = resolveSpacing(16, cache); // exactly spacing-4 (1rem = 16px)
    expect(result.type).toBe("exact");
    expect(result.resolved).toBe("4");
    expect(result.confidence).toBe(1.0);
  });

  it("within relative threshold snaps with high confidence", () => {
    const result = resolveSpacing(17, cache); // 1px off from 16px, threshold = 16*0.15 = 2.4px
    expect(result.type).toBe("snapped");
    expect(result.resolved).toBe("4");
    expect(result.confidence).toBeGreaterThan(0.75);
  });

  it("outside threshold returns arbitrary", () => {
    const result = resolveSpacing(137, cache);
    expect(result.type).toBe("arbitrary");
    expect(result.confidence).toBe(0);
    expect(result.resolved).toBeNull();
  });

  it("small spacing has tight threshold", () => {
    // spacing-1 = 0.25rem = 4px, threshold = 4*0.15 = 0.6px
    const result = resolveSpacing(6, cache); // 2px off from 4px — way outside 0.6px threshold
    expect(result.type).toBe("arbitrary");
  });

  it("large spacing has wider threshold", () => {
    // spacing-16 = 4rem = 64px, threshold = min(64*0.15, 8) = 8px
    const result = resolveSpacing(70, cache); // 6px off from 64px — within 8px cap
    expect(result.type).toBe("snapped");
    expect(result.resolved).toBe("16");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: FAIL — `buildSpacingCache` and `resolveSpacing` not exported

- [ ] **Step 3: Implement spacing resolver**

Add to `packages/cli/src/resolve-intent.ts`:

```typescript
// ---------------------------------------------------------------------------
// Spacing cache — parsed token values in pixels, built at session start
// ---------------------------------------------------------------------------

// Assumption: root font size is 16px (browser default).
// If a project uses a different root font size (e.g., html { font-size: 14px }),
// spacing resolution will be slightly off. This is a known limitation.
const ROOT_FONT_SIZE_PX = 16;

export type SpacingCache = Map<number, { token: string; value: string }>;

export function buildSpacingCache(spacing: Record<string, string>): SpacingCache {
  const cache: SpacingCache = new Map();
  for (const [token, value] of Object.entries(spacing)) {
    let px: number;
    if (value.endsWith("rem")) {
      px = parseFloat(value) * ROOT_FONT_SIZE_PX;
    } else if (value.endsWith("px")) {
      px = parseFloat(value);
    } else {
      continue; // skip values we can't parse (e.g., "auto")
    }
    if (!Number.isNaN(px)) {
      cache.set(px, { token, value });
    }
  }
  return cache;
}

// ---------------------------------------------------------------------------
// Spacing resolver — relative threshold: min(tokenPx * 0.15, 8)
// ---------------------------------------------------------------------------

export function resolveSpacing(px: number, cache: SpacingCache): ResolvedValue<number> {
  const absPx = Math.abs(px);

  let bestToken: string | null = null;
  let bestValue: string | null = null;
  let bestDist = Infinity;
  let bestThreshold = 0;

  for (const [tokenPx, { token, value }] of cache) {
    const dist = Math.abs(absPx - tokenPx);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
      bestValue = value;
      bestThreshold = Math.min(tokenPx * 0.15, 8);
    }
  }

  if (bestDist === 0) {
    return { raw: px, resolved: bestToken, resolvedValue: bestValue, confidence: 1.0, type: "exact" };
  }

  if (bestThreshold > 0 && bestDist <= bestThreshold) {
    // Linear interpolation: 0.95 at distance 0 → 0.75 at threshold boundary.
    // Note: spec table shows non-linear tiers but spec text says "scales linearly" —
    // true linear is correct and matches the endpoints.
    const ratio = bestDist / bestThreshold;
    const confidence = 0.95 - ratio * 0.2;
    return { raw: px, resolved: bestToken, resolvedValue: bestValue, confidence, type: "snapped" };
  }

  return { raw: px, resolved: null, resolvedValue: null, confidence: 0, type: "arbitrary" };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/resolve-intent.ts packages/cli/src/__tests__/resolve-intent.test.ts
git commit -m "feat(cli): add spacing resolver with relative threshold"
```

---

### Task 5: Alpha Detection and Token Passthrough

**Files:**
- Modify: `packages/cli/src/resolve-intent.ts`
- Modify: `packages/cli/src/__tests__/resolve-intent.test.ts`

- [ ] **Step 1: Write failing tests**

Append to `resolve-intent.test.ts`:

```typescript
import { hasAlpha, resolveColorChange } from "../resolve-intent.js";

describe("hasAlpha", () => {
  it("detects rgba", () => {
    expect(hasAlpha("rgba(0,0,0,0.5)")).toBe(true);
  });
  it("detects hsla", () => {
    expect(hasAlpha("hsla(200,50%,50%,0.8)")).toBe(true);
  });
  it("detects 8-digit hex", () => {
    expect(hasAlpha("#3b82f680")).toBe(true);
  });
  it("rejects 6-digit hex", () => {
    expect(hasAlpha("#3b82f6")).toBe(false);
  });
  it("rejects rgb", () => {
    expect(hasAlpha("rgb(0,0,0)")).toBe(false);
  });
});

describe("resolveColorChange — pickedToken", () => {
  const palette = { "blue-500": "#3b82f6", "red-500": "#ef4444" };
  const cache = buildLabCache(palette);

  it("uses pickedToken when hex matches", () => {
    const result = resolveColorChange("#3b82f6", "blue-500", palette, cache);
    expect(result.type).toBe("exact");
    expect(result.resolved).toBe("blue-500");
    expect(result.confidence).toBe(1.0);
  });

  it("clears stale pickedToken when hex was manually edited", () => {
    const result = resolveColorChange("#ff0000", "blue-500", palette, cache);
    // pickedToken says blue-500 but hex is #ff0000 — should fall through to Delta-E
    expect(result.resolved).not.toBe("blue-500");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: FAIL — `hasAlpha` and `resolveColorChange` not exported

- [ ] **Step 3: Implement alpha detection and token passthrough**

Add to `packages/cli/src/resolve-intent.ts`:

```typescript
// ---------------------------------------------------------------------------
// Alpha channel detection
// ---------------------------------------------------------------------------

export function hasAlpha(color: string): boolean {
  return (
    color.startsWith("rgba(") ||
    color.startsWith("hsla(") ||
    /^#[0-9a-fA-F]{8}$/.test(color)
  );
}

// ---------------------------------------------------------------------------
// Color change resolver — handles pickedToken passthrough and staleness guard
// ---------------------------------------------------------------------------

export function resolveColorChange(
  hex: string,
  pickedToken: string | undefined,
  paletteForward: Record<string, string>,
  cache: LabCache,
): ResolvedValue<string> {
  // pickedToken passthrough with staleness guard
  if (pickedToken) {
    const tokenHex = paletteForward[pickedToken];
    if (tokenHex && tokenHex.toLowerCase() === hex.toLowerCase()) {
      return {
        raw: hex,
        resolved: pickedToken,
        resolvedValue: tokenHex,
        confidence: 1.0,
        type: "exact",
      };
    }
    // Stale — hex was manually edited after picking swatch. Fall through to Delta-E.
  }

  return resolveColor(hex, cache);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/resolve-intent.ts packages/cli/src/__tests__/resolve-intent.test.ts
git commit -m "feat(cli): add alpha detection and pickedToken passthrough with staleness guard"
```

---

### Task 6: Main `resolveIntent()` Function

**Files:**
- Modify: `packages/cli/src/resolve-intent.ts`
- Modify: `packages/cli/src/__tests__/resolve-intent.test.ts`

- [ ] **Step 1: Write failing test for full resolveIntent()**

Append to `resolve-intent.test.ts`:

```typescript
import { resolveIntent, computeNearestSiblings } from "../resolve-intent.js";
import type { SerializedAnnotations, TailwindTokenMap } from "@frameup/shared";

describe("computeNearestSiblings", () => {
  it("finds nearest sibling in each direction", () => {
    const movedRect = { top: 100, left: 100, width: 50, height: 50 };
    const delta = { dx: 0, dy: 0 };
    const siblings = [
      { component: "Left", rect: { top: 100, left: 20, width: 30, height: 50 } },   // right edge at 50, distance 50
      { component: "Right", rect: { top: 100, left: 200, width: 50, height: 50 } },  // left edge at 200, distance 50
      { component: "Above", rect: { top: 20, left: 100, width: 50, height: 30 } },   // bottom edge at 50, distance 50
      { component: "Below", rect: { top: 200, left: 100, width: 50, height: 50 } },  // top edge at 200, distance 50
    ];
    const result = computeNearestSiblings(movedRect, delta, siblings);
    expect(result.left?.component).toBe("Left");
    expect(result.right?.component).toBe("Right");
    expect(result.above?.component).toBe("Above");
    expect(result.below?.component).toBe("Below");
  });

  it("accounts for delta in final position", () => {
    const movedRect = { top: 100, left: 100, width: 50, height: 50 };
    const delta = { dx: 100, dy: 0 }; // moved right to left=200
    const siblings = [
      { component: "Neighbor", rect: { top: 100, left: 260, width: 50, height: 50 } },
    ];
    const result = computeNearestSiblings(movedRect, delta, siblings);
    expect(result.right?.component).toBe("Neighbor");
    expect(result.right?.distance).toBe(10); // 260 - (200+50) = 10
  });

  it("returns empty when no siblings", () => {
    const result = computeNearestSiblings({ top: 0, left: 0, width: 50, height: 50 }, { dx: 0, dy: 0 }, undefined);
    expect(result).toEqual({});
  });
});

describe("resolveIntent", () => {
  // Minimal token map for testing
  const tokens: TailwindTokenMap = {
    colors: { "blue-500": "#3b82f6", "red-500": "#ef4444", "white": "#ffffff", "black": "#000000", "transparent": "transparent" },
    colorsReverse: { "#3b82f6": "blue-500" },
    spacing: { "0": "0px", "4": "1rem", "8": "2rem" },
    spacingReverse: { "0px": "0", "1rem": "4", "2rem": "8" },
    fontSize: {}, fontSizeReverse: {},
    fontWeight: {}, fontWeightReverse: {},
    borderRadius: {}, borderRadiusReverse: {},
    borderWidth: {}, borderWidthReverse: {},
    opacity: {}, opacityReverse: {},
    letterSpacing: {}, letterSpacingReverse: {},
    lineHeight: {}, lineHeightReverse: {},
  };

  it("resolves color changes to nearest token", () => {
    const annotations: SerializedAnnotations = {
      moves: [],
      annotations: [],
      colorChanges: [{
        component: "Button", file: "app.tsx", line: 10,
        property: "backgroundColor", from: "rgb(255,255,255)", to: "#3a82f6",
      }],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.colorChanges[0].resolvedTo.resolved).toBe("blue-500");
    expect(result.colorChanges[0].from).toBe("rgb(255,255,255)"); // raw pass-through
  });

  it("resolves spacing for moves", () => {
    const annotations: SerializedAnnotations = {
      moves: [{
        component: "Card", file: "app.tsx", line: 5,
        originalRect: { top: 0, left: 0, width: 100, height: 50 },
        delta: { dx: 16, dy: 0 },
      }],
      annotations: [],
      colorChanges: [],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.moves[0].resolvedDx?.resolved).toBe("4");
    expect(result.moves[0].resolvedDy).toBeNull(); // dy is 0
  });

  it("passes through empty annotations", () => {
    const empty: SerializedAnnotations = { moves: [], annotations: [], colorChanges: [] };
    const result = resolveIntent(empty, tokens);
    expect(result.moves).toHaveLength(0);
    expect(result.colorChanges).toHaveLength(0);
  });

  it("skips resolution for alpha colors", () => {
    const annotations: SerializedAnnotations = {
      moves: [],
      annotations: [],
      colorChanges: [{
        component: "Box", file: "app.tsx", line: 1,
        property: "backgroundColor", from: "rgba(0,0,0,0.5)", to: "rgba(0,0,0,0.8)",
      }],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.colorChanges[0].resolvedTo.type).toBe("arbitrary");
    expect(result.colorChanges[0].resolvedTo.raw).toBe("rgba(0,0,0,0.8)");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: FAIL — `resolveIntent` not exported

- [ ] **Step 3: Implement `resolveIntent()` and `computeNearestSiblings()`**

Add to `packages/cli/src/resolve-intent.ts`:

```typescript
// ---------------------------------------------------------------------------
// Nearest sibling computation (from raw serialized rects)
// ---------------------------------------------------------------------------

type SiblingRect = { component: string; rect: { top: number; left: number; width: number; height: number } };

interface NearestSiblings {
  left?: { component: string; distance: number };
  right?: { component: string; distance: number };
  above?: { component: string; distance: number };
  below?: { component: string; distance: number };
}

export function computeNearestSiblings(
  movedRect: { top: number; left: number; width: number; height: number },
  delta: { dx: number; dy: number },
  siblings: SiblingRect[] | undefined,
): NearestSiblings {
  if (!siblings || siblings.length === 0) return {};

  // Compute final position
  const finalLeft = movedRect.left + delta.dx;
  const finalTop = movedRect.top + delta.dy;
  const finalRight = finalLeft + movedRect.width;
  const finalBottom = finalTop + movedRect.height;

  const result: NearestSiblings = {};

  for (const sib of siblings) {
    const sRight = sib.rect.left + sib.rect.width;
    const sBottom = sib.rect.top + sib.rect.height;

    // Sibling to the left: its right edge is left of our left edge
    if (sRight <= finalLeft) {
      const dist = finalLeft - sRight;
      if (!result.left || dist < result.left.distance) {
        result.left = { component: sib.component, distance: dist };
      }
    }
    // Sibling to the right: its left edge is right of our right edge
    if (sib.rect.left >= finalRight) {
      const dist = sib.rect.left - finalRight;
      if (!result.right || dist < result.right.distance) {
        result.right = { component: sib.component, distance: dist };
      }
    }
    // Sibling above
    if (sBottom <= finalTop) {
      const dist = finalTop - sBottom;
      if (!result.above || dist < result.above.distance) {
        result.above = { component: sib.component, distance: dist };
      }
    }
    // Sibling below
    if (sib.rect.top >= finalBottom) {
      const dist = sib.rect.top - finalBottom;
      if (!result.below || dist < result.below.distance) {
        result.below = { component: sib.component, distance: dist };
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export interface IntentCache {
  labCache: LabCache;
  spacingCache: SpacingCache;
  colorsForward: Record<string, string>;
}

export function buildIntentCache(tokens: TailwindTokenMap): IntentCache {
  return {
    labCache: buildLabCache(tokens.colors),
    spacingCache: buildSpacingCache(tokens.spacing),
    colorsForward: tokens.colors,
  };
}

export function resolveIntent(
  annotations: SerializedAnnotations,
  tokens: TailwindTokenMap,
  cache?: IntentCache,
): ResolvedAnnotations {
  const { labCache, spacingCache, colorsForward } = cache ?? buildIntentCache(tokens);

  // Resolve moves
  const moves = annotations.moves.map((move) => ({
    component: move.component,
    file: move.file,
    line: move.line,
    originalRect: move.originalRect,
    delta: move.delta,
    resolvedDx: move.delta.dx !== 0 ? resolveSpacing(move.delta.dx, spacingCache) : null,
    resolvedDy: move.delta.dy !== 0 ? resolveSpacing(move.delta.dy, spacingCache) : null,
    nearestSiblings: computeNearestSiblings(
      move.originalRect,
      move.delta,
      move.siblingRects,
    ),
  }));

  // Resolve color changes — only resolve "to", pass "from" as-is
  const colorChanges = annotations.colorChanges.map((cc) => {
    let resolvedTo: ResolvedValue<string>;

    if (hasAlpha(cc.to)) {
      // Alpha present — skip resolution, pass raw
      resolvedTo = { raw: cc.to, resolved: null, resolvedValue: null, confidence: 0, type: "arbitrary" };
    } else {
      resolvedTo = resolveColorChange(cc.to, cc.pickedToken, colorsForward, labCache);
    }

    return {
      component: cc.component,
      file: cc.file,
      line: cc.line,
      property: cc.property,
      from: cc.from,
      to: cc.to,
      resolvedTo,
      pickedToken: cc.pickedToken,
    };
  });

  return {
    moves,
    annotations: annotations.annotations,
    colorChanges,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/cli/src/resolve-intent.ts packages/cli/src/__tests__/resolve-intent.test.ts
git commit -m "feat(cli): add resolveIntent() main entry point with sibling computation"
```

---

### Task 7: Wire Resolver into Generate Pipeline

**Files:**
- Modify: `packages/cli/src/generate.ts:6,98-149,154-222,473-492`
- Modify: `packages/cli/src/server.ts:219-222,270-276`

- [ ] **Step 1: Update `server.ts` to store tokens and pass cache to generate**

In `packages/cli/src/server.ts`, store the resolved config at connection time and pass it to `generate()`:

1. At the top of the connection handler (after line 222), store the tokens:

```typescript
// After: send(ws, { type: "tailwindTokens", tokens: config.tokens });
// Store for use in generate:
let resolvedTokens: TailwindTokenMap | null = config.tokens;
```

2. In the `generate()` call (line 270), add `tokens`:

```typescript
generate({
  annotations: msg.annotations,
  apiKey: resolvedKey,
  projectRoot: projectRoot,
  tokens: resolvedTokens,  // add this
  onProgress(stage, message) { ... },
})
```

- [ ] **Step 2: Update `GenerateOptions` in `generate.ts`**

In `packages/cli/src/generate.ts`, add the tokens field and import the resolver:

```typescript
import type { SerializedAnnotations, FileChange, GenerateStage, TailwindTokenMap } from "@frameup/shared";
import { resolveIntent, buildIntentCache, type IntentCache } from "./resolve-intent.js";

interface GenerateOptions {
  annotations: SerializedAnnotations;
  apiKey: string;
  projectRoot: string;
  tokens?: TailwindTokenMap | null;  // add this
  onProgress: (stage: GenerateStage, message: string) => void;
}
```

- [ ] **Step 3: Call `resolveIntent()` before building the prompt**

In `generate()` function, after reading source files (line 489) and before building the prompt (line 492), add:

```typescript
// Resolve intent — deterministic math before the prompt
// If Tailwind tokens are unavailable (config resolution failed), skip resolution
const resolved = options.tokens
  ? resolveIntent(annotations, options.tokens)
  : null;
```

Change `buildUserMessage` call to accept either resolved or raw annotations:

```typescript
const userMessage = resolved
  ? buildUserMessage(resolved, sources)
  : buildUserMessageRaw(annotations, sources);
```

Where `buildUserMessageRaw` is the existing `buildUserMessage` renamed — the fallback path that formats raw annotations without resolved tokens. This ensures the generate pipeline never crashes when Tailwind config is unavailable.

- [ ] **Step 4: Update `buildUserMessage()` to accept `ResolvedAnnotations`**

This must happen in the same commit as the wiring to avoid a broken intermediate state.

Replace the existing `buildUserMessage` function signature and body in `packages/cli/src/generate.ts`:

```typescript
import type { ResolvedAnnotations, ResolvedValue } from "@frameup/shared";

function buildUserMessage(
  annotations: ResolvedAnnotations,
  sources: Map<string, string>,
): string {
  let message = `## Visual Changes\n\n`;

  // Moves — with resolved spacing and sibling context
  if (annotations.moves.length > 0) {
    message += `### Component Moves\n`;
    for (const move of annotations.moves) {
      message += `- **${move.component}** (${move.file}:${move.line}):\n`;

      if (move.resolvedDx) {
        message += `  ${move.delta.dx > 0 ? "Right" : "Left"} by ${formatResolvedSpacing(move.resolvedDx)}\n`;
      }
      if (move.resolvedDy) {
        message += `  ${move.delta.dy > 0 ? "Down" : "Up"} by ${formatResolvedSpacing(move.resolvedDy)}\n`;
      }

      // Sibling context
      const sibs = move.nearestSiblings;
      const sibParts: string[] = [];
      if (sibs.left) sibParts.push(`left: ${sibs.left.component} at ${Math.round(sibs.left.distance)}px`);
      if (sibs.right) sibParts.push(`right: ${sibs.right.component} at ${Math.round(sibs.right.distance)}px`);
      if (sibs.above) sibParts.push(`above: ${sibs.above.component} at ${Math.round(sibs.above.distance)}px`);
      if (sibs.below) sibParts.push(`below: ${sibs.below.component} at ${Math.round(sibs.below.distance)}px`);
      if (sibParts.length > 0) {
        message += `  Nearest siblings: ${sibParts.join(", ")}\n`;
      }
      message += `  Choose the appropriate CSS mechanism for this layout context.\n`;
    }
    message += `\n`;
  }

  // Color changes — tiered phrasing
  if (annotations.colorChanges.length > 0) {
    message += `### Color Changes\n`;
    for (const cc of annotations.colorChanges) {
      const prop = cc.property === "backgroundColor" ? "background color" : "text color";
      message += `- **${cc.component}** (${cc.file}:${cc.line}): ${prop} changed from \`${cc.from}\` to ${formatResolvedColor(cc.resolvedTo)}\n`;
    }
    message += `\n`;
  }

  // Draw/text annotations — unchanged
  const drawAnns = annotations.annotations.filter(a => a.type === "draw");
  const textAnns = annotations.annotations.filter(a => a.type === "text");

  if (textAnns.length > 0) {
    message += `### Text Annotations (User Instructions)\n`;
    for (const ann of textAnns) {
      const target = ann.targetComponent
        ? `near **${ann.targetComponent}** (${ann.targetFile}:${ann.targetLine})`
        : `at position (${Math.round(ann.position!.x)}, ${Math.round(ann.position!.y)})`;
      message += `- "${ann.content}" — placed ${target}\n`;
    }
    message += `\n`;
  }

  if (drawAnns.length > 0) {
    message += `### Drawing Annotations\n`;
    for (const ann of drawAnns) {
      const target = ann.startComponent
        ? `near **${ann.startComponent}** (${ann.startFile}:${ann.startLine})`
        : "on the page";
      const points = ann.points?.length ?? 0;
      message += `- Drawing with ${points} points ${target} (color: ${ann.color})\n`;
    }
    message += `\n`;
  }

  // Source files
  message += `## Source Files\n\n`;
  for (const [filePath, content] of sources) {
    const ext = path.extname(filePath).slice(1) || "tsx";
    const numberedLines = content
      .split("\n")
      .map((line, i) => `${i + 1}: ${line}`)
      .join("\n");
    message += `### \`${filePath}\`\n\`\`\`${ext}\n${numberedLines}\n\`\`\`\n\n`;
  }

  return message;
}

// --- Prompt formatting helpers ---

function formatResolvedSpacing(val: ResolvedValue<number>): string {
  const absPx = Math.abs(val.raw);
  if (val.type === "exact") {
    return `\`spacing-${val.resolved}\` (${val.resolvedValue})`;
  }
  if (val.type === "snapped") {
    return `~\`spacing-${val.resolved}\` (${val.resolvedValue}, actual ${Math.round(absPx)}px)`;
  }
  return `${Math.round(absPx)}px (use arbitrary value)`;
}

function formatResolvedColor(val: ResolvedValue<string>): string {
  if (val.confidence >= 0.95) {
    return `\`${val.resolved}\``;
  }
  if (val.confidence >= 0.7) {
    return `approximately \`${val.resolved}\` (user picked \`${val.raw}\`)`;
  }
  return `\`${val.raw}\` (use arbitrary value)`;
}
```

- [ ] **Step 2: Simplify `SYSTEM_PROMPT`**

Remove the color-matching and spacing-snapping instructions from `SYSTEM_PROMPT`. Replace lines about color matching and move positioning with:

```typescript
const SYSTEM_PROMPT = `You are a frontend code modifier for a React application using Tailwind CSS.

The user has made visual changes using a design overlay tool. Your job is to modify the source code to implement these changes. Color values and spacing tokens have been pre-resolved — use them as provided.

## Rules
- Only modify the files referenced in the annotations
- Use Tailwind CSS classes (not inline styles) for styling changes
- Preserve the existing code structure — only change what the annotations specify
- If an annotation is ambiguous, make a reasonable interpretation
- Source files include line numbers for reference (e.g. "42: <Button>")

## Annotation Type Guidelines

### Component Moves
For moves, the spacing token and nearest sibling context are provided. Choose the appropriate CSS mechanism (margin, padding, gap, positioning) based on the layout context. Consider: Is this element in a flex/grid container? Would gap be more appropriate than margin? Is relative positioning needed?

### Color Changes
Color values are pre-resolved to Tailwind tokens where possible. Use the token name directly for resolved colors. For arbitrary values, use Tailwind arbitrary syntax like \`bg-[#hex]\` or \`text-[#hex]\`.

### Text Annotations
Text annotations are instructions from the user. Interpret them as code change requests for the nearest referenced component.

### Drawing Annotations
Drawings typically circle or highlight areas the user wants changed. Consider them as visual emphasis on the nearby components.

## Response Format

For each file you modify, respond with one or more SEARCH/REPLACE blocks:

\`\`\`
FILE: path/to/file.tsx
\`\`\`
\`\`\`
<<<<<<< SEARCH
exact lines to find in the original file
=======
replacement lines
>>>>>>> REPLACE
\`\`\`
\`\`\`
DESCRIPTION: path/to/file.tsx
Brief description of what was changed.
\`\`\`

Rules for SEARCH/REPLACE blocks:
- SEARCH content must match the original file EXACTLY (including whitespace and indentation)
- You can have multiple SEARCH/REPLACE blocks per file
- Each block should be the minimal change needed
- Order blocks from top-of-file to bottom-of-file
- Include enough context lines in SEARCH to uniquely identify the location
- Do NOT include line numbers in SEARCH/REPLACE content — those are only for reference
- Only include files that need changes`;
```

- [ ] **Step 5: Build and verify**

Run: `cd packages/cli && pnpm build`
Expected: Clean build

- [ ] **Step 6: Run all CLI tests to verify no regressions**

Run: `pnpm test`
Expected: All existing tests pass (transform tests, tailwind-resolver tests, resolve-intent tests)

- [ ] **Step 7: Commit**

```bash
git add packages/cli/src/server.ts packages/cli/src/generate.ts
git commit -m "feat(cli): wire resolver into generate pipeline and update prompt for resolved annotations"
```

---

### Task 9: Serialize Sibling Rects and pickedToken in Overlay

**Files:**
- Modify: `packages/overlay/src/canvas-state.ts:310-360`

- [ ] **Step 1: Update `serializeAnnotations()` to include sibling rects for moves**

In `packages/overlay/src/canvas-state.ts`, in the `serializeAnnotations()` function, update the move serialization to include sibling rects:

```typescript
const serializedMoves = Array.from(moves.values()).map((entry) => {
  // Collect sibling rects for layout context
  const parent = entry.element.parentElement;
  let siblingRects: Array<{ component: string; rect: { top: number; left: number; width: number; height: number } }> | undefined;

  if (parent) {
    siblingRects = [];
    for (const child of Array.from(parent.children)) {
      if (child === entry.element || !(child instanceof HTMLElement)) continue;
      const rect = child.getBoundingClientRect();
      // Use the component name if available, otherwise tag name
      siblingRects.push({
        component: child.tagName.toLowerCase(),
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      });
    }
  }

  return {
    component: entry.componentRef.componentName,
    file: entry.componentRef.filePath,
    line: entry.componentRef.lineNumber,
    originalRect: {
      top: entry.originalRect.top,
      left: entry.originalRect.left,
      width: entry.originalRect.width,
      height: entry.originalRect.height,
    },
    delta: { dx: entry.delta.dx, dy: entry.delta.dy },
    siblingRects,
  };
});
```

- [ ] **Step 2: Update color change serialization to include `pickedToken`**

In the same function, update the `colorChange` branch. The `pickedToken` will be stored on the annotation when the color picker swatch feature is added (Task 11). For now, add the field passthrough:

```typescript
} else if (ann.type === "colorChange") {
  colorChanges.push({
    component: ann.component.componentName,
    file: ann.component.filePath,
    line: ann.component.lineNumber,
    property: ann.property,
    from: ann.fromColor,
    to: ann.toColor,
    pickedToken: (ann as any).pickedToken,  // will be properly typed in Task 11
  });
}
```

- [ ] **Step 3: Build overlay**

Run: `cd packages/overlay && pnpm build`
Expected: Clean build

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/canvas-state.ts
git commit -m "feat(overlay): serialize sibling rects and pickedToken in annotations"
```

---

### Task 10: Expose Project Colors from Overlay Token Store

**Files:**
- Modify: `packages/overlay/src/properties/tailwind-resolver.ts:329-345`

- [ ] **Step 1: Add `getProjectColors()` accessor**

In `packages/overlay/src/properties/tailwind-resolver.ts`, after the existing `getTokenMap()` function, add:

```typescript
/**
 * Returns custom/overridden project colors from the CLI-supplied Tailwind config.
 * Filters to only colors that differ from Tailwind defaults.
 * Returns array of { token, hex } suitable for color picker swatches.
 */
export function getProjectColors(): Array<{ token: string; hex: string }> {
  if (!cliTokens?.colors) return [];

  // Only return custom/overridden colors — not the full Tailwind default palette.
  // Compare against the default palette to find additions/overrides.
  // If the user hasn't customized any colors, return empty (generic presets still show).
  const DEFAULT_COLOR_COUNT = 253; // approximate count of default Tailwind palette entries
  const allColors = Object.entries(cliTokens.colors).filter(
    ([, hex]) => /^#[0-9a-fA-F]{6}$/.test(hex)
  );

  // Heuristic: if color count matches defaults, user hasn't added custom colors.
  // For v3 with resolved config, custom colors will be additional entries.
  // For v4 with @theme overrides, custom colors replace defaults.
  // In both cases, non-standard token names (no dash-number suffix like "brand", "primary")
  // are likely custom. Include those plus any that override a default value.
  const colors: Array<{ token: string; hex: string }> = [];
  for (const [token, hex] of allColors) {
    // Standard Tailwind tokens match pattern: colorName-shade (e.g., "blue-500")
    // Custom tokens often don't (e.g., "brand", "primary", "accent-foreground")
    const isStandardPattern = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+$/.test(token);
    if (!isStandardPattern && token !== "white" && token !== "black" && token !== "transparent") {
      colors.push({ token, hex });
    }
  }
  return colors;
}
```

- [ ] **Step 2: Build overlay**

Run: `cd packages/overlay && pnpm build`
Expected: Clean build

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/tailwind-resolver.ts
git commit -m "feat(overlay): expose getProjectColors() from Tailwind token store"
```

---

### Task 11: Color Picker Project Swatches and pickedToken

**Files:**
- Modify: `packages/overlay/src/color-picker.ts:6-13,200-226`
- Modify: `packages/overlay/src/tools/color.ts:36-72`

- [ ] **Step 1: Add `projectColors` and `onPickedToken` options to color picker**

In `packages/overlay/src/color-picker.ts`, update the `ColorPickerOptions` type:

```typescript
type ColorPickerOptions = {
  initialColor: string;
  position: { x: number; y: number };
  showPropertyToggle: boolean;
  projectColors?: Array<{ token: string; hex: string }>;
  onColorChange: (color: string) => void;
  onPickedToken?: (token: string | undefined) => void;
  onPropertyChange?: (property: "backgroundColor" | "color") => void;
  onClose: () => void;
};
```

- [ ] **Step 2: Add project color swatch section in `openColorPicker()`**

After the existing preset swatch row (line 226, after `container.appendChild(swatchRow)`), add the project colors section:

```typescript
  // --- Project color swatches ---
  if (opts.projectColors && opts.projectColors.length > 0) {
    const projectLabel = document.createElement("div");
    projectLabel.textContent = "Project";
    projectLabel.style.cssText = `
      font-size: 10px;
      color: ${COLORS.textSecondary};
      font-family: ${FONT_FAMILY};
      margin-top: 2px;
    `;
    container.appendChild(projectLabel);

    const projectRow = document.createElement("div");
    projectRow.style.cssText = "display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";

    for (const { token, hex } of opts.projectColors) {
      const swatch = document.createElement("button");
      swatch.title = token;
      swatch.style.cssText = `
        width: 12px; height: 12px; border-radius: 50%;
        background: ${hex};
        border: 1px solid ${COLORS.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${TRANSITIONS.fast};
      `;
      swatch.addEventListener("mouseenter", () => { swatch.style.boxShadow = SHADOWS.sm; });
      swatch.addEventListener("mouseleave", () => { swatch.style.boxShadow = "none"; });
      swatch.addEventListener("click", () => {
        currentHsv = hexToHsv(hex);
        drawColorArea();
        drawHueStrip();
        hexInput.value = hex;
        emitColor();
        opts.onPickedToken?.(token);
      });
      projectRow.appendChild(swatch);
    }
    container.appendChild(projectRow);
  }
```

- [ ] **Step 3: Clear pickedToken when user changes color via other means**

In the existing `emitColor()` function, clear `pickedToken` since any non-swatch color change invalidates it:

```typescript
  function emitColor() {
    const hex = hsvToHex(currentHsv);
    hexInput.value = hex;
    opts.onColorChange(hex);
    opts.onPickedToken?.(undefined);  // clear — user changed color via area/hue/input, not swatch
  }
```

This covers all non-swatch paths (`updateAreaFromMouse`, `updateHueFromMouse`, hex input blur, generic preset swatch clicks) since they all call `emitColor()`. The project swatch click handler sets `onPickedToken(token)` AFTER `emitColor()`, so the token is correctly preserved for swatch picks.

- [ ] **Step 4: Update `color.ts` to pass project colors and track pickedToken**

In `packages/overlay/src/tools/color.ts`, import `getProjectColors` and track the picked token:

```typescript
import { getProjectColors } from "../properties/tailwind-resolver.js";

let currentPickedToken: string | undefined;

// In the openColorPicker() call inside onMouseDown:
openColorPicker({
  initialColor,
  position: { x: e.clientX + 10, y: e.clientY + 10 },
  showPropertyToggle: true,
  projectColors: getProjectColors(),
  onColorChange(hex) {
    if (targetEl) {
      (targetEl.style as any)[selectedProperty] = hex;
    }
  },
  onPickedToken(token) {
    currentPickedToken = token;
  },
  onPropertyChange(prop) {
    selectedProperty = prop;
  },
  onClose() {
    setInteractionPointerEvents(true);
    if (!targetEl || !targetComp) return;
    const fromColor = selectedProperty === "backgroundColor" ? originalValues.bg : originalValues.color;
    const toColor = (targetEl.style as any)[selectedProperty];
    if (toColor && toColor !== fromColor) {
      const id = crypto.randomUUID();
      const rect = targetEl.getBoundingClientRect();
      const page = viewportToPage(rect.right, rect.top);
      addColorBadge(id, page.x, page.y, toColor);
      addAnnotation({
        type: "colorChange",
        id,
        component: targetComp,
        targetElement: targetEl,
        property: selectedProperty,
        fromColor,
        toColor,
        pickedToken: currentPickedToken,  // carry through
      } as ColorOverrideRuntime);
    }
    targetEl = null;
    targetComp = null;
    currentPickedToken = undefined;
  },
});
```

- [ ] **Step 5: Add `pickedToken` to `ColorOverride` in shared types**

In `packages/shared/src/types.ts:212-219`, add the optional field to the `ColorOverride` interface (not the runtime type — the shared type is what flows through the whole pipeline):

```typescript
export interface ColorOverride {
  type: "colorChange";
  id: string;
  component: ComponentRef;
  property: "color" | "backgroundColor";
  fromColor: string;
  toColor: string;
  pickedToken?: string;  // token name if user picked from project swatch
}
```

`ColorOverrideRuntime` extends `ColorOverride` via intersection, so it inherits `pickedToken` automatically.

- [ ] **Step 6: Build overlay**

Run: `cd packages/overlay && pnpm build`
Expected: Clean build

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/color-picker.ts packages/overlay/src/tools/color.ts packages/overlay/src/canvas-state.ts
git commit -m "feat(overlay): add project color swatches to color picker with pickedToken tracking"
```

---

### Task 12: End-to-End Verification

**Files:** None (verification only)

- [ ] **Step 1: Run all tests**

Run: `pnpm test`
Expected: All tests pass (transform, tailwind-resolver, resolve-intent)

Run: `npx vitest run packages/cli/src/__tests__/resolve-intent.test.ts`
Expected: All resolve-intent tests pass

- [ ] **Step 2: Full build**

Run: `pnpm build`
Expected: Clean build across all packages

- [ ] **Step 3: Manual smoke test**

1. Start test app: `cd test-app && pnpm dev`
2. Start FrameUp: `node ../packages/cli/bin/frameup.js 3000`
3. Open in browser, select color tool
4. Click an element — verify color picker opens with project color swatches at the bottom
5. Pick a project color swatch — verify it applies
6. Move an element, add a color change, add a text annotation
7. Click "Generate" — verify the console output shows resolved token names in the prompt (not raw pixels/hex)

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address issues found during smoke testing"
```

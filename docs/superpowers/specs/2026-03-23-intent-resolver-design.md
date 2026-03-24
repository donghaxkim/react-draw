# Intent Resolver: Pre-processing Pipeline for Generate

## Summary

Replace the current approach of sending raw pixel deltas and hex codes to Claude with a pre-processing resolver layer that handles deterministic math (color matching, spacing snapping) before the prompt, reserving Claude for judgment calls (text interpretation, drawing inference, layout mechanism decisions).

**Principle:** Math before the prompt, judgment in the prompt.

## Architecture

```
SerializedAnnotations
        │
        ▼
  resolveIntent(annotations, tokens)    ← new module: resolve-intent.ts
        │
        ▼
  ResolvedAnnotations
        │
        ▼
  buildUserMessage()                    ← accepts resolved data, not raw
        │
        ▼
  Claude API call                       ← cleaner prompt, focused on judgment
```

The resolver sits in `packages/cli/src/resolve-intent.ts`. It transforms `SerializedAnnotations` into `ResolvedAnnotations` using the `TailwindTokenMap` that is already resolved at session start.

`resolveIntent()` is a pure function — empty arrays pass through as empty arrays. No special handling needed for degenerate inputs.

## Types

### ResolvedValue

```typescript
interface ResolvedValue<T> {
  raw: T;                    // original value (e.g., "#3a82f6", 48)
  resolved: string | null;   // token name (e.g., "blue-500", "4") or null if arbitrary
  resolvedValue: string | null; // token CSS value (e.g., "#3b82f6", "1rem") or null
  confidence: number;        // 0-1
  type: "exact" | "snapped" | "arbitrary";
}
```

- **exact** (confidence 1.0): Raw value matches a token exactly
- **snapped** (confidence 0.7-0.99): Within threshold, scaled by distance
- **arbitrary** (confidence 0): No close token — use arbitrary Tailwind value

The `type` field and `confidence` are intentionally both stored. While derivable from each other, having both makes consuming code more explicit and readable.

### ResolvedAnnotations

Mirrors `SerializedAnnotations` but with resolved values:

```typescript
interface ResolvedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    originalRect: { top: number; left: number; width: number; height: number };
    delta: { dx: number; dy: number };
    resolvedDx: ResolvedValue<number> | null;  // null if dx is 0
    resolvedDy: ResolvedValue<number> | null;  // null if dy is 0
    nearestSiblings: {
      left?: { component: string; distance: number };
      right?: { component: string; distance: number };
      above?: { component: string; distance: number };
      below?: { component: string; distance: number };
    };
  }>;
  // Draw/text annotations pass through unchanged — use the same type from SerializedAnnotations
  annotations: SerializedAnnotations["annotations"];
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
    resolvedFrom: ResolvedValue<string>;
    resolvedTo: ResolvedValue<string>;
    pickedToken?: string;  // if user picked from project swatch, token name carried from pick-time
  }>;
}
```

## Color Resolver

### Algorithm: CIE76 Delta-E in Lab Color Space

RGB distance doesn't match human perception. Lab color space is designed so that equal numerical distances correspond to equal perceived differences.

1. Convert input hex to Lab (via RGB → XYZ → Lab, standard illuminant D65)
2. Compute Euclidean distance (Delta-E) against each Tailwind palette color in Lab space
3. Return the nearest match with confidence

### Color Math Functions (in `resolve-intent.ts`)

- `hexToRgb(hex: string): [number, number, number]`
- `rgbToLab(r: number, g: number, b: number): [number, number, number]` (via XYZ intermediate)
- `deltaE(lab1, lab2): number` (Euclidean distance)
- `resolveColor(hex: string, palette: LabCache): ResolvedValue<string>`

### Confidence Mapping

| Delta-E | Type | Confidence | Meaning |
|---------|------|------------|---------|
| 0 | exact | 1.0 | Identical color |
| < 3 | snapped | 0.95 | Imperceptible to human eye |
| < 8 | snapped | 0.7 | Noticeable but clearly the same intent |
| >= 8 | arbitrary | 0 | Intentionally different — use arbitrary value |

### Palette Caching

**Eager, not lazy.** The Tailwind color palette is known the moment `resolveTailwindConfig()` runs at session start. Convert all palette hex values to Lab at that point and store as a `Map<string, { token: string; lab: [number, number, number] }>`. This avoids cold-start penalty when resolving a batch of color changes at once.

**Filter non-hex values** before caching. The palette includes entries like `"transparent": "transparent"` which are not valid hex colors. Skip any value that doesn't match `/^#[0-9a-fA-F]{6}$/` during the eager cache build.

### Token Passthrough

If a color change carries a `pickedToken` (set when the user picks from the project color swatches — see Color Picker section), skip Delta-E entirely and emit `{ resolved: pickedToken, confidence: 1.0, type: "exact" }`. This eliminates ambiguity when two tokens map to the same hex value.

## Spacing Resolver

### Algorithm

1. Convert pixel delta to rem: `px / 16`
   - **Assumption:** Root font size is 16px (browser default). Add a code comment noting this assumption so it's easy to find if someone reports spacing mismatches with a non-standard root font size.
2. Parse spacing token values from `tokens.spacing` into numeric pixel values. Token values are strings like `"1rem"`, `"0.5rem"`, `"1px"`, `"0px"`. Parse by:
   - Stripping the unit suffix (`rem`, `px`)
   - Converting rem to px (multiply by 16)
   - `"0px"` and `"1px"` (the `px` token) are already in pixels
   - Cache these parsed values alongside the Lab palette at session start
3. Find the token whose pixel value is closest to the input delta (absolute value)
4. Compute pixel-level distance between input and nearest token
5. Map to confidence

### Confidence Mapping

| Distance (px) | Type | Confidence | Meaning |
|---------------|------|------------|---------|
| 0 | exact | 1.0 | Exact token match |
| 1 | snapped | 0.95 | Essentially the same |
| 2 | snapped | 0.90 | Very close |
| 3 | snapped | 0.80 | Close enough |
| 4 | snapped | 0.75 | Threshold boundary |
| > 4 | arbitrary | 0 | Intentional custom value |

Confidence scales linearly from 0.95 (1px) to 0.75 (4px).

### Edge Cases

- **Negative deltas:** Resolve absolute value, direction is tracked separately
- **Zero delta on one axis:** Omit from resolved output (set to null)
- **Both axes:** Resolve independently

## Nearest Sibling Context for Moves

The resolver includes nearest sibling distances in resolved move data. This gives Claude layout context for making the margin-vs-gap-vs-positioning decision.

### Data Source

During serialization in the overlay, for each moved element:
1. Get the parent element's children (siblings)
2. Temporarily ensure move transforms are applied (the element uses CSS `transform: translate(dx, dy)` for visual positioning — `getBoundingClientRect()` reflects this transformed position). Call `applyMoveTransform()` if not already applied.
3. For each sibling, compute `getBoundingClientRect()` distances to the moved element's bounding rect
4. Include the closest sibling in each direction (left, right, above, below) with component name and pixel distance
5. Restore original transform state if it was changed

### Purpose

This is context for Claude's judgment, not for deterministic resolution. If a button landed 18px to the right and there's a sibling 16px away, the intent is probably "align next to that sibling with gap-4." Claude decides the mechanism — the resolver provides the spatial context to inform that decision.

## Color Picker: Project Color Swatches

### Current State

`color-picker.ts` line 203 has 8 hardcoded preset swatches (black, white, red, orange, yellow, green, blue, purple).

### Changes

1. **Store Tailwind colors in overlay:** When `tailwindTokens` message arrives via WebSocket, extract the color palette and store it via an accessor (e.g., `getTailwindColors()`)

2. **New option on `openColorPicker()`:**
   ```typescript
   projectColors?: Array<{ token: string; hex: string }>
   ```

3. **Filter to project-specific colors:** Only show colors that are custom/overridden in the user's Tailwind config. If no customizations exist, show nothing — the generic presets remain above.

4. **Render "Project Colors" section** below the existing 8 generic presets. Each swatch is a small circle (same style as existing), with tooltip showing the token name on hover (e.g., "brand-blue"). Click applies the hex value.

5. **Carry token name through the pipeline:** When a user picks a color from the project swatches, store the token name alongside the hex value in the color change annotation (`pickedToken` field). The resolver skips Delta-E for these and emits confidence 1.0 immediately. This eliminates ambiguity when two tokens share the same hex value — the user clicked "brand-blue," not "primary."

### Why This Matters

Users are naturally guided toward token-accurate colors, making downstream resolution trivial. The intent pipeline becomes more reliable because the user's choice is preserved, not reconstructed.

## Prompt Restructuring

### Changes to `buildUserMessage()`

Accept `ResolvedAnnotations` instead of `SerializedAnnotations`.

#### Color Changes — Tiered Phrasing

| Confidence | Prompt Phrasing |
|------------|-----------------|
| High (>= 0.95) | "Change background to `blue-500`" |
| Medium (>= 0.7 and < 0.95) | "Change background to approximately `blue-500` (user picked `#3a82f6`)" |
| Arbitrary (0) | "Change background to `bg-[#ff13ab]` (use arbitrary value)" |

#### Moves — Tiered Phrasing with Layout Context

| Confidence | Prompt Phrasing |
|------------|-----------------|
| Snapped | "Button moved right by ~spacing-4 (16px, actual 18px). Nearest sibling to the right: Card at 16px. Choose the appropriate CSS mechanism for this layout context." |
| Arbitrary | "Button moved right by 137px (use arbitrary value). Choose the appropriate CSS mechanism for this layout context." |

Key phrasing decisions:
- **"Choose the appropriate CSS mechanism for this layout context"** — explicitly tells Claude it's being asked to decide between margin, padding, gap, positioning, etc.
- **"Use arbitrary value"** — direct instruction, not a description of a problem. Never say "no matching token" which could mislead Claude into searching for one.

#### Draw/Text Annotations

Pass through unchanged — these are judgment calls for Claude.

### Changes to `SYSTEM_PROMPT`

**Remove** (now handled by resolver):
- "find the closest Tailwind color class" instructions
- "If no exact match, use arbitrary value syntax" guidance
- Spacing-to-margin conversion instructions

**Keep** (still Claude's job):
- Tailwind best practices and code style
- Component structure and JSX patterns
- Responsive design guidance
- Text annotation interpretation
- Drawing annotation interpretation
- SEARCH/REPLACE response format
- "Choose appropriate CSS mechanism" for moves (margin vs padding vs gap vs positioning)

## File Changes Summary

| File | Change |
|------|--------|
| `packages/cli/src/resolve-intent.ts` | **New** — ResolvedValue type, resolveIntent(), resolveColor(), resolveSpacing(), Lab color math, palette cache |
| `packages/cli/src/generate.ts` | Modify — `buildUserMessage()` accepts `ResolvedAnnotations`, tiered prompt phrasing, simplified `SYSTEM_PROMPT` |
| `packages/shared/src/types.ts` | Add `ResolvedAnnotations`, `ResolvedValue` types. Add optional `pickedToken?: string` to `SerializedAnnotations.colorChanges` entries AND `ResolvedAnnotations.colorChanges` entries |
| `packages/overlay/src/color-picker.ts` | Add project color swatch section, accept `projectColors` option |
| `packages/overlay/src/tools/color.ts` | Pass `projectColors` to `openColorPicker()`, carry `pickedToken` when swatch is picked |
| `packages/overlay/src/bridge.ts` | Expose project colors from the already-stored Tailwind tokens (currently stored via `setCliTokens()`) as `getProjectColors()` — no new storage needed, just a filtered accessor |
| `packages/overlay/src/canvas-state.ts` | `serializeAnnotations()` includes `pickedToken` and nearest sibling data for moves |

## Testing Strategy

- **Color resolver unit tests:** Known hex → expected token, edge cases (equidistant colors, transparent, black/white), token passthrough
- **Spacing resolver unit tests:** Known px → expected token, threshold boundaries, negative deltas, zero axes
- **Lab conversion tests:** Verify against known RGB→Lab reference values
- **Integration test:** Full `resolveIntent()` with mock annotations → verify resolved output structure
- **Color picker:** Manual testing — verify swatches appear from Tailwind config, tooltip shows token name, picked token carries through

## Known Limitations

- **RGBA/alpha colors:** The color picker's `rgbToHex()` drops alpha channels from `getComputedStyle()` return values (e.g., `rgba(0,0,0,0.5)` → `#000000`). The resolver will match these against opaque palette colors. This is a pre-existing limitation in the color tool, not introduced by this design.
- **CIE76 accuracy:** CIE76 Delta-E is less accurate than CIEDE2000 for highly saturated colors. The confidence thresholds in this spec are calibrated for CIE76. If upgraded to CIEDE2000 later, thresholds will need recalibration.
- **Root font size:** Spacing resolver assumes 16px root font size. See the comment requirement in the Spacing Resolver section.

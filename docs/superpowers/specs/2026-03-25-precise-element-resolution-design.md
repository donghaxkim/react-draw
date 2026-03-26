# Precise Element Resolution for Batch Transforms

## Problem

The batch transform engine resolves JSX elements by line:col from React's owner stack. In React 19, owner stacks point to the component definition (e.g., line 32 of `App.jsx` where `const Home = ...` is declared), not the actual JSX element (`<div className="flex gap-4">` at line 103). The current fuzzy fallback uses weighted scoring over tag name + first 3 classes + line proximity, which picks wrong elements when multiple `<div>` tags exist in the same file.

Secondary problem: adding `mt-44` alongside existing `-mt-8` doesn't replace it because `classMatchesPrefix("-mt-8", "mt")` returns `false`. The user sees no visual change.

## Design

### Part 1: Element Identity

Extend the data captured at selection time in the overlay:

```typescript
// Added to BatchOperation (all non-reorder variants)
tagName: string;              // el.tagName.toLowerCase()
className: string;            // el.className at selection time (full DOM className)
parentTagName: string;        // el.parentElement?.tagName.toLowerCase()
parentClassName: string;      // el.parentElement?.className (full DOM className)
nthOfType: number;            // count of same-tag siblings before this element in DOM
id?: string;                  // el.id if present
jsxKey?: string;              // fiber.key if present
fileMtime: number;            // fs.statSync mtime at selection time
fileSize: number;             // fs.statSync size at selection time
```

**Dropped from earlier draft:** `textContent`. DOM `textContent` concatenates all descendant text recursively, while AST text children are only direct JSX children. Comparing them produces false matches/rejections. The remaining signals are all directly verifiable against the AST without ambiguity.

**className comparison semantics:** The DOM `className` includes runtime-injected classes (CSS-in-JS, animations, conditional logic like `cn(base, active && "bg-blue-500")`). The AST `className` is the static string in source. Comparison is a **subset check**: are the AST's static classes a subset of the DOM's observed classes? Not an equality check. This accommodates runtime-added classes without false rejections.

**parentClassName semantics:** Same subset-check logic. The parent's tag + classes disambiguates elements that share the same tagName and nthOfType but live in different parent containers.

**nthOfType semantics:** Computed in the DOM — overlay counts same-tag siblings in `el.parentElement.children` before this element (0-indexed). Matched against the AST — CLI counts same-tag `JSXElement` children of the parent node. Known discrepancy: conditional siblings (`{show && <div>}`) exist in the AST as `JSXExpressionContainer` nodes but may not be present in the DOM. This is why nthOfType is the last resort in the resolution chain.

The overlay requests `mtime + size` from the CLI via a WebSocket message at selection time. All other fields come from the DOM and React fiber — no extra round trips.

### Part 2: Deterministic Resolution Chain

Replace the fuzzy scorer with a chain that either resolves with certainty or fails loudly. No scoring, no thresholds.

```
Step 1: Staleness check
  - Compare captured mtime+size against current fs.statSync
  - If different → reject: "File changed since selection, re-select the element"
  - Stat is captured once at selection time and compared once at commit time

Step 2: Exact line:col
  - findJSXElementAt(line, col)
  - If found AND tagName matches → done
  - If found but tagName mismatches → continue (owner stack pointed to wrong spot)

Step 3: Component-scoped scan
  - Find the enclosing function/component declaration from the hint line
  - Collect all JSX elements within that component's body
  - Filter by tagName match
  - If exactly one → done
  - If zero or multiple → continue

Step 4: jsxKey disambiguation
  - If operation has jsxKey, search candidates for matching key prop
  - Keys are unique among siblings by definition — strongest disambiguator after position
  - If found → done

Step 5: nthOfType + parent context fallback
  - Among candidates from step 3, match by nthOfType (position among same-tag
    JSXElement siblings in the AST parent)
  - If multiple candidates share the same nthOfType, use parentTagName + parentClassName
    (subset check) to disambiguate
  - If exactly one match → done

Step 6: Fail loudly
  - No match → reject with descriptive error
  - Never apply to a "best guess" element
  - Toast in overlay: "Couldn't identify <div> in App.jsx — re-select and try again"
```

**Why no nearby-line scan:** The ±3 line window from the earlier draft was a magic number. If exact line:col fails (common in React 19), the hint line could be 70+ lines away from the element. A fixed window doesn't help. Component-scoped scan (step 3) is semantically meaningful — "somewhere in this component's render" — and covers the same case without an arbitrary constant.

### Part 3: Negative Margin Handling (Move-Scoped)

When the move engine generates a spacing class, it must clean up both positive and negative variants on the same axis before applying the new class.

**Scoped to moveSpacing only** — the general `classMatchesPrefix` function stays unchanged. The property panel must not accidentally strip a negative translate that was intentionally placed.

Implementation in `applyMoveSpacing`:
1. Determine the target prefix (e.g., `mt` for y-axis positive in block layout)
2. Build removal patterns: both `mt-*` and `-mt-*`
3. Remove all matching classes from the element
4. Add the new class (e.g., `mt-4`)

This ensures the user doesn't see "no visual change" because a stale negative margin cancels the new positive one.

### Part 4: File Stat WebSocket Message

New message pair for the overlay to request file metadata at selection time:

```typescript
// ClientMessage
| { type: "fileStat"; filePath: string }

// ServerMessage
| { type: "fileStatResult"; filePath: string; mtime: number; size: number }
```

The overlay calls this when an element is selected (the moment the user clicks, before any mutations). The mtime+size pair is stored on the MoveEntry / annotation and included in the BatchOperation at commit time. The CLI compares the stored pair against a fresh `fs.statSync` at commit time.

**Timing:** Captured at selection time (user clicks element). Not refreshed during editing. If the user selects, spends 30 seconds adjusting, then commits — the staleness check compares against the moment of selection. If the file changed between selection and commit (auto-save, formatter, another tool), the check catches it.

## What This Does NOT Do

- No scoring or weighted matching — every resolution is deterministic
- No "best guess" application — wrong element is worse than failed operation
- No changes to `classMatchesPrefix` globally — negative handling is move-scoped
- No content hashing — mtime+size is sufficient for staleness detection
- No textContent fingerprinting — DOM vs AST textContent semantics differ too much

## Testing

- Exact line:col resolution (React 18 path) — existing tests cover this
- Component-scoped scan — fixture with component containing multiple same-tag elements
- jsxKey disambiguation — fixture with keyed list items
- nthOfType + parent context fallback — fixture with repeated unkeyed siblings in different parents
- parentClassName disambiguation — fixture where nthOfType is identical but parents differ
- Staleness rejection — modify file mtime between capture and commit
- Negative margin replacement — fixture with `-mt-8`, apply `mt-4`, verify `-mt-8` is removed
- Negative margin scoping — verify property panel `updateClassName` does NOT strip negative variants
- className subset matching — fixture with cn()/clsx() dynamic classes, verify AST static subset matches DOM superset

# Property Panel & Onboarding Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the property panel contextual (show only relevant properties per element) and replace onboarding with a single-line hint.

**Architecture:** Two independent features. Feature 1 adds a `getRelevantGroups()` function in `property-controller.ts` that inspects the selected element's computed styles and role to determine which property groups to show, then filters descriptors before passing to `renderSections()`. A "Show all properties" link in the section container provides an escape hatch. Feature 2 rewrites `onboarding.ts` to show a single-line top bar instead of the current floating tooltip.

**Tech Stack:** TypeScript, DOM APIs (getComputedStyle), Shadow DOM

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/overlay/src/properties/property-controller.ts` | Modify | Add `getRelevantGroups()`, filter descriptors in `inspect()` and `rerenderSections()` |
| `packages/overlay/src/properties/section-renderer.ts` | Modify | Accept `relevantGroups` set, skip irrelevant groups; add "Show all" link |
| `packages/overlay/src/onboarding.ts` | Rewrite | Replace tooltip with top bar hint, new localStorage key, auto-dismiss on selection |
| `packages/overlay/src/index.ts` | Modify | Wire onboarding dismissal to selection events |

**Not modified:** `property-descriptors.ts` (already has `group` field), `property-sidebar.ts` (no changes needed — content flows through `replaceContent`).

---

## Task 1: Contextual Group Filtering — `getRelevantGroups()`

**Files:**
- Modify: `packages/overlay/src/properties/property-controller.ts:14-21` (add function near existing group constants)

- [ ] **Step 1: Add `getRelevantGroups()` function**

Add after the `DEFERRED_GROUPS` constant (line 21):

```typescript
// Tags that are inherently text-oriented
const TEXT_TAGS = new Set([
  "h1","h2","h3","h4","h5","h6","p","span","a",
  "button","label","li","td","th","blockquote","figcaption",
]);

/**
 * Determines which property groups are relevant for the given element
 * based on its computed styles, tag name, and children.
 */
function getRelevantGroups(element: HTMLElement): Set<PropertyGroup> {
  const groups = new Set<PropertyGroup>(["spacing", "size", "background"] as PropertyGroup[]);
  const computed = getComputedStyle(element);

  // Layout: flex/grid containers or elements with children (potential containers)
  const display = computed.display;
  if (display === "flex" || display === "inline-flex" ||
      display === "grid" || display === "inline-grid" ||
      element.children.length > 0) {
    groups.add("layout");
  }

  // Typography: text elements or elements with direct text nodes
  const tagName = element.tagName.toLowerCase();
  const hasDirectText = Array.from(element.childNodes).some(
    n => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? "").length > 0,
  );
  if (hasDirectText || TEXT_TAGS.has(tagName)) {
    groups.add("typography");
  }

  return groups;
}
```

Note: The spec mentions min/max size as a separate conditional group (`sizeMinMax`), but the codebase has no such group — min/max properties are part of the `"size"` group. Since `"size"` is always shown, we skip the min/max heuristic. This keeps things simpler without losing functionality.

- [ ] **Step 2: Verify the function compiles**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`
Expected: Builds successfully (function is defined but not yet called)

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "feat(property-panel): add getRelevantGroups heuristic for contextual filtering"
```

---

## Task 2: Wire Filtering into `inspect()` and `rerenderSections()`

**Files:**
- Modify: `packages/overlay/src/properties/property-controller.ts:383-437` (inspect function)
- Modify: `packages/overlay/src/properties/property-controller.ts:257-268` (rerenderSections function)

- [ ] **Step 1: Add `showAllGroups` state flag**

In the module state block (around line 44), add to the state object:

```typescript
showAllGroups: false,
```

Also add to `resetState()` (around line 286):

```typescript
showAllGroups: false,
```

- [ ] **Step 2: Filter descriptors in `inspect()`**

In `inspect()`, before the `renderSections` call (line 422), filter descriptors:

```typescript
// Determine which groups are relevant for this element
const relevantGroups = state.showAllGroups
  ? null
  : getRelevantGroups(element);

// Filter descriptors to only relevant groups
const descriptorsToRender = relevantGroups
  ? ALL_DESCRIPTORS.filter(d => relevantGroups.has(d.group))
  : ALL_DESCRIPTORS;

// Render sections
const { container, controls: newControls } = renderSections(
  descriptorsToRender,
  state.currentValues,
  preview,
  scheduledCommit,
);
```

Replace the existing `renderSections` call at lines 423-428.

> **Note:** The `renderSections` call here will gain an `onShowAll` parameter in Task 3. This step establishes the filtering; Task 3 adds the escape hatch.

> **Deferred groups interaction:** When a group like typography is filtered out, its descriptors aren't passed to `renderSections`, so no section renders and no expand listener fires. The `currentValues` map retains placeholder `defaultValue` entries for those properties. When the user clicks "Show all" (Task 3), `rerenderSections()` re-renders with all descriptors. Typography will appear collapsed, and the existing `onSectionExpand` listener (set up in `inspect()`) will trigger `readDeferredGroup()` to read real values. This works because the expand listener survives rerenders.

- [ ] **Step 3: Apply same filtering in `rerenderSections()`**

Update `rerenderSections()` (line 257-268):

```typescript
function rerenderSections(): void {
  if (!state.selectedElement || !state.componentInfo) return;
  destroyControls();

  const relevantGroups = state.showAllGroups
    ? null
    : getRelevantGroups(state.selectedElement);
  const descriptorsToRender = relevantGroups
    ? ALL_DESCRIPTORS.filter(d => relevantGroups.has(d.group))
    : ALL_DESCRIPTORS;

  const { container, controls: newControls } = renderSections(
    descriptorsToRender,
    state.currentValues,
    preview,
    scheduledCommit,
  );
  controls = newControls;
  sidebar.replaceContent(container);
}
```

- [ ] **Step 4: Export `setShowAllGroups` for the "Show all" link**

Add a public function:

```typescript
export function setShowAllGroups(showAll: boolean): void {
  state.showAllGroups = showAll;
  rerenderSections();
}
```

- [ ] **Step 5: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`
Expected: Builds successfully

- [ ] **Step 6: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "feat(property-panel): filter property groups based on element relevance"
```

---

## Task 3: "Show All Properties" Link in Section Renderer

**Files:**
- Modify: `packages/overlay/src/properties/section-renderer.ts:221-319` (renderSections function)
- Modify: `packages/overlay/src/properties/section-renderer.ts:60-145` (styles)

- [ ] **Step 1: Add styles for the "Show all" link**

Append to `SECTION_STYLES` (before the closing backtick at line ~145):

```css
.prop-show-all {
  padding: 8px 14px;
  font-family: ${FONT_FAMILY};
  font-size: 11px;
  color: ${COLORS.textTertiary};
  cursor: pointer;
  text-align: center;
  user-select: none;
}
.prop-show-all:hover {
  color: ${COLORS.accent};
}
```

- [ ] **Step 2: Accept `onShowAll` callback in `renderSections`**

Update the `renderSections` signature:

```typescript
export function renderSections(
  descriptors: PropertyDescriptor[],
  currentValues: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
  onShowAll?: () => void,
): { container: HTMLElement; controls: PropertyControl[] } {
```

Before the `return` statement (line ~318), if `onShowAll` is provided and descriptors were filtered (fewer than ALL), add:

```typescript
if (onShowAll) {
  const showAllLink = document.createElement("div");
  showAllLink.className = "prop-show-all";
  showAllLink.textContent = "Show all properties";
  showAllLink.addEventListener("click", onShowAll);
  container.appendChild(showAllLink);
}
```

- [ ] **Step 3: Pass `onShowAll` from property-controller**

In `inspect()` and `rerenderSections()`, pass the callback:

```typescript
const isFiltered = relevantGroups !== null && descriptorsToRender.length < ALL_DESCRIPTORS.length;
const onShowAll = isFiltered ? () => setShowAllGroups(true) : undefined;

const { container, controls: newControls } = renderSections(
  descriptorsToRender,
  state.currentValues,
  preview,
  scheduledCommit,
  onShowAll,
);
```

- [ ] **Step 4: Build and manual test**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`
Expected: Builds successfully

Manual test:
1. Launch FrameUp against test-app
2. Click a `<button>` — should see Spacing, Size, Typography, Background (no Layout if not flex)
3. Click a flex container — should see Layout, Spacing, Size, Background
4. Click "Show all properties" — all groups appear, link disappears
5. Select a different element — filtering resets

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/properties/section-renderer.ts packages/overlay/src/properties/property-controller.ts
git commit -m "feat(property-panel): add 'Show all properties' escape hatch"
```

---

## Task 4: Multi-Select Intersection

**Files:**
- Modify: `packages/overlay/src/properties/property-controller.ts`

- [ ] **Step 1: Check if multi-select exists**

Search for multi-select handling in the codebase. If `inspect()` only receives a single element (current behavior), this edge case is deferred — no code needed now.

Rationale: The spec mentions multi-select intersection, but the current `inspect()` API takes a single `HTMLElement`. Multi-select would need `inspect([elements])` which is a separate feature. Document as future consideration.

- [ ] **Step 2: Add a code comment for future multi-select**

In `getRelevantGroups()`, add a comment:

```typescript
// Future: for multi-select, compute intersection of relevant groups across all elements
```

- [ ] **Step 3: Commit (if any changes)**

```bash
git add packages/overlay/src/properties/property-controller.ts
git commit -m "docs: note multi-select group intersection as future work"
```

---

## Task 5: Replace Onboarding with Single-Line Hint Bar

**Files:**
- Rewrite: `packages/overlay/src/onboarding.ts`

- [ ] **Step 1: Rewrite `onboarding.ts`**

Replace the entire file:

```typescript
import { COLORS, FONT_FAMILY, TRANSITIONS } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";

const STORAGE_KEY = "frameup-onboarding-dismissed";

let barEl: HTMLDivElement | null = null;

export function showOnboardingHint(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  barEl = document.createElement("div");
  barEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${COLORS.bgSecondary};
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    color: ${COLORS.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    pointer-events: auto;
  `;

  const text = document.createElement("span");
  text.textContent = "Click any element to edit its properties. Double-click text to edit it.";

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "\u00d7";
  closeBtn.style.cssText = `
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${COLORS.textTertiary};
  `;
  closeBtn.addEventListener("click", () => dismissOnboarding());

  barEl.appendChild(text);
  barEl.appendChild(closeBtn);
  shadowRoot.appendChild(barEl);

  requestAnimationFrame(() => {
    if (barEl) barEl.style.opacity = "1";
  });
}

export function dismissOnboarding(): void {
  if (!barEl) return;
  localStorage.setItem(STORAGE_KEY, "1");
  barEl.style.opacity = "0";
  setTimeout(() => {
    barEl?.remove();
    barEl = null;
  }, 150);
}
```

Key changes from spec:
- New localStorage key: `frameup-onboarding-dismissed` (old: `frameup-onboarding-seen`)
- Top bar instead of floating tooltip
- No auto-dismiss timer — dismissed by click or selection
- `×` close button

- [ ] **Step 2: Build and verify**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`
Expected: Builds successfully

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/onboarding.ts
git commit -m "feat(onboarding): replace tooltip with single-line hint bar"
```

---

## Task 6: Wire Onboarding Auto-Dismiss on First Selection

**Files:**
- Modify: `packages/overlay/src/index.ts:218-228`

- [ ] **Step 1: Check how selection events are emitted**

Look at how element selection fires in the overlay — `inspect()` is called on selection. The `onToolChange` already calls `dismissOnboarding()`. We also want to dismiss on the first element selection (click on an element).

- [ ] **Step 2: Add dismissal call in the selection flow**

In `index.ts`, the `dismissOnboarding()` call on tool change (line 228) already exists. Add `dismissOnboarding()` at the point where an element is first selected/inspected. Find where `inspect()` is called from the selection handler and add `dismissOnboarding()` there, OR add it inside `inspect()` itself in property-controller.

The cleanest approach: add `dismissOnboarding()` at the top of `inspect()` in property-controller.ts:

```typescript
import { dismissOnboarding } from "../onboarding.js";

export function inspect(element: HTMLElement, info: ComponentInfo): void {
  dismissOnboarding();
  // ... rest of inspect
```

- [ ] **Step 3: Build and manual test**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`

Manual test:
1. Clear localStorage (`frameup-onboarding-dismissed`)
2. Launch FrameUp — hint bar should appear at top
3. Click any element — bar dismisses, sidebar opens
4. Reload — bar should NOT reappear (localStorage set)
5. Clear localStorage, reload — bar appears, click × — bar dismisses

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/properties/property-controller.ts packages/overlay/src/index.ts
git commit -m "feat(onboarding): auto-dismiss hint on first element selection"
```

---

## Task 7: Final Build & Integration Test

- [ ] **Step 1: Full build**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm build`
Expected: Clean build, no errors

- [ ] **Step 2: Run existing tests**

Run: `cd /Users/gimdongha/Desktop/Projects/FrameUp && pnpm test`
Expected: All 13 CLI transform tests pass (property panel has no unit tests currently)

- [ ] **Step 3: Manual integration test**

Test the following scenarios against test-app:

1. **Text element** (`<h1>`, `<p>`): Should show Spacing, Size, Typography, Background
2. **Flex container**: Should show Layout, Spacing, Size, Background
3. **Empty div**: Should show Spacing, Size, Background only
4. **Button with text**: Should show Spacing, Size, Typography, Background (+ Layout if flex)
5. **"Show all"**: Click link, all groups appear, link gone
6. **New selection**: Filtering resets per element
7. **Onboarding bar**: Appears once, dismisses on selection or ×, stays dismissed

- [ ] **Step 4: Final commit if any cleanup needed**

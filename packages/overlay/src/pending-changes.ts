// packages/overlay/src/pending-changes.ts
import type { ApplyChange } from "@frameup/shared";
import { send, onApplyAllComplete } from "./bridge.js";
import { showToast } from "./toolbar.js";

type PendingElementKey = string;

/**
 * Identity-based key using component name, file path, lineHint, and tag.
 *
 * lineHint is the approximate line number from fiber resolution — it can
 * drift after HMR rewrites the file. This is acceptable because:
 * 1. The key only needs to be stable within one HMR cycle.
 * 2. We clear all pending changes on each successful apply (which triggers HMR).
 * 3. Between applies, no file writes happen, so line numbers don't change.
 */
function makeElementKey(change: ApplyChange): PendingElementKey {
  return `${change.componentName}:${change.filePath}:${change.lineHint}:${change.tag}`;
}

const APPLY_TIMEOUT_MS = 30_000;

const pending = new Map<PendingElementKey, ApplyChange>();
let applying = false;
let applyTimeoutId: ReturnType<typeof setTimeout> | null = null;
let onCountChange: ((count: number) => void) | null = null;

export function setOnCountChange(cb: (count: number) => void): void {
  onCountChange = cb;
}

export function addToPending(change: ApplyChange): void {
  if (!change.filePath) {
    showToast("Cannot track changes — source file not resolved", "warning");
    return;
  }
  const key = makeElementKey(change);

  // Merge property updates on same element
  const existing = pending.get(key);
  if (existing && existing.type === "property" && change.type === "property") {
    for (const update of change.updates) {
      const idx = existing.updates.findIndex((u) => u.cssProperty === update.cssProperty);
      if (idx >= 0) {
        existing.updates[idx] = update;
      } else {
        existing.updates.push(update);
      }
    }
  } else {
    pending.set(key, change);
  }

  onCountChange?.(pending.size);
}

export function pendingCount(): number {
  return pending.size;
}

export function isApplying(): boolean {
  return applying;
}

export function getAllPending(): ApplyChange[] {
  return [...pending.values()];
}

export function clearAll(): void {
  pending.clear();
  onCountChange?.(0);
}

// Track element refs + inline style overrides for revert on discard.
const pendingOverrides = new Map<PendingElementKey, {
  element: HTMLElement;
  overrides: Map<string, string>;
}>();

/** Store the preview overrides for later revert on discard. */
export function trackOverrides(
  change: ApplyChange,
  element: HTMLElement,
  overrides: Map<string, string>,
): void {
  const key = makeElementKey(change);
  pendingOverrides.set(key, { element, overrides: new Map(overrides) });
}

/**
 * Discard all pending changes and revert inline CSS previews.
 */
export function discardAll(): void {
  for (const [, { element, overrides }] of pendingOverrides) {
    for (const [cssProperty, originalValue] of overrides) {
      (element.style as any)[cssProperty] = originalValue;
    }
  }
  pendingOverrides.clear();
  clearAll();
  showToast("Discarded all pending changes", "info");
}

export function confirmAll(): void {
  if (pending.size === 0 || applying) return;
  applying = true;
  onCountChange?.(pending.size);

  send({ type: "applyAllChanges", changes: getAllPending() });

  applyTimeoutId = setTimeout(() => {
    if (applying) {
      applying = false;
      onCountChange?.(pending.size);
      showToast("Apply timed out — changes still pending, try again", "error");
    }
  }, APPLY_TIMEOUT_MS);
}

// Listen for result
onApplyAllComplete((msg) => {
  applying = false;
  if (applyTimeoutId) {
    clearTimeout(applyTimeoutId);
    applyTimeoutId = null;
  }
  if (msg.success) {
    pendingOverrides.clear();
    clearAll();
    showToast(`Applied ${msg.appliedCount} change${msg.appliedCount === 1 ? "" : "s"}`, "success");
  } else if (msg.appliedCount > 0) {
    pendingOverrides.clear();
    showToast(`Applied ${msg.appliedCount}, failed ${msg.failedCount}`, "warning");
    clearAll();
  } else {
    showToast(msg.error || "Failed to apply changes", "error");
  }
  onCountChange?.(pending.size);
});

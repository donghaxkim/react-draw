import type { ChangeEntry, ElementIdentity } from "@frameup/shared";
import { send } from "./bridge.js";

// --- State ---

const entries = new Map<string, ChangeEntry>();
let panelOpen = false;

// --- Listener pattern (matches canvas-state.ts) ---

type ChangelogListener = () => void;
let changelogListeners: ChangelogListener[] = [];

export function onChangelogChange(fn: ChangelogListener): () => void {
  changelogListeners.push(fn);
  return () => {
    changelogListeners = changelogListeners.filter((f) => f !== fn);
  };
}

function notifyChangelogChange(): void {
  changelogListeners.forEach((fn) => fn());
}

// --- Coalesce window ---

const COALESCE_WINDOW_MS = 3000;

function findCoalesceTarget(
  elementIdentity: ElementIdentity,
  propertyKey: string,
): ChangeEntry | null {
  // Walk entries in reverse insertion order
  const allEntries = Array.from(entries.values());
  for (let i = allEntries.length - 1; i >= 0; i--) {
    const entry = allEntries[i];
    if (
      entry.type === "property" &&
      entry.state === "active" &&
      entry.propertyKey === propertyKey &&
      entry.elementIdentity &&
      entry.elementIdentity.filePath === elementIdentity.filePath &&
      entry.elementIdentity.lineNumber === elementIdentity.lineNumber &&
      entry.elementIdentity.columnNumber === elementIdentity.columnNumber &&
      Date.now() - entry.timestamp < COALESCE_WINDOW_MS
    ) {
      return entry;
    }
    break; // Only check the most recent entry
  }
  return null;
}

// --- Public API ---

export function addChangeEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
): string {
  const id = crypto.randomUUID();
  const fullEntry: ChangeEntry = {
    ...entry,
    id,
    timestamp: Date.now(),
  };
  entries.set(id, fullEntry);
  notifyChangelogChange();
  return id;
}

export function addOrCoalescePropertyEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
  elementIdentity: ElementIdentity,
  propertyKey: string,
  undoId: string,
): string {
  const target = findCoalesceTarget(elementIdentity, propertyKey);
  if (target) {
    target.timestamp = Date.now();
    target.summary = entry.summary;
    if (target.revertData.type === "cliUndo") {
      target.revertData.undoIds.push(undoId);
    }
    notifyChangelogChange();
    return target.id;
  }
  return addChangeEntry(entry);
}

export function updateChangeEntry(
  id: string,
  updates: Partial<ChangeEntry>,
): void {
  const entry = entries.get(id);
  if (!entry) return;
  Object.assign(entry, updates);
  notifyChangelogChange();
}

export function revertEntry(id: string): void {
  const entry = entries.get(id);
  if (!entry || entry.state === "reverted") return;

  switch (entry.revertData.type) {
    case "cliUndo":
    case "generateUndo":
      send({ type: "revertChanges", undoIds: entry.revertData.undoIds });
      break;

    case "moveRemove": {
      const { moveId } = entry.revertData;
      import("./canvas-state.js").then(({ removeMove }) => {
        removeMove(moveId);
      });
      break;
    }

    case "annotationRemove": {
      const { annotationId, originalInnerHTML } = entry.revertData;
      // TODO: canvas-state.ts does not export findElementByIdentity.
      // Restoring innerHTML on the live DOM element is not currently possible
      // without a DOM query by identity. The annotation is removed from state;
      // visual restoration of innerHTML is deferred until findElementByIdentity
      // (or equivalent) is available.
      import("./canvas-state.js").then(({ removeAnnotation }) => {
        removeAnnotation(annotationId);
        // If findElementByIdentity is added to canvas-state.ts in the future:
        // const el = findElementByIdentity(entry.revertData.elementIdentity);
        // if (el) el.innerHTML = originalInnerHTML;
        void originalInnerHTML; // suppress unused variable warning
      });
      break;
    }
  }

  entry.state = "reverted";
  notifyChangelogChange();
}

export function getEntries(): ChangeEntry[] {
  return Array.from(entries.values());
}

export function getChangeCount(): number {
  return entries.size;
}

export function getActiveCount(): number {
  let count = 0;
  for (const entry of entries.values()) {
    if (entry.state !== "reverted") count++;
  }
  return count;
}

export function isChangelogOpen(): boolean {
  return panelOpen;
}

export function setChangelogOpen(open: boolean): void {
  panelOpen = open;
  notifyChangelogChange();
}

export function clearChangelog(): void {
  entries.clear();
  notifyChangelogChange();
}

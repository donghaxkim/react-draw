// packages/overlay/src/utils/component-filter.ts

/**
 * Shared internal-component skip list for React fiber traversal.
 * Used by selection.ts and resolve-helper.ts to filter out framework internals.
 * Single source of truth — update this file when adding framework support.
 */
const INTERNAL_NAMES = new Set([
  // Next.js internals
  "InnerLayoutRouter", "OuterLayoutRouter", "RedirectErrorBoundary",
  "RedirectBoundary", "HTTPAccessFallbackErrorBoundary", "HTTPAccessFallbackBoundary",
  "LoadingBoundary", "ErrorBoundary", "ScrollAndFocusHandler", "InnerScrollAndFocusHandler",
  "RenderFromTemplateContext", "DevRootHTTPAccessFallbackBoundary",
  "AppDevOverlayErrorBoundary", "AppDevOverlay", "HotReload", "Router",
  "ErrorBoundaryHandler", "AppRouter", "ServerRoot", "SegmentStateProvider",
  "RootErrorBoundary",
  // React internals
  "Suspense", "Fragment", "StrictMode",
  // Next.js RSC internals
  "ReplaySsrOnlyErrors", "SegmentViewNode", "SegmentTrieNode",
]);

export function isInternalName(name: string): boolean {
  if (INTERNAL_NAMES.has(name)) return true;
  if (name.startsWith("_") || name.startsWith("$")) return true;
  if (name.includes("Provider") || name.includes("Context")) return true;
  if (name === "Head" || name === "html" || name === "body") return true;
  return false;
}

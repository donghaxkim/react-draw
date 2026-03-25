/**
 * Check if a Tailwind class matches a given prefix.
 * Handles standalone classes (flex, hidden, relative), prefixed classes
 * (bg-red-500), and skips variant-prefixed classes (hover:bg-blue-700).
 *
 * Duplicated from transform.ts — kept in sync manually.
 */
export function classMatchesPrefix(cls: string, prefix: string): boolean {
  // Skip variant-prefixed classes (e.g. hover:bg-blue-700, dark:bg-gray-900)
  if (cls.includes(":")) return false;
  // Exact match for standalone classes like "rounded"
  if (cls === prefix) return true;
  // prefix- followed by something
  return cls.startsWith(`${prefix}-`);
}

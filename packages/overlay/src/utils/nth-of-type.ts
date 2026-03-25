/** Count how many preceding siblings share the same tagName (1-indexed). */
export function computeNthOfType(el: HTMLElement): number {
  const parent = el.parentElement;
  if (!parent) return 1;
  let nth = 1;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === el) break;
    if (parent.children[i].tagName === el.tagName) nth++;
  }
  return nth;
}

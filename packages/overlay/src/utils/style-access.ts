/**
 * Set a CSS property value on an element's inline style.
 * Handles both camelCase JS properties and kebab-case CSS properties.
 */
export function setStyle(el: HTMLElement, prop: string, value: string): void {
  el.style.setProperty(camelToKebab(prop), value);
}

/**
 * Get the current inline style value for a property.
 */
export function getStyle(el: HTMLElement, prop: string): string {
  return el.style.getPropertyValue(camelToKebab(prop));
}

/**
 * Remove an inline style property (set to empty).
 */
export function clearStyle(el: HTMLElement, prop: string): void {
  el.style.removeProperty(camelToKebab(prop));
}

function camelToKebab(s: string): string {
  if (s.includes("-")) return s;
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

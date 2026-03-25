// packages/overlay/src/config.ts
// Centralized config — no window globals.

let _hasApiKey = false;

/** Called once when the CLI sends its config message on WebSocket connect. */
export function setHasApiKey(value: boolean): void {
  _hasApiKey = value;
}

/** Whether the CLI has an ANTHROPIC_API_KEY configured. */
export function hasApiKey(): boolean {
  return _hasApiKey;
}

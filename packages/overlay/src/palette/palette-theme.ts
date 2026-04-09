/**
 * Reads shadcn CSS custom properties from the user's page at runtime.
 * These are defined in globals.css and available on :root.
 * Values are HSL strings like "210 40% 96%" — we convert to usable CSS.
 */

export interface ShadcnTheme {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
}

/** Default dark theme (shadcn zinc) — fallback when CSS vars aren't available */
const DEFAULTS: ShadcnTheme = {
  background: "240 10% 3.9%",
  foreground: "0 0% 98%",
  card: "240 10% 3.9%",
  cardForeground: "0 0% 98%",
  popover: "240 10% 3.9%",
  popoverForeground: "0 0% 98%",
  primary: "0 0% 98%",
  primaryForeground: "240 5.9% 10%",
  secondary: "240 3.7% 15.9%",
  secondaryForeground: "0 0% 98%",
  muted: "240 3.7% 15.9%",
  mutedForeground: "240 5% 64.9%",
  accent: "240 3.7% 15.9%",
  accentForeground: "0 0% 98%",
  destructive: "0 62.8% 30.6%",
  destructiveForeground: "0 0% 98%",
  border: "240 3.7% 15.9%",
  input: "240 3.7% 15.9%",
  ring: "240 4.9% 83.9%",
  radius: "0.5rem",
};

let cachedTheme: ShadcnTheme | null = null;

function readVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Read the shadcn theme from CSS custom properties on :root */
export function getTheme(): ShadcnTheme {
  if (cachedTheme) return cachedTheme;

  const t: ShadcnTheme = { ...DEFAULTS };

  // Try reading each CSS variable
  const vars: Array<[keyof ShadcnTheme, string]> = [
    ["background", "--background"],
    ["foreground", "--foreground"],
    ["card", "--card"],
    ["cardForeground", "--card-foreground"],
    ["popover", "--popover"],
    ["popoverForeground", "--popover-foreground"],
    ["primary", "--primary"],
    ["primaryForeground", "--primary-foreground"],
    ["secondary", "--secondary"],
    ["secondaryForeground", "--secondary-foreground"],
    ["muted", "--muted"],
    ["mutedForeground", "--muted-foreground"],
    ["accent", "--accent"],
    ["accentForeground", "--accent-foreground"],
    ["destructive", "--destructive"],
    ["destructiveForeground", "--destructive-foreground"],
    ["border", "--border"],
    ["input", "--input"],
    ["ring", "--ring"],
    ["radius", "--radius"],
  ];

  for (const [key, varName] of vars) {
    const val = readVar(varName);
    if (val) t[key] = val;
  }

  cachedTheme = t;
  return t;
}

/** Convert an HSL value string "210 40% 96%" to a CSS hsl() color */
export function hsl(value: string): string {
  // If it already looks like a full CSS color, return as-is
  if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl(")) {
    return value;
  }
  // shadcn format: "210 40% 96%" → "hsl(210 40% 96%)"
  return `hsl(${value})`;
}

/** Invalidate cache (call when theme might have changed, e.g. dark mode toggle) */
export function invalidateThemeCache(): void {
  cachedTheme = null;
}

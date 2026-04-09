import type { RegistryItem } from "@react-rewrite/shared";
import { addPaletteInsert, generateInsertId, type PaletteInsertEntry } from "./palette-state.js";
import { getTheme, hsl } from "./palette-theme.js";

// ---------------------------------------------------------------------------
// JSX strings — what gets written to source code on commit
// ---------------------------------------------------------------------------

const DEFAULT_JSX: Record<string, string> = {
  button: "<Button>Button</Button>",
  card: `<Card>\n        <CardHeader>\n          <CardTitle>Card Title</CardTitle>\n          <CardDescription>Card Description</CardDescription>\n        </CardHeader>\n        <CardContent>\n          <p>Card Content</p>\n        </CardContent>\n      </Card>`,
  input: '<Input placeholder="Type here..." />',
  badge: "<Badge>Badge</Badge>",
  label: "<Label>Label</Label>",
  textarea: '<Textarea placeholder="Type your message here." />',
  checkbox: "<Checkbox />",
  switch: "<Switch />",
  separator: "<Separator />",
  skeleton: '<Skeleton className="h-4 w-[250px]" />',
  avatar: '<Avatar>\n        <AvatarImage src="" alt="Avatar" />\n        <AvatarFallback>CN</AvatarFallback>\n      </Avatar>',
  progress: "<Progress value={33} />",
  slider: "<Slider defaultValue={[50]} max={100} step={1} />",
  select: `<Select>\n        <SelectTrigger>\n          <SelectValue placeholder="Select..." />\n        </SelectTrigger>\n        <SelectContent>\n          <SelectItem value="a">Option A</SelectItem>\n          <SelectItem value="b">Option B</SelectItem>\n        </SelectContent>\n      </Select>`,
  alert: `<Alert>\n        <AlertTitle>Alert Title</AlertTitle>\n        <AlertDescription>Alert description text.</AlertDescription>\n      </Alert>`,
  table: `<Table>\n        <TableHeader>\n          <TableRow>\n            <TableHead>Name</TableHead>\n            <TableHead>Status</TableHead>\n          </TableRow>\n        </TableHeader>\n        <TableBody>\n          <TableRow>\n            <TableCell>Item 1</TableCell>\n            <TableCell>Active</TableCell>\n          </TableRow>\n        </TableBody>\n      </Table>`,
  tabs: `<Tabs defaultValue="tab1">\n        <TabsList>\n          <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n          <TabsTrigger value="tab2">Tab 2</TabsTrigger>\n        </TabsList>\n        <TabsContent value="tab1">Tab 1 content</TabsContent>\n        <TabsContent value="tab2">Tab 2 content</TabsContent>\n      </Tabs>`,
};

const DEFAULT_IMPORTS: Record<string, string[]> = {
  button: ["Button"],
  card: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent"],
  input: ["Input"],
  badge: ["Badge"],
  label: ["Label"],
  textarea: ["Textarea"],
  checkbox: ["Checkbox"],
  switch: ["Switch"],
  separator: ["Separator"],
  skeleton: ["Skeleton"],
  avatar: ["Avatar", "AvatarImage", "AvatarFallback"],
  progress: ["Progress"],
  slider: ["Slider"],
  select: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem"],
  alert: ["Alert", "AlertTitle", "AlertDescription"],
  table: ["Table", "TableHeader", "TableRow", "TableHead", "TableBody", "TableCell"],
  tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
};

// ---------------------------------------------------------------------------
// Preview builders — use inline styles from the user's actual CSS theme
//
// We read CSS custom properties (--primary, --background, etc.) that shadcn
// defines on :root. This gives us the user's exact colors/radius/etc.
// No dependency on Tailwind JIT generating classes at build time.
// ---------------------------------------------------------------------------

type VariantProps = Record<string, string>;

function createPreviewElement(name: string, variantProps?: VariantProps): HTMLElement {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  const builder = PREVIEW_BUILDERS[key];
  if (builder) return builder(variantProps ?? {});
  return fallbackPreview(name);
}

function fallbackPreview(name: string): HTMLElement {
  const t = getTheme();
  const el = document.createElement("div");
  el.style.cssText = `padding:16px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.card)};color:${hsl(t.cardForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;`;
  el.textContent = name;
  return el;
}

const PREVIEW_BUILDERS: Record<string, (v: VariantProps) => HTMLElement> = {

  button: (v) => {
    const t = getTheme();
    const btn = document.createElement("button");
    const variant = v.variant ?? "default";
    let bg: string, fg: string, border = "none";
    switch (variant) {
      case "destructive": bg = hsl(t.destructive); fg = hsl(t.destructiveForeground); break;
      case "outline": bg = "transparent"; fg = hsl(t.foreground); border = `1px solid ${hsl(t.input)}`; break;
      case "secondary": bg = hsl(t.secondary); fg = hsl(t.secondaryForeground); break;
      case "ghost": bg = "transparent"; fg = hsl(t.foreground); break;
      case "link": bg = "transparent"; fg = hsl(t.primary); break;
      default: bg = hsl(t.primary); fg = hsl(t.primaryForeground); break;
    }
    btn.style.cssText = `display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;height:36px;padding:0 16px;border-radius:${t.radius};cursor:pointer;border:${border};background:${bg};color:${fg};${variant === "link" ? "text-decoration:underline;text-underline-offset:4px;height:auto;padding:0;" : "box-shadow:0 1px 2px rgba(0,0,0,0.05);"}`;
    btn.textContent = "Button";
    return btn;
  },

  input: () => {
    const t = getTheme();
    const input = document.createElement("input");
    input.placeholder = "Type here...";
    input.style.cssText = `width:100%;max-width:320px;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;outline:none;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05);`;
    return input;
  },

  textarea: () => {
    const t = getTheme();
    const ta = document.createElement("textarea");
    ta.placeholder = "Type your message here.";
    ta.rows = 3;
    ta.style.cssText = `width:100%;max-width:320px;padding:8px 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;outline:none;resize:vertical;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05);`;
    return ta;
  },

  card: () => {
    const t = getTheme();
    const card = document.createElement("div");
    card.style.cssText = `max-width:350px;border-radius:calc(${t.radius} * 2);border:1px solid ${hsl(t.border)};background:${hsl(t.card)};color:${hsl(t.cardForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;`;
    card.innerHTML = `
      <div style="padding:24px 24px 0">
        <div style="font-size:18px;font-weight:600;line-height:1.2;color:${hsl(t.cardForeground)}">Card Title</div>
        <div style="font-size:14px;color:${hsl(t.mutedForeground)};margin-top:4px">Card Description</div>
      </div>
      <div style="padding:24px">
        <p style="font-size:14px;color:${hsl(t.cardForeground)};margin:0">Card Content</p>
      </div>
    `;
    return card;
  },

  badge: (v) => {
    const t = getTheme();
    const badge = document.createElement("span");
    const variant = v.variant ?? "default";
    let bg: string, fg: string, border = "1px solid transparent";
    switch (variant) {
      case "secondary": bg = hsl(t.secondary); fg = hsl(t.secondaryForeground); break;
      case "outline": bg = "transparent"; fg = hsl(t.foreground); border = `1px solid ${hsl(t.border)}`; break;
      case "destructive": bg = hsl(t.destructive); fg = hsl(t.destructiveForeground); break;
      default: bg = hsl(t.primary); fg = hsl(t.primaryForeground); break;
    }
    badge.style.cssText = `display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:12px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.4;background:${bg};color:${fg};border:${border};`;
    badge.textContent = "Badge";
    return badge;
  },

  label: () => {
    const t = getTheme();
    const label = document.createElement("label");
    label.style.cssText = `font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${hsl(t.foreground)};`;
    label.textContent = "Label";
    return label;
  },

  checkbox: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="width:16px;height:16px;border-radius:3px;background:${hsl(t.primary)};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.primaryForeground)}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Accept terms</span>
    `;
    return wrap;
  },

  switch: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="width:44px;height:24px;border-radius:12px;background:${hsl(t.primary)};padding:2px;box-sizing:border-box;cursor:pointer">
        <div style="width:20px;height:20px;border-radius:10px;background:${hsl(t.background)};transform:translateX(20px)"></div>
      </div>
      <span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Enabled</span>
    `;
    return wrap;
  },

  select: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:200px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
        <span style="font-size:14px;color:${hsl(t.mutedForeground)}">Select...</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    `;
    return wrap;
  },

  separator: () => {
    const t = getTheme();
    const sep = document.createElement("div");
    sep.style.cssText = `width:100%;max-width:320px;height:1px;background:${hsl(t.border)};margin:4px 0;`;
    return sep;
  },

  avatar: () => {
    const t = getTheme();
    const wrap = document.createElement("span");
    wrap.style.cssText = `display:inline-flex;width:40px;height:40px;border-radius:50%;background:${hsl(t.muted)};align-items:center;justify-content:center;overflow:hidden;`;
    wrap.innerHTML = `<span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">CN</span>`;
    return wrap;
  },

  skeleton: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:8px;max-width:250px;";
    const barStyle = `height:16px;border-radius:${t.radius};background:${hsl(t.muted)};`;
    wrap.innerHTML = `
      <div style="${barStyle}width:100%"></div>
      <div style="${barStyle}width:80%"></div>
    `;
    return wrap;
  },

  progress: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;height:8px;border-radius:9999px;background:${hsl(t.primary)}20;overflow:hidden;`;
    wrap.innerHTML = `<div style="height:100%;width:33%;border-radius:9999px;background:${hsl(t.primary)}"></div>`;
    return wrap;
  },

  slider: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;padding:8px 0;position:relative;height:20px;display:flex;align-items:center;`;
    wrap.innerHTML = `
      <div style="height:6px;width:100%;border-radius:9999px;background:${hsl(t.primary)}20;position:relative">
        <div style="height:100%;width:50%;border-radius:9999px;background:${hsl(t.primary)}"></div>
      </div>
      <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:${hsl(t.background)};border:2px solid ${hsl(t.primary)};box-shadow:0 1px 3px rgba(0,0,0,0.2);cursor:pointer"></div>
    `;
    return wrap;
  },

  alert: (v) => {
    const t = getTheme();
    const variant = v.variant ?? "default";
    const isDestructive = variant === "destructive";
    const borderColor = isDestructive ? hsl(t.destructive) + "80" : hsl(t.border);
    const textColor = isDestructive ? hsl(t.destructive) : hsl(t.foreground);
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;padding:16px;border-radius:${t.radius};border:1px solid ${borderColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;gap:12px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${textColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <div>
          <div style="font-size:14px;font-weight:500;color:${textColor};margin-bottom:4px">Alert Title</div>
          <div style="font-size:14px;color:${hsl(t.mutedForeground)}">Alert description text.</div>
        </div>
      </div>
    `;
    return wrap;
  },

  tabs: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:inline-flex;background:${hsl(t.muted)};border-radius:${t.radius};padding:4px;gap:2px">
        <div style="padding:4px 12px;border-radius:calc(${t.radius} - 2px);background:${hsl(t.background)};font-size:14px;font-weight:500;color:${hsl(t.foreground)};cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.05)">Tab 1</div>
        <div style="padding:4px 12px;border-radius:calc(${t.radius} - 2px);font-size:14px;color:${hsl(t.mutedForeground)};cursor:pointer">Tab 2</div>
      </div>
      <div style="padding:16px 0;font-size:14px;color:${hsl(t.foreground)}">Tab 1 content</div>
    `;
    return wrap;
  },

  table: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border:1px solid ${hsl(t.border)};border-radius:${t.radius};overflow:hidden;`;
    const th = `padding:8px 16px;font-size:14px;text-align:left;font-weight:500;color:${hsl(t.mutedForeground)};`;
    const td = `padding:8px 16px;font-size:14px;text-align:left;color:${hsl(t.foreground)};`;
    wrap.innerHTML = `
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="border-bottom:1px solid ${hsl(t.border)}"><th style="${th}">Name</th><th style="${th}">Status</th></tr></thead>
        <tbody>
          <tr style="border-bottom:1px solid ${hsl(t.border)}"><td style="${td}">Item 1</td><td style="${td}">Active</td></tr>
          <tr><td style="${td}">Item 2</td><td style="${td}">Pending</td></tr>
        </tbody>
      </table>
    `;
    return wrap;
  },

  dialog: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:420px;padding:24px;border-radius:calc(${t.radius} * 2);border:1px solid ${hsl(t.border)};background:${hsl(t.background)};color:${hsl(t.foreground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 8px 30px rgba(0,0,0,0.2);`;
    wrap.innerHTML = `
      <div style="font-size:18px;font-weight:600;margin-bottom:4px">Dialog Title</div>
      <div style="font-size:14px;color:${hsl(t.mutedForeground)};margin-bottom:20px">Dialog description goes here.</div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:inherit;cursor:pointer">Cancel</button>
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:none;background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};font-size:14px;font-weight:500;font-family:inherit;cursor:pointer">Continue</button>
      </div>
    `;
    return wrap;
  },

  accordion: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const row = `display:flex;justify-content:space-between;align-items:center;padding:16px 0;cursor:pointer;border-bottom:1px solid ${hsl(t.border)};`;
    wrap.innerHTML = `
      <div style="${row}"><span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Is it accessible?</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
      <div style="${row}"><span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Is it styled?</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
    `;
    return wrap;
  },

  dropdown: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:200px;padding:4px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.popover)};color:${hsl(t.popoverForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    const item = `padding:6px 8px;border-radius:calc(${t.radius} - 2px);font-size:14px;cursor:pointer;`;
    wrap.innerHTML = `
      <div style="${item}color:${hsl(t.foreground)}">Profile</div>
      <div style="${item}background:${hsl(t.accent)};color:${hsl(t.accentForeground)}">Settings</div>
      <div style="${item}color:${hsl(t.foreground)}">Billing</div>
      <div style="height:1px;background:${hsl(t.border)};margin:4px 0"></div>
      <div style="${item}color:${hsl(t.destructive)}">Log out</div>
    `;
    return wrap;
  },
};

// ---------------------------------------------------------------------------
// Variant prop application for JSX strings
// ---------------------------------------------------------------------------

function applyVariantProps(jsxString: string, componentName: string, props: Record<string, string>): string {
  const propsStr = Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(" ");
  if (!propsStr) return jsxString;
  const selfClosingRe = new RegExp(`(<${componentName})(\\s*/>)`);
  if (selfClosingRe.test(jsxString)) return jsxString.replace(selfClosingRe, `$1 ${propsStr}$2`);
  const openTagRe = new RegExp(`(<${componentName})(>)`);
  return jsxString.replace(openTagRe, `$1 ${propsStr}$2`);
}

// ---------------------------------------------------------------------------
// Check if element is a palette insert
// ---------------------------------------------------------------------------

export function isPaletteInsert(el: HTMLElement): boolean {
  return !!el.closest("[data-react-rewrite-palette-insert]");
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function stageComponentInsertion(
  item: RegistryItem,
  targetElement: HTMLElement,
  position: "inside" | "before" | "after",
  targetInfo: { filePath: string; line: number; col: number },
  variant?: { name: string; props: Record<string, string> },
): PaletteInsertEntry {
  const id = generateInsertId();
  const componentName = item.displayName.replace(/\s+/g, "");

  // Create preview using inline styles from the user's actual CSS theme
  const element = createPreviewElement(item.name, variant?.props);
  element.setAttribute("data-react-rewrite-palette-insert", "true");
  element.setAttribute("data-palette-component", componentName);

  // Insert into DOM
  if (position === "inside") {
    targetElement.appendChild(element);
  } else if (position === "before") {
    targetElement.parentNode!.insertBefore(element, targetElement);
  } else {
    targetElement.parentNode!.insertBefore(element, targetElement.nextSibling);
  }

  // Build JSX string for source code
  const registryKey = item.name.toLowerCase();
  let jsxString = DEFAULT_JSX[registryKey] ?? `<${componentName} />`;
  if (variant && Object.keys(variant.props).length > 0) {
    jsxString = applyVariantProps(jsxString, componentName, variant.props);
  }

  const importNames = DEFAULT_IMPORTS[registryKey] ?? [componentName];
  const importPath = `@/components/ui/${item.name.toLowerCase()}`;

  const entry: PaletteInsertEntry = {
    id,
    componentName,
    registryName: item.name,
    element,
    targetElement,
    position,
    targetFilePath: targetInfo.filePath,
    targetLine: targetInfo.line,
    targetCol: targetInfo.col,
    importPath,
    importNames,
    jsxString,
    props: variant?.props ?? {},
    stagedClassChanges: [],
    fidelityTier: 1,
  };

  addPaletteInsert(entry);
  return entry;
}

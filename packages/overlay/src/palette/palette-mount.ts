import type { RegistryItem } from "@react-rewrite/shared";
import { addPaletteInsert, generateInsertId, type PaletteInsertEntry } from "./palette-state.js";

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
// HTML previews using Tailwind classes from the user's page
//
// The user's page already has Tailwind CSS loaded. shadcn components are just
// HTML elements with Tailwind classes. By using the exact same classes, the
// preview looks identical to the final rendered component.
// ---------------------------------------------------------------------------

type VariantProps = Record<string, string>;

/**
 * Creates an HTML preview of a shadcn component using Tailwind classes.
 * Since the user's page already has Tailwind CSS loaded, these classes
 * render correctly and look exactly like the real component.
 */
function createPreviewElement(name: string, variantProps?: VariantProps): HTMLElement {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  const builder = PREVIEW_BUILDERS[key];
  if (builder) return builder(variantProps ?? {});
  // Generic fallback
  const el = document.createElement("div");
  el.className = "rounded-lg border bg-card text-card-foreground shadow-sm p-6";
  el.innerHTML = `<p class="text-sm text-muted-foreground">${name}</p>`;
  return el;
}

const PREVIEW_BUILDERS: Record<string, (v: VariantProps) => HTMLElement> = {

  button: (v) => {
    const btn = document.createElement("button");
    const variant = v.variant ?? "default";
    const base = "inline-flex items-center justify-content gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
    const variants: Record<string, string> = {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };
    btn.className = `${base} ${variants[variant] ?? variants.default}`;
    btn.textContent = "Button";
    return btn;
  },

  input: () => {
    const input = document.createElement("input");
    input.className = "flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
    input.placeholder = "Type here...";
    return input;
  },

  textarea: () => {
    const ta = document.createElement("textarea");
    ta.className = "flex min-h-[60px] w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
    ta.placeholder = "Type your message here.";
    ta.rows = 3;
    return ta;
  },

  card: () => {
    const card = document.createElement("div");
    card.className = "rounded-xl border bg-card text-card-foreground shadow max-w-sm";
    card.innerHTML = `
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="font-semibold leading-none tracking-tight">Card Title</h3>
        <p class="text-sm text-muted-foreground">Card Description</p>
      </div>
      <div class="p-6 pt-0">
        <p class="text-sm">Card Content</p>
      </div>
    `;
    return card;
  },

  badge: (v) => {
    const badge = document.createElement("span");
    const variant = v.variant ?? "default";
    const base = "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variants: Record<string, string> = {
      default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "text-foreground",
      destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    };
    badge.className = `${base} ${variants[variant] ?? variants.default}`;
    badge.textContent = "Badge";
    return badge;
  },

  label: () => {
    const label = document.createElement("label");
    label.className = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
    label.textContent = "Label";
    return label;
  },

  checkbox: () => {
    const wrap = document.createElement("div");
    wrap.className = "flex items-center space-x-2";
    wrap.innerHTML = `
      <button role="checkbox" class="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" data-state="checked">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <label class="text-sm font-medium leading-none">Accept terms</label>
    `;
    return wrap;
  },

  switch: () => {
    const wrap = document.createElement("div");
    wrap.className = "flex items-center space-x-2";
    wrap.innerHTML = `
      <button role="switch" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary" data-state="checked">
        <span class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform translate-x-4"></span>
      </button>
      <label class="text-sm font-medium leading-none">Enabled</label>
    `;
    return wrap;
  },

  separator: () => {
    const sep = document.createElement("div");
    sep.className = "shrink-0 bg-border h-[1px] w-full my-2";
    return sep;
  },

  avatar: () => {
    const wrap = document.createElement("span");
    wrap.className = "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full";
    wrap.innerHTML = `<span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium">CN</span>`;
    return wrap;
  },

  skeleton: () => {
    const wrap = document.createElement("div");
    wrap.className = "flex flex-col gap-2 max-w-[250px]";
    wrap.innerHTML = `
      <div class="h-4 w-full animate-pulse rounded-md bg-primary/10"></div>
      <div class="h-4 w-4/5 animate-pulse rounded-md bg-primary/10"></div>
    `;
    return wrap;
  },

  progress: () => {
    const wrap = document.createElement("div");
    wrap.className = "relative h-2 w-full max-w-sm overflow-hidden rounded-full bg-primary/20";
    wrap.innerHTML = `<div class="h-full w-1/3 flex-1 bg-primary transition-all rounded-full"></div>`;
    return wrap;
  },

  slider: () => {
    const wrap = document.createElement("div");
    wrap.className = "relative flex w-full max-w-sm touch-none select-none items-center py-2";
    wrap.innerHTML = `
      <div class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <div class="absolute h-full bg-primary rounded-full" style="width:50%"></div>
      </div>
      <div class="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" style="position:absolute;left:50%;transform:translateX(-50%)"></div>
    `;
    return wrap;
  },

  select: () => {
    const wrap = document.createElement("div");
    wrap.className = "max-w-[200px]";
    wrap.innerHTML = `
      <button class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <span class="text-muted-foreground">Select...</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><path d="m6 9 6 6 6-6"/></svg>
      </button>
    `;
    return wrap;
  },

  alert: (v) => {
    const variant = v.variant ?? "default";
    const wrap = document.createElement("div");
    const variantClass = variant === "destructive"
      ? "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      : "text-foreground [&>svg]:text-foreground";
    wrap.className = `relative w-full max-w-md rounded-lg border px-4 py-3 text-sm ${variantClass}`;
    wrap.innerHTML = `
      <h5 class="mb-1 font-medium leading-none tracking-tight">Alert Title</h5>
      <div class="text-sm [&_p]:leading-relaxed">Alert description text.</div>
    `;
    return wrap;
  },

  tabs: () => {
    const wrap = document.createElement("div");
    wrap.className = "max-w-md";
    wrap.innerHTML = `
      <div class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-background text-foreground shadow">Tab 1</button>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all">Tab 2</button>
      </div>
      <div class="mt-2 text-sm">Tab 1 content</div>
    `;
    return wrap;
  },

  table: () => {
    const wrap = document.createElement("div");
    wrap.className = "relative w-full max-w-md overflow-auto rounded-lg border";
    wrap.innerHTML = `
      <table class="w-full caption-bottom text-sm">
        <thead class="[&_tr]:border-b">
          <tr class="border-b transition-colors hover:bg-muted/50">
            <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody class="[&_tr:last-child]:border-0">
          <tr class="border-b transition-colors hover:bg-muted/50"><td class="p-4 align-middle">Item 1</td><td class="p-4 align-middle">Active</td></tr>
          <tr class="border-b transition-colors hover:bg-muted/50"><td class="p-4 align-middle">Item 2</td><td class="p-4 align-middle">Pending</td></tr>
        </tbody>
      </table>
    `;
    return wrap;
  },

  dialog: () => {
    const wrap = document.createElement("div");
    wrap.className = "mx-auto w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg";
    wrap.innerHTML = `
      <div class="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
        <h2 class="text-lg font-semibold leading-none tracking-tight">Dialog Title</h2>
        <p class="text-sm text-muted-foreground">Dialog description goes here.</p>
      </div>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</button>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Continue</button>
      </div>
    `;
    return wrap;
  },

  accordion: () => {
    const wrap = document.createElement("div");
    wrap.className = "w-full max-w-md divide-y";
    wrap.innerHTML = `
      <div class="border-b">
        <div class="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline cursor-pointer">
          Is it accessible?
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted-foreground transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
      <div class="border-b">
        <div class="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline cursor-pointer">
          Is it styled?
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted-foreground transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    `;
    return wrap;
  },
};

// ---------------------------------------------------------------------------
// Variant prop application for JSX strings
// ---------------------------------------------------------------------------

function applyVariantProps(jsxString: string, componentName: string, props: Record<string, string>): string {
  const propsStr = Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
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

  // Create a preview using Tailwind classes (already loaded on the page)
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

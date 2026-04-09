import type { RegistryItem, RegistryItemFull, RegistryProvider, ProjectConfig, WrittenFile } from "@react-rewrite/shared";

const BASE_URL = "https://ui.shadcn.com/r/styles/new-york";

export const SHADCN_COMPONENT_NAMES = [
  "accordion", "alert", "alert-dialog", "aspect-ratio", "avatar",
  "badge", "breadcrumb", "button", "calendar", "card",
  "carousel", "chart", "checkbox", "collapsible", "combobox",
  "command", "context-menu", "data-table", "date-picker", "dialog",
  "drawer", "dropdown-menu", "form", "hover-card", "input",
  "input-otp", "label", "menubar", "navigation-menu", "pagination",
  "popover", "progress", "radio-group", "resizable", "scroll-area",
  "select", "separator", "sheet", "skeleton", "slider",
  "sonner", "switch", "table", "tabs", "textarea",
  "toast", "toggle", "toggle-group", "tooltip",
] as const;

export const SHADCN_BLOCK_NAMES = [
  "login-01", "login-02", "login-03", "login-04", "login-05",
  "signup-01", "signup-02", "signup-03", "signup-04", "signup-05",
  "sidebar-01", "sidebar-02", "sidebar-03", "sidebar-04",
  "sidebar-05", "sidebar-06", "sidebar-07", "sidebar-08",
  "sidebar-09", "sidebar-10", "sidebar-11", "sidebar-12",
  "sidebar-13", "sidebar-14", "sidebar-15", "sidebar-16",
  "dashboard-01",
] as const;

const COMPONENT_CATEGORIES: Record<string, string> = {
  accordion: "Display", alert: "Feedback", "alert-dialog": "Feedback",
  "aspect-ratio": "Layout", avatar: "Display", badge: "Display",
  breadcrumb: "Navigation", button: "Inputs", calendar: "Inputs",
  card: "Display", carousel: "Display", chart: "Data",
  checkbox: "Inputs", collapsible: "Layout", combobox: "Inputs",
  command: "Inputs", "context-menu": "Navigation", "data-table": "Data",
  "date-picker": "Inputs", dialog: "Feedback", drawer: "Feedback",
  "dropdown-menu": "Navigation", form: "Inputs", "hover-card": "Display",
  input: "Inputs", "input-otp": "Inputs", label: "Inputs",
  menubar: "Navigation", "navigation-menu": "Navigation",
  pagination: "Navigation", popover: "Display", progress: "Feedback",
  "radio-group": "Inputs", resizable: "Layout", "scroll-area": "Layout",
  select: "Inputs", separator: "Layout", sheet: "Feedback",
  skeleton: "Feedback", slider: "Inputs", sonner: "Feedback",
  switch: "Inputs", table: "Data", tabs: "Navigation",
  textarea: "Inputs", toast: "Feedback", toggle: "Inputs",
  "toggle-group": "Inputs", tooltip: "Display",
};

const BLOCK_CATEGORIES: Record<string, string> = {};
for (const name of SHADCN_BLOCK_NAMES) {
  if (name.startsWith("login-")) BLOCK_CATEGORIES[name] = "Authentication";
  else if (name.startsWith("signup-")) BLOCK_CATEGORIES[name] = "Authentication";
  else if (name.startsWith("sidebar-")) BLOCK_CATEGORIES[name] = "Sidebar";
  else if (name.startsWith("dashboard-")) BLOCK_CATEGORIES[name] = "Dashboard";
}

function toDisplayName(name: string): string {
  return name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export class ShadcnProvider implements RegistryProvider {
  name = "shadcn";

  async fetchIndex(): Promise<RegistryItem[]> {
    const components: RegistryItem[] = SHADCN_COMPONENT_NAMES.map((name) => ({
      name, displayName: toDisplayName(name), description: "",
      category: COMPONENT_CATEGORIES[name] ?? "Other",
      type: "component" as const, dependencies: [], registryDependencies: [],
    }));
    const blocks: RegistryItem[] = SHADCN_BLOCK_NAMES.map((name) => ({
      name, displayName: toDisplayName(name), description: "",
      category: BLOCK_CATEGORIES[name] ?? "Other",
      type: "block" as const, dependencies: [], registryDependencies: [],
    }));
    return [...components, ...blocks];
  }

  async fetchItem(name: string): Promise<RegistryItemFull> {
    const res = await fetch(`${BASE_URL}/${name}.json`);
    if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status} ${res.statusText}`);
    const data = await res.json();
    const type: "component" | "block" = data.type === "registry:block" ? "block" : "component";
    const category = type === "component" ? COMPONENT_CATEGORIES[name] ?? "Other" : BLOCK_CATEGORIES[name] ?? "Other";
    return {
      name: data.name, displayName: toDisplayName(data.name),
      description: data.description ?? "", category, type,
      dependencies: data.dependencies ?? [], registryDependencies: data.registryDependencies ?? [],
      files: (data.files ?? []).map((f: any) => ({ path: f.path, content: f.content, type: f.type })),
    };
  }

  async fetchAll(onProgress?: (fetched: number, total: number) => void): Promise<RegistryItemFull[]> {
    const allNames = [
      ...SHADCN_COMPONENT_NAMES.map((n) => ({ name: n, type: "component" as const })),
      ...SHADCN_BLOCK_NAMES.map((n) => ({ name: n, type: "block" as const })),
    ];
    const total = allNames.length;
    let fetched = 0;
    const results = await Promise.allSettled(
      allNames.map(async ({ name }) => {
        const item = await this.fetchItem(name);
        fetched++;
        onProgress?.(fetched, total);
        return item;
      }),
    );
    return results
      .filter((r): r is PromiseFulfilledResult<RegistryItemFull> => r.status === "fulfilled")
      .map((r) => r.value);
  }

  async writeToProject(): Promise<WrittenFile[]> {
    throw new Error("Use component-writer.ts directly");
  }

  async detectExisting(): Promise<string[]> {
    throw new Error("Use component-writer.ts directly");
  }
}

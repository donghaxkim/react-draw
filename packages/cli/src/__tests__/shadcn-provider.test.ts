import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShadcnProvider, SHADCN_COMPONENT_NAMES, SHADCN_BLOCK_NAMES } from "../registry/shadcn-provider.js";

describe("SHADCN_COMPONENT_NAMES", () => {
  it("contains expected components", () => {
    expect(SHADCN_COMPONENT_NAMES).toContain("button");
    expect(SHADCN_COMPONENT_NAMES).toContain("accordion");
    expect(SHADCN_COMPONENT_NAMES).toContain("dialog");
    expect(SHADCN_COMPONENT_NAMES).toContain("tooltip");
  });

  it("has correct count", () => {
    expect(SHADCN_COMPONENT_NAMES.length).toBe(49);
  });
});

describe("SHADCN_BLOCK_NAMES", () => {
  it("contains expected blocks", () => {
    expect(SHADCN_BLOCK_NAMES).toContain("login-01");
    expect(SHADCN_BLOCK_NAMES).toContain("sidebar-01");
    expect(SHADCN_BLOCK_NAMES).toContain("dashboard-01");
  });

  it("has correct count", () => {
    expect(SHADCN_BLOCK_NAMES.length).toBe(27);
  });
});

describe("ShadcnProvider", () => {
  let provider: ShadcnProvider;

  beforeEach(() => {
    provider = new ShadcnProvider();
    vi.unstubAllGlobals();
  });

  describe("fetchIndex", () => {
    it("returns all components and blocks", async () => {
      const items = await provider.fetchIndex();
      const components = items.filter((i) => i.type === "component");
      const blocks = items.filter((i) => i.type === "block");
      expect(components.length).toBe(SHADCN_COMPONENT_NAMES.length);
      expect(blocks.length).toBe(SHADCN_BLOCK_NAMES.length);
      expect(items.length).toBe(SHADCN_COMPONENT_NAMES.length + SHADCN_BLOCK_NAMES.length);
    });

    it("sets displayName correctly", async () => {
      const items = await provider.fetchIndex();
      const button = items.find((i) => i.name === "button");
      expect(button?.displayName).toBe("Button");
      const alertDialog = items.find((i) => i.name === "alert-dialog");
      expect(alertDialog?.displayName).toBe("Alert Dialog");
    });

    it("assigns correct categories for components", async () => {
      const items = await provider.fetchIndex();
      const button = items.find((i) => i.name === "button");
      expect(button?.category).toBe("Inputs");
      const card = items.find((i) => i.name === "card");
      expect(card?.category).toBe("Display");
    });

    it("assigns correct categories for blocks", async () => {
      const items = await provider.fetchIndex();
      const login = items.find((i) => i.name === "login-01");
      expect(login?.category).toBe("Authentication");
      const sidebar = items.find((i) => i.name === "sidebar-01");
      expect(sidebar?.category).toBe("Sidebar");
      const dashboard = items.find((i) => i.name === "dashboard-01");
      expect(dashboard?.category).toBe("Dashboard");
    });
  });

  describe("fetchItem", () => {
    it("parses a mock API response correctly", async () => {
      const mockResponse = {
        name: "button",
        description: "A button component.",
        type: "registry:ui",
        dependencies: ["@radix-ui/react-slot"],
        registryDependencies: [],
        files: [
          { path: "components/ui/button.tsx", content: "export function Button() {}", type: "registry:ui" },
        ],
      };

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });
      vi.stubGlobal("fetch", mockFetch);

      const item = await provider.fetchItem("button");

      expect(item.name).toBe("button");
      expect(item.displayName).toBe("Button");
      expect(item.description).toBe("A button component.");
      expect(item.type).toBe("component");
      expect(item.category).toBe("Inputs");
      expect(item.dependencies).toEqual(["@radix-ui/react-slot"]);
      expect(item.registryDependencies).toEqual([]);
      expect(item.files).toHaveLength(1);
      expect(item.files[0].path).toBe("components/ui/button.tsx");
      expect(item.files[0].content).toBe("export function Button() {}");
      expect(item.files[0].type).toBe("registry:ui");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://ui.shadcn.com/r/styles/new-york/button.json",
      );
    });

    it("parses a block type correctly", async () => {
      const mockResponse = {
        name: "login-01",
        description: "A login block.",
        type: "registry:block",
        dependencies: [],
        registryDependencies: ["button", "input"],
        files: [
          { path: "blocks/login-01.tsx", content: "export function Login01() {}", type: "registry:block" },
        ],
      };

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });
      vi.stubGlobal("fetch", mockFetch);

      const item = await provider.fetchItem("login-01");

      expect(item.type).toBe("block");
      expect(item.category).toBe("Authentication");
      expect(item.registryDependencies).toEqual(["button", "input"]);
    });

    it("throws on API error (404)", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });
      vi.stubGlobal("fetch", mockFetch);

      await expect(provider.fetchItem("nonexistent")).rejects.toThrow(
        "Failed to fetch nonexistent: 404 Not Found",
      );
    });

    it("throws on API error (500)", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });
      vi.stubGlobal("fetch", mockFetch);

      await expect(provider.fetchItem("button")).rejects.toThrow(
        "Failed to fetch button: 500 Internal Server Error",
      );
    });
  });

  describe("writeToProject", () => {
    it("throws with instructional message", async () => {
      await expect(provider.writeToProject({} as any, {} as any)).rejects.toThrow(
        "Use component-writer.ts directly",
      );
    });
  });

  describe("detectExisting", () => {
    it("throws with instructional message", async () => {
      await expect(provider.detectExisting({} as any)).rejects.toThrow(
        "Use component-writer.ts directly",
      );
    });
  });
});

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("tailwind-theme.css build output", () => {
  const cssPath = path.join(packageRoot, "dist/css/tailwind-theme.css");
  const css = readFileSync(cssPath, "utf8");

  it("emits @theme blocks for shared and inline colour tokens", () => {
    expect(css).toContain("@theme {");
    expect(css).toContain("@theme inline {");
  });

  it("includes shared spacing and motion tokens", () => {
    expect(css).toContain("--spacing-4: 1rem;");
    expect(css).toContain("--transition-duration-normal: 200ms;");
  });

  it("bridges palette and semantic colours to runtime CSS variables", () => {
    expect(css).toMatch(/--color-navy-500:\s*rgb\(var\(--color-navy-500\)\)/);
    expect(css).toMatch(/--color-surface-primary:\s*rgb\(var\(--color-surface-primary\)\)/);
    expect(css).toMatch(/--color-surface:\s*rgb\(var\(--color-surface-default\)\)/);
    expect(css).toMatch(/--color-border:\s*rgb\(var\(--color-border-default\)\)/);
    expect(css).toMatch(/--color-focus-ring:\s*rgb\(var\(--color-focus-ring\)\)/);
    expect(css).toMatch(/--color-link:\s*rgb\(var\(--color-link-default\)\)/);
  });

  it("uses rgb(var(...)) refs so Tailwind opacity modifiers work on semantic colours", () => {
    const inlineBlock = css.slice(css.indexOf("@theme inline {"));
    const semanticRefs = [...inlineBlock.matchAll(/--color-([\w-]+):\s*rgb\(var\(--color-[\w-]+\)\)/g)];
    expect(semanticRefs.length).toBeGreaterThan(10);
    for (const [, name] of semanticRefs) {
      expect(name).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

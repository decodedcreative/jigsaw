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
    expect(css).toContain("--color-navy-500: rgb(var(--color-navy-500));");
    expect(css).toContain("--color-surface-primary: rgb(var(--color-surface-primary));");
    expect(css).toContain("--color-surface: rgb(var(--color-surface-default));");
    expect(css).toContain("--color-border: rgb(var(--color-border-default));");
    expect(css).toContain("--color-link: rgb(var(--color-link-default));");
  });
});

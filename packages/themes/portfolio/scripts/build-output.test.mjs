import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distCss = path.join(packageRoot, "dist/css");

test("base.css matches legacy portfolio palette output", () => {
  const base = readFileSync(path.join(distCss, "base.css"), "utf8");

  assert.match(base, /\[data-theme='portfolio'\]/);
  assert.match(base, /--color-navy-900: 10 17 32;/);
  assert.match(base, /--color-navy-500: 61 81 102;/);
  assert.match(base, /--color-orange-600: 255 107 53;/);
  assert.match(base, /--color-orange-500: 255 140 95;/);
  assert.doesNotMatch(base, /#[0-9a-f]{3,8}/i);
});

test("semantic.css uses the portfolio selector and semantic values from the former @jigsaw/tokens build", () => {
  const semantic = readFileSync(path.join(distCss, "semantic.css"), "utf8");

  assert.match(semantic, /\[data-theme='portfolio'\]/);
  assert.match(semantic, /--color-surface-primary: 26 35 50;/);
  assert.match(semantic, /--color-surface-default: 15 23 41;/);
  assert.match(semantic, /--color-foreground-primary: 240 244 248;/);
  assert.match(semantic, /--color-interactive-primary: 255 107 53;/);
  assert.match(semantic, /--color-brand-primary: 255 107 53;/);
});

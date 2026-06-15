import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distCss = path.join(packageRoot, "dist/css");

test("base.css matches legacy default palette output", () => {
  const base = readFileSync(path.join(distCss, "base.css"), "utf8");

  assert.match(base, /:root \{/);
  assert.match(base, /--color-navy-500: 98 125 152;/);
  assert.match(base, /--color-navy-900: 16 42 67;/);
  assert.match(base, /--color-orange-500: 255 107 26;/);
  assert.match(base, /--color-orange-400: 255 138 76;/);
  assert.match(base, /--color-white: 255 255 255;/);
  assert.match(base, /--color-black: 0 0 0;/);
  assert.doesNotMatch(base, /#[0-9a-f]{3,8}/i);
});

test("semantic CSS files use the same selectors and mode values as the former @jigsaw/tokens build", () => {
  const light = readFileSync(path.join(distCss, "semantic-light.css"), "utf8");
  const dark = readFileSync(path.join(distCss, "semantic-dark.css"), "utf8");

  assert.match(light, /:root, \[data-theme='light'\]/);
  assert.match(dark, /\[data-theme='dark'\], \.dark/);
  assert.match(light, /--color-surface-primary: 255 255 255;/);
  assert.match(light, /--color-foreground-primary: 16 42 67;/);
  assert.match(dark, /--color-surface-primary: 10 25 41;/);
  assert.match(dark, /--color-foreground-primary: 250 250 250;/);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("tailwind.css exports dist content paths for consumers", () => {
  const tailwindCss = readFileSync(path.join(packageRoot, "tailwind.css"), "utf8");

  assert.match(tailwindCss, /@source "\.\/dist\/\*\*\/\*\.\{js,mjs\}"/);
});

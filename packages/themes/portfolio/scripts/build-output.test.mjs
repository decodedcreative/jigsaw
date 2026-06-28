import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { toRgbTuple } from "@jigsaw-ds/theme-build";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distCss = path.join(packageRoot, "dist/css");
const srcRoot = path.join(packageRoot, "src");

/** @param {Record<string, unknown>} node @param {string[]} tokenPath */
const collectColorTokens = (node, tokenPath = []) => {
  if (
    node &&
    typeof node === "object" &&
    "value" in node &&
    "type" in node &&
    node.type === "color"
  ) {
    return [{ path: tokenPath, value: node.value }];
  }

  return Object.entries(node ?? {}).flatMap(([key, child]) =>
    collectColorTokens(child, [...tokenPath, key]),
  );
};

/** @param {string[]} tokenPath @param {boolean} stripFirstSegment */
const cssVarName = (tokenPath, stripFirstSegment) => {
  const segments = stripFirstSegment ? tokenPath.slice(1) : tokenPath;
  return `--${segments.join("-")}`;
};

/** @param {unknown} rawValue */
const expectedCssValue = (rawValue) => {
  if (rawValue === "transparent") return "rgba(0, 0, 0, 0)";
  return toRgbTuple(String(rawValue));
};

/** @param {string} css */
const parseCssVariables = (css) => {
  /** @type {Map<string, string>} */
  const vars = new Map();
  for (const match of css.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    vars.set(match[1], match[2].trim());
  }
  return vars;
};

/** @param {string} cssFile @param {string} jsonFile @param {object} options */
const assertCssMatchesSourceTokens = (cssFile, jsonFile, options) => {
  const css = readFileSync(path.join(distCss, cssFile), "utf8");
  const json = JSON.parse(readFileSync(path.join(srcRoot, jsonFile), "utf8"));
  const tokens = collectColorTokens(json);
  const vars = parseCssVariables(css);

  assert.equal(
    vars.size,
    tokens.length,
    `${cssFile} should declare every colour token from ${jsonFile}`,
  );

  for (const token of tokens) {
    const name = cssVarName(token.path, options.stripFirstSegment);
    assert.ok(vars.has(name), `${cssFile} is missing ${name}`);
    assert.equal(
      vars.get(name),
      expectedCssValue(token.value),
      `${name} in ${cssFile}`,
    );
  }

  return css;
};

test("base.css exports the full portfolio palette under [data-theme='portfolio']", () => {
  const base = assertCssMatchesSourceTokens("base.css", "base/colors.json", {
    stripFirstSegment: false,
  });

  assert.match(base, /\[data-theme='portfolio'\]/);
  assert.doesNotMatch(base, /#[0-9a-f]{3,8}/i);
});

test("semantic.css exports every portfolio semantic token from source JSON", () => {
  const semantic = assertCssMatchesSourceTokens(
    "semantic.css",
    "semantic/colors.json",
    { stripFirstSegment: true },
  );

  assert.match(semantic, /\[data-theme='portfolio'\]/);
  assert.doesNotMatch(semantic, /#[0-9a-f]{3,8}/i);
});

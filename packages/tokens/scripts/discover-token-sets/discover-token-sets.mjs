import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Theme discovery for Style Dictionary export pipelines.
 *
 * Source layout:
 *   src/tokens/shared/               → shared.tokens.json, shared/base.css
 *   src/tokens/themes/{id}/base/     → palette tokens (unprefixed paths)
 *   src/tokens/themes/{id}/semantic/ → semantic tokens; mode = JSON root key
 *
 * Semantic modes are the top-level keys in semantic/*.json (e.g. light, dark, portfolio).
 *
 * Export rules (CSS and Figma follow the same split):
 *   1. Multiple modes, or a single appearance mode (light/dark)
 *      → semantic-{mode}.css, {id}-{mode}.tokens.json (stripFirstSegment)
 *   2. Single mode matching theme id (e.g. portfolio/portfolio)
 *      → semantic.css + {id}.tokens.json merging base + semantic (stripModePrefixes)
 *   3. Single mode that is neither appearance nor theme id (unusual)
 *      → semantic.css + {id}-semantic.tokens.json (stripFirstSegment)
 *
 * CSS selectors: default uses :root / .dark; named themes use [data-theme='{id}'].
 *
 * Tokens Studio $themes.json and $metadata.json generated after SD build (see figma/discovery/).
 */

const packageRoot = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const tokensRoot = path.join(packageRoot, "src/tokens");
const themesRoot = path.join(tokensRoot, "themes");

/** Appearance modes split into separate outputs (e.g. default light/dark). */
const APPEARANCE_MODES = new Set(["light", "dark"]);

/**
 * @param {string} themeId
 * @returns {string[]} Top-level token path prefixes in semantic JSON (e.g. light, dark, portfolio).
 */
export const discoverSemanticModes = (themeId) => {
  const semanticDir = path.join(themesRoot, themeId, "semantic");
  if (!fs.existsSync(semanticDir)) return [];

  const prefixes = new Set();
  for (const file of fs.readdirSync(semanticDir)) {
    if (!file.endsWith(".json")) continue;
    const json = JSON.parse(fs.readFileSync(path.join(semanticDir, file), "utf8"));
    for (const key of Object.keys(json)) prefixes.add(key);
  }

  return [...prefixes].sort();
};

/** @returns {string[]} Theme ids under src/tokens/themes/. */
export const discoverThemes = () => {
  if (!fs.existsSync(themesRoot)) return [];
  return fs
    .readdirSync(themesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
};

export const themeHasBase = (themeId) =>
  fs.existsSync(path.join(themesRoot, themeId, "base"));

/**
 * Multiple semantic outputs (semantic-light.css, default-light.tokens.json, …).
 * True for light/dark appearance modes; false when a single theme-scoped prefix matches theme id.
 */
export const splitSemanticByMode = (themeId, modes) => {
  if (modes.length === 0) return false;
  if (modes.length > 1) return true;
  return APPEARANCE_MODES.has(modes[0]);
};

/** Single Figma file combining base + semantic (portfolio.tokens.json). */
export const mergeFigmaBaseAndSemantic = (themeId, modes) =>
  modes.length === 1 && modes[0] === themeId;

/**
 * Single semantic prefix that is neither light/dark nor the theme id (rule 3 above).
 * CSS → semantic.css; Figma → {id}-semantic.tokens.json.
 */
export const isStandaloneSemantic = (themeId, modes) =>
  modes.length === 1 &&
  !APPEARANCE_MODES.has(modes[0]) &&
  modes[0] !== themeId;

export const baseCssSelector = (themeId) =>
  themeId === "default" ? ":root" : `[data-theme='${themeId}']`;

export const semanticCssSelector = (themeId, mode) => {
  if (themeId === "default") {
    if (mode === "light") return ":root, [data-theme='light']";
    if (mode === "dark") return "[data-theme='dark'], .dark";
  }
  return `[data-theme='${themeId}']`;
};

export const themeSourceGlob = (themeId) => `src/tokens/themes/${themeId}/**/*.json`;

export const themeBaseSourceGlob = (themeId) =>
  `src/tokens/themes/${themeId}/base/**/*.json`;

export const themeSemanticSourceGlob = (themeId) =>
  `src/tokens/themes/${themeId}/semantic/**/*.json`;

export const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

/** light before dark; remaining modes alphabetical */
export const sortAppearanceModes = (modes) =>
  [...modes].sort((a, b) => {
    if (a === "light" && b === "dark") return -1;
    if (a === "dark" && b === "light") return 1;
    return a.localeCompare(b);
  });

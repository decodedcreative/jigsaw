import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tokensRoot = path.join(packageRoot, "src/tokens");
const themesRoot = path.join(tokensRoot, "themes");

/** Appearance modes split into separate outputs (e.g. default light/dark). */
const APPEARANCE_MODES = new Set(["light", "dark"]);

/**
 * @param {string} themeId
 * @returns {string[]} Top-level token path prefixes in semantic JSON (e.g. light, dark, portfolio).
 */
export function discoverSemanticModes(themeId) {
  const semanticDir = path.join(themesRoot, themeId, "semantic");
  if (!fs.existsSync(semanticDir)) return [];

  const prefixes = new Set();
  for (const file of fs.readdirSync(semanticDir)) {
    if (!file.endsWith(".json")) continue;
    const json = JSON.parse(fs.readFileSync(path.join(semanticDir, file), "utf8"));
    for (const key of Object.keys(json)) prefixes.add(key);
  }

  return [...prefixes].sort();
}

/** @returns {string[]} Theme ids under src/tokens/themes/. */
export function discoverThemes() {
  if (!fs.existsSync(themesRoot)) return [];
  return fs
    .readdirSync(themesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function themeHasBase(themeId) {
  return fs.existsSync(path.join(themesRoot, themeId, "base"));
}

/**
 * Multiple semantic outputs (semantic-light.css, default-light.tokens.json, …).
 * True for light/dark appearance modes; false when a single theme-scoped prefix matches theme id.
 */
export function splitSemanticByMode(themeId, modes) {
  if (modes.length === 0) return false;
  if (modes.length > 1) return true;
  return APPEARANCE_MODES.has(modes[0]);
}

/** Single Figma file combining base + semantic (portfolio.tokens.json). */
export function mergeFigmaBaseAndSemantic(themeId, modes) {
  return modes.length === 1 && modes[0] === themeId;
}

export function baseCssSelector(themeId) {
  return themeId === "default" ? ":root" : `[data-theme='${themeId}']`;
}

export function semanticCssSelector(themeId, mode) {
  if (themeId === "default") {
    if (mode === "light") return ":root, [data-theme='light']";
    if (mode === "dark") return "[data-theme='dark'], .dark";
  }
  return `[data-theme='${themeId}']`;
}

export function themeSourceGlob(themeId) {
  return `src/tokens/themes/${themeId}/**/*.json`;
}

export function themeBaseSourceGlob(themeId) {
  return `src/tokens/themes/${themeId}/base/**/*.json`;
}

export function themeSemanticSourceGlob(themeId) {
  return `src/tokens/themes/${themeId}/semantic/**/*.json`;
}

export function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

import fs from "node:fs";
import path from "node:path";

import {
  discoverSemanticModes,
  sortAppearanceModes,
  themeTokensRoot,
  THEME_DEFAULT_ID,
} from "../discover-token-sets/index.mjs";
import { isPlainObject, readJsonFile } from "./index.mjs";

const isColorToken = (node) =>
  isPlainObject(node) && typeof node.value === "string" && node.type === "color";

/**
 * Walk a Tokens Studio semantic colour tree and emit CSS variable suffixes.
 *
 * Each leaf `color` token becomes one suffix by joining ancestor keys with `-`
 * (e.g. `{ surface: { primary: { value, type: "color" } } }` → `surface-primary`).
 * Non-colour branches are recursed; invalid nodes are skipped.
 *
 * @param {unknown} node
 * @param {string[]} prefix
 * @returns {string[]}
 */
export const collectColorSuffixes = (node, prefix = []) => {
  if (!isPlainObject(node)) return [];
  if (isColorToken(node)) return prefix.length > 0 ? [prefix.join("-")] : [];

  const suffixes = [];
  for (const [key, child] of Object.entries(node)) {
    suffixes.push(...collectColorSuffixes(child, [...prefix, key]));
  }
  return suffixes;
};

/**
 * Tailwind DEFAULT aliases for groups with a `default` leaf (bg-surface, border-border, …).
 * @param {unknown} colorTree
 * @returns {Record<string, string>}
 */
export const collectSemanticColorAliases = (colorTree) => {
  const aliases = {};
  if (!isPlainObject(colorTree)) return aliases;

  for (const [group, children] of Object.entries(colorTree)) {
    if (!isPlainObject(children) || isColorToken(children)) continue;
    if (isColorToken(children.default)) {
      aliases[group] = `${group}-default`;
    }
  }

  return aliases;
};

/**
 * @param {string} themeId
 * @returns {{ semanticColorVars: string[], semanticColorAliases: Record<string, string> }}
 */
export const discoverSemanticColorVars = (themeId = THEME_DEFAULT_ID) => {
  const semanticDir = path.join(themeTokensRoot(themeId), "semantic");
  const modes = sortAppearanceModes(discoverSemanticModes(themeId));

  if (!fs.existsSync(semanticDir) || modes.length === 0) {
    return { semanticColorVars: [], semanticColorAliases: {} };
  }

  const suffixesByMode = new Map();
  let colorTreeForAliases = null;

  for (const file of fs.readdirSync(semanticDir).filter((name) => name.endsWith(".json"))) {
    const { data, error } = readJsonFile(path.join(semanticDir, file));
    if (error) throw new Error(`Failed to read ${file}: ${error}`);

    for (const mode of modes) {
      const color = data?.[mode]?.color;
      if (!isPlainObject(color)) continue;

      if (!colorTreeForAliases) colorTreeForAliases = color;

      const suffixes = collectColorSuffixes(color).sort();
      suffixesByMode.set(mode, suffixes);
    }
  }

  if (suffixesByMode.size === 0) {
    return { semanticColorVars: [], semanticColorAliases: {} };
  }

  const modeEntries = [...suffixesByMode.entries()];
  const [referenceMode, reference] = modeEntries[0];
  for (let i = 1; i < modeEntries.length; i++) {
    const [mode, current] = modeEntries[i];
    if (reference.join("\0") !== current.join("\0")) {
      const onlyInReference = reference.filter((suffix) => !current.includes(suffix));
      const onlyInMode = current.filter((suffix) => !reference.includes(suffix));
      throw new Error(
        `Semantic colour paths differ between modes for theme "${themeId}" (${referenceMode} vs ${mode}). ` +
          `Only in ${referenceMode}: ${onlyInReference.join(", ") || "none"}. ` +
          `Only in ${mode}: ${onlyInMode.join(", ") || "none"}.`,
      );
    }
  }

  return {
    semanticColorVars: reference,
    semanticColorAliases: collectSemanticColorAliases(colorTreeForAliases),
  };
};

import { existsSync } from "node:fs";
import path from "node:path";
import StyleDictionary from "style-dictionary";

/**
 * @param {import("style-dictionary").Config | import("style-dictionary").Config[]} config
 * @param {{
 *   packageRoot?: string,
 *   expectedOutputs?: string[],
 *   successMessage?: string,
 * }} [options]
 */
export const buildStyleDictionary = async (config, options = {}) => {
  const configs = Array.isArray(config) ? config : [config];

  for (const entry of configs) {
    const dictionary = new StyleDictionary(entry);
    await dictionary.buildAllPlatforms();
  }

  const { packageRoot, expectedOutputs, successMessage } = options;
  if (!expectedOutputs?.length || !packageRoot) return;

  const missing = expectedOutputs.filter(
    (relativePath) => !existsSync(path.join(packageRoot, relativePath)),
  );

  if (missing.length > 0) {
    console.error("Style Dictionary build missing outputs:");
    for (const file of missing) console.error(`  - ${file}`);
    process.exit(1);
  }

  if (successMessage) {
    console.log(successMessage);
  }
};

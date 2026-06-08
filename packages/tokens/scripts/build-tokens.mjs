import path from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";
import config from "../sd.config.mjs";
import { FIGMA_OUTPUT_DIR, writeFigmaMetadata } from "./figma/index.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const configs = Array.isArray(config) ? config : [config];

for (const entry of configs) {
  const dictionary = new StyleDictionary(entry);
  await dictionary.buildAllPlatforms();
}

writeFigmaMetadata(path.join(packageRoot, FIGMA_OUTPUT_DIR));

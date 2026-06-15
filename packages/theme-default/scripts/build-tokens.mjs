import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";
import config from "../sd.config.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const expectedOutputs = [
  "dist/css/base.css",
  "dist/css/semantic-light.css",
  "dist/css/semantic-dark.css",
];

const dictionary = new StyleDictionary(config);
await dictionary.buildAllPlatforms();

const missing = expectedOutputs.filter(
  (relativePath) => !existsSync(path.join(packageRoot, relativePath)),
);

if (missing.length > 0) {
  console.error("theme-default build missing outputs:");
  for (const file of missing) console.error(`  - ${file}`);
  process.exit(1);
}

console.log(`Built ${expectedOutputs.length} CSS files in dist/css/`);

import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildStyleDictionary } from "@jigsaw-ds/theme-build";
import config from "../sd.config.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

await buildStyleDictionary(config, {
  packageRoot,
  expectedOutputs: ["dist/css/base.css", "dist/css/semantic.css"],
  successMessage: "Built 2 CSS files in dist/css/",
});

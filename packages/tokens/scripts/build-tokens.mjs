import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildStyleDictionary } from "@jigsaw-ds/theme-build";
import config from "../sd.config.mjs";
import { FIGMA_OUTPUT_DIR, writeFigmaMetadata } from "./figma/index.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

await buildStyleDictionary(config);
writeFigmaMetadata(path.join(packageRoot, FIGMA_OUTPUT_DIR));

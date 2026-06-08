import path from "node:path";
import { fileURLToPath } from "node:url";
import { FIGMA_OUTPUT_DIR, verifyFigmaExports } from "./index.mjs";

const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const figmaDir = path.join(packageRoot, FIGMA_OUTPUT_DIR);
const result = verifyFigmaExports(figmaDir);

if (!result.ok) {
  for (const message of result.errors) console.error(message);
  process.exit(1);
}

console.log(
  `Verified ${result.fileCount} Figma token files in ${FIGMA_OUTPUT_DIR}/ (${result.tokenCount} tokens)`,
);

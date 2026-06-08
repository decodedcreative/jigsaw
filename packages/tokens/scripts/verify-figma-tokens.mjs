import path from "node:path";
import { fileURLToPath } from "node:url";
import { verifyFigmaExports } from "./index.mjs";

const figmaDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../dist/figma");
const result = verifyFigmaExports(figmaDir);

if (!result.ok) {
  for (const message of result.errors) console.error(message);
  process.exit(1);
}

console.log(
  `Verified ${result.fileCount} Figma token files in dist/figma/ (${result.tokenCount} tokens)`,
);

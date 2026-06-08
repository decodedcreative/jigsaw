import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FIGMA_OUTPUT_DIR } from "./index.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const figmaPath = `${FIGMA_OUTPUT_DIR}/`;

const runGit = (args) =>
  execSync(["git", ...args].join(" "), { cwd: packageRoot, encoding: "utf8" }).trim();

const status = runGit(["status", "--porcelain", "--", figmaPath]);

if (status) {
  console.error(`Committed ${figmaPath} exports are out of sync with build output.\n`);
  console.error(status);
  try {
    const diff = runGit(["diff", "--", figmaPath]);
    if (diff) console.error(`\n${diff}`);
  } catch {
    // no diff output
  }
  console.error(`\nRun: npm run build:tokens -w @jigsaw/tokens — then commit ${figmaPath}`);
  process.exit(1);
}

console.log(`Committed ${figmaPath} exports match build output`);

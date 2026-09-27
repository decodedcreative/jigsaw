import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnNodeScript, watchBuild } from "@jigsaw-ds/theme-build";
import { discoverFigmaThemes, themeTokensRoot } from "./discover-token-sets/index.mjs";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const scriptPath = path.join(packageRoot, "scripts/build-tokens.mjs");

const { rebuild, stop } = watchBuild({
  label: "@jigsaw-ds/tokens",
  dirs: [
    path.join(packageRoot, "src/tokens"),
    ...discoverFigmaThemes().map((themeId) => themeTokensRoot(themeId)),
  ],
  run: () => spawnNodeScript(scriptPath, packageRoot),
});

await rebuild();

const tsup = spawn("tsup", ["--watch"], { cwd: packageRoot, stdio: "inherit" });

const shutdown = () => {
  stop();
  tsup.kill("SIGTERM");
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

tsup.on("error", (error) => {
  console.error("[@jigsaw-ds/tokens] failed to start tsup");
  console.error(error);
  stop();
  process.exit(1);
});

tsup.on("exit", (code) => {
  stop();
  process.exit(code ?? 0);
});

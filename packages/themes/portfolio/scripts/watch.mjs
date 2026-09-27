import path from "node:path";
import { fileURLToPath } from "node:url";
import { watchNodeScript } from "@jigsaw-ds/theme-build";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

await watchNodeScript({
  label: "@jigsaw-ds/theme-portfolio",
  cwd: packageRoot,
  scriptPath: path.join(packageRoot, "scripts/build-tokens.mjs"),
  dirs: [path.join(packageRoot, "src")],
});

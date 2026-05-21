import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/semantic-colors.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // keep dist/css/ and dist/theme.mjs from Style Dictionary
});

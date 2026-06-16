import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/css-color.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // keep dist/css/ from Style Dictionary
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Published bundle is a single entry; Next.js App Router needs this on the
  // entry file so useContext (useGetClassNames → useThemeProvider) is legal.
  banner: {
    js: '"use client";',
  },
  external: ["react", "react-dom", "react-aria-components"],
});

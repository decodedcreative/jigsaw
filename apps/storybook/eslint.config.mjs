import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Build output from `storybook build`.
  { ignores: ["storybook-static/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // PostCSS loads this file with require(), so it uses `module.exports`.
    files: ["postcss.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
);

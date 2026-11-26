import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["storybook-static/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["postcss.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
);

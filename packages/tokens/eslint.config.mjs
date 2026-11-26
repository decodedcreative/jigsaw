import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Runs inside Figma's plugin sandbox, which provides these globals.
    files: ["figma-plugin/**/*.js"],
    languageOptions: {
      globals: { figma: "readonly", __html__: "readonly" },
    },
  },
);
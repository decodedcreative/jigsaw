import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "../types/*",
                "../*/types/*",
                "../../types/*",
                "../../../types/*",
                "./types/*",
                "**/types/*",
              ],
              message: "Use @jsw-types/* path alias for shared types under src/types.",
            },
          ],
        },
      ],
    },
  }
);

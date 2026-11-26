import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15 only ships legacy (.eslintrc-style) configs, so
// FlatCompat translates them for ESLint 9's flat config. When the app moves to
// Next 16, whose eslint-config-next exports flat configs, import those
// directly and remove FlatCompat and the @eslint/eslintrc devDependency.

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  { ignores: [".next/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

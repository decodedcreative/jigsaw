import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree so Next.js doesn't infer a
  // parent directory (e.g. when this checkout is a git worktree nested
  // inside another clone). Prevents duplicate React resolution.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Transpile the workspace package so Next.js compiles its TypeScript/JSX.
  transpilePackages: ["@jigsaw-ds/design-system"],
  // JSW-114 — Phosphor SSR fix (two parts; both required for `next build`):
  //
  // 1) optimizePackageImports: rewrite app-local
  //    `import { XIcon } from "@phosphor-icons/react"` to per-icon modules.
  // 2) webpack conditionNames below: prefer the package "import" (ESM)
  //    condition over "require". Phosphor's "require" targets (including
  //    `./*` and `./ssr`) still point at dist/index.cjs.js; Next's SSR
  //    webpack wrapper leaves that CJS barrel with undefined named exports
  //    (ListIcon, XIcon, …) → "Element type is invalid … got: undefined".
  //    Preferring "import" selects dist/csr/*.es.js (and friends) instead.
  //    Revisit if Phosphor ships a working CJS require map.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  webpack: (config) => {
    const conditions = config.resolve.conditionNames ?? [
      "browser",
      "module",
      "require",
      "default",
    ];
    config.resolve.conditionNames = [
      "import",
      ...conditions.filter((c: string) => c !== "import"),
    ];
    return config;
  },
};

export default nextConfig;

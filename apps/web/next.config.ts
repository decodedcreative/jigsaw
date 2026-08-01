import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree so Next.js doesn't infer a
  // parent directory (e.g. when this checkout is a git worktree nested
  // inside another clone). Prevents duplicate React resolution.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Transpile the workspace package so Next.js compiles its TypeScript/JSX.
  transpilePackages: ["@jigsaw-ds/design-system"],
  // Rewrite app-local Phosphor barrel imports to per-icon entries so the
  // broken root CJS named-export interop never enters the SSR graph (JSW-114).
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  webpack: (config) => {
    // Prefer Phosphor's ESM "import" condition over "require". The package's
    // require targets still point at dist/index.cjs.js, which Next's SSR
    // wrapper leaves with undefined named exports (ListIcon, XIcon, …).
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

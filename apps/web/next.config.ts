import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree so Next.js doesn't infer a
  // parent directory (e.g. when this checkout is a git worktree nested
  // inside another clone). Prevents duplicate React resolution.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@jigsaw/design-system", "@phosphor-icons/react"],
  webpack: (config) => {
    // Force webpack to use the ESM build of phosphor-icons.
    // Without this, webpack resolves the CJS build (index.cjs.js) which
    // uses bare `exports` references that break in browser context because
    // the package has "type":"module" and webpack doesn't wrap it correctly.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@phosphor-icons/react": path.resolve(
        __dirname,
        "../../node_modules/@phosphor-icons/react/dist/index.es.js"
      ),
    };
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree so Next.js doesn't infer a
  // parent directory (e.g. when this checkout is a git worktree nested
  // inside another clone). Prevents duplicate React resolution.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@jigsaw/design-system"],
};

export default nextConfig;

import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/design-system/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook"
  ],
  viteFinal: async (viteConfig) => {
    const repoRoot = path.resolve(__dirname, "../../..");
    const designSystemSrc = path.resolve(repoRoot, "packages", "design-system", "src");
    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve?.alias,
          "@providers/theme": path.resolve(designSystemSrc, "providers", "theme", "index.ts"),
          "@components": path.resolve(designSystemSrc, "components"),
          "@hooks": path.resolve(designSystemSrc, "hooks"),
          "@providers": path.resolve(designSystemSrc, "providers"),
          "@utils": path.resolve(designSystemSrc, "utils"),
        },
      },
      server: {
        ...viteConfig.server,
        fs: {
          ...viteConfig.server?.fs,
          allow: [repoRoot, designSystemSrc, ...(viteConfig.server?.fs?.allow ?? [])],
        },
      },
    };
  },
};

export default config;

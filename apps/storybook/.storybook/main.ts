import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Storybook does not watch generated theme CSS outside the app. Reload when a dev watcher rewrites it. */
const reloadGeneratedThemeCss = (repoRoot: string): Plugin => {
  const cssDirs = [
    "packages/themes/default/dist/css",
    "packages/themes/portfolio/dist/css",
    "packages/tokens/dist/css",
  ].map((dir) => path.resolve(repoRoot, dir));

  return {
    name: "reload-generated-theme-css",
    configureServer(server) {
      for (const dir of cssDirs) server.watcher.add(dir);

      let timer: ReturnType<typeof setTimeout> | undefined;
      const onChange = (changed: string) => {
        const file = path.resolve(changed);
        const generated = cssDirs.some(
          (dir) => file === dir || file.startsWith(`${dir}${path.sep}`),
        );
        if (!generated || !file.endsWith(".css")) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          server.ws.send({ type: "full-reload" });
        }, 80);
      };

      server.watcher.on("change", onChange);
      server.watcher.on("add", onChange);
    },
  };
};

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
      plugins: [...(viteConfig.plugins ?? []), reloadGeneratedThemeCss(repoRoot)],
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

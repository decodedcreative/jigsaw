import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import { applyAppTheme } from "./apply-app-theme.mjs";
import "../style.css";

const withAppTheme: Decorator = (Story, { globals }) => {
  const theme = globals.appTheme as string | undefined;

  useEffect(() => {
    applyAppTheme(document.documentElement, theme);
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    appTheme: {
      name: "Theme",
      description: "Runtime theme switch via data-theme",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Default light" },
          { value: "dark", title: "Default dark" },
          { value: "portfolio", title: "Portfolio" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    appTheme: "light",
  },
  decorators: [withAppTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", ["Welcome"], "Design Tokens", "Design System"],
      },
    },
    docs: {
      codePanel: true,
      canvas: {
        sourceState: "shown",
      },
    },
  },
};

export default preview;

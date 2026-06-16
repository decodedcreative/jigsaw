import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../style.css";

const withAppTheme: Decorator = (Story, { globals }) => {
  const theme = globals.appTheme as string | undefined;

  useEffect(() => {
    const root = document.documentElement;

    if (!theme || theme === "light") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    return () => {
      root.removeAttribute("data-theme");
    };
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    appTheme: {
      name: "Theme",
      description: "Runtime theme switch via data-theme",
      defaultValue: "light",
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

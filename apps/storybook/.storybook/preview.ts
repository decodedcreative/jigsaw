import type { Preview } from "@storybook/react";
import "../style.css";

const preview: Preview = {
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
      // Storybook 10: code snippets on individual story views (bottom panel)
      codePanel: true,
      // Autodocs: keep source blocks expanded under each story preview
      canvas: {
        sourceState: "shown",
      },
    },
  },
};

export default preview;

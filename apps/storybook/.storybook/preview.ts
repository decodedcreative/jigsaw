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
        order: ["Introduction", ["Welcome"], "Design System"],
      },
    },
    docs: {
      source: {
        // Always show the code snippet under each story example
        state: "open",
      },
    },
  },
};

export default preview;

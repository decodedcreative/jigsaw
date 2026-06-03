import type { Preview } from "@storybook/react";
import { ToastRegion } from "@jigsaw/design-system";
import "../style.css";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      // Design System Toast stories mount their own region (incl. position controls).
      if (context.title?.startsWith("Design System/Toast")) {
        return <Story />;
      }
      return (
        <>
          <Story />
          <ToastRegion position="bottom-right" />
        </>
      );
    },
  ],
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

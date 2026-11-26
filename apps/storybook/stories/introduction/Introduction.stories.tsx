import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeContent } from "./components";

const meta = {
  title: "Introduction/Welcome",
  parameters: {
    layout: "fullscreen",
    // Welcome page, not a component example: no "Show code" (JSW-134).
    docs: { disable: true, codePanel: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <WelcomeContent />,
};

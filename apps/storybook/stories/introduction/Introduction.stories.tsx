import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeContent } from "./components";

const meta = {
  title: "Introduction/Welcome",
  parameters: {
    layout: "fullscreen",
    docs: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <WelcomeContent />,
};

import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger } from "./Tooltip";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    showArrow: { control: "boolean" },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placement: "top", showArrow: true },
  render: (args) => (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip {...args}>Helpful info</Tooltip>
    </TooltipTrigger>
  ),
};

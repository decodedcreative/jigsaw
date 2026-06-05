import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { TooltipTrigger } from "./TooltipTrigger";
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
  args: { children: "Helpful info", placement: "top", showArrow: true },
  render: (args) => (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip {...args}>Helpful info</Tooltip>
    </TooltipTrigger>
  ),
};

export const NoArrow: Story = {
  args: { children: "No arrow", placement: "top", showArrow: false },
  render: (args) => (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip {...args}>No arrow</Tooltip>
    </TooltipTrigger>
  ),
};

export const Bottom: Story = {
  args: { children: "Bottom placement", placement: "bottom", showArrow: true },
  render: (args) => (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip {...args}>Bottom placement</Tooltip>
    </TooltipTrigger>
  ),
};

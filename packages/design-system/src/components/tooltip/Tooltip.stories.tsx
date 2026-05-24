import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback } from "../avatar";
import { Button } from "../button/Button";
import { Tooltip, TooltipTrigger } from "./index";

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

export const AvatarTrigger: Story = {
  args: { placement: "top", showArrow: true },
  render: (args) => (
    <TooltipTrigger delay={300}>
      <Button
        variant="ghost"
        mediaOnly
        aria-label="James Howell"
        media={
          <Avatar size="sm">
            <AvatarFallback>JH</AvatarFallback>
          </Avatar>
        }
      />
      <Tooltip {...args}>James Howell</Tooltip>
    </TooltipTrigger>
  ),
};

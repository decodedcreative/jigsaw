import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, waitFor } from "storybook/test";
import { Tooltip } from "./Tooltip";
import { TooltipTrigger } from "./TooltipTrigger";
import { Button } from "../button/Button";
import { clearFocus } from "../../test-utils/story-play";

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
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: "Hover me" });

    await step("Focusing the trigger with the keyboard shows the tooltip", async () => {
      await userEvent.tab();
      await expect(trigger).toHaveFocus();
      await expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful info");
    });

    await step("Escape hides it and keeps focus on the trigger", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
      await expect(trigger).toHaveFocus();
    });

    clearFocus();
  },
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

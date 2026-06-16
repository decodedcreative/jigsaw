import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge variants are unchanged in the public API (`outline` remains the bordered style). Tailwind v4 renamed the *utility* `outline-none` → `outline-hidden` in component styles — not this variant prop.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "accent", "outline", "success", "warning", "error"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Badge" } };
export const Primary: Story = { args: { variant: "primary", children: "Primary" } };
export const Success: Story = { args: { variant: "success", children: "Success" } };
export const Error: Story = { args: { variant: "error", children: "Error" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(["default", "primary", "secondary", "accent", "outline", "success", "warning", "error"] as const).map((v) => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
};

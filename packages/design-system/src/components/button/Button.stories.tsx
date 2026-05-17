import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline button",
  },
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: "Disabled button",
  },
};

/**
 * Visually a link, rendered as a `<button>`. Use for inline actions that
 * trigger behavior (cancel, expand, dismiss) rather than navigation — the
 * inverse of `LinkButton`, which is a `<a>` styled as a button.
 */
export const Link: Story = {
  args: {
    variant: "link",
    children: "Forgot password?",
  },
};

export const LinkInSentence: Story = {
  render: () => (
    <p className="text-sm text-text-secondary">
      Don't have an account yet?{" "}
      <Button variant="link">Sign up for free</Button>.
    </p>
  ),
};

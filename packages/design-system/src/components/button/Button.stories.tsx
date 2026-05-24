import type { Meta, StoryObj } from "@storybook/react";
import { PlayIcon } from "@phosphor-icons/react";
import { Avatar, AvatarFallback } from "../avatar";
import { Icon } from "../icon";
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
    mediaPosition: {
      control: "select",
      options: [undefined, "left", "right"],
    },
    mediaOnly: { control: "boolean" },
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

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline button",
  },
};

export const Sizes: Story = {
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

export const WithMediaLeft: Story = {
  render: () => (
    <Button
      fullWidth
      media={<Icon icon={PlayIcon} weight="fill" />}
      classNameOverrides={{ component: ["max-w-xs"] }}
    >
      Trigger build
    </Button>
  ),
};

export const WithMediaRight: Story = {
  render: () => (
    <Button
      fullWidth
      mediaPosition="right"
      media={<Icon icon={PlayIcon} />}
      classNameOverrides={{ component: ["max-w-xs"] }}
    >
      Next step
    </Button>
  ),
};

/**
 * Visually a link, rendered as a `<button>`. Use for inline actions that
 * trigger behavior (cancel, expand, dismiss) rather than navigation — the
 * inverse of `LinkButton`, which is an `<a>` styled as a button.
 */
export const Link: Story = {
  args: {
    variant: "link",
    children: "Forgot password?",
  },
};

/** Icon-only layout: set `mediaOnly` and provide `aria-label` (or `title`). */
export const MediaOnly: Story = {
  render: () => (
    <Button variant="ghost" mediaOnly aria-label="Settings" media="⚙" />
  ),
};

export const MediaOnlyAvatar: Story = {
  render: () => (
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
  ),
};

export const LinkInSentence: Story = {
  render: () => (
    <p className="text-sm text-foreground-secondary">
      Don't have an account yet?{" "}
      <Button variant="link">Sign up for free</Button>.
    </p>
  ),
};

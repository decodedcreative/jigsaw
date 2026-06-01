import type { Meta, StoryObj } from "@storybook/react";
import {
  GearIcon,
  CloudArrowUpIcon,
  WarningIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Design System/Icon",
  component: Icon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-foreground-primary">
      <Icon icon={GearIcon} size="xs" />
      <Icon icon={GearIcon} size="sm" />
      <Icon icon={GearIcon} size="md" />
      <Icon icon={GearIcon} size="lg" />
      <Icon icon={GearIcon} size="xl" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={GearIcon} tone="primary" />
      <Icon icon={GearIcon} tone="secondary" />
      <Icon icon={GearIcon} tone="accent" />
      <Icon icon={GearIcon} tone="success" />
      <Icon icon={GearIcon} tone="warning" />
      <Icon icon={GearIcon} tone="error" />
      <Icon icon={GearIcon} tone="info" />
      <span className="inline-flex rounded bg-interactive-accent p-1">
        <Icon icon={GearIcon} tone="on-accent" />
      </span>
    </div>
  ),
};

export const Inherit: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <span className="flex items-center gap-2 text-interactive-accent">
        <Icon icon={PlayIcon} size="sm" weight="fill" />
        Inherits accent
      </span>
      <span className="flex items-center gap-2 text-state-error-text">
        <Icon icon={WarningIcon} size="sm" weight="fill" />
        Inherits error
      </span>
    </div>
  ),
};

export const Override: Story = {
  render: () => (
    <Icon
      icon={GearIcon}
      classNameOverrides={{ component: "text-purple-500" }}
    />
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-foreground-primary">
      <Icon icon={PlayIcon} weight="fill" />
      <Icon icon={CloudArrowUpIcon} weight="bold" />
      <Icon icon={WarningIcon} weight="fill" tone="warning" />
    </div>
  ),
};

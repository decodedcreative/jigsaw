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
    </div>
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

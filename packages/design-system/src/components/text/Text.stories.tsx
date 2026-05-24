import type { Meta, StoryObj } from "@storybook/react";
import { H1 } from "../heading/Heading.aliases";
import { Caption, Detail, Notice, SectionLabel, Stat, Subheading, Title } from "./Text.aliases";
import { Text } from "./Text";
import type { TextProps } from "./Text.types";

const meta = {
  title: "Design System/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    muted: { control: "boolean" },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<TextProps>;

export const Default: Story = {
  args: {
    children: "Default body text.",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text size="xs">Extra small text</Text>
      <Text size="sm">Small text</Text>
      <Text size="base">Base text</Text>
      <Text size="lg">Large text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    muted: true,
    children: "Muted tertiary text.",
  },
};

export const Presets: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-8">
      <div className="flex flex-col gap-1">
        <H1>Activity</H1>
        <Subheading>Audit log of all workspace events.</Subheading>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <Notice>No events found</Notice>
        <Subheading>Try adjusting your filters.</Subheading>
      </div>

      <div className="flex flex-col gap-0.5">
        <Title>James Howell</Title>
        <Caption>james@example.com</Caption>
        <Detail>Updated 2 hours ago</Detail>
      </div>

      <div className="flex flex-col gap-1">
        <Caption>Components</Caption>
        <Stat>22</Stat>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>March 20, 2026</SectionLabel>
        <Title>James Howell updated workspace settings</Title>
        <Detail>10:42 AM</Detail>
      </div>
    </div>
  ),
};

export const AsSpan: Story = {
  args: {
    as: "span",
    children: "Rendered as a span element.",
  },
};

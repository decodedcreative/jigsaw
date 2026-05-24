import type { Meta, StoryObj } from "@storybook/react";
import { Link, LinkButton } from "./index";

const meta = {
  title: "Design System/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "accent", "subtle", "muted", "brand", "media"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: "#", children: "Read the docs" },
};

export const AsButton: Story = {
  render: () => (
    <LinkButton href="#" variant="primary">
      Go somewhere
    </LinkButton>
  ),
};

export const Brand: Story = {
  args: { href: "/", variant: "brand", children: "Jigsaw" },
};

export const Media: Story = {
  render: () => (
    <Link href="/" variant="media" aria-label="Jigsaw home">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <rect width="32" height="32" rx="6" fill="currentColor" opacity="0.15" />
        <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">
          J
        </text>
      </svg>
    </Link>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import { LinkButton, ButtonLink } from "./LinkButton";

const meta = {
  title: "Design System/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "accent", "subtle", "muted"] },
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

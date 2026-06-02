import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarStatusIndicator } from "./index";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compound avatar: wrap `AvatarImage`, `AvatarFallback`, and/or `AvatarStatusIndicator` as children. `AvatarStatusIndicator` inherits the parent `size` unless you pass an explicit `size` override.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JH</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
      <AvatarFallback>JH</AvatarFallback>
    </Avatar>
  ),
};

export const WithStatus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Status dot size follows the parent Avatar `size` automatically. Pass `size` on `AvatarStatusIndicator` only when you need a different scale.",
      },
    },
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JH</AvatarFallback>
      <AvatarStatusIndicator status="online" />
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>JH</AvatarFallback>
          <AvatarStatusIndicator status="online" />
        </Avatar>
      ))}
    </div>
  ),
};

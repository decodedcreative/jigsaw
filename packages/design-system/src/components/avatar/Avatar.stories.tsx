import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarStatusIndicator } from "./index";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: { children: "JH" },
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
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>JH</AvatarFallback>
      <AvatarStatusIndicator status="online" size={args.size} />
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} size={size}>JH</Avatar>
      ))}
    </div>
  ),
};

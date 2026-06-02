import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
  title: "Design System/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Prop-driven avatar: pass `initials`, optional `src`/`alt`, and optional `status`. Initials are shown when there is no image or when the image fails to load.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    status: { control: "select", options: ["online", "offline", "busy", "away"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: { initials: "JH" },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/100",
    alt: "User",
    initials: "JH",
  },
};

export const WithStatus: Story = {
  args: {
    initials: "JH",
    status: "online",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} size={size} initials="JH" status="online" />
      ))}
    </div>
  ),
};

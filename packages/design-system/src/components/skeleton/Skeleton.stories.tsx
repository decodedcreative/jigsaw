import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from "./index";

const meta = {
  title: "Design System/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "circular", "text"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = { args: { width: 240, height: 120 } };
export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2" style={{ width: 240 }}>
      <SkeletonText width="100%" />
      <SkeletonText width="80%" />
      <SkeletonText width="60%" />
    </div>
  ),
};
export const Circle: Story = { render: () => <SkeletonCircle width={48} height={48} /> };
export const Card: Story = { render: () => <div style={{ width: 280 }}><SkeletonCard /></div> };

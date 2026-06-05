import type { Meta, StoryObj } from "@storybook/react";
import { Disclosure } from "./Disclosure";
import { DisclosureGroup } from "./DisclosureGroup";

const meta = {
  title: "Design System/Disclosure",
  component: Disclosure,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { title: "What is Jigsaw?" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Disclosure {...args}>
        Jigsaw is the design system for this monorepo.
      </Disclosure>
    </div>
  ),
};

export const Group: Story = {
  args: { title: "" },
  render: () => (
    <div style={{ width: 360 }}>
      <DisclosureGroup>
        <Disclosure id="one" title="Section one">First panel content.</Disclosure>
        <Disclosure id="two" title="Section two">Second panel content.</Disclosure>
        <Disclosure id="three" title="Section three">Third panel content.</Disclosure>
      </DisclosureGroup>
    </div>
  ),
};

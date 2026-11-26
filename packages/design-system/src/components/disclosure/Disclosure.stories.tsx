import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Disclosure } from "./Disclosure";
import { DisclosureGroup } from "./DisclosureGroup";
import { clearFocus } from "../../test-utils/story-play";

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
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: "What is Jigsaw?" });

    await step("Tab moves focus to the trigger", async () => {
      await userEvent.tab();
      await expect(trigger).toHaveFocus();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    await step("Enter expands the panel", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(canvas.getByText("Jigsaw is the design system for this monorepo.")).toBeVisible();
    });

    await step("Space collapses it", async () => {
      await userEvent.keyboard(" ");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    clearFocus();
  },
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
  play: async ({ canvas, userEvent, step }) => {
    const one = canvas.getByRole("button", { name: "Section one" });
    const two = canvas.getByRole("button", { name: "Section two" });

    await step("Each trigger is its own tab stop", async () => {
      await userEvent.tab();
      await expect(one).toHaveFocus();
      await userEvent.tab();
      await expect(two).toHaveFocus();
    });

    await step("Enter expands only the focused section", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(two).toHaveAttribute("aria-expanded", "true");
      await expect(one).toHaveAttribute("aria-expanded", "false");
      await userEvent.keyboard("{Enter}");
      await expect(two).toHaveAttribute("aria-expanded", "false");
    });

    clearFocus();
  },
};

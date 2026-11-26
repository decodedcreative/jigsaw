import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "storybook/test";
import { Link } from "./Link";
import { LinkButton, ButtonLink } from "./LinkButton";
import { clearFocus } from "../../test-utils/story-play";

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
  args: { href: "#", children: "Read the docs", onPress: fn() },
  play: async ({ args, canvas, userEvent, step }) => {
    const link = canvas.getByRole("link", { name: "Read the docs" });
    // Following the link would navigate the test page away from the story.
    link.addEventListener("click", (event) => event.preventDefault());

    await step("Tab moves focus to the link", async () => {
      await userEvent.tab();
      await expect(link).toHaveFocus();
    });

    await step("Enter follows it", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(args.onPress).toHaveBeenCalledTimes(1);
    });

    await step("Space does not follow it, as with a native link", async () => {
      await userEvent.keyboard(" ");
      await expect(args.onPress).toHaveBeenCalledTimes(1);
    });

    clearFocus();
  },
};

export const AsButton: Story = {
  render: () => (
    <LinkButton href="#" variant="primary">
      Go somewhere
    </LinkButton>
  ),
};

export const AsButtonLink: Story = {
  render: () => (
    <ButtonLink href="#" variant="secondary">
      ButtonLink alias
    </ButtonLink>
  ),
};

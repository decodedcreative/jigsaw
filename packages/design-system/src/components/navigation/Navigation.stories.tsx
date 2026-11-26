import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import {
  Navigation,
  NavigationInner,
  NavigationBrand,
  NavigationLinks,
  NavigationLink,
  NavigationActions,
} from "./Navigation";
import { Button } from "../button/Button";
import { clearFocus } from "../../test-utils/story-play";

const meta = {
  title: "Design System/Navigation",
  component: Navigation,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Navigation>
      <NavigationInner>
        <NavigationBrand>Jigsaw</NavigationBrand>
        <NavigationLinks>
          <NavigationLink href="#" isCurrent>Home</NavigationLink>
          <NavigationLink href="#">Components</NavigationLink>
          <NavigationLink href="#">Docs</NavigationLink>
        </NavigationLinks>
        <NavigationActions>
          <Button size="sm">Sign in</Button>
        </NavigationActions>
      </NavigationInner>
    </Navigation>
  ),
  play: async ({ canvas, userEvent, step }) => {
    await step("Tab visits the links in reading order, then the action", async () => {
      const order = [
        canvas.getByRole("link", { name: "Home" }),
        canvas.getByRole("link", { name: "Components" }),
        canvas.getByRole("link", { name: "Docs" }),
        canvas.getByRole("button", { name: "Sign in" }),
      ];
      // The brand is focusable only when it links somewhere, so tab until Home.
      await userEvent.tab();
      if (document.activeElement !== order[0]) await userEvent.tab();
      for (const element of order) {
        await expect(element).toHaveFocus();
        if (element !== order.at(-1)) await userEvent.tab();
      }
    });

    await step("The current page link is marked for assistive technology", async () => {
      await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    });

    clearFocus();
  },
};

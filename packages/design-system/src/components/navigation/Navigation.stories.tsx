import type { Meta, StoryObj } from "@storybook/react";
import {
  Navigation,
  NavigationInner,
  NavigationBrand,
  NavigationLinks,
  NavigationLink,
  NavigationActions,
} from "./Navigation";
import { Button } from "../button/Button";

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
};

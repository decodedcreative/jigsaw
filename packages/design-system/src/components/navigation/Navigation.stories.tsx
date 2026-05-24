import type { Meta, StoryObj } from "@storybook/react";
import { Navigation, NavigationLink } from "./index";
import { Button } from "../button/Button";
import { Link } from "../link";

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
    <Navigation
      brand={
        <Link href="/" variant="brand">
          Jigsaw
        </Link>
      }
      links={
        <>
          <NavigationLink href="#" isCurrent>
            Home
          </NavigationLink>
          <NavigationLink href="#">Components</NavigationLink>
          <NavigationLink href="#">Docs</NavigationLink>
        </>
      }
      actions={
        <Button variant="primary" size="sm">Sign in</Button>
      }
    />
  ),
};

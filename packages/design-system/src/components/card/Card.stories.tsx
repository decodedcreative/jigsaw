import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "`Card` is a single component driven by props — there are no compound",
          "sub-components to assemble in app code.",
          "",
          "**Chrome goes in props, body goes in `children`:**",
          "- Use the `title` and `description` props for the standard header.",
          "- Use the `header` prop to fully replace the default header with custom content.",
          "- Use `actions`, `image`, and `footer` props for the matching regions.",
          "- Put the main body in `children`.",
          "",
          "**Do not reach for `<Card.Header>` in apps** — it is an internal",
          "implementation detail. Compose cards through the props above so spacing,",
          "dividers, and overrides stay consistent.",
          "",
          "**For a clickable card, set `as`.** Use `as=\"a\"` (with `href`) for",
          "navigation or `as=\"button\"` for actions so the card is focusable and",
          'keyboard-activatable. A clickable `"div"` is mouse-only and warns in development.',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "elevated", "interactive", "outline"] },
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composed: Story = {
  args: {
    variant: "elevated",
    title: "Project status",
    description: "Updated 3 minutes ago.",
  },
  render: (args: Story["args"]) => (
    <div className="w-[360px]">
      <Card {...args} footer={<Button size="sm">View details</Button>}>
        <p className="text-sm text-foreground-secondary">
          12 tasks complete, 3 in progress, 5 blocked.
        </p>
      </Card>
    </div>
  ),
};

export const CustomHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass the `header` prop to replace the default `title`/`description` header — no `<Card.Header>` required.",
      },
    },
  },
  render: () => (
    <div className="w-[360px]">
      <Card
        header={
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Custom header</span>
            <Button size="sm" variant="ghost">
              Edit
            </Button>
          </div>
        }
      >
        <p className="text-sm text-foreground-secondary">
          The header region is fully owned by the consumer here.
        </p>
      </Card>
    </div>
  ),
};

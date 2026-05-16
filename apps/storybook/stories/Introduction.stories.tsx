import type { Meta, StoryObj } from "@storybook/react";

function IntroductionContent() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: "40rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Jigsaw</h1>
      <p style={{ color: "#555" }}>
        Jigsaw is the design system for this monorepo. Component stories will appear here as they are
        added.
      </p>
    </div>
  );
}

const meta = {
  title: "Introduction",
  component: IntroductionContent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IntroductionContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <IntroductionContent />,
};

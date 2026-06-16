import type { Meta, StoryObj } from "@storybook/react";
import { TokenPage } from "./_components";

function ThemeSwitchDemo() {
  const activeTheme =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") ?? "light (default)"
      : "light (default)";

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Theme switch</h1>
      <p className="text-foreground-secondary mb-6 max-w-2xl">
        Use the <strong>Theme</strong> toolbar control to switch between default light,
        default dark, and portfolio. Semantic utilities below should update immediately
        without a rebuild.
      </p>
      <p className="text-sm text-foreground-muted mb-8 font-mono">
        Active <code>data-theme</code>: {activeTheme}
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-default border border-border-default p-4 bg-surface-primary">
          <p className="text-sm font-medium text-foreground-secondary mb-2">Surface</p>
          <p className="text-foreground-primary">bg-surface-primary</p>
        </div>
        <div className="rounded-default border border-border-default p-4 bg-surface-default">
          <p className="text-sm font-medium text-foreground-secondary mb-2">Canvas</p>
          <p className="text-foreground-primary">bg-surface-default</p>
        </div>
        <div className="rounded-default p-4 bg-interactive-primary text-foreground-on-primary">
          <p className="text-sm font-medium opacity-90 mb-2">Interactive</p>
          <p>bg-interactive-primary</p>
        </div>
      </div>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Theme Switch",
  component: ThemeSwitchDemo,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitchDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <ThemeSwitchDemo />,
};

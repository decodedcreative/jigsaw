import type { Meta, StoryObj } from "@storybook/react";
import theme from "../../../../packages/tokens/dist/theme.mjs";
import { SpacingSample, TokenPage, TokenSection } from "./_components";

function SpacingContent() {
  const spacing = theme.spacing as Record<string, string>;

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Spacing scale</h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        Spacing tokens from <code className="font-mono text-sm">@jigsaw/tokens</code>. Use
        Tailwind utilities such as <code className="font-mono text-sm">p-4</code>,{" "}
        <code className="font-mono text-sm">gap-2</code>,{" "}
        <code className="font-mono text-sm">mt-8</code>, or the CSS custom property{" "}
        <code className="font-mono text-sm">var(--spacing-4)</code>.
      </p>

      <TokenSection title="Scale" description="Each row shows the Tailwind class · rem/px value · visual width">
        <div>
          {Object.entries(spacing).map(([key, value]) => (
            <SpacingSample key={key} label={key} value={value} />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Spacing",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => <SpacingContent />,
};

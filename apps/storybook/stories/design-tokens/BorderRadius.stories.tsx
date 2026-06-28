import type { Meta, StoryObj } from "@storybook/react";
import docsTokens from "@jigsaw-ds/tokens/docs-tokens";
import { RadiusSample, TokenPage, TokenRow, TokenSection } from "./_components";

function BorderRadiusContent() {
  const radii = docsTokens.borderRadius;

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Border radius</h1>
      <p className="text-foreground-secondary mb-8 max-w-2xl">
        Corner-radius tokens from <code className="font-mono text-sm">@jigsaw-ds/tokens</code>.
        Use Tailwind utilities like <code className="font-mono text-sm">rounded-md</code>,{" "}
        <code className="font-mono text-sm">rounded-xl</code>,{" "}
        <code className="font-mono text-sm">rounded-full</code>, or the CSS variable{" "}
        <code className="font-mono text-sm">var(--border-radius-md)</code>.
      </p>

      <TokenSection title="Scale" description="From `rounded-none` to `rounded-full`">
        <TokenRow>
          {Object.entries(radii).map(([key, value]) => (
            <RadiusSample key={key} label={`rounded-${key === "default" ? "" : key}`} value={value} />
          ))}
        </TokenRow>
      </TokenSection>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Border Radius",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => <BorderRadiusContent />,
};

import type { Meta, StoryObj } from "@storybook/react";
import theme from "../../../../packages/tokens/dist/theme.mjs";
import { ShadowSample, TokenPage, TokenRow, TokenSection } from "./_components";

function ShadowsContent() {
  const shadows = theme.shadow as Record<string, string>;

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Shadows</h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        Elevation tokens from <code className="font-mono text-sm">@jigsaw/tokens</code>. Use
        Tailwind utilities like <code className="font-mono text-sm">shadow-sm</code>,{" "}
        <code className="font-mono text-sm">shadow-md</code>,{" "}
        <code className="font-mono text-sm">shadow-xl</code>, or the CSS variable{" "}
        <code className="font-mono text-sm">var(--shadow-md)</code>.
      </p>

      <TokenSection title="Elevation scale" description="Lower values are closer to the surface; higher values float further away.">
        <TokenRow>
          {Object.entries(shadows).map(([key, value]) => (
            <ShadowSample
              key={key}
              label={`shadow-${key === "default" ? "" : key}`}
              value={value}
            />
          ))}
        </TokenRow>
      </TokenSection>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Shadows",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => <ShadowsContent />,
};

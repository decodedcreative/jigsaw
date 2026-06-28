import type { Meta, StoryObj } from "@storybook/react";
import docsTokens from "@jigsaw-ds/tokens/docs-tokens";
import { ColorSwatch, TokenPage, TokenRow, TokenSection } from "./_components";
import { useResolvedCssColor } from "./css-color";

const paletteScales = ["navy", "orange", "grey"] as const;

function PaletteSwatch({
  label,
  cssVar,
}: {
  label: string;
  cssVar: `--${string}`;
}) {
  const value = useResolvedCssColor(cssVar);

  return <ColorSwatch label={label} cssVar={cssVar} value={value} />;
}

function ColorPaletteContent() {
  const { color } = docsTokens;

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Color palette</h1>
      <p className="text-foreground-secondary mb-8 max-w-2xl">
        Base palette tokens from <code className="font-mono text-sm">@jigsaw-ds/tokens</code>. Use Tailwind
        classes such as <code className="font-mono text-sm">bg-navy-500</code> or CSS variables like{" "}
        <code className="font-mono text-sm">var(--color-navy-500)</code>.
      </p>

      {paletteScales.map((name) => {
        const scale = color[name];
        return (
          <TokenSection
            key={name}
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            description={`bg-${name}-{50–950}`}
          >
            <TokenRow>
              {Object.keys(scale).map((step) => (
                <PaletteSwatch
                  key={step}
                  label={step}
                  cssVar={`--color-${name}-${step}`}
                />
              ))}
            </TokenRow>
          </TokenSection>
        );
      })}

      <TokenSection title="Neutrals" description="bg-white · bg-black">
        <TokenRow>
          <PaletteSwatch label="white" cssVar="--color-white" />
          <PaletteSwatch label="black" cssVar="--color-black" />
        </TokenRow>
      </TokenSection>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Color Palette",
  component: ColorPaletteContent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPaletteContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => <ColorPaletteContent />,
};

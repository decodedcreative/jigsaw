import type { Meta, StoryObj } from "@storybook/react";
import docsTokens from "@jigsaw-ds/tokens/docs-tokens";
import { TokenPage, TokenSection, TypeSample } from "./_components";

const textSizeClass = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
} as const;

const fontWeightClass = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

const lineHeightClass = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
} as const;

const letterSpacingClass = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
} as const;

function TypographyContent() {
  const { font } = docsTokens;

  return (
    <TokenPage>
      <h1 className="text-3xl font-bold mb-2">Typography</h1>
      <p className="text-foreground-secondary mb-8 max-w-2xl">
        Type tokens from <code className="font-mono text-sm">typography.json</code>. Tailwind maps
        these to <code className="font-mono text-sm">font-*</code>, <code className="font-mono text-sm">text-*</code>,{" "}
        <code className="font-mono text-sm">font-[weight]</code>,{" "}
        <code className="font-mono text-sm">leading-*</code>, and{" "}
        <code className="font-mono text-sm">tracking-*</code> utilities.
      </p>

      <TokenSection title="Font families" description="font-sans · font-mono">
        <TypeSample
          label="Sans"
          token={`font-sans · ${font.family.sans}`}
          className="font-sans text-2xl"
        />
        <TypeSample
          label="Mono"
          token={`font-mono · ${font.family.mono}`}
          className="font-mono text-lg"
        >
          const palette = ["navy", "orange", "grey"];
        </TypeSample>
      </TokenSection>

      <TokenSection title="Font sizes" description="text-xs through text-5xl">
        {(Object.keys(textSizeClass) as (keyof typeof textSizeClass)[]).map((name) => (
          <TypeSample
            key={name}
            label={name}
            token={`text-${name} · ${font.size[name]}`}
            className={textSizeClass[name]}
          >
            Heading scale sample ({font.size[name]})
          </TypeSample>
        ))}
      </TokenSection>

      <TokenSection title="Font weights" description="font-normal through font-bold">
        {(Object.keys(fontWeightClass) as (keyof typeof fontWeightClass)[]).map((name) => (
          <TypeSample
            key={name}
            label={name}
            token={`font-${name} · ${font.weight[name]}`}
            className={`text-xl ${fontWeightClass[name]}`}
          />
        ))}
      </TokenSection>

      <TokenSection title="Line heights" description="leading-none through leading-loose">
        {(Object.keys(lineHeightClass) as (keyof typeof lineHeightClass)[]).map((name) => (
          <TypeSample
            key={name}
            label={name}
            token={`leading-${name} · ${font.lineHeight[name]}`}
            className={`text-base max-w-md ${lineHeightClass[name]}`}
          >
            Multi-line sample with {name} line height. Design tokens keep vertical rhythm consistent
            across components and marketing pages.
          </TypeSample>
        ))}
      </TokenSection>

      <TokenSection title="Letter spacing" description="tracking-tighter through tracking-widest">
        {(Object.keys(letterSpacingClass) as (keyof typeof letterSpacingClass)[]).map((name) => (
          <TypeSample
            key={name}
            label={name}
            token={`tracking-${name} · ${font.letterSpacing[name]}`}
            className={`text-lg uppercase ${letterSpacingClass[name]}`}
          >
            LETTER SPACING
          </TypeSample>
        ))}
      </TokenSection>
    </TokenPage>
  );
}

const meta = {
  title: "Design Tokens/Typography",
  component: TypographyContent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => <TypographyContent />,
};

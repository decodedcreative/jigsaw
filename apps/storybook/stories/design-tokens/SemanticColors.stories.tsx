import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ColorSwatch, TokenPage, TokenRow, TokenSection } from "./_components";

type SemanticSwatch = {
  label: string;
  className: string;
  /** Tailwind class for sample text on the swatch when relevant */
  sampleTextClass?: string;
};

const semanticGroups: { title: string; description: string; swatches: SemanticSwatch[] }[] = [
  {
    title: "Surface",
    description: "Background layers for UI chrome and containers",
    swatches: [
      { label: "primary", className: "bg-surface-primary" },
      { label: "secondary", className: "bg-surface-secondary" },
      { label: "tertiary", className: "bg-surface-tertiary" },
      { label: "default", className: "bg-surface-default" },
      { label: "raised", className: "bg-surface-raised" },
      { label: "overlay", className: "bg-surface-overlay" },
      { label: "muted", className: "bg-surface-muted" },
      { label: "subtle", className: "bg-surface-subtle" },
      { label: "hover", className: "bg-surface-hover" },
      { label: "inverse", className: "bg-surface-inverse", sampleTextClass: "text-foreground-inverse" },
    ],
  },
  {
    title: "Foreground",
    description: "Foreground colours for typography and icons",
    swatches: [
      { label: "primary", className: "bg-foreground-primary" },
      { label: "secondary", className: "bg-foreground-secondary" },
      { label: "tertiary", className: "bg-foreground-tertiary" },
      { label: "muted", className: "bg-foreground-muted" },
      { label: "disabled", className: "bg-foreground-disabled" },
      { label: "placeholder", className: "bg-foreground-placeholder" },
      { label: "inverse", className: "bg-foreground-inverse" },
      { label: "on-primary", className: "bg-foreground-on-primary" },
      { label: "on-accent", className: "bg-foreground-on-accent" },
    ],
  },
  {
    title: "Border",
    description: "Strokes and dividers",
    swatches: [
      { label: "default", className: "bg-border-default" },
      { label: "primary", className: "bg-border-primary" },
      { label: "strong", className: "bg-border-strong" },
      { label: "hover", className: "bg-border-hover" },
      { label: "subtle", className: "bg-border-subtle" },
      { label: "focus", className: "bg-border-focus" },
      { label: "disabled", className: "bg-border-disabled" },
    ],
  },
  {
    title: "Interactive",
    description: "Buttons, controls, and focus affordances",
    swatches: [
      { label: "primary", className: "bg-interactive-primary" },
      { label: "primary-hover", className: "bg-interactive-primary-hover" },
      { label: "primary-active", className: "bg-interactive-primary-active" },
      { label: "primary-disabled", className: "bg-interactive-primary-disabled" },
      { label: "accent", className: "bg-interactive-accent" },
      { label: "accent-hover", className: "bg-interactive-accent-hover" },
      { label: "accent-active", className: "bg-interactive-accent-active" },
      { label: "accent-disabled", className: "bg-interactive-accent-disabled" },
      { label: "secondary-hover", className: "bg-interactive-secondary-hover" },
      { label: "destructive", className: "bg-interactive-destructive" },
      { label: "focus", className: "bg-interactive-focus" },
    ],
  },
  {
    title: "State",
    description: "Feedback for errors, success, warnings, and info",
    swatches: [
      { label: "error", className: "bg-state-error" },
      { label: "error-bg", className: "bg-state-error-bg" },
      { label: "error-border", className: "bg-state-error-border" },
      { label: "success", className: "bg-state-success" },
      { label: "success-bg", className: "bg-state-success-bg" },
      { label: "success-border", className: "bg-state-success-border" },
      { label: "warning", className: "bg-state-warning" },
      { label: "warning-bg", className: "bg-state-warning-bg" },
      { label: "warning-border", className: "bg-state-warning-border" },
      { label: "info", className: "bg-state-info" },
      { label: "info-bg", className: "bg-state-info-bg" },
      { label: "info-border", className: "bg-state-info-border" },
    ],
  },
  {
    title: "Brand & link",
    description: "Marketing accents and hyperlink colours",
    swatches: [
      { label: "brand-primary", className: "bg-brand-primary" },
      { label: "brand-secondary", className: "bg-brand-secondary" },
      { label: "brand-accent", className: "bg-brand-accent" },
      { label: "link-default", className: "bg-link-default" },
      { label: "link-hover", className: "bg-link-hover" },
      { label: "link-visited", className: "bg-link-visited" },
      { label: "link-active", className: "bg-link-active" },
    ],
  },
];

function SemanticColorsContent({ themeMode }: { themeMode: "light" | "dark" }) {
  return (
    <div data-theme={themeMode} className="min-h-screen">
      <TokenPage>
        <h1 className="text-3xl font-bold mb-2">Semantic colours</h1>
        <p className="text-foreground-secondary mb-8 max-w-2xl">
          Theme-aware tokens from{" "}
          <code className="font-mono text-sm">semantic-light.css</code> /{" "}
          <code className="font-mono text-sm">semantic-dark.css</code>. Toggle the theme control to
          compare light and dark mappings.
        </p>

        {semanticGroups.map((group) => (
          <TokenSection key={group.title} title={group.title} description={group.description}>
            <TokenRow>
              {group.swatches.map((swatch) => (
                <ColorSwatch
                  key={swatch.label}
                  label={swatch.label}
                  value={swatch.className}
                  className={swatch.className}
                  textClassName={swatch.sampleTextClass ?? "text-foreground-primary"}
                />
              ))}
            </TokenRow>
          </TokenSection>
        ))}
      </TokenPage>
    </div>
  );
}

function SemanticColorsWithToggle() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  return (
    <div>
      <div className="sticky top-0 z-10 flex gap-2 p-4 bg-surface-raised border-b border-border-default font-sans">
        <span className="text-sm text-foreground-secondary self-center mr-2">Preview theme:</span>
        {(["light", "dark"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setThemeMode(mode)}
            className={`px-3 py-1.5 text-sm rounded-default border transition-colors ${
              themeMode === mode
                ? "bg-interactive-primary text-foreground-on-primary border-transparent"
                : "bg-surface-default text-foreground-primary border-border-default hover:bg-surface-hover"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
      <SemanticColorsContent themeMode={themeMode} />
    </div>
  );
}

const meta = {
  title: "Design Tokens/Semantic Colors",
  component: SemanticColorsWithToggle,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SemanticColorsWithToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => <SemanticColorsWithToggle />,
};

export const Light: Story = {
  render: () => <SemanticColorsContent themeMode="light" />,
};

export const Dark: Story = {
  render: () => <SemanticColorsContent themeMode="dark" />,
};

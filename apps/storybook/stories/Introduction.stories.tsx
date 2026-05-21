import type { Meta, StoryObj } from "@storybook/react";

// ---------------------------------------------------------------------------
// Storybook story ID helpers
// Storybook encodes story IDs as: <title-kebab>--<story-kebab>
// e.g. "Design Tokens/Color Palette" → "design-tokens-color-palette--palette"
// ---------------------------------------------------------------------------
function storyPath(title: string, story = "docs") {
  const id = title
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-");
  return `/?path=/docs/${id}--${story}`;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const tokenSections = [
  {
    title: "Color Palette",
    description: "Base palette — all named colours across the navy, orange, and grey scales.",
    href: storyPath("Design Tokens/Color Palette"),
    icon: "🎨",
  },
  {
    title: "Semantic Colors",
    description: "Intent-based tokens: surface, text, border, interactive, feedback, and more.",
    href: storyPath("Design Tokens/Semantic Colors"),
    icon: "🪄",
  },
  {
    title: "Typography",
    description: "Font families, sizes, weights, and line-height scale.",
    href: storyPath("Design Tokens/Typography"),
    icon: "Aa",
  },
  {
    title: "Spacing",
    description: "Consistent spacing scale used for padding, margin, and gap utilities.",
    href: storyPath("Design Tokens/Spacing"),
    icon: "⬜",
  },
  {
    title: "Border Radius",
    description: "Corner-radius tokens from sharp to pill-shaped.",
    href: storyPath("Design Tokens/Border Radius"),
    icon: "▢",
  },
  {
    title: "Shadows",
    description: "Elevation scale from flush to floating.",
    href: storyPath("Design Tokens/Shadows"),
    icon: "🌑",
  },
];

const componentSections = [
  { title: "Avatar", description: "User identity display with image or initials fallback." },
  { title: "Badge", description: "Small label for status, counts, or categories." },
  { title: "Button", description: "Primary action trigger with multiple variants and sizes." },
  { title: "Card", description: "Surface container for grouped content." },
  { title: "Checkbox", description: "Boolean toggle with indeterminate state support." },
  { title: "CheckboxGroup", description: "Accessible group of related checkboxes." },
  { title: "Disclosure", description: "Collapsible panel with animated open/close." },
  { title: "Form", description: "Layout and validation wrapper for form fields." },
  { title: "Input", description: "Single-line text entry with label and error state." },
  { title: "Link", description: "Navigational anchor with consistent styling." },
  { title: "Modal", description: "Focused dialog overlay for important actions." },
  { title: "Navigation", description: "App-level nav with active-route highlighting." },
  { title: "NumberField", description: "Numeric input with increment/decrement controls." },
  { title: "RadioGroup", description: "Exclusive selection from a set of options." },
  { title: "SearchField", description: "Search input with clear button." },
  { title: "Select", description: "Accessible dropdown for picking one option." },
  { title: "Skeleton", description: "Placeholder shimmer for loading states." },
  { title: "Tabs", description: "Horizontal tab bar for switching between panels." },
  { title: "Text", description: "Typographic primitive with semantic variants." },
  { title: "Textarea", description: "Multi-line text entry with auto-resize option." },
  { title: "Toast", description: "Transient notification that auto-dismisses." },
  { title: "Tooltip", description: "Contextual label that appears on hover or focus." },
].map((c) => ({
  ...c,
  href: storyPath(`Design System/${c.title}`),
}));

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-text-primary mb-1">{children}</h2>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {children}
    </div>
  );
}

function NavCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon?: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="
        group flex flex-col gap-1 p-4
        rounded-lg border border-border-default bg-surface-default
        hover:border-interactive-accent hover:shadow-md
        transition-all duration-150 no-underline
      "
    >
      {icon && (
        <span className="text-2xl mb-1 leading-none" aria-hidden>
          {icon}
        </span>
      )}
      <span className="text-sm font-semibold text-text-primary group-hover:text-interactive-accent transition-colors">
        {title}
      </span>
      <span className="text-xs text-text-secondary leading-relaxed">{description}</span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function WelcomeContent() {
  return (
    <div className="font-sans text-text-primary bg-surface-default min-h-screen p-8 md:p-12">
      {/* Hero */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 bg-surface-muted text-text-secondary text-xs font-mono px-3 py-1 rounded-full mb-4">
          @jigsaw/design-system
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-3">Jigsaw</h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          The design system and component library for this monorepo. Built on a two-layer token
          architecture — a base colour palette and semantic intent tokens — with accessible
          components powered by React Aria.
        </p>
      </div>

      {/* Token section */}
      <section className="max-w-5xl mb-12">
        <SectionHeading>Design Tokens</SectionHeading>
        <p className="text-sm text-text-secondary max-w-2xl">
          Tokens are the single source of truth for colour, spacing, typography, and elevation.
          They're generated from{" "}
          <code className="font-mono text-xs bg-surface-muted px-1 py-0.5 rounded">
            packages/tokens
          </code>{" "}
          via Style Dictionary and consumed by Tailwind and your CSS variables.
        </p>
        <CardGrid>
          {tokenSections.map((t) => (
            <NavCard key={t.title} href={t.href} icon={t.icon} title={t.title} description={t.description} />
          ))}
        </CardGrid>
      </section>

      {/* Components section */}
      <section className="max-w-5xl mb-12">
        <SectionHeading>Components</SectionHeading>
        <p className="text-sm text-text-secondary max-w-2xl">
          22 production-ready components. Each story documents variants, states, accessibility
          props, and Tailwind integration.
        </p>
        <CardGrid>
          {componentSections.map((c) => (
            <NavCard key={c.title} href={c.href} title={c.title} description={c.description} />
          ))}
        </CardGrid>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl border-t border-border-subtle pt-6 text-xs text-text-muted">
        <p>
          Tokens and components are versioned together in the monorepo under{" "}
          <code className="font-mono">packages/tokens</code> and{" "}
          <code className="font-mono">packages/design-system</code>.
        </p>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------
const meta = {
  title: "Introduction/Welcome",
  parameters: {
    layout: "fullscreen",
    docs: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <WelcomeContent />,
};

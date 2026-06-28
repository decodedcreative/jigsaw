import {
  componentSections,
  docsPath,
  exampleSections,
  tokenSections,
} from "../Introduction.stories.constants";
import { CardGrid } from "./CardGrid";
import { ComponentCard } from "./ComponentCard";
import { TokenCard } from "./TokenCard";
import { previews } from "./previews";

export const WelcomeContent = () => (
    <div data-theme="dark" className="font-sans text-foreground-primary bg-surface-default min-h-screen p-8 md:p-12">
      {/* Hero */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 bg-surface-muted text-foreground-secondary text-xs font-mono px-3 py-1 rounded-full mb-4">
          @jigsaw-ds/design-system
        </div>
        <h1 className="text-4xl font-bold text-foreground-primary mb-3">Jigsaw</h1>
        <p className="text-lg text-foreground-secondary leading-relaxed">
          The design system and component library for this monorepo. Built on a two-layer token
          architecture — a base colour palette and semantic intent tokens — with accessible
          components powered by React Aria.
        </p>
      </div>

      {/* Tokens */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-foreground-primary mb-1">Design Tokens</h2>
        <p className="text-sm text-foreground-secondary max-w-2xl">
          Tokens are the single source of truth for colour, spacing, typography, and elevation.
          Generated from{" "}
          <code className="font-mono text-xs bg-surface-muted px-1 py-0.5 rounded">
            packages/tokens
          </code>{" "}
          via Style Dictionary and consumed by Tailwind and CSS variables.
        </p>
        <CardGrid>
          {tokenSections.map((t) => (
            <TokenCard key={t.title} href={t.href} icon={t.icon} title={t.title} description={t.description} />
          ))}
        </CardGrid>
      </section>

      {/* Components */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-foreground-primary mb-1">Components</h2>
        <p className="text-sm text-foreground-secondary max-w-2xl">
          {componentSections.length} production-ready components. Each story documents variants,
          states, accessibility props, and Tailwind integration.
        </p>
        <CardGrid>
          {componentSections.map((c) => (
            <ComponentCard
              key={c.title}
              href={docsPath(`Design System/${c.title}`)}
              title={c.title}
              description={c.description}
              preview={previews[c.title]}
            />
          ))}
        </CardGrid>
      </section>

      {/* Examples */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-foreground-primary mb-1">Examples</h2>
        <p className="text-sm text-foreground-secondary max-w-2xl">
          Full-page compositions showing how components work together in realistic product scenarios.
        </p>
        <CardGrid>
          {exampleSections.map((e) => (
            <TokenCard key={e.title} href={e.href} icon={e.icon} title={e.title} description={e.description} />
          ))}
        </CardGrid>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl border-t border-border-subtle pt-6 text-xs text-foreground-muted">
        <p>
          Tokens and components are versioned together in the monorepo under{" "}
          <code className="font-mono">packages/tokens</code> and{" "}
          <code className="font-mono">packages/design-system</code>.
        </p>
      </footer>
    </div>
);

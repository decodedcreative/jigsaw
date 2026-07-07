# Jigsaw

Turborepo monorepo for **Jigsaw**, a React design system, plus apps that exercise it.

## Structure

- **apps/web** — Next.js 15 (App Router) app used to dogfood Jigsaw
- **apps/storybook** — Storybook for Jigsaw documentation
- **packages/design-system** — React components (`@jigsaw-ds/design-system`)
- **packages/tokens** — Shared tokens and Tailwind v4 theme CSS (`@jigsaw-ds/tokens`)
- **packages/themes/default** — Default light/dark theme (`@jigsaw-ds/theme-default`)
- **packages/themes/portfolio** — Portfolio theme (`@jigsaw-ds/theme-portfolio`)

## Prerequisites

- Node.js **≥ 20.19** (see `.nvmrc`; matches CI and test tooling such as Vitest/jsdom)
- npm

## Commands

From the repo root:

```bash
# Install dependencies
npm install

# Build all apps and packages
npm run build

# Run all apps in dev mode (Next.js + Storybook)
npm run dev

# Lint
npm run lint

# Add a changeset (required for publishable package changes)
npm run changeset
```

## Using Jigsaw in another app

Once published, install the npm packages under the `@jigsaw-ds` scope:

```bash
npm install @jigsaw-ds/design-system @jigsaw-ds/tokens @jigsaw-ds/theme-default
```

See [docs/using-jigsaw.md](docs/using-jigsaw.md) for full setup (PostCSS, CSS imports, and Tailwind v4 wiring) in a Next.js app.

For npm org scope and publication planning, see [docs/publication.md](docs/publication.md).

# Jigsaw

Turborepo monorepo for **Jigsaw**, a React design system, plus apps that exercise it.

## Structure

- **apps/web** — Next.js 15 (App Router) app used to dogfood Jigsaw
- **apps/storybook** — Storybook for Jigsaw documentation
- **packages/design-system** — React components (`@jigsaw/design-system`)
- **packages/tokens** — Shared tokens and Tailwind v4 theme CSS (`@jigsaw/tokens`)
- **packages/themes/default** — Default light/dark theme (`@jigsaw/theme-default`)
- **packages/themes/portfolio** — Portfolio theme (`@jigsaw/theme-portfolio`)

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
```

## Using Jigsaw in another app

See [docs/using-jigsaw.md](docs/using-jigsaw.md) for installing `@jigsaw/*` packages from npm and wiring them into a Next.js + Tailwind v4 app.

Maintainers: see [docs/publication.md](docs/publication.md) for npm namespace decisions and the planned release process.

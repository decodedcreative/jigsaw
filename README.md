# Jigsaw

Turborepo monorepo for **Jigsaw**, a React design system, plus apps that exercise it.

## Structure

- **apps/web** — Next.js 15 (App Router) app used to dogfood Jigsaw
- **apps/storybook** — Storybook for Jigsaw documentation
- **packages/design-system** — **Jigsaw** — shared React components (`@jigsaw/design-system`)
- **packages/db** — Prisma schema and client (Phase 5)
- **packages/tokens** — Design tokens via Style Dictionary (`@jigsaw/tokens`, Phase 2)

## Prerequisites

- Node.js >= 20
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

## Phases

- **Phase 1 (done)** — Turborepo scaffold, apps and packages created
- **Phase 2 (done)** — Style Dictionary tokens → CSS variables + Tailwind theme JS
- Phase 3 — Jigsaw components + Tailwind
- Phase 4 — Storybook wired to Jigsaw
- Phase 5 — Prisma in packages/db
- Phase 6 — Dogfood / example pages in apps/web
- Phase 7 — Chromatic + GitHub Actions
- Phase 8 — Figma MCP documentation
- Phase 9 — Vercel deployment

Type **proceed** to move to the next phase.

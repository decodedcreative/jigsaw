# Using Jigsaw in your app

This guide explains how to install Jigsaw packages and wire them into a **Next.js 15 (App Router) + Tailwind CSS v4** application. The reference implementation in this repo is [`apps/web`](../apps/web).

Packages will be published to the [npm registry](https://www.npmjs.com/) under the `@jigsaw-ds` scope. Until the first release is published, use the [local development](#local-development-without-publishing) section at the bottom.

## Packages

| Package | Required | Purpose |
|---------|----------|---------|
| `@jigsaw-ds/design-system` | Yes | React components |
| `@jigsaw-ds/tokens` | Yes | Shared primitives + Tailwind v4 theme CSS |
| `@jigsaw-ds/theme-default` | Yes | Default light/dark semantic colours |
| `@jigsaw-ds/theme-portfolio` | No | Portfolio theme (`[data-theme='portfolio']`) |

`@jigsaw-ds/theme-build` is also published, but it is a build-time helper for authoring custom themes — most apps do not need it.

## Prerequisites

- Node.js **≥ 20.9** (20 LTS recommended). Tailwind CSS v4's Oxide engine (`@tailwindcss/oxide`) requires Node 20+, and [Next.js 15](https://nextjs.org/docs/app/getting-started/installation) specifies a minimum of 20.9. Node 18 is not supported.
- React 18 or 19 (no Node version conflict — both run on Node 20)
- Tailwind CSS v4: the `tailwindcss` package (for `@import "tailwindcss"` in CSS) and `@tailwindcss/postcss` (PostCSS plugin — configured in step 2)

## 1. Install

```bash
npm install @jigsaw-ds/design-system @jigsaw-ds/tokens @jigsaw-ds/theme-default
```

Add the portfolio theme only if you need it:

```bash
npm install @jigsaw-ds/theme-portfolio
```

Install Tailwind v4 if your app does not already have it:

```bash
npm install tailwindcss @tailwindcss/postcss
```

`@jigsaw-ds/design-system` installs its own runtime dependencies (`react-aria-components`, `@phosphor-icons/react`, `class-variance-authority`, `tailwind-merge`). You must provide `react` and `react-dom` as peers.

## 2. PostCSS

Create or update `postcss.config.mjs` at your app root:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## 3. Theme CSS

Import theme CSS in your root layout **before** your Tailwind entry file. Load order matters: shared primitives → default theme → optional named themes.

`app/layout.tsx`:

```tsx
import "@jigsaw-ds/tokens/shared/base.css";
import "@jigsaw-ds/theme-default/base.css";
import "@jigsaw-ds/theme-default/semantic-light.css";
import "@jigsaw-ds/theme-default/semantic-dark.css";
// Optional portfolio theme:
// import "@jigsaw-ds/theme-portfolio/base.css";
// import "@jigsaw-ds/theme-portfolio/semantic.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-foreground-primary bg-surface-primary">
        {children}
      </body>
    </html>
  );
}
```

All theme stylesheets are bundled up front. Switching themes at runtime only changes which `data-theme` selector matches — no rebuild is required.

### Do not wrap theme imports in `@layer base`

Theme CSS files set raw RGB channel tuples on `:root` (for example `--color-foreground-primary: 16 42 67`). Utilities such as `text-foreground-primary` resolve these via `rgb(var(--color-foreground-primary))`.

Tailwind's `@theme inline` block in `tailwind-theme.css` lives in `@layer theme`, which has **higher cascade priority** than `@layer base`. If you wrap theme imports in `layer(base)`, the inline theme definitions overwrite the semantic tuples with circular `rgb(var(--color-*))` references, and colour utilities stop working.

Import theme sheets **unlayered** (plain `@import` or JS `import`), as shown above. Storybook's `apps/storybook/style.css` follows the same pattern.

## 4. Tailwind entry (`globals.css`)

```css
@import "tailwindcss";
@import "@jigsaw-ds/tokens/tailwind-theme.css";
@import "@jigsaw-ds/design-system/tailwind.css";

/* Dark mode follows data-theme (matches apps/web and Storybook) */
@custom-variant dark (&:is([data-theme="dark"] *));

/*
  Tailwind v4 defaults border-color to currentcolor.
  This keeps pre-v4 border behaviour for components that rely on it.
*/
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }
}
```

`@jigsaw-ds/design-system/tailwind.css` registers Tailwind content paths for the component library. You do not need a separate `@source` directive in your app — the package owns that configuration.

If your app uses Tailwind utilities in its own source files, add an `@source` for your app code (for example `@source "./**/*.{js,ts,jsx,tsx}"` relative to `globals.css`).

## 5. Use components

### Client components / Vite / Storybook

The root barrel is fine when the importing module is already a Client Component (or a non-RSC bundler):

```tsx
import { Button, Badge, Card, Text } from "@jigsaw-ds/design-system";

export function Example() {
  return (
    <Card>
      <Text as="p">Status</Text>
      <Badge variant="success">Live</Badge>
      <Button variant="primary">Continue</Button>
    </Card>
  );
}
```

### Server Components

Presentational Jigsaw modules resolve class names with plain `getClassNames` — no React context. They are compiled **per module**, and `"use client"` stays only on interactive leaves.

**Do not import presentational components from the root barrel in a Server Component.** `dist/index.mjs` re-exports interactive modules too, so Next evaluates that mixed graph and fails with `client-only` / `'use client'` boundary errors — even if you only reference `Badge`.

Use the **documented package subpaths** instead (one export per public component folder):

```tsx
// app/page.tsx — Server Component
import { Badge } from "@jigsaw-ds/design-system/badge";
import { Text } from "@jigsaw-ds/design-system/text";
import { Heading } from "@jigsaw-ds/design-system/heading";
import { Card } from "@jigsaw-ds/design-system/card";

export default function Page() {
  return (
    <Card>
      <Heading as="h2">Status</Heading>
      <Text as="p">Markets are open</Text>
      <Badge variant="success">Live</Badge>
    </Card>
  );
}
```

Interactive components keep their own `"use client"` directive. Import them from their subpath as well when you need them as a client leaf inside a Server Component tree (Next creates the boundary at that module):

```tsx
import { Button } from "@jigsaw-ds/design-system/button";
```

Supported subpaths mirror folder names under `components/` (for example `./badge`, `./button`, `./checkbox-group`), plus:

| Subpath | Purpose |
|---------|---------|
| `@jigsaw-ds/design-system/theme` | `configureTwMerge` / `configureTheme` (RSC-safe) |
| `@jigsaw-ds/design-system/utils` | `getClassNames` and related helpers |
| `@jigsaw-ds/design-system/providers` | `ThemeProvider` (client — nested overrides only) |

Do **not** deep-import internal files under `dist/components/.../Badge.mjs` — only the published `exports` subpaths are supported.

RSC-safe presentational surface today (import via subpaths):

`Badge`, `Text`, `Heading` / `H1`–`H6`, `Skeleton`, `Icon`, `Card`

Still client (subpath imports create a client boundary):

- `Avatar` — image `onError` / fallback state
- Interactive / React Aria components (`Button`, `Modal`, `Select`, …)
- Theme hooks and `ThemeProvider` — prefer `configureTwMerge` from Server Components

### Next.js + Phosphor icons (SSR)

Jigsaw components deep-import icons from Phosphor's **public** per-icon entries (for example `@phosphor-icons/react/List`), which map to the package's `./*` → `dist/csr/*.es.js` export. That pattern is part of `@phosphor-icons/react` v2's documented package exports — not an internal path.

Phosphor's **root** `require` entry (`dist/index.cjs.js`) still breaks under Next.js 15 SSR: named exports like `ListIcon` can be `undefined`, which surfaces as `Element type is invalid … got: undefined` while prerendering. Design-system runtime code avoids that barrel; apps that import icons themselves (or transpile the design-system) should also steer Next toward ESM:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jigsaw-ds/design-system"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  webpack: (config) => {
    // Prefer Phosphor's "import" (ESM) condition — its "require" targets still
    // point at the broken root CJS barrel (JSW-114).
    const conditions = config.resolve.conditionNames ?? [
      "browser",
      "module",
      "require",
      "default",
    ];
    config.resolve.conditionNames = [
      "import",
      ...conditions.filter((c: string) => c !== "import"),
    ];
    return config;
  },
};

export default nextConfig;
```

See [`apps/web/next.config.ts`](../apps/web/next.config.ts) for the reference. Revisit if a future `@phosphor-icons/react` release ships a working CJS require map — CI guards the deep-import subpaths we rely on.

### Custom `twMerge` (App Router / RSC-safe)

For app-wide class-name merge customisation (for example `extendTailwindMerge` for custom class groups), call `configureTwMerge` once per runtime. This uses a module-level config — **no React context** — so it works from a Server Component root layout and from a client providers file.

```ts
// lib/jigsaw-theme.ts — import this from root layout (server) and from your client providers entry
import { configureTwMerge } from "@jigsaw-ds/design-system/theme";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  // extend class groups for your design tokens as needed
});

configureTwMerge(twMerge);
```

```tsx
// app/layout.tsx (Server Component)
import "./lib/jigsaw-theme"; // side-effect: configureTwMerge on the server runtime
```

```tsx
// app/providers.tsx (Client Component) — same module so the client runtime is configured too
"use client";
import "./lib/jigsaw-theme";
```

`configureTheme({ twMerge })` is equivalent when you only need to set merge today; it exists so future non-CSS theme values can share one config API.

### When to use `ThemeProvider`

`ThemeProvider` is **optional**. Use it only for **nested client-subtree** `twMerge` overrides (interactive islands that need a different merge than the app default). Presentational / RSC-safe class merging should rely on `configureTwMerge`, not context.

Visual light/dark/portfolio theming continues to use `data-theme` (see below) — that is separate from JS merge config.

## 6. Theme switching

Themes are selected with the `data-theme` attribute on `<html>` (or a wrapper element that contains your app).

| `data-theme` value | Result |
|--------------------|--------|
| *(attribute absent)* | Default light (`:root`) |
| `light` | Same as absent — light tokens |
| `dark` | Dark semantic tokens |
| `portfolio` | Portfolio theme (requires portfolio CSS imports) |

Example helper (same behaviour as Storybook's `applyAppTheme`):

```ts
type AppTheme = "light" | "dark" | "portfolio";

export function applyAppTheme(root: HTMLElement, theme: AppTheme | undefined) {
  if (!theme || theme === "light") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", theme);
}

// Usage
applyAppTheme(document.documentElement, "dark");
```

Components that use the `dark:` variant (e.g. `dark:bg-surface-secondary`) respond to descendants of `[data-theme="dark"]` because of the `@custom-variant` rule in `globals.css`.

## 7. Optional portfolio theme

If you use the portfolio theme:

1. Install `@jigsaw-ds/theme-portfolio`.
2. Import its CSS in `layout.tsx` (see step 3).
3. Set `data-theme="portfolio"` on `<html>`.

Portfolio tokens are scoped to `[data-theme='portfolio']` and do not replace the default light/dark sheets.

## Checklist

Before debugging styling issues, confirm:

- [ ] Theme CSS imports are in `layout.tsx`, above `globals.css`
- [ ] `globals.css` imports `tailwindcss`, `@jigsaw-ds/tokens/tailwind-theme.css`, and `@jigsaw-ds/design-system/tailwind.css`
- [ ] `@custom-variant dark` is present if you use dark mode
- [ ] `postcss.config.mjs` includes `@tailwindcss/postcss`
- [ ] Body uses semantic utilities such as `text-foreground-primary bg-surface-primary`

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Components render unstyled | Tailwind not scanning component classes | Ensure `@jigsaw-ds/design-system/tailwind.css` is imported; run `npm run build` in the design-system package if using `file:` deps |
| Colours missing / all black | Theme CSS not loaded | Add imports in `layout.tsx` |
| `dark:` utilities never apply | Missing variant or attribute | Add `@custom-variant dark` and set `data-theme="dark"` |
| Icons missing | Transitive dep not installed | Reinstall `@jigsaw-ds/design-system`; `@phosphor-icons/react` should be present |
| `next build` prerender: `Element type is invalid … got: undefined` on pages using Jigsaw icons | Phosphor root CJS barrel named exports are undefined in the Next SSR webpack graph | Apply the [Next.js + Phosphor](#nextjs--phosphor-icons-ssr) `next.config` settings; ensure `@phosphor-icons/react` is ≥ 2.1 |
| Server Component build fails with `client-only` / `'use client'` when importing from `@jigsaw-ds/design-system` | Root barrel re-exports interactive modules | Switch presentational imports to subpaths (`@jigsaw-ds/design-system/badge`, …). See [Server Components](#server-components). |
| `Cannot find module '@jigsaw-ds/design-system/badge'` (or similar subpath) | App resolves an older published version without subpath `exports`, or local `file:` package was not rebuilt | Upgrade `@jigsaw-ds/design-system` (≥ version that ships subpaths), or rebuild the workspace package (`npm run build --workspace=@jigsaw-ds/design-system`) and reinstall `file:` deps |
| Subpath import resolves but TypeScript cannot find types | IDE/tsconfig still pointing at a stale install | Restart TS server; ensure `moduleResolution` is `bundler` or `node16`+; confirm `node_modules/@jigsaw-ds/design-system/package.json` lists the subpath under `exports` |
| Interactive component imported from a subpath still errors in a Server Component | Accidental import of a client-only helper (hooks / `ThemeProvider`) into the same server module | Keep hooks/providers in Client Components; import only the interactive component subpath (`/button`, `/modal`, …) as a leaf |
| `npm install @jigsaw-ds/...` 404 | Package not published yet | Use local `file:` deps (below) or wait for v1 release |

## Local development without publishing

> `file:` dependencies are for local development and pre-release testing only — use published npm packages in production.

To develop against a local Jigsaw checkout before packages are on npm:

```json
{
  "dependencies": {
    "@jigsaw-ds/design-system": "file:../jigsaw/packages/design-system",
    "@jigsaw-ds/tokens": "file:../jigsaw/packages/tokens",
    "@jigsaw-ds/theme-default": "file:../jigsaw/packages/themes/default"
  }
}
```

Build Jigsaw first so each package has a `dist/` folder:

```bash
cd ../jigsaw
npm install
npm run build
```

Then install in your app:

```bash
cd ../your-app
npm install
```

The `@jigsaw-ds/design-system/tailwind.css` import works the same with `file:` dependencies — build the design-system package first so `dist/` exists.

## Versioning

Published packages follow semver, starting at `0.1.0`. While the API stabilises on `0.x`, minor releases (`0.2.0`, `0.3.0`) may include breaking changes — pin with `~0.1.0` if you need stability. All publishable `@jigsaw-ds/*` packages (design-system, tokens, themes, and theme-build) are always released at the same version.

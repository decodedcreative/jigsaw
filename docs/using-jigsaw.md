# Using Jigsaw in your app

This guide explains how to install Jigsaw packages and wire them into a **Next.js 15 (App Router) + Tailwind CSS v4** application. The reference implementation in this repo is [`apps/web`](../apps/web).

Packages will be published to the [npm registry](https://www.npmjs.com/) under the `@jigsaw` scope. Until the first release is published, use the [local development](#local-development-without-publishing) section at the bottom.

## Packages

| Package | Required | Purpose |
|---------|----------|---------|
| `@jigsaw/design-system` | Yes | React components |
| `@jigsaw/tokens` | Yes | Shared primitives + Tailwind v4 theme CSS |
| `@jigsaw/theme-default` | Yes | Default light/dark semantic colours |
| `@jigsaw/theme-portfolio` | No | Portfolio theme (`[data-theme='portfolio']`) |

`@jigsaw/theme-build` is an internal build tool and is not published.

## Prerequisites

- Node.js >= 20
- React 18 or 19
- Tailwind CSS v4 with `@tailwindcss/postcss`

## 1. Install

```bash
npm install @jigsaw/design-system @jigsaw/tokens @jigsaw/theme-default
```

Add the portfolio theme only if you need it:

```bash
npm install @jigsaw/theme-portfolio
```

Install Tailwind v4 if your app does not already have it:

```bash
npm install tailwindcss @tailwindcss/postcss
```

`@jigsaw/design-system` installs its own runtime dependencies (`react-aria-components`, `@phosphor-icons/react`, `class-variance-authority`, `tailwind-merge`). You must provide `react` and `react-dom` as peers.

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
import "@jigsaw/tokens/shared/base.css";
import "@jigsaw/theme-default/base.css";
import "@jigsaw/theme-default/semantic-light.css";
import "@jigsaw/theme-default/semantic-dark.css";
// Optional portfolio theme:
// import "@jigsaw/theme-portfolio/base.css";
// import "@jigsaw/theme-portfolio/semantic.css";
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

## 4. Tailwind entry (`globals.css`)

```css
@import "tailwindcss";
@import "@jigsaw/tokens/tailwind-theme.css";
@import "@jigsaw/design-system/tailwind.css";

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

`@jigsaw/design-system/tailwind.css` registers Tailwind content paths for the component library. You do not need a separate `@source` directive in your app — the package owns that configuration.

If your app uses Tailwind utilities in its own source files, add an `@source` for your app code (for example `@source "./**/*.{js,ts,jsx,tsx}"` relative to `globals.css`).

## 5. Use components

```tsx
import { Button, Badge, Card, Text } from "@jigsaw/design-system";

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

Import components from `@jigsaw/design-system` only. Do not deep-import from internal paths inside the package.

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

1. Install `@jigsaw/theme-portfolio`.
2. Import its CSS in `layout.tsx` (see step 3).
3. Set `data-theme="portfolio"` on `<html>`.

Portfolio tokens are scoped to `[data-theme='portfolio']` and do not replace the default light/dark sheets.

## Checklist

Before debugging styling issues, confirm:

- [ ] Theme CSS imports are in `layout.tsx`, above `globals.css`
- [ ] `globals.css` imports `tailwindcss`, `@jigsaw/tokens/tailwind-theme.css`, and `@jigsaw/design-system/tailwind.css`
- [ ] `@custom-variant dark` is present if you use dark mode
- [ ] `postcss.config.mjs` includes `@tailwindcss/postcss`
- [ ] Body uses semantic utilities such as `text-foreground-primary bg-surface-primary`

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Components render unstyled | Tailwind not scanning component classes | Ensure `@jigsaw/design-system/tailwind.css` is imported; run `npm run build` in the design-system package if using `file:` deps |
| Colours missing / all black | Theme CSS not loaded | Add imports in `layout.tsx` |
| `dark:` utilities never apply | Missing variant or attribute | Add `@custom-variant dark` and set `data-theme="dark"` |
| Icons missing | Transitive dep not installed | Reinstall `@jigsaw/design-system`; `@phosphor-icons/react` should be present |
| `npm install @jigsaw/...` 404 | Package not published yet | Use local `file:` deps (below) or wait for v1 release |

## Local development without publishing

To develop against a local Jigsaw checkout before packages are on npm:

```json
{
  "dependencies": {
    "@jigsaw/design-system": "file:../jigsaw/packages/design-system",
    "@jigsaw/tokens": "file:../jigsaw/packages/tokens",
    "@jigsaw/theme-default": "file:../jigsaw/packages/themes/default"
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

The `@jigsaw/design-system/tailwind.css` import works the same with `file:` dependencies — build the design-system package first so `dist/` exists.

## Versioning

Published packages will share a single semver (starting at `1.0.0`). Pin with `^1.0.0` in production apps.

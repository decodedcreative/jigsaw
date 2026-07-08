# @jigsaw-ds/tokens

Design tokens for the Jigsaw design system: shared primitives and the Tailwind CSS v4 theme (CSS variables) consumed by `@jigsaw-ds/design-system`.

## Install

```bash
npm install @jigsaw-ds/tokens
```

Usually installed automatically as a dependency of `@jigsaw-ds/design-system`.

## Exports

| Entry | Purpose |
|-------|---------|
| `@jigsaw-ds/tokens` | Token values as JS/TS (ESM + CJS, with types) |
| `@jigsaw-ds/tokens/tailwind-theme.css` | Tailwind v4 `@theme` variables |
| `@jigsaw-ds/tokens/shared/*` | Shared primitive CSS (e.g. `shared/base.css`) |
| `@jigsaw-ds/tokens/css-color` | Color helper utilities |
| `@jigsaw-ds/tokens/docs-tokens` | Token metadata for documentation |

## Usage

In your Tailwind entry CSS:

```css
@import "tailwindcss";
@import "@jigsaw-ds/tokens/tailwind-theme.css";
```

See the full setup guide at [docs/using-jigsaw.md](https://github.com/decodedcreative/jigsaw/blob/main/docs/using-jigsaw.md).

## License

[MIT](./LICENSE) © James Howell

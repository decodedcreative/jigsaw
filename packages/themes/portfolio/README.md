# @jigsaw-ds/theme-portfolio

Portfolio theme (CSS variables) for the Jigsaw design system. Tokens are scoped to `[data-theme="portfolio"]` and layer on top of the default theme rather than replacing it.

## Install

```bash
npm install @jigsaw-ds/theme-portfolio
```

## Usage

Import the theme CSS in your root layout, after the default theme:

```tsx
import "@jigsaw-ds/theme-portfolio/base.css";
import "@jigsaw-ds/theme-portfolio/semantic.css";
```

Then activate it by setting `data-theme="portfolio"` on `<html>` (or a wrapper element).

## Exports

| Entry | Purpose |
|-------|---------|
| `@jigsaw-ds/theme-portfolio/base.css` | Base theme primitives |
| `@jigsaw-ds/theme-portfolio/semantic.css` | Semantic tokens |

See the full setup guide at [docs/using-jigsaw.md](https://github.com/decodedcreative/jigsaw/blob/main/docs/using-jigsaw.md).

## License

[MIT](./LICENSE) © James Howell

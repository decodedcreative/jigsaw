# @jigsaw-ds/theme-default

Default light/dark theme (CSS variables) for the Jigsaw design system.

## Install

```bash
npm install @jigsaw-ds/theme-default
```

## Usage

Import the theme CSS in your root layout, **before** your Tailwind entry file. Load order matters — later sheets override earlier ones where selectors overlap:

1. `@jigsaw-ds/tokens/shared/base.css` (shared primitives)
2. `@jigsaw-ds/theme-default/base.css` (theme base)
3. Semantic sheets (`semantic-light.css`, then `semantic-dark.css`)

```tsx
import "@jigsaw-ds/tokens/shared/base.css";
import "@jigsaw-ds/theme-default/base.css";
import "@jigsaw-ds/theme-default/semantic-light.css";
import "@jigsaw-ds/theme-default/semantic-dark.css";
```

Dark tokens apply under `[data-theme="dark"]`; light tokens are the default (`:root`).

## Exports

| Entry | Purpose |
|-------|---------|
| `@jigsaw-ds/theme-default/base.css` | Base theme primitives |
| `@jigsaw-ds/theme-default/semantic-light.css` | Light semantic tokens |
| `@jigsaw-ds/theme-default/semantic-dark.css` | Dark semantic tokens |

See the full setup guide at [docs/using-jigsaw.md](https://github.com/decodedcreative/jigsaw/blob/main/docs/using-jigsaw.md).

## License

[MIT](./LICENSE) © James Howell

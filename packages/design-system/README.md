# @jigsaw-ds/design-system

React component library for the Jigsaw design system, built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Install

```bash
npm install @jigsaw-ds/design-system @jigsaw-ds/tokens @jigsaw-ds/theme-default
```

`react` and `react-dom` (v18 or v19) are peer dependencies you provide. Runtime dependencies (`react-aria-components`, `@phosphor-icons/react`, `class-variance-authority`, `tailwind-merge`) are installed automatically.

## Usage

### Client components / Vite / Storybook

Import from the package root when the module is already a Client Component:

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

### Server Components (App Router)

Import presentational components from **package subpaths** — not the root barrel.
The root re-exports interactive modules too, which breaks Server Component imports.

```tsx
import { Badge } from "@jigsaw-ds/design-system/badge";
import { Text } from "@jigsaw-ds/design-system/text";
```

Interactive components also have subpaths (for example `@jigsaw-ds/design-system/button`).
Do not deep-import internal `dist/…` files — only documented `exports` subpaths are supported.

Full setup (PostCSS, themes, `configureTwMerge`): see [docs/using-jigsaw.md](../../docs/using-jigsaw.md).

## Setup

See the full setup guide (PostCSS, theme CSS, Tailwind v4 wiring for Next.js) at [docs/using-jigsaw.md](https://github.com/decodedcreative/jigsaw/blob/main/docs/using-jigsaw.md).

## License

[MIT](./LICENSE) © James Howell

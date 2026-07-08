# @jigsaw-ds/design-system

React component library for the Jigsaw design system, built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Install

```bash
npm install @jigsaw-ds/design-system @jigsaw-ds/tokens @jigsaw-ds/theme-default
```

`react` and `react-dom` (v18 or v19) are peer dependencies you provide. Runtime dependencies (`react-aria-components`, `@phosphor-icons/react`, `class-variance-authority`, `tailwind-merge`) are installed automatically.

## Usage

Import components from the package root:

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

Register the library's Tailwind content paths by importing its CSS in your Tailwind entry file:

```css
@import "tailwindcss";
@import "@jigsaw-ds/tokens/tailwind-theme.css";
@import "@jigsaw-ds/design-system/tailwind.css";
```

Do not deep-import from internal paths — the package root is the only supported entry point.

## Setup

See the full setup guide (PostCSS, theme CSS, Tailwind v4 wiring for Next.js) at [docs/using-jigsaw.md](https://github.com/decodedcreative/jigsaw/blob/main/docs/using-jigsaw.md).

## License

[MIT](./LICENSE) © James Howell

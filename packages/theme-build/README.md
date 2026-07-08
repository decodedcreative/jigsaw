# @jigsaw-ds/theme-build

[Style Dictionary](https://styledictionary.com/) build helpers used by the Jigsaw theme packages (`@jigsaw-ds/theme-default`, `@jigsaw-ds/theme-portfolio`) and `@jigsaw-ds/tokens`.

This is a build-time helper for authoring custom themes. Most applications consuming Jigsaw do **not** need it — they import the pre-built CSS from the theme packages instead.

## Install

```bash
npm install -D @jigsaw-ds/theme-build style-dictionary
```

`style-dictionary` (v4) is a peer dependency you provide.

## Usage

```js
import { buildStyleDictionary, toRgbTuple } from "@jigsaw-ds/theme-build";
```

These helpers configure the CSS-variable platform, themed-variable output, and color transforms used to generate theme CSS from token sources.

## What ships

This package publishes plain ESM source (`src/*.mjs`) — there is no compile step. That is intentional: the modules are small build-time helpers consumed by Style Dictionary configs, not runtime app code. Install as a dev dependency alongside `style-dictionary`.

## License

[MIT](./LICENSE) © James Howell

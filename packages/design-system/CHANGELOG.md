# @jigsaw-ds/design-system

## 0.3.0

### Minor Changes

- - feat: per-component subpath exports for RSC (JSW-113)
  - fix: Phosphor SSR icons break apps/web prerender (JSW-114)

### Patch Changes

- Updated dependencies
  - @jigsaw-ds/tokens@0.3.0

## 0.2.1

### Patch Changes

- - chore: lockstep versions across the full publish set
- Updated dependencies
  - @jigsaw-ds/tokens@0.2.1

## 0.2.0

### Minor Changes

- RSC-safe presentational components and theme injection:
  - [JSW-109](https://decodedcreative.atlassian.net/browse/JSW-109) / [#66](https://github.com/decodedcreative/jigsaw/pull/66) — `configureTwMerge` for RSC-safe theme injection
  - [JSW-110](https://decodedcreative.atlassian.net/browse/JSW-110) / [#67](https://github.com/decodedcreative/jigsaw/pull/67) — presentational components no longer require Client Components
  - [JSW-111](https://decodedcreative.atlassian.net/browse/JSW-111) / [#68](https://github.com/decodedcreative/jigsaw/pull/68) — preserve per-module `"use client"` boundaries in the published package

See [using-jigsaw.md — Server Components](../../docs/using-jigsaw.md#server-components) and [Custom `twMerge`](../../docs/using-jigsaw.md#custom-twmerge-app-router--rsc-safe) for App Router / RSC usage (no client wrappers for presentational components; `configureTwMerge` instead of context).

### Patch Changes

- Updated dependencies
  - `@jigsaw-ds/tokens@0.2.0`

## 0.1.0

### Minor Changes

- Initial public npm release

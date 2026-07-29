# @jigsaw-ds/design-system

## 0.1.1

### Patch Changes

- 2018535: Add configureTwMerge / configureTheme for RSC-safe app-wide class-name merge injection, and document ThemeProvider as optional nested client overrides only.
- a83bba5: Migrate presentational components (Badge, Text, Heading, Skeleton, Icon, Card) off theme hooks onto getClassNames so they are RSC-safe.
- cdb9e25: Publish per-module builds so `"use client"` stays on interactive leaves only — RSC-safe presentational imports no longer inherit a package-wide client boundary.
  - @jigsaw-ds/tokens@0.1.1

## 0.1.0

### Minor Changes

- Initial public npm release

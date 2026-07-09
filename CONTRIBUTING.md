# Contributing to Jigsaw

## Incremental rollout workflow

WIP design-system work is preserved on `wip/design-system-overhaul-backup` (commit `0e6c17a`, 373 files). This branch is the **source of truth** for cherry-picking into JSW tickets — do not merge it directly into `main`.

Each JSW ticket produces a focused PR that brings one slice of that WIP back onto `main` in a clean, reviewed state.

### Starting a new JSW ticket

```bash
# 1. Branch from the latest main
git checkout main && git pull
git checkout -b feat/jsw-XX-short-description

# 2. Reference (or cherry-pick files from) the backup branch
git checkout wip/design-system-overhaul-backup -- path/to/relevant/files

# 3. Clean up, adapt, test, commit
# 4. Open a PR targeting main
```

> Tip: you don't have to take files verbatim from the backup. Use it as a reference
> and re-implement cleanly where the original was rough.

### Branch naming

`feat/jsw-XX-short-description` — matches the Jira ticket key.

## Versioning (Changesets)

Published packages (`@jigsaw-ds/*`) are versioned with [Changesets](https://github.com/changesets/changesets). Add a changeset with every PR that changes a publishable package in a way consumers will notice (new components, token renames, theme CSS changes, breaking API changes, etc.).

```bash
# From repo root — interactive prompt
npm run changeset
```

This creates a markdown file under `.changeset/`. Commit it with your PR.

Maintainers merge the **Version packages** PR that CI opens on `main`; the [Release workflow](.github/workflows/release.yml) then runs `npm run release` (`validate:packages` + `changeset publish`) to push to npm. See [docs/publication.md](docs/publication.md#automated-release-jsw-104) for `NPM_TOKEN` setup.

**Current versions:** publishable packages are at `0.1.0` (JSW-103). The first npm publish is triggered by merging a Version packages PR after adding a changeset.

**Linked packages:** `@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` share the same semver (Changesets `fixed` group) — they are always versioned together.

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

## Versioning & releasing

Published packages (`@jigsaw-ds/*`) are versioned with [Changesets](https://github.com/changesets/changesets). **Feature PRs must not include `.changeset/*.md` files** — CI generates them on `main` from package file changes (default **patch** bump).

For a minor or major release, run `npm run release:minor` / `npm run release:major` on `main`, or use the Version packages workflow_dispatch bump input.

**Linked packages:** `@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` share the same semver (Changesets `fixed` group).

Full maintainer flow: [docs/publication.md](docs/publication.md).

CI requires the repository secret `NPM_TOKEN` (npm automation token with publish access to `@jigsaw-ds/*`).

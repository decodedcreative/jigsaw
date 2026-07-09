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

Published packages (`@jigsaw-ds/*`) are versioned with [Changesets](https://github.com/changesets/changesets).

### Contributors

Add a changeset with every PR that changes a publishable package in a way consumers will notice (new components, token renames, theme CSS changes, breaking API changes, etc.).

```bash
# From repo root — interactive prompt
npm run changeset
```

This creates a markdown file under `.changeset/`. Commit it with your PR.

**Linked packages:** `@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` share the same semver (Changesets `fixed` group) — they are always versioned together.

### Releasing to npm

After changeset PRs merge to `main`:

1. The [Version packages workflow](.github/workflows/version-packages.yml) opens a **Version packages** PR when pending changesets exist. It runs `changeset version` to bump `package.json` versions, update internal dependency ranges, and write `CHANGELOG.md` entries.
2. Review and merge the Version packages PR.
3. The [Draft GitHub release workflow](.github/workflows/draft-github-release.yml) opens a **draft** [GitHub Release](https://github.com/decodedcreative/jigsaw/releases) for `v{version}` with notes aggregated from package changelogs. Review and edit the draft on GitHub.
4. **Publish the GitHub Release** — that publishes the release page and triggers the [Publish to npm workflow](.github/workflows/publish-npm.yml) (`validate:packages` then `changeset publish`).

Publishing the GitHub Release is the deliberate gate: npm publish only runs after release notes exist on GitHub.

CI requires the repository secret `NPM_TOKEN` (npm automation token with publish access to `@jigsaw-ds/*`).

To verify a release locally before merge:

```bash
npm run validate:packages
npx changeset publish --dry-run
```

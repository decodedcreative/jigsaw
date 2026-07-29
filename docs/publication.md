# npm publication

Jigsaw packages are published to the [npm registry](https://www.npmjs.com/) under the **`@jigsaw-ds`** organization.

## Publish set

| Package | Description |
|---------|-------------|
| `@jigsaw-ds/design-system` | React components |
| `@jigsaw-ds/tokens` | Shared tokens + Tailwind v4 theme CSS |
| `@jigsaw-ds/theme-default` | Default light/dark theme |
| `@jigsaw-ds/theme-portfolio` | Portfolio theme |
| `@jigsaw-ds/theme-build` | Style Dictionary build helpers (shared by themes/tokens) |

Private / not published:

- `@jigsaw-ds/storybook` — internal Storybook app
- Root `jigsaw` workspace — monorepo orchestration only

`@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` are a Changesets **fixed** group — they always share the same version.

## Versioning

Public packages start at **`0.1.0`**. The API is not yet stable; `0.x` signals that under semver. `1.0.0` is reserved for a later, deliberate stability commitment.

Changesets then drives `0.1.0 → 0.2.0` (minor) / `0.1.1` (patch) from release tags and conventional commits (see below).

Optional prereleases before promoting `latest`:

```bash
npx changeset pre enter alpha   # or beta → 0.1.0-alpha.0, .1, …
npx changeset pre exit          # return to normal releases
```

## License

The repository is MIT licensed (`LICENSE` at the repo root). Each publishable package includes an **identical copy** of that file so npm tarballs satisfy registry licensing requirements. CI (`npm run verify:packages`) asserts every package `LICENSE` matches the root text byte-for-byte.

## Release flow (current)

Feature PRs **do not** include `.changeset/*.md` files. Release metadata is generated on `main` by CI.

```mermaid
flowchart TD
  A[Merge feature PR to main] --> B[Version packages workflow]
  B --> C[Generate changeset from package diffs since last v* tag]
  C --> D[changesets/action opens Version packages PR]
  D --> E[Review and merge Version packages PR]
  E --> F[Draft GitHub release workflow]
  F --> G[Edit and publish GitHub Release]
  G --> H[Publish to npm workflow]
```

### 1. Land consumer-facing package changes on `main`

Open a normal feature PR. Touch files under the publish set as needed. **Do not** run `npm run changeset` and **do not** commit anything under `.changeset/` except `config.json` / `README.md`.

CI fails feature PRs that add hand-written changeset markdown (see [ci.yml](../.github/workflows/ci.yml)).

Prefer [conventional commits](https://www.conventionalcommits.org/) so bump type can be inferred:

| Commit style | Bump |
|--------------|------|
| `feat:` / `feat(scope):` | minor |
| `feat!:` / `fix!:` / `BREAKING CHANGE` | major |
| `fix:`, `perf:`, `refactor:`, `chore:`, … | patch |

### 2. Auto-changeset + Version packages PR

On every push to `main`, [version-packages.yml](../.github/workflows/version-packages.yml):

1. Runs `npm run generate-changeset` ([scripts/generate-changeset-from-changes.mjs](../scripts/generate-changeset-from-changes.mjs))
2. Diffs from the newer of the latest `v*` tag and the latest `chore: version packages` commit → `HEAD`
3. Maps changed files to publishable packages (honouring the design-system/tokens fixed group)
4. Writes a single `.changeset/auto-*.md` when packages changed and no pending changesets already exist
5. Runs [changesets/action](https://github.com/changesets/action), which opens (or updates) a **Version packages** PR that bumps `package.json` versions, internal dependency ranges, and `CHANGELOG.md` files

That baseline choice means merging the Version packages PR does not immediately open another one before a release tag exists.

Review that PR like any other, then merge it.

### 3. Draft GitHub Release

After version bumps land on `main`, [draft-github-release.yml](../.github/workflows/draft-github-release.yml) creates or updates a **draft** [GitHub Release](https://github.com/decodedcreative/jigsaw/releases) for `v{version}` with notes aggregated from package changelogs ([scripts/github-release-notes.mjs](../scripts/github-release-notes.mjs)).

### 4. Publish the GitHub Release → npm

Publishing the GitHub Release is the deliberate gate. That event triggers [publish-npm.yml](../.github/workflows/publish-npm.yml), which:

1. Checks out the release tag
2. Confirms the tag matches `@jigsaw-ds/design-system`’s version
3. Confirms changelog sections exist for that version
4. Runs `npm run release` (`validate:packages` then `changeset publish`)

Requires repository secret `NPM_TOKEN` (npm automation token with publish access to `@jigsaw-ds/*`).

### Local checks

```bash
# After package changes on a branch — optional dry-run of auto-changeset
npm run generate-changeset -- --since v0.1.0 --dry-run

# Before merging a Version packages PR / cutting a release
npm run validate:packages
npx changeset publish --dry-run
```

## npm organization

| Candidate | Result |
|-----------|--------|
| `@jigsaw` | Org already exists (~46 packages, unrelated) |
| `@jsw` | Not available |
| `@jigsaw-ds` | **Claimed** — use this scope |

## Related tickets

Epic [JSW-99](https://decodedcreative.atlassian.net/browse/JSW-99) covered the initial publish pipeline. Auto-changeset generation: [JSW-112](https://decodedcreative.atlassian.net/browse/JSW-112). Consumer install guide: [using-jigsaw.md](./using-jigsaw.md).

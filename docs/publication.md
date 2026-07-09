# npm publication

Jigsaw packages are published to the [npm registry](https://www.npmjs.com/) under the **`@jigsaw-ds`** organization.

## npm organization

| Candidate | Result |
|-----------|--------|
| `@jigsaw` | Org already exists (~46 packages, unrelated) |
| `@jsw` | Not available |
| `@jigsaw-ds` | **Claimed** — use this scope |

## Publish set

These five packages are intended for public npm release:

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

## Versioning

**First publish uses `0.1.0` — never `1.0.0`.** The public API is not yet stable, and `0.x` signals that under semver. `1.0.0` is reserved for a later, deliberate stability commitment.

- Baseline `0.1.0` is set in JSW-103.
- `@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` are a Changesets `fixed` group — always the same version.
- Changesets then drives `0.1.0 → 0.2.0` (minor) / `0.1.1` (patch).

If we want external testing before a `latest`-tagged `0.1.0`, use Changesets prerelease mode to publish under an `alpha`/`beta` dist-tag first:

```bash
npx changeset pre enter alpha   # or beta -> 0.1.0-alpha.0, .1, ...
npx changeset pre exit          # return to normal releases
```

## License

The repository is MIT licensed (`LICENSE` at the repo root). Each publishable package includes an **identical copy** of that file so npm tarballs satisfy registry licensing requirements — there are no per-package exceptions. CI (`npm run verify:packages`) asserts every package `LICENSE` matches the root text byte-for-byte.

## Remaining setup (JSW-103–106)

- [x] Changesets for versioning (see [CONTRIBUTING.md](../CONTRIBUTING.md#versioning-changesets))
- [x] Remove `"private": true` and add publish metadata (`files`, `repository`, etc.)
- [x] Export / tarball integrity check (`npm run verify:packages` in CI)
- [x] Pre-publish validation (`publint`, `@arethetypeswrong/cli`) — `npm run validate:packages` in CI
- [x] GitHub Actions publish workflow + `NPM_TOKEN` — JSW-104
- [ ] Finalize consumer docs in [using-jigsaw.md](./using-jigsaw.md) — JSW-106

See epic [JSW-99](https://decodedcreative.atlassian.net/browse/JSW-99) for the full backlog.

## Automated release (JSW-104)

Releases are driven by [Changesets](https://github.com/changesets/changesets) and the [`.github/workflows/release.yml`](../.github/workflows/release.yml) workflow.

### One-time setup: `NPM_TOKEN`

1. Sign in to [npmjs.com](https://www.npmjs.com/) as a member of the **`@jigsaw-ds`** organisation with permission to publish.
2. Create an **Automation** access token (Account → Access Tokens → Generate New Token → **Granular Access Token** or classic **Automation**).
   - Scope: publish to `@jigsaw-ds/*` packages.
   - **Publish** must not require OTP for CI — use an automation/granular token with bypass 2FA for publish, or disable 2FA on publish for the org bot account.
3. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `NPM_TOKEN`
   - Value: the npm token

The workflow appends scoped registry auth to `.npmrc` at publish time (the committed `.npmrc` only sets `legacy-peer-deps` for local installs).

### Release flow

1. **Contributor** — add a changeset in a feature PR (`npm run changeset`) when a publishable package changes in a consumer-visible way.
2. **Merge to `main`** — the Release workflow runs.
3. **Version PR** — if pending changesets exist, the workflow opens (or updates) a **Version packages** PR that runs `changeset version`, bumps versions, and updates changelogs.
4. **Merge the Version PR** — the workflow runs again; with no pending changesets it executes `npm run release` (`validate:packages` then `changeset publish`) and publishes to npm.

### First publish (`0.1.0`)

Packages are at `0.1.0` in the repo but not yet on the registry (confirmed: `npm view @jigsaw-ds/design-system` returns 404).

**Recommended — publish `0.1.0` without a version bump:**

1. Merge [JSW-104](https://github.com/decodedcreative/jigsaw/pull/63) (release workflow).
2. Add `NPM_TOKEN` (below).
3. GitHub → **Actions** → **Release** → **Run workflow** → check **Publish current package versions without versioning** → Run.
4. Confirm on npm: `npm view @jigsaw-ds/design-system version` → `0.1.0`.

**Alternative — changeset-driven (bumps to `0.1.1`):**

1. Add a changeset (`npm run changeset`) and merge to `main`.
2. Merge the **Version packages** PR the workflow opens.

For a dry run locally (requires npm login or `NPM_TOKEN` in the environment):

```bash
npm run validate:packages
npx changeset publish --dry-run
```

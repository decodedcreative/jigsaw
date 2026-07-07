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

- Baseline `0.1.0` is set in JSW-103 (when `"private": true` is removed); packages sit at `0.0.1` until then.
- `@jigsaw-ds/design-system` and `@jigsaw-ds/tokens` are a Changesets `fixed` group — always the same version.
- Changesets then drives `0.1.0 → 0.2.0` (minor) / `0.1.1` (patch).

If we want external testing before a `latest`-tagged `0.1.0`, use Changesets prerelease mode to publish under an `alpha`/`beta` dist-tag first:

```bash
npx changeset pre enter alpha   # or beta -> 0.1.0-alpha.0, .1, ...
npx changeset pre exit          # return to normal releases
```

## Remaining setup (JSW-103–106)

- [x] Changesets for versioning (see [CONTRIBUTING.md](../CONTRIBUTING.md#versioning-changesets))
- [ ] Remove `"private": true` and add publish metadata (`files`, `repository`, etc.)
- [ ] Pre-publish validation (`publint`, `@arethetypeswrong/cli`)
- [ ] GitHub Actions publish workflow + `NPM_TOKEN`
- [ ] Finalize consumer docs in [using-jigsaw.md](./using-jigsaw.md)

See epic [JSW-99](https://decodedcreative.atlassian.net/browse/JSW-99) for the full backlog.

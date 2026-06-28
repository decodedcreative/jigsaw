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

## Remaining setup (JSW-102–106)

- [ ] Changesets for versioning
- [ ] Remove `"private": true` and add publish metadata (`files`, `repository`, etc.)
- [ ] Pre-publish validation (`publint`, `@arethetypeswrong/cli`)
- [ ] GitHub Actions publish workflow + `NPM_TOKEN`
- [ ] Finalize consumer docs in [using-jigsaw.md](./using-jigsaw.md)

See epic [JSW-99](https://decodedcreative.atlassian.net/browse/JSW-99) for the full backlog.

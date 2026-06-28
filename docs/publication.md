# npm publication — namespace & release

Decision record for [JSW-100](https://decodedcreative.atlassian.net/browse/JSW-100) (npm namespace spike). Part of epic [JSW-99](https://decodedcreative.atlassian.net/browse/JSW-99).

## Recommended decision

**Use the `@jigsaw` scope** — keep existing package names; no rename required ([JSW-101](https://decodedcreative.atlassian.net/browse/JSW-101) can be closed as not needed if org claim succeeds).

| Package | Proposed name | Registry status (2026-06-28) |
|---------|---------------|------------------------------|
| Design system | `@jigsaw/design-system` | Not found (available) |
| Tokens | `@jigsaw/tokens` | Not found (available) |
| Theme build | `@jigsaw/theme-build` | Not found (available) |
| Default theme | `@jigsaw/theme-default` | Not found (available) |
| Portfolio theme | `@jigsaw/theme-portfolio` | Not found (available) |

**Action required (manual):** create the npm organization **`jigsaw`** to reserve the `@jigsaw` scope before first publish. See [Claim the scope](#claim-the-scope) below.

## Registry research

### `@jigsaw` scope

- **0 packages** currently published under `@jigsaw/*` (npm registry search, 2026-06-28).
- All five target package names return **404 Not Found** — names are free once the scope is owned.
- Scoped packages are [private by default](https://docs.npmjs.com/about-scopes/); first publish must use `publishConfig.access: "public"` or `npm publish --access public`.

### Unscoped `jigsaw` (separate from scope)

The unscoped package [`jigsaw@0.1.0`](https://www.npmjs.com/package/jigsaw) is **taken** (published 2013 — unrelated plugin loader). This does **not** block the `@jigsaw/*` scope; only the unscoped name is unavailable.

### Alternatives (if `@jigsaw` org cannot be created)

| Scope | Package name check | Notes |
|-------|-------------------|-------|
| `@decodedcreative` | `@decodedcreative/design-system` — 404 | Matches GitHub org; 0 packages under scope |
| `@jigsaw-ds` | `@jigsaw-ds/design-system` — 404 | More explicit; avoids generic "jigsaw" |
| `@decoded-jigsaw` | `@decoded-jigsaw/design-system` — 404 | Descriptive; longer install paths |

If `@jigsaw` org creation fails (name taken by another npm org), pick one fallback and reopen [JSW-101](https://decodedcreative.atlassian.net/browse/JSW-101) for the rename.

## Claim the scope

1. Log in at [npmjs.com](https://www.npmjs.com/) (use an account tied to the project — e.g. `decodedcreative` team).
2. Open [Create an organization](https://www.npmjs.com/org/create).
3. Organization name: **`jigsaw`** (this reserves `@jigsaw`).
4. Confirm the org dashboard loads at `https://www.npmjs.com/org/jigsaw`.
5. Create a **Granular Access Token** with publish rights for the org (for GitHub Actions `NPM_TOKEN` in [JSW-104](https://decodedcreative.atlassian.net/browse/JSW-104)):
   - Packages and scopes: `@jigsaw/*` (or all packages on the org)
   - Permissions: read and write
6. Record org URL and token storage location in team secrets (do not commit tokens).

If the name `jigsaw` is rejected, try the fallbacks above before renaming packages in the repo.

## `@repo/db` / private packages

**Decision:** `@repo/db` was removed ([JSW-107](https://decodedcreative.atlassian.net/browse/JSW-107)). No private DB package ships with v1. Re-add under `@jigsaw/db` only if Prisma is needed later.

## Publish set (v1)

Five public packages — see [using-jigsaw.md](./using-jigsaw.md) for consumer install docs:

- `@jigsaw/design-system`
- `@jigsaw/tokens`
- `@jigsaw/theme-build`
- `@jigsaw/theme-default`
- `@jigsaw/theme-portfolio`

## Release tooling (planned)

| Ticket | Work |
|--------|------|
| [JSW-102](https://decodedcreative.atlassian.net/browse/JSW-102) | Changesets |
| [JSW-103](https://decodedcreative.atlassian.net/browse/JSW-103) | Make packages publishable |
| [JSW-105](https://decodedcreative.atlassian.net/browse/JSW-105) | Pre-publish validation (publint, attw) |
| [JSW-104](https://decodedcreative.atlassian.net/browse/JSW-104) | Publish CI + `NPM_TOKEN` |
| [JSW-106](https://decodedcreative.atlassian.net/browse/JSW-106) | Maintainer release docs |

Initial version TBD: `1.0.0` vs `0.1.0` (recommend `1.0.0` if API is stable for external use).

## References

- [npm: About scopes](https://docs.npmjs.com/about-scopes/)
- [npm: About organization scopes](https://docs.npmjs.com/about-organization-scopes-and-packages/)
- [npm: Creating an organization](https://www.npmjs.com/org/create)

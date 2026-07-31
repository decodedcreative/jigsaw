# Changesets

Pending release notes for publishable `@jigsaw-ds/*` packages live here briefly during `npm run version-and-tag:*`.

**Do not add changeset files in feature PRs.** Maintainers run `version-and-tag:patch|minor|major` on `main`, which synthesizes an `auto-*.md` file, runs `changeset version`, and opens a version PR. After merge, CI tags `v*` and opens a draft GitHub Release; publishing that release pushes to npm.

See [docs/publication.md](../docs/publication.md).

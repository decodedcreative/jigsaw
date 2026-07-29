# Changesets

Pending release notes for publishable `@jigsaw-ds/*` packages live here briefly during `npm run version-and-tag:*`.

**Do not add changeset files in feature PRs.** Maintainers run `version-and-tag:patch|minor|major` on `main`, which synthesizes an `auto-*.md` file, runs `changeset version`, commits, tags, and pushes to `origin`. Publishing to npm happens when you publish the GitHub Release for that tag.

See [docs/publication.md](../docs/publication.md).

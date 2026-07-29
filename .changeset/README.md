# Changesets

Pending release notes for publishable `@jigsaw-ds/*` packages live here as markdown files.

**Do not add changeset files in feature PRs.** On pushes to `main`, CI runs `npm run generate-changeset` (default **patch**) to create an `auto-*.md` file from package file diffs since the latest release baseline, then [changesets/action](https://github.com/changesets/action) opens the Version packages PR.

For minor/major bumps use `npm run release:minor` / `npm run release:major`, or the Version packages workflow_dispatch input.

See [docs/publication.md](../docs/publication.md) for the full release flow.

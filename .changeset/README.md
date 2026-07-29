# Changesets

Pending release notes for publishable `@jigsaw-ds/*` packages live here as markdown files.

**Do not add changeset files in feature PRs.** On pushes to `main`, CI runs `npm run generate-changeset` (default **patch**). Publishable packages come from `turbo ls` (minus `private` / Changesets `ignore`); changed packages come from `turbo run build --filter=[since] --dry-run=json`, then Changesets `fixed` groups are applied.

For minor/major bumps use `npm run release:minor` / `npm run release:major`, or the Version packages workflow_dispatch input.

See [docs/publication.md](../docs/publication.md) for the full release flow.

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

### Refs

Jigsaw supports React 19 only. Don't use `forwardRef`: add `RefProp<Element>` (from `@jsw-types/component-props`) to the props type, and pass `ref` to the root element that receives `className`. `src/components/ref.test.tsx` renders every component with a ref and fails if it doesn't land on that element, or if a component is missing its `DS_` display name.

### Accessibility unit tests

`packages/design-system/src/components/a11y.test.tsx` runs axe on every component in its main states, including open and expanded ones. A new component folder fails the test until it has an entry there. Rule exceptions live in `src/test-utils/axe.ts` with their reasons; colour contrast is off in jsdom and is checked by the story tests below.

### Console warnings and screen reader phrases

- **Unexpected console output fails the test.** `src/test-setup.ts` fails any unit test that logs a `console.warn` or `console.error` it didn't expect. If a warning is the point of the test, mock it (`vi.spyOn(console, "warn").mockImplementation(() => {})`) and assert on the spy.
- **Screen reader phrases** are pinned in `src/components/announcements.test.tsx`, e.g. `"checkbox, Accept terms, checked"`. Add a case when a component gains a state that changes its markup. Changing an expectation changes what assistive technology users hear, so do it only on purpose.
- **Accessible names:** controls call `useAccessibleNameWarning` (from `@hooks`), which warns in development when the rendered control has no accessible name. New interactive components should use it too; `accessible-name-warning.test.tsx` covers each one.

### Story tests

CI renders every Storybook story in headless Chromium, runs its play function, and runs axe through the a11y addon. Any axe violation fails the check. Run it locally with:

```bash
npx playwright install chromium   # once
npm run test:stories --workspace=@jigsaw-ds/storybook
```

If a story has to accept a violation for now, set `parameters: { a11y: { test: "todo" } }` on that story with a comment linking the JSW ticket that fixes it.

## Versioning & releasing

Published packages (`@jigsaw-ds/*`) are versioned with [Changesets](https://github.com/changesets/changesets) behind a small maintainer script. **Feature PRs must not include `.changeset/*.md` files.** Instead, fill in the PR description's `## Consumer changelog` section: a sentence per change for app developers, `**Breaking:**` for breaking changes, or `None.`. A PR check requires it when a published package changes, and the release script writes those sentences into the changelogs (see [docs/publication.md](docs/publication.md)).

When you are ready to cut a release from `main`:

```bash
npm run version-and-tag:patch   # or :minor / :major
```

That bumps packages on a `chore/version-*` branch and opens a PR. After you merge it, CI creates the `v*` tag and a draft GitHub Release — publishing that release is what publishes to npm.

**Linked packages:** all publishable `@jigsaw-ds/*` packages (`design-system`, `tokens`, `theme-default`, `theme-portfolio`, `theme-build`) share the same semver (Changesets `fixed` group).

Full flow: [docs/publication.md](docs/publication.md). Requires repository secret `NPM_TOKEN`.

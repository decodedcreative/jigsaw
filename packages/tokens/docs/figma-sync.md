# Figma / Tokens Studio sync

Design tokens for Figma are exported from source JSON under `src/tokens/` into **git-tracked** files in `packages/tokens/figma/`. Tokens Studio pulls from this folder via GitHub sync.

**Source of truth:** `src/tokens/` — never edit generated files in `figma/` by hand.

## Folder contents

| File | Purpose |
|------|---------|
| `shared.tokens.json` | Spacing, typography, motion, radius, shadows |
| `default-base.tokens.json` | Default theme palette |
| `default-light.tokens.json` | Default light semantic colours |
| `default-dark.tokens.json` | Default dark semantic colours |
| `portfolio.tokens.json` | Portfolio theme (base + semantic merged) |
| `$themes.json` | Tokens Studio theme → token set mapping (generated) |
| `$metadata.json` | Token set load order (generated) |

Token set names in Tokens Studio match filenames without `.json` (e.g. `shared.tokens.json` → `shared.tokens`).

### Figma variable path segments

Figma rejects dots in variable names (e.g. `spacing/1.5` is invalid). The Figma export rewrites **JSON keys only** at build time: `1.5` → `1-5`, so Tokens Studio exports `spacing/1-5`. Source tokens and Tailwind keep dotted keys (`py-1.5`, `spacing.1.5` in code). Code → Figma mapping: replace `.` with `-` in each path segment.

## Tokens Studio setup (GitHub sync)

Requires **Tokens Studio Pro** for multi-file folder sync and themes.

1. **GitHub PAT** — fine-grained token with **Contents: Read** (add **Read and write** only if pushing changes from Figma back to the repo).
2. In the plugin: **Settings → Sync → GitHub**
3. Configure:

| Field | Value |
|-------|--------|
| Repository | `decodedcreative/jigsaw` |
| Branch | `main` (use a feature branch only while testing a PR) |
| Storage | **Folder** |
| Path | `packages/tokens/figma` |

4. **Pull from remote** on first connect — do not Push until you have confirmed the repo is the source of truth.
5. Open **Themes** — you should see **Default Light**, **Default Dark**, and **Portfolio**.

Docs: [Tokens Studio GitHub sync](https://docs.tokens.studio/token-storage/remote/sync-git-github.md)

### Themes vs token sets in the UI

- **Theme dropdown** — which sets are *active* (checkboxes on the left).
- **Highlighted set in the sidebar** — which set you are *browsing* in the editor. Browsing `default-dark.tokens` while **Default Light** is selected will show dark values in the panel; that is expected.

## Local workflow (code → Figma)

1. Edit token sources under `src/tokens/`.
2. Rebuild exports:

   ```bash
   npm run build:tokens -w @jigsaw/tokens
   ```

   This runs Style Dictionary and regenerates `figma/*.tokens.json`, `$themes.json`, and `$metadata.json`.

3. Verify and check drift:

   ```bash
   npm run verify:figma-tokens -w @jigsaw/tokens
   npm run check:figma-drift -w @jigsaw/tokens
   ```

4. Commit the updated `packages/tokens/figma/` files.
5. In Tokens Studio: **Pull from remote** to load the latest from GitHub.

CI runs the same build, verify, and drift checks on every PR.

`check:figma-drift` requires a git checkout — it compares committed `figma/` to the build output via `git status`.

## After merge

1. In Tokens Studio **Settings → GitHub**, change **Branch** from the feature branch to `main`.
2. **Pull from remote** to sync from the merged default branch.
3. Confirm **Default Light**, **Default Dark**, and **Portfolio** themes still resolve.

## Adding a new theme

Create the source layout under `src/tokens/themes/{id}/` — discovery drives CSS, Figma, `$themes.json`, and `$metadata.json`. Filenames are defined in `discoverFigmaOutputs()` (`scripts/figma/discovery/`); `sd.config.mjs` must stay aligned. See the header comment in `scripts/discover-token-sets/` for export rules.

After adding sources:

```bash
npm run build:tokens -w @jigsaw/tokens
git add packages/tokens/figma/
```

No manual edits to `sd.config.mjs` file lists are required for standard theme shapes.

## Direction of sync (v1)

**One-way: code → Figma.** Designers pull from GitHub after engineers (or the build) update `figma/`. Bi-directional sync (edit in Figma, push to repo) is possible with a write-enabled PAT but is not the default workflow — source JSON in `src/tokens/` should remain authoritative.

## Troubleshooting

| Issue | Check |
|-------|--------|
| Folder not found on pull | Branch pushed? Path exactly `packages/tokens/figma` (no leading `/`)? |
| Themes missing or broken | Pull again after `$themes.json` is on the branch; set names must match filenames |
| CI `check:figma-drift` fails | Run `build:tokens` and commit `figma/` |
| Colours look like RGB tuples in export | Figma platforms must not use the CSS `transformGroup` — see `sd.config.mjs` |

## Agent workflow (code → Figma)

For building components in Figma from code via Cursor + Figma MCP, see [figma-agent-workflow.md](./figma-agent-workflow.md) (JSW-58 pilot).

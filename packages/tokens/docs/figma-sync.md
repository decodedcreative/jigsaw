# Figma / Tokens Studio sync

Design tokens for Figma are exported from source JSON into **git-tracked** files in `packages/tokens/figma/`. Tokens Studio pulls from this folder via GitHub sync.

**Never edit generated files in `figma/` by hand.**

## Source layout

| Source | Path | Figma output |
|--------|------|--------------|
| Shared (spacing, radius, typography, …) | `packages/tokens/src/tokens/shared/` | `shared.tokens.json` |
| Default theme palette + semantics | `packages/themes/default/src/` | `default-base.tokens.json`, `default-light.tokens.json`, `default-dark.tokens.json` |
| Portfolio theme (palette + semantics) | `packages/themes/portfolio/src/` | `portfolio.tokens.json` |

Brand theme **CSS** is built in each `@jigsaw/theme-*` package. `@jigsaw/tokens` only builds shared CSS, Tailwind theme, and **Figma JSON** for all themes (via `discoverFigmaThemes()` reading `packages/themes/{id}/src/`).

Colour JSON must not be duplicated under `packages/tokens/` — theme packages are the single source for brand colours.

## How automatic discovery works

Figma filenames and Tokens Studio manifests are derived from theme package sources — no hand-maintained file lists.

| Step | Module | Role |
|------|--------|------|
| 1 | [`scripts/discover-token-sets/discover-token-sets.mjs`](../scripts/discover-token-sets/discover-token-sets.mjs) | Scans `packages/themes/{id}/src/`, reads semantic mode keys, applies export rules (see module header) |
| 2 | [`scripts/figma/discovery/discover-outputs/discover-outputs.mjs`](../scripts/figma/discovery/discover-outputs/discover-outputs.mjs) | `discoverFigmaOutputs()` — canonical list of `*.tokens.json` filenames and `$themes.json` entries |
| 3 | [`sd.config.mjs`](../sd.config.mjs) | `buildThemeFigmaConfig()` — Style Dictionary sources/globs and destinations; must match step 2 |
| 4 | Post-build scripts in `scripts/figma/` | Write `$themes.json` and `$metadata.json` from discovery output |

Brand theme **CSS** is not built here — each `@jigsaw/theme-*` package runs its own Style Dictionary config. `@jigsaw/tokens` only exports Figma JSON for themes.

## Folder contents (`packages/tokens/figma/`)

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

1. Edit token sources:
   - Shared tokens → `packages/tokens/src/tokens/shared/`
   - Default theme colours → `packages/themes/default/src/`
   - Portfolio theme colours → `packages/themes/portfolio/src/`
2. Rebuild exports:

   ```bash
   npm run build:tokens -w @jigsaw/tokens
   ```

   This runs Style Dictionary and regenerates `figma/*.tokens.json`, `$themes.json`, and `$metadata.json` from the paths above.

3. Verify and check drift:

   ```bash
   npm run verify:figma-tokens -w @jigsaw/tokens
   npm run check:figma-drift -w @jigsaw/tokens
   ```

4. Commit the updated `packages/tokens/figma/` files (if changed).
5. In Tokens Studio: **Pull from remote** to load the latest from GitHub.

CI runs the same build, verify, and drift checks on every PR.

`check:figma-drift` requires a git checkout — it compares committed `figma/` to the build output via `git status`.

## After merge

1. In Tokens Studio **Settings → GitHub**, change **Branch** from the feature branch to `main`.
2. **Pull from remote** to sync from the merged default branch.
3. Confirm **Default Light**, **Default Dark**, and **Portfolio** themes still resolve.

## Adding a new theme

1. Create `packages/themes/{id}/` with `src/base/` and `src/semantic/` JSON (see `@jigsaw/theme-default` or `@jigsaw/theme-portfolio`).
2. Add a CSS build in that package (`sd.config.mjs` + `@jigsaw/theme-build`).
3. Rebuild Figma exports — see [How automatic discovery works](#how-automatic-discovery-works) above. Output names come from `discoverFigmaOutputs()`; Style Dictionary config is in `sd.config.mjs` (`buildThemeFigmaConfig`).

```bash
npm run build:tokens -w @jigsaw/tokens
git add packages/tokens/figma/
```

No manual edits to `sd.config.mjs` file lists are required for standard theme shapes.

## Direction of sync (v1)

**One-way: code → Figma.** Designers pull from GitHub after engineers (or the build) update `figma/`. Bi-directional sync (edit in Figma, push to repo) is possible with a write-enabled PAT but is not the default workflow — source JSON in the paths above should remain authoritative.

## Troubleshooting

| Issue | Check |
|-------|--------|
| Folder not found on pull | Branch pushed? Path exactly `packages/tokens/figma` (no leading `/`)? |
| Themes missing or broken | Pull again after `$themes.json` is on the branch; set names must match filenames |
| CI `check:figma-drift` fails | Run `build:tokens` and commit `figma/` |
| Colours look like RGB tuples in export | Figma platforms must not use the CSS `transformGroup` — see `sd.config.mjs` |
| Token Sets export stuck / **0 of 5 selected** | Themes export covers colours; use Figma MCP for `shared` spacing/radius/font (see [figma-agent-workflow.md](./figma-agent-workflow.md)) |

## Agent workflow (code → Figma)

For building components in Figma from code via Cursor + Figma MCP, see [figma-agent-workflow.md](./figma-agent-workflow.md) (JSW-58 pilot).

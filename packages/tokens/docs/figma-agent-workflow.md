# Figma agent workflow (code → Figma pilot)

Repeatable workflow for building design-system components in Figma from code using Cursor + Figma MCP. Piloted in [JSW-58](https://decodedcreative.atlassian.net/browse/JSW-58) (Button).

**Related:** [figma-sync.md](./figma-sync.md) (Tokens Studio GitHub sync, token formats).

## Canonical file

| Resource | URL |
|----------|-----|
| Jigsaw Design System (Figma) | https://www.figma.com/design/jsctTixEqBq3u3ZuRcFbCv |

Publish the file as a team library via **Assets → Publish** (file-level, not per-component).

## Source of truth (always read first)

| What | Where |
|------|--------|
| Component implementation | `packages/design-system/src/components/{name}/` |
| Variant styles | `{Name}.styles.ts` |
| Storybook reference | `{Name}.stories.tsx` |
| Visual regression | Chromatic (`apps/storybook`) — not local screenshots |
| Figma token JSON | `packages/tokens/figma/` |

Do **not** use Claude Design mockups or ad-hoc frames as reference.

## Phase order

```
0. Discovery     — inventory variants from code; Chromatic stories for parity reference
1. Foundations   — Figma file, Tokens Studio pull, native variables, theme modes
2. Components    — one component set at a time via Figma MCP; bind to variables
3. Parity        — manual or Chromatic spot-check per variant
4. Close-out     — publish library, workflow notes, Jira AC
```

## Phase 0 — Discovery

1. Confirm `packages/tokens/figma/` is on `main` and Tokens Studio pull works ([JSW-57](https://decodedcreative.atlassian.net/browse/JSW-57)).
2. Build a variant matrix from `{Component}.styles.ts` and `{Component}.types.ts` (props → Figma properties).
3. Add missing Storybook stories if Chromatic does not cover all variants (see JSW-58 Button PR).
4. Use Chromatic snapshots as the visual reference board for Phase 3.

## Phase 1 — Figma file and variables

### File setup (Figma MCP)

- Skills: `figma-create-new-file`, `figma-use`, `figma-generate-library`
- Create **Jigsaw Design System** design file; page skeleton: Cover, Getting Started, Foundations, `---`, Components

### Tokens Studio (manual in Figma)

1. **Settings → Sync → GitHub** — repo `decodedcreative/jigsaw`, branch `main`, folder `packages/tokens/figma`
2. **Pull from remote** (do not Push on first connect)
3. Confirm themes: **Default Light**, **Default Dark**, **Portfolio**
4. **Export styles and variables → Themes tab** (Pro):
   - Variables: Color, String, Number, Boolean — all on
   - Styles: all off (first pass)
   - Select all three themes → Export

**Expected collections:**

| Theme group | Figma collection | Modes |
|-------------|------------------|-------|
| Default | `Default` | Default Light, Default Dark |
| Theme | `Theme` | Portfolio |

### Legacy token format

The **Legacy format** badge in Tokens Studio is **expected**. Repo exports use `{ value, type }` JSON (see comment in `packages/tokens/sd.config.mjs`). Do not convert to W3C DTCG during a component pilot.

### Shared primitives (`shared.tokens`)

`shared.tokens` is `"source"` in `$themes.json`, so spacing/radius/typography may **not** export via Themes. Token Sets export can also fail (UI shows **0 of 5 selected**; decimal keys like `spacing/1.5` break Figma variable names).

**Workaround (JSW-58):** create `shared` collection via Figma MCP from `packages/tokens/figma/shared.tokens.json`.

**Naming quirk:** Figma rejects dots in variable names. Map decimal keys with hyphens:

| Token JSON key | Figma variable |
|----------------|----------------|
| `spacing.1.5` | `spacing/1-5` |
| `spacing.2.5` | `spacing/2-5` |

Rem values → px at **16px/rem** when creating FLOAT variables.

### Prerequisites

- Move file out of **Drafts** into a team project before multi-mode export
- Tokens Studio **Pro** for folder sync and Themes export

## Phase 2 — Build component (Figma MCP)

### Skills

Load **`figma-use`** + **`figma-generate-library`** before every `use_figma` call. Pass `skillNames: "figma-use,figma-generate-library"`.

### Rules

1. **Variables before components** — no hardcoded hex, spacing, or radius
2. **Incremental `use_figma` calls** — create variants → `combineAsVariants` → grid layout → states/docs
3. **Variant properties** match code (`variant`, `size`, `disabled`, etc.)
4. **States** (hover, focus-visible) as static frames beside the component set, not always in the variant matrix
5. **42-variant cap** — fine for Button; split component sets if axes exceed ~30 for future components

### Button pilot mapping (reference)

Token paths used (slash-separated, matching Tokens Studio export):

| Variant | Fill | Text | Border |
|---------|------|------|--------|
| primary | `color/interactive/primary` | `color/foreground/inverse` | — |
| secondary | `color/surface/muted` | `color/foreground/primary` | — |
| accent | `color/interactive/accent` | `color/foreground/inverse` | — |
| outline | — | `color/interactive/primary` | `color/border/strong` |
| ghost | — | `color/foreground/secondary` | — |
| destructive | `color/interactive/destructive` | `color/foreground/inverse` | — |
| link | — | `color/interactive/primary` | underline, `borderRadius/sm`, no padding |

| Size | px / py | font | radius | gap |
|------|---------|------|--------|-----|
| sm | `spacing/3`, `spacing/1-5` | `font/size/xs` | `borderRadius/default` | `spacing/1-5` |
| md | `spacing/4`, `spacing/2` | `font/size/sm` | `borderRadius/default` | `spacing/2` |
| lg | `spacing/6`, `spacing/3` | `font/size/base` | `borderRadius/md` | `spacing/2-5` |

Disabled: **50% opacity** on the component (matches `data-[disabled]:opacity-50` in code).

### Publish

**Assets → Publish** (or **Libraries → Publish changes**). Components page as a shared dumping ground is fine for the pilot.

## Phase 3 — Parity check

Compare Figma (**Default Light** mode) to Chromatic stories under **Design System → {Component}**.

For Button: Primary, Secondary, Outline, Sizes, Disabled, Link, Accent, Ghost, Destructive.

## Phase 4 — Close-out

- [ ] Library published and Button insertable from Assets in another file
- [ ] Jira ticket updated with Figma URL and completion note
- [ ] This doc updated if workflow changes

## Prompt template (next component)

```
Build the {Component} component in Figma for JSW-{ticket}.

Source of truth:
- packages/design-system/src/components/{component}/
- Storybook: Design System/{Component}
- Chromatic for visual parity

Prerequisites:
- Jigsaw Design System file: https://www.figma.com/design/jsctTixEqBq3u3ZuRcFbCv
- Variables: Default (Light/Dark), Theme (Portfolio), shared (spacing/radius/font)
- Read packages/tokens/docs/figma-agent-workflow.md

Steps:
1. Inventory variants from {Component}.styles.ts
2. Add Chromatic stories for any missing variants
3. Build component set on Components page via figma-use + figma-generate-library
4. Bind all fills/strokes/padding/radius/typography to variables
5. Add static state frames (hover, focus-visible)
6. Spot-check against Chromatic
```

## Known pitfalls

| Issue | Mitigation |
|-------|------------|
| Tokens Studio **0 of 5 selected** on Token Sets export | Use **Themes** export for colours; MCP for `shared` primitives |
| Only colour variables after Themes export | Expected; add `shared` collection separately |
| `spacing/1.5` invalid in Figma | Use `spacing/1-5` |
| Multi-mode export fails in Drafts | Move file to team project |
| Publish not on right-click component | Publish entire file via Assets / Libraries |
| Legacy format badge | Expected; repo uses legacy JSON intentionally |

## Out of scope (follow-up tickets)

- [JSW-61](https://decodedcreative.atlassian.net/browse/JSW-61) — Code Connect
- [JSW-59](https://decodedcreative.atlassian.net/browse/JSW-59) — Text, TextField, Card
- Repo change to export `shared.tokens` via Themes (enable set in `$themes.json`)

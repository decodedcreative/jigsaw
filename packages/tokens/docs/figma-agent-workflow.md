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
- Create **Jigsaw Design System** design file using the page skeleton below

### Page skeleton (Components vs Pages)

Figma has no real page folders — use **divider pages** and a **`Section / Name`** prefix so the sidebar groups like Storybook (`Design System/*` vs `Examples/*`).

```
Cover
Getting Started
Foundations
--- Components ---
Components / Button
Components / Text
Components / Input
… (one page per primitive — variant matrix + states)
--- Pages ---
Pages / Sign In
… (composed example screens from library instances)
```

| Section | Purpose | Naming | Contents |
|---------|---------|--------|----------|
| **Onboarding** | File intro, token usage | `Cover`, `Getting Started`, `Foundations` | Docs frames only — no component sets |
| **Components** | Publishable primitives | `Components / {Name}` | Component set, matrix labels, states row |
| **Pages** | Example screens | `Pages / {Screen}` | Library instances only — not ad-hoc mocks |

**Agent rules**

- New primitives → `Components / {Name}` under `--- Components ---`
- New example screens → `Pages / {Name}` under `--- Pages ---`
- Divider pages stay named exactly `--- Components ---` and `--- Pages ---`
- Keep **`Components / *`** and **`Pages / *`** pages sorted **A–Z** by full page name (re-insert with `figma.root.insertChild` after adding a page)
- Do **not** put component variant matrices on Pages; do **not** put full screens on Component pages

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

`shared.tokens` is `"source"` in `$themes.json`, so spacing/radius/typography do **not** export via **Themes**. Token Sets export for `shared.tokens` was unreliable in the JSW-58 pilot (UI stuck at **0 of 5 selected** even after hyphenated keys).

**Recommended (pilot-proven):** create or refresh the `shared` collection via **Figma MCP** from `packages/tokens/figma/shared.tokens.json` (spacing, `borderRadius`, `font` — rem → px at **16px/rem** for FLOAT variables). Pull from GitHub in Tokens Studio still keeps the plugin in sync; you do not need a successful Token Sets export for primitives.

**Figma path segments:** the build rewrites dotted JSON keys (`1.5` → `1-5` in `figma/shared.tokens.json`). MCP and Figma variables use `spacing/1-5`; code/Tailwind stay `spacing.1.5` / `py-1.5`. See [figma-sync.md](./figma-sync.md#figma-variable-path-segments).

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
4. **States section is ONE frame** — a single vertical auto-layout frame named `{Component} / States` containing a title TEXT node plus the states row. Never create a separate sibling title frame (e.g. `… / States labels`): Figma draws each frame's name label on canvas, so a title frame placed above the states frame renders on top of the states frame's own name label (recurred on Checkbox and Icon)
5. **Matrix labels** on each component page — row/column captions aligned to the variant grid (variant, size, disabled, etc.) plus a section title; not inside the component set. Place the component set at **`y ≥ 200`** so Figma’s on-canvas component-set name label does not overlap column headers; align column captions to each column’s `variant=*, size=md` **x** and row captions to each row’s vertical centre
6. **42-variant cap** — fine for Button; split component sets if axes exceed ~30 for future components
7. **Never `resize(w, smallHeight)` on auto-layout frames** — `resize()` pins the axis FIXED and clips children (`clipsContent` defaults true). Set `layoutMode` + sizing first, append children, then only `resize()` the counter axis if needed (`layoutSizingVertical = 'HUG'` for vertical frames). Recurred on Input, Sign In, Icon docs frame, and **SearchField / Docs**
8. **Component sets must not clip variants** — after `combineAsVariants`, set `componentSet.clipsContent = false`, re-grid using the **tallest variant per row**, then `resizeWithoutConstraints` to the computed height. `combineAsVariants` defaults to clipping; lg-row bottoms get cut off if the set is too short (SearchField)
9. **States-row instances need a fixed width** — do **not** use `layoutSizingHorizontal = 'HUG'` on component instances in the states row; they collapse to ~40px and text wraps one character per line. Use **`resize(280, …)`** + `layoutSizingHorizontal = 'FIXED'` (match variant matrix width). Parent column: `counterAxisSizingMode = 'FIXED'`, width **280**
10. **Focus-ring wrappers need a wider column** — a focus-visible pad is `instance width + padding + stroke`. If the column is 280px but the pad is 288px+, the ring clips on the right. Size the **column** to `pad.width + pad.strokeWeight * 2`; set `states-row.clipsContent = false`
11. **Docs frames hug content** — `{Component} / Docs` is vertical auto-layout. Never leave at `resize(640, 10)`. After appending title + body text: `primaryAxisSizingMode = 'AUTO'`, `layoutSizingVertical = 'HUG'`, `clipsContent = false`

### Layout validation checklist (run before hand-off)

After building the variant set, states, and docs on each component page:

1. **Variant set** — `clipsContent === false`; set height ≥ bottom of lowest variant; no input/frame children with `clipsContent` + fixed height squashing borders
2. **States row** — each instance **280px** wide (text reads horizontally); focus-visible column fits pad + stroke; `states-row.clipsContent === false`
3. **Docs frame** — height hugs title + body (not ~10px); heading not cut off at baseline
4. **`get_screenshot`** on the component set and `{Component} / States` before Jira close-out

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

**Assets → Publish** (or **Libraries → Publish changes**). Each component lives on its own **Components /** page (variant set + state/docs frames).

## Phase 2b — Example screens (Pages)

Compose screens on **`Pages / {Name}`** from published library instances. Storybook **Examples/** is the layout reference.

1. Desktop frame (e.g. 1440×1024), centred column, `color/surface/default` background
2. **Only library instances** — Card, Input, Button, Text, Link, Checkbox, etc.
3. Add a **`{Screen} / Docs`** frame: Storybook path + note that the screen is a **living example** (revisit when new primitives land, e.g. Icon for OAuth icons, Heading for titles, Form for form chrome)
4. **Card + form:** Figma cannot nest instances inside a Card instance — use an elevated Card instance as backdrop with the form in an absolute overlay (same constraint as Card composition docs)

Example screens are expected to get incremental updates as the library grows; they are not blocked on every backlog component ticket.

## Phase 3 — Parity check

Compare Figma (**Default Light** mode) to Chromatic stories under **Design System → {Component}**.

For Button: Primary, Secondary, Outline, Sizes, Disabled, Link, Accent, Ghost, Destructive.

## Phase 4 — Close-out

- [x] Library published and Button insertable from Assets in another file
- [x] Jira ticket updated with Figma URL and completion note
- [x] This doc updated if workflow changes

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
3. Build component set on **Components / {Component}** via figma-use + figma-generate-library
4. Bind all fills/strokes/padding/radius/typography to variables
5. Add matrix labels (row/column captions for variant axes) and a single vertical
   `{Component} / States` frame (title text inside — no separate title frame)
6. Run the layout validation checklist (variant set clipping, states instance width,
   focus-ring column width, docs frame HUG height)
7. Spot-check against Chromatic (get_screenshot on set + states)

Layout safety: never resize() the primary axis of an auto-layout frame —
use HUG sizing after appending children (see Known pitfalls).
```

## Known pitfalls

| Issue | Mitigation |
|-------|------------|
| Tokens Studio **0 of 5 selected** on Token Sets export | Use **Themes** for colours; **MCP** for `shared` primitives (don't block on Token Sets) |
| Only colour variables after Themes export | Expected; add `shared` via MCP |
| `spacing/1.5` invalid in Figma | Build exports `1-5`; MCP uses hyphenated paths |
| Multi-mode export fails in Drafts | Move file to team project |
| Publish not on right-click component | Publish entire file via Assets / Libraries |
| Legacy format badge | Expected; repo uses legacy JSON intentionally |
| Cannot append instances inside Card (or other) instances | Example screens: Card backdrop + absolute form overlay; or composition frames like Card / Composition |
| `resize(w, 10)` collapses auto-layout height (recurred: Input grid, Sign In form, Icon docs frame, **SearchField / Docs**) | Never `resize()` the primary axis of an auto-layout frame — it pins it FIXED and clips content. Set `layoutSizingVertical = 'HUG'` (vertical) / `layoutSizingHorizontal = 'HUG'` (horizontal) after appending children |
| Separate title frame overlaps the states frame's on-canvas name label (recurred: Checkbox, Icon) | One vertical `{Component} / States` frame with the title TEXT inside it — never a sibling `… / States labels` frame |
| Variant matrix bottoms clipped after `combineAsVariants` (recurred: **SearchField** lg/md row) | `componentSet.clipsContent = false`; re-grid with per-row max height; `resizeWithoutConstraints` to full grid height |
| States instances squashed to ~40px, text stacks vertically (recurred: **SearchField**) | Instances in states row: `resize(280, …)` + `layoutSizingHorizontal = 'FIXED'` — never HUG width on instances |
| Focus-visible ring clipped on right (recurred: **SearchField**) | Focus column width = pad width + stroke×2; `states-row.clipsContent = false` |
| `combineAsVariants` squashes variant height to ~10px | On each variant + nested `input` frames: `layoutSizingVertical = 'HUG'`, `primaryAxisSizingMode = 'AUTO'`, `clipsContent = false` on inputs |

## Out of scope (follow-up tickets)

- [JSW-61](https://decodedcreative.atlassian.net/browse/JSW-61) — Code Connect
- [JSW-62](https://decodedcreative.atlassian.net/browse/JSW-62) — remaining component migration (one ticket per component)
- Repo change to export `shared.tokens` via Themes (enable set in `$themes.json`) — optional; Token Sets export works after hyphenated Figma keys

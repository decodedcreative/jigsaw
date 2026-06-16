# Automated PR review (GitHub Actions)

Staff-level automated code review on pull requests using **OpenAI** (default) or Anthropic. Posts a summary comment and inline feedback on changed files.

**Ticket:** [JSW-93](https://decodedcreative.atlassian.net/browse/JSW-93) · Thorough mode: [JSW-96](https://decodedcreative.atlassian.net/browse/JSW-96)

## How it works

1. Workflow `.github/workflows/pr-review.yml` runs on `pull_request` (`opened`, `synchronize`, `reopened`).
2. Script `.github/scripts/pr-review/review.mjs` fetches the PR diff via GitHub API.
3. The model reviews the diff with a Jigsaw-specific Staff engineer prompt.
4. Valid inline comments are posted as a single PR review (`event: COMMENT`).

Advisory only — does not block merge.

## Setup

### Repository secret

| Secret | Required | Description |
|--------|----------|-------------|
| `OPENAI_API_KEY` | Yes (default) | OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys) |

Add under **Settings → Secrets and variables → Actions → New repository secret**.

> **Note:** ChatGPT Plus and Claude Code subscriptions are separate from API billing. This workflow uses the **OpenAI API** (pay-as-you-go credits on your OpenAI account), not the ChatGPT web app directly.

`GITHUB_TOKEN` is provided automatically; the workflow requests `pull-requests: write`.

### Optional repository variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PR_REVIEW_PROVIDER` | `openai` | `openai` or `anthropic` |
| `PR_REVIEW_MODEL` | `gpt-4o` (OpenAI) / `claude-sonnet-4-20250514` (Anthropic) | Model ID for the chosen provider |
| `PR_REVIEW_MAX_FEEDBACK_ROUNDS` | `2` | Full feedback rounds before switching to critical-only scans |
| `PR_REVIEW_REPLY_ON_ADDRESS` | `true` | Reply on prior inline threads when nearby lines change on push |

To use Claude instead, set `PR_REVIEW_PROVIDER` to `anthropic` and add `ANTHROPIC_API_KEY`.

## Behaviour

- **Skips:** draft PRs, fork PRs (no secrets on untrusted forks)
- **Path filters:** `package-lock.json`, generated `packages/tokens/figma/*.json`, snapshots, `dist/`, etc. (see `.github/scripts/pr-review/lib/config.mjs`)
- **Limits (default):** 40 files, ~150k chars of diff, max 25 inline comments
- **Thorough mode:** add label `pr-review:thorough` to relax all caps (see below)
- **Re-runs:** each push triggers a review run; round policy below limits noise
- **Feedback rounds** (default `PR_REVIEW_MAX_FEEDBACK_ROUNDS=2`):

| Round | Mode | Behaviour |
|-------|------|-----------|
| 1 | Initial | Full review — blockers, suggestions, nits (up to 15 inline comments) |
| 2 | Follow-up | New changes only; prior review context supplied; no repeating old feedback (up to 8) |
| 3+ | Critical | Blockers only on every push; **no review posted** if all clear |

The model still runs on round 3+ to scan for critical issues, but skips posting when none are found.

### Thorough mode (`pr-review:thorough`)

For large or high-risk PRs (migrations, cross-cutting refactors, many files), add the GitHub label **`pr-review:thorough`** to the pull request. This opts into a relaxed review profile:

| Setting | Default | Thorough |
|---------|---------|----------|
| Files per run | 40 | All reviewable files |
| Diff size | ~150k chars | No cap |
| Per-file patch truncation | 12k chars | No truncation |
| Inline comments | 15 / 8 / 5 by round | No cap |
| Feedback rounds | 2, then critical-only | Full follow-up continues (no critical-only switch) |

Path filters (lockfiles, generated assets, etc.) still apply. Default PRs are unchanged.

**Tailwind v4:** The review prompt includes canonical v3→v4 utility renames (`outline-hidden`, `bg-linear-to-*`, `data-disabled:`, etc.) so the bot does not flag intentional migration changes as blockers.

**When to use:**

- Cross-cutting refactors spanning multiple packages (`design-system`, `tokens`, `apps/*`)
- Major dependency upgrades (e.g. Tailwind v4, React major versions)
- Token pipeline or theme changes that ripple through many components
- Tailwind/className migrations across the monorepo
- Any PR touching **30+ meaningful files** where default caps would drop coverage

**When not to use:** Small, focused PRs — default mode is faster and cheaper.

**Cost note:** Thorough runs use more API tokens and may post more inline comments.

- **Address replies:** on follow-up pushes, the bot replies on prior inline threads when **that push** touches nearby lines (via `github.event.before`…`after` compare). Replies include commit subject(s) and a diff snippet. Skips threads you already replied to manually. Disable with `PR_REVIEW_REPLY_ON_ADDRESS=false`.

### Replying to review comments manually with `gh`

Automated address replies run first on each push. You can still reply yourself to document fixes in more detail:

List bot inline comments:

```bash
gh api repos/decodedcreative/jigsaw/pulls/48/comments \
  --jq '.[] | select(.user.login == "github-actions[bot]") | {id, path, line, body: .body[0:80]}'
```

Reply in the thread (use the comment `id` as `in_reply_to`):

```bash
SHA=$(gh api repos/decodedcreative/jigsaw/pulls/48 --jq .head.sha)

gh api repos/decodedcreative/jigsaw/pulls/48/comments --method POST \
  -f commit_id="$SHA" \
  -F in_reply_to=COMMENT_ID \
  -f body="Addressed in COMMIT_SHA — brief note on what changed."
```

View threads on the PR: `gh pr view 48 --web` → **Files changed** → inline discussions.

## Local dry run

```bash
export GITHUB_TOKEN="ghp_..."
export OPENAI_API_KEY="sk-..."
export GITHUB_REPOSITORY="decodedcreative/jigsaw"
export PR_NUMBER=48

node .github/scripts/pr-review/review.mjs
```

## Integration choice

**v1: OpenAI Chat Completions API** (default) — JSON mode, works with an OpenAI API key; good fit if you already have OpenAI billing set up.

**Alternative:** `PR_REVIEW_PROVIDER=anthropic` + `ANTHROPIC_API_KEY` for Claude.

**Future:** Cursor SDK (`@cursor/sdk`) cloud agent for deeper repo-aware reviews.

## Disable

Remove or disable `.github/workflows/pr-review.yml`, or delete the API key secret.

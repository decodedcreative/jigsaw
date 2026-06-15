# Automated PR review (GitHub Actions)

Staff-level automated code review on pull requests using **OpenAI** (default) or Anthropic. Posts a summary comment and inline feedback on changed files.

**Ticket:** [JSW-93](https://decodedcreative.atlassian.net/browse/JSW-93)

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
- **Limits:** 40 files, ~150k chars of diff, max 25 inline comments
- **Re-runs:** each push triggers a review run; round policy below limits noise
- **Feedback rounds** (default `PR_REVIEW_MAX_FEEDBACK_ROUNDS=2`):

| Round | Mode | Behaviour |
|-------|------|-----------|
| 1 | Initial | Full review — blockers, suggestions, nits (up to 15 inline comments) |
| 2 | Follow-up | New changes only; prior review context supplied; no repeating old feedback (up to 8) |
| 3+ | Critical | Blockers only on every push; **no review posted** if all clear |

The model still runs on round 3+ to scan for critical issues, but skips posting when none are found.

- **Address replies:** from round 2 onward, when a push modifies lines near a prior bot inline comment, the bot posts a threaded reply: _Likely addressed in `<sha>`_ (disable with `PR_REVIEW_REPLY_ON_ADDRESS=false`).

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

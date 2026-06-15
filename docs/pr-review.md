# Automated PR review (GitHub Actions)

Staff-level automated code review on pull requests using Claude via the Anthropic API. Posts a summary comment and inline feedback on changed files.

**Ticket:** [JSW-93](https://decodedcreative.atlassian.net/browse/JSW-93)

## How it works

1. Workflow `.github/workflows/pr-review.yml` runs on `pull_request` (`opened`, `synchronize`, `reopened`).
2. Script `.github/scripts/pr-review/review.mjs` fetches the PR diff via GitHub API.
3. Claude reviews the diff with a Jigsaw-specific Staff engineer prompt.
4. Valid inline comments are posted as a single PR review (`event: COMMENT`).

Advisory only — does not block merge.

## Setup

### Repository secret

| Secret | Required | Description |
|--------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key with Messages API access |

Add under **Settings → Secrets and variables → Actions → New repository secret**.

`GITHUB_TOKEN` is provided automatically; the workflow requests `pull-requests: write`.

### Optional repository variable

| Variable | Default | Description |
|----------|---------|-------------|
| `PR_REVIEW_MODEL` | `claude-sonnet-4-20250514` | Anthropic model ID |

## Behaviour

- **Skips:** draft PRs, fork PRs (no secrets on untrusted forks)
- **Path filters:** `package-lock.json`, generated `packages/tokens/figma/*.json`, snapshots, `dist/`, etc. (see `.github/scripts/pr-review/lib/config.mjs`)
- **Limits:** 40 files, ~150k chars of diff, max 25 inline comments
- **Re-runs:** each push posts a new review (historical reviews remain)

## Local dry run

```bash
export GITHUB_TOKEN="ghp_..."
export ANTHROPIC_API_KEY="sk-ant-..."
export GITHUB_REPOSITORY="decodedcreative/jigsaw"
export PR_NUMBER=47

node .github/scripts/pr-review/review.mjs
```

## Integration choice

**v1: Anthropic Claude API** — structured JSON output, predictable inline comment posting, no agent runtime in CI.

**Future:** Cursor SDK (`@cursor/sdk`) cloud agent for deeper repo-aware reviews; evaluate cost/latency vs this workflow.

## Disable

Remove or disable `.github/workflows/pr-review.yml`, or delete the `ANTHROPIC_API_KEY` secret.

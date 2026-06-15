import { extractHunkSnippet } from "./hunk.mjs";

export const ADDRESS_REPLY_MARKER = "<!-- jigsaw-review-addressed -->";

const BOT_LOGINS = new Set(["github-actions[bot]"]);

/**
 * @param {string | undefined} patch
 * @param {number} targetLine
 * @param {number} [radius]
 */
export function wasLineTouched(patch, targetLine, radius = 2) {
  if (!patch || !Number.isFinite(targetLine)) return false;

  let newLine = 0;

  const isNear = (line) => Math.abs(line - targetLine) <= radius;

  for (const row of patch.split("\n")) {
    if (row.startsWith("@@")) {
      const match = row.match(/\+(\d+)(?:,\d+)?/);
      if (match) newLine = Number.parseInt(match[1], 10);
      continue;
    }

    if (row.startsWith("---") || row.startsWith("+++")) continue;

    if (row.startsWith("+") || row.startsWith("-")) {
      if (isNear(newLine)) return true;
    }

    if (row.startsWith("+") || row.startsWith(" ")) {
      newLine += 1;
    }
  }

  return false;
}

/**
 * @param {Array<{ id: number; in_reply_to_id?: number; user?: { login?: string }; body?: string }>} comments
 */
export function parentsWithAddressedReply(comments) {
  const parents = new Set();

  for (const comment of comments) {
    if (
      comment.in_reply_to_id &&
      BOT_LOGINS.has(comment.user?.login ?? "") &&
      comment.body?.includes(ADDRESS_REPLY_MARKER)
    ) {
      parents.add(comment.in_reply_to_id);
    }
  }

  return parents;
}

/**
 * @param {Array<{ in_reply_to_id?: number; user?: { login?: string } }>} comments
 */
export function parentsWithHumanReply(comments) {
  const parents = new Set();

  for (const comment of comments) {
    if (
      comment.in_reply_to_id &&
      !BOT_LOGINS.has(comment.user?.login ?? "")
    ) {
      parents.add(comment.in_reply_to_id);
    }
  }

  return parents;
}

/**
 * @param {{
 *   shortSha: string;
 *   commitMessages: string[];
 *   patch?: string;
 *   line?: number;
 *   originalFeedback?: string;
 * }} input
 */
export function buildAddressedReplyBody(input) {
  const { shortSha, commitMessages, patch, line, originalFeedback } = input;
  const lines = [
    ADDRESS_REPLY_MARKER,
    "",
    `✅ **Addressed in \`${shortSha}\`** — this feedback thread was touched by the latest push.`,
  ];

  if (commitMessages.length > 0) {
    lines.push("", "**Commit(s):**");
    for (const message of commitMessages.slice(0, 3)) {
      lines.push(`- ${message}`);
    }
    if (commitMessages.length > 3) {
      lines.push(`- _+${commitMessages.length - 3} more_`);
    }
  }

  if (originalFeedback) {
    const summary = originalFeedback
      .replace(/\*\*/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 160);
    if (summary) {
      lines.push("", `**Re:** ${summary}${summary.length >= 160 ? "…" : ""}`);
    }
  }

  const snippet =
    patch && line != null ? extractHunkSnippet(patch, line) : null;
  if (snippet) {
    lines.push("", "**Diff snippet:**", "```diff", snippet, "```");
  }

  return lines.join("\n");
}

/**
 * @param {Array<{ id: number; path: string; line?: number; original_line?: number; in_reply_to_id?: number; user?: { login?: string }; body?: string }>} comments
 * @param {Array<{ filename: string; patch?: string }>} pushFiles
 * @param {string} headSha
 * @param {string[]} [commitMessages]
 */
export function findCommentsToAcknowledge(
  comments,
  pushFiles,
  headSha,
  commitMessages = [],
) {
  const patches = new Map(pushFiles.map((file) => [file.filename, file.patch]));
  const alreadyReplied = parentsWithAddressedReply(comments);
  const humanReplied = parentsWithHumanReply(comments);
  const shortSha = headSha.slice(0, 7);
  const toReply = [];

  for (const comment of comments) {
    if (comment.in_reply_to_id) continue;
    if (!BOT_LOGINS.has(comment.user?.login ?? "")) continue;
    if (alreadyReplied.has(comment.id)) continue;
    if (humanReplied.has(comment.id)) continue;
    if (!comment.body || comment.body.includes(ADDRESS_REPLY_MARKER)) continue;

    const line = comment.line ?? comment.original_line;
    const patch = patches.get(comment.path);
    if (!wasLineTouched(patch, line)) continue;

    toReply.push({
      commentId: comment.id,
      path: comment.path,
      line,
      body: buildAddressedReplyBody({
        shortSha,
        commitMessages,
        patch,
        line,
        originalFeedback: comment.body,
      }),
    });
  }

  return toReply;
}

/**
 * @param {string | undefined} value
 */
export function isAddressReplyEnabled(
  value = process.env.PR_REVIEW_REPLY_ON_ADDRESS,
) {
  if (value === undefined || value === "") return true;
  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

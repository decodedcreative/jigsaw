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
 * @param {Array<{ id: number; path: string; line?: number; original_line?: number; in_reply_to_id?: number; user?: { login?: string }; body?: string }>} comments
 * @param {Array<{ filename: string; patch?: string }>} files
 * @param {string} headSha
 */
export function findCommentsToAcknowledge(comments, files, headSha) {
  const patches = new Map(files.map((file) => [file.filename, file.patch]));
  const alreadyReplied = parentsWithAddressedReply(comments);
  const shortSha = headSha.slice(0, 7);
  const toReply = [];

  for (const comment of comments) {
    if (comment.in_reply_to_id) continue;
    if (!BOT_LOGINS.has(comment.user?.login ?? "")) continue;
    if (alreadyReplied.has(comment.id)) continue;
    if (!comment.body || comment.body.includes(ADDRESS_REPLY_MARKER)) continue;

    const line = comment.line ?? comment.original_line;
    const patch = patches.get(comment.path);
    if (!wasLineTouched(patch, line)) continue;

    toReply.push({
      commentId: comment.id,
      path: comment.path,
      line,
      body: `${ADDRESS_REPLY_MARKER}\n\n✅ **Likely addressed** in \`${shortSha}\` — this line or nearby code changed in the latest push.`,
    });
  }

  return toReply;
}

/**
 * @param {string | undefined} value
 */
export function isAddressReplyEnabled(value = process.env.PR_REVIEW_REPLY_ON_ADDRESS) {
  if (value === undefined || value === "") return true;
  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

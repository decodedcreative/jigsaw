import {
  findCommentsToAcknowledge,
  isAddressReplyEnabled,
} from "./lib/addressed.mjs";
import {
  fetchPullReviewComments,
  replyToReviewComment,
} from "./lib/github.mjs";

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 * @param {Array<{ filename: string; patch?: string }>} files
 * @param {string} headSha
 * @param {number} priorStaffReviewCount
 */
export async function acknowledgeAddressedComments(
  token,
  repo,
  pullNumber,
  files,
  headSha,
  priorStaffReviewCount,
) {
  if (!isAddressReplyEnabled()) {
    console.log("Address replies disabled (PR_REVIEW_REPLY_ON_ADDRESS).");
    return 0;
  }

  if (priorStaffReviewCount < 1) {
    return 0;
  }

  const comments = await fetchPullReviewComments(token, repo, pullNumber);
  const toReply = findCommentsToAcknowledge(comments ?? [], files, headSha);

  if (toReply.length === 0) {
    console.log("No prior inline comments to acknowledge.");
    return 0;
  }

  for (const reply of toReply) {
    await replyToReviewComment(token, repo, reply.commentId, reply.body);
    console.log(`Replied on ${reply.path}:${reply.line} (comment ${reply.commentId})`);
  }

  return toReply.length;
}

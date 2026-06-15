import {
  findCommentsToAcknowledge,
  isAddressReplyEnabled,
} from "./addressed.mjs";
import {
  fetchPullReviewComments,
  fetchPushCommitMessages,
  fetchPushDiffFiles,
  replyToReviewComment,
} from "./github.mjs";

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 * @param {string | undefined} beforeSha
 * @param {string} afterSha
 * @param {number} priorStaffReviewCount
 */
export async function acknowledgeAddressedComments(
  token,
  repo,
  pullNumber,
  beforeSha,
  afterSha,
  priorStaffReviewCount,
) {
  if (!isAddressReplyEnabled()) {
    console.log("Address replies disabled (PR_REVIEW_REPLY_ON_ADDRESS).");
    return 0;
  }

  if (priorStaffReviewCount < 1) {
    return 0;
  }

  const [comments, pushFiles, commitMessages] = await Promise.all([
    fetchPullReviewComments(token, repo, pullNumber),
    fetchPushDiffFiles(token, repo, beforeSha, afterSha),
    fetchPushCommitMessages(token, repo, beforeSha, afterSha),
  ]);

  const toReply = findCommentsToAcknowledge(
    comments ?? [],
    pushFiles,
    afterSha,
    commitMessages,
  );

  if (toReply.length === 0) {
    console.log("No prior inline comments to acknowledge on this push.");
    return 0;
  }

  for (const reply of toReply) {
    await replyToReviewComment(
      token,
      repo,
      pullNumber,
      afterSha,
      reply.commentId,
      reply.body,
    );
    console.log(
      `Replied on ${reply.path}:${reply.line} (comment ${reply.commentId})`,
    );
  }

  return toReply.length;
}

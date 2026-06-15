import { REVIEW_MARKER } from "./config.mjs";

/** @typedef {'initial' | 'followup' | 'critical'} ReviewMode */

const BOT_LOGINS = new Set(["github-actions[bot]"]);

/**
 * @param {number} [value]
 */
export function getMaxFeedbackRounds(value = Number(process.env.PR_REVIEW_MAX_FEEDBACK_ROUNDS)) {
  const rounds = Number.isFinite(value) ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(rounds) || rounds < 1) return 2;
  return rounds;
}

/**
 * @param {number} priorStaffReviewCount
 * @param {number} [maxFeedbackRounds]
 * @returns {ReviewMode}
 */
export function getReviewMode(priorStaffReviewCount, maxFeedbackRounds = getMaxFeedbackRounds()) {
  if (priorStaffReviewCount < 1) return "initial";
  if (priorStaffReviewCount < maxFeedbackRounds) return "followup";
  return "critical";
}

/**
 * @param {ReviewMode} mode
 */
export function getMaxCommentsForMode(mode) {
  if (mode === "initial") return 15;
  if (mode === "followup") return 8;
  return 5;
}

/**
 * @param {Array<{ user?: { login?: string }; body?: string }>} reviews
 */
export function countPriorStaffReviews(reviews) {
  return reviews.filter(
    (review) =>
      BOT_LOGINS.has(review.user?.login ?? "") &&
      typeof review.body === "string" &&
      review.body.includes(REVIEW_MARKER),
  ).length;
}

/**
 * @param {Array<{ user?: { login?: string }; body?: string; submitted_at?: string }>} reviews
 */
export function getLatestStaffReviewSummary(reviews) {
  const staffReviews = reviews
    .filter(
      (review) =>
        BOT_LOGINS.has(review.user?.login ?? "") &&
        typeof review.body === "string" &&
        review.body.includes(REVIEW_MARKER),
    )
    .sort((a, b) => {
      const aTime = a.submitted_at ? Date.parse(a.submitted_at) : 0;
      const bTime = b.submitted_at ? Date.parse(b.submitted_at) : 0;
      return bTime - aTime;
    });

  const latest = staffReviews[0]?.body;
  if (!latest) return null;

  return latest
    .replace(REVIEW_MARKER, "")
    .replace(/_Automated review \(.*?\)\. Not a substitute for human review\._/g, "")
    .trim()
    .slice(0, 2500);
}

/**
 * @param {Array<{ severity: string }>} comments
 * @param {ReviewMode} mode
 */
export function filterCommentsForMode(comments, mode) {
  if (mode !== "critical") return comments;
  return comments.filter((comment) => comment.severity === "blocker");
}

/**
 * @param {ReviewMode} mode
 * @param {number} roundNumber
 * @param {number} maxFeedbackRounds
 */
export function roundLabel(mode, roundNumber, maxFeedbackRounds) {
  if (mode === "critical") {
    return `_Round ${roundNumber} — critical scan only (feedback rounds capped at ${maxFeedbackRounds})._`;
  }
  if (mode === "followup") {
    return `_Round ${roundNumber} of ${maxFeedbackRounds} feedback rounds — follow-up on new changes only._`;
  }
  return `_Round ${roundNumber} of ${maxFeedbackRounds} feedback rounds._`;
}

import { REVIEW_MARKER } from "./config.mjs";
import { THOROUGH_LABEL } from "./review-profile.mjs";

/** @typedef {'initial' | 'followup' | 'critical'} ReviewMode */

export { getMaxFeedbackRounds } from "./review-profile.mjs";

const BOT_LOGINS = new Set(["github-actions[bot]"]);

/**
 * @param {number} priorStaffReviewCount
 * @param {import('./review-profile.mjs').ReviewProfile} profile
 * @returns {ReviewMode}
 */
export function getReviewMode(priorStaffReviewCount, profile) {
  if (priorStaffReviewCount < 1) return "initial";
  if (profile.keepFullFeedbackRounds) return "followup";
  if (priorStaffReviewCount < profile.maxFeedbackRounds) return "followup";
  return "critical";
}

/**
 * @param {ReviewMode} mode
 * @param {import('./review-profile.mjs').ReviewProfile} profile
 */
export function getMaxCommentsForMode(mode, profile) {
  return profile.maxCommentsByMode[mode];
}

/**
 * @param {ReviewMode} mode
 * @param {import('./review-profile.mjs').ReviewProfile} profile
 */
export function getEffectiveMaxComments(mode, profile) {
  return Math.min(profile.maxInlineComments, getMaxCommentsForMode(mode, profile));
}

/**
 * @param {{
 *   repo: string;
 *   pullNumber: number;
 *   provider: string;
 *   profile: import('./review-profile.mjs').ReviewProfile;
 *   mode: ReviewMode;
 *   roundNumber: number;
 *   maxComments: number;
 *   thoroughLabelActive: boolean;
 * }} ctx
 */
export function formatReviewRunLog(ctx) {
  const maxInline = Number.isFinite(ctx.maxComments) ? ctx.maxComments : "uncapped";
  const maxRounds = Number.isFinite(ctx.profile.maxFeedbackRounds)
    ? ctx.profile.maxFeedbackRounds
    : "uncapped";
  const labelState = ctx.thoroughLabelActive ? "present" : "absent";

  return `Reviewing ${ctx.repo}#${ctx.pullNumber} via ${ctx.provider} — profile=${ctx.profile.name}, mode=${ctx.mode}, round=${ctx.roundNumber}, maxFeedbackRounds=${maxRounds}, maxInlineComments=${maxInline}, ${THOROUGH_LABEL} label=${labelState}`;
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
 * @param {import('./review-profile.mjs').ReviewProfile} profile
 */
export function roundLabel(mode, roundNumber, profile) {
  if (profile.name === "thorough") {
    if (mode === "initial") {
      return `_Thorough review — round ${roundNumber} (full coverage, no caps)._`;
    }
    return `_Thorough review — round ${roundNumber} follow-up (full feedback continues)._`;
  }

  if (mode === "critical") {
    return `_Round ${roundNumber} — critical scan only (feedback capped at ${profile.maxFeedbackRounds} full rounds)._`;
  }
  if (mode === "followup") {
    return `_Round ${roundNumber} of ${profile.maxFeedbackRounds} feedback rounds — follow-up on new changes only._`;
  }
  return `_Round ${roundNumber} of ${profile.maxFeedbackRounds} feedback rounds._`;
}

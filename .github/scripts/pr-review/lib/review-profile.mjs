/** Label applied to PRs that need full automated review coverage. */
export const THOROUGH_LABEL = "pr-review:thorough";

/**
 * @param {number} [value]
 */
export function getMaxFeedbackRounds(value = Number(process.env.PR_REVIEW_MAX_FEEDBACK_ROUNDS)) {
  const rounds = Number.isFinite(value) ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(rounds) || rounds < 1) return 2;
  return rounds;
}

/**
 * @typedef {import('./rounds.mjs').ReviewMode} ReviewMode
 * @typedef {{
 *   name: 'default' | 'thorough';
 *   maxFiles: number;
 *   maxPatchCharsPerFile: number;
 *   maxTotalPatchChars: number;
 *   maxInlineComments: number;
 *   maxCommentsByMode: Record<ReviewMode, number>;
 *   maxFeedbackRounds: number;
 *   keepFullFeedbackRounds: boolean;
 * }} ReviewProfile
 */

/** @type {ReviewProfile} */
export const DEFAULT_PROFILE = {
  name: "default",
  maxFiles: 40,
  maxPatchCharsPerFile: 12_000,
  maxTotalPatchChars: 150_000,
  maxInlineComments: 25,
  maxCommentsByMode: {
    initial: 15,
    followup: 8,
    critical: 5,
  },
  maxFeedbackRounds: 2,
  keepFullFeedbackRounds: false,
};

/** @type {ReviewProfile} */
export const THOROUGH_PROFILE = {
  name: "thorough",
  maxFiles: Number.POSITIVE_INFINITY,
  maxPatchCharsPerFile: Number.POSITIVE_INFINITY,
  maxTotalPatchChars: Number.POSITIVE_INFINITY,
  maxInlineComments: Number.POSITIVE_INFINITY,
  maxCommentsByMode: {
    initial: Number.POSITIVE_INFINITY,
    followup: Number.POSITIVE_INFINITY,
    critical: Number.POSITIVE_INFINITY,
  },
  maxFeedbackRounds: Number.POSITIVE_INFINITY,
  keepFullFeedbackRounds: true,
};

/**
 * @param {unknown} labels
 * @returns {ReviewProfile}
 */
export function resolveReviewProfile(labels) {
  const thorough =
    Array.isArray(labels) &&
    labels.some(
      (label) =>
        label != null &&
        typeof label === "object" &&
        typeof label.name === "string" &&
        label.name === THOROUGH_LABEL,
    );

  if (thorough) {
    return { ...THOROUGH_PROFILE };
  }

  return {
    ...DEFAULT_PROFILE,
    maxFeedbackRounds: getMaxFeedbackRounds(),
  };
}

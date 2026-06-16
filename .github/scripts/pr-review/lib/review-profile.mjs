/** Label applied to PRs that need full automated review coverage. */
export const THOROUGH_LABEL = "pr-review:thorough";

/** Prefix for automated review labels — used to detect typos. */
export const PR_REVIEW_LABEL_PREFIX = "pr-review:";

const DEFAULT_MAX_FEEDBACK_ROUNDS = 2;

/**
 * @param {unknown} [value]
 */
export function getMaxFeedbackRounds(value = process.env.PR_REVIEW_MAX_FEEDBACK_ROUNDS) {
  if (value === undefined || value === null || value === "") {
    return DEFAULT_MAX_FEEDBACK_ROUNDS;
  }

  if (typeof value === "number") {
    if (Number.isInteger(value) && value >= 1) return value;
    console.warn(
      `Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS — using default (${DEFAULT_MAX_FEEDBACK_ROUNDS})`,
    );
    return DEFAULT_MAX_FEEDBACK_ROUNDS;
  }

  const raw = String(value).trim();
  if (!/^\d+$/.test(raw)) {
    console.warn(
      `Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS "${raw}" — using default (${DEFAULT_MAX_FEEDBACK_ROUNDS})`,
    );
    return DEFAULT_MAX_FEEDBACK_ROUNDS;
  }

  const rounds = Number.parseInt(raw, 10);
  if (rounds < 1) {
    console.warn(
      `Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS "${raw}" — using default (${DEFAULT_MAX_FEEDBACK_ROUNDS})`,
    );
    return DEFAULT_MAX_FEEDBACK_ROUNDS;
  }

  return rounds;
}

/**
 * @param {unknown} labels
 * @returns {string[]}
 */
export function findMisconfiguredReviewLabels(labels) {
  if (!Array.isArray(labels)) return [];

  const mismatches = [];
  for (const label of labels) {
    if (label == null || typeof label !== "object") continue;
    const name = label.name;
    if (typeof name !== "string") continue;
    if (name.startsWith(PR_REVIEW_LABEL_PREFIX) && name !== THOROUGH_LABEL) {
      mismatches.push(name);
    }
  }
  return mismatches;
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

  if (!thorough) {
    const mismatches = findMisconfiguredReviewLabels(labels);
    if (mismatches.length > 0) {
      console.warn(
        `Unrecognised pr-review label(s): ${mismatches.join(", ")} — expected "${THOROUGH_LABEL}". Using default profile.`,
      );
    }
  }

  if (thorough) {
    return { ...THOROUGH_PROFILE };
  }

  return {
    ...DEFAULT_PROFILE,
    maxFeedbackRounds: getMaxFeedbackRounds(),
  };
}

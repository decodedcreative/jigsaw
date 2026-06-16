import { DEFAULT_PROFILE } from "./review-profile.mjs";

/** @typedef {{ filename: string; patch?: string; status: string }} PrFile */

export const SKIP_PATH_PATTERNS = [
  /^package-lock\.json$/,
  /^apps\/storybook\/storybook-static\//,
  /^packages\/tokens\/figma\/.+\.json$/,
  /^\.worktrees\//,
  /\.snap$/,
  /^dist\//,
  /\/node_modules\//,
];

/** @deprecated use ReviewProfile.maxFiles */
export const MAX_FILES = DEFAULT_PROFILE.maxFiles;
/** @deprecated use ReviewProfile.maxPatchCharsPerFile */
export const MAX_PATCH_CHARS_PER_FILE = DEFAULT_PROFILE.maxPatchCharsPerFile;
/** @deprecated use ReviewProfile.maxTotalPatchChars */
export const MAX_TOTAL_PATCH_CHARS = DEFAULT_PROFILE.maxTotalPatchChars;
/** @deprecated use ReviewProfile.maxInlineComments */
export const MAX_INLINE_COMMENTS = DEFAULT_PROFILE.maxInlineComments;

/** @typedef {'openai' | 'anthropic'} ReviewProvider */

const DEFAULT_MODELS = {
  openai: "gpt-4o",
  anthropic: "claude-sonnet-4-20250514",
};

export const REVIEW_MARKER = "<!-- jigsaw-staff-pr-review -->";

/**
 * @returns {ReviewProvider}
 */
export function getProvider() {
  const provider = (process.env.PR_REVIEW_PROVIDER || "openai").trim();
  if (provider === "openai" || provider === "anthropic") return provider;
  throw new Error(
    `Invalid PR_REVIEW_PROVIDER "${provider}" — use "openai" or "anthropic"`,
  );
}

/**
 * @param {ReviewProvider} provider
 */
export function getDefaultModel(provider) {
  const override = process.env.PR_REVIEW_MODEL?.trim();
  return override || DEFAULT_MODELS[provider];
}

/**
 * @param {ReviewProvider} provider
 */
export function resolveApiKey(provider) {
  if (provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("Missing required env: ANTHROPIC_API_KEY");
    }
    return apiKey;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing required env: OPENAI_API_KEY");
  }
  return apiKey;
}

/**
 * @param {string} path
 */
export function shouldSkipPath(path) {
  return SKIP_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

/**
 * @param {PrFile[]} files
 * @param {import('./review-profile.mjs').ReviewProfile} [profile]
 * @returns {{ files: PrFile[]; skipped: string[] }}
 */
export function selectReviewableFiles(files, profile = DEFAULT_PROFILE) {
  const selected = [];
  const skipped = [];

  for (const file of files) {
    if (file.status === "removed") continue;
    if (shouldSkipPath(file.filename)) continue;
    if (!file.patch) continue;

    if (selected.length >= profile.maxFiles) {
      skipped.push(file.filename);
      continue;
    }

    const patch =
      file.patch.length > profile.maxPatchCharsPerFile
        ? `${file.patch.slice(0, profile.maxPatchCharsPerFile)}\n… [truncated]`
        : file.patch;

    selected.push({
      ...file,
      patch,
    });
  }

  let total = 0;
  const capped = [];

  for (const file of selected) {
    const patchLen = file.patch?.length ?? 0;
    if (total + patchLen > profile.maxTotalPatchChars) {
      skipped.push(file.filename);
      continue;
    }
    total += patchLen;
    capped.push(file);
  }

  return { files: capped, skipped };
}

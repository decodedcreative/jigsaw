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

export const MAX_FILES = 40;
export const MAX_PATCH_CHARS_PER_FILE = 12_000;
export const MAX_TOTAL_PATCH_CHARS = 150_000;
export const MAX_INLINE_COMMENTS = 25;

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
  const provider = process.env.PR_REVIEW_PROVIDER ?? "openai";
  if (provider === "openai" || provider === "anthropic") return provider;
  throw new Error(
    `Invalid PR_REVIEW_PROVIDER "${provider}" — use "openai" or "anthropic"`,
  );
}

/**
 * @param {ReviewProvider} provider
 */
export function getDefaultModel(provider) {
  return process.env.PR_REVIEW_MODEL ?? DEFAULT_MODELS[provider];
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
 */
export function selectReviewableFiles(files) {
  const selected = [];

  for (const file of files) {
    if (file.status === "removed") continue;
    if (shouldSkipPath(file.filename)) continue;
    if (!file.patch) continue;

    selected.push({
      ...file,
      patch:
        file.patch.length > MAX_PATCH_CHARS_PER_FILE
          ? `${file.patch.slice(0, MAX_PATCH_CHARS_PER_FILE)}\n… [truncated]`
          : file.patch,
    });

    if (selected.length >= MAX_FILES) break;
  }

  let total = 0;
  const capped = [];

  for (const file of selected) {
    const patchLen = file.patch?.length ?? 0;
    if (total + patchLen > MAX_TOTAL_PATCH_CHARS) break;
    total += patchLen;
    capped.push(file);
  }

  return capped;
}

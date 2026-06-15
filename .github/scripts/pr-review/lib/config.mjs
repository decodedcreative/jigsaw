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

export const DEFAULT_MODEL =
  process.env.PR_REVIEW_MODEL ?? "claude-sonnet-4-20250514";

export const REVIEW_MARKER = "<!-- jigsaw-staff-pr-review -->";

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

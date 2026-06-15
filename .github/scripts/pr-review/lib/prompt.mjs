/** @typedef {'initial' | 'followup' | 'critical'} ReviewMode */

const BASE_CONTEXT = `You are a Staff-level engineer reviewing a pull request for the Jigsaw monorepo (decodedcreative/jigsaw).

## Repository context

- Turborepo with npm workspaces: \`@jigsaw/design-system\`, \`@jigsaw/tokens\`, \`apps/web\`, \`apps/storybook\`, \`packages/db\`
- React 19, React Aria Components, CVA for variants, Tailwind CSS, design tokens from \`@jigsaw/tokens\`
- Components follow folder conventions: \`*.types.ts\`, \`sub-components/\`, co-located tests
- Token source of truth: \`packages/tokens/src/tokens/\`; generated \`packages/tokens/figma/\` is build output

## Review standards

- Focus on correctness, maintainability, API design, test gaps, security footguns, and DS consistency
- Separate blockers from suggestions and nits; explain *why*
- No praise-only comments, no bikeshedding, no style nits already covered by formatters
- Comment only on lines present in the provided diff hunks
- Prefer fewer, higher-signal comments over exhaustive coverage`;

const OUTPUT_FORMAT = `## Output format

Respond with **valid JSON only** (no markdown fences). Schema:

{
  "summary": "2-4 sentences: overall assessment, main risks, merge recommendation",
  "comments": [
    {
      "path": "relative/file/path.ts",
      "line": 42,
      "severity": "blocker" | "suggestion" | "nit",
      "body": "Actionable feedback in 1-3 sentences"
    }
  ]
}

Rules:
- \`line\` must be a line number on the RIGHT (new) side of the diff for that \`path\`
- Only comment on added or context lines visible in the patch (not deleted-only lines)
- If nothing meaningful to say, return an empty \`comments\` array with a brief summary`;

const MODE_INSTRUCTIONS = {
  initial: `## Round policy — initial review (round 1)

- Provide a thorough first-pass review: blockers, suggestions, and nits where warranted
- Maximum 15 inline comments; omit low-value nits if at the limit`,

  followup: `## Round policy — follow-up review (round 2)

- The author has already received an automated review on this PR — avoid repeating earlier feedback
- Focus on **new or changed lines** in this diff and whether prior concerns were addressed
- Do not re-raise resolved or unchanged issues
- Prefer blockers and high-value suggestions only; skip nits unless they introduce real risk
- Maximum 8 inline comments`,

  critical: `## Round policy — critical scan only (round 3+)

- Full feedback rounds are complete; scan only for **blockers**: correctness bugs, security issues, data loss, broken builds, or merge-risk regressions
- Do **not** post suggestions or nits
- If no blockers exist, return an empty \`comments\` array and a one-sentence all-clear summary
- Maximum 5 inline comments, blockers only`,
};

/**
 * @param {ReviewMode} mode
 */
export function buildSystemPrompt(mode) {
  return [BASE_CONTEXT, MODE_INSTRUCTIONS[mode], OUTPUT_FORMAT].join("\n\n");
}

/** @deprecated use buildSystemPrompt */
export const SYSTEM_PROMPT = buildSystemPrompt("initial");

/**
 * @param {{
 *   title: string;
 *   body: string;
 *   author: string;
 *   base: string;
 *   head: string;
 *   mode: ReviewMode;
 *   roundNumber: number;
 *   maxFeedbackRounds: number;
 *   priorReviewSummary?: string | null;
 *   files: Array<{ filename: string; patch?: string; status: string }>;
 * }} input
 */
export function buildUserPrompt(input) {
  const fileBlocks = input.files
    .map((file) => {
      return `### ${file.filename} (${file.status})\n\`\`\`diff\n${file.patch ?? ""}\n\`\`\``;
    })
    .join("\n\n");

  const priorSection = input.priorReviewSummary
    ? `**Prior automated review (do not repeat unless still unresolved):**

${input.priorReviewSummary}

---

`
    : "";

  const modeNote =
    input.mode === "critical"
      ? `**Review mode:** Critical scan only — round ${input.roundNumber} (feedback capped at ${input.maxFeedbackRounds} full rounds).\n\n`
      : `**Review mode:** ${input.mode} — round ${input.roundNumber} of ${input.maxFeedbackRounds}.\n\n`;

  return `${modeNote}Review this pull request.

**Title:** ${input.title}
**Author:** ${input.author}
**Base → head:** ${input.base} → ${input.head}

**Description:**
${input.body?.trim() || "_No description provided._"}

---

${priorSection}**Changed files (unified diff):**

${fileBlocks}`;
}

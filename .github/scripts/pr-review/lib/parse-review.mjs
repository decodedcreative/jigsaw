/**
 * @param {string} raw
 * @returns {{ summary: string; comments: Array<{ path: string; line: number; severity: string; body: string }> }}
 */
export function parseReviewJson(raw) {
  const trimmed = raw.trim();
  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(unfenced);
  } catch {
    throw new Error(`Model response was not valid JSON:\n${unfenced.slice(0, 500)}`);
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Model response JSON must be an object");
  }

  const summary =
    typeof parsed.summary === "string" && parsed.summary.trim()
      ? parsed.summary.trim()
      : "Automated staff-level review completed.";

  const comments = Array.isArray(parsed.comments) ? parsed.comments : [];

  return {
    summary,
    comments: comments
      .filter(
        (comment) =>
          comment &&
          typeof comment.path === "string" &&
          typeof comment.body === "string" &&
          Number.isInteger(comment.line),
      )
      .map((comment) => ({
        path: comment.path,
        line: comment.line,
        severity:
          typeof comment.severity === "string" ? comment.severity : "suggestion",
        body: comment.body.trim(),
      }))
      .filter((comment) => comment.body.length > 0),
  };
}

const SEVERITY_LABEL = {
  blocker: "⛔ Blocker",
  suggestion: "💡 Suggestion",
  nit: "🔍 Nit",
};

/**
 * @param {string} severity
 * @param {string} body
 */
export function formatCommentBody(severity, body) {
  const label = SEVERITY_LABEL[severity] ?? "💡 Suggestion";
  return `**${label}**\n\n${body}`;
}

/**
 * @param {string} summary
 * @param {Array<{ severity: string }>} comments
 * @param {string} marker
 */
export function formatReviewSummary(summary, comments, marker) {
  const blockers = comments.filter((c) => c.severity === "blocker").length;
  const header = blockers
    ? `## Staff review — ${comments.length} note(s), **${blockers} blocker(s)**`
    : `## Staff review — ${comments.length} note(s)`;

  return `${marker}\n\n${header}\n\n${summary}\n\n_Automated review (Claude). Not a substitute for human review._`;
}

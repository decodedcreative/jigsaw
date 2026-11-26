/**
 * Consumer changelog sentences from pull request descriptions (JSW-137).
 *
 * Each PR that changes a publishable package says, in a `## Consumer changelog`
 * section, what an app gets or has to change, e.g.
 *
 *   ## Consumer changelog
 *   - `SearchField` is named "Search" when it has no label.
 *   - **Breaking:** the design system now requires React 19.
 *
 * or `None.` when nothing consumer-facing changed. The PR check requires the
 * section; the release script copies the sentences into the changeset, which
 * Changesets writes into each package's CHANGELOG.md.
 */

const HEADING = /^#{2,3}\s+consumer changelog\s*$/i;
const NEXT_HEADING = /^#{1,3}\s+\S/;
/** A thematic break (---, ***, ___) or a generated footer ends the section. */
const SECTION_END =
  /^(?:(?:-\s*){3,}|(?:\*\s*){3,}|(?:_\s*){3,}|🤖|_?generated (?:with|by)\b)/i;
/** Markdown link reference definitions, e.g. the `[JSW-1]: https://…` lines the Jira integration appends. */
const LINK_DEFINITION = /^\s*\[[^\]]+\]:\s*\S+/;
/** "None.", "None", "None — tests only", "None. Test-only change.", "N/A", "No consumer-facing changes." */
const NONE =
  /^(?:none|n\/a|no consumer[- ]facing changes?)(?:\s*[.!:;,—–-]|\s*$)/i;
const BREAKING = /^(\*\*breaking:?\*\*:?|breaking:)\s*/i;

/**
 * Parse the `## Consumer changelog` section of a PR body.
 * Returns `found` (the heading exists), `none` (explicitly nothing to report)
 * and `entries` (one per bullet, or per paragraph when there are no bullets).
 */
export function extractConsumerChangelog(body = "") {
  const lines = String(body)
    .replace(/\r\n/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "")
    .split("\n");
  const start = lines.findIndex((line) => HEADING.test(line.trim()));
  if (start === -1) return { found: false, none: false, entries: [] };

  const section = [];
  for (const line of lines.slice(start + 1)) {
    const trimmed = line.trim();
    if (NEXT_HEADING.test(trimmed) || SECTION_END.test(trimmed)) break;
    if (LINK_DEFINITION.test(line)) continue;
    section.push(line);
  }

  const text = section.join("\n").trim();
  // The PR template's guidance is an HTML comment, stripped above, so an
  // untouched template leaves the section empty.
  if (text === "") return { found: true, none: false, entries: [] };
  if (NONE.test(text)) return { found: true, none: true, entries: [] };

  const bullets = section.filter((line) => /^\s*[-*]\s+/.test(line));
  const entries = (
    bullets.length > 0
      ? bullets.map((line) => line.replace(/^\s*[-*]\s+/, ""))
      : text
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " "))
  )
    .map((entry) => entry.trim())
    .filter((entry) => entry !== "" && !NONE.test(entry));

  return { found: true, none: entries.length === 0, entries };
}

export function isBreaking(entry) {
  return BREAKING.test(entry.trim());
}

/** Normalise the breaking marker to `**Breaking:**`. */
function normaliseEntry(entry) {
  const trimmed = entry.trim();
  return isBreaking(trimmed)
    ? `**Breaking:** ${trimmed.replace(BREAKING, "")}`
    : trimmed;
}

/**
 * Changeset summary lines from PR entries: breaking changes first, then the
 * rest, each as a bullet with its PR number. Duplicates are dropped.
 *
 * @param {{ pr: number, entry: string }[]} items
 */
export function formatChangelogSummary(items) {
  const seen = new Set();
  const unique = items.filter(({ entry }) => {
    const key = normaliseEntry(entry);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const ordered = [
    ...unique.filter(({ entry }) => isBreaking(entry)),
    ...unique.filter(({ entry }) => !isBreaking(entry)),
  ];
  return ordered.map(({ pr, entry }) => `- ${normaliseEntry(entry)} (#${pr})`);
}

/** PR numbers from commit subjects: squash `Title (#123)` and `Merge pull request #123 from …`. */
export function pullRequestNumbersFromSubjects(subjects) {
  const numbers = new Set();
  for (const subject of subjects) {
    const merge = /^Merge pull request #(\d+)\b/.exec(subject);
    const squash = /\(#(\d+)\)\s*$/.exec(subject);
    const match = merge ?? squash;
    if (match) numbers.add(Number(match[1]));
  }
  return [...numbers].sort((a, b) => a - b);
}

/**
 * The PR check: a PR that changes a publishable package must fill in the
 * section, with sentences or an explicit None.
 */
export function checkPullRequestBody({ body, touchesPublishablePackage }) {
  if (!touchesPublishablePackage)
    return { ok: true, reason: "no publishable package changed" };
  const { found, none, entries } = extractConsumerChangelog(body);
  if (!found) {
    return {
      ok: false,
      reason:
        "This PR changes a publishable package but its description has no `## Consumer changelog` section. " +
        "Add one with a sentence per change for app developers (mark breaking changes with **Breaking:**), or None.",
    };
  }
  if (!none && entries.length === 0) {
    return {
      ok: false,
      reason:
        "The `## Consumer changelog` section is empty. Write a sentence per change for app developers " +
        "(mark breaking changes with **Breaking:**), or None. if nothing consumer-facing changed.",
    };
  }
  return {
    ok: true,
    reason: none
      ? "explicitly none"
      : `${entries.length} entr${entries.length === 1 ? "y" : "ies"}`,
  };
}

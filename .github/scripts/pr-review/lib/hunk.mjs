/**
 * @param {string | undefined} patch
 * @param {number} line
 * @param {number} [maxLines]
 */
export function extractHunkSnippet(patch, line, maxLines = 6) {
  if (!patch) return null;

  const rows = patch.split("\n");
  let newLine = 0;
  let inHunk = false;
  const hunkRows = [];

  for (const row of rows) {
    if (row.startsWith("@@")) {
      const match = row.match(/\+(\d+)(?:,\d+)?/);
      if (match) newLine = Number.parseInt(match[1], 10);
      inHunk = Math.abs(newLine - line) <= 12;
      if (inHunk) hunkRows.push(row);
      continue;
    }

    if (!inHunk) {
      if (row.startsWith("+") || row.startsWith(" ")) newLine += 1;
      continue;
    }

    hunkRows.push(row);
    if (row.startsWith("+") || row.startsWith(" ")) newLine += 1;

    if (Math.abs(newLine - line) > 12) break;
  }

  if (hunkRows.length === 0) return null;

  const changed = hunkRows.filter((row) => row.startsWith("+") || row.startsWith("-"));
  const snippet = (changed.length > 0 ? changed : hunkRows).slice(0, maxLines);

  return snippet.join("\n");
}

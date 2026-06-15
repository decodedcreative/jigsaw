/**
 * Lines in the new-file (RIGHT) side of the diff that accept review comments.
 * @param {string | undefined} patch
 * @returns {Set<number>}
 */
export function parseReviewableLines(patch) {
  const lines = new Set();
  if (!patch) return lines;

  let newLine = 0;

  for (const row of patch.split("\n")) {
    if (row.startsWith("@@")) {
      const match = row.match(/\+(\d+)(?:,\d+)?/);
      if (match) newLine = Number.parseInt(match[1], 10);
      continue;
    }

    if (row.startsWith("---") || row.startsWith("+++")) continue;

    if (row.startsWith("+")) {
      lines.add(newLine);
      newLine += 1;
      continue;
    }

    if (row.startsWith(" ")) {
      lines.add(newLine);
      newLine += 1;
      continue;
    }

    if (row.startsWith("-")) {
      continue;
    }

    if (row.startsWith("\\")) {
      continue;
    }
  }

  return lines;
}

/**
 * @param {Array<{ filename: string; patch?: string }>} files
 * @returns {Map<string, Set<number>>}
 */
export function buildLineIndex(files) {
  /** @type {Map<string, Set<number>>} */
  const index = new Map();

  for (const file of files) {
    index.set(file.filename, parseReviewableLines(file.patch));
  }

  return index;
}

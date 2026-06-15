const GITHUB_API = "https://api.github.com";

/**
 * @param {string} token
 * @param {string} path
 * @param {RequestInit} [init]
 */
async function githubRequest(token, path, init = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GitHub API ${init.method ?? "GET"} ${path} failed (${response.status}): ${text}`,
    );
  }

  if (response.status === 204) return null;
  return response.json();
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 */
export async function fetchPullRequest(token, repo, pullNumber) {
  return githubRequest(token, `/repos/${repo}/pulls/${pullNumber}`);
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 */
export async function fetchPullFiles(token, repo, pullNumber) {
  /** @type {Array<{ filename: string; patch?: string; status: string }>} */
  const files = [];
  let page = 1;

  while (true) {
    const batch = await githubRequest(
      token,
      `/repos/${repo}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
    );

    if (!Array.isArray(batch) || batch.length === 0) break;
    files.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  return files;
}

/**
 * @typedef {{ path: string; line: number; body: string }} ReviewComment
 */

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 * @param {string} commitId
 * @param {string} summary
 * @param {ReviewComment[]} comments
 */
export async function postPullRequestReview(
  token,
  repo,
  pullNumber,
  commitId,
  summary,
  comments,
) {
  const payload = {
    commit_id: commitId,
    event: "COMMENT",
    body: summary,
    comments: comments.map((comment) => ({
      path: comment.path,
      line: comment.line,
      side: "RIGHT",
      body: comment.body,
    })),
  };

  return githubRequest(token, `/repos/${repo}/pulls/${pullNumber}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const GITHUB_API = "https://api.github.com";
const MAX_RATE_LIMIT_RETRIES = 4;

/**
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {Response} response
 */
export function isGitHubRateLimited(response) {
  if (response.status === 429) return true;
  if (response.status === 403) {
    return response.headers.get("x-ratelimit-remaining") === "0";
  }
  return false;
}

/**
 * @param {Response} response
 * @param {number} attempt
 */
function rateLimitDelayMs(response, attempt) {
  const reset = response.headers.get("x-ratelimit-reset");
  if (reset) {
    const resetMs = Number.parseInt(reset, 10) * 1000;
    if (Number.isFinite(resetMs)) {
      return Math.max(1000, resetMs - Date.now() + 500);
    }
  }
  return Math.min(30_000, 1000 * 2 ** attempt);
}

/**
 * @param {string} token
 * @param {string} path
 * @param {RequestInit} [init]
 * @param {number} [attempt]
 */
async function githubRequest(token, path, init = {}, attempt = 0) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });

  if (
    !response.ok &&
    isGitHubRateLimited(response) &&
    attempt < MAX_RATE_LIMIT_RETRIES - 1
  ) {
    const delayMs = rateLimitDelayMs(response, attempt);
    console.warn(
      `GitHub rate limit hit for ${path}; retrying in ${Math.ceil(delayMs / 1000)}s (attempt ${attempt + 1}/${MAX_RATE_LIMIT_RETRIES})`,
    );
    await sleep(delayMs);
    return githubRequest(token, path, init, attempt + 1);
  }

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
export async function fetchPullReviews(token, repo, pullNumber) {
  return githubRequest(token, `/repos/${repo}/pulls/${pullNumber}/reviews`);
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 */
/**
 * @param {string | undefined} sha
 */
function isZeroSha(sha) {
  return !sha || /^0+$/.test(sha);
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {string | undefined} beforeSha
 * @param {string} afterSha
 */
export async function fetchPushDiffFiles(token, repo, beforeSha, afterSha) {
  if (!isZeroSha(beforeSha) && beforeSha !== afterSha) {
    const data = await githubRequest(
      token,
      `/repos/${repo}/compare/${beforeSha}...${afterSha}`,
    );
    return (data.files ?? []).map(
      /** @param {{ filename: string; patch?: string; status: string }} file */
      (file) => ({
        filename: file.filename,
        patch: file.patch,
        status: file.status,
      }),
    );
  }

  const commit = await githubRequest(
    token,
    `/repos/${repo}/commits/${afterSha}`,
  );
  return (commit.files ?? []).map(
    /** @param {{ filename: string; patch?: string; status: string }} file */
    (file) => ({
      filename: file.filename,
      patch: file.patch,
      status: file.status,
    }),
  );
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {string | undefined} beforeSha
 * @param {string} afterSha
 */
export async function fetchPushCommitMessages(token, repo, beforeSha, afterSha) {
  if (!isZeroSha(beforeSha) && beforeSha !== afterSha) {
    const data = await githubRequest(
      token,
      `/repos/${repo}/compare/${beforeSha}...${afterSha}`,
    );
    return (data.commits ?? [])
      .map(
        /** @param {{ commit?: { message?: string } }} commit */
        (commit) => commit.commit?.message?.split("\n")[0] ?? "",
      )
      .filter(Boolean);
  }

  const commit = await githubRequest(
    token,
    `/repos/${repo}/commits/${afterSha}`,
  );
  const subject = commit.commit?.message?.split("\n")[0];
  return subject ? [subject] : [];
}

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
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 */
export async function fetchPullReviewComments(token, repo, pullNumber) {
  /** @type {Array<Record<string, unknown>>} */
  const comments = [];
  let page = 1;

  while (true) {
    const batch = await githubRequest(
      token,
      `/repos/${repo}/pulls/${pullNumber}/comments?per_page=100&page=${page}`,
    );

    if (!Array.isArray(batch) || batch.length === 0) break;
    comments.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  return comments;
}

/**
 * @param {string} token
 * @param {string} repo
 * @param {number} pullNumber
 * @param {string} commitId
 * @param {number} commentId
 * @param {string} body
 */
export async function replyToReviewComment(
  token,
  repo,
  pullNumber,
  commitId,
  commentId,
  body,
) {
  return githubRequest(token, `/repos/${repo}/pulls/${pullNumber}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body,
      commit_id: commitId,
      in_reply_to: commentId,
    }),
  });
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

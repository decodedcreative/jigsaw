import { getDefaultModel } from "./config.mjs";

const OPENAI_API = "https://api.openai.com/v1/chat/completions";

/**
 * @param {number} status
 * @param {string} text
 */
function formatOpenAiError(status, text) {
  try {
    const data = JSON.parse(text);
    const message = data?.error?.message;
    const type = data?.error?.type;
    const code = data?.error?.code;
    const details = [message, type && `type=${type}`, code && `code=${code}`]
      .filter(Boolean)
      .join(" — ");
    if (details) return `OpenAI API failed (${status}): ${details}`;
  } catch {
    // fall through to raw body
  }
  return `OpenAI API failed (${status}): ${text}`;
}

/**
 * @param {string} apiKey
 * @param {string} system
 * @param {string} user
 */
export async function requestOpenAiReview(apiKey, system, user) {
  const response = await fetch(OPENAI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getDefaultModel("openai"),
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(formatOpenAiError(response.status, text));
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("OpenAI API returned no message content");
  }

  return text;
}

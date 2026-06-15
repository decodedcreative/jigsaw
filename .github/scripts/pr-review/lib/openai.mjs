import { getDefaultModel } from "./config.mjs";

const OPENAI_API = "https://api.openai.com/v1/chat/completions";

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
    throw new Error(`OpenAI API failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("OpenAI API returned no message content");
  }

  return text;
}

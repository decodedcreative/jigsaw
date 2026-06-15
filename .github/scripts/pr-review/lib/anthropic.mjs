import { getDefaultModel } from "./config.mjs";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

/**
 * @param {string} apiKey
 * @param {string} system
 * @param {string} user
 */
export async function requestAnthropicReview(apiKey, system, user) {
  const response = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: getDefaultModel("anthropic"),
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Anthropic API failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const text = data.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  if (!text) {
    throw new Error("Anthropic API returned no text content");
  }

  return text;
}

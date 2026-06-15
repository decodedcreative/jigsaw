import { requestAnthropicReview } from "./anthropic.mjs";
import { getProvider, resolveApiKey } from "./config.mjs";
import { requestOpenAiReview } from "./openai.mjs";

/** @typedef {'openai' | 'anthropic'} ReviewProvider */

/**
 * @param {string} system
 * @param {string} user
 */
export async function requestReview(system, user) {
  const provider = getProvider();
  const apiKey = resolveApiKey(provider);

  if (provider === "anthropic") {
    return requestAnthropicReview(apiKey, system, user);
  }

  return requestOpenAiReview(apiKey, system, user);
}

/**
 * @param {ReviewProvider} provider
 */
export function providerLabel(provider) {
  return provider === "anthropic" ? "Claude" : "ChatGPT";
}

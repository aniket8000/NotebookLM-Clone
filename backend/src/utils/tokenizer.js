// utils/tokenizer.js
// Very small token estimator. Use for approximating token usage.
// This is not exact (model tokenizers vary), but good enough for budget decisions.

function estimateTokens(text) {
  if (!text) return 0
  // heuristics: average ~4 characters per token (rough), or ~0.75 words per token
  const words = text.trim().split(/\s+/).length
  // ~1.33 words per token => tokens ~ words / 1.33
  return Math.max(1, Math.round(words / 1.33))
}

module.exports = { estimateTokens }

// utils/cosine.js
// Small helper to compute cosine similarity between two vectors

function dot(a, b) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

function norm(a) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * a[i]
  return Math.sqrt(s)
}

/**
 * cosineSimilarity(a, b)
 * returns similarity in range [-1, 1]
 */
function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return -1
  const d = dot(a, b)
  const na = norm(a)
  const nb = norm(b)
  if (na === 0 || nb === 0) return -1
  return d / (na * nb)
}

module.exports = { cosineSimilarity }

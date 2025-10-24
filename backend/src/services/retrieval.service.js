// services/retrieval.service.js
// Simplified retrieval for Gemini-only mode
// Instead of embeddings, it just fetches page texts.

const Chunk = require('../models/Chunk')

/**
 * getTopKChunks(docId, question, k)
 * - We ignore semantic similarity, just return top k longest or first k pages.
 */
async function getTopKChunks(docId, question, k = 5) {
  if (!docId) return []
  const chunks = await Chunk.find({ docId }).lean()
  if (!chunks || chunks.length === 0) return []

  // naive filter: prioritize pages that contain any query word
  const words = question.toLowerCase().split(/\s+/)
  const scored = chunks.map((c) => {
    let score = 0
    for (const w of words) if (c.text.toLowerCase().includes(w)) score += 1
    return { chunk: c, score }
  })

  // sort by score, then length
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.chunk.text.length - a.chunk.text.length
  })

  return scored.slice(0, k)
}

module.exports = { getTopKChunks }

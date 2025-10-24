// controllers/query.controller.js
const retrieval = require('../services/retrieval.service')
const llm = require('../services/llm.service')
const Document = require('../models/Document')

exports.query = async (req, res) => {
  try {
    const { docId, query } = req.body
    if (!docId || !query) return res.status(400).json({ error: 'docId and query required' })

    const doc = await Document.findById(docId)
    if (!doc) return res.status(404).json({ error: 'document not found' })
    if (doc.status !== 'ready') return res.status(400).json({ error: 'document not ready' })

    const topChunks = await retrieval.getTopKChunks(docId, query, 5)
    const response = await llm.answerWithCitations(query, topChunks)

    return res.json({
      answer: response.answer,
      citations: response.sources
    })
  } catch (err) {
    console.error('Query error', err)
    res.status(500).json({ error: err.message })
  }
}

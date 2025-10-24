const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChunkSchema = new Schema({
  docId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
  page: { type: Number, required: true },
  text: { type: String, required: true },
  embedding: { type: [Number], default: [] },
  tokenCount: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Chunk', ChunkSchema)

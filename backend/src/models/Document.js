const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocumentSchema = new Schema({
  fileName: String,
  filePath: String,
  status: { type: String, default: 'processing' },
  numPages: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Document', DocumentSchema)

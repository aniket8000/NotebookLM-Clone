// src/controllers/upload.controller.js
/**
 * Handles: POST /api/upload  (multipart file)
 *  - saves Document metadata
 *  - starts background processing: extract -> chunk -> embed
 *  - returns { docId, status }
 *
 * Handles: GET /api/upload/:docId/status
 *  - returns { docId, status, numPages }
 */

const path = require('path')
const fs = require('fs')
const multer = require('multer')
const Document = require('../models/Document')
const Chunk = require('../models/Chunk')
const pdfService = require('../services/pdf.service')

// ✅ Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log('📁 Created uploads directory:', uploadsDir)
}

// ✅ Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir) // Correct absolute path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    // remove spaces and special characters that break URLs
    const safeName = file.originalname.replace(/[^\w.-]/g, '_')
    cb(null, `${uniqueSuffix}-${safeName}`)

  }
})

const upload = multer({ storage })

// ✅ Middleware for single file upload
exports.uploadMiddleware = upload.single('file')

/**
 * POST /api/upload
 * Uploads a PDF, stores metadata, and triggers background text extraction + embedding.
 */
exports.uploadPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const absolutePath = req.file.path
    const filePath = `/uploads/${req.file.filename}`


    console.log('📤 Received file:', req.file.originalname)
    console.log('📄 Saved to:', absolutePath)

    const doc = await Document.create({
      fileName: req.file.originalname,
      filePath,
      status: 'processing'
    })

    console.log('🟡 Document created with status=processing:', doc._id)

    // ✅ Background processing (non-blocking)
    setImmediate(async () => {
      console.log('⚙️ Background processing started for:', absolutePath)
      try {
        // Step 1: Extract text from PDF
        const pages = await pdfService.extractTextByPage(absolutePath)
        console.log(`✅ Extracted ${pages.length} pages from PDF`)

        // Step 2: Create text chunks
        const chunkObjects = pdfService.createChunksForDocument(doc._id, pages)
        console.log(`✅ Created ${chunkObjects.length} chunks`)

        if (chunkObjects.length > 0) {
          await Chunk.insertMany(chunkObjects)
          console.log('✅ Inserted chunks into MongoDB')
        }

        // Step 3: Generate embeddings
        await pdfService.generateEmbeddingsForDoc(doc._id)
        console.log('✅ Embeddings generated successfully')

        // Step 4: Update document status
        doc.numPages = pages.length
        doc.status = 'ready'
        await doc.save()
        console.log('🎉 Document processing complete:', doc._id)
      } catch (err) {
        console.error('❌ Processing failed for document:', doc._id)
        console.error('Error name:', err.name)
        console.error('Error message:', err.message)
        console.error('Full stack trace:', err.stack)
        // Only mark as failed if not already marked ready
        if (doc.status !== 'ready') {
          doc.status = 'failed'
          await doc.save()
        }
      }
    })

    // Respond immediately while processing continues
    return res.json({ docId: doc._id, status: doc.status })
  } catch (err) {
    console.error('❌ Upload error:', err)
    return res.status(500).json({ error: 'Upload failed', details: err.message })
  }
}

/**
 * GET /api/upload/:docId/status
 * Returns processing status for a specific document.
 */
exports.getStatus = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId)
    if (!doc) return res.status(404).json({ error: 'Document not found' })

    return res.json({
      docId: doc._id,
      status: doc.status,
      numPages: doc.numPages,
      filePath: doc.filePath
    })
  } catch (err) {
    console.error('❌ Status fetch error:', err)
    return res.status(500).json({ error: err.message })
  }
}

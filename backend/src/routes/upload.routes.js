// src/routes/upload.routes.js
const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload.controller')

// ✅ Use controller’s built-in multer middleware
router.post('/', uploadController.uploadMiddleware, uploadController.uploadPdf)

// ✅ Check upload status
router.get('/:docId/status', uploadController.getStatus)

module.exports = router

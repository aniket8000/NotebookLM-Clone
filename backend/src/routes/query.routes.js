// routes/query.routes.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/query.controller')

// POST /api/query
router.post('/', controller.query)

module.exports = router

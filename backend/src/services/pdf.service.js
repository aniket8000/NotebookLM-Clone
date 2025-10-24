// src/services/pdf.service.js
// Simple, stable PDF parser using pdf-parse (no native builds, no OCR)

const fs = require('fs');
const pdfParse = require('pdf-parse');

/**
 * Extract text from PDF page by page
 */
async function extractTextByPage(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    if (!data.text || data.text.trim().length === 0) {
      console.warn('⚠️ No extractable text found in PDF (likely scanned image).');
      return [];
    }

    // Split pages roughly by form feed or large newlines
    const textPages = data.text.split(/\f|\n\s*\n/g);
    return textPages
      .map((pageText, i) => ({ page: i + 1, text: pageText.trim() }))
      .filter((p) => p.text.length > 0);
  } catch (err) {
    console.error('❌ PDF extraction failed:', err);
    throw err;
  }
}

/**
 * Create chunks for the document
 */
function createChunksForDocument(docId, pages) {
  return pages
    .filter((p) => p.text && p.text.trim().length > 0)
    .map((p) => ({
      docId,
      text: p.text,
      page: p.page,
    }));
}

/**
 * Stub for embeddings (implemented elsewhere)
 */
async function generateEmbeddingsForDoc(docId) {
  return true;
}

module.exports = {
  extractTextByPage,
  createChunksForDocument,
  generateEmbeddingsForDoc,
};

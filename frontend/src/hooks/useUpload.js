import { useState } from 'react'
import { uploadPdf, getUploadStatus } from '../services/api'

export default function useUpload() {
  const [busy, setBusy] = useState(false)
  const [docId, setDocId] = useState(null)

  async function startUpload(file) {
    setBusy(true)
    try {
      // Step 1. Upload PDF
      const res = await uploadPdf(file)
      setDocId(res.docId)

      // Step 2. Poll until ready or failed
      let finalDoc = null
      while (true) {
        const s = await getUploadStatus(res.docId)
        if (s.status === 'ready' || s.status === 'failed') {
          finalDoc = s
          break
        }
        await new Promise((r) => setTimeout(r, 1500))
      }

      // Step 3. Return complete doc (has filePath)
      return finalDoc
    } catch (err) {
      console.error('❌ Upload error:', err)
      throw err
    } finally {
      setBusy(false)
    }
  }

  return { busy, docId, startUpload }
}

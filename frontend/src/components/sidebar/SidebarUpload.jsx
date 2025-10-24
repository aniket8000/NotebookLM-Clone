import React, { useState, useContext } from 'react'
import useUpload from '../../hooks/useUpload'
import { PdfContext } from '../../context/PdfContext'
import UploadProgress from './UploadProgress'

export default function SidebarUpload() {
  const { startUpload } = useUpload()
  const { selectDoc } = useContext(PdfContext)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)

  async function onFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      // Upload & wait until processing is done
      const uploadedDoc = await startUpload(file)

      console.log('✅ Uploaded document:', uploadedDoc)

      if (uploadedDoc.status === 'ready') {
        // Directly use full doc returned from backend
        selectDoc(uploadedDoc)
      } else {
        alert('Processing failed on server')
      }
    } catch (err) {
      console.error('❌ Upload error:', err)
      alert('Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">Upload PDF</label>
      <input type="file" accept="application/pdf" onChange={onFile} className="w-full" />
      {busy && <UploadProgress status={status || 'processing'} />}
      <p className="text-xs text-gray-400 mt-2">
        Upload a PDF. Processing happens on server and may take a few seconds.
      </p>
    </div>
  )
}

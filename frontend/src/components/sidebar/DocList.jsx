import React, { useContext } from 'react'
import { PdfContext } from '../../context/PdfContext'

export default function DocList() {
  const { doc } = useContext(PdfContext)

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Documents</h3>
      {doc ? (
        <div className="p-3 rounded-lg border flex items-center justify-between">
          <div>
            <div className="font-semibold">{doc.fileName}</div>
            <div className="text-xs text-gray-400">Status: {doc.status || 'processing'}</div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No document selected. Upload to start.</div>
      )}
    </div>
  )
}

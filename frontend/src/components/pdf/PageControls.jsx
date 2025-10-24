import React, { useContext } from 'react'
import { PdfContext } from '../../context/PdfContext'

export default function PageControls({ numPages }) {
  const { currentPage, setCurrentPage } = useContext(PdfContext)
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="btn px-3 py-1.5 rounded-md">Prev</button>
        <button onClick={() => setCurrentPage(p => p + 1)} className="btn px-3 py-1.5 rounded-md">Next</button>
      </div>

      <div className="text-sm text-gray-500">
        Page <strong>{currentPage}</strong> {numPages ? `of ${numPages}` : ''}
      </div>
    </div>
  )
}

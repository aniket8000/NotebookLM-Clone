import React, { createContext, useState } from 'react'

export const PdfContext = createContext()

/**
 * Provides current document metadata and page controls
 * doc: { docId, fileName, filePath, numPages, status }
 */
export function PdfProvider({ children }) {
  const [doc, setDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [highlight, setHighlight] = useState(null)

  function selectDoc(d) {
    setDoc(d)
    setCurrentPage(1)
  }
  function jumpToPage(page) {
    if (!page || page < 1) return
    setCurrentPage(page)
  }
  function clearHighlight() { setHighlight(null) }

  return (
    <PdfContext.Provider value={{
      doc, selectDoc,
      currentPage, setCurrentPage, jumpToPage,
      highlight, setHighlight, clearHighlight
    }}>
      {children}
    </PdfContext.Provider>
  )
}

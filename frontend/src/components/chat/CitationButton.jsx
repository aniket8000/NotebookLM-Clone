// src/components/chat/CitationButton.jsx
import React from 'react'

export default function CitationButton({ page, snippet, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-white/90 border rounded shadow-sm text-sm hover:bg-gray-100"
      title={snippet}
    >
      Page {page}
    </button>
  )
}

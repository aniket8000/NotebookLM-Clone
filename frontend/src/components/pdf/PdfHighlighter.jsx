import React, { useEffect } from 'react'

export default function PdfHighlighter({ highlight, onClear }) {
  useEffect(() => {
    if (!highlight) return
    const t = setTimeout(() => onClear && onClear(), 2000)
    return () => clearTimeout(t)
  }, [highlight, onClear])

  if (!highlight) return null
  return (
    <div className="absolute top-4 right-4 z-50 px-3 py-1 rounded-md bg-yellow-50 border border-yellow-200 text-sm">
      Highlight: {highlight.text?.slice(0, 60)}...
    </div>
  )
}

import React from 'react'

export default function Button({ children, onClick, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-transform active:scale-95 bg-primary text-white ${className}`}
    >
      {children}
    </button>
  )
}

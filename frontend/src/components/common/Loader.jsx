import React from 'react'

export default function Loader({ size = 20 }) {
  return (
    <div style={{ width: size, height: size }} className="inline-block">
      <svg className="animate-spin" viewBox="0 0 24 24" width={size} height={size}>
        <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.12)" strokeWidth="4" fill="none" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

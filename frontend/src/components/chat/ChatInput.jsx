// src/components/chat/ChatInput.jsx
import React, { useState } from 'react'

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState('')

  async function submit(e) {
    e && e.preventDefault()
    if (!text.trim()) return
    const q = text.trim()
    setText('')
    try {
      await onSend(q)
    } catch (err) {
      console.error(err)
      alert('Query failed: ' + err.message)
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder="Ask about the document..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
        Send
      </button>
    </form>
  )
}

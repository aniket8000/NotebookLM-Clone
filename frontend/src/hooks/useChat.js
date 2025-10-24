// src/hooks/useChat.js
import { useState, useContext } from 'react'
import { queryDoc } from '../services/api'
import { PdfContext } from '../context/PdfContext'

/**
 * useChat - handles sending query and receiving answer with citations
 */
export default function useChat() {
  const [messages, setMessages] = useState([]) // { role: 'user'|'assistant', text, citations }
  const [loading, setLoading] = useState(false)
  const { doc } = useContext(PdfContext)

  async function sendMessage(question) {
    if (!doc || !doc.docId) throw new Error('No document selected')
    setLoading(true)
    // append user message
    setMessages((m) => [...m, { role: 'user', text: question }])
    try {
      const res = await queryDoc(doc.docId, question)
      // res: { answer, citations: [{page, chunkId, snippet}], raw }
      setMessages((m) => [...m, { role: 'assistant', text: res.answer, citations: res.citations }])
      setLoading(false)
      return res
    } catch (err) {
      setLoading(false)
      setMessages((m) => [...m, { role: 'assistant', text: 'Error: ' + err.message, citations: [] }])
      throw err
    }
  }

  return { messages, loading, sendMessage, setMessages }
}

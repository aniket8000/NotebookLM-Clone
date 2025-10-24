import React, { createContext, useState } from 'react'

export const ChatContext = createContext()

/**
 * Chat provider stores messages for the selected doc
 * message = { id, role:'user'|'assistant', text, citations: [{page, snippet}] }
 */
export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([])

  function addMessage(msg) { setMessages(prev => [...prev, msg]) }
  function clearMessages() { setMessages([]) }

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

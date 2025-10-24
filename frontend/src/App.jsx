import React from 'react'
import MainLayout from './components/layout/MainLayout'
import { ChatProvider } from './context/ChatContext'
import { PdfProvider } from './context/PdfContext'

/**
 * Root application - wrap providers
 */
export default function App() {
  return (
    <PdfProvider>
      <ChatProvider>
        <MainLayout />
      </ChatProvider>
    </PdfProvider>
  )
}

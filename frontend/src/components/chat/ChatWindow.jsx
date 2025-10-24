// src/components/chat/ChatWindow.jsx
import React, { useContext, useRef, useEffect } from "react";
import useChat from "../../hooks/useChat";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { PdfContext } from "../../context/PdfContext";
import CitationButton from "./CitationButton";

export default function ChatWindow() {
  const { messages, loading, sendMessage } = useChat();
  const { setCurrentPage } = useContext(PdfContext);
  const listRef = useRef();

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
          💬 Chat with your document
        </h2>
      </div>

      {/* Message Area */}
      <div
        ref={listRef}
        className="flex-1 overflow-auto p-5 space-y-4 bg-gray-50/50 dark:bg-gray-950/40 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 italic">
            <p>Ask questions about your document...</p>
          </div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx}>
              <Message message={m} />
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {m.citations.map((c, i) => (
                    <CitationButton
                      key={i}
                      page={c.page}
                      snippet={c.snippet}
                      onClick={() => setCurrentPage(c.page)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}

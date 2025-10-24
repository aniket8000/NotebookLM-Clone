// components/chat/Message.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { PdfContext } from "../../context/PdfContext";

export default function Message({ message }) {
  const { jumpToPage, setHighlight } = useContext(PdfContext);
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl leading-relaxed text-sm shadow-sm ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-br-none shadow-md"
            : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>

        {message.citations?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {message.citations.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  if (c.page) jumpToPage(c.page);
                  if (c.snippet) setHighlight({ text: c.snippet });
                }}
                className="text-[11px] bg-white/70 dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                Page {c.page}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

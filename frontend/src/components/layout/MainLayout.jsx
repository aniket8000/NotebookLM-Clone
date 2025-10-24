// components/layout/MainLayout.jsx
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import PdfViewer from "../pdf/PdfViewer";
import ChatWindow from "../chat/ChatWindow";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-20 px-6 py-4 border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          📘 NotebookLM Clone
        </h1>
        <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md shadow hover:opacity-90 transition">
          Toggle Theme
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[20%] min-w-[250px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 overflow-y-auto shadow-inner">
          <Sidebar />
        </aside>

        {/* PDF + Chat Split */}
        <main className="flex flex-1 bg-gray-50 dark:bg-gray-950">
          {/* PDF Section */}
          <section className="flex justify-center items-center flex-col flex-[0.55] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto shadow-md rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">
              <PdfViewer />
            </div>
          </section>

          {/* Chat Section */}
          <section className="flex flex-col flex-[0.45] bg-gray-100 dark:bg-gray-950 p-6 overflow-y-auto">
            <ChatWindow />
          </section>
        </main>
      </div>
    </div>
  );
}

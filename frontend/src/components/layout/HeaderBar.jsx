import React from 'react'

export default function HeaderBar({ dark, setDark }) {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <img src="/src/assets/logo.svg" alt="logo" className="w-10 h-10" />
        <div>
          <h1 className="text-xl font-semibold">NotebookLM Clone</h1>
          <p className="text-sm text-gray-500">Upload PDFs & chat with them</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setDark(!dark)} className="px-3 py-2 rounded-lg border hover:bg-slate-50">
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}

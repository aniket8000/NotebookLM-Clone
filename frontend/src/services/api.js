// src/services/api.js
// Handles all calls between frontend and backend

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api'

export async function uploadPdf(file) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE_URL}/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}

export async function getUploadStatus(docId) {
  const res = await fetch(`${BASE_URL}/upload/${docId}/status`)
  if (!res.ok) throw new Error('Status fetch failed')
  return res.json()
}

export async function queryDoc(docId, question) {
  const res = await fetch(`${BASE_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, query: question })
  })
  if (!res.ok) {
    const t = await res.json().catch(() => ({}))
    throw new Error(t.error || 'Query failed')
  }
  return res.json()
}

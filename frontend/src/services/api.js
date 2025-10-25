// src/services/api.js
// Handles all calls between frontend and backend

// ✅ Automatically choose backend URL
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || // from Netlify environment
  'http://localhost:4000'; // fallback for local dev

export async function uploadPdf(file) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export async function getUploadStatus(docId) {
  const res = await fetch(`${BASE_URL}/api/upload/${docId}/status`);
  if (!res.ok) throw new Error('Status fetch failed');
  return res.json();
}

export async function queryDoc(docId, question) {
  const res = await fetch(`${BASE_URL}/api/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId, query: question }),
  });

  if (!res.ok) {
    const t = await res.json().catch(() => ({}));
    throw new Error(t.error || 'Query failed');
  }
  return res.json();
}

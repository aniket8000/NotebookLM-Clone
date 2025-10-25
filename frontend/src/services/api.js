// src/services/api.js
// Handles all calls between frontend and backend

// ✅ Auto-detect backend (works in Netlify + local)
const BASE_URL = (() => {
  try {
    const envUrl = import.meta.env.VITE_API_URL?.trim();
    if (envUrl) {
      console.log("🌐 Using deployed backend:", envUrl);
      return envUrl.replace(/\/$/, ""); // remove trailing slash
    }

    console.warn("⚠️ No VITE_API_URL found, defaulting to localhost");
    return "http://localhost:4000";
  } catch (err) {
    console.error("❌ Failed to resolve API URL:", err);
    return "http://localhost:4000";
  }
})();

// ✅ Centralized fetch handler
async function handleResponse(res, errorMsg) {
  if (!res.ok) {
    let message = errorMsg;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message);
  }
  return res.json();
}

// ✅ Upload a PDF
export async function uploadPdf(file) {
  const form = new FormData();
  form.append("file", file);

  console.log("📤 Uploading to:", `${BASE_URL}/api/upload`);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    body: form,
  });

  return handleResponse(res, "Upload failed");
}

// ✅ Get document status
export async function getUploadStatus(docId) {
  const res = await fetch(`${BASE_URL}/api/upload/${docId}/status`);
  return handleResponse(res, "Status fetch failed");
}

// ✅ Query document
export async function queryDoc(docId, question) {
  const res = await fetch(`${BASE_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docId, query: question }),
  });

  return handleResponse(res, "Query failed");
}

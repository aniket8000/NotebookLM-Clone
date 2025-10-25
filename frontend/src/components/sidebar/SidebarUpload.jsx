import React, { useState, useContext } from "react";
import useUpload from "../../hooks/useUpload";
import { PdfContext } from "../../context/PdfContext";
import UploadProgress from "./UploadProgress";
import { getUploadStatus } from "../../services/api";

export default function SidebarUpload() {
  const { startUpload } = useUpload();
  const { selectDoc } = useContext(PdfContext);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  async function waitForProcessing(docId) {
    let retries = 0;
    while (retries < 30) {
      const res = await getUploadStatus(docId);
      console.log("🟢 Checking doc status:", res);
      if (res.status === "ready") return res;
      if (res.status === "failed") throw new Error("Processing failed");
      await new Promise((r) => setTimeout(r, 2000)); // wait 2 sec
      retries++;
    }
    throw new Error("Processing timeout");
  }

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setStatus("uploading");

    try {
      const uploadedDoc = await startUpload(file);
      console.log("✅ Upload response:", uploadedDoc);

      setStatus("processing");
      const finalDoc = await waitForProcessing(uploadedDoc.docId);

      console.log("🎉 Final document ready:", finalDoc);
      selectDoc(finalDoc);
      setStatus("ready");
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">Upload PDF</label>
      <input type="file" accept="application/pdf" onChange={onFile} className="w-full" />
      {busy && <UploadProgress status={status || "processing"} />}
      <p className="text-xs text-gray-400 mt-2">
        Upload a PDF. Processing happens on server and may take a few seconds.
      </p>
    </div>
  );
}

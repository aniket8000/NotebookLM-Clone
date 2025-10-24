// components/pdf/PdfViewer.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { PdfContext } from "../../context/PdfContext";
import PageControls from "./PageControls";
import PdfHighlighter from "./PdfHighlighter";
import { Document, Page, pdfjs } from "react-pdf";
import { Upload } from "lucide-react";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  const { doc, currentPage, highlight, clearHighlight } = useContext(PdfContext);
  const viewerRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const hasDocument = !!doc?.filePath;
  let src = "";

  if (hasDocument) {
    let cleanPath = doc.filePath.trim().replace(/\\/g, "/");
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
    src = `http://localhost:4000${cleanPath}`;
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (err) => {
    console.error("❌ PDF load failed:", err);
    setError("Failed to load PDF file.");
  };

  useEffect(() => {
    if (currentPage && viewerRef.current) viewerRef.current.scrollTop = 0;
  }, [currentPage]);

  const handleClickUpload = () => {
    const input = document.querySelector('input[type="file"]');
    if (input) input.click();
  };

  // ✅ No PDF uploaded → show centered upload card
  if (!hasDocument) {
    return (
      <div
        onClick={handleClickUpload}
        className="flex flex-col items-center justify-center h-[75vh] bg-gradient-to-br from-gray-50 to-gray-100 
                   dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-md border border-gray-200 
                   dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <Upload className="w-14 h-14 text-gray-400 dark:text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Upload a PDF to Get Started
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-400 max-w-xs">
            Click anywhere here or use the upload panel on the left to import your document.
          </p>
        </div>
      </div>
    );
  }

  // ✅ PDF is uploaded → show PDF viewer only (no text rendering)
  return (
    <div className="relative flex flex-col gap-4 h-full">
      <PageControls numPages={numPages || 1} />
      <div
        ref={viewerRef}
        className="overflow-y-auto flex justify-center items-start bg-white dark:bg-gray-900 
                   rounded-2xl shadow-lg p-6 h-[75vh] mx-auto border border-gray-200 dark:border-gray-800 
                   scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          <Document
            file={src}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p className="text-gray-500 italic">Loading PDF...</p>}
            className="flex justify-center"
          >
            {numPages && (
              <Page
                pageNumber={currentPage}
                width={850}
                renderAnnotationLayer={false}
                renderTextLayer={true}
              />
            )}
          </Document>
        )}
        <PdfHighlighter highlight={highlight} onClear={clearHighlight} />
      </div>
    </div>
  );
}

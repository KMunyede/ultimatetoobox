"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconScissors, IconDownload, IconAlertCircle, IconFiles, IconLoader2 } from "@tabler/icons-react";
import { Tooltip } from "@utilitiessite/ui";
import { PDFThumbnail } from "./PDFThumbnail";
import { usePDFDocument } from "../../hooks/usePDFDocument";

export function SplitPDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const { pdfProxy, loading: loadingPdf, error: pdfError, pageCount } = usePDFDocument(file);
  const [splitMode, setSplitMode] = useState<"extract" | "ranges">("extract");
  const [extractPages, setExtractPages] = useState<number[]>([]);
  const [ranges, setRanges] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFile(acceptedFiles[0]);
    setExtractPages([]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const togglePageSelection = (index: number) => {
    setExtractPages(prev =>
      prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const splitPDF = async () => {
    if (!file) return;

    try {
      setSplitting(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const splitPdf = await PDFDocument.create();

      let pagesToCopy: number[] = [];

      if (splitMode === "extract") {
        if (extractPages.length === 0) {
          setError("Please select at least one page to extract.");
          setSplitting(false);
          return;
        }
        pagesToCopy = extractPages;
      } else {
        // Parse ranges (e.g., 1-5, 8, 10-12)
        const parts = ranges.split(",").map(p => p.trim());
        for (const part of parts) {
          if (part.includes("-")) {
            const [start, end] = part.split("-").map(n => parseInt(n));
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = start; i <= end; i++) {
                if (i >= 1 && i <= pageCount) pagesToCopy.push(i - 1);
              }
            }
          } else {
            const page = parseInt(part);
            if (!isNaN(page) && page >= 1 && page <= pageCount) pagesToCopy.push(page - 1);
          }
        }

        if (pagesToCopy.length === 0) {
          setError("Invalid page range specified.");
          setSplitting(false);
          return;
        }
      }

      const copiedPages = await splitPdf.copyPages(sourcePdf, pagesToCopy);
      copiedPages.forEach(p => splitPdf.addPage(p));

      const pdfBytes = await splitPdf.save();
      // @ts-ignore
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `split_${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Split error:", err);
      setError("Failed to split PDF.");
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!file ? (
        <Tooltip content="Drag and drop a PDF file here to split it into multiple parts" position="top">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer text-center ${
              isDragActive ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-600"
            }`}
          >
            <input {...getInputProps()} title="Upload PDF file" />
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center">
                <IconUpload size={32} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">Click or drag PDF file here</p>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">Select one PDF to split</p>
              </div>
            </div>
          </div>
        </Tooltip>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <PDFThumbnail pdfProxy={pdfProxy} className="w-24 h-32 shrink-0" />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{file.name}</h3>
              <p className="text-slate-500 font-bold uppercase text-xs mt-1">{pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button
                onClick={() => setFile(null)}
                className="mt-4 text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest hover:underline"
              >
                Change File
              </button>
            </div>
          </div>

          {loadingPdf && (
            <div className="flex flex-col items-center gap-2 p-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <IconLoader2 className="animate-spin text-red-500" size={32} />
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Analyzing PDF structure...</p>
            </div>
          )}

          {!loadingPdf && pdfProxy && (
            <>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl self-center">
                <Tooltip content="Manually pick individual pages to extract" position="top">
                  <button
                    onClick={() => setSplitMode("extract")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${splitMode === "extract" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-500"}`}
                  >
                    Select Pages
                  </button>
                </Tooltip>
                <Tooltip content="Enter specific page numbers or ranges (e.g. 1-5)" position="top">
                  <button
                    onClick={() => setSplitMode("ranges")}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${splitMode === "ranges" ? "bg-white dark:bg-slate-900 text-red-600 shadow-sm" : "text-slate-500"}`}
                  >
                    Custom Range
                  </button>
                </Tooltip>
              </div>

              {splitMode === "extract" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => togglePageSelection(i)}
                      className={`relative group rounded-2xl border-2 transition-all p-2 bg-white dark:bg-slate-900 ${
                        extractPages.includes(i) ? "border-red-500 ring-4 ring-red-500/10" : "border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <PDFThumbnail pdfProxy={pdfProxy} pageNumber={i + 1} className="w-full aspect-[3/4]" />
                      <div className={`absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        extractPages.includes(i) ? "bg-red-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                      }`}>
                        {i + 1}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col gap-4">
                  <label className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Page Ranges</label>
                  <Tooltip content="Enter comma-separated ranges, e.g. 1-3, 5, 10-12" position="top">
                    <input
                      type="text"
                      title="Page Range Input"
                      value={ranges}
                      onChange={(e) => setRanges(e.target.value)}
                      placeholder="e.g. 1-5, 8, 11-14"
                      className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-lg font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none w-full"
                    />
                  </Tooltip>
                  <p className="text-xs text-slate-500 font-medium italic">Enter comma-separated page numbers or ranges to extract.</p>
                </div>
              )}
            </>
          )}

          {(error || pdfError) && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <IconAlertCircle size={20} />
              <span className="font-bold text-sm">{error || pdfError}</span>
            </div>
          )}

          <Tooltip content="Extract selected pages and download as a new PDF" position="top" className="w-full">
            <button
              onClick={splitPDF}
              disabled={splitting || loadingPdf || (splitMode === "extract" && extractPages.length === 0)}
              title="Split and Download PDF"
              className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
                splitting || loadingPdf ? "bg-slate-100 text-slate-400" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {splitting ? (
                <>
                  <div className="h-5 w-5 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  <IconScissors size={24} />
                  Split and Download
                </>
              )}
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

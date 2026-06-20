"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconTrash, IconDownload, IconAlertCircle, IconCheck, IconLoader2 } from "@tabler/icons-react";
import { PDFThumbnail } from "./PDFThumbnail";
import { usePDFDocument } from "../../hooks/usePDFDocument";

export function DeletePagesClient() {
  const [file, setFile] = useState<File | null>(null);
  const { pdfProxy, loading: loadingPdf, error: pdfError, pageCount } = usePDFDocument(file);
  const [pagesToDelete, setPagesToDelete] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFile(acceptedFiles[0]);
    setPagesToDelete([]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const togglePageDeletion = (index: number) => {
    setPagesToDelete(prev =>
      prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index]
    );
  };

  const deletePagesAndDownload = async () => {
    if (!file) return;
    if (pagesToDelete.length === 0) {
      setError("Please select at least one page to delete.");
      return;
    }
    if (pagesToDelete.length === pageCount) {
      setError("You cannot delete all pages from a PDF.");
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const indicesToKeep = Array.from({ length: pageCount })
        .map((_, i) => i)
        .filter(i => !pagesToDelete.includes(i));

      const copiedPages = await newPdf.copyPages(sourcePdf, indicesToKeep);
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      // @ts-ignore
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cleaned_${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete pages from PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer text-center ${
            isDragActive ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-600"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center">
              <IconUpload size={32} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">Click or drag PDF file here</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">Select one PDF to clean</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <PDFThumbnail pdfProxy={pdfProxy} className="w-24 h-32 shrink-0" />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{file.name}</h3>
              <p className="text-slate-500 font-bold uppercase text-xs mt-1">{pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-center">
                  {pagesToDelete.length} Pages Selected for deletion
                </p>
                <button
                  onClick={() => setFile(null)}
                  className="text-xs font-black text-slate-400 uppercase tracking-widest hover:underline"
                >
                  Change File
                </button>
              </div>
            </div>
          </div>

          {loadingPdf && (
            <div className="flex flex-col items-center gap-2 p-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <IconLoader2 className="animate-spin text-red-500" size={32} />
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Scanning pages...</p>
            </div>
          )}

          {!loadingPdf && pdfProxy && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => togglePageDeletion(i)}
                  className={`relative group rounded-2xl border-2 transition-all p-2 bg-white dark:bg-slate-900 ${
                    pagesToDelete.includes(i) ? "border-red-500 ring-4 ring-red-500/10 grayscale opacity-50 scale-95" : "border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <PDFThumbnail pdfProxy={pdfProxy} pageNumber={i + 1} className="w-full aspect-[3/4]" />
                  <div className={`absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    pagesToDelete.includes(i) ? "bg-red-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {pagesToDelete.includes(i) ? <IconTrash size={14} /> : i + 1}
                  </div>
                </button>
              ))}
            </div>
          )}

          {(error || pdfError) && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <IconAlertCircle size={20} />
              <span className="font-bold text-sm">{error || pdfError}</span>
            </div>
          )}

          <button
            onClick={deletePagesAndDownload}
            disabled={processing || loadingPdf || pagesToDelete.length === 0}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
              processing || loadingPdf ? "bg-slate-100 text-slate-400" : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {processing ? (
              <>
                <div className="h-5 w-5 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full" />
                Deleting Pages...
              </>
            ) : (
              <>
                <IconTrash size={24} />
                Delete Selected & Download
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

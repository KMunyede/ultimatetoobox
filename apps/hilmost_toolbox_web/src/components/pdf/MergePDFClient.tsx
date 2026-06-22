"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconFilePlus, IconTrash, IconArrowsMove, IconDownload, IconAlertCircle } from "@tabler/icons-react";
import { Tooltip } from "@utilitiessite/ui";
import { motion, Reorder } from "framer-motion";
import { PDFThumbnail } from "./PDFThumbnail";

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export function MergePDFClient() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB"
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }

    try {
      setMerging(true);
      setError(null);
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      // @ts-ignore
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `merged_${new Date().getTime()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Merge error:", err);
      setError("Failed to merge PDFs. One or more files might be encrypted or corrupted.");
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Zone */}
      <Tooltip content="Drag and drop multiple PDF files here to begin merging" position="top">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer text-center ${
            isDragActive ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-slate-200 dark:border-slate-800 hover:border-red-400 dark:hover:border-red-600"
          }`}
        >
          <input {...getInputProps()} title="Upload PDF files" />
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center">
              <IconUpload size={32} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">Click or drag PDF files here</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">Supports multiple PDF files</p>
            </div>
          </div>
        </div>
      </Tooltip>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
          <IconAlertCircle size={20} />
          <span className="font-bold text-sm">{error}</span>
        </div>
      )}

      {/* File List / Reorder */}
      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Files to Merge
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-lg text-xs">{files.length}</span>
            </h3>
            <Tooltip content="Remove all uploaded files and start over" position="left">
              <button
                onClick={() => setFiles([])}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest"
              >
                Clear All
              </button>
            </Tooltip>
          </div>

          <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-3">
            {files.map((file) => (
              <Reorder.Item
                key={file.id}
                value={file}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <Tooltip content="Drag to reorder this file in the final PDF" position="left">
                  <div className="cursor-grab text-slate-400">
                    <IconArrowsMove size={20} />
                  </div>
                </Tooltip>
                <PDFThumbnail file={file.file} className="w-12 h-16 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                  <p className="text-xs text-slate-500 font-mono uppercase mt-0.5">{file.size}</p>
                </div>
                <Tooltip content="Remove this file from the list" position="right">
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove File"
                  >
                    <IconTrash size={20} />
                  </button>
                </Tooltip>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <Tooltip content="Merge all files in the list into a single PDF document" position="top" className="w-full">
            <button
              onClick={mergePDFs}
              disabled={merging}
              title="Merge and Download PDF"
              className={`mt-4 w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
                merging ? "bg-slate-100 text-slate-400" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {merging ? (
                <>
                  <div className="h-5 w-5 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full" />
                  Merging...
                </>
              ) : (
                <>
                  <IconDownload size={24} />
                  Merge and Download
                </>
              )}
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

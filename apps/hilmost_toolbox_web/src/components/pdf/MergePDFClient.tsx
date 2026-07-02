"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconTrash, IconArrowsMove, IconDownload, IconAlertCircle } from "@tabler/icons-react";
import { motion, Reorder } from "framer-motion";
import { PDFThumbnail } from "./PDFThumbnail";
import { Button } from "../ui/Button";

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
    <div className="flex flex-col gap-8 my-8">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-[2.5rem] p-12 transition-all cursor-pointer text-center bg-white dark:bg-slate-900 ${
          isDragActive ? "border-brand-primary bg-brand-primary/5" : "border-slate-200 dark:border-slate-800 hover:border-brand-primary"
        }`}
      >
        <input {...getInputProps()} title="Upload PDF files" />
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
            <IconUpload size={32} />
          </div>
          <div>
            <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Click or drag PDF files here</p>
            <p className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-widest">Supports multiple PDF files</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-4 flex items-center gap-3 text-rose-600">
          <IconAlertCircle size={20} />
          <span className="font-bold text-sm">{error}</span>
        </div>
      )}

      {/* File List / Reorder */}
      {files.length > 0 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              Queue
              <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full">{files.length}</span>
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-3">
            {files.map((file) => (
              <Reorder.Item
                key={file.id}
                value={file}
                className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="cursor-grab text-slate-300 hover:text-brand-primary transition-colors">
                  <IconArrowsMove size={20} />
                </div>
                <PDFThumbnail file={file.file} className="w-12 h-16 shrink-0 rounded border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase mt-0.5">{file.size}</p>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                  title="Remove File"
                >
                  <IconTrash size={20} />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <Button
            onClick={mergePDFs}
            disabled={merging}
            className="w-full !py-5 rounded-3xl"
          >
            {merging ? (
              <>
                <div className="h-5 w-5 border-3 border-white/30 border-t-white animate-spin rounded-full" />
                Merging...
              </>
            ) : (
              <>
                <IconDownload size={24} />
                Merge and Download
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

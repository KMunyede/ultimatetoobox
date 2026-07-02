"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconScissors, IconDownload, IconAlertCircle, IconLoader2 } from "@tabler/icons-react";
import { PDFThumbnail } from "./PDFThumbnail";
import { usePDFDocument } from "../../hooks/usePDFDocument";
import { Button } from "../ui/Button";
import { PillSelector } from "../ui/PillSelector";
import { Input } from "../ui/Input";

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
    <div className="flex flex-col gap-8 my-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-[2.5rem] p-12 transition-all cursor-pointer text-center bg-white dark:bg-slate-900 ${
            isDragActive ? "border-brand-primary bg-brand-primary/5" : "border-slate-200 dark:border-slate-800 hover:border-brand-primary"
          }`}
        >
          <input {...getInputProps()} title="Upload PDF file" />
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
              <IconUpload size={32} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Click or drag PDF file here</p>
              <p className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-widest">Select one PDF to split</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <PDFThumbnail pdfProxy={pdfProxy} className="w-24 h-32 shrink-0 rounded border border-slate-100" />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-xl font-black text-slate-900 dark:text-white truncate">{file.name}</h3>
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mt-1">{pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <button
                onClick={() => setFile(null)}
                className="mt-4 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
              >
                Change File
              </button>
            </div>
          </div>

          {loadingPdf && (
            <div className="flex flex-col items-center gap-4 p-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
              <IconLoader2 className="animate-spin text-brand-primary" size={32} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Analyzing Document...</p>
            </div>
          )}

          {!loadingPdf && pdfProxy && (
            <div className="space-y-8">
              <PillSelector
                value={splitMode}
                onChange={setSplitMode}
                options={[
                  { label: "Select Pages", value: "extract" },
                  { label: "Custom Range", value: "ranges" },
                ]}
                className="max-w-xs mx-auto"
              />

              {splitMode === "extract" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar p-1">
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => togglePageSelection(i)}
                      className={`relative group rounded-2xl border-2 transition-all p-2 bg-white dark:bg-slate-900 ${
                        extractPages.includes(i) ? "border-brand-primary shadow-lg" : "border-slate-100 dark:border-slate-800 hover:border-brand-primary/50"
                      }`}
                    >
                      <PDFThumbnail pdfProxy={pdfProxy} pageNumber={i + 1} className="w-full aspect-[3/4] rounded" />
                      <div className={`absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center font-black text-[10px] ${
                        extractPages.includes(i) ? "bg-brand-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}>
                        {i + 1}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col gap-4">
                  <Input
                    label="Page Ranges"
                    type="text"
                    value={ranges}
                    onChange={(e) => setRanges(e.target.value)}
                    placeholder="e.g. 1-5, 8, 11-14"
                    className="text-lg font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center">Use commas for multiple ranges (e.g. 1-3, 5, 10-12)</p>
                </div>
              )}
            </div>
          )}

          {(error || pdfError) && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-4 flex items-center gap-3 text-rose-600">
              <IconAlertCircle size={20} />
              <span className="font-bold text-sm">{error || pdfError}</span>
            </div>
          )}

          <Button
            onClick={splitPDF}
            disabled={splitting || loadingPdf || (splitMode === "extract" && extractPages.length === 0)}
            className="w-full !py-5 rounded-3xl"
          >
            {splitting ? (
              <>
                <div className="h-5 w-5 border-3 border-white/30 border-t-white animate-spin rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <IconScissors size={24} />
                Split and Download
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

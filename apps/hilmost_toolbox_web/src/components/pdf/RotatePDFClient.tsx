"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconRotateClockwise, IconDownload, IconAlertCircle, IconFiles } from "@tabler/icons-react";
import { PDFThumbnail } from "./PDFThumbnail";

export function RotatePDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [rotating, setRotating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const uploadedFile = acceptedFiles[0];
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
      setFile(uploadedFile);
      setRotations({});
      setError(null);
    } catch (err) {
      setError("Failed to load PDF. It might be encrypted or corrupted.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const rotatePage = (index: number) => {
    setRotations(prev => ({
      ...prev,
      [index]: ((prev[index] || 0) + 90) % 360
    }));
  };

  const rotateAll = () => {
    const newRotations: Record<number, number> = {};
    const firstRotation = ((rotations[0] || 0) + 90) % 360;
    for (let i = 0; i < pageCount; i++) {
      newRotations[i] = firstRotation;
    }
    setRotations(newRotations);
  };

  const saveRotatedPDF = async () => {
    if (!file) return;

    try {
      setRotating(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      Object.entries(rotations).forEach(([index, rotation]) => {
        const pageIdx = parseInt(index);
        const page = pages[pageIdx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotation) % 360));
      });

      const pdfBytes = await pdfDoc.save();
      // @ts-ignore
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rotated_${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Rotate error:", err);
      setError("Failed to rotate PDF.");
    } finally {
      setRotating(false);
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
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">Select one PDF to rotate</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <PDFThumbnail file={file} className="w-24 h-32 shrink-0" />
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{file.name}</h3>
              <p className="text-slate-500 font-bold uppercase text-xs mt-1">{pageCount} Pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <button
                  onClick={rotateAll}
                  className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-1 hover:underline"
                >
                  <IconRotateClockwise size={14} />
                  Rotate All
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="text-xs font-black text-slate-400 uppercase tracking-widest hover:underline"
                >
                  Change File
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: pageCount }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div
                  className="relative group rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-2 overflow-hidden aspect-[3/4]"
                  style={{ transform: `rotate(${rotations[i] || 0}deg)`, transition: 'transform 0.3s ease-in-out' }}
                >
                  <PDFThumbnail file={file} pageNumber={i + 1} className="w-full h-full" />
                </div>
                <button
                  onClick={() => rotatePage(i)}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1 transition-colors"
                >
                  <IconRotateClockwise size={14} />
                  Rotate 90°
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <IconAlertCircle size={20} />
              <span className="font-bold text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={saveRotatedPDF}
            disabled={rotating}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
              rotating ? "bg-slate-100 text-slate-400" : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {rotating ? (
              <>
                <div className="h-5 w-5 border-3 border-slate-300 border-t-slate-600 animate-spin rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <IconDownload size={24} />
                Apply and Download
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

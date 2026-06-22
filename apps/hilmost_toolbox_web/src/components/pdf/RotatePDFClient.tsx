"use client";

import React, { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { IconUpload, IconRotateClockwise, IconDownload, IconAlertCircle, IconFiles, IconLoader2 } from "@tabler/icons-react";
import { Tooltip } from "@utilitiessite/ui";
import { PDFThumbnail } from "./PDFThumbnail";
import { usePDFDocument } from "../../hooks/usePDFDocument";

export function RotatePDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const { pdfProxy, loading: loadingPdf, error: pdfError, pageCount } = usePDFDocument(file);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [rotating, setRotating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFile(acceptedFiles[0]);
    setRotations({});
    setError(null);
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
        <Tooltip content="Drag and drop a PDF file here to rotate its pages" position="top">
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
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">Select one PDF to rotate</p>
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
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <Tooltip content="Rotate every page in the document by 90 degrees clockwise" position="top">
                  <button
                    onClick={rotateAll}
                    disabled={loadingPdf}
                    title="Rotate All Pages"
                    className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <IconRotateClockwise size={14} />
                    Rotate All
                  </button>
                </Tooltip>
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
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Generating previews...</p>
            </div>
          )}

          {!loadingPdf && pdfProxy && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {Array.from({ length: pageCount }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div
                    className="relative group rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-2 overflow-hidden aspect-[3/4]"
                    style={{ transform: `rotate(${rotations[i] || 0}deg)`, transition: 'transform 0.3s ease-in-out' }}
                  >
                    <PDFThumbnail pdfProxy={pdfProxy} pageNumber={i + 1} className="w-full h-full" />
                  </div>
                  <Tooltip content="Rotate this page 90 degrees clockwise" position="top" className="w-full">
                    <button
                      onClick={() => rotatePage(i)}
                      title={`Rotate Page ${i + 1}`}
                      className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1 transition-colors"
                    >
                      <IconRotateClockwise size={14} />
                      Rotate 90°
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}

          {(error || pdfError) && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <IconAlertCircle size={20} />
              <span className="font-bold text-sm">{error || pdfError}</span>
            </div>
          )}

          <Tooltip content="Apply rotations and download the modified PDF" position="top" className="w-full">
            <button
              onClick={saveRotatedPDF}
              disabled={rotating || loadingPdf}
              title="Apply Rotations and Download"
              className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${
                rotating || loadingPdf ? "bg-slate-100 text-slate-400" : "bg-red-600 hover:bg-red-700 text-white"
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
          </Tooltip>
        </div>
      )}
    </div>
  );
}

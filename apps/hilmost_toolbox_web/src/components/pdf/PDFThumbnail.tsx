"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PDFThumbnailProps {
  file: File;
  pageNumber?: number;
  className?: string;
}

export function PDFThumbnail({ file, pageNumber = 1, className = "" }: PDFThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function renderThumbnail() {
      try {
        setLoading(true);
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

        if (!active) return;

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 0.5 });

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({ canvasContext: context, viewport }).promise;
          }
        }
        setLoading(false);
      } catch (err) {
        if (active) {
          console.error("Thumbnail error:", err);
          setError("Failed to load");
          setLoading(false);
        }
      }
    }

    renderThumbnail();

    return () => {
      active = false;
    };
  }, [file, pageNumber]);

  return (
    <div className={`relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center ${className}`}>
      {loading && <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />}
      {error ? (
        <span className="text-[10px] text-slate-400 font-bold uppercase">{error}</span>
      ) : (
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
      )}
    </div>
  );
}

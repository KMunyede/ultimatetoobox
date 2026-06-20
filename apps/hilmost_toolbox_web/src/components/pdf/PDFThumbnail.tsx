"use client";

import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PDFThumbnailProps {
  pdfProxy?: any | null; // pdfjs.PDFDocumentProxy
  file?: File | null;
  pageNumber?: number;
  className?: string;
  scale?: number;
}

export function PDFThumbnail({ pdfProxy, file, pageNumber = 1, className = "", scale = 0.3 }: PDFThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const renderTaskRef = useRef<any>(null);
  const [internalProxy, setInternalProxy] = useState<any | null>(null);

  // Intersection Observer to only render when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle internal proxy if file is provided instead of global proxy
  useEffect(() => {
    if (!file || pdfProxy) return;

    let active = true;
    async function loadInternal() {
      try {
        const arrayBuffer = await file!.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        if (active) setInternalProxy(pdf);
        else pdf.destroy();
      } catch (err) {
        if (active) setError("Failed");
      }
    }
    loadInternal();
    return () => {
      active = false;
      if (internalProxy) internalProxy.destroy();
    };
  }, [file, pdfProxy]);

  useEffect(() => {
    const proxy = pdfProxy || internalProxy;
    if (!proxy || !isVisible) return;

    let active = true;

    async function renderThumbnail() {
      try {
        setLoading(true);
        const page = await proxy.getPage(pageNumber);
        if (!active) return;

        const viewport = page.getViewport({ scale });

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d", { alpha: false });
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            // Cancel previous render if any
            if (renderTaskRef.current) {
              renderTaskRef.current.cancel();
            }

            renderTaskRef.current = page.render({
              canvasContext: context,
              viewport,
              intent: 'display'
            });

            await renderTaskRef.current.promise;
          }
        }
        setLoading(false);
      } catch (err: any) {
        if (active && err.name !== 'RenderingCancelledException') {
          console.error("Thumbnail error:", err);
          setError("Failed");
          setLoading(false);
        }
      }
    }

    renderThumbnail();

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfProxy, internalProxy, pageNumber, isVisible, scale]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center ${className}`}
    >
      {loading && isVisible && <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />}
      {!isVisible && <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50" />}
      {error ? (
        <span className="text-[10px] text-slate-400 font-bold uppercase">{error}</span>
      ) : (
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";

export function usePDFDocument(file: File | null) {
  const [pdfProxy, setPdfProxy] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!file) {
      setTimeout(() => {
        setPdfProxy(null);
        setPageCount(0);
      }, 0);
      return;
    }

    let active = true;

    async function loadPDF() {
      try {
        setLoading(true);
        setError(null);

        if (!file) return;
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        if (active) {
          setPdfProxy(pdf);
          setPageCount(pdf.numPages);
        } else {
          (pdf as { destroy: () => void }).destroy();
        }
      } catch (err) {
        if (active) {
          console.error("PDF Load Error:", err);
          setError("Failed to load PDF. It might be encrypted or too large.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPDF();

    return () => {
      active = false;
      if (pdfProxy) {
        (pdfProxy as { destroy: () => void }).destroy();
      }
    };
  }, [file, pdfProxy]);

  return { pdfProxy, loading, error, pageCount };
}

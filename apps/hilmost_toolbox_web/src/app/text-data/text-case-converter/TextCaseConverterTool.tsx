"use client";

import React, { useState, useCallback, useMemo } from "react";
import { X, Copy, Check, Download, AlertCircle, Type } from "lucide-react";
import { FAQAccordion } from "@utilitiessite/ui";

type CaseType =
  | "UPPERCASE" | "lowercase" | "Title Case" | "Sentence case"
  | "camelCase" | "PascalCase" | "snake_case" | "SCREAMING_SNAKE"
  | "kebab-case" | "COBOL-CASE" | "dot.case" | "Toggle Case";

export function TextCaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lastCase, setLastCase] = useState<CaseType | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const getStats = (text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  };

  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const splitWords = (str: string) => {
    // Split on spaces, hyphens, underscores, and camelCase boundaries
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 0);
  };

  const convert = (type: CaseType) => {
    let result = "";
    const words = splitWords(input);

    switch (type) {
      case "UPPERCASE":
        result = input.toUpperCase();
        break;
      case "lowercase":
        result = input.toLowerCase();
        break;
      case "Title Case":
        result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
        break;
      case "Sentence case":
        result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camelCase":
        result = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
        break;
      case "PascalCase":
        result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
        break;
      case "snake_case":
        result = words.map(w => w.toLowerCase()).join("_");
        break;
      case "SCREAMING_SNAKE":
        result = words.map(w => w.toUpperCase()).join("_");
        break;
      case "kebab-case":
        result = words.map(w => w.toLowerCase()).join("-");
        break;
      case "COBOL-CASE":
        result = words.map(w => w.toUpperCase()).join("-");
        break;
      case "dot.case":
        result = words.map(w => w.toLowerCase()).join(".");
        break;
      case "Toggle Case":
        result = input.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
    }

    setOutput(result);
    setLastCase(type);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    const timestamp = new Date().getTime();
    element.download = `hilmost-text-${lastCase?.toLowerCase().replace(/\s+/g, "-") || "converted"}-${timestamp}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const faqs = [
    {
      question: "What is camelCase used for?",
      answer: "camelCase is a naming convention commonly used in programming languages like JavaScript and Java for naming variables and functions. The first letter is lowercase, and each subsequent word starts with a capital letter."
    },
    {
      question: "What is snake_case used for?",
      answer: "snake_case uses underscores to separate words and is standard in languages like Python and for database column names. SCREAMING_SNAKE_CASE (all caps) is often used for global constants."
    },
    {
      question: "Does this tool store my text?",
      answer: "No. Hilmost Digital Labs follows a 'Zero-Server' architecture. All text transformations happen directly in your browser's memory. Your content is never sent to our servers or stored anywhere."
    },
    {
      question: "Can I convert large amounts of text?",
      answer: "Yes. The tool is optimized to handle large blocks of text efficiently using local browser processing. Performance depends on your device's memory, but typical documents are processed instantly."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-8">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Input Text</label>
            <button
              onClick={() => { setInput(""); setOutput(""); setLastCase(null); }}
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="Clear Input"
            >
              <X size={18} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type your text here..."
            className="w-full h-48 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all resize-none shadow-inner"
          />
          <div className="flex gap-4 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Characters: {inputStats.chars}</span>
            <span>Words: {inputStats.words}</span>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-8 border-y border-slate-100 dark:border-slate-800 my-8">
          {(["UPPERCASE", "lowercase", "Title Case", "Sentence case", "camelCase", "PascalCase", "snake_case", "SCREAMING_SNAKE", "kebab-case", "COBOL-CASE", "dot.case", "Toggle Case"] as CaseType[]).map((t) => (
            <button
              key={t}
              onClick={() => convert(t)}
              className={`py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border-2 ${lastCase === t ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        {output && (
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              <div className="flex flex-col">
                <span className="opacity-50">Original</span>
                <span>{inputStats.chars} Chars | {inputStats.words} Words</span>
              </div>
              <div className="flex flex-col">
                <span className="opacity-50">Converted</span>
                <span>{outputStats.chars} Chars | {outputStats.words} Words</span>
              </div>
            </div>
            <div className="text-[10px] font-black uppercase bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm">
              Diff: {outputStats.chars - inputStats.chars >= 0 ? "+" : ""}{outputStats.chars - inputStats.chars} Chars
            </div>
          </div>
        )}

        {/* Output Section */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Converted Output</label>
            {lastCase && <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Case: {lastCase}</span>}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full h-48 bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-mono text-sm outline-none transition-all resize-none shadow-inner text-brand-primary"
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50 ${copyStatus === 'success' ? 'bg-blue-600 text-white shadow-blue-500/20' : copyStatus === 'error' ? 'bg-red-600 text-white shadow-red-500/20' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'}`}
            >
              {copyStatus === 'success' ? <Check size={16} /> : copyStatus === 'error' ? <AlertCircle size={16} /> : <Copy size={16} />}
              {copyStatus === 'success' ? "✓ Copied!" : copyStatus === 'error' ? "Copy failed" : "Copy to Clipboard"}
            </button>
            <button
              onClick={handleDownload}
              disabled={!output}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50 active:scale-95"
            >
              <Download size={16} /> Download .txt
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="mt-16 space-y-16">
        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Free Text Case Converter</h1>

          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-8">What is text case conversion?</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Text case conversion is the process of changing the capitalization pattern of a string of text. For developers, this is an essential part of the workflow when transforming variable names between different programming languages or formatting data for database entries. For example, moving a JSON key from <code>camelCase</code> to <code>snake_case</code> is a common task that can be tedious to do manually.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Writers and editors also rely on case conversion to quickly fix text that was accidentally typed with the Caps Lock on, or to normalize headlines into <code>Title Case</code> or <code>Sentence case</code>. Our tool ensures that these transformations are handled with precision, following the linguistic and technical rules for each specific case type.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Additionally, our tool is perfect for SEO professionals who need to generate clean URL slugs. Using the <code>kebab-case</code> or <code>dot.case</code> functions, you can instantly turn a page title into a search-engine-friendly address without worrying about illegal characters or inconsistent capitalization.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </section>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useCallback, useMemo } from "react";
import { X, Copy, Check, Download, AlertCircle, Search, ChevronDown, ChevronUp, ShieldCheck, Plus } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

type CaseType =
  | "UPPERCASE" | "lowercase" | "Title Case" | "Sentence case"
  | "camelCase" | "PascalCase" | "snake_case" | "SCREAMING_SNAKE"
  | "kebab-case" | "COBOL-CASE" | "dot.case" | "Toggle Case"
  | "Alternating Case" | "Slugify" | "Normalize Whitespace";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function TextCaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lastCase, setLastCase] = useState<CaseType | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  // Find & Replace State
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [replacementCount, setReplacementCount] = useState<number | null>(null);

  // Custom Terms State
  const [isCustomTermsOpen, setIsCustomTermsOpen] = useState(false);
  const [customTerms, setCustomTerms] = useState<string[]>([]);
  const [termInput, setTermInput] = useState("");

  const getStats = (text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  };

  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const splitWords = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 0);
  };

  const convert = useCallback((type: CaseType, targetInput?: string) => {
    const source = targetInput ?? input;
    if (!source) {
        setOutput("");
        setLastCase(type);
        return;
    }

    let result = "";
    const words = splitWords(source);

    switch (type) {
      case "UPPERCASE":
        result = source.toUpperCase();
        break;
      case "lowercase":
        result = source.toLowerCase();
        break;
      case "Title Case":
        result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
        break;
      case "Sentence case":
        result = source.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
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
        result = source.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
      case "Alternating Case":
        let upper = true;
        result = source.split("").map(c => {
          if (/\s/.test(c)) return c;
          const res = upper ? c.toUpperCase() : c.toLowerCase();
          upper = !upper;
          return res;
        }).join("");
        break;
      case "Slugify":
        result = source.toLowerCase()
          .replace(/[\s_]+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
        break;
      case "Normalize Whitespace":
        result = source.trim()
          .replace(/\s+/g, " ")
          .replace(/([.!?])\s*(?=[a-zA-Z0-9])/g, "$1 ")
          .replace(/\s+([,.!? :;])/g, "$1");
        break;
    }

    if (customTerms.length > 0) {
      const sortedTerms = [...customTerms].sort((a, b) => b.length - a.length);
      sortedTerms.forEach(term => {
        const escaped = escapeRegex(term);
        const regex = new RegExp(escaped, 'gi');
        result = result.replace(regex, term);
      });
    }

    setOutput(result);
    setLastCase(type);
  }, [input, customTerms]);

  const handleReplaceAll = () => {
    if (!findText) return;

    let escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (wholeWord) escapedFind = `\\b${escapedFind}\\b`;

    const flags = matchCase ? "g" : "gi";
    const regex = new RegExp(escapedFind, flags);

    const count = (input.match(regex) || []).length;
    const newInput = input.replace(regex, replaceText);

    setInput(newInput);
    setReplacementCount(count);

    if (lastCase) {
        convert(lastCase, newInput);
    }
  };

  const handleClearFindReplace = () => {
    setFindText("");
    setReplaceText("");
    setReplacementCount(null);
  };

  const handleAddTerm = () => {
    if (termInput.trim() && !customTerms.includes(termInput.trim())) {
      setCustomTerms([...customTerms, termInput.trim()]);
      setTermInput("");
    }
  };

  const handleRemoveTerm = (term: string) => {
    setCustomTerms(customTerms.filter(t => t !== term));
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

  const buttons: CaseType[] = ["UPPERCASE", "lowercase", "Title Case", "Sentence case", "camelCase", "PascalCase", "snake_case", "SCREAMING_SNAKE", "kebab-case", "COBOL-CASE", "dot.case", "Toggle Case", "Alternating Case", "Slugify", "Normalize Whitespace"];

  return (
    <div className="max-w-6xl mx-auto my-8 space-y-8">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

        {/* Input Section */}
        <div className="space-y-4" id="text-converter-input">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Input Text</label>
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
            className="w-full h-48 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-4 font-mono text-sm focus:border-brand-primary outline-none transition-all resize-none shadow-inner"
          />
          <div className="flex gap-4 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Chars: {inputStats.chars}</span>
            <span>Words: {inputStats.words}</span>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 py-8 border-y border-slate-100 dark:border-slate-800 my-8" id="text-converter-buttons">
          {buttons.map((t) => (
            <button
              key={t}
              onClick={() => convert(t)}
              className={`py-2.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${lastCase === t ? 'bg-brand-primary text-white border-brand-primary shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-[#D8D6CF] dark:border-slate-700 hover:border-brand-primary hover:text-brand-primary'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Find & Replace Panel */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden h-fit">
              <button
                onClick={() => setIsFindReplaceOpen(!isFindReplaceOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Search size={16} className="text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Find & Replace</span>
                </div>
                {isFindReplaceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isFindReplaceOpen && (
                <div className="p-4 space-y-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      placeholder="Find..."
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                    />
                    <Input
                      placeholder="Replace with..."
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={matchCase}
                        onChange={(e) => setMatchCase(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                      />
                      <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Match case</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={wholeWord}
                        onChange={(e) => setWholeWord(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                      />
                      <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Whole word</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      onClick={handleReplaceAll}
                      disabled={!findText}
                      className="!px-6 !py-2 !text-[10px]"
                    >
                      Replace All
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleClearFindReplace}
                      className="!px-6 !py-2 !text-[10px]"
                    >
                      Clear
                    </Button>
                    {replacementCount !== null && (
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest animate-in fade-in duration-300">
                        {replacementCount} fixed
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Terms Panel */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden h-fit">
              <button
                onClick={() => setIsCustomTermsOpen(!isCustomTermsOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={16} className="text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Terms Override</span>
                </div>
                {isCustomTermsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isCustomTermsOpen && (
                <div className="p-4 space-y-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. iPhone, HSC"
                      value={termInput}
                      onChange={(e) => setTermInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTerm()}
                    />
                    <Button
                      onClick={handleAddTerm}
                      disabled={!termInput.trim()}
                      className="!px-4 !py-2"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {customTerms.map((term) => (
                      <span
                        key={term}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {term}
                        <button
                          onClick={() => handleRemoveTerm(term)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  {customTerms.length > 0 && (
                    <button
                      onClick={() => setCustomTerms([])}
                      className="text-[10px] font-black text-slate-400 hover:text-red-500 underline transition-colors uppercase tracking-widest"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4 mt-8" id="text-converter-output">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Converted Output</label>
            {lastCase && <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Case: {lastCase}</span>}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full h-48 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg p-4 font-mono text-sm outline-none transition-all resize-none shadow-inner text-brand-primary"
          />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCopy}
              disabled={!output}
              className={`flex-1 !py-4 ${copyStatus === 'error' ? 'bg-red-600' : ''}`}
              variant={copyStatus === 'success' ? 'primary' : 'pill'}
            >
              {copyStatus === 'success' ? <Check size={16} /> : copyStatus === 'error' ? <AlertCircle size={16} /> : <Copy size={16} />}
              {copyStatus === 'success' ? "Copied!" : copyStatus === 'error' ? "Copy failed" : "Copy to Clipboard"}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!output}
              variant="secondary"
              className="!py-4"
            >
              <Download size={16} /> Download .txt
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none mt-12">
        <ShieldCheck size={12} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 100% Browser-Side processing. Privacy Guaranteed.</span>
      </div>
    </div>
  );
}

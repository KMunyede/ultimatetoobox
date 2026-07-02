"use client";
import { Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { PillSelector } from "../../../components/ui/PillSelector";
import { Button } from "../../../components/ui/Button";

export function Base64Client({ defaultMode }: { defaultMode?: "encode" | "decode" }) {
  const [state, setState] = useUrlState({
    input: "",
    mode: defaultMode || "encode",
  });
  const [copied, setCopied] = useState(false);

  const { input, mode } = state as { input: string; mode: "encode" | "decode" };

  let output = "";
  let error = "";

  try {
    if (input) {
      if (mode === "encode") {
        output = btoa(input);
      } else {
        output = atob(input);
      }
    }
  } catch (e) {
    error = "Invalid Base64 input";
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-8">
        <PillSelector
          value={mode}
          onChange={(val) => setState({ mode: val })}
          options={[
            { label: "Encode", value: "encode" },
            { label: "Decode", value: "decode" },
          ]}
          className="max-w-sm mx-auto"
        />

        <div className="grid grid-cols-1 @[800px]:grid-cols-2 gap-8 items-stretch">
          {/* Input */}
          <div id="tour-b64-input" className="space-y-1.5 w-full">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 mb-1.5">Input Text</label>
            <textarea
              className="w-full h-48 @[800px]:h-64 p-4 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono text-sm outline-none focus:border-brand-primary transition-all resize-none shadow-inner"
              placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter Base64 string...'}
              value={input}
              onChange={e => setState({ input: e.target.value })}
            />
          </div>

          {/* Output */}
          <div id="tour-b64-output" className="space-y-1.5 w-full relative">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 mb-1.5">Result</label>
            <div className={`w-full h-48 @[800px]:h-64 p-4 rounded-xl border font-mono text-sm break-all overflow-y-auto custom-scrollbar relative ${error ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800 text-rose-600' : 'bg-white dark:bg-slate-950 border-[#D8D6CF] dark:border-slate-800 text-brand-primary font-bold shadow-inner'}`}>
              {error || output || <span className="opacity-20 font-normal italic">Waiting for input...</span>}

              {output && !error && (
                <div className="absolute bottom-4 right-4">
                  <Button
                    onClick={handleCopy}
                    variant={copied ? "primary" : "pill"}
                    className="!px-4 !py-3 shadow-lg"
                    title="Copy result"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

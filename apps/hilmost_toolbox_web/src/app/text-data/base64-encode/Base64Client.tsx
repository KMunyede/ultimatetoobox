"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

export function Base64Client({ defaultMode }: { defaultMode?: "encode" | "decode" }) {
  const [state, setState] = useUrlState({
    input: "",
    mode: defaultMode || "encode",
  });
  const [copied, setCopied] = useState(false);

  const { input, mode } = state;

  let output = "";
  let error = "";

  try {
    if (input) {
      if (mode === "encode") {
        output = btoa(input as string);
      } else {
        output = atob(input as string);
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

  const tourSteps = [
    { element: '#tour-b64-mode', popover: { title: '1. Select Mode', description: 'Choose between Encoding text to Base64 or Decoding Base64 back to plain text.' } },
    { element: '#tour-b64-input', popover: { title: '2. Input', description: 'Enter your text or Base64 string here.' } },
    { element: '#tour-b64-output', popover: { title: '3. Instant Result', description: 'The result updates in real-time. Click to copy it to your clipboard.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="base64_converter" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-8 shadow-xl space-y-8">

        <div id="tour-b64-mode" className="flex p-1 bg-canvas-muted rounded-2xl border border-base max-w-sm mx-auto">
          <button
            onClick={() => setState({ mode: "encode" })}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === "encode" ? "bg-canvas-card text-text-primary shadow-md" : "text-text-muted hover:text-text-secondary"}`}
          >
            Encode
          </button>
          <button
            onClick={() => setState({ mode: "decode" })}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === "decode" ? "bg-canvas-card text-text-primary shadow-md" : "text-text-muted hover:text-text-secondary"}`}
          >
            Decode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Input */}
          <div id="tour-b64-input" className="space-y-4">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Input Text</label>
            <textarea
              className="w-full h-64 p-5 bg-canvas-muted border border-base rounded-2xl text-text-primary font-mono text-lg outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
              placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter Base64 string...'}
              value={input}
              onChange={e => setState({ input: e.target.value })}
            />
          </div>

          {/* Output */}
          <div id="tour-b64-output" className="space-y-4 relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Result</label>
            <div className={`w-full h-64 p-5 rounded-2xl border font-mono text-lg break-all overflow-y-auto custom-scrollbar relative ${error ? 'bg-red-500/5 border-red-500/20 text-red-500' : 'bg-canvas-card border-base text-brand-primary font-bold shadow-inner'}`}>
              {error || output || <span className="opacity-20 italic">Waiting for input...</span>}

              {output && !error && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 p-3 bg-brand-primary text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                  title="Copy result"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

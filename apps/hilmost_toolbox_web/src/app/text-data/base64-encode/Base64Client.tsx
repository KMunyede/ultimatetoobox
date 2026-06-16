"use client";
import { useState } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { Copy, Check, ArrowDownUp } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function Base64Client({ defaultMode = "encode" }: { defaultMode?: "encode" | "decode" }) {
  const [state, setState] = useUrlState({
    input: "",
    mode: defaultMode
  });

  const { input, mode } = state as { input: string, mode: "encode" | "decode" };
  const [copied, setCopied] = useState(false);

  let output = "";
  let error = "";

  try {
    if (input) {
      if (mode === "encode") {
        output = btoa(unescape(encodeURIComponent(input)));
      } else {
        output = decodeURIComponent(escape(atob(input)));
      }
    }
  } catch {
    error = "Invalid input for " + mode;
  }

  const handleCopy = () => {
    if (!output || error) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setState({ mode: mode === "encode" ? "decode" : "encode", input: output });
  };

  const tourSteps = [
    { element: '#tour-b64-mode', popover: { title: '1. Select Mode', description: 'Switch between Encoding text to Base64, or Decoding Base64 to text.' } },
    { element: '#tour-b64-input', popover: { title: '2. Input Data', description: 'Paste or type your text or Base64 string here.' } },
    { element: '#tour-b64-output', popover: { title: '3. Get Result', description: 'The converted text will instantly appear here. You can easily copy it.' } },
  ];

  return (
    <div className="space-y-6">
      <div id="tour-b64-mode" className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleMode}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
        >
          <ArrowDownUp size={16} />
          Switch to {mode === "encode" ? "Decode" : "Encode"}
        </motion.button>
        <div className="flex gap-2">
          <ShareButton />
          <ToolTutorial tourId="base64_converter" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div layout id="tour-b64-input" className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {mode === "encode" ? "Text Input" : "Base64 Input"}
          </label>
          <textarea
            className="w-full h-64 p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm transition-shadow"
            placeholder={mode === "encode" ? "Type text to encode..." : "Paste Base64 to decode..."}
            value={input}
            onChange={(e) => setState({ input: e.target.value })}
          />
        </motion.div>

        <motion.div layout id="tour-b64-output" className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {mode === "encode" ? "Base64 Output" : "Text Output"}
          </label>
          <div className="relative h-64">
            <textarea
              className={`w-full h-full p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 outline-none resize-y shadow-sm transition-shadow ${error ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}
              readOnly
              value={error || output}
              placeholder="Result will appear here..."
            />
            {output && !error && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="absolute top-4 right-4 flex items-center justify-center h-10 w-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
                title="Copy to clipboard"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import CryptoJS from "crypto-js";
import { Copy, Check } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";

export function MD5HashClient() {
  const [state, setState] = useUrlState({
    text: ""
  });

  const { text } = state as { text: string };
  const [copied, setCopied] = useState(false);

  const hash = text ? CryptoJS.MD5(text).toString() : "";

  const handleCopy = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tourSteps = [
    { element: '#tour-md5-input', popover: { title: '1. Input Text', description: 'Type or paste the text you want to hash.' } },
    { element: '#tour-md5-output', popover: { title: '2. Get Hash', description: 'The MD5 hash is automatically generated here. Click the copy icon to copy it.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <ShareButton />
        <ToolTutorial tourId="md5_hash" steps={tourSteps} buttonText="How to use" />
      </div>
      <motion.textarea
        layout
        id="tour-md5-input"
        className="w-full h-48 p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm transition-shadow"
        placeholder="Type or paste your text here to hash..."
        value={text}
        onChange={(e) => setState({ text: e.target.value })}
      />
      
      <AnimatePresence>
        {hash && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="tour-md5-output" 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"
          >
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">MD5 Hash Output</label>
            <div className="flex items-center gap-4">
              <code className="flex-1 block p-4 bg-slate-50 dark:bg-slate-950 rounded-lg text-slate-900 dark:text-slate-100 font-mono break-all text-lg border border-slate-100 dark:border-slate-800 shadow-inner">
                {hash}
              </code>
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-sm"
                title="Copy to clipboard"
              >
                {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function MD5HashClient() {
  const [state, setState] = useUrlState({
    text: "",
  });
  const [copied, setCopied] = useState(false);

  const { text } = state;
  const hash = text ? CryptoJS.MD5(text as string).toString() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tourSteps = [
    { element: '#tour-md5-input', popover: { title: '1. Secure Input', description: 'Enter the text you want to hash. All processing happens entirely in your browser.' } },
    { element: '#tour-md5-result', popover: { title: '2. Checksum', description: 'The 32-character hexadecimal MD5 hash is generated instantly.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="md5_generator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
        <div id="tour-md5-input" className="space-y-4">
            <div className="flex items-center gap-2 mb-2 ml-1">
                <ShieldCheck size={16} className="text-brand-primary" />
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest">Input String</label>
            </div>
            <textarea
                className="w-full h-40 p-5 bg-canvas-muted border border-base rounded-2xl text-text-primary text-xl font-medium outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all resize-none"
                placeholder="Enter text to generate MD5 hash..."
                value={text}
                onChange={e => setState({ text: e.target.value })}
            />
        </div>

        <div id="tour-md5-result" className="space-y-4">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Generated MD5 Hash</label>
            <div className="relative group">
                <div className="w-full min-h-20 p-6 bg-canvas-card border border-brand-primary/20 rounded-2xl flex items-center justify-center font-mono text-xl md:text-2xl font-black text-brand-primary break-all shadow-inner">
                    {hash || <span className="opacity-10">00000000000000000000000000000000</span>}
                </div>
                {hash && (
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 bg-canvas-muted text-text-muted rounded-lg hover:text-brand-primary transition-all"
                        title="Copy hash"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                )}
            </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
            <p className="text-[10px] text-amber-600 font-medium leading-relaxed">
                <strong>ARCHON SECURITY NOTE:</strong> MD5 is a cryptographic hash but should not be used for password hashing or high-security authentication. It is ideal for file integrity checks and non-sensitive data deduplication.
            </p>
        </div>
      </div>
    </motion.div>
  );
}

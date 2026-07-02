"use client";
import { Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/Button";

export function MD5HashClient() {
  const [state, setState] = useUrlState({
    text: "",
  });
  const [copied, setCopied] = useState(false);

  const { text } = state as { text: string };
  const hash = text ? CryptoJS.MD5(text).toString() : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
        <div id="tour-md5-input" className="space-y-1.5 w-full">
            <div className="flex items-center gap-2 mb-2 ml-1">
                <ShieldCheck size={16} className="text-brand-primary" />
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Input String</label>
            </div>
            <textarea
                className="w-full h-40 p-5 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white text-xl font-medium outline-none focus:border-brand-primary transition-all resize-none shadow-inner"
                placeholder="Enter text to generate MD5 hash..."
                value={text}
                onChange={e => setState({ text: e.target.value })}
            />
        </div>

        <div id="tour-md5-result" className="space-y-1.5 w-full">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Generated MD5 Hash</label>
            <div className="relative group">
                <div className="w-full min-h-20 p-6 bg-slate-50 dark:bg-slate-950 border border-brand-primary/20 rounded-2xl flex items-center justify-center font-mono text-xl md:text-2xl font-black text-brand-primary break-all shadow-inner">
                    {hash || <span className="opacity-10">00000000000000000000000000000000</span>}
                </div>
                {hash && (
                  <div className="absolute top-2 right-2">
                    <Button
                        onClick={handleCopy}
                        variant={copied ? "primary" : "secondary"}
                        className="!px-3 !py-2"
                        title="Copy hash"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </Button>
                  </div>
                )}
            </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800">
            <p className="text-[10px] text-amber-700 dark:text-amber-500 font-bold uppercase tracking-widest leading-relaxed">
                <strong>ARCHON SECURITY NOTE:</strong> MD5 is a cryptographic hash but should not be used for password hashing or high-security authentication. It is ideal for file integrity checks and non-sensitive data deduplication.
            </p>
        </div>
      </div>
    </motion.div>
  );
}

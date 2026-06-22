import React from "react";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

/**
 * Privacy & Security Badge for sensitive tools (PDF, Converters).
 * Reassures users and Google that processing is client-side.
 */
export function PrivacyBadge() {
  return (
    <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 rounded-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
      <div className="p-2.5 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/20 shrink-0">
        <ShieldCheck size={20} />
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
          <Lock size={12} />
          Zero-Server Privacy
        </h4>
        <p className="text-[11px] md:text-xs text-emerald-700/80 dark:text-emerald-500/80 font-medium leading-relaxed">
          Your files never leave your device. All PDF processing happens locally in your browser using 256-bit encryption logic. No data is ever uploaded or stored on our servers.
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/50 dark:bg-black/20 rounded-lg border border-emerald-200/50 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter whitespace-nowrap ml-auto">
        <EyeOff size={10} />
        Private Session
      </div>
    </div>
  );
}

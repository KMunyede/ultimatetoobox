"use client";

import React, { useState, useMemo } from "react";
import { Shield, Key, Eye, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { CopyButton } from "@utilitiessite/ui";
import { Button } from "../../../components/ui";

export function JWTDecoderClient() {
  const [input, setInput] = useState("");

  const { decoded, error } = useMemo(() => {
    if (!input.trim()) {
      return { decoded: null, error: null };
    }

    const parts = input.trim().split(".");
    if (parts.length !== 3) {
      return { decoded: null, error: "Invalid JWT format. A token must have 3 parts separated by dots." };
    }

    try {
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      const signature = parts[2];

      return { decoded: { header, payload, signature }, error: null };
    } catch {
      return { decoded: null, error: "Failed to decode token. Ensure it is a valid Base64-encoded JWT." };
    }
  }, [input]);

  const formatTimestamp = (ts: number) => {
    if (!ts) return null;
    try {
        const date = new Date(ts * 1000);
        return date.toLocaleString();
    } catch {
        return null;
    }
  };

  return (
    <div className="space-y-6 my-8">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Key size={14} className="text-brand-primary" /> Paste Encoded Token
            </label>
            {error && <span className="text-[10px] font-bold text-rose-500 uppercase flex items-center gap-1"><AlertCircle size={12} /> {error}</span>}
            {decoded && !error && <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1"><CheckCircle2 size={12} /> Decoded Successfully</span>}
        </div>
        <textarea
            id="tour-jwt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="w-full h-32 bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-xl p-4 font-mono text-xs focus:border-brand-primary outline-none transition-all shadow-inner break-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Header Section */}
        <div className="flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-3 px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-rose-500 flex items-center gap-2">
                    <Shield size={14} /> Header
                </label>
            </div>
            <div className="flex-1 bg-slate-900 rounded-2xl border-2 border-rose-500/20 shadow-xl overflow-hidden p-4">
                <pre className="h-full w-full font-mono text-sm overflow-auto text-rose-400 custom-scrollbar whitespace-pre-wrap">
                    {decoded ? JSON.stringify(decoded.header, null, 2) : "// Header data will appear here"}
                </pre>
            </div>
        </div>

        {/* Payload Section */}
        <div className="flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-3 px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-purple-500 flex items-center gap-2">
                    <Eye size={14} /> Payload
                </label>
            </div>
            <div id="tour-jwt-payload" className="flex-1 bg-slate-900 rounded-2xl border-2 border-purple-500/20 shadow-xl overflow-hidden flex flex-col">
                <div className="flex-1 p-4 font-mono text-sm overflow-auto text-purple-400 custom-scrollbar whitespace-pre-wrap">
                    {decoded ? JSON.stringify(decoded.payload, null, 2) : "// Payload claims will appear here"}
                </div>
                {decoded?.payload?.exp && (
                    <div className="p-3 bg-purple-500/10 border-t border-purple-500/20">
                         <div className="flex items-center gap-2 text-[10px] text-purple-300 font-bold uppercase tracking-widest">
                            <Clock size={12} /> Expires: {formatTimestamp(decoded.payload.exp)}
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Signature Section - Minimalized */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
         <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2 mb-3">
             Signature
         </label>
         <div className="bg-slate-50 dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-xl p-4 font-mono text-[10px] text-slate-500 break-all select-none shadow-inner">
             {decoded ? `HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), [YOUR_SECRET_KEY] )` : "// Signature mechanism details"}
         </div>
         <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
             Note: For security reasons, we do not perform signature verification. Your secret keys should never be entered into any website.
         </p>
      </div>
    </div>
  );
}

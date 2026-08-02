"use client";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { FileText, Type, Hash, AlignLeft } from "lucide-react";

export function WordCountClient() {
  const [state, setState] = useUrlState({
    text: "",
  });

  const { text } = state as { text: string };

  const content = text || "";
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const charsNoSpaces = content.replace(/\s/g, '').length;
  const lines = content ? content.split(/\r\n|\r|\n/).length : 0;

  const stats = [
    { label: "Words", value: words, icon: <FileText size={16} /> },
    { label: "Characters", value: chars, icon: <Type size={16} /> },
    { label: "No Spaces", value: charsNoSpaces, icon: <Hash size={16} /> },
    { label: "Lines", value: lines, icon: <AlignLeft size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6 my-6"
    >
      <div className="grid grid-cols-1 @[800px]:grid-cols-4 gap-8">
        {/* Editor */}
        <div id="tour-wc-input" className="@[800px]:col-span-3 bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 focus-within:border-brand-primary transition-colors">
          <textarea
            className="w-full min-h-[300px] @[800px]:min-h-[400px] p-4 bg-transparent text-black dark:text-white text-lg font-medium outline-none resize-none placeholder:text-black"
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={e => setState({ text: e.target.value })}
          />
        </div>

        {/* Stats Sidebar */}
        <div id="tour-wc-stats" className="grid grid-cols-2 @[800px]:grid-cols-1 gap-4 h-fit">
            {stats.map((stat, idx) => (
                <div
                    key={stat.label}
                    className={`bg-white dark:bg-slate-900 border border-[var(--color-border-base)] dark:border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col transition-all ${idx === 0 ? 'border-brand-primary/30 ring-1 ring-brand-primary/5' : ''}`}
                >
                    <div className="flex items-center gap-2 text-black dark:text-white mb-2">
                        <span className={idx === 0 ? 'text-brand-primary' : ''}>{stat.icon}</span>
                        <span className="text-caption font-normal uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className={`text-2xl @[800px]:text-4xl font-normal ${idx === 0 ? 'text-brand-primary' : 'text-black dark:text-white'}`}>
                        {stat.value.toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

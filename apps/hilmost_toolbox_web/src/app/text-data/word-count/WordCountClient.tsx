"use client";
import { ToolTutorial, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { FileText, Type, Hash, AlignLeft } from "lucide-react";

export function WordCountClient() {
  const [state, setState] = useUrlState({
    text: "",
  });

  const { text } = state;

  const content = (text as string) || "";
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

  const tourSteps = [
    { element: '#tour-wc-input', popover: { title: '1. Paste Text', description: 'Paste or type your content into the editor.' } },
    { element: '#tour-wc-stats', popover: { title: '2. Live Metrics', description: 'See word, character, and line counts update in real-time as you type.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="grid grid-cols-1 @[800px]:grid-cols-4 gap-8">
        {/* Editor */}
        <div id="tour-wc-input" className="@[800px]:col-span-3 bg-canvas-card border border-base rounded-3xl p-4 md:p-6 shadow-sm focus-within:border-brand-primary transition-colors">
          <Tooltip content="Paste or type your text here for real-time analysis" position="top" className="w-full">
            <textarea
              className="w-full min-h-[300px] @[800px]:min-h-[400px] p-4 bg-transparent text-text-primary text-lg font-medium outline-none resize-none placeholder:text-text-muted"
              placeholder="Start typing or paste your text here..."
              title="Text Content Input"
              value={text}
              onChange={e => setState({ text: e.target.value })}
            />
          </Tooltip>
        </div>

        {/* Stats Sidebar */}
        <div id="tour-wc-stats" className="grid grid-cols-2 @[800px]:grid-cols-1 gap-4">
            {stats.map((stat, idx) => (
                <div
                    key={stat.label}
                    className={`bg-canvas-card border border-base rounded-2xl p-4 @[800px]:p-6 flex flex-col transition-all hover:shadow-md ${idx === 0 ? 'border-brand-primary/30 ring-1 ring-brand-primary/5' : ''}`}
                >
                    <div className="flex items-center gap-2 text-text-muted mb-2">
                        {stat.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className={`text-2xl @[800px]:text-4xl font-black ${idx === 0 ? 'text-brand-primary' : 'text-text-primary'}`}>
                        {stat.value.toLocaleString()}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

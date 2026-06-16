"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function WordCountClient() {
  const [state, setState] = useUrlState({
    text: ""
  });

  const { text } = state as { text: string };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;

  const tourSteps = [
    { element: '#tour-wc-input', popover: { title: '1. Input Text', description: 'Paste or type your text into this area.' } },
    { element: '#tour-wc-stats', popover: { title: '2. View Statistics', description: 'As you type, words, characters, sentences, and paragraphs are counted automatically.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <ShareButton />
        <ToolTutorial tourId="word_count" steps={tourSteps} buttonText="How to use" />
      </div>
      <motion.textarea
        layout
        id="tour-wc-input"
        className="w-full h-64 p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm transition-shadow"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setState({ text: e.target.value })}
      />
      
      <motion.div layout id="tour-wc-stats" className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Words", value: words },
          { label: "Characters", value: charsWithSpaces },
          { label: "No Spaces", value: charsNoSpaces },
          { label: "Sentences", value: sentences },
          { label: "Paragraphs", value: paragraphs },
        ].map(stat => (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            key={stat.label} 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center shadow-sm"
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 break-all">
              <NumberTicker value={stat.value} />
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

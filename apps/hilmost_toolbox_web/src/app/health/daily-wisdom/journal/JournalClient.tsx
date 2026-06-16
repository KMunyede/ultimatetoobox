"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENCOURAGING_MESSAGES = [
  "Your thoughts are valid, and releasing them is the first step to peace.",
  "You've taken a moment for yourself. That's a beautiful thing.",
  "Let it go. The universe has space for your worries.",
  "Every word you write is a step toward clarity. Keep growing.",
  "Breathe in strength, breathe out doubt. You've got this.",
  "Your journey is uniquely yours. Be proud of where you are.",
  "Releasing this thought makes room for something beautiful.",
];

export function JournalClient() {
  const [newEntry, setNewEntry] = useState("");
  const [floatingMessage, setFloatingMessage] = useState<string | null>(null);

  const handleSave = () => {
    if (!newEntry.trim()) return;
    
    // Pick a random encouraging message
    const randomMsg = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
    
    setFloatingMessage(randomMsg);
    setNewEntry("");

    // Make the message float away after 4 seconds
    setTimeout(() => {
      setFloatingMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto relative">
      <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 rounded-3xl p-6 shadow-sm relative z-10">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="What's on your mind today? Write it down and let it go..."
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 transition-all min-h-[160px] resize-y text-center"
        />
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSave}
            disabled={!newEntry.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-medium py-2.5 px-8 rounded-xl transition-colors"
          >
            Release Thought
          </button>
        </div>
      </div>

      <AnimatePresence>
        {floatingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-center pointer-events-none z-20"
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-100 px-6 py-4 rounded-2xl shadow-lg text-center max-w-sm mx-auto">
              <p className="text-lg font-medium">{floatingMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center pt-8 opacity-60">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          This is an ephemeral journal. Your thoughts are not saved anywhere—they simply float away.
        </p>
      </div>
    </div>
  );
}

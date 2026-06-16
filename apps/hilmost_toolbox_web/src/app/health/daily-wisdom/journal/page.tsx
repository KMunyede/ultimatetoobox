import { Metadata } from "next";
import { JournalClient } from "./JournalClient";

export const metadata: Metadata = {
  title: "Private Journal | Daily Wisdom",
  description: "Your private space for reflection and stoic journaling.",
};

export default function JournalPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Private <span className="text-emerald-600 dark:text-emerald-500">Journal</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Reflect on your day, your thoughts, and your personal growth.
        </p>
      </div>
      
      <JournalClient />
    </div>
  );
}


import { WebApplicationSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Text & Data Tools | Hilmost Ultimate Toolbox",
  description: "Effortless precision at your fingertips. Clear the clutter and reclaim your time today with our free online utilities for word count, hashing, unscrambling, and data encoding.",
};

const links = [
  { name: "Word Unscrambler", href: "/text-data/word-unscrambler" },
  { name: "Base64 Text Encoder", href: "/text-data/base64-encode" },
  { name: "MD5 Hash", href: "/text-data/md5-hash" },
  { name: "Word Count", href: "/text-data/word-count" },
];

export default function TextDataHub() {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-5xl">
      <WebApplicationSchema name="Text & Data Tools | Hilmost Ultimate Toolbox" description="Effortless precision at your fingertips. Clear the clutter and reclaim your time today with our free online utilities for word count, hashing, unscrambling, and data encoding." url="https://hilmost-toolbox.hilmost.net/text-data" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Text, Data & Files
        </h1>
      </div>
      <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
        A suite of tools dedicated to formatting, analyzing, and transforming raw text and data.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-indigo-500/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

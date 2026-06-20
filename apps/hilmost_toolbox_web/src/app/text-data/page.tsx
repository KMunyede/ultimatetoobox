import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "Text & Data Tools";
const DESC = "Analyze, encode, and transform text and data instantly. Free online tools for word count, MD5 hashing, Base64 encoding, and unscrambling.";
const PATH = "/text-data";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} — Free Online Formatting & Hashing | Hilmost Toolbox`,
    description: DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const links = [
  {
    name: "Word Unscrambler",
    href: "/text-data/word-unscrambler",
    description: "Instantly untangle any anagram and find hidden words for Scrabble or crossword puzzles. Perfect for language enthusiasts and competitive gamers looking for a quick edge."
  },
  {
    name: "Base64 Text Encoder",
    href: "/text-data/base64-encode",
    description: "Safely encode and decode text strings into URL-friendly ASCII format. Essential for developers moving binary data or special characters through strict protocols."
  },
  {
    name: "MD5 Hash",
    href: "/text-data/md5-hash",
    description: "Generate lightning-fast MD5 hashes to verify data integrity and confirm file authenticity. A must-have tool for security-conscious users and system administrators."
  },
  {
    name: "Word Count",
    href: "/text-data/word-count",
    description: "Get real-time analytics on your text including word, character, and sentence counts. Ideal for authors, students, and social media managers hitting precise limits."
  },
];

export default function TextDataHub() {
  const breadcrumbItems = [{ label: "Text & Data", href: PATH }];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {TITLE}
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        Precision tools for text analysis and data transformation. Format strings, generate secure hashes, and decode binary data with our suite of high-performance utilities.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-indigo-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

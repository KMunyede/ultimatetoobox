import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import { Metadata } from "next";
import { WordUnscramblerClient } from "./WordUnscramblerClient";
import { Suspense } from "react";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Word Unscrambler";
const TOOL_TYPE = "Anagram Solver";
const TOOL_DESC = "Instantly untangle any anagram and find the hidden words in milliseconds — no signup required.";
const PATH = "/text-data/word-unscrambler";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${TOOL_NAME} — Free Online ${TOOL_TYPE} | Hilmost Toolbox`;
  const description = `Unscramble letters and solve anagrams instantly. Free online tool for Scrabble, Words with Friends, and crossword puzzles. Find all possible words from your letters.`;
  const canonical = getCanonicalUrl(PATH);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

const faqs = [
  {
    question: "What is a Word Unscrambler used for?",
    answer: "A Word Unscrambler is an incredibly useful tool for solving anagrams and finding valid words hidden within jumbled letters. It is frequently used by players of Scrabble, Words with Friends, and crossword puzzles to gain a competitive edge or solve difficult challenges.",
  },
  {
    question: "Does it support multiple languages?",
    answer: "Yes! Our Word Unscrambler supports multiple dictionaries including English, German, French, Italian, Spanish, and Portuguese, allowing you to untangle anagrams no matter what language you are playing in.",
  },
  {
    question: "Can it find blank tile possibilities like in Scrabble?",
    answer: "Currently, this specific tool is designed to find exact matches using only the letters provided. If you want to simulate blank tiles, you can try entering common vowels or consonants along with your scrambled letters to manually test possibilities.",
  },
];

export default function WordUnscramblerPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Word Unscrambler", href: "/text-data/word-unscrambler" },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/word-unscrambler/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);
  const canonicalUrl = getCanonicalUrl(PATH);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Word <span className="text-indigo-600 dark:text-indigo-500">Unscrambler</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Instantly untangle any anagram. Find the hidden words in milliseconds.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-5xl mx-auto">
          <WordUnscramblerClient />
        </div>
      </Suspense>

      <ToolArticle title="Master Your Text: The Power of Unscrambling">
        <p>
          Whether you are stuck on a difficult anagram, trying to maximize your score in Scrabble, or just want to explore the hidden linguistic possibilities inside a jumble of letters, our powerful Word Unscrambler provides instant solutions with professional-grade depth.
        </p>
        
        <h3>Advanced Features for Word Enthusiasts</h3>
        <ul>
          <li><strong>Wildcard Support:</strong> Use <code>?</code> or <code>*</code> to represent blank tiles, essential for Scrabble and Words with Friends.</li>
          <li><strong>Ergonomic Filters:</strong> Narrow down thousands of results by specifying starting letters, suffixes, or required characters.</li>
          <li><strong>Scrabble Scoring:</strong> Every found word includes its standard Scrabble point value, helping you pick the highest-scoring play.</li>
          <li><strong>Length-Based Grouping:</strong> Words are organized by length and sorted by score, so you find the best options in seconds.</li>
        </ul>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Enter Letters</strong> - Type your scrambled letters into the main box. Use wildcards for missing pieces.</li>
          <li><strong>Step 2: Apply Filters</strong> - Use the "Advanced Filters" panel if you need words that fit a specific board position.</li>
          <li><strong>Step 3: Pick & Copy</strong> - Review the grouped results and click any word to copy it to your clipboard.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

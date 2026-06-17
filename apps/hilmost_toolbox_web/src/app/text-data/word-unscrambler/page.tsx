import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { WordUnscramblerClient } from "./WordUnscramblerClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Word Unscrambler | Instantly Untangle Any Anagram",
  description: "Free online word unscrambler. Instantly untangle any anagram and find the hidden words in milliseconds for games like Scrabble or Words with Friends.",
};

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
  return (
    <div className="container mx-auto px-4 py-4 md:py-6 max-w-5xl">
      <WebApplicationSchema name="Word Unscrambler | Hilmost" description="Instantly untangle any anagram and find the hidden words in milliseconds." url="https://hilmost-toolbox.hilmost.net/text-data/word-unscrambler" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-4 md:mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tight">
          Word <span className="text-blue-500">Unscrambler</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Instantly untangle any anagram. Find the hidden words in milliseconds.
        </p>
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
      <RelatedTools category="text-data" currentPath="/text-data/word-unscrambler" />
    </div>
  );
}

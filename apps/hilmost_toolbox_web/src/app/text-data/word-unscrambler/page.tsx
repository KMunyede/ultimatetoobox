import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import { Metadata } from "next";
import { WordUnscramblerClient } from "./WordUnscramblerClient";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Word Unscrambler";
const TOOL_TYPE = "Anagram Solver";
const TOOL_DESC = "Instantly untangle any anagram and find the hidden words in milliseconds — no signup required.";
const PATH = "/text-data/word-unscrambler";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    }
  };
}

const faqs = [
  {
    question: "What is a Word Unscrambler used for?",
    answer: "A Word Unscrambler is used for solving anagrams and finding valid words in jumbled letters. It is frequently used by Scrabble and crossword players.",
  },
  {
    question: "Does it support multiple languages?",
    answer: "Yes! Our Word Unscrambler supports multiple dictionaries including English, German, French, Italian, Spanish, and Portuguese.",
  },
  {
    question: "Can it find blank tile possibilities?",
    answer: "Currently, this specific tool finds exact matches. Use common vowels or consonants along with your scrambled letters to test possibilities.",
  },
];

export default function WordUnscramblerPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Word Unscrambler", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/word-unscrambler/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Enter Letters', description: 'Type your scrambled letters here. Supports up to 15 characters.' } },
    { element: '.bg-blue-600', popover: { title: '2. Unscramble', description: 'Click to search our dictionaries for all possible word combinations.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Word Anagram Solver"
        subtitle="Instantly untangle any anagram. Find hidden words in milliseconds using our global dictionaries."
        lastUpdated={lastUpdated}
        tourId="word_unscrambler"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-5xl mx-auto">
        <WordUnscramblerClient />
      </div>

      <ToolArticle title="Master Your Text: The Power of Unscrambling">
        <p>
          Whether you are stuck on a difficult anagram or trying to maximize your score in Scrabble, our powerful Word Unscrambler provides instant solutions.
        </p>
        
        <h3>Advanced Features for Word Enthusiasts</h3>
        <ul>
          <li><strong>Wildcard Support:</strong> Use <code>?</code> or <code>*</code> to represent blank tiles.</li>
          <li><strong>Ergonomic Filters:</strong> Narrow down results by specifying starting letters or suffixes.</li>
          <li><strong>Scrabble Scoring:</strong> Every found word includes its standard point value.</li>
        </ul>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Enter Letters</strong> - Type your jumbled characters; use `?` or `*` for blank tiles or wildcards.</li>
          <li><strong>Step 2: Apply Filters</strong> - Narrow results by defining how words should start, end, or what they must contain.</li>
          <li><strong>Step 3: Pick Your Word</strong> - Browse results grouped by length and click any word to copy it to your clipboard.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

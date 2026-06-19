import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import { Metadata } from "next";
import { WordCountClient } from "./WordCountClient";
import { Suspense } from "react";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Word Count Tool";
const TOOL_TYPE = "Word Counter";
const TOOL_DESC = "Count words, characters and sentences instantly — no signup required.";
const PATH = "/text-data/word-count";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${TOOL_NAME} — Free Online ${TOOL_TYPE} | Hilmost Toolbox`;
  const description = `Analyze your text with precision. Free online word counter to track word density, character counts, and sentence structure instantly.`;
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
    question: "How does the word counter determine what a word is?",
    answer: "Our tool uses advanced regular expressions to identify continuous strings of characters separated by spaces or punctuation. This ensures that hyphenated words and complex sentences are counted accurately, matching the standard used by professional word processors.",
  },
  {
    question: "Are spaces included in the character count?",
    answer: "Yes, standard character counts usually include spaces. However, our tool explicitly provides two separate metrics: 'Characters' (which includes spaces) and 'No Spaces' (which ignores them), giving you complete precision.",
  },
  {
    question: "Is there a limit to how much text I can paste?",
    answer: "Because this tool runs entirely locally in your browser memory (with zero server latency), there is effectively no hard limit. You can paste an entire novel into the text box and it will calculate the metrics instantly.",
  },
];

export default function WordCountPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Word Count", href: "/text-data/word-count" },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/word-count/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);
  const canonicalUrl = getCanonicalUrl(PATH);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Word <span className="text-blue-600 dark:text-blue-500">Count Tool</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Precision text analytics in real-time. Know exactly what you&apos;ve written, down to the character.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <WordCountClient />
        </div>
      </Suspense>

      <ToolArticle title="Master Your Text Metrics">
        <p>
          Whether you are an author trying to hit a publisher&apos;s exact word count requirement, a student formatting an essay, or a social media manager crafting the perfect tweet, knowing your exact text metrics provides instant peace of mind.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Paste Text</strong> - Insert your raw text or data string into the main input area.</li>
          <li><strong>Step 2: Select Action</strong> - Choose your formatting, encoding, or analysis mode.</li>
          <li><strong>Step 3: Copy Result</strong> - View the generated analytics or encoded output and click to copy.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

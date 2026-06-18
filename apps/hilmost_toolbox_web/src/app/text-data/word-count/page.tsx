import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { WordCountClient } from "./WordCountClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Word Count Tool | Precision Text Analytics",
  description: "Free online word count tool. Precision text analytics in real-time. Know exactly what you&apos;ve written, down to the character.",
};

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
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="Word Count Tool | Hilmost" description="Precision text analytics in real-time. Know exactly what you&apos;ve written, down to the character." url="https://hilmost-toolbox.hilmost.net/text-data/word-count" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Word <span className="text-blue-500">Count Tool</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Precision text analytics in real-time. Know exactly what you&apos;ve written, down to the character.
        </p>
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
      <RelatedTools category="text-data" currentPath="/text-data/word-count" />
    </div>
  );
}

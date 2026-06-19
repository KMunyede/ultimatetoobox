import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { Suspense } from "react";
import { Base64Client } from "./Base64Client";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Base64 Text Encoder & Decoder";
const TOOL_DESC = "Safely transform your text strings into URL-friendly ASCII format — no signup required.";
const PATH = "/text-data/base64-encode";

export function Base64PageUI({
  defaultMode = "encode",
  title = TOOL_NAME,
  description = "Free online Base64 text encoder and decoder. Developer-grade data encoding to safely transform your text strings, instantly.",
  canonicalUrl = getCanonicalUrl(PATH),
  lastUpdated
}: {
  defaultMode?: "encode" | "decode";
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Base64 Encoder", href: "/text-data/base64-encode" },
  ];

  const faqs = [
    {
      question: "What is Base64 encoding used for?",
      answer: "Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is commonly used when there is a need to encode binary data, especially when that data needs to be stored and transferred over media that are designed to deal with text, like JSON or HTML.",
    },
    {
      question: "Is Base64 encoding a form of encryption?",
      answer: "No, Base64 is NOT encryption. It is merely a data format translation. Anyone can easily decode a Base64 string back to its original form. Do not use Base64 to secure passwords or sensitive data.",
    },
    {
      question: "Is my data sent to a server?",
      answer: "No. All encoding and decoding happens directly in your browser using JavaScript. We do not store, log, or transmit your data to any external server, ensuring maximum privacy and security for your strings.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 || word.toLowerCase() === 'encoder' || word.toLowerCase() === 'decoder' ? <span key={i} className="text-blue-500">{word} </span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          {description.split('.')[0]}. {description.split('.')[1]}.
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
          <Base64Client defaultMode={defaultMode} />
        </div>
      </Suspense>

      <ToolArticle title="The Developer's Guide to Base64">
        <p>
          When you're dealing with strict data transfer protocols, moving raw binary data or special characters can break your JSON payload or corrupt your HTTP request. Base64 encoding solves this problem by safely transforming your strings into a uniform, URL-safe ASCII format.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Paste Text</strong> - Insert your raw text or data string into the main input area.</li>
          <li><strong>Step 2: Select Action</strong> - Choose your formatting, encoding, or analysis mode.</li>
          <li><strong>Step 3: Copy Result</strong> - View the generated analytics or encoded output and click to copy.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath="/text-data/base64-encode" />
    </div>
  );
}

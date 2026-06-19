import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import { Metadata } from "next";
import { MD5HashClient } from "./MD5HashClient";
import { Suspense } from "react";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "MD5 Hash Generator";
const TOOL_TYPE = "MD5 Hashing Tool";
const TOOL_DESC = "Generate lightning-fast MD5 hashes to verify data integrity — no signup required.";
const PATH = "/text-data/md5-hash";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${TOOL_NAME} — Free Online ${TOOL_TYPE} | Hilmost Toolbox`;
  const description = `Generate MD5 hashes instantly. Free online tool to verify data integrity and checksums. Secure, local browser-based hashing with no signup required.`;
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
    question: "What is an MD5 hash used for?",
    answer: "MD5 is a cryptographic hash function that produces a 128-bit hash value. It's most commonly used to verify data integrity. By comparing the MD5 hash of a downloaded file against the original hash, you can confirm that the file wasn't corrupted or modified.",
  },
  {
    question: "Can an MD5 hash be reversed or decrypted?",
    answer: "No. MD5 is a one-way hashing algorithm, meaning you cannot mathematically 'decrypt' the hash back into the original text. However, because MD5 is an older algorithm, attackers often use 'rainbow tables' (pre-computed lists of hashes for common words) to guess the original input. This is why MD5 should not be used to store passwords.",
  },
  {
    question: "Is this generator secure for my data?",
    answer: "Yes. Our MD5 generator operates entirely locally within your browser using JavaScript. We never send the text you input to any remote server, ensuring that your data remains 100% private.",
  },
];

export default function MD5Page() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "MD5 Hash", href: "/text-data/md5-hash" },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/md5-hash/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);
  const canonicalUrl = getCanonicalUrl(PATH);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          MD5 <span className="text-indigo-600 dark:text-indigo-500">Hash Generator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Lightning-fast, secure cryptographic hashing. Verify data integrity with zero delay.
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
          <MD5HashClient />
        </div>
      </Suspense>

      <ToolArticle title="Understanding MD5 and Data Integrity">
        <p>
          Whether you are a developer securing a webhook signature or a user verifying the integrity of a large software download, generating a quick MD5 hash provides instantaneous confirmation that your data is exactly as it should be.
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

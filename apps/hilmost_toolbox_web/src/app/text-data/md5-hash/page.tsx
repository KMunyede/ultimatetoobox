import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { MD5HashClient } from "./MD5HashClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MD5 Hash Generator | Lightning-Fast Cryptographic Hashing",
  description: "Free online MD5 hash generator. Lightning-fast, secure cryptographic hashing to verify data integrity with zero delay.",
};

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
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name="MD5 Hash Generator | Hilmost" description="Lightning-fast, secure cryptographic hashing to verify data integrity with zero delay." url="https://hilmost-toolbox.hilmost.net/text-data/md5-hash" />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          MD5 <span className="text-blue-500">Hash Generator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Lightning-fast, secure cryptographic hashing. Verify data integrity with zero delay.
        </p>
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
      <RelatedTools category="text-data" currentPath="/text-data/md5-hash" />
    </div>
  );
}

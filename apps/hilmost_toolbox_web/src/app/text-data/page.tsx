import { WebApplicationSchema, Breadcrumbs, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TITLE = "Text & Data Tools";
const DESC = "Analyze, encode, and transform text and data instantly. Free online tools for word count, MD5 hashing, Base64 encoding, and unscrambling.";
const PATH = "/text-data";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = generatePageTitle(TITLE);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    }
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

const faqs = [
  {
    question: "Is it safe to paste sensitive data into these free online text tools?",
    answer: "Yes. Our tools are designed with a 'client-side first' architecture. This means that all text processing, hashing, and encoding happens entirely within your browser. We do not transmit your text to our servers, ensuring your sensitive data remains completely private."
  },
  {
    question: "How accurate is the online word counter?",
    answer: "Our Word Count tool uses advanced regular expressions to accurately identify words, sentences, and character counts, including support for whitespace variations and special characters. It is a reliable resource for writers and students meeting strict word limits."
  },
  {
    question: "What is MD5 hashing used for?",
    answer: "MD5 hashing is primarily used to verify data integrity. By generating a unique 'fingerprint' for a piece of text or a file, you can later re-hash the data to ensure it hasn't been altered. Note: MD5 should not be used for high-security password storage."
  },
  {
    question: "Does the Base64 tool support URL-safe encoding?",
    answer: "Yes, our Base64 Text Encoder follows standard encoding rules that make the resulting strings safe for use in URLs and data URI schemes. It is a vital utility for web developers and system administrators."
  },
  {
    question: "Do you store any of the text I process on your site?",
    answer: "No. We have zero server-side storage for the data you process using our text tools. Once you close your browser tab, your data is gone from your device's memory and is never recorded in our logs."
  }
];

export default function TextDataHub() {
  const breadcrumbItems = [{ label: "Text & Data", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Text & Data Tools | Hilmost Toolbox",
    "description": "A secure suite of free online text analysis, hashing, and encoding utilities.",
    "url": CANONICAL_URL,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": links.map((link, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://hilmost-toolbox.hilmost.net${link.href}`,
        "name": link.name
      }))
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />
      <FAQSchema items={faqs} />
            <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Free Online Text Tools
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Secure and high-performance utilities for text analysis, data transformation, and cryptographic hashing. All processing happens locally in your browser for 100% privacy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

      <CollapsibleSection title="About Text & Data Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the Hilmost lab for <strong>free online text tools</strong> and data utilities. In the modern digital landscape, the ability to quickly analyze, transform, and secure text-based data is crucial for everyone from creative writers to systems engineers. We have built a high-performance suite of tools designed to provide instant results without compromising your data privacy.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Essential Analysis and Formatting Utilities</h2>
          <p>
            Whether you are drafting an article, a social media post, or a technical report, our <strong>Word Count</strong> tool provides real-time statistics on your content. We go beyond simple counts, offering insights into sentence structure and character density. For word-game enthusiasts and crossword solvers, our <strong>Word Unscrambler</strong> uses a comprehensive dictionary engine to find hidden anagrams in seconds, helping you break through linguistic bottlenecks.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Secure Hashing and Encoding for Developers</h2>
          <p>
            Data security and transport are at the heart of our technical utility suite. Our <strong>MD5 Hash Generator</strong> provides a reliable way to verify the integrity of your data strings, while the <strong>Base64 Text Encoder</strong> is a staple for developers needing to move binary data through text-only protocols. We ensure that these tools follow RFC standards, providing outputs that are compatible with any system or programming language.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Privacy by Architecture</h2>
          <p>
            The primary risk with online text tools is the &quot;leakage&quot; of sensitive information to remote servers. At Hilmost Digital Labs, we have solved this through a <strong>browser-side architecture</strong>. When you use our text tools, your data never leaves your device. This &quot;zero-server&quot; approach makes our platform a safe digital sanctuary for processing private keys, sensitive logs, or confidential drafts.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Engineering Faster Workflows">
        <p>
          Our text tools are optimized for performance and accessibility. We utilize modern JavaScript optimizations to ensure that even large blocks of text are processed without lag. Furthermore, every tool is designed to meet WCAG 2.1 standards, ensuring that high-precision data utilities are available to all users, regardless of their hardware or accessibility needs.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import { Metadata } from "next";
import { WordCountClient } from "./WordCountClient";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Word Count Tool";
const TOOL_TYPE = "Word Counter";
const TOOL_DESC = "Count words, characters and sentences instantly — no signup required.";
const PATH = "/text-data/word-count";
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
    question: "How does the word counter determine what a word is?",
    answer: "Our tool uses advanced regular expressions to identify strings separated by spaces or punctuation, ensuring hyphenated words are counted accurately.",
  },
  {
    question: "Are spaces included in the character count?",
    answer: "We provide two metrics: 'Characters' (includes spaces) and 'No Spaces' (ignores them), giving you complete precision.",
  },
  {
    question: "Is there a limit to how much text I can paste?",
    answer: "Effective zero limit. Because this tool runs locally in your browser memory, you can paste an entire novel without latency.",
  },
];

export default function WordCountPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Word Count", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/word-count/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'textarea', popover: { title: '1. Paste Text', description: 'Enter the content you want to analyze.' } },
    { element: '.grid', popover: { title: '2. Metrics', description: 'See your word, character, and sentence counts update in real-time.' } },
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
        title="Word & Text Analytics"
        subtitle="Precision text metrics in real-time. Know exactly what you've written, down to the character."
        lastUpdated={lastUpdated}
        tourId="word_count"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <WordCountClient />
      </div>

      <ToolArticle title="Master Your Text Metrics">
        <p>
          Whether you are an author hitting a word count or a social media manager crafting a tweet, knowing your exact text metrics provides instant peace of mind.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Content</strong> - Paste your text or start typing directly into the high-performance editor.</li>
          <li><strong>Step 2: Review Statistics</strong> - Monitor word, character, and line counts updating in real-time in the sidebar.</li>
          <li><strong>Step 3: Analyze Density</strong> - Use the metrics to ensure your content meets specific publication or academic limits.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

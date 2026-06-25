import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, HowToSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { JSONFormatterClient } from "./JSONFormatterClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "JSON Formatter & Validator";
const TOOL_DESC = "Pretty-print, validate, and minify JSON data instantly. Secure, browser-side JSON formatter with syntax highlighting and error detection.";
const PATH = "/dx/json-formatter";
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
    question: "Is it safe to paste my JSON data here?",
    answer: "Yes. All processing happens entirely within your web browser. Your data is never uploaded to our servers, ensuring 100% privacy and security for your technical data.",
  },
  {
    question: "What happens if my JSON is invalid?",
    answer: "Our validator will highlight the exact line and character where the error occurred, providing a clear error message to help you fix the issue quickly.",
  },
  {
    question: "Can this tool handle large JSON files?",
    answer: "Yes, our engine is optimized for performance and can handle multi-megabyte JSON payloads with ease.",
  },
];

const howToSteps = [
  { name: "Paste JSON", text: "Paste your raw or messy JSON data into the input area." },
  { name: "Format or Minify", text: "Choose 'Format' for a pretty-print view or 'Minify' to remove all whitespace." },
  { name: "Fix Errors", text: "If the JSON is invalid, use the error highlights to correct your syntax." },
  { name: "Copy Result", text: "Click the copy button to get the processed JSON back to your clipboard." },
];

export default function JSONFormatterPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "JSON Formatter", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/json-formatter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-json-input', popover: { title: '1. Input Data', description: 'Paste your raw JSON here. Don\'t worry about the mess; we will clean it up.' } },
    { element: '#tour-json-actions', popover: { title: '2. Actions', description: 'Switch between Pretty-Print and Minify modes instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Format and Validate JSON`}
        description="Follow these four simple steps to clean up and verify your JSON data using our high-performance engine."
        steps={howToSteps}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="JSON Architecture Lab"
        subtitle="Transform messy data into clean, valid code. Instant pretty-printing, minification, and syntax validation with zero server lag."
        lastUpdated={lastUpdated}
        tourId="json_formatter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <JSONFormatterClient />

      <ToolArticle title="Mastering JSON: Why Clean Data Matters">
        <p>
          JavaScript Object Notation (JSON) has become the de facto standard for data exchange on the web. Whether you are working with REST APIs, configuration files like <code>package.json</code>, or NoSQL databases, the ability to read and validate your JSON data is essential for efficient development.
        </p>

        <h3>The Dangers of Invalid JSON</h3>
        <p>
          A single missing comma or trailing bracket can crash an entire production application. Manual debugging of large JSON blocks is time-consuming and error-prone. Our <strong>JSON Validator</strong> automates this process, catching syntax errors instantly and ensuring your data conforms to the strict JSON specification.
        </p>

        <h3>Pretty-Print vs. Minification</h3>
        <p>
          While <strong>Pretty-Printing</strong> is essential for human readability during development and debugging, <strong>Minification</strong> is critical for production performance. By removing all unnecessary whitespace, you reduce the payload size, leading to faster data transfers and lower bandwidth costs. Our tool gives you the power to switch between these two modes with a single click.
        </p>

        <h3>Zero-Server Security Architecture</h3>
        <p>
          Many online formatters upload your data to a server for processing, which can be a massive security risk if your JSON contains API keys, customer data, or internal configurations. At Hilmost Digital Labs, we use a <strong>browser-side architecture</strong>. Your data never leaves your device, making our JSON lab the safest place for your technical workflows.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

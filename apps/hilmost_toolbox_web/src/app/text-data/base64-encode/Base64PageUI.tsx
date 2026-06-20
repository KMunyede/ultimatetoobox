import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { Base64Client } from "./Base64Client";
import { ShareButton } from "@/components/ShareButton";

export function Base64PageUI({
  defaultMode = "encode",
  title = "Base64 Text Encoder & Decoder",
  description = "Free online Base64 text encoder and decoder. Developer-grade data encoding to safely transform your text strings, instantly.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/text-data/base64-encode",
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
      answer: "Representing binary data in ASCII format, commonly used in JSON or HTML data transfers.",
    },
    {
      question: "Is Base64 encoding a form of encryption?",
      answer: "No, Base64 is NOT encryption. It is a data format translation and is easily reversible.",
    },
    {
      question: "Is my data sent to a server?",
      answer: "No. All encoding and decoding happens locally in your browser for maximum privacy.",
    },
  ];

  const tourSteps = [
    { element: 'textarea', popover: { title: '1. Paste Content', description: 'Enter the text you want to encode or decode.' } },
    { element: '.bg-blue-600', popover: { title: '2. Convert', description: 'Select the mode and get your result instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-5xl">
      <WebApplicationSchema
        name={`${title} | Hilmost`}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' — ')[0]}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="base64_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <Base64Client defaultMode={defaultMode} />
      </div>

      <ToolArticle title="The Developer&apos;s Guide to Base64">
        <p>
          When you&apos;re dealing with strict data transfer protocols, moving raw binary data or special characters can break your JSON payload. Base64 encoding solves this by transforming strings into a uniform, URL-safe format.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Paste Text</strong> - Insert your raw text into the main input area.</li>
          <li><strong>Step 2: Select Mode</strong> - Choose between Encoding or Decoding.</li>
          <li><strong>Step 3: Copy Result</strong> - View the transformed output and click to copy.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath="/text-data/base64-encode" />
    </div>
  );
}

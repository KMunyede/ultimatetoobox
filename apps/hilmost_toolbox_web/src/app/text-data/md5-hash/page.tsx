import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import { Metadata } from "next";
import { MD5HashClient } from "./MD5HashClient";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "MD5 Hash Generator";
const TOOL_TYPE = "MD5 Hashing Tool";
const TOOL_DESC = "Generate lightning-fast MD5 hashes to verify data integrity — no signup required.";
const PATH = "/text-data/md5-hash";
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
    question: "What is an MD5 hash used for?",
    answer: "MD5 is a cryptographic hash function that produces a 128-bit hash value, commonly used to verify data integrity.",
  },
  {
    question: "Can an MD5 hash be reversed or decrypted?",
    answer: "No. MD5 is a one-way hashing algorithm. It cannot be mathematically 'decrypted' back to original text.",
  },
  {
    question: "Is this generator secure for my data?",
    answer: "Yes. Our generator operates entirely locally in your browser. We never send your input to any remote server.",
  },
];

export default function MD5Page() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "MD5 Hash", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/md5-hash/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'textarea', popover: { title: '1. Enter Text', description: 'Paste the content you want to hash.' } },
    { element: '.font-mono', popover: { title: '2. Checksum', description: 'Copy the unique 32-character hexadecimal string instantly.' } },
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
            <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Lightning-fast, secure cryptographic hashing. Verify data integrity with zero delay."
        lastUpdated={lastUpdated}
        tourId="md5_gen"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="max-w-4xl mx-auto">
        <MD5HashClient />
      </div>

      <ToolArticle title="Understanding MD5 and Data Integrity">
        <p>
          Whether you are a developer securing a webhook signature or a user verifying a download, a quick MD5 hash provides confirmation that your data is exactly as it should be.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Paste Raw Text</strong> - Insert your text or data string into the secure, local input area.</li>
          <li><strong>Step 2: Generate Hash</strong> - The 32-character hexadecimal MD5 checksum is created instantly as you type.</li>
          <li><strong>Step 3: Verify Integrity</strong> - Copy the unique hash to confirm file authenticity or perform data deduplication.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}

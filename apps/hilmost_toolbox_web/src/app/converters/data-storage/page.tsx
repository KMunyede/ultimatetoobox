import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { DataStorageClient } from "./DataStorageClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";

import { formatTitle } from "@/lib/metadata";

const TITLE = "Data Storage Converter — Convert MB to GB Instantly";
const DESC = "Free online data storage converter. Instantly convert between bits, bytes, kilobytes, megabytes, gigabytes, and more with high precision.";
const PATH = "/converters/data-storage";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TITLE);
  return {
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Data Storage Converter" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

const faqs = [
  {
    question: "What is the difference between a bit and a byte?",
    answer: "A bit (short for binary digit) is the smallest unit of data and has a value of 0 or 1. A byte is composed of exactly 8 bits.",
  },
  {
    question: "Why does my 1TB hard drive only show 931GB on my computer?",
    answer: "This is due to the difference between Decimal and Binary calculation. Hard drive manufacturers use Decimal (1KB = 1,000B), while OS manufacturers use Binary (1KB = 1,024B).",
  },
  {
    question: "What comes after a Terabyte?",
    answer: "After a Terabyte (TB) comes a Petabyte (PB), followed by an Exabyte (EB), Zettabyte (ZB), and Yottabyte (YB).",
  },
];

export default function DataStoragePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Data Storage", href: "/converters/data-storage" },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/data-storage/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Data', description: 'Enter the size you want to convert.' } },
    { element: 'select', popover: { title: '2. Select Format', description: 'Choose between binary (1024) or decimal (1000) logic.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema name="Data Storage Converter | Hilmost" description="Free online data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, and more." url="https://hilmost-toolbox.hilmost.net/converters/data-storage" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Digital Data Converter"
        subtitle="Stop struggling with base-2 mathematics. Achieve instant, flawless conversions between digital storage sizes."
        lastUpdated={lastUpdated}
        tourId="data_storage"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <DataStorageClient />
      </div>

      <ToolArticle title="Mastering Digital Measurements">
        <p>
          Whether you are purchasing a new solid-state drive (SSD), subscribing to a cloud storage plan, or determining how long a file will take to download, understanding digital storage units is a mandatory skill.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Data Size</strong> - Input the size of your file or drive (e.g., 500 Megabytes).</li>
          <li><strong>Step 2: Select Format</strong> - Choose the target unit like Gigabytes or Terabytes for your conversion.</li>
          <li><strong>Step 3: Verify Binary/Decimal</strong> - Ensure your storage calculations match your operating system&apos;s logic.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/data-storage" />
    </div>
  );
}

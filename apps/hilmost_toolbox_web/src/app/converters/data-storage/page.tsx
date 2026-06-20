import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { Metadata } from "next";
import { DataStorageClient } from "./DataStorageClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Data Storage Converter — Convert MB to GB Instantly | Hilmost Toolbox",
    description: "Free online data storage converter. Instantly convert between bits, bytes, kilobytes, megabytes, gigabytes, and more with high precision.",
    alternates: {
      canonical: getCanonicalUrl("/converters/data-storage"),
    },
  };
}

const faqs = [
  {
    question: "What is the difference between a bit and a byte?",
    answer: "A bit (short for binary digit) is the smallest unit of data in a computer and has a single binary value, either 0 or 1. A byte is composed of exactly 8 bits. Storage space (like hard drives) is measured in Bytes, while network speed (like internet connections) is usually measured in bits.",
  },
  {
    question: "Why does my 1TB hard drive only show 931GB on my computer?",
    answer: "This is due to the difference between Decimal and Binary calculation. Hard drive manufacturers use Decimal (Base-10), meaning 1 Kilobyte = 1,000 Bytes. However, operating systems like Windows use Binary (Base-2), meaning 1 Kilobyte = 1,024 Bytes. Because the operating system divides by 1024 instead of 1000, the final capacity number appears smaller.",
  },
  {
    question: "What comes after a Terabyte?",
    answer: "After a Terabyte (TB) comes a Petabyte (PB), which is 1,024 Terabytes. After that comes an Exabyte (EB), Zettabyte (ZB), and Yottabyte (YB).",
  },
];

export default function DataStoragePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Data Storage", href: "/converters/data-storage" },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/data-storage/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name="Data Storage Converter | Hilmost" description="Free online data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, and more." url="https://hilmost-toolbox.hilmost.net/converters/data-storage" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Data Storage <span className="text-blue-600 dark:text-blue-500">Converter</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Stop struggling with base-2 mathematics. Achieve instant, mathematically flawless conversions between digital storage sizes.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <DataStorageClient />
      </div>

      <ToolArticle title="Mastering Digital Measurements">
        <p>
          Whether you are purchasing a new solid-state drive (SSD), subscribing to a cloud storage plan, or determining how long a file will take to download, understanding digital storage units is a mandatory skill in the modern world.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/data-storage" />
    </div>
  );
}

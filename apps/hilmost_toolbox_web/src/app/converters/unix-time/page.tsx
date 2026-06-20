import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { UnixTimeClient } from "./UnixTimeClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Unix Timestamp Converter";
const TOOL_DESC = "Free online Unix time converter. Instantly convert Unix epochs to human-readable dates and human dates to Unix timestamps with high precision.";
const PATH = "/converters/unix-time";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Epoch Time Calculator | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is a Unix Epoch?",
    answer: "The Unix epoch (or Unix time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds. It is a system for describing a point in time, widely used in operating systems and file formats.",
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Because many older computer systems store Unix time as a signed 32-bit integer, the maximum value they can store is 2,147,483,647. At exactly 03:14:07 UTC on January 19, 2038, these systems will overflow and 'wrap around' to a negative number, interpreting the year as 1901. Modern systems use 64-bit integers to avoid this.",
  },
  {
    question: "Are leap seconds included in Unix Time?",
    answer: "No. Unix time specifically ignores leap seconds. Every day is treated as if it contains exactly 86,400 seconds. When a leap second occurs, the Unix timestamp essentially repeats a second to stay aligned.",
  },
];

export default function UnixTimePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Unix Time", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/unix-time/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Unix Timestamp <span className="text-blue-600 dark:text-blue-500">Converter</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          The ultimate developer tool. Seamlessly convert epochs to human dates and vice versa with zero friction.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <UnixTimeClient />
      </div>

      <ToolArticle title="Mastering the Epoch">
        <p>
          If you are a software engineer, database administrator, or data scientist, you will inevitably encounter 10-digit numbers representing time. Dealing with these numbers manually is virtually impossible without an epoch converter.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/unix-time" />
    </div>
  );
}

import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { UnixTimeClient } from "./UnixTimeClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

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
    answer: "The Unix epoch (or Unix time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT). It is a system for describing a point in time, widely used in operating systems and file formats.",
  },
  {
    question: "What is the Year 2038 Problem (Y2K38)?",
    answer: "Because many older computer systems store Unix time as a signed 32-bit integer, they will overflow on January 19, 2038. Modern systems use 64-bit integers to avoid this.",
  },
  {
    question: "Are leap seconds included in Unix Time?",
    answer: "No. Unix time specifically ignores leap seconds. Every day is treated as if it contains exactly 86,400 seconds.",
  },
];

export default function UnixTimePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Unix Time", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/unix-time/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.font-mono', popover: { title: '1. Current Epoch', description: 'See the current Unix timestamp updating in real-time.' } },
    { element: 'input', popover: { title: '2. Conversion', description: 'Paste a timestamp or select a date to convert instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Unix Epoch Converter"
        subtitle="The ultimate developer tool. Seamlessly convert epochs to human dates and vice versa."
        lastUpdated={lastUpdated}
        tourId="unix_time"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <UnixTimeClient />

      <ToolArticle title="Mastering the Epoch">
        <p>
          If you are a software engineer or data scientist, you will inevitably encounter 10-digit numbers representing time. Dealing with these manually is virtually impossible without an epoch converter.
        </p>
        
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Input Data</strong> - Enter a Unix timestamp (seconds or milliseconds) or pick a calendar date.</li>
          <li><strong>Step 2: Instant Sync</strong> - The other field updates immediately with the corresponding value.</li>
          <li><strong>Step 3: Copy & Use</strong> - Click the value to copy it to your clipboard for use in code or databases.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}

import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { GpaCalculatorTool } from "./GpaCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Free GPA Calculator";
const TOOL_DESC = "Calculate your semester and cumulative GPA using letter grades, percentages, or 4.0 scale. Supports weighted 4.0 and 5.0 scales.";
const PATH = "/education/gpa-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} — Semester & Cumulative | Hilmost`);
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
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/education.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/education.png"],
    }
  };
}

export default function GpaCalculatorPage() {
  const breadcrumbItems = [
    { label: "Education", href: "/education" },
    { label: "GPA Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/education/gpa-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GPA Calculator",
    "description": TOOL_DESC,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": CANONICAL_URL,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const tourSteps = [
    { element: '#scale-toggle', popover: { title: '1. Choose Scale', description: 'Switch between standard 4.0 and weighted 5.0 scales.' } },
    { element: '#input-mode', popover: { title: '2. Input Mode', description: 'Enter grades as letters, percentages, or raw points.' } },
    { element: '#semester-section', popover: { title: '3. Add Courses', description: 'List your courses and credits for the current semester.' } },
    { element: '#cumulative-section', popover: { title: '4. Cumulative GPA', description: 'Combine your current semester with prior academic results.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Academic Performance Lab"
        subtitle="Precision academic tracking. Calculate semester and cumulative GPA with standard or weighted scales instantly."
        lastUpdated={lastUpdated}
        tourId="gpa_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <GpaCalculatorTool />
    </div>
  );
}

import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { TextCaseConverterTool } from "./TextCaseConverterTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Text Case Converter";
const TOOL_DESC = "Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more. Free, instant, browser-side tool for developers and writers.";
const PATH = "/text-data/text-case-converter";
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
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/text-data.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/text-data.png"],
    }
  };
}

export default function TextCaseConverterPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Case Converter", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/text-case-converter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'textarea', popover: { title: '1. Input Text', description: 'Paste or type the text you want to transform here.' } },
    { element: '.grid', popover: { title: '2. Choose Case', description: 'Click any case type to instantly convert your text.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Case Transformation Lab"
        subtitle="Switch between programming cases and writing formats with precision. 100% private browser-side processing."
        lastUpdated={lastUpdated}
        tourId="text_case_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <TextCaseConverterTool />
    </div>
  );
}

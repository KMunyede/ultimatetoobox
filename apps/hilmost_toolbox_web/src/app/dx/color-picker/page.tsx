import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { ColorPickerTool } from "./ColorPickerTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Free Color Picker & HEX RGB HSL Converter";
const TOOL_DESC = "Pick colors visually or enter HEX, RGB, or HSL values. Instantly convert between formats, generate palettes, check WCAG contrast, and save your color history.";
const PATH = "/dx/color-picker";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} — Hilmost Toolbox`);
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/dx.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/dx.png"],
    }
  };
}

export default function ColorPickerPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "Color Picker", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/color-picker/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Color Picker",
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
    { element: '#main-picker', popover: { title: '1. Visual Picker', description: 'Click the large swatch to pick a color visually using your system color picker.' } },
    { element: '#format-inputs', popover: { title: '2. Values & Formats', description: 'Manually enter HEX, RGB, or HSL values to sync between all formats.' } },
    { element: '#wcag-checker', popover: { title: '3. Accessibility', description: 'Check WCAG contrast ratios against a background color to ensure your designs are accessible.' } },
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
        title="Spectrum Dynamics Studio"
        subtitle="Master the geometry of color. Convert between formats, check accessibility, and generate harmonious palettes with mathematical precision."
        lastUpdated={lastUpdated}
        tourId="color_picker"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <ColorPickerTool />
    </div>
  );
}

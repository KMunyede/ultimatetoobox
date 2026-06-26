import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Free QR Code Generator";
const TOOL_DESC = "Generate QR codes instantly for URLs, text, email, phone or Wi-Fi. Free, no sign-up, download as PNG. Banking-grade security with 100% browser-side generation.";
const PATH = "/dx/qr-code-generator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Free QR Code Generator — Hilmost Toolbox");
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: "Generate QR codes instantly for URLs, text, email, phone or Wi-Fi. Free, no sign-up, download as PNG.",
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

export default function QrCodeGeneratorPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "QR Code Generator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/qr-code-generator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator",
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
    { element: '.lg\\:col-span-7', popover: { title: '1. Select Type', description: 'Choose between URL, Text, Email, Phone, or Wi-Fi to encode.' } },
    { element: '.lg\\:col-span-5', popover: { title: '2. Live Preview', description: 'Your QR code updates instantly. Customize colors and size in the panel below.' } },
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
        title="QR Architecture Studio"
        subtitle="Forge professional-grade QR codes with cryptographic precision. 100% private, browser-side generation for secure data encoding."
        lastUpdated={lastUpdated}
        tourId="qr_generator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <QrCodeGeneratorTool />
    </div>
  );
}

import { WebApplicationSchema, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, ToolArticle } from "@utilitiessite/ui";
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

const faqs = [
  {
    question: "Is this QR code generator free?",
    answer: "Yes, our QR laboratory is 100% free to use for both personal and commercial projects. There are no hidden fees, no subscriptions, and we do not place any watermarks or expiration dates on the generated codes."
  },
  {
    question: "Do you store the data I enter?",
    answer: "Never. Security is a core pillar of the Hilmost monorepo. This tool uses a Zero-Server Architecture, meaning the QR generation happens entirely within your browser's memory. Your Wi-Fi passwords, emails, and URLs never touch our servers."
  },
  {
    question: "What error correction level should I use?",
    answer: "Our tool defaults to 'Medium' (15% recovery), which is ideal for most digital and print uses. If you plan to print the QR code on a surface that might get damaged or obscured (like an outdoor poster), choose 'High' (30% recovery) for maximum durability."
  },
  {
    question: "Can I use the QR code commercially?",
    answer: "Absolutely. The QR codes you forge here are yours to keep. You can use them on business cards, marketing materials, packaging, or digital advertisements without needing to attribute Hilmost Software Corporation."
  }
];

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

  const tourSteps = [
    { element: '#qr-generator-controls', popover: { title: '1. Select Type', description: 'Choose between URL, Text, Email, Phone, or Wi-Fi to encode.' } },
    { element: '#qr-generator-preview', popover: { title: '2. Live Preview', description: 'Your QR code updates instantly. Customize colors and size in the panel below.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />

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

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Mastering QR Encoding: Beyond the Basics">
          <p>
            Quick Response (QR) codes are incredibly versatile digital bridges between the physical and digital worlds. With our <strong>QR Architecture Studio</strong>, you can encode standard <strong>Website URLs</strong> for instant browsing, or share <strong>Plain Text</strong> messages without needing an internet connection.
          </p>

          <h3>Practical Business Applications</h3>
          <p>
            One of the most practical uses is <strong>Wi-Fi Sharing</strong>. Instead of typing complex passwords, your guests can simply scan a code to join your secure network instantly. We also support specialized encoding for <strong>Emails</strong> (including pre-filled subjects and bodies) and <strong>Phone Numbers</strong>, making it easier than ever for customers or friends to reach out with a single tap.
          </p>

          <h3>Privacy-First Architecture</h3>
          <p>
            At Hilmost Digital Labs, we ensure that your QR codes are generated using the highest standards of the ISO/IEC 18004 specification. Most importantly, we use a <strong>Zero-Server Architecture</strong>. Your data never leaves your device; the generation happens entirely in your browser&apos;s memory, ensuring your sensitive information remains private.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

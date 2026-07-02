import { WebApplicationSchema, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, ToolArticle } from "@utilitiessite/ui";
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

const faqs = [
  {
    question: "What is HEX color format?",
    answer: "HEX (Hexadecimal) is a 6-digit code representing colors in web design. It combines Red, Green, and Blue values from 00 to FF. For example, #FF0000 is pure Red."
  },
  {
    question: "How do I convert HEX to RGB?",
    answer: "To convert HEX to RGB, you take each pair of the 6-digit code and convert it from base-16 to base-10. #3B82F6 becomes R: 59, G: 130, B: 246."
  },
  {
    question: "What is WCAG contrast ratio?",
    answer: "The WCAG (Web Content Accessibility Guidelines) contrast ratio measures the difference in perceived luminance between two colors. A ratio of 4.5:1 is required for standard text (AA level)."
  },
  {
    question: "What is HSL color format?",
    answer: "HSL stands for Hue, Saturation, and Lightness. It is often more intuitive than RGB because it aligns with how humans perceive color: the base tint (Hue), how vibrant it is (Saturation), and how bright it is (Lightness)."
  }
];

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

  const tourSteps = [
    { element: '#main-picker', popover: { title: '1. Visual Picker', description: 'Click the large swatch to pick a color visually using your system color picker.' } },
    { element: '#format-inputs', popover: { title: '2. Values & Formats', description: 'Manually enter HEX, RGB, or HSL values to sync between all formats.' } },
    { element: '#wcag-checker', popover: { title: '3. Accessibility', description: 'Check WCAG contrast ratios against a background color to ensure your designs are accessible.' } },
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
        title="Spectrum Dynamics Studio"
        subtitle="Master the geometry of color. Convert between formats, check accessibility, and generate harmonious palettes with mathematical precision."
        lastUpdated={lastUpdated}
        tourId="color_picker"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <ColorPickerTool />

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Mastering Digital Color: A Technical Overview">
          <p>
            Color is the heartbeat of visual communication. Modern web development requires more than just picking a &quot;pretty&quot; color; it requires mathematical precision for accessibility and brand consistency. Our <strong>Spectrum Dynamics Studio</strong> is your all-in-one laboratory for spectrum analysis.
          </p>

          <h3>Format Precision: HEX, RGB, and HSL</h3>
          <p>
            While <strong>HEX</strong> codes are standard for CSS, <strong>RGB</strong> is essential for understanding the light-based nature of digital screens. However, many designers prefer <strong>HSL</strong> (Hue, Saturation, Lightness) because it aligns more closely with how humans perceive color—making it easier to create tints and shades manually.
          </p>

          <h3>Accessibility Compliance (WCAG 2.1)</h3>
          <p>
            Our built-in <strong>WCAG Contrast Checker</strong> measures the difference in perceived luminance between two colors. A ratio of 4.5:1 is the minimum required for standard text to meet AA accessibility standards. Ensuring high contrast is not just about compliance; it&apos;s about ensuring your content is readable by everyone, including users with visual impairments or those viewing screens in bright sunlight.
          </p>

          <h3>Safe & Private</h3>
          <p>
            At Hilmost Software Corporation, we prioritize your security. This tool runs entirely in your browser using pure TypeScript logic—meaning your custom colors and palette data are never transmitted to any server. Your creative process remains 100% private.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

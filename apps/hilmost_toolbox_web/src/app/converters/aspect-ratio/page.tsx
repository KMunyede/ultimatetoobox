import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema, AuthorBio } from "@utilitiessite/ui";
import { Metadata } from "next";
import { AspectRatioCalculatorClient } from "./AspectRatioCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Aspect Ratio Calculator";
const TOOL_DESC = "Calculate image and video aspect ratios instantly. Maintain proportions when resizing, find simplified ratios (16:9, 4:3), and optimize dimensions for social media.";
const PATH = "/converters/aspect-ratio";
const CANONICAL_URL = getCanonicalUrl(PATH);

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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Aspect Ratio Calculator" }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

const faqs = [
  {
    question: "What is an aspect ratio?",
    answer: "An aspect ratio is the proportional relationship between the width and height of an image, screen, or video. it is expressed as two numbers separated by a colon, such as 16:9.",
  },
  {
    question: "How do I calculate a missing dimension?",
    answer: "To maintain the same aspect ratio when resizing, use the formula: (Original Height / Original Width) × New Width = New Height. Our calculator automates this math for you.",
  },
  {
    question: "What is the standard aspect ratio for social media?",
    answer: "Standard ratios vary by platform: Instagram posts are usually 1:1 (square) or 4:5 (portrait), while TikTok and Instagram Reels use 9:16 (vertical). YouTube and most digital video use 16:9 (widescreen).",
  },
  {
    question: "Does aspect ratio affect file size?",
    answer: "Not directly. File size is determined by total pixel count (resolution) and compression. However, a larger aspect ratio often implies a higher resolution, which will result in a larger file.",
  },
];

export default function AspectRatioPage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Aspect Ratio", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/aspect-ratio/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Dimensions', description: 'Enter the original width and height of your image or video.' } },
    { element: '.bg-brand-primary', popover: { title: '2. View Ratio', description: 'See the mathematically simplified ratio instantly.' } },
    { element: 'button', popover: { title: '3. Quick Presets', description: 'Use standard presets for common platforms like YouTube or Instagram.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Aspect Ratio Studio"
        subtitle="Master the geometry of your visuals. Calculate proportional dimensions and simplify complex resolutions in seconds."
        lastUpdated={lastUpdated}
        tourId="aspect_ratio"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <AspectRatioCalculatorClient />

      <ToolArticle title="The Geometry of Content: Mastering Aspect Ratios">
        <p>
          Whether you are a digital designer, a videographer, or a social media manager, the <strong>aspect ratio</strong> is one of the most fundamental concepts you deal with daily. It defines the &quot;shape&quot; of your content, ensuring that your message isn&apos;t distorted or cut off when viewed on different devices.
        </p>

        <h3>Understanding Common Standards</h3>
        <p>
          In the history of display technology, certain ratios have become industry standards:
        </p>
        <ul>
          <li><strong>16:9 (Widescreen):</strong> The universal standard for high-definition television, computer monitors, and cinematic web content.</li>
          <li><strong>4:3 (Standard):</strong> The ratio of classic television and older computer monitors; still used today in many presentation formats.</li>
          <li><strong>1:1 (Square):</strong> Popularized by Instagram, this ratio is ideal for mobile-first social media feeds.</li>
          <li><strong>9:16 (Vertical):</strong> The inverse of widescreen, optimized for smartphones and vertical video platforms like TikTok.</li>
        </ul>

        <h3>Maintaining Proportions During Resizing</h3>
        <p>
          The primary challenge when resizing assets is avoiding &quot;stretch&quot; or &quot;squish.&quot; If you have a high-resolution image (e.g., 5472 x 3648) and need to fit it into a web container that is 800 pixels wide, you must calculate the exact height that maintains the ratio. Our <strong>Aspect Ratio Studio</strong> uses high-precision math to find that missing dimension instantly, preserving the visual integrity of your work.
        </p>

        <h3>Why Simplified Ratios Matter</h3>
        <p>
          Knowing that an image is 1920x1080 is helpful, but knowing it is <strong>16:9</strong> is critical for technical planning. Simplified ratios allow developers to use CSS properties like `aspect-ratio` to create responsive containers that scale perfectly across mobile and desktop without layout shifts.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="generic" />
      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}

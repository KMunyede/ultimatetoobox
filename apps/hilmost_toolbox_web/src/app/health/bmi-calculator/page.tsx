import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader, AuthorBio, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { BMIClient } from "./BMIClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "BMI Calculator";
const TOOL_DESC = "Calculate your Body Mass Index (BMI) instantly. A free, beautifully designed health tool to check your ideal weight category with high precision.";
const PATH = "/health/bmi-calculator";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/health.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/health.png"],
    }
  };
}

const faqs = [
  {
    question: "What is a healthy BMI?",
    answer: "A healthy BMI typically falls between 18.5 and 24.9. Below 18.5 is underweight, above 25 is overweight, and above 30 is obese.",
  },
  {
    question: "Is BMI an accurate measure of health?",
    answer: "It's a useful screening tool but not a direct diagnostic of body fat. It doesn't account for muscle mass, bone density, or distribution.",
  },
  {
    question: "How is BMI calculated?",
    answer: "Weight in kilograms divided by height in meters squared (kg/m²).",
  },
];

export default function BMIPage() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "BMI Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/bmi-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-bmi-inputs', popover: { title: '1. Enter Details', description: 'Input your height and weight. You can toggle between metric and imperial units.' } },
    { element: '#tour-bmi-results', popover: { title: '2. Your BMI', description: 'See your calculated BMI score and which health category it falls into.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost Toolbox`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Stop guessing your true physical status. Instantly reveal your exact Body Mass Index."
        lastUpdated={lastUpdated}
        tourId="bmi_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <BMIClient />

      <ToolArticle title="Understanding Your Body Mass Index (BMI)">
        <p>
          Body Mass Index (BMI) is a standardized metric used globally by health professionals to estimate whether a person has a healthy body weight for their height.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Metrics</strong> - Input your current height and weight accurately into the provided fields.</li>
          <li><strong>Step 2: Select System</strong> - Toggle between Metric (cm/kg) or Imperial (ft/lbs) units depending on your preference.</li>
          <li><strong>Step 3: Review Results</strong> - See your Body Mass Index score and its corresponding health category instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="health" />
      <RelatedTools category="health" currentPath={PATH} />
    </div>
  );
}

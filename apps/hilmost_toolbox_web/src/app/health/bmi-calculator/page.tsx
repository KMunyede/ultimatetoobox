import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { BMIClient } from "./BMIClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "BMI Calculator";
const TOOL_DESC = "Calculate your Body Mass Index (BMI) instantly. A free, beautifully designed health tool to check your ideal weight category with high precision.";
const PATH = "/health/bmi-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Free Body Mass Index Check | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: `${TOOL_NAME} — Body Mass Index Checker`,
      description: "Instantly reveal your exact Body Mass Index and map out your optimal health trajectory.",
      images: ["/og/health.png"],
    },
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
    <div className="container mx-auto px-4 py-4 max-w-5xl">
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
          <li><strong>Step 1: Input Metrics</strong> - Enter your physical measurements accurately.</li>
          <li><strong>Step 2: Select System</strong> - Toggle between metric or imperial units if required.</li>
          <li><strong>Step 3: View Health Index</strong> - Review your calculated health indicators instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="health" currentPath={PATH} />
    </div>
  );
}

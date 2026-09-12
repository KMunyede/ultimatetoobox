import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, AuthorBio, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BMIClient } from "./BMIClient";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "BMI & Health Risk Calculator";
const TOOL_DESC = "Calculate Body Mass Index (BMI), Waist-to-Height Ratio (WHtR), and Waist-to-Hip Ratio (WHR) using regional IDF and WHO health risk thresholds.";
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
    answer: "A healthy BMI typically falls between 18.5 and 24.9. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese.",
  },
  {
    question: "Why measure waist circumference alongside BMI?",
    answer: "BMI alone cannot distinguish muscle from fat or measure abdominal adiposity. Waist circumference and Waist-to-Height ratio (WHtR) directly measure visceral fat, which is strongly linked to cardiovascular and metabolic risks.",
  },
  {
    question: "What is the Waist-to-Height Ratio (WHtR) rule?",
    answer: "A healthy guideline is to keep your waist circumference to less than half your height (WHtR < 0.50).",
  },
  {
    question: "Why do IDF waist thresholds vary by ethnicity/region?",
    answer: "Cardiovascular and type 2 diabetes risks occur at lower body fat levels in certain populations, such as South Asian, Chinese, and Japanese groups.",
  },
];

export default function BMIPage() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "BMI & Health Risk Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/bmi-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-bmi-inputs', popover: { title: '1. Enter Details', description: 'Input height, weight, waist, biological sex, and region to calculate your comprehensive risk profile.' } },
    { element: '#tour-bmi-results', popover: { title: '2. Health Risk Dashboard', description: 'View your BMI, Waist-to-Height Ratio, and regional waist threshold evaluations side-by-side.' } },
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
        subtitle="Comprehensive body composition & abdominal adiposity screening. Calculate BMI, WHtR, WHR, and regional IDF risk indicators."
        lastUpdated={lastUpdated}
        tourId="bmi_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <BMIClient />

      <ToolArticle title="Understanding BMI & Abdominal Health Risk Assessment">
        <p>
          While Body Mass Index (BMI) remains a widely used screening metric, modern clinical research emphasizes that abdominal adiposity—measured via Waist Circumference and Waist-to-Height Ratio—provides crucial insight into metabolic and cardiovascular risk.
        </p>
        
        <h3>How to Conduct a Comprehensive Screening</h3>
        
        <ol>
          <li><strong>Step 1: Height & Weight</strong> - Input height and weight to calculate baseline Body Mass Index (BMI).</li>
          <li><strong>Step 2: Biological Sex & Ethnicity</strong> - Select your sex and region to apply ethnic-specific IDF waist circumference thresholds.</li>
          <li><strong>Step 3: Waist & Hip Circumference</strong> - Add waist circumference to calculate Waist-to-Height Ratio (WHtR) and Waist-to-Hip Ratio (WHR).</li>
        </ol>

        <div className="mt-8 p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl not-prose">
          <h4 className="text-lg font-normal text-rose-900 dark:text-rose-100 mb-2 uppercase tracking-tight">Wellness Insight</h4>
          <p className="text-rose-800 dark:text-rose-300 mb-4 font-medium">Want to know exactly how BMI is calculated and where it can be misleading?</p>
          <Link href="/guides/bmi-calculation-and-limitations" className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-widest text-brand-primary hover:underline">
            Read our full BMI Guide <ArrowRight size={14} />
          </Link>
        </div>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="health" />
      <RelatedTools category="health" currentPath={PATH} />
    </div>
  );
}

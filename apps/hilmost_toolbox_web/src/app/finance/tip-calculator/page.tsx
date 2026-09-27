import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema, AuthorBio } from "@utilitiessite/ui";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TipCalculatorClient } from "./TipCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Tip & Split Calculator";
const TOOL_DESC = "Calculate the perfect tip amount and split the restaurant bill evenly among friends instantly. Free online tip calculator.";
const PATH = "/finance/tip-calculator";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/finance.png"],
    }
  };
}

const faqs = [
  {
    question: "What is the standard tipping percentage?",
    answer: "In the US, 15% is the minimum standard, 18% is standard for good service, and 20% or higher is customary for exceptional service.",
  },
  {
    question: "Should I tip before or after tax?",
    answer: "Etiquette experts generally agree you should tip based on the pre-tax subtotal, though many tip on the grand total for convenience.",
  },
  {
    question: "Do I need to tip if gratuity is already included?",
    answer: "No. Large parties often have an automatic 18% to 20% added. You are not obligated to leave more unless the service was outstanding.",
  },
];

export default function TipCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Tip Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/tip-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Bill Total', description: 'Enter the total amount from your receipt.' } },
    { element: '.flex-wrap', popover: { title: '2. Split', description: 'Enter the number of people to divide the cost evenly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Restaurant Tip & Split"
        subtitle="Drop the heavy math. Instantly calculate the perfect gratuity and split the check evenly."
        lastUpdated={lastUpdated}
        tourId="tip_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="max-w-xl mx-auto">
        <TipCalculatorClient />
      </div>

      <ToolArticle title="The Etiquette of Tipping">
        <p>
          Calculating the tip at the end of a meal shouldn&apos;t ruin a great night out. Whether you are dining solo or splitting the check, this tool removes the friction.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Bill Total</strong> - Input the final amount from your restaurant or service receipt.</li>
          <li><strong>Step 2: Set Tip %</strong> - Choose a standard percentage or enter a custom gratuity based on service quality.</li>
          <li><strong>Step 3: Split the Check</strong> - Enter the number of people to see exactly how much each person needs to pay.</li>
        </ol>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl not-prose">
          <h4 className="text-lg font-normal text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-tight">Deeper Dive</h4>
          <p className="text-blue-800 dark:text-blue-300 mb-4 font-medium">Want to learn about tipping etiquette, pre-tax vs post-tax tipping, and bill splitting math?</p>
          <Link href="/guides/tip-calculator-guide" className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-widest text-brand-primary hover:underline">
            Read the full guide <ArrowRight size={14} />
          </Link>
        </div>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="finance" />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

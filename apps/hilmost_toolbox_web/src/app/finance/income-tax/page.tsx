import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { IncomeTaxClient } from "./IncomeTaxClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Income Tax Calculator";
const TOOL_DESC = "Calculate your exact net take-home pay after deductions and estimated taxes instantly. Free online income tax calculator.";
const PATH = "/finance/income-tax";
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
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    }
  };
}

const faqs = [
  {
    question: "What is gross vs. net income?",
    answer: "Gross income is total earnings before taxes. Net income (take-home pay) is what you actually receive after all taxes and deductions are withheld.",
  },
  {
    question: "What is an effective tax rate?",
    answer: "An effective tax rate is the average rate at which your income is taxed. It is your total tax paid divided by your total taxable income.",
  },
  {
    question: "What are tax deductions?",
    answer: "Tax deductions lower your taxable income. Examples include standard deductions, retirement contributions (401k), and health insurance premiums.",
  },
];

export default function IncomeTaxPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Income Tax", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/income-tax/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Gross Salary', description: 'Enter your total annual or monthly salary before taxes.' } },
    { element: '.text-brand-primary', popover: { title: '2. Net Pay', description: 'See your real take-home pay after the estimated tax burden is applied.' } },
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
        title="Net Income Tax Calculator"
        subtitle="Stop guessing your tax burden. Calculate your exact take-home pay and apply deductions instantly."
        lastUpdated={lastUpdated}
        tourId="tax_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <IncomeTaxClient />

      <ToolArticle title="Mastering Your Paycheck: How Taxes Work">
        <p>
          Understanding your paycheck is the first step to financial literacy. When you negotiate a salary, you agree on a Gross Income. However, the amount that hits your bank account is significantly lower.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Gross Salary</strong> - Enter your total annual or monthly income before any deductions.</li>
          <li><strong>Step 2: Apply Deductions</strong> - Subtract standard deductions or retirement contributions to find your taxable income.</li>
          <li><strong>Step 3: Review Net Pay</strong> - See your exact take-home pay after federal and local tax estimates are applied.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

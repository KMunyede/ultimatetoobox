import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { LoanCalculatorClient } from "./LoanCalculatorClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Loan Calculator";
const TOOL_DESC = "Calculate your monthly loan payments, total interest, and exact amortization schedule instantly. Free online tool to uncover the true cost of your loan.";
const PATH = "/finance/loan-calculator";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} | Monthly Payments & Amortization`);
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
    question: "How is my monthly loan payment calculated?",
    answer: "Monthly payments are calculated using the standard amortization formula, multiplying the total principal by the monthly interest rate divided by an exponential term factor.",
  },
  {
    question: "Does this calculator work for mortgages?",
    answer: "Yes, it works perfectly for fixed-rate mortgages. Simply enter the borrowed amount, rate, and term (e.g., 30 years). It does not include property taxes or insurance.",
  },
  {
    question: "What is an amortized loan?",
    answer: "An amortized loan is a loan where the principal is paid down over time. Early in the loan, most of the payment goes toward interest; later, more goes toward the principal.",
  },
];

export default function LoanCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Loan Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/loan-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Loan Details', description: 'Enter the amount you are borrowing and the annual interest rate.' } },
    { element: '.text-brand-primary', popover: { title: '2. Monthly Payment', description: 'See your projected monthly payment and the total interest you will pay over time.' } },
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
        title="Loan Repayment Calculator"
        subtitle="Take control of your debt. Instantly calculate your monthly payments and expose hidden interest."
        lastUpdated={lastUpdated}
        tourId="loan_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <LoanCalculatorClient />

      <ToolArticle title="Mastering Your Debt: How Loans Work">
        <p>
          Taking out a loan—whether it&apos;s for a new house, a car, or personal expenses—is one of the most significant financial decisions you can make. Understanding exactly how your payments are structured is critical.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Principal</strong> - Input the total amount you intend to borrow from the lender.</li>
          <li><strong>Step 2: Set Terms</strong> - Define the annual interest rate and the length of the loan in years.</li>
          <li><strong>Step 3: View Schedule</strong> - See your monthly payment and the total interest you will pay over the life of the loan.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

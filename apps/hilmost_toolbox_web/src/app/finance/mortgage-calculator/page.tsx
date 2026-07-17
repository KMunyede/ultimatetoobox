import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema, AuthorBio } from "@utilitiessite/ui";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MortgageCalculatorClient } from "./MortgageCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Mortgage Calculator";
const TOOL_DESC = "Calculate your monthly mortgage payments including principal, interest, taxes, and insurance (PITI). Plan your home purchase with our free, high-precision mortgage tool.";
const PATH = "/finance/mortgage-calculator";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: "Hilmost Mortgage Calculator" }],
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
    question: "What does PITI stand for?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These four components make up the total monthly mortgage payment that most homeowners pay to their lenders.",
  },
  {
    question: "How much down payment do I need?",
    answer: "While a 20% down payment is traditional to avoid Private Mortgage Insurance (PMI), many programs allow for as little as 3% or 3.5% down. Our calculator lets you input any down payment amount to see how it affects your monthly obligation.",
  },
  {
    question: "Should I choose a 15-year or 30-year term?",
    answer: "A 30-year mortgage offers lower monthly payments but results in much more interest paid over the life of the loan. A 15-year mortgage has higher monthly payments but builds equity faster and saves significantly on total interest.",
  },
  {
    question: "Are property taxes and insurance included in my mortgage?",
    answer: "In most cases, yes. Lenders often collect these payments in an escrow account and pay them on your behalf. Our calculator includes estimates for these to provide a more accurate 'all-in' monthly cost.",
  },
];

export default function MortgageCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Mortgage Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/mortgage-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Property Details', description: 'Enter the purchase price and your planned down payment.' } },
    { element: '.text-brand-primary', popover: { title: '2. All-in Payment', description: 'See your total estimated monthly payment including taxes and insurance.' } },
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
        title="Mortgage Payment Calculator"
        subtitle="Estimate your total monthly home ownership costs. Factor in interest, property taxes, and insurance instantly."
        lastUpdated={lastUpdated}
        tourId="mortgage_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <MortgageCalculatorClient />

      <ToolArticle title="Understanding Your Mortgage: Beyond Principal and Interest">
        <p>
          Buying a home is often the largest financial commitment of a lifetime. While the purchase price is the headline number, your daily financial reality is determined by your <strong>monthly mortgage payment</strong>. To plan effectively, you must look beyond just the loan repayment and account for the full cost of ownership.
        </p>

        <h3>The Components of PITI</h3>
        <p>
          Lenders and financial planners use the acronym <strong>PITI</strong> to describe the four main parts of a mortgage payment:
        </p>
        <ul>
          <li><strong>Principal:</strong> The portion of your payment that goes toward paying down the original loan balance.</li>
          <li><strong>Interest:</strong> The fee charged by the lender for borrowing the money, calculated as a percentage of the remaining balance.</li>
          <li><strong>Taxes:</strong> Real estate or property taxes charged by your local government, usually collected monthly by the lender.</li>
          <li><strong>Insurance:</strong> Homeowners insurance to protect the property, and potentially Private Mortgage Insurance (PMI) if your down payment was less than 20%.</li>
        </ul>

        <h3>How the Calculation Works</h3>
        <p>
          Our mortgage calculator uses the standard amortization formula to determine the Principal and Interest (P&I). It then layers on your estimated property tax and insurance rates to give you a comprehensive monthly figure. This &quot;all-in&quot; number is critical for ensuring you don&apos;t buy a home that strains your monthly budget once the tax bills arrive.
        </p>

        <h3>Strategies for Saving</h3>
        <p>
          To reduce your total cost, consider making a larger down payment, which reduces the principal and may eliminate the need for PMI. Additionally, even a small reduction in your interest rate can save you tens of thousands of dollars over a 30-year term. Always check your local tax rates, as they vary significantly by county and state.
        </p>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl not-prose">
          <h4 className="text-lg font-black text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-tight">Financial Planning</h4>
          <p className="text-blue-800 dark:text-blue-300 mb-4 font-medium">Want to understand exactly how property taxes and insurance impact your monthly budget?</p>
          <Link href="/guides/piti-mortgage-payments-explained" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary hover:underline">
            Read our full PITI Mortgage Guide <ArrowRight size={14} />
          </Link>
        </div>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <AuthorBio category="finance" />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

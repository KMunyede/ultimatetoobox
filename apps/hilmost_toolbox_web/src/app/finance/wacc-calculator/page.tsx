import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { WACCCalculatorClient } from "./WACCCalculatorClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "WACC Calculator (Professional+)";
const TOOL_DESC = "Calculate your Weighted Average Cost of Capital (WACC) and CAPM Cost of Equity. Understand your company's hurdle rate and tax shield savings instantly.";
const PATH = "/finance/wacc-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Cost of Capital & CAPM Dashboard | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is WACC used for?",
    answer: "WACC is the minimum return a company must earn on its existing asset base to satisfy its creditors and owners. It is commonly used as a 'hurdle rate' to evaluate if new projects are worth pursuing.",
  },
  {
    question: "How do I find my company's Beta?",
    answer: "For public companies, Beta is usually listed on financial sites like Yahoo Finance. For private companies, you typically use a 'Proxy Beta'—the average Beta of public companies in the same industry.",
  },
  {
    question: "What is the Tax Shield?",
    answer: "Since interest payments on debt are tax-deductible, having debt reduces a company's tax bill. This 'Tax Shield' effectively lowers the true cost of debt.",
  },
];

export default function WACCCalculatorPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "WACC Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/wacc-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.border-l-blue-500', popover: { title: '1. Equity Details', description: 'Enter your Market Cap and Risk factors. We use these to calculate your Cost of Equity using the CAPM model.' } },
    { element: '.border-l-red-500', popover: { title: '2. Debt & Taxes', description: 'Enter your total debt and interest rate. Remember, debt interest saves you money on taxes!' } },
    { element: '.bg-gradient-to-br', popover: { title: '3. Your Dashboard', description: 'See your final WACC, individual costs, and your yearly Tax Shield savings here.' } },
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
        title="WACC Strategy Dashboard"
        subtitle="Uncover your company's true cost of capital. Integrated CAPM logic and Tax Shield tracking for professional financial analysis."
        lastUpdated={lastUpdated}
        tourId="wacc_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <WACCCalculatorClient />

      <ToolArticle title="Mastering the Hurdle Rate: A Beginner's Guide to WACC">
        <p>
          If you've ever wondered how big corporations decide which projects to fund, the answer is almost always <strong>WACC</strong>. It is the yardstick used to measure if an investment is actually making money or just treading water.
        </p>

        <h3>Simplistic 3-Step Usage Guide</h3>
        <ol className="space-y-4 my-6">
          <li className="bg-white p-4 rounded-xl border border-base shadow-sm">
            <span className="font-black text-blue-600 mr-2">Step 1: Equity Data</span>
            Input your <strong>Market Cap</strong> (Total value of your shares) and <strong>Beta</strong>. If you aren't sure about Beta, 1.0 is a safe "average" starting point.
          </li>
          <li className="bg-white p-4 rounded-xl border border-base shadow-sm">
            <span className="font-black text-red-600 mr-2">Step 2: Debt Data</span>
            Enter how much <strong>Interest-bearing Debt</strong> you have and what rate you pay. Also, enter your <strong>Tax Rate</strong> (usually around 20-30%).
          </li>
          <li className="bg-white p-4 rounded-xl border border-base shadow-sm">
            <span className="font-black text-amber-600 mr-2">Step 3: Analyze the Dashboard</span>
            Look at the <strong>Total WACC</strong>. This is your "Hurdle Rate." Any new project you start should earn a return HIGHER than this number.
          </li>
        </ol>

        <h3>Why the Tax Shield is Your Secret Weapon</h3>
        <p>
          One of the most misunderstood parts of finance is that <strong>debt can be cheaper than it looks</strong>. Because interest payments are tax-deductible, a 6% interest rate might only cost you 4.5% after taxes. Our dashboard calculates this "Tax Shield Savings" automatically to show you the hidden benefit of your capital structure.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { CompoundInterestClient } from "./CompoundInterestClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Compound Interest Calculator";
const TOOL_DESC = "Discover the power of compounding. Free online calculator to project investment growth, monthly contributions, and long-term wealth accumulation.";
const PATH = "/finance/compound-interest";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Visualize Your Investment Growth | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is only calculated on your initial principal. Compound interest is calculated on your principal AND the accumulated interest of previous periods.",
  },
  {
    question: "How often is the interest compounded in this calculator?",
    answer: "This calculator assumes your interest is compounded monthly. This is standard for most high-yield savings accounts and stock market projections.",
  },
  {
    question: "Why are monthly contributions so important?",
    answer: "Consistently adding money ensures your baseline principal continues to grow. When compound interest acts on this growing principal, final returns are drastically higher.",
  },
];

export default function CompoundInterestPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Compound Interest", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/compound-interest/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-ci-inputs', popover: { title: '1. Strategy', description: 'Enter your initial deposit, monthly contribution, and expected return.' } },
    { element: '#tour-ci-chart', popover: { title: '2. Visualization', description: 'Watch the "Snowball Effect" happen as your interest starts earning its own interest.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
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
        title="Compounding Interest Engine"
        subtitle="Unlock the eighth wonder of the world. Visualize how your investments grow exponentially over time."
        lastUpdated={lastUpdated}
        tourId="compound_interest"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <CompoundInterestClient />

      <ToolArticle title="The Magic of Compound Interest">
        <p>
          Albert Einstein supposedly called compound interest &quot;the eighth wonder of the world,&quot; stating: &quot;He who understands it, earns it; he who doesn&apos;t, pays it.&quot;
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

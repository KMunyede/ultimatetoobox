import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, HowToSchema } from "@utilitiessite/ui";
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

const howToSteps = [
  { name: "Initial Principal", text: "Enter the starting amount of your investment or savings account." },
  { name: "Monthly Growth", text: "Input your monthly contribution and expected annual return rate." },
  { name: "Time Horizon", text: "Set the number of years you plan to stay invested to see the compounding effect." },
  { name: "Visualize Result", text: "Review the interactive chart to see the 'snowball effect' of your reinvested earnings." },
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
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Calculate Compound Interest`}
        description="Follow these four simple steps to project your future wealth using our compounding engine."
        steps={howToSteps}
      />
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
        <p>
          Our interactive calculator is designed to provide high-precision projections for your savings, retirement accounts, or stock market investments.
        </p>
        <ol>
          <li><strong>Step 1: Set Initial Deposit</strong> - Enter the starting amount of your investment. This is the seed that will grow over time.</li>
          <li><strong>Step 2: Define Monthly Growth</strong> - Input how much you plan to contribute every month. Consistent contributions are the primary driver of long-term success.</li>
          <li><strong>Step 3: Annual Return Rate</strong> - Estimate your expected yearly return. For context, the S&P 500 has historically averaged around 7-10% annually before inflation.</li>
          <li><strong>Step 4: Visualize Wealth</strong> - Use the interactive chart below to see the &quot;snowball effect.&quot; The gap between your contributions and the total balance represents the &quot;magic&quot; of compound interest.</li>
        </ol>

        <h3>Why Compounding Matters</h3>
        <p>
          Unlike simple interest, which only grows your original deposit, compound interest earns interest on your interest. Over decades, this creates an exponential curve that can turn small monthly habits into significant generational wealth.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

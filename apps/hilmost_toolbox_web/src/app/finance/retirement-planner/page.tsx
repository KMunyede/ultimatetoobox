import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { RetirementPlannerClient } from "./RetirementPlannerClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Retirement Planner";
const TOOL_DESC = "Calculate exactly how much you need to save to retire comfortably. Free online retirement planner with visual charts.";
const PATH = "/finance/retirement-planner";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Track Your Financial Future | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What is a good expected return rate?",
    answer: "Historically, the S&P 500 has returned an average of about 10% before inflation. For conservative planning, 6% to 7% is often used.",
  },
  {
    question: "What is the 4% rule?",
    answer: "A rule of thumb for safe withdrawal. If you need $40,000/year to live, you need a nest egg of $1,000,000 ($40,000 / 0.04).",
  },
  {
    question: "Is it ever too late to start saving?",
    answer: "No. While early is best, many governments offer 'catch-up contributions' for older workers to accelerate their savings.",
  },
];

export default function RetirementPlannerPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "Retirement Planner", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/retirement-planner/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-retire-inputs', popover: { title: '1. Plan Details', description: 'Enter your current age, target retirement age, and current savings.' } },
    { element: '#tour-retire-chart', popover: { title: '2. Growth Trajectory', description: 'Visualize your wealth accumulation leading up to retirement.' } },
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
        title="Retirement Savings Planner"
        subtitle="Take absolute control of your timeline. Visualize your retirement trajectory and guarantee your savings stay on track."
        lastUpdated={lastUpdated}
        tourId="retirement_planner"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <RetirementPlannerClient />

      <ToolArticle title="The Blueprint for a Comfortable Retirement">
        <p>
          Planning for retirement is one of the most critical financial tasks you will ever undertake. It requires estimating decades into the future and understanding your lifestyle needs.
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

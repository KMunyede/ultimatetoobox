import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader, BreadcrumbSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { RetirementPlannerClient } from "./RetirementPlannerClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Retirement Planner";
const TOOL_DESC = "Calculate exactly how much you need to save to retire comfortably. Free online retirement planner with visual charts.";
const PATH = "/finance/retirement-planner";
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
    <div className="container mx-auto px-4 py-1 max-w-6xl">
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
          <li><strong>Step 1: Input Current Status</strong> - Enter your current age, savings balance, and target retirement age.</li>
          <li><strong>Step 2: Set Savings Strategy</strong> - Define your monthly contributions and expected investment return rate.</li>
          <li><strong>Step 3: Track Trajectory</strong> - Visualize if your current path will meet your retirement income needs.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}

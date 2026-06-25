import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { AgeCalculatorClient } from "./AgeCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Age Calculator";
const TOOL_DESC = "Calculate your exact age in years, months, weeks, days, and even minutes instantly. Free online tool to track time and celebrate milestones.";
const PATH = "/converters/age-calculator";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

const faqs = [
  {
    question: "How is age calculated in months and days?",
    answer: "Our tool calculates age by determining the number of full years between dates, then the remaining full months, and finally the leftover days. It accounts for leap years and the varying number of days in each month automatically.",
  },
  {
    question: "Can I use this for chronological age in research?",
    answer: "Yes, this tool provides the standard chronological age used in medical and academic research, expressed in total days or years/months/days format.",
  },
  {
    question: "Does it work for future dates?",
    answer: "While typically used for past birth dates, you can use it to calculate the time remaining until a future event by setting the 'Date of Birth' as today and the 'Age at Date' as the future event date.",
  },
];

export default function AgeCalculatorPage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Age Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/age-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input[type="date"]', popover: { title: '1. Select Dates', description: 'Enter your birth date and the date you want to calculate your age at.' } },
    { element: '.text-brand-primary', popover: { title: '2. Instant Results', description: 'See your age broken down into multiple time units simultaneously.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
            <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Precision chronological tracking. Know exactly how much time has passed between two dates."
        lastUpdated={lastUpdated}
        tourId="age_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <AgeCalculatorClient />

      <ToolArticle title="The Importance of Precision Timing">
        <p>
          Knowing your exact age isn&apos;t just for birthdays. It&apos;s a critical metric for medical dosages, legal eligibility, and tracking developmental milestones in children.
        </p>
        
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Enter Birth Date</strong> - Use the calendar picker to select your exact date and time of birth.</li>
          <li><strong>Step 2: Set Target Date</strong> - Choose the date you want to calculate your age at (defaults to today).</li>
          <li><strong>Step 3: View Breakdown</strong> - See your age displayed in years, months, days, and even total minutes.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}

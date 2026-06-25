import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { TimeConverterClient } from "./TimeConverterClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Time Converter — Instant Unit Conversions`,
    description: "Free online time converter. Instantly convert between seconds, minutes, hours, days, weeks, months, and years with high precision.",
    alternates: {
      canonical: getCanonicalUrl("/converters/time"),
    },
  };
}

const faqs = [
  {
    question: "How long is a year in hours?",
    answer: "A standard calendar year (365 days) contains 8,760 hours. A leap year (366 days) contains 8,784 hours.",
  },
  {
    question: "How are months calculated in this tool?",
    answer: "Because months have varying lengths (28 to 31 days), this tool calculates a 'Month' as an exact mathematical average of 30.44 days.",
  },
  {
    question: "How many seconds are in a day?",
    answer: "There are exactly 86,400 seconds in a standard 24-hour day.",
  },
];

export default function TimeConverterPage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Time", href: "/converters/time" },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/time/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Duration', description: 'Enter the amount of time you want to convert.' } },
    { element: 'select', popover: { title: '2. Interval', description: 'Switch between small units like seconds or large units like years.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema name="Time Converter | Hilmost" description="Free online time converter. Instantly convert between seconds, minutes, hours, days, weeks, months, and years." url="https://hilmost-toolbox.hilmost.net/converters/time" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Time Unit Converter"
        subtitle="Take control of your timeline. Instantly transform hours into days, weeks into minutes, and years into seconds."
        lastUpdated={lastUpdated}
        tourId="time_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <TimeConverterClient />
      </div>

      <ToolArticle title="Understanding Time Units">
        <p>
          We rely on time measurements every day, but converting between them manually can be surprisingly tedious due to the non-decimal nature of hours and minutes.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Duration</strong> - Enter the amount of time you want to convert (e.g., 500 minutes).</li>
          <li><strong>Step 2: Choose Interval</strong> - Switch between small units like seconds or large units like years effortlessly.</li>
          <li><strong>Step 3: Verify Conversion</strong> - See the precise decimal or integer result for your specific timeframe.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/time" />
    </div>
  );
}

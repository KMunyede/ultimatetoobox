import { Metadata } from "next";
import { WebApplicationSchema, FAQSchema, ToolArticle , RelatedTools, Breadcrumbs, ToolHeader, FAQAccordion } from "@utilitiessite/ui";
import { TimeZoneClient } from "./TimeZoneClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Time Zone Converter & Global Clock | Hilmost Toolbox",
    description: "Free online time zone converter. Instantly compare meeting times across global cities, check current UTC time, and schedule across borders effortlessly.",
    alternates: {
      canonical: getCanonicalUrl("/converters/time-zone"),
    },
  };
}

const faqs = [
  {
    question: "How does the time zone converter work?",
    answer: "Simply select your starting time and base time zone, then add any target cities or regions. The tool automatically handles all time differences, including complex daylight saving time (DST) shifts."
  },
  {
    question: "Does it account for Daylight Saving Time (DST)?",
    answer: "Yes, our time zone converter automatically factors in Daylight Saving Time rules for all global IANA time zones."
  },
  {
    question: "Can I compare more than two time zones?",
    answer: "Absolutely. You can add as many target time zones as you need to coordinate large international meetings or simply keep track of friends and family globally."
  }
];

export default function TimeZonePage() {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Time Zone", href: "/converters/time-zone" },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/time-zone/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.bg-blue-600', popover: { title: '1. Add Zones', description: 'Click to add multiple cities to your tracking list.' } },
    { element: '.flex-1 > input', popover: { title: '2. Adjust Time', description: 'Change the slider or input time to see it update across all selected regions.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema name="Time Zone Converter | Hilmost" description="Instantly compare meeting times across global cities, check current UTC time, and schedule across borders effortlessly." url="https://hilmost-toolbox.hilmost.net/converters/time-zone" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Global Time Zone Hub"
        subtitle="Coordinate globally. Compare exact local times and schedule international meetings without the guesswork."
        lastUpdated={lastUpdated}
        tourId="timezone_hub"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="mb-4">
        <TimeZoneClient />
      </div>

      <ToolArticle title="Master Global Scheduling with the Ultimate Time Zone Converter">
        <p>
          In today&apos;s interconnected world, scheduling a simple call can become a logistical nightmare. Between different UTC offsets, varying regional names (like EST vs EDT), and the chaotic transitions of Daylight Saving Time, making a mistake is all too easy.
        </p>
        
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Set Base Time</strong> - Pick your current location and the specific time of your event or meeting.</li>
          <li><strong>Step 2: Add Destinations</strong> - Type in the cities or time zones you want to compare against your base.</li>
          <li><strong>Step 3: Sync Globally</strong> - View a unified timeline showing exactly what time it will be for every participant.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath="/converters/time-zone" />
    </div>
  );
}

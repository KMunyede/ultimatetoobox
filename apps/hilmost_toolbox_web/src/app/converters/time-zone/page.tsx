import { Metadata } from "next";
import { WebApplicationSchema, FAQSchema, ToolArticle , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { TimeZoneClient } from "./TimeZoneClient";
import { Suspense } from "react";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Time Zone Converter & Global Clock — Compare Multiple Cities | Hilmost Toolbox",
    description: "Free online time zone converter. Instantly compare meeting times across global cities, check current UTC time, and schedule across borders effortlessly.",
    alternates: {
      canonical: getCanonicalUrl("/converters/time-zone"),
    },
  };
}

const faqs = [
  {
    question: "How does the time zone converter work?",
    answer: "Simply select your starting time and base time zone, then add any target cities or regions. The tool automatically handles all time differences, including complex daylight saving time (DST) shifts, providing you the exact local time in those regions."
  },
  {
    question: "Does it account for Daylight Saving Time (DST)?",
    answer: "Yes, our time zone converter automatically factors in Daylight Saving Time rules for all global IANA time zones. It adjusts the result dynamically based on the specific date you select."
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <WebApplicationSchema name="Time Zone Converter | Hilmost" description="Instantly compare meeting times across global cities, check current UTC time, and schedule across borders effortlessly." url="https://hilmost-toolbox.hilmost.net/converters/time-zone" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Time Zone <span className="text-emerald-600 dark:text-emerald-500">Converter</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Coordinate globally. Compare exact local times and schedule international meetings without the guesswork.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500 animate-pulse bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">Loading global clock...</div>}>
          <TimeZoneClient />
        </Suspense>
      </div>

      <ToolArticle title="Master Global Scheduling with the Ultimate Time Zone Converter">
        <p>
          In today&apos;s interconnected world, scheduling a simple call can become a logistical nightmare. Between different UTC offsets, varying regional names (like EST vs EDT), and the chaotic transitions of Daylight Saving Time, making a mistake is all too easy. Our Time Zone Converter removes that friction completely.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>
          <RelatedTools category="converters" currentPath="/converters/time-zone" />
    </div>
  );
}

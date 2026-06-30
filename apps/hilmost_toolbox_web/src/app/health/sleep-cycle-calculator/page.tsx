import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { SleepCycleCalculatorTool } from "./SleepCycleCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Free Sleep Cycle Calculator";
const TOOL_DESC = "Find the best times to wake up or go to sleep based on 90-minute sleep cycles. Avoid sleep inertia and wake up refreshed.";
const PATH = "/health/sleep-cycle-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: 'Free Sleep Cycle Calculator — Best Wake Up Times | Hilmost',
  description: TOOL_DESC,
  alternates: {
    canonical: CANONICAL_URL
  }
}

export default function SleepCycleCalculatorPage() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "Sleep Cycle Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/sleep-cycle-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": TOOL_NAME,
    "description": TOOL_DESC,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "url": CANONICAL_URL,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const tourSteps = [
    { element: '#mode-toggle', popover: { title: '1. Select Mode', description: 'Choose whether you want to calculate wake up times or bed times.' } },
    { element: '#time-input-section', popover: { title: '2. Input Time', description: 'Enter your desired time or use the current time.' } },
    { element: '#fall-asleep-section', popover: { title: '3. Fall Asleep Time', description: 'Estimate how long it takes you to fall asleep (average is 14 mins).' } },
    { element: '#calculate-btn', popover: { title: '4. Calculate', description: 'Get your optimal sleep schedule.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Circadian Rhythm Lab"
        subtitle="Precision sleep timing. Calculate your 90-minute sleep cycles to wake up feeling refreshed and energized."
        lastUpdated={lastUpdated}
        tourId="sleep_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <SleepCycleCalculatorTool />
    </div>
  );
}

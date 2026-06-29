import { WebApplicationSchema, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { CalorieMacroCalculatorTool } from "./CalorieMacroCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Calorie & Macro Calculator";
const TOOL_DESC = "Calculate your BMR, TDEE, and ideal macronutrient split for weight loss, maintenance, or muscle gain. Features custom macro balancing.";
const PATH = "/health/calorie-macro-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} — BMR & TDEE Lab | Hilmost`);
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/health.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/health.png"],
    }
  };
}

export default function CalorieMacroCalculatorPage() {
  const breadcrumbItems = [
    { label: "Health", href: "/health" },
    { label: "Calorie & Macro Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/health/calorie-macro-calculator/page.tsx");
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
    { element: '#unit-toggle', popover: { title: '1. Choose Units', description: 'Switch between Metric and Imperial systems.' } },
    { element: '#body-inputs', popover: { title: '2. Enter Metrics', description: 'Provide your age, weight, and height for accurate BMR calculation.' } },
    { element: '#activity-level', popover: { title: '3. Activity Level', description: 'Select your weekly activity level to calculate your TDEE.' } },
    { element: '#goal-selector', popover: { title: '4. Set Your Goal', description: 'Choose whether you want to lose, maintain, or gain weight.' } },
    { element: '#macro-breakdown', popover: { title: '5. Macro Split', description: 'View your grams of protein, carbs, and fats. Toggle "Custom" to adjust the ratios.' } },
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
        title="Precision Nutrition Lab"
        subtitle="Scientific calorie and macronutrient tracking. Calculate your metabolic burn and optimize your nutrition for any fitness goal."
        lastUpdated={lastUpdated}
        tourId="calorie_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <CalorieMacroCalculatorTool />
    </div>
  );
}

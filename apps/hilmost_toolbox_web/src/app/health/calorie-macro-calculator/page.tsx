import { WebApplicationSchema, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, ToolArticle } from "@utilitiessite/ui";
import { Metadata } from "next";
import { CalorieMacroCalculatorTool } from "./CalorieMacroCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Free Calorie & Macro Calculator";
const TOOL_DESC = "Calculate your BMR, TDEE and daily macro targets for weight loss, maintenance or muscle gain. Supports metric and imperial units with custom macro splits.";
const PATH = "/health/calorie-macro-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

const faqs = [
  {
    question: "What is BMR?",
    answer: "Basal Metabolic Rate (BMR) is the total number of calories your body needs to perform basic life-sustaining functions, such as circulation, breathing, and cell production, while at rest."
  },
  {
    question: "What is TDEE?",
    answer: "Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise and physical activity are taken into account. It is the number you use to set your maintenance, deficit, or surplus targets."
  },
  {
    question: "How do I calculate my macros?",
    answer: "Macros are calculated based on your total caloric target. Generally, Protein and Carbs contain 4 calories per gram, while Fats contain 9 calories per gram. Our calculator automatically converts your percentage splits into daily gram targets."
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer: "To lose weight, you generally need to consume fewer calories than your TDEE. A common starting point is a 250-500 calorie deficit per day, which leads to approximately 0.5 to 1lb of fat loss per week."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} — BMR, TDEE & Macros | Hilmost`);
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

  const tourSteps = [
    { element: '#unit-toggle', popover: { title: '1. Units', description: 'Switch between Metric and Imperial measurements.' } },
    { element: '#body-details', popover: { title: '2. Body Stats', description: 'Enter your age, gender, weight, and height.' } },
    { element: '#activity-level', popover: { title: '3. Activity', description: 'Select your weekly activity intensity.' } },
    { element: '#goal-selector', popover: { title: '4. Fitness Goal', description: 'Choose your desired weight trajectory.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Metabolic Intelligence Lab"
        subtitle="Precision nutrition planning. Calculate your maintenance calories and optimize your macronutrient ratios instantly."
        lastUpdated={lastUpdated}
        tourId="calorie_lab"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <CalorieMacroCalculatorTool />

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Nutrition Architecture: Understanding Your Metabolism">
          <p>
            Understanding your energy balance is the foundation of any successful fitness transformation. Our <strong>Metabolic Intelligence Lab</strong> leverages the Mifflin-St Jeor equation to provide high-precision estimates of your metabolic needs. By analyzing your unique profile, we determine your <strong>Basal Metabolic Rate (BMR)</strong>—the minimum energy required for vital functions.
          </p>

          <h3>Activity Multipliers (TDEE)</h3>
          <p>
            Physical activity acts as a multiplier on your baseline. We calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong> to show you exactly how many calories you burn in a typical day. Whether you are an office worker or an elite athlete, our tool adjusts for five distinct activity levels to ensure your targets are realistic and sustainable.
          </p>

          <h3>Optimal Macronutrient Ratios</h3>
          <p>
            Nutrition is about more than just numbers; it is about the quality of those numbers. Once your caloric target is established, we provide a structured <strong>Macro Breakdown</strong>. Proteins, Carbohydrates, and Fats are balanced according to your specific goal—whether it&apos;s rapid fat loss or controlled muscle hypertrophy.
          </p>

          <h3>Privacy-First Health Data</h3>
          <p>
            Your health data is personal. Following the Hilmost monorepo standards, this tool uses a <strong>Zero-Server Architecture</strong>. All metabolic calculations happen entirely in your browser&apos;s memory. Your weight, age, and goals are never transmitted to or stored on our servers, ensuring 100% privacy for your fitness journey.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

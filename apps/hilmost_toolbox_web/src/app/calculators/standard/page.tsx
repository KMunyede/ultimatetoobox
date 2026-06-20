import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader } from "@utilitiessite/ui";
import { StandardCalculatorClient } from "./StandardCalculatorClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Standard Calculator";
const TOOL_DESC = "Free online standard calculator. Fast arithmetic in your browser — add, subtract, multiply, divide. No app required.";
const PATH = "/calculators/standard";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Free Online Calculator | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "Does this calculator support operator precedence?",
    answer: "Yes, it uses standard algebraic hierarchy (PEMDAS/BODMAS). For example, 2 + 3 × 4 will correctly evaluate to 14 because multiplication is performed before addition.",
  },
  {
    question: "Can I use my keyboard with this calculator?",
    answer: "Absolutely. You can use the number pad or top row numbers, along with +, -, *, and / for operations. Press 'Enter' for equals and 'Escape' to clear the display.",
  },
  {
    question: "Is my calculation history saved?",
    answer: "Yes, your last 50 calculations are stored locally in your browser's memory. You can access the history tape by clicking the clock icon in the top right of the display.",
  },
];

export default function StandardCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Standard", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/standard/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.calculator-display', popover: { title: '1. Display', description: 'See your expression and result here. Click the clock icon for history.' } },
    { element: '.calculator-grid', popover: { title: '2. Input', description: 'Use the buttons or your keyboard to perform arithmetic.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-4xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost Toolbox`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <ToolHeader
        title={TOOL_NAME}
        subtitle="Reliable arithmetic for everyday tasks. Fast, responsive, and always available."
        lastUpdated={lastUpdated}
        tourId="standard_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="max-w-2xl mx-auto">
        <StandardCalculatorClient />
      </div>

      <ToolArticle title="Why Use Our Standard Calculator?">
        <p>
          In a world of complex apps, sometimes you just need to add up a few numbers quickly. Our Standard Calculator is designed for speed, accessibility, and precision. It works perfectly on mobile devices and supports full physical keyboard input for desktop users.
        </p>
        <h3>Core Features</h3>
        <ul>
          <li><strong>Instant Results:</strong> Calculations are performed locally in your browser for zero latency.</li>
          <li><strong>History Tape:</strong> Never lose track of your work with the built-in history panel.</li>
          <li><strong>Keyboard Shortcuts:</strong> Use your existing typing skills to calculate even faster.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

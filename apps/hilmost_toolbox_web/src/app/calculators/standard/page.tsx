import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, FAQSchema, ToolHeader, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { StandardCalculatorClient } from "./StandardCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Standard Calculator";
const TOOL_DESC = "Free online standard calculator for fast everyday arithmetic. Instantly add, subtract, multiply, and divide with precision. No software required.";
const PATH = "/calculators/standard";
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
    question: "Does this calculator support the order of operations?",
    answer: "Yes, our engine follows the standard algebraic hierarchy (PEMDAS/BODMAS). Multiplication and division are prioritized over addition and subtraction, ensuring mathematical accuracy for multi-step problems.",
  },
  {
    question: "Can I use my laptop's number pad?",
    answer: "Absolutely. We have implemented full hardware keyboard support. You can use the numbers 0-9, and the standard mathematical operators (+, -, *, /) directly from your keyboard.",
  },
  {
    question: "Is there a limit to the length of calculations?",
    answer: "Our calculator utilizes 64-bit floating-point precision, allowing it to handle massive numbers and complex decimals without losing accuracy, up to the limits of modern web browser memory.",
  },
  {
    question: "How do I clear just the last entry?",
    answer: "Currently, the 'AC' button clears the entire expression. Use your keyboard's 'Backspace' key to delete individual digits or characters if you make a small mistake.",
  },
  {
    question: "Is this tool safe to use for banking or taxes?",
    answer: "While highly precise, our tools are for informational and educational purposes. Always cross-verify critical financial data with official accounting software or certified professionals.",
  },
];

const howToSteps = [
  { name: "Input Numbers", text: "Use the large-format buttons or your physical keyboard to enter digits." },
  { name: "Apply Operators", text: "Select from addition, subtraction, multiplication, or division to build your expression." },
  { name: "Calculate", text: "Press the equals (=) button or the 'Enter' key to see your result instantly." },
  { name: "Audit History", text: "Click the history icon in the display to review your previous 50 calculations." },
];

export default function StandardCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Standard", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/standard/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.calculator-display', popover: { title: '1. Result Display', description: 'View your live expression and final result here. History is just a click away.' } },
    { element: '.grid', popover: { title: '2. Arithmetic Grid', description: 'High-contrast buttons designed for speed and touch accuracy on mobile devices.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost Toolbox`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Use the Standard Calculator`}
        description="A simple, four-step guide to mastering everyday arithmetic using our optimized web interface."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <ToolHeader
        title={TOOL_NAME}
        subtitle="Clean, reliable arithmetic for daily life. Optimized for both desktop and mobile workflows."
        lastUpdated={lastUpdated}
        tourId="standard_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="max-w-2xl mx-auto">
        <StandardCalculatorClient />
      </div>

      <ToolArticle title="The Foundation of Modern Arithmetic">
        <p>
          In an era of complex software and specialized applications, the need for a simple, reliable <strong>Standard Calculator</strong> remains constant. Whether you are balancing a checkbook, splitting a dinner bill, or verifying a quick sum at work, our arithmetic engine provides a sanctuary of speed and precision directly in your browser.
        </p>

        <h3>Understanding the Order of Operations</h3>
        <p>
          Unlike older mechanical calculators that processed numbers strictly from left-to-right, our digital tool utilizes the standard <strong>PEMDAS/BODMAS</strong> hierarchy. This means that if you enter <code>2 + 3 &times; 4</code>, the calculator correctly identifies that multiplication must occur before addition, yielding a result of <code>14</code> instead of <code>20</code>. This logic is fundamental for academic accuracy and professional financial reporting.
        </p>

        <h3>A Brief History of the Four Functions</h3>
        <p>
          The basic four functions&mdash;addition, subtraction, multiplication, and division&mdash;have been the bedrock of human commerce for millennia. From the ancient abacus to the mechanical Pascaline invented by Blaise Pascal in 1642, the journey to the tool on your screen today is one of relentless optimization. Our version respects this heritage by focusing on high-contrast, accessible design that works flawlessly on any device, from a smartphone in your pocket to a 4K desktop monitor.
        </p>

        <h3>Why Accessibility Matters</h3>
        <p>
          We have prioritized <strong>"Enterprise-Calm"</strong> design principles to reduce visual noise. Every button has a minimum 44px tap target to comply with modern accessibility standards, ensuring that users with varying physical needs can calculate with confidence. The integrated <strong>History Tape</strong> allows you to scroll back through your work, effectively eliminating the need for scratch paper in your daily workflow.
        </p>

        <SourceReference
          sources={[
            { name: "Encyclopedia Britannica - History of Calculators", url: "https://www.britannica.com/technology/calculator" },
            { name: "MathIsFun - Order of Operations Guide", url: "https://www.mathsisfun.com/operation-order-pemdas.html" },
            { name: "W3C - Web Content Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

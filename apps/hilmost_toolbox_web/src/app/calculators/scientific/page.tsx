import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, FAQSchema, ToolHeader, SourceReference, HowToSchema, AuthorBio, DidYouKnow } from "@utilitiessite/ui";
import { ScientificCalculatorClient } from "./ScientificCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Scientific Calculator";
const TOOL_DESC = "Free online scientific calculator with trigonometry, logarithms, and constants. Solve advanced math instantly in your browser with high precision.";
const PATH = "/calculators/scientific";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: `Scientific Calculator | Precision Math & Trigonometry | Hilmost`,
  description: TOOL_DESC,
  alternates: {
    canonical: getCanonicalUrl(PATH),
  },
};

const faqs = [
  {
    question: "What is the difference between DEG, RAD, and GRAD modes?",
    answer: "These modes determine how trigonometric functions (sin, cos, tan) interpret angles. DEG (Degrees) uses a 360-degree circle, RAD (Radians) uses 2π for a full rotation (standard for calculus), and GRAD (Gradians) uses 400. Choose the mode that matches your specific mathematical field.",
  },
  {
    question: "How do I use the '2nd' button on this calculator?",
    answer: "The '2nd' button acts as a shift key. When active, it toggles inverse trigonometric functions (e.g., sin becomes arcsin/asin) and other secondary operations. This allows for a more compact and efficient mathematical grid.",
  },
  {
    question: "Does this calculator support scientific notation?",
    answer: "Yes. Our engine automatically formats very large or very small results using standard scientific notation (e.g., 1.23e+10) to maintain precision and readability across all scientific disciplines.",
  },
  {
    question: "Is the calculation history cleared when I close the tab?",
    answer: "No. Your calculation history is stored locally in your browser's secure memory. It will persist between sessions unless you manually click the 'Clear All' button in the history tape.",
  },
  {
    question: "What is the 'HYP' button used for?",
    answer: "The 'HYP' toggle enables hyperbolic functions like sinh, cosh, and tanh. These are essential for advanced physics and engineering problems involving catenary curves or relativity.",
  },
];

const howToSteps = [
  { name: "Enter Expression", text: "Use the numerical grid or your physical keyboard to type your mathematical expression." },
  { name: "Select Mode", text: "Toggle between DEG and RAD depending on whether you are working with degrees or radians." },
  { name: "Apply Functions", text: "Access advanced trigonometry, logarithms, or powers using the scientific buttons." },
  { name: "Review Results", text: "Click the equals (=) button to see your precision result and track it in the history tape." },
];

export default function ScientificCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Scientific", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/scientific/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.calculator-display', popover: { title: '1. Advanced Display', description: 'Supports complex expressions and scientific notation.' } },
    { element: '.grid', popover: { title: '2. Scientific Grid', description: 'Access trigonometry, logs, and roots with the 2nd and HYP toggles.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name="Scientific Calculator"
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Use Our Scientific Calculator`}
        description="Master advanced mathematics with this comprehensive guide to our online scientific computing engine."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <ToolHeader
        title={TOOL_NAME}
        subtitle="Precision mathematics for engineering, physics, and academic research."
        lastUpdated={lastUpdated}
        tourId="scientific_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <ScientificCalculatorClient />

      <DidYouKnow category="calculators" />

      <ToolArticle title="Mastering Advanced Calculations in the Modern Era">
        <p>
          Our Scientific Calculator provides the power of a dedicated handheld device directly in your modern web browser. Designed for students, engineers, and scientists, it bridges the gap between simple arithmetic and complex relativistic physics. Whether you are solving for trigonometric identities, logarithmic transformations, or exploring the properties of Euler&apos;s number, our engine delivers precision results instantly.
        </p>

        <h3>The Evolution of Computing Power</h3>
        <p>
          The history of the scientific calculator dates back to the early 1970s with the introduction of the Hewlett-Packard HP-35. Before this, engineers relied on slide rules and massive tables of trigonometric values. Today, we bring that same robust logic to the cloud, utilizing 64-bit floating-point precision to ensure that your structural engineering or astrophysics homework is always accurate.
        </p>

        <h3>Advanced Functionality Guide</h3>
        <ul>
          <li><strong>Trigonometry:</strong> Full support for Sine, Cosine, Tangent, and their inverses (arcsin, arccos, arctan) across multiple angle modes.</li>
          <li><strong>Hyperbolic Functions:</strong> Toggle the <code>HYP</code> button to access sinh and cosh, vital for electrical engineering and bridge design.</li>
          <li><strong>Logarithmic Logic:</strong> Calculate natural logs (ln) for exponential growth or base-10 logs (log) for decibel and pH scales.</li>
          <li><strong>Constants:</strong> Instant access to high-precision values for Pi (&pi;) and Euler&apos;s number (e), ensuring your circular and exponential calculations are exact.</li>
        </ul>

        <h3>Why Precision Matters</h3>
        <p>
          In scientific computing, rounding errors can accumulate quickly. Our calculator utilizes the industry-standard Math.js library to handle expressions with high depth, ensuring that PEMDAS/BODMAS hierarchy is respected in every multi-step operation. The integrated <strong>History Tape</strong> allows you to audit your work, providing a digital paper trail for complex multi-variable problems.
        </p>

        <SourceReference
          sources={[
            { name: "NIST - International System of Units (SI)", url: "https://www.nist.gov/pml/owm/metric-si/si-units" },
            { name: "IEEE - Standard for Floating-Point Arithmetic (754)", url: "https://ieeexplore.ieee.org/document/8766229" },
            { name: "Wolfram MathWorld - Trigonometric Functions", url: "https://mathworld.wolfram.com/TrigonometricFunctions.html" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

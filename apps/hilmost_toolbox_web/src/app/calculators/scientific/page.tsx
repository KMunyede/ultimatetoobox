import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, AdLayout, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema } from "@utilitiessite/ui";
import { ScientificCalculatorClient } from "./ScientificCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";

const TOOL_NAME = "Scientific Calculator";
const TOOL_DESC = "Free online scientific calculator with trig, logarithms, and constants. Solve advanced math instantly in your browser.";
const PATH = "/calculators/scientific";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: `${TOOL_NAME} — Free Online Scientific Calculator | Hilmost Toolbox`,
  description: TOOL_DESC,
  alternates: {
    canonical: getCanonicalUrl(PATH),
  },
};

const faqs = [
  {
    question: "What is the difference between DEG, RAD, and GRAD modes?",
    answer: "These modes determine how trigonometric functions (sin, cos, tan) interpret angles. DEG (Degrees) uses a 360-degree circle, RAD (Radians) uses 2π, and GRAD (Gradians) uses 400. RAD is standard for most calculus and scientific work.",
  },
  {
    question: "How do I use the '2nd' button?",
    answer: "Tapping the '2nd' button toggles the inverse functions for trigonometry (e.g., sin becomes arcsin) and other advanced operations. It allows you to access a wider range of mathematical tools within the same grid.",
  },
  {
    question: "Can I share a specific calculation with someone else?",
    answer: "Yes! Use the 'Share' button to generate a unique URL that includes your current expression. When someone opens the link, the calculator will automatically restore your work.",
  },
];

export default function ScientificCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Scientific", href: PATH },
  ];

  return (
    <div className="w-full">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost Toolbox`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Scientific Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Advanced mathematics for engineering, physics, and academia.
        </p>
      </div>

      <ScientificCalculatorClient />

      <ToolArticle title="Mastering Advanced Calculations">
        <p>
          Our Scientific Calculator provides the power of a dedicated handheld device directly in your browser. From trigonometric identities to logarithmic transformations, it handles complex expressions with precision and speed.
        </p>
        <h3>Advanced Functionality</h3>
        <ul>
          <li><strong>Trigonometry:</strong> Support for Sine, Cosine, Tangent, and their inverses in multiple angle modes.</li>
          <li><strong>Logarithms:</strong> Calculate natural logs (ln) and base-10 logs (log) with ease.</li>
          <li><strong>Constants:</strong> Built-in values for Pi (π) and Euler&apos;s number (e).</li>
          <li><strong>URL Sharing:</strong> Collaborate by sharing direct links to your complex calculations.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/scientific" />
    </div>
  );
}

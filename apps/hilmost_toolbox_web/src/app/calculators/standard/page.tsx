import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, AdLayout, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { StandardCalculatorClient } from "./StandardCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";

export const metadata: Metadata = {
  title: "Standard Calculator — Free Online Calculator | Hilmost Toolbox",
  description: "Free online standard calculator. Fast arithmetic in your browser — add, subtract, multiply, divide. No app required.",
  alternates: {
    canonical: getCanonicalUrl("/calculators/standard"),
  },
};

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
    { label: "Standard", href: "/calculators/standard" },
  ];

  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <WebApplicationSchema
        name="Standard Calculator | Hilmost Toolbox"
        description="Free online standard calculator. Fast arithmetic in your browser."
        url="https://hilmost-toolbox.hilmost.net/calculators/standard"
      />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Standard Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Reliable arithmetic for everyday tasks. Fast, responsive, and always available.
        </p>
      </div>

      <StandardCalculatorClient />

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
      <RelatedTools category="calculators" currentPath="/calculators/standard" />
    </AdLayout>
  );
}

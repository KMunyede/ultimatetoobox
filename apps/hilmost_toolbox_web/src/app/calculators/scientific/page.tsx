import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, AdLayout, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { ScientificCalculatorClient } from "./ScientificCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Scientific Calculator — Free Online Scientific Calculator | Hilmost Toolbox",
  description: "Free online scientific calculator with trig, logarithms, and constants. Solve advanced math instantly in your browser.",
  alternates: {
    canonical: getCanonicalUrl("/calculators/scientific"),
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
    { label: "Scientific", href: "/calculators/scientific" },
  ];

  return (
    <AdLayout publisherId="ca-pub-5650522247882745" showInnerAds={false}>
      <WebApplicationSchema
        name="Scientific Calculator | Hilmost Toolbox"
        description="Free online scientific calculator with advanced math functions."
        url="https://hilmost-toolbox.hilmost.net/calculators/scientific"
      />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Scientific Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Advanced mathematics for engineering, physics, and academia.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <ScientificCalculatorClient />
      </Suspense>

      <ToolArticle title="Mastering Advanced Calculations">
        <p>
          Our Scientific Calculator provides the power of a dedicated handheld device directly in your browser. From trigonometric identities to logarithmic transformations, it handles complex expressions with precision and speed.
        </p>
        <h3>Advanced Functionality</h3>
        <ul>
          <li><strong>Trigonometry:</strong> Support for Sine, Cosine, Tangent, and their inverses in multiple angle modes.</li>
          <li><strong>Logarithms:</strong> Calculate natural logs (ln) and base-10 logs (log) with ease.</li>
          <li><strong>Constants:</strong> Built-in values for Pi (π) and Euler's number (e).</li>
          <li><strong>URL Sharing:</strong> Collaborate by sharing direct links to your complex calculations.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/scientific" />
    </AdLayout>
  );
}

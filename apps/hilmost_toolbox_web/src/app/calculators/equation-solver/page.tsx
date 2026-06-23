import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader } from "@utilitiessite/ui";
import { EquationSolverClient } from "./EquationSolverClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Science Equation Solver";
const TOOL_DESC = "Free online physics equation solver. Solve for any variable in mechanics, thermodynamics, electromagnetism, quantum, relativity, and optics equations.";
const PATH = "/calculators/equation-solver";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: `Equation Solver | Physics & Science Formulas | Hilmost`,
  description: TOOL_DESC,
  alternates: {
    canonical: getCanonicalUrl(PATH),
  },
};

const faqs = [
  {
    question: "How do I use the equation solver?",
    answer: "First, select a category (like Mechanics) and then pick a specific equation. Use the 'Solve for' dropdown to choose the variable you want to find. Enter the values for the remaining variables, ensuring you select the correct units, and click 'Solve'.",
  },
  {
    question: "Can I use astronomical units for mass?",
    answer: "Yes! For mass fields, we include options for 'Solar masses' and 'Earth masses'. This allows you to solve physics problems on a cosmic scale, bridging the gap between classroom physics and astrophysics.",
  },
  {
    question: "Does it support complex relativity equations?",
    answer: "Yes, we have implemented core relativistic formulas including time dilation, length contraction, and mass-energy equivalence (E=mc²). For Quantum mechanics, we provide de Broglie wavelength and Photon energy solvers.",
  },
];

export default function EquationSolverPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Equation Solver", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/equation-solver/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.flex-wrap', popover: { title: '1. Categories', description: 'Switch between Mechanics, Thermodynamics, and more.' } },
    { element: '.md\\:col-span-4', popover: { title: '2. Equation List', description: 'Pick the specific formula you want to solve.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
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
        subtitle="Solve for any variable in a wide range of physics and chemistry formulas."
        lastUpdated={lastUpdated}
        tourId="equation_solver"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <EquationSolverClient />

      <ToolArticle title="Bypassing Algebraic Rearrangement">
        <p>
          Solving science problems often involves more algebra than actual science. Our Equation Solver eliminates the need to manually rearrange formulas. Simply plug in your known values, select the target variable, and get an instant, accurate result.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Choose Category</strong> - Select from Mechanics, Thermodynamics, Relativity, or other scientific disciplines.</li>
          <li><strong>Step 2: Pick Formula</strong> - Select the specific equation you need to solve and choose the target variable.</li>
          <li><strong>Step 3: Solve for X</strong> - Enter known values and units to bypass complex algebraic rearrangement instantly.</li>
        </ol>

        <h3>Libraries Included</h3>
        <ul>
          <li><strong>Mechanics:</strong> Newton&apos;s Laws, Kinetic Energy, Work, and Power.</li>
          <li><strong>Thermodynamics:</strong> Ideal Gas Law, Heat Transfer, and Efficiency.</li>
          <li><strong>Electromagnetism:</strong> Ohm&apos;s Law, Coulomb&apos;s Law, and Capacitance.</li>
          <li><strong>Quantum &amp; Relativity:</strong> Photon Energy, Time Dilation, and E=mc².</li>
          <li><strong>Optics:</strong> Snell&apos;s Law and Thin Lens equations.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, AdLayout, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { EquationSolverClient } from "./EquationSolverClient";
import { getCanonicalUrl } from "@utilitiessite/config";

export const metadata: Metadata = {
  title: "Science Equation Solver — Physics Formula Calculator | Hilmost Toolbox",
  description: "Free online physics equation solver. Solve for any variable in mechanics, thermodynamics, electromagnetism, quantum, relativity, and optics equations.",
  alternates: {
    canonical: getCanonicalUrl("/calculators/equation-solver"),
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
    { label: "Equation Solver", href: "/calculators/equation-solver" },
  ];

  return (
    <div className="w-full">
      <WebApplicationSchema
        name="Science Equation Solver | Hilmost Toolbox"
        description="Free online science equation solver for physics and chemistry."
        url="https://hilmost-toolbox.hilmost.net/calculators/equation-solver"
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Science Equation Solver
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Solve for any variable in a wide range of physics and chemistry formulas.
        </p>
      </div>

      <EquationSolverClient />

      <ToolArticle title="Bypassing Algebraic Rearrangement">
        <p>
          Solving science problems often involves more algebra than actual science. Our Equation Solver eliminates the need to manually rearrange formulas. Simply plug in your known values, select the target variable, and get an instant, accurate result.
        </p>
        <h3>Libraries Included</h3>
        <ul>
          <li><strong>Mechanics:</strong> Newton's Laws, Kinetic Energy, Work, and Power.</li>
          <li><strong>Thermodynamics:</strong> Ideal Gas Law, Heat Transfer, and Efficiency.</li>
          <li><strong>Electromagnetism:</strong> Ohm's Law, Coulomb's Law, and Capacitance.</li>
          <li><strong>Quantum & Relativity:</strong> Photon Energy, Time Dilation, and E=mc².</li>
          <li><strong>Optics:</strong> Snell's Law and Thin Lens equations.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/equation-solver" />
    </div>
  );
}

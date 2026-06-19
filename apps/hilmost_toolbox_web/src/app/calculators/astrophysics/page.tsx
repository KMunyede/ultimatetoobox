import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, AdLayout, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { AstrophysicsCalculatorClient } from "./AstrophysicsCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";

export const metadata: Metadata = {
  title: "Astrophysics Calculator — Gravitational Force, Orbital Velocity & More | Hilmost Toolbox",
  description: "Free online astrophysics calculator. Compute gravitational force, orbital velocity, escape velocity, and luminosity using preset cosmic values — no scientific notation typing required.",
  alternates: {
    canonical: getCanonicalUrl("/calculators/astrophysics"),
  },
};

const faqs = [
  {
    question: "Why use presets for mass and distance?",
    answer: "Astronomical values are incredibly large (e.g., Earth's mass is 5.972 × 10²⁴ kg). Typing these manually is prone to error. Our presets allow you to select common celestial bodies instantly, ensuring your calculations are based on accurate, standard scientific constants.",
  },
  {
    question: "How do I calculate the gravitational force between two objects?",
    answer: "Select 'Gravitational Force' from the dropdown, then choose or input the masses of both objects and the distance between their centers. The calculator uses Newton's Law of Universal Gravitation: F = G(m1m2)/r².",
  },
  {
    question: "What is Hubble's Law?",
    answer: "Hubble's Law describes the expansion of the universe, stating that the recessional velocity of a galaxy is proportional to its distance from us. This calculator helps you determine the distance or velocity using the Hubble constant.",
  },
];

export default function AstrophysicsCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Astrophysics", href: "/calculators/astrophysics" },
  ];

  return (
    <AdLayout publisherId="ca-pub-5650522247882745" showInnerAds={false}>
      <WebApplicationSchema
        name="Astrophysics Calculator | Hilmost Toolbox"
        description="Free online astrophysics calculator for cosmic mechanics."
        url="https://hilmost-toolbox.hilmost.net/calculators/astrophysics"
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
          Astrophysics Calculator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Compute the mechanics of the cosmos with precision presets and scientific notation.
        </p>
      </div>

      <AstrophysicsCalculatorClient />

      <ToolArticle title="Exploring Celestial Mechanics">
        <p>
          Astrophysics involves some of the most extreme scales in the universe, from the microscopic quantum fluctuations to the macroscopic expansion of space-time. Our calculator bridges these gaps by handling large-scale data with ease.
        </p>
        <h3>Calculations Supported</h3>
        <ul>
          <li><strong>Gravitational Force:</strong> Determine the pull between any two masses across space.</li>
          <li><strong>Orbital Velocity:</strong> Find the speed required to maintain a stable orbit around a body.</li>
          <li><strong>Escape Velocity:</strong> Calculate the minimum speed needed to break free from a gravitational field.</li>
          <li><strong>Luminosity:</strong> Understand energy output using the Stefan-Boltzmann law.</li>
          <li><strong>Hubble Distance:</strong> Estimate cosmological distances based on galactic recession.</li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath="/calculators/astrophysics" />
    </AdLayout>
  );
}

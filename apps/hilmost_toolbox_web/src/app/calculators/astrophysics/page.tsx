import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader } from "@utilitiessite/ui";
import { AstrophysicsCalculatorClient } from "./AstrophysicsCalculatorClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Astrophysics Calculator";
const TOOL_DESC = "Free online astrophysics calculator. Compute gravitational force, orbital velocity, escape velocity, and luminosity using preset cosmic values — no scientific notation typing required.";
const PATH = "/calculators/astrophysics";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: `${TOOL_NAME} — Gravitational Force, Orbital Velocity & More | Hilmost Toolbox`,
  description: TOOL_DESC,
  alternates: {
    canonical: getCanonicalUrl(PATH),
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
    { label: "Astrophysics", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/astrophysics/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'select', popover: { title: '1. Select Type', description: 'Choose the cosmic phenomenon you want to calculate.' } },
    { element: '.bg-blue-600', popover: { title: '2. Precision Results', description: 'See results in scientific notation with human-readable descriptions.' } },
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
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Compute the mechanics of the cosmos with precision presets and scientific notation."
        lastUpdated={lastUpdated}
        tourId="astro_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <AstrophysicsCalculatorClient />

      <ToolArticle title="Exploring Celestial Mechanics">
        <p>
          Astrophysics involves some of the most extreme scales in the universe, from the microscopic quantum fluctuations to the macroscopic expansion of space-time. Our calculator bridges these gaps by handling large-scale data with ease.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select cosmic event</strong> - Choose from Gravitational Force, Orbital Velocity, Escape Velocity, and more.</li>
          <li><strong>Step 2: Use Presets</strong> - Select celestial bodies like Earth or the Sun to avoid typing extreme scientific notation.</li>
          <li><strong>Step 3: Review Results</strong> - See precision calculations in scientific notation with clear descriptions of the physics.</li>
        </ol>

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
      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

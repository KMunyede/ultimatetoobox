import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { AstrophysicsCalculatorClient } from "./AstrophysicsCalculatorClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Astrophysics Calculator Suite";
const TOOL_DESC = "Compute the mechanics of the cosmos. High-precision astrophysics calculator for gravitational force, orbital velocity, escape velocity, and stellar luminosity.";
const PATH = "/calculators/astrophysics";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export const metadata: Metadata = {
  title: `${TOOL_NAME} — High-Precision Cosmic Calculations | Hilmost Toolbox`,
  description: TOOL_DESC,
  alternates: {
    canonical: getCanonicalUrl(PATH),
  },
};

const faqs = [
  {
    question: "How accurate are the planetary mass presets?",
    answer: "Our presets utilize the latest planetary data from NASA's Planetary Fact Sheets. We use 64-bit floating-point precision to ensure that massive values (like the Sun's 1.989e30 kg) are handled without rounding errors common in standard calculators.",
  },
  {
    question: "What is the difference between Orbital and Escape Velocity?",
    answer: "Orbital velocity is the speed needed to stay in a stable circular orbit around a body. Escape velocity is the minimum speed required to break free from that body's gravitational pull entirely and travel to 'infinity.'",
  },
  {
    question: "Does this calculator account for general relativity?",
    answer: "This tool utilizes Newtonian mechanics, which is highly accurate for most orbital and gravitational calculations. For extreme scenarios near black holes, relativistic corrections would be required, though our Schwarzschild radius calculations (planned) would handle those specific edge cases.",
  },
  {
    question: "What value of the Gravitational Constant (G) is used?",
    answer: "We use the CODATA recommended value of G = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻², ensuring your physics research aligns with international scientific standards.",
  },
];

const howToSteps = [
  { name: "Select Cosmic Event", text: "Choose the specific calculation type, such as Gravitational Force or Hubble Distance, from the dropdown menu." },
  { name: "Input Masses or Distances", text: "Enter values manually in scientific notation or use our 'One-Tap Presets' for Earth, the Moon, or the Sun." },
  { name: "Define Units", text: "Ensure your units are consistent (e.g., meters vs. kilometers) using the integrated unit selectors." },
  { name: "Analyze Results", text: "Review the calculated output in both scientific notation and human-readable 'Billions/Trillions' descriptions." },
];

export default function AstrophysicsCalculatorPage() {
  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Astrophysics", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/astrophysics/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'select', popover: { title: '1. Select Calculation', description: 'Switch between gravity, orbits, or stellar luminosity instantly.' } },
    { element: '.bg-brand-primary', popover: { title: '2. Cosmic Results', description: 'Results are shown in high-precision scientific notation with human-readable labels.' } },
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
        name="How to Compute Celestial Mechanics"
        description="Follow our professional guide to calculating orbits and gravitational forces using our high-precision engine."
        steps={howToSteps}
      />
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

      <ToolArticle title="Mastering Celestial Mechanics: A Guide to the Universe">
        <p>
          Astrophysics is the study of the physical properties of celestial objects and the universe as a whole. Because space involves scales that are difficult for the human mind to comprehend&mdash;from the microscopic to the vast expanses of intergalactic space&mdash;precision tools are essential. Our <strong>Astrophysics Calculator Suite</strong> is designed to simplify these complex formulas, allowing students and researchers to focus on the results rather than the tedious scientific notation.
        </p>

        <h3>The Law of Universal Gravitation</h3>
        <p>
          At the heart of our suite is Newton&apos;s Law of Universal Gravitation. Every object with mass attracts every other object. The force is proportional to the product of their masses and inversely proportional to the square of the distance between their centers. This fundamental force is what keeps planets in orbit and galaxies together. Our engine handles these &quot;Big G&quot; calculations with extreme precision, utilizing constants verified by <strong>NIST</strong>.
        </p>

        <h3>Stellar Luminosity and the Life of Stars</h3>
        <p>
          How bright is a star? The answer depends on its radius and its surface temperature. Using the <strong>Stefan-Boltzmann Law</strong>, our luminosity tool allows you to calculate the total power output (Watts) of any celestial body. This is a key metric used by astronomers to classify stars on the Hertzsprung-Russell diagram and determine their distance from Earth.
        </p>

        <h3>Hubble&apos;s Law and the Expanding Universe</h3>
        <p>
          We are not in a static universe. Hubble&apos;s Law shows that galaxies are moving away from us at speeds proportional to their distance. This reveals the expansion of the universe itself. By using our Hubble Distance tool, you can estimate the distance of a galaxy in Megaparsecs based on its recessional velocity (v = H0d), a cornerstone of modern cosmology.
        </p>

        <h3>Why Use Our Presets?</h3>
        <p>
          Astronomical values are prone to &quot;typo-errors&quot; because of their scale. For example, Earth&apos;s mass is <code>5.972 &times; 10²⁴ kg</code>. Typing that manually into a standard calculator often leads to exponent errors. Our <strong>One-Tap Presets</strong> load verified data for the Sun, Milky Way, and all major planets instantly, providing a secure baseline for your physics research.
        </p>

        <SourceReference
          sources={[
            { name: "NASA - Space Science Data Coordinated Archive", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/" },
            { name: "ESA - The Study of Astrophysics", url: "https://www.esa.int/Science_Exploration/Space_Science/Astrophysics" },
            { name: "NASA JPL - Physical Constants Guide", url: "https://ssd.jpl.nasa.gov/?constants" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={PATH} />
    </div>
  );
}

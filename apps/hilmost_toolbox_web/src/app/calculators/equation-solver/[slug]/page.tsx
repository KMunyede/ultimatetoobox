import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, ToolHeader } from "@utilitiessite/ui";
import { EquationSolverClient } from "../EquationSolverClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const SLUGS = [
  { slug: "newtons-second-law", cat: "Mechanics", id: "fma", title: "Newton's Second Law Solver", desc: "Solve for Force, Mass, or Acceleration (F=ma) instantly. High-precision physics calculator." },
  { slug: "kinetic-energy", cat: "Mechanics", id: "ke", title: "Kinetic Energy Calculator", desc: "Calculate kinetic energy, mass, or velocity using the KE = ½mv² formula. Perfect for physics students." },
  { slug: "ideal-gas-law", cat: "Thermodynamics", id: "gas", title: "Ideal Gas Law Solver", desc: "Solve for Pressure, Volume, Moles, or Temperature (PV=nRT) with our free thermodynamics tool." },
  { slug: "ohms-law", cat: "Electromagnetism", id: "ohms", title: "Ohm's Law Calculator", desc: "Instantly calculate Voltage, Current, or Resistance (V=IR) for any electrical circuit." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Science Equation Solver" };

  const canonical = getCanonicalUrl(`/calculators/equation-solver/${resolvedParams.slug}`);

  return {
    title: `${config.title} | Equation Solver | Hilmost`,
    description: config.desc,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.desc,
      url: canonical,
      images: ["/og/calculators.png"],
    },
  };
}

export default async function EquationProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return notFound();

  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Equation Solver", href: "/calculators/equation-solver" },
    { label: config.title, href: `/calculators/equation-solver/${resolvedParams.slug}` },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/equation-solver/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-2 max-w-6xl">
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={config.title}
        subtitle={config.desc}
        lastUpdated={lastUpdated}
        tourId="equation_solver"
        tourSteps={[]}
        shareButton={<ShareButton />}
      />

      <EquationSolverClient initialCategory={config.cat} initialEquationId={config.id} />

      <ToolArticle title={`Mastering ${config.title}`}>
        <p>{config.desc} Our solver eliminates the need for manual algebraic rearrangement, allowing you to focus on the science.</p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Verify Equation</strong> - The {config.cat} formula is pre-selected for your convenience.</li>
          <li><strong>Step 2: Choose Target</strong> - Select the variable you want to solve for from the dropdown menu.</li>
          <li><strong>Step 3: Enter Values</strong> - Input your known data and select the appropriate units for an instant result.</li>
        </ol>
      </ToolArticle>

      <RelatedTools category="calculators" currentPath={`/calculators/equation-solver/${resolvedParams.slug}`} />
    </div>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, FAQSchema, RelatedTools, ToolHeader, BreadcrumbSchema } from "@utilitiessite/ui";
import { EquationSolverClient } from "../EquationSolverClient";
import { EQUATION_CONTENT } from "../equation-content";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { isNoIndexPath } from "@/lib/indexing-policy";

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

  const routePath = `/calculators/equation-solver/${resolvedParams.slug}`;
  const canonical = getCanonicalUrl(routePath);

  return {
    title: `${config.title} | Equation Solver | Hilmost`,
    description: config.desc,
    alternates: { canonical },
    ...(isNoIndexPath(routePath) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: config.title,
      description: config.desc,
      url: canonical,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/calculators.png", width: 1200, height: 630, alt: config.title }],
    },
    twitter: {
      title: config.title,
      description: config.desc,
      images: ["https://hilmost-toolbox.hilmost.net/og/calculators.png"],
    }
  };
}

export default async function EquationProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  const content = EQUATION_CONTENT[resolvedParams.slug];
  if (!config || !content) return notFound();

  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Equation Solver", href: "/calculators/equation-solver" },
    { label: config.title, href: `/calculators/equation-solver/${resolvedParams.slug}` },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/equation-solver/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const otherEquations = SLUGS.filter(s => s.slug !== resolvedParams.slug);

  return (
    <div className="container mx-auto px-4 py-2 max-w-6xl">
      <WebApplicationSchema
        name={`${config.title} | Hilmost`}
        description={config.desc}
        url={getCanonicalUrl(`/calculators/equation-solver/${resolvedParams.slug}`)}
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={content.faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

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
        <p>{content.intro}</p>

        <h3>Formula &amp; SI Units</h3>
        <p className="font-mono text-base bg-slate-100 dark:bg-slate-800 p-3 rounded-md font-semibold text-slate-900 dark:text-slate-100">
          {content.formula.expression}
        </p>
        <ul>
          {content.formula.variables.map((v, idx) => (
            <li key={idx}>
              <strong>{v.symbol} ({v.name}):</strong> {v.description}. SI unit: {v.unit}.
            </li>
          ))}
        </ul>

        <h3>How to Use This Tool</h3>
        <ol>
          {content.howToUse.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>

        <h3>Worked Example ({content.workedExample.title})</h3>
        <p><strong>Scenario:</strong> {content.workedExample.scenario}</p>
        <p><strong>Given:</strong> {content.workedExample.given.join(", ")}.</p>
        <ol>
          {content.workedExample.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        <p><strong>Result:</strong> {content.workedExample.result}</p>

        <h3>Related Solvers</h3>
        <p>Explore other dedicated physics and thermodynamics equation solvers:</p>
        <ul>
          {otherEquations.map((other) => (
            <li key={other.slug}>
              <Link href={`/calculators/equation-solver/${other.slug}`} className="text-emerald-800 dark:text-emerald-400 underline font-medium hover:opacity-80">
                {other.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/calculators/equation-solver" className="text-emerald-800 dark:text-emerald-400 underline font-medium hover:opacity-80">
              Science Equation Solver Hub (All Physics Formulas)
            </Link>
          </li>
        </ul>
      </ToolArticle>

      <FAQAccordion items={content.faqs} />

      <RelatedTools category="calculators" currentPath={`/calculators/equation-solver/${resolvedParams.slug}`} />
    </div>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, ToolArticle, RelatedTools, ToolHeader } from "@utilitiessite/ui";
import { AstrophysicsCalculatorClient } from "../AstrophysicsCalculatorClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

const SLUGS = [
  { slug: "gravitational-force", type: "gravity", title: "Gravitational Force Calculator", desc: "Calculate the gravitational attraction between two objects using Newton's Law of Universal Gravitation." },
  { slug: "orbital-velocity", type: "orbital", title: "Orbital Velocity Calculator", desc: "Compute the speed required for a stable orbit around a celestial body based on mass and radius." },
  { slug: "escape-velocity", type: "escape", title: "Escape Velocity Calculator", desc: "Find the minimum speed needed to break free from a planet's or star's gravitational field." },
  { slug: "luminosity-calculator", type: "luminosity", title: "Star Luminosity Calculator", desc: "Calculate the total energy output of a star using its radius and surface temperature (Stefan-Boltzmann Law)." },
  { slug: "hubble-distance", type: "hubble", title: "Hubble Distance Calculator", desc: "Estimate the distance to a galaxy based on its recessional velocity and the Hubble constant." }
] as const;

type AstroCalcType = typeof SLUGS[number]['type'];

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Astrophysics Calculator" };

  const title = generatePageTitle(`${config.title} | Astrophysics`);
  const canonical = `/calculators/astrophysics/${resolvedParams.slug}`;

  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: config.desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: config.desc,
      url: canonical,
      type: "website",
      images: ["/og/calculators.png"],
    },
    twitter: {
      title,
      description: config.desc,
      images: ["/og/calculators.png"],
    }
  };
}

export default async function AstroProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return notFound();

  const breadcrumbItems = [
    { label: "Calculators", href: "/calculators" },
    { label: "Astrophysics", href: "/calculators/astrophysics" },
    { label: config.title, href: `/calculators/astrophysics/${resolvedParams.slug}` },
  ];

  const filePath = path.join(process.cwd(), "src/app/calculators/astrophysics/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={config.title}
        subtitle={config.desc}
        lastUpdated={lastUpdated}
        tourId="astro_calc"
        tourSteps={[]}
        shareButton={<ShareButton />}
      />

      <AstrophysicsCalculatorClient initialType={config.type as AstroCalcType} />

      <ToolArticle title={`Mastering ${config.title}`}>
        <p>{config.desc} This tool utilizes standard physical constants and precision mathematical models to provide accurate astronomical results.</p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select cosmic event</strong> - The {config.title} mode is pre-selected for you.</li>
          <li><strong>Step 2: Use Presets</strong> - Choose celestial bodies like Earth or the Sun to automatically load their mass and radius.</li>
          <li><strong>Step 3: Review Results</strong> - Click calculate to see precision results in scientific notation with clear descriptions.</li>
        </ol>
      </ToolArticle>

      <RelatedTools category="calculators" currentPath={`/calculators/astrophysics/${resolvedParams.slug}`} />
    </div>
  );
}

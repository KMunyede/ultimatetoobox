import { Metadata } from "next";
import { AstrophysicsPageUI } from "../AstrophysicsPageUI";

const SLUGS = [
  { slug: "escape-velocity", type: "escape", title: "Escape Velocity Calculator", desc: "Calculate the escape velocity of any planet or star instantly. Explore astrophysics from your browser." },
  { slug: "schwarzschild-radius", type: "schwarzschild", title: "Schwarzschild Radius Calculator", desc: "Calculate the event horizon radius of a black hole instantly. Explore relativity and astrophysics." },
  { slug: "orbital-speed", type: "orbital", title: "Orbital Speed Calculator", desc: "Calculate circular orbital velocity for satellites and planets instantly. Explore astrophysics from your browser." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Astrophysics Calculator" };

  return {
    title: `${config.title} | Free Online Calculator`,
    description: `Free online ${config.title.toLowerCase()}. ${config.desc}`,
  };
}

export default async function AstrophysicsProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return <AstrophysicsPageUI />;

  return (
    <AstrophysicsPageUI 
      defaultTab={config.type as "escape" | "schwarzschild" | "orbital"}
      title={`${config.title}`}
      description={config.desc}
      canonicalUrl={`https://hilmost-toolbox.hilmost.net/calculators/astrophysics/${resolvedParams.slug}`}
    />
  );
}

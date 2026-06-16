import { Metadata } from "next";
import { EquationSolverPageUI } from "../EquationSolverPageUI";

const SLUGS = [
  { slug: "kinematics", type: "kinematics", title: "Kinematics Equation Solver", desc: "Solve 1D kinematics equations (v = u + at) instantly. Find velocity, acceleration, or time." },
  { slug: "force", type: "force", title: "Newton's Second Law Solver", desc: "Solve force equations (F = ma) instantly. Find force, mass, or acceleration." },
  { slug: "ideal-gas-law", type: "gas", title: "Ideal Gas Law Solver", desc: "Solve the ideal gas law (PV = nRT) instantly. Find pressure, volume, moles, or temperature." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Equation Solver" };

  return {
    title: `${config.title} | Free Online Calculator`,
    description: `Free online ${config.title.toLowerCase()}. ${config.desc}`,
  };
}

export default async function EquationProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return <EquationSolverPageUI />;

  return (
    <EquationSolverPageUI 
      defaultEquation={config.type as "kinematics" | "force" | "gas"}
      title={`${config.title}`}
      description={config.desc}
      canonicalUrl={`https://hilmost-toolbox.hilmost.net/calculators/equation-solver/${resolvedParams.slug}`}
    />
  );
}

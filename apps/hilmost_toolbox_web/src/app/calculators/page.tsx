import { WebApplicationSchema, Breadcrumbs } from "@utilitiessite/ui";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Online Calculators — Free Standard, Scientific & Specialized Tools | Hilmost Toolbox",
    description: "Master complex math with ease. Free online calculators for standard arithmetic, scientific computing, astrophysics, and physics equation solving.",
    alternates: {
      canonical: getCanonicalUrl("/calculators"),
    },
  };
}

const links = [
  {
    name: "Standard Calculator",
    href: "/calculators/standard",
    description: "A fast, clean calculator for everyday arithmetic. Simple, responsive, and perfect for quick sums on any device."
  },
  {
    name: "Scientific Calculator",
    href: "/calculators/scientific",
    description: "Advanced math functions including trigonometry, logarithms, and exponentials. A complete replacement for your physical scientific calculator."
  },
  {
    name: "Astrophysics Calculator",
    href: "/calculators/astrophysics",
    description: "Explore the cosmos with specialized tools for escape velocity, Schwarzschild radius, and orbital speed calculations."
  },
  {
    name: "Science Equation Solver",
    href: "/calculators/equation-solver",
    description: "Solve complex physics and chemistry equations instantly. Supports kinematics, force, and ideal gas law calculations."
  },
];

export default function CalculatorsHub() {
  const breadcrumbItems = [{ label: "Calculators", href: "/calculators" }];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name="Calculators | Hilmost Ultimate Toolbox"
        description="Master your daily tasks with quiet confidence. Everything you need, exactly when you need it: standard, scientific, and specialized math calculators."
        url="https://hilmost-toolbox.hilmost.net/calculators"
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Calculator className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Mathematics & Science
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        High-precision computing for students, engineers, and scientists. Whether you need a simple sum or complex relativistic physics calculations, our tools deliver robust processing power directly in your browser.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-blue-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

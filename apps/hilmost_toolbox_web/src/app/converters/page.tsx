import { WebApplicationSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Replace, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Converters | Hilmost Ultimate Toolbox",
  description: "Step into a smoother workflow. Discover converters designed to respect your time and elevate your craft with instant unit transformations.",
};

const links = [
  { name: "Age Calculator", href: "/converters/age-calculator" },
  { name: "Percentage Calculator", href: "/converters/percentage" },
  { name: "Unix Time", href: "/converters/unix-time" },
  { name: "Length Converter", href: "/converters/length" },
  { name: "Weight/Mass Converter", href: "/converters/weight-mass" },
  { name: "Temperature Converter", href: "/converters/temperature" },
  { name: "Time Converter", href: "/converters/time" },
  { name: "Time Zone Converter", href: "/converters/time-zone" },
  { name: "Data Storage", href: "/converters/data-storage" },
  { name: "Area Converter", href: "/converters/area" },
];

export default function ConvertersHub() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
      <WebApplicationSchema name="Converters | Hilmost Ultimate Toolbox" description="Step into a smoother workflow. Discover converters designed to respect your time and elevate your craft with instant unit transformations." url="https://hilmost-toolbox.hilmost.net/converters" />
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <Replace className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Converters
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        A complete collection of precision conversion tools. Easily convert units of length, weight, temperature, digital storage, and time with instant results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-green-500/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

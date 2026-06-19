import { WebApplicationSchema, Breadcrumbs } from "@utilitiessite/ui";
import Link from "next/link";
import { Replace, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Unit Converters — Free Online Measurement Tools | Hilmost Toolbox",
    description: "Convert units of length, weight, temperature, data storage, and time instantly. Free online converters with precision results and no signup required.",
    alternates: {
      canonical: getCanonicalUrl("/converters"),
    },
  };
}

const links = [
  {
    name: "Age Calculator",
    href: "/converters/age-calculator",
    description: "Determine exact age in years, months, and days based on birth date."
  },
  {
    name: "Percentage Calculator",
    href: "/converters/percentage",
    description: "Calculate percentage increases, decreases, and common math ratios."
  },
  {
    name: "Unix Time",
    href: "/converters/unix-time",
    description: "Convert between human-readable dates and Unix timestamps instantly."
  },
  {
    name: "Length Converter",
    href: "/converters/length",
    description: "Transform measurements between meters, feet, inches, miles, and kilometers."
  },
  {
    name: "Weight/Mass Converter",
    href: "/converters/weight-mass",
    description: "Convert between grams, kilograms, pounds, ounces, and metric tons."
  },
  {
    name: "Temperature Converter",
    href: "/converters/temperature",
    description: "Switch between Celsius, Fahrenheit, and Kelvin with precise calculations."
  },
  {
    name: "Time Converter",
    href: "/converters/time",
    description: "Convert between seconds, minutes, hours, days, and weeks easily."
  },
  {
    name: "Time Zone Converter",
    href: "/converters/time-zone",
    description: "Compare times across global time zones and plan international meetings."
  },
  {
    name: "Data Storage",
    href: "/converters/data-storage",
    description: "Convert between bits, bytes, kilobytes, megabytes, and gigabytes."
  },
  {
    name: "Area Converter",
    href: "/converters/area",
    description: "Calculate conversions for square meters, acres, hectares, and square feet."
  },
];

export default function ConvertersHub() {
  const breadcrumbItems = [{ label: "Converters", href: "/converters" }];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name="Converters | Hilmost Ultimate Toolbox"
        description="A complete collection of precision conversion tools. Easily convert units of length, weight, temperature, digital storage, and time with instant results."
        url="https://hilmost-toolbox.hilmost.net/converters"
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <Replace className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Unit Converters
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        Precision measurement transformations for everyday tasks. Whether you're working on engineering projects, cooking, or traveling, our converters deliver instant, accurate results across all standard unit systems.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-green-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

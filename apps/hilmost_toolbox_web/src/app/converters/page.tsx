import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema, FAQSchema, FAQAccordion, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { Replace, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "Unit Converters";
const DESC = "A complete collection of precision conversion tools. Easily convert units of length, weight, temperature, digital storage, and time with instant results.";
const PATH = "/converters";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} — Free Online Measurement Tools | Hilmost Toolbox`,
    description: "Convert units of length, weight, temperature, data storage, and time instantly. Free online converters with precision results and no signup required.",
    alternates: {
      canonical: getCanonicalUrl(PATH),
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

const faqs = [
  {
    question: "Which unit systems do these free online unit converters support?",
    answer: "Our tools support all major global standards, including the International System of Units (Metric) and the Imperial/US Customary systems. You can seamlessly convert between meters and feet, kilograms and pounds, and many other units."
  },
  {
    question: "How accurate are the conversion results?",
    answer: "We use high-precision mathematical models to ensure that our conversions are accurate to multiple decimal places. This is essential for engineering, scientific, and culinary tasks where small discrepancies can cause issues."
  },
  {
    question: "Can I use these converters on my mobile device?",
    answer: "Yes. Every tool in the Hilmost Toolbox is built with a responsive, mobile-first design. They work perfectly on smartphones and tablets, making them ideal for quick checks on the job site or in the kitchen."
  },
  {
    question: "Do I need to sign up or pay to perform conversions?",
    answer: "No. All our unit converters are 100% free and require no account registration. We believe in providing friction-free access to essential digital utilities."
  },
  {
    question: "Are there any limits on the number of conversions I can do?",
    answer: "There are absolutely no limits. You can perform as many conversions as you need, anytime, without ever hitting a paywall or limit."
  }
];

export default function ConvertersHub() {
  const breadcrumbItems = [{ label: "Converters", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Unit Converters | Hilmost Toolbox",
    "description": "A comprehensive suite of free online unit converters for length, weight, time, and data.",
    "url": CANONICAL_URL,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": links.map((link, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://hilmost-toolbox.hilmost.net${link.href}`,
        "name": link.name
      }))
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <Replace className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Free Online Unit Converters
        </h1>
      </div>

      <section className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed">
          Welcome to the Hilmost hub for <strong>free online unit converters</strong>. In a globalized world, the ability to translate measurements between different systems is a daily requirement for professionals and hobbyists alike. Whether you are an engineer working with international blueprints, a traveler checking local temperatures, or a developer managing digital data, our suite of converters provides instant, high-precision results.
        </p>

        <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Professional Measurement Transformations</h2>
        <p>
          Accuracy is the cornerstone of our engineering philosophy. Our <strong>Length Converter</strong> and <strong>Weight/Mass Converter</strong> allow you to switch between Metric (meters, kilograms) and Imperial (feet, pounds) systems with zero friction. We use the latest conversion factors to ensure that every result is reliable for even the most sensitive tasks, such as aerospace calculations or medical dosages.
        </p>

        <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Specialized Time and Data Utilities</h2>
        <p>
          Modern workflows often require specialized conversions beyond simple physical dimensions. Our <strong>Unix Time Converter</strong> is a vital tool for software developers, while our <strong>Data Storage Converter</strong> helps IT professionals manage everything from bits and bytes to terabytes. We also offer a <strong>Time Zone Converter</strong> to help global teams synchronize meetings across different continents without the headache of manual math.
        </p>

        <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Everyday Math Made Simple</h2>
        <p>
          Beyond professional use, our hub includes tools for common daily tasks. The <strong>Percentage Calculator</strong> is perfect for retail discounts or tax estimates, while the <strong>Age Calculator</strong> provides exact milestones in years, months, and days. By housing all these tools in one &quot;enterprise-calm&quot; dashboard, we eliminate the need to search multiple websites, saving you time and reducing digital clutter.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

      <ToolArticle title="The Hilmost Commitment to Quality">
        <p>
          Our unit converters are engineered to provide more than just numbers. They provide confidence. By eliminating intrusive ads and focusing on a high-performance, browser-side architecture, we ensure that your conversion experience is as fast and secure as possible. Every tool is optimized for Core Web Vitals to ensure it meets the highest standards for modern web applications.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

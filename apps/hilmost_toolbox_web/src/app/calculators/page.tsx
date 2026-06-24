import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl, sanitizeTitle } from "@utilitiessite/config";

const TITLE = "Math & Science Calculators";
const DESC = "Master your daily tasks with quiet confidence. Everything you need, exactly when you need it: standard, scientific, and specialized math calculators.";
const PATH = "/calculators";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = sanitizeTitle(TITLE);
  return {
    title,
    description: DESC,
    alternates: {
      canonical: CANONICAL_URL,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    }
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

const faqs = [
  {
    question: "Are these online calculators free to use?",
    answer: "Yes, all calculators on Hilmost Toolbox are 100% free to use. We do not require any subscriptions, account registrations, or hidden fees. Our mission is to provide high-quality digital utilities accessible to everyone with an internet connection."
  },
  {
    question: "Do I need to download any software to use the calculators?",
    answer: "No software downloads or browser extensions are necessary. Our calculators are web-based applications that run directly in your browser. This ensures compatibility across all operating systems, including Windows, macOS, Linux, iOS, and Android."
  },
  {
    question: "Are my calculations and data private?",
    answer: "Absolutely. We prioritize your privacy by performing calculations client-side whenever possible. This means your data stays on your device and is not sent to our servers for processing, ensuring a secure and private computing experience."
  },
  {
    question: "Do you support scientific notation and complex functions?",
    answer: "Yes, our Scientific Calculator and specialized Science Equation Solvers support scientific notation, trigonometric functions, logarithms, and other advanced mathematical operations required for engineering and academic work."
  },
  {
    question: "Are the calculators mobile-friendly?",
    answer: "Yes, Hilmost Toolbox is built with a mobile-first design. Every calculator is fully responsive and optimized for touch interfaces, allowing you to perform calculations on the go using your smartphone or tablet."
  }
];

export default function CalculatorsHub() {
  const breadcrumbItems = [{ label: "Calculators", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Calculators | Hilmost Toolbox",
    "description": "A comprehensive suite of free online calculators for mathematics, science, and engineering.",
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
        image="https://hilmost-toolbox.hilmost.net/og/calculators.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Calculator className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Free Online Calculators
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Precision engineering for every equation. Our free online calculators provide banking-grade accuracy for math, science, and astrophysics, all running locally in your browser.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

      <CollapsibleSection title="About Mathematics & Science Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the <strong>free online calculators</strong> hub at Hilmost Toolbox. In today&apos;s fast-paced digital world, having access to reliable, accurate, and fast computing tools is essential. Whether you are a student tackling homework, an engineer performing site calculations, or a scientist exploring the depths of the cosmos, our suite of calculators is engineered to meet your needs with banking-grade precision.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Precision Engineering for Every Equation</h2>
          <p>
            At Hilmost, we believe that math should be accessible and frictionless. Our collection spans from the essential <strong>Standard Calculator</strong> for everyday budgeting and simple sums to advanced <strong>Scientific Calculators</strong> capable of handling complex trigonometry and logarithmic functions. We focus on a clean, &quot;enterprise-calm&quot; interface that eliminates distractions, allowing you to focus entirely on the numbers that matter.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Advanced Science and Astrophysics Solvers</h2>
          <p>
            Beyond basic arithmetic, we offer specialized tools for the scientific community. Our <strong>Astrophysics Calculator</strong> allows you to compute physical constants and cosmic trajectories, such as escape velocity and gravitational attraction, using the latest astronomical data models. For chemistry and physics students, our <strong>Science Equation Solver</strong> provides instant answers to common kinematics, force, and thermodynamics problems, saving you time and reducing manual errors.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Why Choose Hilmost Calculators?</h2>
          <p>
            Unlike many other utility sites, Hilmost Toolbox is built with a <strong>privacy-first architecture</strong>. We utilize client-side processing, meaning your calculations happen locally in your browser. Your data is never uploaded to a server, ensuring 100% privacy for sensitive financial or academic work. Furthermore, our tools are optimized for Core Web Vitals, ensuring they load instantly on both high-speed desktop connections and mobile networks.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Mastering Mathematical Accuracy">
        <p>
          Our calculators are more than just simple web forms. They are carefully architected digital products designed to provide consistent results across all browsers. We use high-precision decimal libraries where necessary to avoid common floating-point errors found in standard JavaScript, ensuring that your financial and scientific results are as accurate as possible.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

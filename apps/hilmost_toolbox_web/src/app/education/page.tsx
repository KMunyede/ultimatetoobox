import { WebApplicationSchema, Breadcrumbs, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TITLE = "Education Tools";
const DESC = "Free online education calculators and academic tools. Calculate GPA, track semester progress, and manage your studies with high-precision utilities.";
const PATH = "/education";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = generatePageTitle(TITLE);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/education.png", width: 1200, height: 630 }],
    }
  };
}

const links = [
  {
    name: "GPA Calculator",
    href: "/education/gpa-calculator",
    icon: <GraduationCap size={20} />,
    description: "Calculate semester and cumulative GPA with standard or weighted scales. Supports letter grades, percentages, and points."
  },
];

const faqs = [
  {
    question: "Are these education tools free to use?",
    answer: "Yes, all academic utilities in the Hilmost Toolbox are completely free. We do not require account registration or payment to access professional-grade calculators."
  },
  {
    question: "Is my academic data stored on your servers?",
    answer: "No. We utilize a 'Zero-Server' architecture. All calculations for GPA and other metrics happen locally in your browser. Your grades and course history are never transmitted to us."
  },
  {
    question: "Do you support different grading systems?",
    answer: "Our calculators support major global standards, including 4.0 and 5.0 scales, letter-based systems, and percentage-based grading commonly found in international institutions."
  }
];

export default function EducationHub() {
  const breadcrumbItems = [{ label: "Education", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Education Tools | Hilmost Toolbox",
    "description": DESC,
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
        image="https://hilmost-toolbox.hilmost.net/og/education.png"
      />
      <FAQSchema items={faqs} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
          <GraduationCap className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Education & Academic Tools
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Empowering students and educators with precision utilities. Calculate academic performance, convert grades, and plan your semester with ease.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-orange-500/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 group-hover:text-orange-600 transition-colors">
                {link.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{link.name}</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-orange-600 dark:text-orange-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <CollapsibleSection title="About Education Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the <strong>Education Hub</strong> at Hilmost Software Corporation. Our mission is to provide students with the highest-quality digital laboratory for tracking and improving their academic performance. Academic success shouldn&apos;t be complicated by manual spreadsheets or insecure online trackers.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Precision GPA Calculation</h2>
          <p>
            Our flagship <strong>GPA Calculator</strong> provides a seamless interface for determining both semester and cumulative Grade Point Averages. We support multiple input methods—including letter grades, percentages, and raw points—to ensure compatibility with various institutional standards. With support for weighted 5.0 scales, even the most advanced academic tracks are covered.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Privacy in Academia</h2>
          <p>
            Students often have to enter sensitive academic history into online tools. At Hilmost, we prioritize your data privacy through our <strong>Zero-Server Architecture</strong>. Every grade you enter and every calculation performed happens entirely on your local device. We never store or transmit your academic records, making our platform a safe haven for your study planning.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Strategize for Academic Excellence">
        <p>
          Successful students don&apos;t just study—they strategize. By using our academic tools, you can forecast your future performance and identify exactly what grades you need in your upcoming finals to hit your target cumulative average. We are committed to building tools that help you focus on learning while we handle the data.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

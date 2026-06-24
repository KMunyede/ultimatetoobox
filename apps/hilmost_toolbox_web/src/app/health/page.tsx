import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "Health & Fitness Tools";
const DESC = "Free online health and fitness tools including BMI calculators and metric trackers. Monitor your health metrics and maintain your well-being with precision.";
const PATH = "/health";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Health & Wellness Tools",
    description: DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: "Health & Wellness Tools | Hilmost Toolbox",
      description: DESC,
      url: `https://hilmost-toolbox.hilmost.net${PATH}`,
      type: "website",
    }
  };
}

const links = [
  {
    name: "Daily Wisdom & Wellness",
    href: "/health/daily-wisdom",
    description: "A digital sanctuary for mental well-being. Access daily quotes, journaling tools, and library resources to elevate your mindset."
  },
  {
    name: "BMI Calculator",
    href: "/health/bmi-calculator",
    description: "Calculate your Body Mass Index (BMI) instantly. Understand your weight category and track your fitness trajectory with ease."
  },
];

const faqs = [
  {
    question: "Is my personal health data stored on your servers?",
    answer: "No. At Hilmost, we prioritize your privacy. Our health calculators and tracking tools operate client-side in your browser. This means your height, weight, and other metrics are processed locally and never transmitted to our servers."
  },
  {
    question: "Are these free online health calculators a substitute for medical advice?",
    answer: "No. These tools are provided for informational and educational purposes only. They are intended to help you monitor general wellness metrics and should not be used for diagnosis or treatment. Always consult with a qualified healthcare professional for medical concerns."
  },
  {
    question: "How accurate is the BMI calculator?",
    answer: "Our BMI calculator uses the standard medical formula (weight in kilograms divided by the square of height in meters). While it is a reliable indicator for most adults, it does not account for muscle mass, bone density, or body composition variations."
  },
  {
    question: "Does the tool support both Metric and Imperial units?",
    answer: "Yes, our health tools are designed for a global audience. You can easily switch between Metric (cm/kg) and Imperial (in/lbs) systems to get your results in the format you're most comfortable with."
  },
  {
    question: "Can I use these tools on my mobile phone while at the gym?",
    answer: "Absolutely. Hilmost Toolbox is fully responsive and optimized for mobile devices. You can quickly check your metrics or access daily wisdom directly from your smartphone, anytime and anywhere."
  }
];

export default function HealthHub() {
  const breadcrumbItems = [{ label: "Health", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Health & Wellness Tools | Hilmost Toolbox",
    "description": "A secure suite of free online health calculators and wellness resources for physical and mental well-being.",
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
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
          <Activity className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Free Online Health Calculators
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Precision tools for your physical and mental well-being. Track body metrics and explore wellness resources with our secure, privacy-focused health utilities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-rose-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-rose-600 dark:text-rose-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <CollapsibleSection title="About Health & Wellness Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the Hilmost sanctuary for <strong>free online health calculators</strong> and wellness tracking. In the pursuit of a balanced life, understanding your body&apos;s core metrics is a vital first step. We have developed a suite of high-precision tools designed to help you monitor your physical health and mental well-being with complete privacy and scientific accuracy.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Track Your BMI and Body Metrics Safely</h2>
          <p>
            Maintaining a healthy weight is about more than just numbers; it&apos;s about long-term wellness. Our <strong>BMI Calculator</strong> provides an instant analysis of your Body Mass Index, helping you understand your weight category relative to your height. We use standard medical formulas to ensure that your results are reliable, whether you are using Metric or Imperial measurements. By tracking these metrics regularly, you can make more informed decisions about your diet and exercise routines.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Daily Wisdom and Mental Well-being</h2>
          <p>
            At Hilmost, we believe that health is holistic. Beyond physical metrics, we offer the <strong>Daily Wisdom & Wellness</strong> project—a digital space for mental grounding. Access stoic philosophy, daily quotes, and journaling prompts designed to reduce stress and improve focus in the modern era. Our goal is to provide a &quot;digital sanctuary&quot; where you can take a moment to reflect and reset amidst your busy daily workflow.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Secure and Private Health Monitoring</h2>
          <p>
            Health data is incredibly sensitive. Unlike other wellness platforms that track your information for advertising purposes, Hilmost Toolbox operates with a <strong>privacy-first architecture</strong>. Your metrics are processed entirely within your browser and are never stored on our servers. This ensures that your weight, height, and personal reflections remain entirely yours, providing you with a secure environment to focus on what truly matters: your health.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="The Importance of Informed Wellness">
        <p>
          While our tools provide high-precision data for general tracking, they are not a substitute for professional medical consultation. We encourage all our users to use these calculators as a starting point for deeper conversations with healthcare providers. By combining accurate body metrics with professional advice, you can build a sustainable path toward a healthier, more vibrant future.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

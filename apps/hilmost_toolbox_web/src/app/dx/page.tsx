import { WebApplicationSchema, Breadcrumbs, FAQSchema, FAQAccordion, ToolArticle, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";
import { generatePageTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TITLE = "Developer Experience Tools";
const DESC = "High-performance developer utilities for modern workflows. Free online tools for JSON formatting, Regex testing, and JWT decoding with 100% privacy.";
const PATH = "/dx";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/dx.png", width: 1200, height: 630 }],
    }
  };
}

const links = [
  {
    name: "JSON Formatter",
    href: "/dx/json-formatter",
    description: "Pretty-print, validate, and minify JSON data instantly. Handles large payloads with ease and highlights syntax errors."
  },
  {
    name: "Password Generator",
    href: "/dx/password-generator",
    description: "Generate secure random passwords with custom rules. Cryptographically secure, browser-side generation for maximum privacy."
  },
  {
    name: "Regex Tester",
    href: "/dx/regex-tester",
    description: "Build and test regular expressions in real-time. Includes reference guides for common patterns and instant match highlighting."
  },
  {
    name: "JWT Decoder",
    href: "/dx/jwt-decoder",
    description: "Inspect JSON Web Tokens (JWT) safely. Decode headers and payloads without ever sending your sensitive tokens to a server."
  },
];

const faqs = [
  {
    question: "Are my code and tokens sent to your servers?",
    answer: "No. All Hilmost DX tools operate with a 'Zero-Server' architecture. Your JSON, regex strings, and JWT tokens are processed entirely within your browser. We never transmit or store your technical data."
  },
  {
    question: "Do these tools support large data sets?",
    answer: "Yes. Our JSON formatter and Regex tester are optimized for high performance, allowing you to work with large configuration files and complex strings without browser lag."
  },
  {
    question: "Is the JWT decoder secure enough for production tokens?",
    answer: "Absolutely. Because the decoding happens 100% client-side, your token never leaves your device. This is significantly safer than using standard online decoders that log tokens on their backend."
  },
];

export default function DXHub() {
  const breadcrumbItems = [{ label: "Developer Experience", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online Developer Tools | Hilmost Toolbox",
    "description": "A secure suite of free online developer utilities for JSON, Regex, and JWT.",
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
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />
      
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Code2 className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Developer Experience Tools
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Accelerate your development workflow with precision utilities. Secure, browser-side tools for data formatting, pattern testing, and token inspection.
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

      <CollapsibleSection title="About Developer Experience Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the <strong>Developer Experience (DX)</strong> hub at Hilmost Toolbox. In the modern engineering landscape, minor friction points in your workflow can lead to significant productivity losses. Our mission is to eliminate that friction by providing a suite of high-performance, privacy-first utilities that handle the &quot;grunt work&quot; of data manipulation and inspection.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Streamlined Data Formatting and Validation</h2>
          <p>
            Working with messy JSON shouldn&apos;t be a headache. Our <strong>JSON Formatter</strong> is built to handle deep nesting and large payloads, providing instant syntax highlighting and error detection. Whether you are debugging an API response or preparing a config file, our tool ensures your data is clean, valid, and readable.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Real-Time Pattern Matching and Token Security</h2>
          <p>
            Regular expressions are powerful but notoriously difficult to get right on the first try. Our <strong>Regex Tester</strong> provides a real-time feedback loop, highlighting matches as you type and providing a quick-reference guide for common syntax. Furthermore, for those working with authentication, our <strong>JWT Decoder</strong> offers a secure environment to inspect token payloads without risking your production secrets on insecure servers.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Why Choose Hilmost for your DX?</h2>
          <p>
            Standard online developer tools often log your data for analysis or advertising. At Hilmost Digital Labs, we utilize <strong>Zero-Server Architecture</strong>. Every operation happens locally in your browser. This makes our platform the safest laboratory for your code, tokens, and data.
          </p>
        </section>
      </CollapsibleSection>

      <ToolArticle title="Engineering for Performance">
        <p>
          Our DX tools are optimized for low-latency interactions. We utilize modern browser APIs to ensure that operations like large-scale JSON pretty-printing or complex Regex evaluations are performed with the highest possible efficiency. By reducing the &quot;Time to Result,&quot; we help you stay in the flow and get back to building what matters.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}

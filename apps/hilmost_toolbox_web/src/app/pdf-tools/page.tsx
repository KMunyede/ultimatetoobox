import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema, AuthorBio, ToolArticle, PrivacyBadge, FAQSchema, FAQAccordion, CollapsibleSection } from "@utilitiessite/ui";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "PDF Tools";
const DESC = "A complete suite of private, browser-side PDF manipulation tools. Merge, split, rotate, and delete pages without uploading your files to any server.";
const PATH = "/pdf-tools";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PDF Tools",
    description: DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: "PDF Tools | Hilmost Toolbox",
      description: DESC,
      url: `https://hilmost-toolbox.hilmost.net${PATH}`,
      type: "website",
    }
  };
}

const links = [
  {
    name: "Merge PDF",
    href: "/pdf-tools/merge-pdf",
    description: "Combine multiple PDF files into a single document. Drag and drop to reorder files before merging."
  },
  {
    name: "Split PDF",
    href: "/pdf-tools/split-pdf",
    description: "Extract specific pages from your PDF or split a large document into multiple files by page range."
  },
  {
    name: "Rotate PDF",
    href: "/pdf-tools/rotate-pdf",
    description: "Rotate individual pages or the entire document by 90, 180, or 270 degrees with visual previews."
  },
  {
    name: "Delete Pages",
    href: "/pdf-tools/delete-pages",
    description: "Remove unwanted pages from your PDF file and download the cleaned version instantly."
  },
];

const faqs = [
  {
    question: "Are my PDF files uploaded to your server?",
    answer: "No. Hilmost PDF Tools use a 'Zero-Upload' architecture. All document processing—merging, splitting, and rotating—happens entirely within your web browser using local computing power. Your sensitive documents never touch our servers, ensuring 100% privacy."
  },
  {
    question: "Is there a limit on the file size or number of PDFs I can process?",
    answer: "Since processing happens on your local device, the limit is typically determined by your computer's RAM and browser capabilities. Generally, we support large files up to several hundred megabytes without issue. There are no daily limits on the number of documents you can process."
  },
  {
    question: "Can I use these free online PDF tools on my mobile phone?",
    answer: "Yes, our tools are fully responsive and work on modern mobile browsers. You can select files from your phone's storage or cloud drives (like iCloud or Google Drive) and manage your documents on the go."
  },
  {
    question: "Do I need to pay or create an account to download my files?",
    answer: "No. All PDF operations and downloads are 100% free. We do not require account registration, and we do not add watermarks to your documents."
  },
  {
    question: "Are the resulting PDFs compatible with professional software like Adobe Acrobat?",
    answer: "Yes. Our engine generates standard-compliant PDF files that are fully compatible with all major PDF viewers, including Adobe Acrobat, macOS Preview, Chrome, and various mobile apps."
  }
];

export default function PDFToolsHub() {
  const breadcrumbItems = [{ label: "PDF Tools", href: PATH }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Free Online PDF Tools | Hilmost Toolbox",
    "description": "A private, browser-side suite of free online PDF tools for merging, splitting, and rotating documents.",
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
        image="https://hilmost-toolbox.hilmost.net/og/pdf-tools.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
          Free Online PDF Tools
        </h1>
      </div>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
        Professional PDF management tools that respect your privacy. Merge, split, rotate, and delete pages securely in your browser—your documents never touch our servers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-red-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-red-600 dark:text-red-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <CollapsibleSection title="About PDF Tools">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to the Hilmost lab for <strong>free online PDF tools</strong> and document management. In an era where digital documentation is the global standard for business and law, having access to professional-grade PDF manipulation software is essential. We have designed a suite of high-performance utilities that bring the power of expensive desktop software directly into your web browser, with zero cost and maximum security.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Professional PDF Manipulation in Your Browser</h2>
          <p>
            Managing your documents should be frictionless. Our <strong>Merge PDF</strong> tool allows you to combine multiple reports, invoices, or academic papers into a single, organized file with simple drag-and-drop reordering. Conversely, our <strong>Split PDF</strong> utility gives you the precision to extract specific ranges or individual pages, creating new documents tailored to your exact requirements. We use lossless processing engines to ensure that your text and images remain sharp and searchable.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Secure and Private Document Processing</h2>
          <p>
            The most significant risk with standard &quot;online&quot; PDF tools is the privacy of your data. Most sites require you to upload your sensitive bank statements or legal contracts to their servers for processing. At Hilmost Digital Labs, we have eliminated this risk through a <strong>browser-side first architecture</strong>. Every operation—from rotation to page deletion—happens locally on your device. Your files never touch our servers, making our platform a safe digital sanctuary for your most confidential data.
          </p>

          <h2 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight">Fast, Lossless, and Watermark-Free</h2>
          <p>
            We believe in utility without compromise. Our tools are optimized for speed, leveraging your device&apos;s local hardware to process files instantly without waiting for slow server uploads or queues. Furthermore, we promise a &quot;clean&quot; output: we never add watermarks to your documents, and we don&apos;t limit the number of downloads. Whether you are correcting the orientation of a scan with our <strong>Rotate PDF</strong> tool or cleaning up a file by <strong>Deleting Pages</strong>, you get professional results every time.
          </p>
        </section>
      </CollapsibleSection>

      <PrivacyBadge />

      <ToolArticle title="The Future of Private Document Management">
        <p>
          By utilizing advanced JavaScript libraries like <code>pdf-lib</code> and <code>pdf.js</code>, we ensure that your document tasks are performed with the highest standards of reliability. Our goal is to provide a comprehensive laboratory of tools that eliminate productivity bottlenecks while upholding the strictest standards of data privacy and mathematical precision.
        </p>
      </ToolArticle>

      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Frequently Asked Questions</h2>
        <FAQAccordion items={faqs} />
      </div>

      <AuthorBio />
    </div>
  );
}

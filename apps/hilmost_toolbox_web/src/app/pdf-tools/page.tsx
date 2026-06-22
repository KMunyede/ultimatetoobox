import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
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
    title: `${TITLE} — Merge, Split, Rotate & Delete PDF Pages | Hilmost Toolbox`,
    description: "Manage your PDF documents with ease. Fast, free online tools to merge PDFs, split pages, rotate documents, and delete pages. 100% private, browser-side processing.",
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
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

export default function PDFToolsHub() {
  const breadcrumbItems = [{ label: "PDF Tools", href: PATH }];

  return (
    <div className="container mx-auto px-4 py-2 max-w-5xl">
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
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {TITLE}
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        Professional-grade PDF management tools that respect your privacy. All processing happens 100% on your device—your sensitive documents never touch our servers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

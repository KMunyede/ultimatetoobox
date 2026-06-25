import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader, AuthorBio, DidYouKnow, PrivacyBadge, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { MergePDFClient } from "../../../components/pdf/MergePDFClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Merge PDF Files";
const TOOL_DESC = "Combine multiple PDF documents into one instantly. Secure, browser-side merging with drag-to-reorder functionality. No uploads required.";
const PATH = "/pdf-tools/merge-pdf";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    }
  };
}

const faqs = [
  {
    question: "Is merging PDFs online secure on this site?",
    answer: "Yes, our tool is 100% secure because all merging happens locally in your web browser. Your PDF files are never uploaded to our servers or stored anywhere online. This 'Zero-Server' approach ensures your sensitive data remains entirely on your device.",
  },
  {
    question: "Is there a limit to the number of files I can merge?",
    answer: "There is no hard limit on the number of files, but performance depends on your device's memory. For most users, merging 20-50 documents works smoothly. If you have very large files, we recommend merging them in smaller batches.",
  },
  {
    question: "Can I change the order of the files before merging?",
    answer: "Absolutely. Once you upload your files, you can drag and drop the file cards to reorder them exactly how you want them to appear in the final combined PDF. The sequence of merging follows the top-to-bottom visual order.",
  },
  {
    question: "Does merging PDFs affect the internal links or bookmarks?",
    answer: "Our merging engine preserves the internal structure of your PDFs, including text, images, and fonts. However, complex interactive bookmarks may sometimes be flattened depending on the source PDF version.",
  },
  {
    question: "What is the maximum file size supported?",
    answer: "Since processing happens in your browser, the limit is based on your system RAM. Most modern browsers can comfortably handle individual files up to 200MB and combined totals up to 500MB.",
  },
];

const howToSteps = [
  { name: "Add PDF Files", text: "Drag and drop multiple PDF documents into the secure upload area or click to select them from your device." },
  { name: "Arrange Order", text: "Use the visual grid to drag and reorder your files. The order they appear in the grid is how they will be merged." },
  { name: "Trigger Merge", text: "Click the 'Merge PDF' button to begin the client-side combination process." },
  { name: "Secure Download", text: "Once the processing is complete (usually in milliseconds), save your single unified PDF document." },
];

export default function MergePDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Merge PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/merge-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Select Files', description: 'Click or drag PDF files into this area to start.' } },
    { element: '.pdf-merge-btn', popover: { title: '2. Combine', description: 'Click this button to merge your documents once you are happy with the order.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/pdf-tools.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name="How to Merge Multiple PDF Files"
        description="Follow this simple guide to combine your documents into a single PDF without compromising your privacy."
        steps={howToSteps}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Combine multiple documents into a single, organized PDF instantly. Professional-grade merging."
        lastUpdated={lastUpdated}
        tourId="merge_pdf"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <MergePDFClient />

      <PrivacyBadge />

      <DidYouKnow category="pdf" />

      <ToolArticle title="The Importance of Secure PDF Merging">
        <p>
          Managing multiple PDF documents can be a logistical headache, especially when you need to send a single cohesive file for employment applications, mortgage reports, or legal documentation. While many online services offer merging, they typically require you to upload your sensitive data to their cloud infrastructure, posing a significant privacy risk.
        </p>

        <h3>Privacy-First Local Merging</h3>
        <p>
          Our <strong>Merge PDF Files</strong> tool is built on the industry-standard <code>pdf-lib</code> engine. Unlike other sites, we perform all calculations directly inside your browser&apos;s isolated memory. This means your private information&mdash;bank statements, medical records, contracts, or personal IDs&mdash;never leaves your machine. This architectural choice eliminates the risk of data breaches on our end because we never see your data.
        </p>

        <h3>Why Standardize Your Documents?</h3>
        <p>
          A single, unified PDF is much more professional than sending five separate attachments. Recipient fatigue is a real issue in modern business; by merging your related files, you ensure that your information is read in the correct sequence and that no critical pages are missed in a crowded inbox.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Upload Documents</strong> - Drag and drop multiple PDF files into the secure browser-side dropzone. You can also click to browse your local file explorer.</li>
          <li><strong>Step 2: Reorder Files</strong> - Accuracy is key. Use the visual grab handles to arrange your documents in the exact order you want them merged.</li>
          <li><strong>Step 3: Combine &amp; Save</strong> - Click the merge button. Our engine will weave the documents together in milliseconds, after which you can save the resulting file directly to your desktop or mobile device.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "Adobe - PDF Specification (ISO 32000)", url: "https://www.iso.org/standard/75839.html" },
            { name: "PDF Association - Merging Best Practices", url: "https://www.pdfa.org/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}

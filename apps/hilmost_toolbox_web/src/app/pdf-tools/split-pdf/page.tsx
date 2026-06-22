import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader, AuthorBio, DidYouKnow, PrivacyBadge, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { SplitPDFClient } from "../../../components/pdf/SplitPDFClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Split PDF Pages";
const TOOL_DESC = "Extract specific pages or ranges from your PDF document instantly. Secure, browser-side splitting with visual page selection. No data uploads.";
const PATH = "/pdf-tools/split-pdf";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Split PDF Files — Extract Pages Free Online | Hilmost Toolbox";
  const description = "Split your PDF documents into separate files or extract specific pages instantly. Free online tool with visual page selection. 100% private and secure.";
  const canonical = getCanonicalUrl(PATH);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: ["/og/pdf-tools.png"],
    },
  };
}

const faqs = [
  {
    question: "How do I extract a single page from a PDF?",
    answer: "After uploading your file, switch to the 'Select Pages' mode. Simply click on the thumbnail of the specific page you want to keep. Once selected, hit 'Split and Download'. Our engine will create a new PDF containing only that single page.",
  },
  {
    question: "What format should I use for custom ranges?",
    answer: "Our tool supports standard mathematical ranges. You can use comma-separated values for individual pages and hyphens for spans. For example: '1, 3, 5-10' will extract pages 1, 3, and every page from 5 through 10 into your new document.",
  },
  {
    question: "Can I split a PDF into individual pages automatically?",
    answer: "Yes. By selecting the 'Split into individual pages' option (coming soon) or manually selecting all pages in the visual grid, you can effectively break a document down into its component parts.",
  },
  {
    question: "Is there a limit to how many pages I can split?",
    answer: "There is no software limit on page count. However, since the splitting happens in your browser's RAM, very large documents (1000+ pages) may require a few seconds of processing time depending on your device's power.",
  },
  {
    question: "Does splitting a PDF reduce its quality?",
    answer: "Not at all. We utilize 'lossless' splitting logic which preserves the original vector paths, high-resolution images, and embedded fonts exactly as they were in the parent document.",
  },
];

const howToSteps = [
  { name: "Upload Document", text: "Drag and drop your large PDF file into the secure workspace." },
  { name: "Choose Extraction Mode", text: "Select between 'Visual Selection' (clicking thumbnails) or 'Custom Range' (typing page numbers)." },
  { name: "Verify Selection", text: "Ensure the correct pages are highlighted or listed in the range field to avoid data loss." },
  { name: "Instant Extract", text: "Click 'Split PDF' to generate your new documents locally and save them to your machine." },
];

export default function SplitPDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Split PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/split-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Upload', description: 'Drag and drop your PDF file here.' } },
    { element: '.pdf-split-options', popover: { title: '2. Select Mode', description: 'Choose between selecting specific pages visually or entering a range.' } },
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
        name="How to Split and Extract PDF Pages"
        description="A professional guide to isolating specific content from large PDF documents using our secure client-side tool."
        steps={howToSteps}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Break down large documents or extract exactly what you need. Fast, visual, and completely private."
        lastUpdated={lastUpdated}
        tourId="split_pdf"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <SplitPDFClient />

      <PrivacyBadge />

      <DidYouKnow category="pdf" />

      <ToolArticle title="Mastering Professional PDF Extraction">
        <p>
          In a world where digital documents are the primary currency of business, the ability to surgically extract information is a vital skill. Often, you only need a specific section of a massive 100-page annual report or a single signed page from a scanned multi-page contract. Our <strong>Split PDF Pages</strong> tool is designed to provide this functionality with zero friction and total security.
        </p>

        <h3>Visual Selection vs. Custom Ranges</h3>
        <p>
          We provide two distinct methods for document deconstruction to suit every user need:
        </p>
        <ul>
          <li><strong>Visual Thumbnail Selection:</strong> Best for smaller documents. Our tool renders high-fidelity previews of every page, allowing you to simply point and click on the content you want to keep. This is perfect for verifying you have the right page before clicking download.</li>
          <li><strong>Advanced Range Input:</strong> Optimized for high-volume tasks. If you need to extract &quot;Pages 1, 5, and 20 through 45,&quot; typing <code>1, 5, 20-45</code> is much faster than manual selection. Our parser handles complex notation instantly.</li>
        </ul>

        <h3>The Logic of Browser-Side Processing</h3>
        <p>
          Standard PDF tools require you to wait for an upload, wait for a server to process, and then wait for a download. This not only wastes bandwidth but exposes your data to third-party servers. Our engine performs <strong>Client-Side Splitting</strong>. By using the <code>pdf-lib</code> JavaScript library, we manipulate the document structure directly within your browser&apos;s sandbox. This ensures that your private files never touch a server, making it the most secure way to handle sensitive legal or financial paperwork.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select PDF File</strong> - Drag your document into the secure workspace. Your browser immediately initializes the PDF structure for manipulation.</li>
          <li><strong>Step 2: Define your output</strong> - Use the mode toggle to choose your preferred selection method. Highlight the pages that are relevant to your needs.</li>
          <li><strong>Step 3: Extract and Save</strong> - Click the download button. A new PDF is generated in your system memory and handed back to you instantly, preserving all original document quality.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "PDF Association - Document Splitting Standards", url: "https://www.pdfa.org/" },
            { name: "Mozilla - PDF.js Documentation", url: "https://mozilla.github.io/pdf.js/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}

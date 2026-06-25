import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader, AuthorBio, DidYouKnow, PrivacyBadge, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { DeletePagesClient } from "../../../components/pdf/DeletePagesClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Delete PDF Pages";
const TOOL_DESC = "Remove unwanted pages from your PDF document instantly. Secure, browser-side deletion with visual page selection. 100% private.";
const PATH = "/pdf-tools/delete-pages";
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
    question: "How do I remove a specific page from a PDF?",
    answer: "Upload your document, click on the thumbnails of the pages you want to remove (they will be highlighted and faded to indicate deletion), then click 'Delete Selected & Download'. A new PDF will be generated without those specific pages.",
  },
  {
    question: "Can I delete multiple non-consecutive pages at once?",
    answer: "Yes. Our tool allows you to select as many pages as you like across the entire document, regardless of their position. You can select page 1, 5, and 10, and they will all be removed in a single operation.",
  },
  {
    question: "What happens to the page numbering after deletion?",
    answer: "The resulting PDF will be re-paginated automatically. For example, if you delete page 2 of a 5-page document, the original page 3 becomes the new page 2. This ensures a continuous and professional document structure for the recipient.",
  },
  {
    question: "Is it possible to recover a deleted page?",
    answer: "Once the new PDF is generated and downloaded, the pages are permanently removed from that file. However, your original source file remains unchanged on your computer, so you can always re-upload it if you make a mistake.",
  },
  {
    question: "Are my documents secure while using this tool?",
    answer: "Absolutely. We prioritize Zero-Server privacy. The deletion logic runs entirely in your browser's memory using client-side JavaScript. Your sensitive documents are never uploaded to any external server.",
  },
];

const howToSteps = [
  { name: "Import PDF", text: "Drag and drop the document you want to clean up into the secure browser-side workspace." },
  { name: "Select for Removal", text: "Click on the thumbnails of the pages you wish to discard. They will be visually highlighted for your review." },
  { name: "Confirm Selection", text: "Double-check the thumbnails to ensure you haven't accidentally marked important content for deletion." },
  { name: "Save Clean Version", text: "Click the 'Delete Pages' button to generate and download your streamlined PDF instantly." },
];

export default function DeletePagesPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Delete Pages", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/delete-pages/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Upload', description: 'Select the PDF you want to clean up.' } },
    { element: '.pdf-page-grid', popover: { title: '2. Select to Discard', description: 'Click the pages you want to remove from the document.' } },
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
        name="How to Remove Pages from a PDF"
        description="A simple, visual guide to cleaning up your PDF documents by removing unwanted pages safely and privately."
        steps={howToSteps}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Clean up your documents by removing irrelevant or sensitive pages. Fast, secure, and completely visual."
        lastUpdated={lastUpdated}
        tourId="delete_pages"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <DeletePagesClient />

      <PrivacyBadge />

      <DidYouKnow category="pdf" />

      <ToolArticle title="Streamline and Secure Your PDF Documents">
        <p>
          Sometimes a PDF contains more information than you need to share, or a scan results in unnecessary blank pages that look unprofessional. Manually editing these files often requires expensive software or monthly subscriptions, but our <strong>Delete PDF Pages</strong> tool makes it a simple, free, and secure three-step process.
        </p>

        <h3>Visual Selection for Maximum Accuracy</h3>
        <p>
          Deleting pages by page number alone (e.g., &quot;Delete page 45&quot;) can be risky if you miscount or if the document has complex sections. Our tool eliminates this guesswork by rendering every page as a high-quality thumbnail. This allows you to visually confirm exactly which content is being removed. Once you click a page, it is visually de-emphasized, giving you a clear &quot;print preview&quot; of the final document before you commit to the change.
        </p>

        <h3>Zero-Server Deletion Technology</h3>
        <p>
          When you delete pages from a sensitive document&mdash;like a legal contract or a medical record&mdash;you shouldn&apos;t have to worry about where that data is going. Our engine utilizes <strong>Client-Side Processing</strong> via the <code>pdf-lib</code> and <code>pdf.js</code> libraries. The entire deletion process happens within your browser&apos;s sandbox. This means your files never leave your computer, and we have zero access to your information. It&apos;s privacy by design, not just by promise.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Import Document</strong> - Drag the PDF you want to clean up into the visual workspace. Your browser will instantly generate the necessary thumbnails for editing.</li>
          <li><strong>Step 2: Pick Pages to Discard</strong> - Click on the thumbnails of the pages you wish to discard. You can select multiple non-consecutive pages at once.</li>
          <li><strong>Step 3: Generate Clean PDF</strong> - Click the download button. A new, streamlined PDF is generated in your system memory and saved to your device immediately.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "Adobe - PDF Document Security and Redaction", url: "https://www.adobe.com/acrobat/resources/pdf-redaction.html" },
            { name: "Mozilla - PDF.js Project Documentation", url: "https://mozilla.github.io/pdf.js/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}

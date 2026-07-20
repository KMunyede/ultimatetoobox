import { WebApplicationSchema, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, ToolArticle, RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GpaCalculatorTool } from "./GpaCalculatorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Free GPA Calculator";
const TOOL_DESC = "Calculate your semester and cumulative GPA using letter grades, percentages, or 4.0 scale. Our free tool supports weighted 4.0 and 5.0 scales for high school and university students.";
const PATH = "/education/gpa-calculator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

const faqs = [
  {
    question: "What is a good GPA?",
    answer: "A 'good' GPA depends on your academic goals and institution. Generally, a 3.0 (B average) is considered good, while a 3.5 or higher is often required for top-tier graduate programs and honors societies."
  },
  {
    question: "How is GPA calculated?",
    answer: "GPA is calculated by dividing the total number of grade points earned by the total number of credit hours attempted. Grade points are determined by multiplying the course's credit value by the numerical value of the grade received (e.g., an 'A' in a 3-credit course equals 12 grade points on a 4.0 scale)."
  },
  {
    question: "What is the difference between 4.0 and 5.0 weighted GPA?",
    answer: "A standard 4.0 scale treats all classes equally. A weighted 5.0 scale gives extra points for advanced classes like AP, IB, or Honors courses, recognizing the increased difficulty of the workload."
  },
  {
    question: "How do I calculate cumulative GPA?",
    answer: "To calculate cumulative GPA, you add all the grade points earned across all semesters and divide that sum by the total number of credit hours attempted since you started your degree."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(`${TOOL_NAME} — Semester & Cumulative | Hilmost`);
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
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/education.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/education.png"],
    }
  };
}

export default function GpaCalculatorPage() {
  const breadcrumbItems = [
    { label: "Education", href: "/education" },
    { label: "GPA Calculator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/education/gpa-calculator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#scale-toggle', popover: { title: '1. Choose Scale', description: 'Switch between standard 4.0 and weighted 5.0 scales.' } },
    { element: '#input-mode', popover: { title: '2. Input Mode', description: 'Enter grades as letters, percentages, or raw points.' } },
    { element: '#semester-section', popover: { title: '3. Add Courses', description: 'List your courses and credits for the current semester.' } },
    { element: '#cumulative-section', popover: { title: '4. Cumulative GPA', description: 'Combine your current semester with prior academic results.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Academic Performance Lab"
        subtitle="Precision academic tracking. Calculate semester and cumulative GPA with standard or weighted scales instantly."
        lastUpdated={lastUpdated}
        tourId="gpa_calculator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <GpaCalculatorTool />

      <div className="max-w-4xl mx-auto my-6 space-y-6">
        <ToolArticle title="The Science of GPA: Tracking Academic Success">
          <p>
            Navigating academic success requires precise planning. Our <strong>Academic Performance Lab</strong> is designed to provide students with a professional-grade environment to track their Grade Point Average. Whether you need to calculate your semester GPA for honors eligibility or your cumulative average for graduation, our tool handles the complex mathematics for you.
          </p>

          <h3>Flexible Scales: Standard vs. Weighted</h3>
          <p>
            Accuracy in tracking depends on using the correct scale. This laboratory supports standard <strong>4.0 scales</strong> as well as <strong>weighted 5.0 scales</strong> often used in advanced placement (AP) and honors programs. extra points for advanced classes recognize the increased difficulty of the workload.
          </p>

          <h3>Multiple Input Methods</h3>
          <p>
            Every institution is different. You can choose to enter your results via <strong>Letter Grades</strong>, <strong>Percentages</strong>, or raw <strong>Grade Points</strong>. Our engine instantly synchronizes these values across all formats, ensuring that your calculation is both accurate and reflective of your specific grading system.
          </p>

          <h3>Private and Secure</h3>
          <p>
            Your academic records are private. Following the Hilmost monorepo standards, this tool uses a <strong>Zero-Server Architecture</strong>. All calculations happen entirely in your browser&apos;s memory. Your data is never transmitted to or stored on our servers, ensuring 100% privacy for your academic journey.
          </p>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl not-prose">
            <h4 className="text-lg font-black text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-tight">Deeper Dive</h4>
            <p className="text-blue-800 dark:text-blue-300 mb-4 font-medium">Want to master your academic standing?</p>
            <Link href="/guides/how-gpa-is-calculated" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary hover:underline">
              Read our full GPA Calculation Guide <ArrowRight size={14} />
            </Link>
          </div>
        </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="education" currentPath={PATH} />
      </div>
    </div>
  );
}

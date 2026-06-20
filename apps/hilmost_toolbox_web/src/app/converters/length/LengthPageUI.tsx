import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { LengthConverterClient } from "./LengthConverterClient";
import { ShareButton } from "@/components/ShareButton";

export function LengthPageUI({
  defaultUnit1 = "meters",
  defaultUnit2 = "feet",
  title = "Length & Distance Converter",
  description = "Bridge the gap between Metric and Imperial systems. Convert any distance measurement instantly.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/length",
  lastUpdated
}: {
  defaultUnit1?: string;
  defaultUnit2?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Length", href: "/converters/length" },
  ];

  const faqs = [
    {
      question: "What is the difference between Metric and Imperial systems?",
      answer: "The Metric system (meters, kilometers) is a base-10 system used by 95% of the world. The Imperial system (feet, inches, miles) is used primarily in the United States, Liberia, and Myanmar.",
    },
    {
      question: "How many feet are in a meter?",
      answer: "There are approximately 3.28084 feet in a single meter. Alternatively, one foot is exactly 0.3048 meters.",
    },
    {
      question: "How do I convert kilometers to miles?",
      answer: "To manually convert kilometers to miles, multiply the kilometers by 0.621371. To convert miles to kilometers, multiply the miles by 1.60934.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Enter Value', description: 'Type the number you want to convert.' } },
    { element: 'select', popover: { title: '2. Change Units', description: 'Switch between Metric and Imperial systems instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-5xl">
      <WebApplicationSchema
        name={`${title} | Hilmost`}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' — ')[0]}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="length_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <LengthConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
      </div>

      <ToolArticle title="Mastering Measurement Conversions">
        <p>
          Whether you are an architect reading foreign blueprints, a runner tracking your 5K race pace, or just trying to buy furniture that actually fits in your room, converting length measurements is an unavoidable daily task.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}

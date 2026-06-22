import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, HowToSchema, SourceReference, AuthorBio, DidYouKnow, PrivacyBadge } from "@utilitiessite/ui";
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
      answer: "The Metric system (meters, kilometers) is a base-10 system used by 95% of the world's population and is the standard for science and international trade. The Imperial system (feet, inches, miles) is used primarily in the United States, Liberia, and Myanmar for everyday measurements.",
    },
    {
      question: "How many feet are in a meter?",
      answer: "There are exactly 3.280839895 feet in a single meter. Conversely, one foot is defined as exactly 0.3048 meters. Our converter uses these high-precision constants to ensure your measurements are accurate for professional use.",
    },
    {
      question: "How do I convert kilometers to miles?",
      answer: "To manually convert kilometers to miles, multiply the kilometer value by 0.621371. To convert miles back to kilometers, multiply the miles by 1.60934. Our tool automates this process to six decimal places of precision.",
    },
    {
      question: "Is this converter suitable for architectural blueprints?",
      answer: "Yes. Because we utilize the standard international definitions for the meter and the inch, the results are suitable for architectural scaling, engineering, and construction planning.",
    },
    {
      question: "What is a 'Nautical Mile'?",
      answer: "A nautical mile is based on the circumference of the Earth and is equal to one minute of latitude. It is approximately 1,852 meters, slightly longer than a standard 'statute' mile (1,609 meters).",
    },
  ];

  const howToSteps = [
    { name: "Input Value", text: "Type the numerical distance or length you wish to convert into the first field." },
    { name: "Choose Base Unit", text: "Select your starting unit (e.g., Meters, Miles, or Inches) from the first dropdown menu." },
    { name: "Select Target Unit", text: "Choose the unit you want to convert to. The conversion happens instantly as you type." },
    { name: "Verify Result", text: "Review the high-precision output and use the quick summary at the bottom for human-readable context." },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Enter Value', description: 'Type the number you want to convert.' } },
    { element: 'select', popover: { title: '2. Change Units', description: 'Switch between Metric and Imperial systems instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${title} | Hilmost`}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Convert Length & Distance`}
        description="A professional guide to switching between metric and imperial length measurements with high precision."
        steps={howToSteps}
      />
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

      <PrivacyBadge />

      <DidYouKnow category="calculators" />

      <ToolArticle title="Mastering Global Measurement Standards">
        <p>
          Whether you are an architect reading foreign blueprints, a runner tracking your 5K race pace, or just trying to buy furniture that actually fits in your room, converting length measurements is an unavoidable daily task. In the global economy, the ability to transition seamlessly between the <strong>International System of Units (SI)</strong> and the <strong>United States Customary System</strong> is essential for professional accuracy.
        </p>
        
        <h3>The Metric vs. Imperial Divide</h3>
        <p>
          The Metric system, developed during the French Revolution, was designed to be universal and logic-based (base-10). In contrast, the Imperial system is based on historical, human-scale measurements like the length of a foot or the width of a thumb (an inch). Today, while the world has largely moved to Metric, the Imperial system remains dominant in key industries like aerospace, construction in North America, and screen-size manufacturing.
        </p>

        <h3>The Science of the Standard Meter</h3>
        <p>
          Did you know that a &quot;meter&quot; is no longer defined by a physical metal bar? Since 1983, the meter has been defined by the distance light travels in a vacuum in 1/299,792,458 of a second. Our <strong>Length &amp; Distance Converter</strong> uses these fundamental scientific constants to ensure that your conversions&mdash;from millimeters to miles&mdash;meet the highest mathematical standards.
        </p>
        
        <h3>How to Use This Tool for Professional Work</h3>
        <p>
          We have engineered this interface for speed and bidirectional logic. You can type in either field to get an immediate result in the other.
        </p>
        <ol>
          <li><strong>Step 1: Enter Value</strong> - Type the distance measurement into the starting field. Our engine handles large decimals and scientific notation.</li>
          <li><strong>Step 2: Select Unit Type</strong> - Bridge the gap between systems by choosing your desired units. We support everything from microscopic millimeters to transcontinental kilometers.</li>
          <li><strong>Step 3: High-Precision Review</strong> - Instantly see the conversion. We provide up to six decimal places of precision, which is critical for engineering and scientific applications.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "NIST - Length Units (Meter)", url: "https://www.nist.gov/pml/owm/si-units-length" },
            { name: "BIPM - The International System of Units (SI)", url: "https://www.bipm.org/en/measurement-units/" },
            { name: "IEEE - Standards for Engineering Units", url: "https://standards.ieee.org/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}

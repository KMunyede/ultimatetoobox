import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, HowToSchema, SourceReference, AuthorBio, DidYouKnow, PrivacyBadge } from "@utilitiessite/ui";
import { WeightConverterClient } from "./WeightConverterClient";
import { ShareButton } from "@/components/ShareButton";

export function WeightMassPageUI({
  defaultUnit1 = "kilograms",
  defaultUnit2 = "pounds",
  title = "Weight & Mass Converter",
  description = "Drop the heavy math. Effortlessly calculate metric and imperial weight units without the guesswork.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/weight-mass",
  lastUpdated,
  breadcrumbItems: customBreadcrumbItems
}: {
  defaultUnit1?: string;
  defaultUnit2?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
  breadcrumbItems?: { label: string; href: string }[];
}) {
  const defaultBreadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Weight & Mass", href: "/converters/weight-mass" },
  ];

  const breadcrumbItems = customBreadcrumbItems || defaultBreadcrumbItems;

  const faqs = [
    {
      question: "How many pounds are in a kilogram?",
      answer: "There are approximately 2.20462262 pounds in a single kilogram. For a quick mental estimate, you can multiply the kilogram value by 2 and add 10%. Our tool provides the calculation to six decimal places for professional precision.",
    },
    {
      question: "What is the difference between weight and mass?",
      answer: "Mass is an intrinsic property of an object and does not change regardless of location. Weight is a measure of the gravitational force acting on that mass. While your mass would be the same on the Moon, your weight would be significantly less due to weaker gravity.",
    },
    {
      question: "What is a 'Stone' (st) in weight measurement?",
      answer: "A stone is an English and imperial unit of mass equal to 14 pounds (approximately 6.35 kg). It is still commonly used in the United Kingdom, Ireland, and some Commonwealth countries to express human body weight.",
    },
    {
      question: "How do I convert grams to ounces?",
      answer: "One ounce (avoirdupois) is approximately 28.3495 grams. To convert grams to ounces, divide the gram value by 28.35. Our converter automates this for you instantly.",
    },
    {
      question: "Is this tool suitable for medical or pharmaceutical use?",
      answer: "While we utilize high-precision 64-bit mathematical models, this tool is for informational and educational purposes. For critical medical dosages, always utilize certified clinical equipment and professional verification.",
    },
  ];

  const howToSteps = [
    { name: "Enter Quantity", text: "Type the numerical mass or weight value into either input field." },
    { name: "Select Starting Unit", text: "Choose your base unit (e.g., Kilograms, Pounds, or Ounces) from the first dropdown menu." },
    { name: "Choose Target Unit", text: "Select the unit you want to convert to. The result is calculated in real-time." },
    { name: "Review Conversion", text: "Review the precision result and the plain-English summary provided at the bottom of the tool." },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Weight', description: 'Enter the value you wish to convert.' } },
    { element: 'select', popover: { title: '2. Select Unit', description: 'Choose from global standards like kg, lbs, or stones.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema name={title + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <HowToSchema
        name="How to Convert Weight & Mass Units"
        description="A comprehensive guide to translating mass measurements between metric and imperial standards with surgical precision."
        steps={howToSteps}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="weight_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <WeightConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
      </div>

      <PrivacyBadge />

      <DidYouKnow category="health" />

      <ToolArticle title="The Heavy Lifting of Global Measurement">
        <p>
          Whether you are tracking your fitness progress, following a foreign baking recipe, or calculating freight costs for an international shipment, weight conversion is a mandatory skill in the modern era. Because different regions utilize fundamentally different systems&mdash;the <strong>Metric system</strong> (grams, kilograms) and the <strong>Imperial system</strong> (ounces, pounds, stones)&mdash;accuracy is paramount to avoid costly errors.
        </p>

        <h3>Mass vs. Weight: A Scientific Distinction</h3>
        <p>
          In everyday language, we often use &quot;mass&quot; and &quot;weight&quot; interchangeably, but in physics, they are distinct. Mass is the amount of matter in an object, while weight is the force exerted on that mass by gravity. Our <strong>Weight &amp; Mass Converter</strong> primarily focuses on the standardized mass units used in commerce and science, ensuring that a kilogram in Paris is the same as a kilogram in New York.
        </p>

        <h3>How to Use This Tool for Precision Tasks</h3>
        <p>
          We have engineered this interface for high-performance use cases where accuracy cannot be compromised.
        </p>
        <ol>
          <li><strong>Step 1: Enter Mass</strong> - Input the numeric value into the primary field. Our system handles massive numbers for industrial logistics and tiny decimals for culinary use.</li>
          <li><strong>Step 2: Select Standard</strong> - Bridge the gap between Metric and Imperial by picking your desired units. We support everything from milligrams to metric tons.</li>
          <li><strong>Step 3: Instant Calculation</strong> - The result is displayed instantly as you type. We utilize 64-bit precision to minimize the rounding errors often found in standard hardware calculators.</li>
        </ol>

        <h3>Common Conversions and Standards</h3>
        <p>
          The world relies on the <strong>International System of Units (SI)</strong> for scientific research. However, the <code>Avoirdupois</code> system remains the standard for trade in the US and UK. Our tool simplifies this by providing a unified workspace for both, ensuring your data is always compatible with international standards.
        </p>

        <SourceReference
          sources={[
            { name: "NIST - Mass and Weight Units", url: "https://www.nist.gov/pml/owm/si-units-mass" },
            { name: "BIPM - The Definition of the Kilogram", url: "https://www.bipm.org/en/measurement-units/base-units/kilogram" },
            { name: "UK Government - Units of Measurement", url: "https://www.gov.uk/weights-measures-and-packaging-the-law" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}

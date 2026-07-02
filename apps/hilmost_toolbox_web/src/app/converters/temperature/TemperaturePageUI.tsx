import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader, HowToSchema, SourceReference, AuthorBio, DidYouKnow, PrivacyBadge } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { TemperatureConverterClient } from "./TemperatureConverterClient";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Temperature Converter";
const TOOL_DESC = "Convert seamlessly between Celsius, Fahrenheit, and Kelvin in real-time — no signup required.";
const PATH = "/converters/temperature";

export function TemperaturePageUI({
  defaultUnit1 = "celsius",
  defaultUnit2 = "fahrenheit",
  title = TOOL_NAME,
  description = "Effortlessly switch between global weather scales. Instant conversions for Celsius, Fahrenheit, and Kelvin.",
  canonicalUrl = getCanonicalUrl(PATH),
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
    { label: "Temperature", href: PATH },
  ];

  const breadcrumbItems = customBreadcrumbItems || defaultBreadcrumbItems;

  const faqs = [
    {
      question: "How do you convert Celsius to Fahrenheit manually?",
      answer: "The exact formula is: (Celsius × 9/5) + 32. For a quick mental estimate, you can multiply the Celsius temperature by 2 and add 30. For example, 20°C becomes approximately (20×2)+30 = 70°F (actual value is 68°F).",
    },
    {
      question: "What is Absolute Zero?",
      answer: "Absolute zero is the theoretical temperature at which all molecular motion stops. It is defined as exactly 0 Kelvin, which corresponds to -273.15° Celsius or -459.67° Fahrenheit.",
    },
    {
      question: "At what temperature are Celsius and Fahrenheit the same?",
      answer: "Celsius and Fahrenheit scales intersect at exactly -40°. Therefore, -40°C is perfectly equal to -40°F. This is the only point on the scales where the numerical value is identical.",
    },
    {
      question: "Why does the Kelvin scale not use degrees?",
      answer: "Kelvin is an absolute scale, not a relative one. Unlike Celsius and Fahrenheit, where '0' is an arbitrary point (like the freezing point of water), Kelvin starts at the absolute minimum energy state. Therefore, it is referred to as 'Kelvins' rather than 'degrees Kelvin.'",
    },
    {
      question: "How do I convert Fahrenheit to Celsius?",
      answer: "To convert Fahrenheit to Celsius, use the formula: (Fahrenheit - 32) × 5/9. For example, if it is 100°F outside: (100-32) × 5/9 ≈ 37.7°C.",
    },
  ];

  const howToSteps = [
    { name: "Enter Reading", text: "Type the numeric temperature value into either input field." },
    { name: "Set Starting Scale", text: "Select your original scale (e.g., Celsius or Kelvin) using the dropdown menu." },
    { name: "Choose Target Scale", text: "Select the unit you wish to translate into. The conversion updates in real-time." },
    { name: "Review Precision", text: "See the exact conversion result and use the summary text for a plain-English explanation." },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Temperature', description: 'Enter the numeric value you want to scale.' } },
    { element: 'select', popover: { title: '2. Select Scale', description: 'Switch between weather-standard or scientific units.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <HowToSchema
        name="How to Convert Between Temperature Scales"
        description="A technical guide to translating thermal measurements across weather, laboratory, and scientific standards."
        steps={howToSteps}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="temperature_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <TemperatureConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
      </div>

      <PrivacyBadge />

      <DidYouKnow category="health" />

      <ToolArticle title="The Science of Thermal Measurement">
        <p>
          Whether you are traveling internationally, following a foreign recipe, or studying physics, dealing with multiple temperature scales can be incredibly frustrating. Unlike length or weight, temperature scales do not share a common &quot;zero&quot; point, meaning you cannot use simple multiplication to convert them. Our <strong>Temperature Converter</strong> is designed to handle these non-linear transformations with scientific accuracy.
        </p>
        
        <h3>Understanding the Three Primary Scales</h3>
        <p>
          To use this tool effectively, it helps to understand why these scales exist and where they are used:
        </p>
        <ul>
          <li><strong>Celsius (&deg;C):</strong> The global standard for weather and water-based science. It defines 0&deg; as the freezing point and 100&deg; as the boiling point of water at sea level.</li>
          <li><strong>Fahrenheit (&deg;F):</strong> Primarily used in the United States and a few Caribbean nations. It offers a higher resolution for human-perceived weather temperatures.</li>
          <li><strong>Kelvin (K):</strong> The absolute scale used by scientists and engineers. It starts at absolute zero, the point where all thermal motion ceases, and does not use negative numbers.</li>
        </ul>

        <h3>The Challenges of non-linear conversion</h3>
        <p>
          Converting between these scales requires adjusting for both the &quot;starting point&quot; (offset) and the &quot;size&quot; of each unit (increment). For example, a 1-degree change in Celsius is equal to a 1.8-degree change in Fahrenheit. Our engine utilizes 64-bit floating-point math to ensure that when you convert <code>98.6&deg;F</code>, you get exactly <code>37&deg;C</code>, ensuring your medical or culinary data remains precise.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Input Reading</strong> - Enter the temperature value you want to translate. Our interface supports bidirectional input; typing in either field updates the other instantly.</li>
          <li><strong>Step 2: Select Scale</strong> - Switch between Celsius, Fahrenheit, and Kelvin. We handle the complex subtraction and multiplication required for Kelvin-to-Fahrenheit conversions automatically.</li>
          <li><strong>Step 3: View Equivalent</strong> - The result is displayed instantly. We provide high-precision decimals, which are essential for laboratory work and specific industrial processes.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "NIST - Temperature Units (Kelvin)", url: "https://www.nist.gov/pml/owm/si-units-temperature" },
            { name: "Encyclopedia Britannica - Temperature Scales", url: "https://www.britannica.com/science/temperature" },
            { name: "NOAA - Weather Conversion Tables", url: "https://www.wpc.ncep.noaa.gov/html/tempconv.shtml" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}

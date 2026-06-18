import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { AstrophysicsClient } from "./AstrophysicsClient";

export function AstrophysicsPageUI({
  defaultTab = "escape",
  title = "Astrophysics Calculator | Explore the Cosmos Instantly",
  description = "Free online astrophysics calculator. Explore the cosmos from your browser by calculating escape velocities, orbital speeds, and Schwarzschild radii instantly.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/calculators/astrophysics"
}: {
  defaultTab?: "escape" | "schwarzschild" | "orbital",
  title?: string,
  description?: string,
  canonicalUrl?: string
}) {
  const faqs = [
    {
      question: "What is the Schwarzschild Radius?",
      answer: "The Schwarzschild Radius is the physical radius to which a mass must be compressed to become a black hole. At this radius, the escape velocity equals the speed of light, meaning nothing, not even light, can escape its gravitational pull.",
    },
    {
      question: "Can I use scientific notation for inputs?",
      answer: "Yes, you can enter numbers using standard scientific 'e' notation. For example, to enter the mass of the Earth (5.972 × 10^24 kg), simply type 5.972e24 into the input field.",
    },
    {
      question: "Can I share my calculations with students or peers?",
      answer: "Absolutely. The calculator's state syncs directly to the URL. If you calculate the orbital velocity of a hypothetical exoplanet, you can click the share button and send the exact URL to your colleagues for them to review.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} className="text-blue-500">{word}</span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-2xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <AstrophysicsClient defaultTab={defaultTab} />
        </div>
      </Suspense>

      <ToolArticle title="Astrophysics Made Accessible">
        <p>
          Whether you're a science fiction author trying to get your orbital mechanics right, a physics student double-checking a problem set, or an astronomy enthusiast exploring the universe, our Astrophysics Calculator provides instant, accurate answers without requiring you to memorize complex formulas or constants.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Equation</strong> - Choose Escape Velocity, Schwarzschild Radius, or Orbital Speed.</li>
          <li><strong>Step 2: Enter Parameters</strong> - Input the astronomical mass and radius using standard or scientific notation.</li>
          <li><strong>Step 3: Analyze</strong> - Instantly review the precise physical calculation and metric conversions.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}

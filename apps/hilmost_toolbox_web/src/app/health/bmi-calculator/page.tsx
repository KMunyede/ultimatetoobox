import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { BMIClient } from "./BMIClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "BMI Calculator | Free Body Mass Index Check",
  description: "Calculate your exact Body Mass Index (BMI) in seconds. A free, beautifully designed health tool to check your ideal weight category.",
  openGraph: {
    title: "BMI Calculator | Free Body Mass Index Check",
    description: "Instantly reveal your exact Body Mass Index and map out your optimal health trajectory.",
    images: ["/og/health.png"],
  },
};

const faqs = [
  {
    question: "What is a healthy BMI?",
    answer: "A healthy BMI typically falls between 18.5 and 24.9. If your BMI is below 18.5, you may be considered underweight. Above 25 is considered overweight, and above 30 is considered obese.",
  },
  {
    question: "Is BMI an accurate measure of health?",
    answer: "BMI is a useful screening tool, but it is not a direct diagnostic measure of body fatness or overall health. It does not account for muscle mass, bone density, or fat distribution. Athletes may have a high BMI due to muscle weight, not fat.",
  },
  {
    question: "How is BMI calculated?",
    answer: "BMI is calculated by taking your weight in kilograms and dividing it by your height in meters squared (kg/m²). For imperial measurements, the formula is your weight in pounds divided by your height in inches squared, multiplied by 703.",
  },
];

export default function BMIPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema
        name="BMI Calculator | Hilmost Toolbox"
        description="Free online BMI (Body Mass Index) calculator."
        url="https://hilmost-toolbox.hilmost.net/health/bmi-calculator"
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          Calculate Your <span className="text-blue-600 dark:text-blue-400">BMI</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Stop guessing your true physical status. Instantly reveal your exact Body Mass Index and map out your optimal health trajectory.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-2xl w-full"></div>}>
        <BMIClient />
      </Suspense>

      <ToolArticle title="Understanding Your Body Mass Index (BMI)">
        <p>
          Body Mass Index (BMI) is a standardized metric used globally by health professionals to estimate whether a person has a healthy body weight for their height. While it doesn&apos;t measure body fat directly, research has shown that BMI strongly correlates with more direct measures of body fat.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Metrics</strong> - Enter your physical measurements accurately.</li>
          <li><strong>Step 2: Select System</strong> - Toggle between metric or imperial units if required.</li>
          <li><strong>Step 3: View Health Index</strong> - Review your calculated health indicators instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="health" currentPath="/health/bmi-calculator" />
    </div>
  );
}

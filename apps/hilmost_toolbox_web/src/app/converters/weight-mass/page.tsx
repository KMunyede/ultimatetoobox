import { Metadata } from "next";
import { WeightMassPageUI } from "./WeightMassPageUI";

export const metadata: Metadata = {
  title: "Weight & Mass Converter | KG to LBS Instantly",
  description: "Free online weight and mass converter. Instantly convert between kilograms, pounds, grams, ounces, metric tons, and stones.",
};

export default function WeightConverterPage() {
  return <WeightMassPageUI />;
}

import { Metadata } from "next";
import { LengthPageUI } from "./LengthPageUI";

export const metadata: Metadata = {
  title: "Length & Distance Converter | Metric to Imperial",
  description: "Free online length converter. Instantly convert between meters, kilometers, feet, inches, miles, and centimeters.",
};

export default function LengthConverterPage() {
  return <LengthPageUI />;
}

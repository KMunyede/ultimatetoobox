import { Metadata } from "next";
import { AreaPageUI } from "./AreaPageUI";

export const metadata: Metadata = {
  title: "Area Converter | Square Feet, Meters, Acres & More",
  description: "Free, high-precision area converter. Instantly convert between square feet, square meters, acres, hectares, and more for real estate, farming, and construction.",
};

export default function AreaPage() {
  return <AreaPageUI />;
}

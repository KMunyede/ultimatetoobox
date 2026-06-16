import { Metadata } from "next";
import { SalaryConverterPageUI } from "./SalaryConverterPageUI";

export const metadata: Metadata = {
  title: "Salary Converter | Convert Hourly to Annual Pay",
  description: "Free online salary converter. Compare your wages and instantly translate hourly rates into daily, weekly, monthly, and annual salaries.",
};

export default function SalaryConverterPage() {
  return <SalaryConverterPageUI />;
}

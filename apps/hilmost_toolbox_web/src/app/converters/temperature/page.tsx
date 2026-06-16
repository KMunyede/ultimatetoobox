import { Metadata } from "next";
import { TemperaturePageUI } from "./TemperaturePageUI";

export const metadata: Metadata = {
  title: "Temperature Converter | Celsius, Fahrenheit, Kelvin",
  description: "Free online temperature converter. Convert seamlessly between Celsius, Fahrenheit, and Kelvin in real-time.",
};

export default function TemperatureConverterPage() {
  return <TemperaturePageUI />;
}

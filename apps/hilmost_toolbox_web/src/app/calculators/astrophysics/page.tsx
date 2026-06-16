import { Metadata } from "next";
import { AstrophysicsPageUI } from "./AstrophysicsPageUI";

export const metadata: Metadata = {
  title: "Astrophysics Calculator | Explore the Cosmos Instantly",
  description: "Free online astrophysics calculator. Explore the cosmos from your browser by calculating escape velocities, orbital speeds, and Schwarzschild radii instantly.",
};

export default function AstrophysicsPage() {
  return <AstrophysicsPageUI />;
}

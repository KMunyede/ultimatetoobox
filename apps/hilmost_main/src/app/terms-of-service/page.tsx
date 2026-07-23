import { Metadata } from "next";
import { TermsOfServiceContent } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Terms of Service | Hilmost",
  description: "Terms governing your use of Hilmost's free browser-based tools and services.",
};

export default function Page() { return <TermsOfServiceContent />; }

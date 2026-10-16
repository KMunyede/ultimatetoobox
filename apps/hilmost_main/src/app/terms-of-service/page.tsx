import { Metadata } from "next";
import { TermsOfServiceContent } from "@utilitiessite/ui";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta("/terms-of-service", "Terms of Service | Hilmost", "Terms governing your use of Hilmost's free browser-based tools and services."),
  alternates: { canonical: "https://hilmost.net/terms-of-service" },
};

export default function Page() { return <TermsOfServiceContent />; }

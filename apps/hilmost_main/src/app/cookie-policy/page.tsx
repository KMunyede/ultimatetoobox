import { Metadata } from "next";
import { CookiePolicyContent } from "@utilitiessite/ui";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta("/cookie-policy", "Cookie Policy | Hilmost", "How Hilmost uses cookies for preferences, analytics, and advertising."),
  alternates: { canonical: "https://hilmost.net/cookie-policy" },
};

export default function Page() { return <CookiePolicyContent />; }

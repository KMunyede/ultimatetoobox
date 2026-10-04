import { CookiePolicyContent } from "@utilitiessite/ui";
import type { Metadata } from 'next';
import { CORPORATE_URL } from '@/lib/corporate-url';

export const metadata: Metadata = {
  alternates: {
    canonical: `${CORPORATE_URL}/cookie-policy`
  }
};

export default function Page() { return <CookiePolicyContent />; }

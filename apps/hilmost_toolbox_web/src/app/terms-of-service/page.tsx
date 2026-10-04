import { TermsOfServiceContent } from "@utilitiessite/ui";
import type { Metadata } from 'next';
import { CORPORATE_URL } from '@/lib/corporate-url';

export const metadata: Metadata = {
  alternates: {
    canonical: `${CORPORATE_URL}/terms-of-service`
  }
};

export default function Page() { return <TermsOfServiceContent />; }

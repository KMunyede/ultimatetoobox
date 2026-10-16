import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, Header, Footer } from "@utilitiessite/ui";
import "./globals.css";

import { BASE_OPEN_GRAPH } from "@/lib/seo";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hilmost.net'),
  title: "Hilmost | The Digital Workshop. Achievement is One Click Away.",
  description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: "Hilmost | The Digital Workshop",
    description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilmost | The Digital Workshop",
    description: "Hilmost provides powerful, instant web tools and utilities.",
    images: ["https://hilmost.net/og-home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${workSans.variable} ${workSans.className} min-h-full flex flex-col bg-canvas-base text-text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SZH56NFNQP"
          strategy="lazyOnload"
        />
        <Script id="ga4-hilmost" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SZH56NFNQP');
          `}
        </Script>
      </body>
    </html>
  );
}

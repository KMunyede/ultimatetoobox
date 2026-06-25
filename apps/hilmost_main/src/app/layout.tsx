import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, Header, Footer } from "@utilitiessite/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hilmost.net'),
  title: "Hilmost | The Digital Workshop. Achievement is One Click Away.",
  description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
  openGraph: {
    title: "Hilmost | The Digital Workshop",
    description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
    url: "https://hilmost.net",
    siteName: "Hilmost",
    type: "website",
    images: [
      {
        url: "https://hilmost.net/og-home.png",
        width: 1200,
        height: 630,
        alt: "Hilmost | Engineering the Everyday Utility",
      },
    ],
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
      <body className={`${inter.className} min-h-full flex flex-col bg-canvas-base text-text-primary`}>
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

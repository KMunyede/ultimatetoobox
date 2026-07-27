import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, Header, Footer, AdSenseScript, AdLayout, AutoBreadcrumbs } from "@utilitiessite/ui";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hilmost-toolbox.hilmost.net'),
  title: {
    default: "Hilmost Toolbox | Free Online Calculators & Converters",
    template: "%s"
  },
  description: "Free online calculators and converters — fast, accurate, and private. No sign-up, no data collection.",
  openGraph: {
    title: "Hilmost Toolbox | Free Online Calculators & Converters",
    description: "Free online calculators and converters — fast, accurate, and private. No sign-up, no data collection.",
    url: "/",
    siteName: "Hilmost Toolbox",
    type: "website",
    images: [
      {
        url: "https://hilmost-toolbox.hilmost.net/og/main.png",
        width: 1200,
        height: 630,
        alt: "Hilmost Toolbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilmost Toolbox | Free Online Calculators",
    description: "Free online calculators and converters — fast, accurate, and private.",
    images: ["https://hilmost-toolbox.hilmost.net/og/main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${workSans.variable} ${workSans.className} min-h-screen flex flex-col bg-canvas-base text-text-primary antialiased`}>
        <AdSenseScript publisherId="ca-pub-5650522247882745" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header logoSrc="/logo-square.png" logoAlt="Hilmost Toolbox Logo" />
          <main className="flex-1">
            <AdLayout publisherId="ca-pub-5650522247882745">
              {children}
            </AdLayout>
          </main>
          <Footer />
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-637S0R8TMZ"
          strategy="lazyOnload"
        />
        <Script id="ga4-toolbox" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-637S0R8TMZ');
          `}
        </Script>
      </body>
    </html>
  );
}

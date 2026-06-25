import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider, Header, Footer } from "@utilitiessite/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hilmost Software Corporation (HSC) | Corporate",
  description: "Official corporate information for Hilmost Software Corporation (HSC)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-canvas-base text-text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SZH56NFNQP"
          strategy="lazyOnload"
        />
        <Script id="ga4-corporate" strategy="lazyOnload">
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

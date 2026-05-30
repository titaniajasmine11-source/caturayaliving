import type { Metadata } from "next";
import { SiteFooter, SiteHeader, StickyWhatsapp } from "@/components/site-shell";
import { site } from "@/lib/site";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Caturaya Living | Jasa Interior & Aluminium Premium Sidareja Cilacap",
  description:
    "Solusi arsitektural premium untuk interior, exterior, kusen aluminium, kitchen set, plafon, kanopi, pagar, dan home finishing di Sidareja, Cilacap, Jawa Tengah.",
  keywords: [
    "jasa aluminium Sidareja",
    "jasa kitchen set Sidareja",
    "jasa plafon Cilacap",
    "jasa kanopi Sidareja",
    "interior custom Cilacap",
    "kontraktor eksterior Cilacap",
    "pagar minimalis Sidareja",
  ],
  openGraph: {
    title: "Caturaya Living | Jasa Interior & Aluminium Premium Sidareja Cilacap",
    description:
      "Solusi arsitektural premium untuk interior, eksterior, kusen aluminium, kitchen set, plafon, kanopi, pagar, dan home finishing di Sidareja, Cilacap, dan sekitarnya.",
    url: site.url,
    siteName: site.name,
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), Arial, sans-serif" }}>
        <a href="#main-content" className="skip-link">
          Langsung ke konten utama
        </a>
        <SiteHeader />
        <main id="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <SiteFooter />
        <StickyWhatsapp />
      </body>
    </html>
  );
}

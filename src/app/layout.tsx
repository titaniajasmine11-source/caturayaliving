import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Eko Suyanto Workshop | Jasa Interior & Aluminium Premium Sidareja Cilacap",
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
    title: "Eko Suyanto Workshop | Jasa Interior & Aluminium Premium Sidareja Cilacap",
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
    <html lang="id" className={plusJakarta.variable}>
      <body className="font-sans antialiased text-neutral-text bg-accent-light">
        <a href="#main-content" className="skip-link">
          Langsung ke konten utama
        </a>
        <SmoothScroll>
          <SiteShell>
            {children}
          </SiteShell>
        </SmoothScroll>
      </body>
    </html>
  );
}

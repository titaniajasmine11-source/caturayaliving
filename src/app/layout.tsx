import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://caturayaliving.vercel.app"),
  title: "Caturaya Living | Interior & Aluminium Sidareja Cilacap",
  description:
    "Caturaya Living melayani interior, aluminium, kitchen set, plafon, kanopi, partisi, dan home finishing di Sidareja, Cilacap, dan sekitarnya.",
  keywords: [
    "jasa aluminium Sidareja",
    "jasa kitchen set Sidareja",
    "jasa plafon Cilacap",
    "jasa kanopi Sidareja",
    "interior custom Cilacap",
  ],
  openGraph: {
    title: "Caturaya Living | Interior & Aluminium Sidareja Cilacap",
    description:
      "Solusi interior, aluminium, kitchen set, plafon, kanopi, partisi, dan home finishing untuk Sidareja, Cilacap, dan sekitarnya.",
    url: "https://caturayaliving.vercel.app",
    siteName: "Caturaya Living",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import { ContentSearch } from "@/components/content-search";
import { getArticles, getPortfolio, getServices } from "@/lib/cms";
import Link from "next/link";
import { Compass } from "lucide-react";

export const metadata = {
  title: "Cari Layanan & Inspirasi Properti | Caturaya Living",
  description: "Cari layanan kusen aluminium, kitchen set custom, plafon, kanopi, artikel panduan, dan studi kasus proyek di Caturaya Living.",
};

export default async function SearchPage() {
  const [articles, portfolio, services] = await Promise.all([getArticles(), getPortfolio(), getServices()]);
  const items = [
    ...services.map((service) => ({ title: service.title, summary: service.summary, href: `/layanan/${service.slug}`, type: "Layanan" })),
    ...portfolio.map((item) => ({ title: item.title, summary: `${item.category} di ${item.location}`, href: `/portofolio/${item.slug}`, type: "Portofolio" })),
    ...articles.map((article) => ({ title: article.title, summary: article.summary, href: `/artikel/${article.slug}`, type: "Artikel" })),
  ];

  return (
    <main className="bg-accent-light/30 min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Cari Konten</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Pencarian Cepat</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Cari Inspirasi Desain & Layanan
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Temukan dengan cepat referensi pengerjaan kusen aluminium, kitchen set custom, plafon PVC/gypsum, kanopi teras, studi kasus portofolio lapangan, serta panduan arsitektural kami.
          </p>
        </header>

        {/* Search Interactive Box */}
        <section className="mt-8 bg-white border border-border-premium/50 p-6 sm:p-10 rounded-[32px] shadow-premium">
          <ContentSearch items={items} />
        </section>

      </div>
    </main>
  );
}

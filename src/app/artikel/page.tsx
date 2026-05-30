import { getArticles } from "@/lib/cms";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Panduan & Artikel Properti Arsitektural | Caturaya Living",
  description: "Daftar panduan memilih kusen aluminium, kitchen set custom modern, plafon drop ceiling, kanopi teras, dan material properti di Cilacap.",
};

export default async function ArtikelPage() {
  const articles = await getArticles();
  const categories = [...new Set(articles.map((article) => article.category))];

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Artikel Panduan</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Pusat Edukasi & Rekomendasi</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Artikel, Panduan & Edukasi Properti
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Pelajari panduan komprehensif dari tim teknis kami sebelum menentukan pilihan material. Kami membagikan tips tata letak fungsional draf dapur, ketahanan profil kusen aluminium, hingga perencanaan anggaran renovasi ringan.
          </p>
        </header>

        {/* Filter pills */}
        <section className="mt-8">
          <div className="flex flex-wrap gap-2.5 mb-12 border-b border-border-premium/30 pb-6 w-full justify-start">
            <Link 
              href="/artikel" 
              className="px-4 py-2 text-xs font-bold bg-accent text-white rounded-full transition-all cursor-pointer shadow-sm"
            >
              Semua Topik
            </Link>
            {categories.map((category) => (
              <Link 
                href={`/artikel/kategori/${category.toLowerCase().replaceAll(" ", "-")}`} 
                key={category}
                className="px-4 py-2 text-xs font-semibold bg-white border border-border-premium/50 hover:border-accent hover:text-accent rounded-full transition-all cursor-pointer"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {articles.map((article) => (
              <Link 
                className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full p-8 text-left justify-between cursor-pointer" 
                href={`/artikel/${article.slug}`} 
                key={article.slug} 
                aria-label={`Baca panduan: ${article.title}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs bg-accent/10 text-accent font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-xs text-neutral-muted uppercase tracking-widest font-bold">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug mt-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3 bg-accent-light/10 border border-border-premium/20 p-3 rounded-xl mt-1">
                    {article.summary}
                  </p>
                </div>
                
                <span className="text-[13px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-6">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

import { articles as staticArticles } from "@/lib/content";
import { getArticles } from "@/lib/cms";
import { absoluteUrl, site, whatsappUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return staticArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} | Caturaya Living` : "Artikel Caturaya Living",
    description: article?.summary,
    alternates: article ? { canonical: absoluteUrl(`/artikel/${article.slug}`) } : undefined,
    openGraph: article ? {
      title: `${article.title} | Caturaya Living`,
      description: article.summary,
      url: absoluteUrl(`/artikel/${article.slug}`),
    } : undefined,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(`/artikel/${article.slug}`),
  };

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/artikel" className="hover:text-accent">Artikel Panduan</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Detail Artikel</span>
        </nav>

        {/* Center reading layout */}
        <article className="max-w-3xl mx-auto bg-white border border-border-premium/50 rounded-[40px] p-6 sm:p-12 shadow-premium text-left">
          
          <header className="flex flex-col gap-4 border-b border-border-premium/30 pb-8 mb-8">
            <div className="flex justify-between items-center w-full">
              <span className="text-xs bg-accent/10 border border-accent/20 text-accent font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Topik: {article.category}
              </span>
              <span className="text-xs text-neutral-muted uppercase tracking-widest font-bold">
                Waktu Baca: {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-medium text-primary tracking-tight leading-[1.1] mt-2">
              {article.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-muted leading-relaxed italic bg-accent-light/20 border-l-4 border-accent p-4 rounded-r-xl mt-2">
              {article.summary}
            </p>
          </header>

          <div className="flex flex-col gap-8 text-neutral-text">
            {article.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-lg sm:text-xl font-display font-semibold text-primary">
                  {section.heading}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
            
            <section className="flex flex-col gap-3 border-t border-border-premium/30 pt-8 mt-4">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-primary">
                Langkah Selanjutnya
              </h2>
              <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed">
                Kirimkan foto area lokasi, perkiraan ukuran ruangan, dan model inspirasi yang Anda inginkan melalui chat WhatsApp. Tim Caturaya Living akan membantu menganalisis kebutuhan awal, memberikan rekomendasi bahan baku optimal, serta menyusun estimasi anggaran proyek Anda secara transparan.
              </p>
            </section>
          </div>

          <div className="flex flex-wrap gap-4 mt-12 border-t border-border-premium/30 pt-8">
            <a 
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-accent/25"
              href={whatsappUrl(`Halo Caturaya Living, saya baru saja membaca artikel "${article.title}" dan ingin berkonsultasi mengenai topik tersebut untuk proyek rumah saya.`)} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Konsultasi mengenai topik artikel ini via WhatsApp"
            >
              <Phone size={14} />
              <span>Konsultasi Topik Ini</span>
            </a>
            <Link 
              className="text-center py-3.5 px-6 border border-border-premium/65 hover:border-accent hover:text-accent text-neutral-muted hover:bg-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer bg-accent-light/10 font-semibold"
              href="/artikel" 
              aria-label="Kembali ke halaman daftar artikel panduan"
            >
              Semua Artikel
            </Link>
          </div>
          
        </article>
      </div>
    </main>
  );
}

import { articles as staticArticles } from "@/lib/content";
import { getArticles } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ category: string }>;
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export function generateStaticParams() {
  return [...new Set(staticArticles.map((article) => slugify(article.category)))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const title = category.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Panduan ${title} | Eko Suyanto Workshop`,
    description: `Kumpulan artikel panduan teknis dan tips memilih material ${title} dari tim Eko Suyanto Workshop Cilacap.`,
    openGraph: {
      title: `Panduan ${title} | Eko Suyanto Workshop`,
      description: `Kumpulan artikel panduan teknis dan tips memilih material ${title} dari tim Eko Suyanto Workshop Cilacap.`,
    }
  };
}

export default async function ArticleCategoryPage({ params }: Props) {
  const { category } = await params;
  const articles = await getArticles();
  const items = articles.filter((article) => slugify(article.category) === category);

  if (items.length === 0) {
    notFound();
  }

  const categoryName = items[0].category;

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/artikel" className="hover:text-accent">Artikel Panduan</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Kategori: {categoryName}</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Kategori Edukasi Teknis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Artikel Seputar {categoryName}
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Menampilkan seluruh panduan praktis dan artikel tips arsitektural yang masuk dalam kategori <strong>{categoryName}</strong> untuk membantu Anda merancang hunian yang lebih rapi dan kokoh.
          </p>
        </header>

        {/* Grid aggregations listing */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {items.map((article) => (
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

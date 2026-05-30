import { portfolio as staticPortfolio } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Compass, Phone } from "lucide-react";

type Props = {
  params: Promise<{ category: string }>;
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export function generateStaticParams() {
  return [...new Set(staticPortfolio.map((item) => slugify(item.category)))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const title = category.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Portofolio ${title} | Eko Suyanto Workshop`,
    description: `Kumpulan hasil realisasi pengerjaan proyek ${title} di Sidareja, Cilacap, dan sekitarnya oleh Eko Suyanto Workshop.`,
    openGraph: {
      title: `Portofolio ${title} | Eko Suyanto Workshop`,
      description: `Kumpulan hasil realisasi pengerjaan proyek ${title} di Sidareja, Cilacap, dan sekitarnya oleh Eko Suyanto Workshop.`,
    }
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;
  const portfolio = await getPortfolio();
  const items = portfolio.filter((item) => slugify(item.category) === category);

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
          <Link href="/portofolio" className="hover:text-accent">Portofolio</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Kategori: {categoryName}</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Kategori Proyek Realisasi</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Portofolio {categoryName}
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Menampilkan seluruh studi kasus realisasi proyek properti Eko Suyanto Workshop yang masuk dalam kategori <strong>{categoryName}</strong>. Pengerjaan rapi, transparan, dan presisi di area Sidareja, Cilacap.
          </p>
        </header>

        {/* Grid listing */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <article 
                className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full" 
                key={item.title}
              >
                <div className="h-[220px] relative w-full overflow-hidden bg-neutral-100">
                  <Image 
                    src={item.image} 
                    alt={`${item.title} - Kategori ${item.category}`} 
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs uppercase font-bold tracking-widest text-accent px-3 py-1 rounded-full border border-white/50 shadow-sm">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/85 backdrop-blur text-white text-xs uppercase font-bold px-3 py-1 rounded-md">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-1 justify-between text-left">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.category} / {item.location}</span>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3 bg-accent-light/10 border border-border-premium/20 p-3 rounded-xl mt-1">
                      {item.material}. Estimasi durasi {item.duration}.
                    </p>
                  </div>
                  
                  <div className="flex gap-3 border-t border-border-premium/30 pt-4 mt-2">
                    <Link 
                      href={`/portofolio/${item.slug}`} 
                      className="flex-1 text-center py-2.5 bg-primary-dark/5 hover:bg-primary-dark hover:text-white text-xs font-bold uppercase tracking-wide rounded-xl transition-all cursor-pointer flex items-center justify-center"
                      aria-label={`Tinjau studi kasus ${item.title}`}
                    >
                      Studi Kasus
                    </Link>
                    <a 
                      href={whatsappUrl(`Halo Eko Suyanto Workshop, saya tertarik dengan hasil pengerjaan ${item.title} (kategori ${item.category}) dan ingin berkonsultasi mengenai proyek serupa.`)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wide rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                      aria-label={`Tanya estimasi proyek serupa ${item.title} via WhatsApp`}
                    >
                      <Phone size={12} />
                      <span>Tanya WA</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

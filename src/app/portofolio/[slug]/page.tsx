import { portfolio as staticPortfolio } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Phone, ArrowRight, Check } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticPortfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const item = portfolio.find((project) => project.slug === slug);

  return {
    title: item ? `${item.title} | Portofolio Eko Suyanto Workshop` : "Portofolio Eko Suyanto Workshop",
    description: item ? `Dokumentasi realisasi proyek ${item.title} (${item.material}) di ${item.location} oleh Eko Suyanto Workshop.` : undefined,
    alternates: item ? { canonical: absoluteUrl(`/portofolio/${item.slug}`) } : undefined,
    openGraph: item ? {
      title: `${item.title} | Eko Suyanto Workshop`,
      description: `Spesifikasi bahan ${item.material}. Pengerjaan durasi ${item.duration} di ${item.location}.`,
      images: [{ url: absoluteUrl(item.image) }],
    } : undefined,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const item = portfolio.find((project) => project.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/portofolio" className="hover:text-accent">Portofolio</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary font-medium">{item.title}</span>
        </nav>

        {/* Dynamic Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Images & Specifications */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 w-fit mb-2">
                <Compass size={12} className="text-accent animate-spin-slow" />
                <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent">
                  {item.category} / Proyek di {item.location}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
                {item.title}
              </h1>
            </header>

            {/* Main Project Image */}
            <div className="relative h-[250px] sm:h-[400px] w-full rounded-[2px] overflow-hidden shadow-premium border border-border-premium/50 bg-neutral-100">
              <Image 
                src={item.image} 
                alt={`Dokumentasi proyek ${item.title} oleh Eko Suyanto Workshop`} 
                fill 
                priority 
                sizes="(max-width: 980px) 100vw, 60vw" 
                className="object-cover"
              />
            </div>

            {/* Specifications Card */}
            <div className="bg-white border border-border-premium/50 rounded-[2px] p-6 sm:p-10 shadow-premium flex flex-col gap-6 text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-primary border-b border-border-premium/20 pb-4">
                Spesifikasi Bahan & Lingkup Pengerjaan
              </h2>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                Proyek ini mencakup perancangan arsitektural dan pemasangan di lokasi menggunakan material pilihan <strong>{item.material}</strong> dengan durasi penyelesaian berkisar antara <strong>{item.duration}</strong>.
              </p>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                Seluruh tahap pengerjaan dipantau secara detail mulai dari survei lokasi, pembuatan mock-up gambar kerja, hingga finishing akhir pembersihan di lapangan guna menjamin kerapian tingkat tinggi.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 border-t border-border-premium/20 pt-6">
                <li className="flex items-start gap-2.5 text-sm text-neutral-muted">
                  <span className="bg-accent/5 border border-accent/15 text-accent p-1 rounded-[2px] flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                    <Check size={11} />
                  </span>
                  <span className="font-medium leading-relaxed">Material Utama: {item.material.split(",")[0] || item.material}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-neutral-muted">
                  <span className="bg-accent/5 border border-accent/15 text-accent p-1 rounded-[2px] flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                    <Check size={11} />
                  </span>
                  <span className="font-medium leading-relaxed">Lokasi: Area {item.location}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-neutral-muted">
                  <span className="bg-accent/5 border border-accent/15 text-accent p-1 rounded-[2px] flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                    <Check size={11} />
                  </span>
                  <span className="font-medium leading-relaxed">Kecepatan: Selesai dalam {item.duration}</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-neutral-muted">
                  <span className="bg-accent/5 border border-accent/15 text-accent p-1 rounded-[2px] flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                    <Check size={11} />
                  </span>
                  <span className="font-medium leading-relaxed">Kerapian: Pengerjaan Rapi & Bergaransi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar CTA */}
          <aside className="lg:col-span-4 bg-primary text-white p-8 rounded-[2px] border border-white/5 shadow-premium lg:sticky lg:top-28 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-luxury-sm text-accent">Konsultasikan Proyek</p>
              <h3 className="text-xl font-semibold leading-tight">Tertarik Dengan Hasil Pekerjaan Ini?</h3>
              <p className="text-neutral-muted text-sm leading-relaxed">
                Kami dapat merealisasikan rancangan serupa atau mendesain konsep baru yang disesuaikan dengan dimensi ukuran, budget, dan karakter ruangan rumah Anda di area Sidareja, Cilacap.
              </p>
              
              <div className="flex flex-col gap-3 mt-4 w-full">
                <a 
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark py-3.5 px-6 rounded-[2px] text-xs font-bold uppercase tracking-wide transition-all cursor-pointer shadow-sm group"
                  href={whatsappUrl(`Halo Eko Suyanto Workshop, saya tertarik dengan hasil pengerjaan proyek ${item.title} dan ingin menanyakan estimasi biaya jika dipasang di rumah saya.`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Tanya estimasi proyek serupa ${item.title} via WhatsApp`}
                >
                  <Phone size={12} />
                  <span>Tanya Proyek Serupa</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                
                <Link 
                  className="w-full text-center py-3 border border-white/10 hover:border-white/40 text-white text-xs font-bold uppercase tracking-wide rounded-[2px] transition-all cursor-pointer bg-transparent"
                  href="/portofolio" 
                  aria-label="Lihat seluruh studi kasus Eko Suyanto Workshop"
                >
                  Kembali ke Portofolio
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

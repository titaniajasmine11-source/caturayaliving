import { portfolio as staticPortfolio } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Phone, ArrowRight } from "lucide-react";

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
    title: item ? `${item.title} | Portofolio Caturaya Living` : "Portofolio Caturaya Living",
    description: item ? `Dokumentasi realisasi proyek ${item.title} (${item.material}) di ${item.location} oleh Caturaya Living.` : undefined,
    alternates: item ? { canonical: absoluteUrl(`/portofolio/${item.slug}`) } : undefined,
    openGraph: item ? {
      title: `${item.title} | Caturaya Living`,
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
    <main className="bg-accent-light/30 min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/portofolio" className="hover:text-accent">Portofolio</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">{item.title}</span>
        </nav>

        {/* Dynamic Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Images & Specifications */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
                <Compass size={14} className="text-accent animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {item.category} / Proyek di {item.location}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
                {item.title}
              </h1>
            </header>

            {/* Main Project Image */}
            <div className="relative h-[250px] sm:h-[400px] w-full rounded-[32px] overflow-hidden shadow-premium border border-border-premium/50 bg-neutral-100">
              <Image 
                src={item.image} 
                alt={`Dokumentasi proyek ${item.title} oleh Caturaya Living`} 
                fill 
                priority 
                sizes="(max-width: 980px) 100vw, 60vw" 
                className="object-cover animate-slow-zoom"
              />
            </div>

            {/* Specifications Card */}
            <div className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium flex flex-col gap-6 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-medium text-primary border-b border-border-premium/30 pb-4">
                Spesifikasi Bahan & Lingkup Pengerjaan
              </h2>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                Proyek ini mencakup perancangan arsitektural dan pemasangan di lokasi menggunakan material pilihan <strong>{item.material}</strong> dengan durasi penyelesaian berkisar antara <strong>{item.duration}</strong>.
              </p>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                Seluruh tahap pengerjaan dipantau secara detail mulai dari survei lokasi, pembuatan mock-up gambar kerja, hingga finishing akhir pembersihan di lapangan guna menjamin kerapian tingkat tinggi.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 border-t border-border-premium/30 pt-6">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
                  <span className="bg-accent/15 text-accent p-1 rounded-md text-[10px] font-bold mt-0.5">✓</span>
                  <span className="font-semibold leading-relaxed">Material Utama: {item.material.split(",")[0] || item.material}</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
                  <span className="bg-accent/15 text-accent p-1 rounded-md text-[10px] font-bold mt-0.5">✓</span>
                  <span className="font-semibold leading-relaxed">Lokasi: Area {item.location}</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
                  <span className="bg-accent/15 text-accent p-1 rounded-md text-[10px] font-bold mt-0.5">✓</span>
                  <span className="font-semibold leading-relaxed">Kecepatan: Selesai dalam {item.duration}</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
                  <span className="bg-accent/15 text-accent p-1 rounded-md text-[10px] font-bold mt-0.5">✓</span>
                  <span className="font-semibold leading-relaxed">Kerapian: Pengerjaan Rapi & Bergaransi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar CTA */}
          <aside className="lg:col-span-4 bg-primary text-white p-8 rounded-[32px] shadow-premium lg:sticky lg:top-32 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Konsultasikan Proyek</p>
              <h3 className="text-2xl font-display font-medium leading-tight">Tertarik Dengan Hasil Pekerjaan Ini?</h3>
              <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed">
                Kami dapat merealisasikan rancangan serupa atau mendesain konsep baru yang disesuaikan dengan dimensi ukuran, budget, dan karakter ruangan rumah Anda di area Sidareja, Cilacap.
              </p>
              
              <div className="flex flex-col gap-3 mt-4 w-full">
                <a 
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-accent/20 group animate-soft-pulse"
                  href={whatsappUrl(`Halo Caturaya Living, saya tertarik dengan hasil pengerjaan proyek ${item.title} dan ingin menanyakan estimasi biaya jika dipasang di rumah saya.`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Tanya estimasi proyek serupa ${item.title} via WhatsApp`}
                >
                  <Phone size={14} />
                  <span>Tanya Proyek Serupa</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link 
                  className="w-full text-center py-3 border border-white/20 hover:border-white/50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-semibold cursor-pointer"
                  href="/portofolio" 
                  aria-label="Lihat seluruh studi kasus Caturaya Living"
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

import { areas, portfolio, services as staticServices } from "@/lib/content";
import { getServices } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Phone, ArrowRight } from "lucide-react";

const serviceSlugAliases: Record<string, string> = {
  "kitchen-set": "kitchen-set-custom",
  "pintu-aluminium": "pintu-jendela-aluminium",
  "jendela-aluminium": "pintu-jendela-aluminium",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  return {
    title: service ? `${service.title} Premium Sidareja Cilacap | Caturaya Living` : "Layanan Caturaya Living",
    description: service?.summary,
    alternates: service ? { canonical: absoluteUrl(`/layanan/${service.slug}`) } : undefined,
    openGraph: service ? {
      title: `${service.title} Premium Sidareja Cilacap | Caturaya Living`,
      description: service.summary,
      images: [{ url: absoluteUrl(service.image) }],
    } : undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = serviceSlugAliases[slug] ?? slug;
  const services = await getServices();
  const service = services.find((item) => item.slug === resolvedSlug);

  if (!service) {
    notFound();
  }

  const relatedPortfolio = portfolio.filter((item) => 
    service.title.toLowerCase().includes(item.category.toLowerCase()) || 
    item.category.toLowerCase().includes(service.title.split(" ")[0].toLowerCase())
  ).slice(0, 3);

  return (
    <main className="bg-accent-light/30 min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/layanan" className="hover:text-accent">Layanan</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">{service.title}</span>
        </nav>

        {/* Dynamic Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Contents & Specs */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
                <Compass size={14} className="text-accent animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Layanan Spesialis Properti</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
                {service.summary}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative h-[250px] sm:h-[400px] w-full rounded-[32px] overflow-hidden shadow-premium border border-border-premium/50 bg-neutral-100">
              <Image 
                src={service.image} 
                alt={`${service.title} Caturaya Living`} 
                fill 
                priority 
                sizes="(max-width: 980px) 100vw, 60vw" 
                className="object-cover"
              />
            </div>

            {/* Scope of works card */}
            <div className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium flex flex-col gap-6 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-medium text-primary border-b border-border-premium/30 pb-4">
                Lingkup Pekerjaan & Detail Layanan
              </h2>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                {service.detail}
              </p>
              
              <h2 className="text-xl sm:text-2xl font-display font-medium text-primary border-b border-border-premium/30 pb-4 mt-4">
                Keunggulan Utama Layanan
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-muted">
                    <span className="bg-accent/15 text-accent p-1 rounded-md text-[10px] font-bold mt-0.5">✓</span>
                    <span className="font-medium leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables section */}
            <section className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium text-left">
              <header className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Tahapan Deliverables</p>
                <h2 className="text-xl sm:text-2xl font-display font-medium text-primary tracking-tight">
                  Apa yang Anda Dapatkan Sejak Konsultasi Awal?
                </h2>
              </header>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {service.deliverables.map((item, index) => (
                  <div key={item} className="bg-accent-light/10 border border-border-premium/30 p-4 rounded-2xl flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-accent">0{index + 1}</span>
                    <span className="text-xs font-semibold text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Kesesuaian Ruang */}
            <section className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium text-left">
              <header className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Kesesuaian Ruang</p>
                <h2 className="text-xl sm:text-2xl font-display font-medium text-primary tracking-tight">
                  Bagian Ruangan yang Sering Membutuhkan Layanan Ini
                </h2>
              </header>
              <div className="flex flex-wrap gap-2.5">
                {areas.slice(0, 8).map((area) => (
                  <Link 
                    href={`/area-rumah/${area.slug}`} 
                    key={area.slug}
                    className="px-4 py-2 text-xs font-semibold bg-accent-light/20 hover:bg-accent border border-border-premium/50 hover:border-accent hover:text-white rounded-xl transition-all cursor-pointer"
                  >
                    {area.title}
                  </Link>
                ))}
              </div>
            </section>

            {/* Related Portfolio Cases */}
            {relatedPortfolio.length > 0 && (
              <section className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium text-left">
                <header className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Referensi Kasus</p>
                  <h2 className="text-xl sm:text-2xl font-display font-medium text-primary tracking-tight">
                    Proyek Terkait Kategori {service.title.split(" ")[0]}
                  </h2>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedPortfolio.map((item) => (
                    <Link 
                      className="group flex flex-col gap-3 p-4 bg-accent-light/10 border border-border-premium/30 hover:border-accent rounded-2xl transition-all cursor-pointer h-full" 
                      href={`/portofolio/${item.slug}`} 
                      key={item.title}
                    >
                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{item.category} / {item.location}</span>
                      <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors leading-snug">{item.title}</h3>
                      <p className="text-[11px] text-neutral-muted leading-relaxed line-clamp-2 mt-auto">{item.material}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar CTA */}
          <aside className="lg:col-span-4 bg-primary text-white p-8 rounded-[32px] shadow-premium lg:sticky lg:top-32 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Konsultasi Layanan</p>
              <h3 className="text-2xl font-display font-medium leading-tight">Diskusikan Proyek Rumah Anda</h3>
              <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed">
                Konsultasikan rencana pemasangan {service.title.toLowerCase()} untuk rumah Anda secara detail. Kami akan memberikan perkiraan harga awal dan menjadwalkan survei lokasi Sidareja gratis.
              </p>
              
              <div className="flex flex-col gap-3 mt-4 w-full">
                <a 
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-accent/20 group"
                  href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai kebutuhan layanan ${service.title} untuk rumah saya.`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Konsultasi layanan ${service.title} via WhatsApp`}
                >
                  <Phone size={14} />
                  <span>Chat WhatsApp</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link 
                  className="w-full text-center py-3 border border-white/20 hover:border-white/50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-semibold cursor-pointer"
                  href="/layanan" 
                  aria-label="Lihat seluruh katalog layanan Caturaya Living"
                >
                  Semua Layanan
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

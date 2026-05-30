import { areas as staticAreas } from "@/lib/content";
import { getAreas, getServices } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Phone, ArrowRight } from "lucide-react";

const areaSlugAliases: Record<string, string> = {
  kitchen: "kitchen-dapur",
  "ruang-makan": "dining-area",
  mushola: "mushola-rumah",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const areas = await getAreas();
  const area = areas.find((item) => item.slug === slug);

  return {
    title: area ? `${area.title} | Area Rumah Caturaya Living` : "Area Rumah Caturaya Living",
    description: area?.summary,
    alternates: area ? { canonical: absoluteUrl(`/area-rumah/${area.slug}`) } : undefined,
    openGraph: area ? {
      title: `${area.title} | Caturaya Living`,
      description: area.summary,
      images: [{ url: absoluteUrl(area.image) }],
    } : undefined,
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = areaSlugAliases[slug] ?? slug;
  const [areas, services] = await Promise.all([getAreas(), getServices()]);
  const area = areas.find((item) => item.slug === resolvedSlug);

  if (!area) {
    notFound();
  }

  const recommendedServices = services.filter((service) => 
    area.recommended.some((item) => service.title.includes(item) || item.includes(service.title.split(" ")[0]))
  );

  return (
    <main className="bg-accent-light/30 min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <Link href="/area-rumah" className="hover:text-accent">Area Rumah</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">{area.title}</span>
        </nav>

        {/* Dynamic Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <header className="flex flex-col gap-4 text-left">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
                <Compass size={14} className="text-accent animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Zonasi Tata Letak Ruangan</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
                Penataan Area {area.title}
              </h1>
              <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
                {area.summary}
              </p>
            </header>

            {/* Featured Visual Image */}
            <div className="relative h-[250px] sm:h-[400px] w-full rounded-[32px] overflow-hidden shadow-premium border border-border-premium/50 bg-neutral-100">
              <Image 
                src={area.image} 
                alt={`Desain visual area ${area.title} Caturaya Living`} 
                fill 
                priority 
                sizes="(max-width: 980px) 100vw, 60vw" 
                className="object-cover"
              />
            </div>

            {/* Methods specifications text box */}
            <div className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium flex flex-col gap-6 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-medium text-primary border-b border-border-premium/30 pb-4">
                Metode Perencanaan Tata Ruang
              </h2>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
                Tiap area rumah Anda dirancang menggunakan perhitungan sirkulasi jalur gerak yang cermat. Kami meyakini furniture custom arsitektural harus mampu meningkatkan nilai estetika visual sekaligus memudahkan aktivitas fungsional harian Anda.
              </p>
              <p className="text-sm sm:text-base text-neutral-muted leading-relaxed bg-accent-light/10 border border-border-premium/30 p-4 rounded-xl italic font-medium">
                Rekomendasi spesifik kami bagi <strong>{area.title}</strong> adalah pengaplikasian kombinasi pekerjaan berikut: <strong>{area.recommended.join(", ")}</strong>. Hal ini memadukan kekuatan konstruksi struktural dan estetika minimalis modern.
              </p>
            </div>

            {/* Recommended Services grid listing */}
            <section className="bg-white border border-border-premium/40 rounded-[32px] p-6 sm:p-10 shadow-premium text-left">
              <header className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Rekomendasi Pekerjaan Terkait</p>
                <h2 className="text-xl sm:text-2xl font-display font-medium text-primary tracking-tight">
                  Layanan Pilihan Terbaik Untuk Area {area.title}
                </h2>
              </header>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recommendedServices.map((service) => (
                  <Link 
                    className="group flex flex-col gap-3 p-5 bg-accent-light/10 border border-border-premium/30 hover:border-accent rounded-2xl transition-all cursor-pointer h-full justify-between" 
                    href={`/layanan/${service.slug}`} 
                    key={service.slug}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{service.title.slice(0, 2).toUpperCase()}</span>
                      <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors leading-snug">{service.title}</h3>
                      <p className="text-xs text-neutral-muted leading-relaxed line-clamp-2 mt-1">{service.summary}</p>
                    </div>
                    <span className="text-[11px] font-bold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-2">
                      <span>Detail Info</span>
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar CTA */}
          <aside className="lg:col-span-4 bg-primary text-white p-8 rounded-[32px] shadow-premium lg:sticky lg:top-32 flex flex-col gap-6 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Konsultasi Area</p>
              <h3 className="text-2xl font-display font-medium leading-tight">Tata Ulang Area {area.title}</h3>
              <p className="text-neutral-muted text-xs sm:text-sm leading-relaxed">
                Konsultasikan rencana renovasi ringan atau kustomisasi interior/eksterior untuk area {area.title.toLowerCase()} Anda. Tim lapangan kami siap menjadwalkan survei ke lokasi Anda.
              </p>
              
              <div className="flex flex-col gap-3 mt-4 w-full">
                <a 
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-accent/20 group"
                  href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai rencana penataan dan pekerjaan untuk area ${area.title} rumah saya.`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Konsultasi penataan area ${area.title} via WhatsApp`}
                >
                  <Phone size={14} />
                  <span>Tanya Area WA</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link 
                  className="w-full text-center py-3 border border-white/20 hover:border-white/50 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-semibold cursor-pointer"
                  href="/area-rumah" 
                  aria-label="Lihat seluruh daftar area properti Caturaya Living"
                >
                  Eksplor Semua Area
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

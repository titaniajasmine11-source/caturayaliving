import { getAreas } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight, Compass, Shield } from "lucide-react";

export const metadata = {
  title: "Inspirasi Pengerjaan Berdasarkan Area Ruang Rumah | Eko Suyanto Workshop",
  description: "Rencanakan renovasi ringan, kitchen set, plafon, kanopi, kusen aluminium, dan partisi berdasarkan bagian ruang rumah di Sidareja, Cilacap.",
};

export default async function AreaRumahPage() {
  const areas = await getAreas();

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary font-medium">Area Rumah</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 w-fit mb-2">
            <Compass size={12} className="text-accent animate-spin-slow" />
            <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent">
              Zonasi Tata Ruang
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Inspirasi Pengerjaan Berdasarkan Area Rumah
          </h1>
          <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
            Rencanakan penataan dan pembangunan berdasarkan bagian rumah Anda. Tiap area memiliki karakteristik arsitektural yang khas: ketahanan cuaca eksterior, efisiensi sirkulasi dapur, hingga kenyamanan detail interior ruang keluarga.
          </p>
        </header>

        {/* Grid listing */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <article 
                className="bg-white border border-border-premium/50 rounded-[2px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-500 flex flex-col h-full"
                key={area.slug}
              >
                {/* Image */}
                <div className="h-[220px] relative w-full overflow-hidden bg-accent-light/10">
                  <Image 
                    src={area.image} 
                    alt={area.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-750" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-xs uppercase font-semibold tracking-wide text-accent px-3 py-1.5 rounded-[2px] border border-border-premium/25 shadow-sm">
                    Tata Ruang
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-[2px] border border-white/5">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed">
                      {area.summary}
                    </p>
                    
                    {/* Recommendations */}
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-border-premium/20 items-center">
                      <span className="text-xs font-semibold text-accent uppercase tracking-luxury-sm">Rekomendasi:</span>
                      {area.recommended.map((rec: string) => (
                        <span key={rec} className="text-xs font-medium text-neutral-text bg-accent-light/60 border border-border-premium/30 px-2 py-0.5 rounded-[2px]">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 border-t border-border-premium/20 pt-4 mt-2">
                    <Link
                      href={`/area-rumah/${area.slug}`}
                      className="flex-1 text-center py-2.5 border border-border-premium hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-white text-xs font-semibold uppercase tracking-wide rounded-[2px] transition-all duration-300 flex items-center justify-center gap-1 group"
                      aria-label={`Lihat rincian lengkap mengenai penataan area ${area.title}`}
                    >
                      <span>Detail Ruang</span>
                      <ArrowUpRight size={11} className="opacity-70 group-hover:opacity-100" />
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Eko Suyanto Workshop, saya ingin berkonsultasi mengenai penataan arsitektural untuk area ${area.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark text-xs font-semibold uppercase tracking-wide rounded-[2px] shadow-sm transition-all duration-300 flex items-center justify-center gap-1"
                      aria-label={`Tanya mengenai penataan area ${area.title} via WhatsApp`}
                    >
                      <Phone size={11} />
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

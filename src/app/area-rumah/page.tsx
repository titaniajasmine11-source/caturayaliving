import { getAreas } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowUpRight, Compass, Shield } from "lucide-react";

export const metadata = {
  title: "Inspirasi Pengerjaan Berdasarkan Area Ruang Rumah | Caturaya Living",
  description: "Rencanakan renovasi ringan, kitchen set, plafon, kanopi, kusen aluminium, dan partisi berdasarkan bagian ruang rumah di Sidareja, Cilacap.",
};

export default async function AreaRumahPage() {
  const areas = await getAreas();

  return (
    <main className="bg-white min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Area Rumah</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Zonasi Tata Ruang
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Inspirasi Pengerjaan Berdasarkan Area Rumah
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Rencanakan penataan dan pembangunan berdasarkan bagian rumah Anda. Tiap area memiliki karakteristik arsitektural yang khas: ketahanan cuaca eksterior, efisiensi sirkulasi dapur, hingga kenyamanan detail interior ruang keluarga.
          </p>
        </header>

        {/* Grid listing */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <article 
                className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full"
                key={area.slug}
              >
                {/* Image */}
                <div className="h-[220px] relative w-full overflow-hidden">
                  <Image 
                    src={area.image} 
                    alt={area.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-accent px-3 py-1 rounded-full border border-white/50 shadow-sm">
                    Tata Ruang
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur text-white text-[10px] uppercase font-semibold px-3 py-1 rounded-md">
                    0{index + 1}
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed">
                      {area.summary}
                    </p>
                    
                    {/* Recommendations */}
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-border-premium/30">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-0.5">Rekomendasi:</span>
                      {area.recommended.map((rec: string) => (
                        <span key={rec} className="text-[10px] font-semibold text-primary-neutral bg-accent-light/60 px-2 py-0.5 rounded">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 border-t border-border-premium/30 pt-4 mt-2">
                    <Link
                      href={`/area-rumah/${area.slug}`}
                      className="flex-1 text-center py-2.5 bg-primary-dark/5 hover:bg-primary-dark hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1"
                      aria-label={`Lihat rincian lengkap mengenai penataan area ${area.title}`}
                    >
                      <span>Detail Ruang</span>
                      <ArrowUpRight size={12} />
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai penataan arsitektural untuk area ${area.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                      aria-label={`Tanya mengenai penataan area ${area.title} via WhatsApp`}
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

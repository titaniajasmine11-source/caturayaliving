import { VisualPlanner } from "@/components/visual-planner";
import { designStages } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Visual Planner Preview Arsitektural | Caturaya Living",
  description: "Preview konsep desain 2D/3D visual arsitektural interior dan eksterior Anda bersama Caturaya Living.",
};

export default function PlannerPage() {
  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Visual Planner</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Rancang Bangun Denah
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Visual Konseptual Proyek Rumah
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Kami memandu Anda dalam memahami konsep, tata letak, warna material, dan pembagian ruang secara transparan. Mulai dari sketsa konsep, denah 2D, pratinjau 3D realistis, hingga diagram tahapan progres pekerjaan arsitektural.
          </p>
        </header>

        {/* Configurator Section */}
        <section className="mb-16 bg-white border border-border-premium/50 p-6 sm:p-10 rounded-[32px] shadow-premium">
          <header className="mb-8 border-b border-border-premium/30 pb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Konfigurator Briefing</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
              Buat Rancangan Kasar Area Rumah Anda
            </h2>
            <p className="text-sm text-neutral-muted mt-2">
              Pilih spesifikasi area, rancang dimensi ukuran kasar, dan pilih elemen untuk menghasilkan rangkuman konseptual instan.
            </p>
          </header>
          <VisualPlanner />
        </section>

        {/* Stages Section */}
        <section className="mb-24">
          <header className="max-w-2xl flex flex-col gap-3 mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Tahapan Perencanaan</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
              Proses Pematangan Konsep Visual Kami
            </h2>
            <p className="text-sm text-neutral-muted leading-relaxed">
              Tim arsitektur kami membagi draf visualisasi pekerjaan Anda ke dalam empat tahapan konseptual guna menjamin kesesuaian eksekusi lapangan.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designStages.map((stage) => (
              <article 
                className="bg-white border border-border-premium/50 rounded-[28px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col" 
                key={stage.title}
              >
                <div className="h-[180px] relative w-full overflow-hidden bg-accent-light flex items-center justify-center p-6 border-b border-border-premium/20">
                  <Image 
                    src={stage.image} 
                    alt={`${stage.title} Caturaya Living`} 
                    width={100} 
                    height={100} 
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                  <span className="absolute bottom-3 right-3 bg-primary text-white text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                    {stage.label}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-2 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-primary group-hover:text-accent transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Bottom Block */}
        <section className="bg-primary text-white rounded-[40px] overflow-hidden p-8 sm:p-16 text-center relative shadow-premium">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Output Konsultasi Desain</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
              Ingin Visualisasi Khusus (Sketsa/2D/3D) untuk Rumah Anda?
            </h2>
            <p className="text-neutral-muted text-sm leading-relaxed">
              Kirimkan foto lokasi, perkiraan ukuran, dan referensi model. Tim arsitektur kami akan memproses arahan visual (sketsa, 2D, atau 3D) yang sesuai kebutuhan Anda.
            </p>
            <a 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wide shadow-lg shadow-accent/20 transition-all group"
              href={whatsappUrl("Halo Caturaya Living, saya ingin konsultasi detail planner sketsa 2D/3D/4D untuk proyek rumah saya.")} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Mulai Diskusi Desain</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

import { ConsultationForm } from "@/components/consultation-form";
import { site, whatsappUrl } from "@/lib/site";
import Link from "next/link";
import { MapPin, Phone, Clock, Compass } from "lucide-react";

export const metadata = {
  title: "Hubungi Caturaya Living | Jasa Konsultasi Properti Sidareja",
  description: "Hubungi Caturaya Living Sidareja, Cilacap. Konsultasikan gratis kebutuhan kusen kayu & aluminium, perabotan rumah, kitchen set, kanopi, plafon, and pagar.",
};

export default function KontakPage() {
  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Hubungi Kami</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Kontak & Konsultasi Proyek
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Hubungi Tim Caturaya Living
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Kami siap merancang dan merealisasikan kebutuhan properti Anda. Kirim pesan WhatsApp langsung ke penanggung jawab tim di bawah, atau isi formulir konsultasi terstruktur untuk respon cepat.
          </p>
        </header>

        {/* 2-Column Info Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Workshop Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-4 p-8 bg-white border border-border-premium/50 rounded-[32px] shadow-premium">
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-xl text-accent flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col gap-1 text-sm text-neutral-muted leading-relaxed">
                  <strong className="text-primary text-base font-semibold">Alamat Workshop & Kantor</strong>
                  <p>{site.address}</p>
                  <p className="pt-2">
                    Kode Plus Maps:{" "}
                    <a 
                      href={`https://plus.codes/${site.locationCode}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-accent hover:text-accent-hover font-semibold underline"
                    >
                      {site.locationCode}
                    </a>
                  </p>
                </div>
              </div>

              <div className="border-t border-border-premium/30 my-2" />

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-xl text-accent flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex flex-col gap-1 text-sm text-neutral-muted leading-relaxed">
                  <strong className="text-primary text-base font-semibold">Jam Operasional CS</strong>
                  <p>Senin - Sabtu (08:00 - 17:00 WIB)</p>
                  <p className="text-xs italic pt-1 text-neutral-muted">
                    *Layanan survei lokasi gratis dijadwalkan secara fleksibel di luar jam operasional kantor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic WhatsApp Contacts */}
          <div className="lg:col-span-5 bg-white border border-border-premium/50 rounded-[32px] p-8 shadow-premium flex flex-col gap-6">
            <h3 className="text-base font-semibold text-primary">Tanya Tim Spesialis</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs border-b border-border-premium/30 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-muted uppercase tracking-wider font-bold">Tholib (WhatsApp Utama)</span>
                  <span className="font-semibold text-primary pt-0.5">{site.phonePrimaryLabel}</span>
                </div>
                <a 
                  href={whatsappUrl(undefined, site.phonePrimary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                >
                  <Phone size={12} />
                  <span>Chat Tholib</span>
                </a>
              </div>

              <div className="flex justify-between items-center text-xs border-b border-border-premium/30 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-muted uppercase tracking-wider font-bold">Eko (WhatsApp Alternatif)</span>
                  <span className="font-semibold text-primary pt-0.5">{site.phoneSecondaryLabel}</span>
                </div>
                <a 
                  href={whatsappUrl("Halo Caturaya Living, saya ingin berkonsultasi mengenai proyek properti.", site.phoneSecondary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
                >
                  <Phone size={12} />
                  <span>Chat Eko</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Consultation Section */}
        <section className="bg-white border border-border-premium/50 rounded-[36px] p-8 sm:p-12 shadow-premium">
          <header className="max-w-2xl flex flex-col gap-3 mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Formulir Konsultasi Awal</span>
            <h2 className="text-2xl font-display font-medium text-primary">
              Isi Kebutuhan Pengerjaan Proyek Anda
            </h2>
            <div className="w-10 h-0.5 bg-accent mt-1"></div>
          </header>
          
          <ConsultationForm />
        </section>

      </div>
    </main>
  );
}

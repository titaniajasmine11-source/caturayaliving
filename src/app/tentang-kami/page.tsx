"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Compass, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Hammer, 
  Wrench, 
  Clock, 
  Sparkles, 
  CheckCircle,
  FileText,
  Phone,
  Paintbrush,
  HardHat,
  CookingPot,
  Sofa,
  Home
} from "lucide-react";
import { process, serviceCategories } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";

const iconMap: Record<string, React.ComponentType<any>> = {
  Hammer, Wrench, Paintbrush, Sofa, Home, HardHat, CookingPot,
};

export default function TentangKamiPage() {
  const wa = whatsappUrl();

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <main className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary font-medium">Tentang Kami</span>
        </nav>

        {/* Hero Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-20 text-left">
          <div className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 w-fit mb-2">
            <Users size={12} className="text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Profil Eko Suyanto Workshop
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Full Kontraktor Properti — Satu Pintu, Semua Dikerjakan Rapi
          </h1>
          <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
            Eko Suyanto Workshop hadir sebagai kontraktor properti terpadu di Sidareja, Cilacap. Kami mempersatukan spesialisasi arsitektural (kayu, aluminium, PVC/HPL, kitchen set, fasad, renovasi bangunan) di bawah satu koordinator untuk menjamin kualitas terbaik tanpa kebingungan mengelola banyak tukang.
          </p>
        </header>

        {/* Company Pitch Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-12 border-b border-border-premium/50 text-left">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <h2 className="text-2xl font-semibold text-primary">
              Mengapa "Full Kontraktor" Lebih Efisien Bagi Anda?
            </h2>
            <div className="w-8 h-[1px] bg-accent/60"></div>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-muted">
              Sebagian besar pemilik properti membuang waktu dan energi saat mengelola renovasi secara terpisah: harus memanggil tukang kayu sendiri untuk kusen pintu, menghubungi aplikator kaca aluminium secara terpisah untuk jendela, mencari spesialis HPL/PVC untuk plafon dan kitchen set, serta menyewa tukang bangunan untuk urusan sipil.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-muted">
              Jeda komunikasi antartukang ini kerap kali menyebabkan kesalahan ukuran (mismatch), pengerjaan yang saling bertumpuk, hingga pembengkakan anggaran. 
            </p>
            <div className="bg-white border border-border-premium/50 p-6 rounded-[2px] flex items-start gap-4 shadow-sm">
              <ShieldCheck className="text-accent flex-shrink-0 mt-1" size={18} />
              <div className="flex flex-col gap-1">
                <strong className="text-sm font-semibold text-primary">Eko Suyanto Workshop sebagai Koordinator Tunggal</strong>
                <p className="text-sm text-neutral-muted leading-relaxed">
                  Kami mengurus seluruh alur proyek dari survey ukuran, gambar sketsa konsep, fabrikasi material di workshop, instalasi di lokasi, hingga penyelesaian detail (finishing). Anda cukup berkomunikasi dengan satu koordinator proyek saja.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white text-primary rounded-[2px] border border-border-premium/50 p-8 shadow-premium relative overflow-hidden flex flex-col gap-6">
            <h3 className="text-xs font-semibold text-accent uppercase tracking-luxury-sm">Cakupan Pekerjaan Kami</h3>
            <div className="w-8 h-[1px] bg-accent/60 -mt-2"></div>
            
            <ul className="flex flex-col gap-3 text-sm text-neutral-muted">
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Kusen Jendela Aluminium & Kaca</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Perabotan Kayu Solid Custom</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Kitchen Set Finishing HPL Premium</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Plafon Gypsum & PVC Modern</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Kanopi Carport Tempered Glass / Alderon</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Pagar, Pintu Gerbang Fasad Minimalis</li>
              <li className="flex items-center gap-2.5"><span className="text-accent font-bold">✓</span> Jasa Bangunan & Renovasi Sipil</li>
            </ul>
          </div>
        </section>

        {/* Tim Spesialis */}
        <section className="mb-24">
          <div className="flex flex-col gap-3 mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">Tim Spesialis Kami</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Di Balik Setiap Kerapian Pengerjaan</h2>
            <div className="w-8 h-[1px] bg-accent/60 mx-auto mt-2"></div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {site.teamSpecialists.map((spec) => (
              <motion.div 
                variants={fadeIn}
                key={spec.role} 
                className="bg-white border border-border-premium/50 p-6 rounded-[2px] hover:shadow-premium transition-all duration-500 hover:border-accent/30 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-accent-light border border-border-premium rounded-[2px] shadow-sm text-accent mb-4 group-hover:bg-accent group-hover:text-primary transition-all">
                  {(() => { const Icon = iconMap[spec.icon] || Compass; return <Icon size={16} />; })()}
                </div>
                <h3 className="text-sm font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{spec.role}</h3>
                <p className="text-sm text-neutral-muted leading-relaxed">{spec.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Filosofi Nilai */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 py-12 border-t border-b border-border-premium/50 px-8 text-left">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">Prinsip Kerja</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Filosofi & Komitmen Kami</h2>
            <p className="text-sm sm:text-base text-neutral-muted leading-relaxed max-w-sm">
              Kami memegang teguh komitmen pengerjaan yang bersih, presisi, jujur, dan bertanggung jawab penuh demi kenyamanan tempat tinggal Anda.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-neutral-muted">
            {[
              { title: "Manajemen Terstruktur", desc: "Alur kerja rapi dari diskusi konsep, survey, RAB, produksi workshop, instalasi di lokasi, hingga serah terima kunci." },
              { title: "RAB Jujur & Transparan", desc: "Estimasi anggaran transparan sejak awal. Tidak ada manipulasi spesifikasi bahan maupun biaya kejutan siluman." },
              { title: "Kerapian Finishing", desc: "Potongan siku presisi, sambungan nat bersih, dan instalasi kokoh oleh tukang terlatih di bidangnya masing-masing." },
              { title: "Responsif & Berbasis Lokal", desc: "Berlokasi di Sidareja, Cilacap. Kami sangat mudah dijangkau, siap survey ke lokasi, dan merespons keluhan dengan cepat." }
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2 p-4 bg-white border border-border-premium/50 rounded-[2px] shadow-sm">
                <span className="font-semibold text-primary text-sm flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-accent" />
                  <span>{item.title}</span>
                </span>
                <p className="leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wilayah Layanan */}
        <section className="mb-24 max-w-3xl text-left">
          <h2 className="text-2xl font-semibold text-primary mb-4">Area Layanan Utama</h2>
          <p className="text-sm sm:text-base text-neutral-muted leading-relaxed mb-6 max-w-xl">
            Tim kami bermarkas di Sidareja, Cilacap, Jawa Tengah. Kami melayani survei gratis dan pengiriman pengerjaan langsung ke wilayah:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-primary tracking-wide uppercase text-center">
            {["Sidareja", "Tegalsari", "Cipari", "Kedungreja"].map((loc) => (
              <div key={loc} className="flex items-center justify-center gap-2 bg-white border border-border-premium py-3 px-4 rounded-[2px] shadow-sm">
                <MapPin size={12} className="text-accent" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-neutral-muted mt-4 italic">
            *Untuk daerah lain di Kabupaten Cilacap (Gandrungmangu, Karangpucung, Cilacap Kota, dll) silakan konsultasikan terlebih dahulu skala pengerjaannya.
          </p>
        </section>

        {/* Alur Kerja */}
        <section className="bg-white text-primary rounded-[2px] border border-border-premium/50 p-8 sm:p-16 text-center relative overflow-hidden shadow-premium">
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 items-center">
            <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent">Proses Pengerjaan</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary leading-tight">
              Alur Kerja Terkoordinasi & Tenang
            </h2>
            <p className="text-neutral-muted text-sm leading-relaxed max-w-xl">
              Kami membagi proses pengerjaan menjadi tahapan terstruktur agar Anda selalu mengetahui kemajuan proyek Anda dengan transparan.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl my-4">
              {process.map((step, index) => (
                <span key={step} className="text-xs font-semibold uppercase tracking-luxury-sm bg-accent-light/50 border border-border-premium/30 px-3.5 py-2 rounded-[2px] flex items-center gap-1.5 text-primary">
                  <span className="text-accent font-bold">{index + 1}.</span>
                  <span>{step}</span>
                </span>
              ))}
            </div>

            <a 
              href={wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark px-8 py-4 rounded-[2px] text-xs font-semibold uppercase tracking-wide shadow-lg transition-all group mt-2 cursor-pointer"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={13} />
              <span>Konsultasi Proyek Sekarang</span>
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

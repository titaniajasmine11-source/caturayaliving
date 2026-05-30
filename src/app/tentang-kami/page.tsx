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
  Phone
} from "lucide-react";
import { process, serviceCategories } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";

export default function TentangKamiPage() {
  const wa = whatsappUrl();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Tentang Kami</span>
        </nav>

        {/* Hero Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Users size={14} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Profil Caturaya Living
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Full Kontraktor Properti — Satu Pintu, Semua Dikerjakan Rapi
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Caturaya Living hadir sebagai kontraktor properti terpadu di Sidareja, Cilacap. Kami mempersatukan spesialisasi arsitektural (kayu, aluminium, PVC/HPL, kitchen set, fasad, renovasi bangunan) di bawah satu koordinator untuk menjamin kualitas terbaik tanpa kebingungan mengelola banyak tukang.
          </p>
        </header>

        {/* Company Pitch Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-12 border-b border-border-premium/45">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-2xl font-display font-medium text-primary">
              Mengapa "Full Kontraktor" Lebih Efisien Bagi Anda?
            </h2>
            <p className="text-sm leading-relaxed text-neutral-muted">
              Sebagian besar pemilik properti membuang waktu dan energi saat mengelola renovasi secara terpisah: harus memanggil tukang kayu sendiri untuk kusen pintu, menghubungi aplikator kaca aluminium secara terpisah untuk jendela, mencari spesialis HPL/PVC untuk plafon dan kitchen set, serta menyewa tukang bangunan untuk urusan sipil.
            </p>
            <p className="text-sm leading-relaxed text-neutral-muted">
              Jeda komunikasi antartukang ini kerap kali menyebabkan kesalahan ukuran (mismatch), pengerjaan yang saling bertumpuk, hingga pembengkakan anggaran. 
            </p>
            <div className="bg-accent-light/35 border border-border-premium p-6 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="text-accent flex-shrink-0 mt-1" size={20} />
              <div className="flex flex-col gap-1">
                <strong className="text-sm font-semibold text-primary">Caturaya Living sebagai Koordinator Tunggal</strong>
                <p className="text-xs text-neutral-muted leading-relaxed">
                  Kami mengurus seluruh alur proyek dari survey ukuran, gambar sketsa konsep, fabrikasi material di workshop, instalasi di lokasi, hingga penyelesaian detail (finishing). Anda cukup berkomunikasi dengan satu koordinator proyek saja.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-primary text-white rounded-3xl p-8 shadow-premium relative overflow-hidden flex flex-col gap-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />
            <h3 className="text-lg font-display text-accent font-medium uppercase tracking-wider">Cakupan Pekerjaan Kami</h3>
            
            <ul className="flex flex-col gap-3 text-xs text-neutral-muted">
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
          <div className="flex flex-col gap-3 mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Tim Spesialis Kami</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-primary">Di Balik Setiap Kerapian Pengerjaan</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mt-1"></div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {site.teamSpecialists.map((spec) => (
              <motion.div 
                variants={fadeIn}
                key={spec.role} 
                className="bg-white border border-border-premium/50 p-6 rounded-2xl hover:shadow-premium transition-all duration-300 hover:border-accent/30 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-accent-light border border-border-premium rounded-xl shadow-sm text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                  <span className="text-xl select-none">{spec.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{spec.role}</h3>
                <p className="text-xs text-neutral-muted leading-relaxed">{spec.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Filosofi Nilai */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 py-12 border-t border-b border-border-premium/45 bg-accent-light/10 px-8 rounded-3xl">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Prinsip Kerja</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-primary">Filosofi & Komitmen Kami</h2>
            <p className="text-sm text-neutral-muted leading-relaxed">
              Kami memegang teguh komitmen pengerjaan yang bersih, presisi, jujur, dan bertanggung jawab penuh demi kenyamanan tempat tinggal Anda.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-muted">
            {[
              { title: "Manajemen Terstruktur", desc: "Alur kerja rapi dari diskusi konsep, survey, RAB, produksi workshop, instalasi di lokasi, hingga serah terima kunci." },
              { title: "RAB Jujur & Transparan", desc: "Estimasi anggaran transparan sejak awal. Tidak ada manipulasi spesifikasi bahan maupun biaya kejutan siluman." },
              { title: "Kerapian Finishing", desc: "Potongan siku presisi, sambungan nat bersih, dan instalasi kokoh oleh tukang terlatih di bidangnya masing-masing." },
              { title: "Responsif & Berbasis Lokal", desc: "Berlokasi di Sidareja, Cilacap. Kami sangat mudah dijangkau, siap survey ke lokasi, dan merespons keluhan dengan cepat." }
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2 p-4 bg-white border border-border-premium/50 rounded-xl">
                <span className="font-semibold text-primary text-sm flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-accent" />
                  <span>{item.title}</span>
                </span>
                <p className="leading-relaxed text-[11px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Wilayah Layanan */}
        <section className="mb-24 max-w-3xl">
          <h2 className="text-2xl font-display font-medium text-primary mb-4">Area Layanan Utama</h2>
          <p className="text-sm text-neutral-muted leading-relaxed mb-6">
            Tim kami bermarkas di Sidareja, Cilacap, Jawa Tengah. Kami melayani survei gratis dan pengiriman pengerjaan langsung ke wilayah:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-primary tracking-wider uppercase text-center">
            {["Sidareja", "Tegalsari", "Cipari", "Kedungreja"].map((loc) => (
              <div key={loc} className="flex items-center justify-center gap-2 bg-accent-light/40 border border-border-premium/45 py-3 px-4 rounded-xl">
                <MapPin size={12} className="text-accent" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-muted mt-4 italic">
            *Untuk daerah lain di Kabupaten Cilacap (Gandrungmangu, Karangpucung, Cilacap Kota, dll) silakan konsultasikan terlebih dahulu skala pengerjaannya.
          </p>
        </section>

        {/* Alur Kerja */}
        <section className="bg-primary text-white rounded-[40px] p-8 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Proses Pengerjaan</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium leading-tight">
              Alur Kerja Terkoordinasi & Tenang
            </h2>
            <p className="text-neutral-muted text-sm leading-relaxed max-w-xl">
              Kami membagi proses pengerjaan menjadi tahapan terstruktur agar Anda selalu mengetahui kemajuan proyek Anda dengan transparan.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl my-4">
              {process.map((step, index) => (
                <span key={step} className="text-xs font-medium bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                  <span className="text-accent font-bold">{index + 1}.</span>
                  <span>{step}</span>
                </span>
              ))}
            </div>

            <a 
              href={wa} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg shadow-accent/20 transition-all group mt-2"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={16} />
              <span>Konsultasi Proyek Sekarang</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, ArrowUpRight, Camera } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

interface PortfolioClientProps {
  portfolio: any[];
}

export default function PortfolioClient({ portfolio }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(portfolio.map((item) => item.category)))];

  const filteredPortfolio = selectedCategory === "Semua" 
    ? portfolio 
    : portfolio.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary font-medium">Portofolio</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 w-fit mb-2">
            <Camera size={12} className="text-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Galeri Realisasi Nyata
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Portofolio Proyek &amp; Studi Kasus Konstruksi
          </h1>
          <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
            Eksplorasi dokumentasi pengerjaan asli kami di lapangan. Kami menyertakan deskripsi detail material, perkiraan durasi pengerjaan, serta lokasi pemasangan sebagai inspirasi tepercaya untuk properti Anda.
          </p>
        </header>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border-premium/30 pb-6">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-[2px] text-xs font-semibold uppercase tracking-wide transition-all focus:outline-none cursor-pointer ${
                  isActive 
                    ? "bg-primary text-white border border-primary shadow-sm" 
                    : "bg-white border border-border-premium hover:border-accent text-neutral-muted hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={item.title}
                className="bg-white border border-border-premium/50 rounded-[2px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-500 flex flex-col h-full"
              >
                <div className="h-[240px] relative w-full overflow-hidden bg-accent-light/10">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-750" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-xs uppercase font-semibold tracking-luxury-sm text-accent px-3 py-1.5 rounded-[2px] border border-border-premium/25 shadow-sm">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/85 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-[2px] border border-white/5">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs uppercase font-semibold tracking-wide text-neutral-muted flex items-center gap-1.5">
                      <MapPin size={10} className="text-accent" />
                      <span>{item.location}</span>
                    </span>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3">
                      {item.material}.
                    </p>
                    <div className="text-xs text-neutral-muted bg-accent-light/50 border border-border-premium/25 px-3.5 py-2.5 rounded-[2px] mt-2 flex items-center gap-1.5 font-medium">
                      <span className="text-accent uppercase tracking-luxury-sm font-semibold">Durasi:</span>
                      <span>{item.duration} pengerjaan</span>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-border-premium/20 pt-4 mt-2">
                    <Link
                      href={`/portofolio/${item.slug}`}
                      className="flex-1 text-center py-2.5 border border-border-premium hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-white text-xs font-semibold uppercase tracking-wide rounded-[2px] transition-all duration-300 flex items-center justify-center gap-1 group"
                    >
                      <span>Studi Kasus</span>
                      <ArrowUpRight size={11} className="opacity-70 group-hover:opacity-100" />
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Eko Suyanto Workshop, saya melihat portofolio proyek ${item.title} di website Anda dan ingin menanyakan estimasi harga untuk pengerjaan serupa.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark text-xs font-semibold uppercase tracking-wide rounded-[2px] shadow-sm transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <Phone size={11} />
                      <span>Tanya Proyek</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Block */}
        <section className="bg-white text-primary rounded-[2px] overflow-hidden p-8 sm:p-16 text-center mt-24 relative border border-border-premium/50 shadow-premium">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-primary">
              Ingin Mewujudkan Pengerjaan Serupa untuk Rumah Anda?
            </h2>
            <p className="text-neutral-muted text-sm sm:text-base leading-relaxed max-w-xl">
              Kami siap mengirim tim spesialis ke lokasi untuk melakukan survei pengukuran dan merancang Rencana Anggaran Biaya (RAB) yang jujur, transparan, dan detail.
            </p>
            <a 
              href={whatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark px-8 py-4 rounded-[2px] text-xs font-semibold uppercase tracking-wide shadow-lg transition-all group mt-2 cursor-pointer"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={13} />
              <span>Survei Lokasi &amp; Konsultasi Gratis</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

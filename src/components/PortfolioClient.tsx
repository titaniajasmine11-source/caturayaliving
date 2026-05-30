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
    <div className="bg-white min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Portofolio</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Camera size={14} className="text-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Galeri Realisasi Nyata
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Portofolio Proyek & Studi Kasus Konstruksi
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Eksplorasi dokumentasi pengerjaan asli kami di lapangan. Kami menyertakan deskripsi detail material, perkiraan durasi pengerjaan, serta lokasi pemasangan sebagai inspirasi tepercaya untuk properti Anda.
          </p>
        </header>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-border-premium/20 pb-6">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none ${
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/10" 
                    : "bg-accent-light/40 border border-border-premium/50 hover:border-accent/40 text-neutral-muted hover:text-primary"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={item.title}
                className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-[240px] relative w-full overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-accent px-3.5 py-1.5 rounded-full border border-white/50 shadow-sm">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary/85 backdrop-blur text-white text-[10px] uppercase font-semibold px-3 py-1 rounded-md">
                    0{index + 1}
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-muted flex items-center gap-1.5">
                      <MapPin size={11} className="text-accent" />
                      <span>{item.location}</span>
                    </span>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed line-clamp-3">
                      {item.material}.
                    </p>
                    <div className="text-[11px] text-neutral-muted bg-accent-light/10 border border-border-premium/20 px-3 py-2 rounded-xl mt-2 flex items-center gap-1.5">
                      <span className="text-accent font-bold">Durasi:</span>
                      <span>{item.duration} pengerjaan</span>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-border-premium/30 pt-4 mt-2">
                    <Link
                      href={`/portofolio/${item.slug}`}
                      className="flex-1 text-center py-2.5 bg-primary-dark/5 hover:bg-primary-dark hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 group"
                    >
                      <span>Studi Kasus</span>
                      <ArrowUpRight size={12} className="opacity-70 group-hover:opacity-100" />
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Caturaya Living, saya melihat portofolio proyek ${item.title} di website Anda dan ingin menanyakan estimasi harga untuk pengerjaan serupa.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Phone size={12} />
                      <span>Tanya Proyek</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Block */}
        <section className="bg-primary text-white rounded-[40px] overflow-hidden p-8 sm:p-16 text-center mt-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
            <h2 className="text-2xl sm:text-3xl font-display font-medium leading-tight">
              Ingin Mewujudkan Pengerjaan Serupa untuk Rumah Anda?
            </h2>
            <p className="text-neutral-muted text-sm leading-relaxed">
              Kami siap mengirim tim spesialis ke lokasi untuk melakukan survei pengukuran dan merancang Rencana Anggaran Biaya (RAB) yang jujur, transparan, dan detail.
            </p>
            <a 
              href={whatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg shadow-accent/20 transition-all group mt-2"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={16} />
              <span>Survei Lokasi & Konsultasi Gratis</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

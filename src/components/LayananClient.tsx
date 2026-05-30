"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Phone, ArrowRight, ArrowUpRight, Compass, Shield, Hammer, Wrench, Paintbrush, Sofa, Home } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

const categoryIconMap: Record<string, React.ComponentType<any>> = {
  Hammer,
  Wrench,
  Paintbrush,
  Sofa,
  Home
};

interface LayananClientProps {
  allServices: any[];
  serviceCategories: any[];
}

export default function LayananClient({
  allServices,
  serviceCategories
}: LayananClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || serviceCategories[0].id;
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("kategori");
    if (cat && serviceCategories.some(c => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams, serviceCategories]);

  // Filter services by category
  const activeCategoryData = serviceCategories.find(c => c.id === activeCategory);
  const filteredServices = allServices.filter(
    (s) => s.category === activeCategory || (activeCategoryData?.services.includes(s.slug))
  );

  return (
    <div className="bg-white min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Layanan</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Compass size={14} className="text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Portal Layanan Lengkap
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Solusi Satu Atap — Interior, Eksterior & Konstruksi Sipil
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Caturaya Living mengelola proyek properti Anda dari konsep hingga terpasang rapi. Tukang kayu, spesialis aluminium, instalatur PVC/HPL, dan tukang bangunan dikoordinasikan secara profesional di bawah satu pintu manajemen.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="border-b border-border-premium/50 mb-12 overflow-x-auto hide-scrollbar">
          <div className="flex gap-8 min-w-max pb-1">
            {serviceCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const IconComponent = categoryIconMap[cat.icon] || Compass;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-sm font-semibold tracking-wider uppercase pb-4 relative transition-colors focus:outline-none ${
                    isActive ? "text-accent font-bold" : "text-neutral-muted hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <IconComponent size={16} className={isActive ? "text-accent" : "text-neutral-muted group-hover:text-primary"} />
                    <span>{cat.label}</span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeLayananTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Intro Banner */}
        {activeCategoryData && (
          <div className="bg-accent-light/30 border border-border-premium/40 p-6 sm:p-8 rounded-3xl mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
                <span>Kategori:</span>
                <span className="bg-accent/15 px-2 py-0.5 rounded-md font-semibold">{activeCategoryData.label}</span>
              </span>
              <p className="text-sm text-neutral-muted leading-relaxed max-w-xl">
                {activeCategoryData.description}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 text-xs font-semibold text-primary uppercase tracking-widest bg-white border border-border-premium/65 px-4 py-2 rounded-xl shadow-sm">
              <Shield size={14} className="text-accent mt-0.5" />
              <span>Garansi Kerapian Pengerjaan</span>
            </div>
          </div>
        )}

        {/* Services Grid with animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={service.slug}
                className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-[220px] relative w-full overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs uppercase font-bold tracking-widest text-accent px-3 py-1 rounded-full border border-white/50 flex items-center gap-1.5">
                    {activeCategoryData && (() => {
                      const CardIcon = categoryIconMap[activeCategoryData.icon] || Compass;
                      return <CardIcon size={12} className="text-accent" />;
                    })()}
                    <span>{activeCategoryData?.label}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                    <p className="text-[11px] text-neutral-muted italic font-medium leading-relaxed bg-accent-light/10 border border-border-premium/20 p-3 rounded-xl mt-1">
                      {service.detail}
                    </p>

                    {/* Benefits Tags */}
                    {service.benefits && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {service.benefits.slice(0, 3).map((b: string) => (
                          <span key={b} className="text-[10px] bg-accent-light/40 border border-border-premium/30 px-2 py-0.5 rounded text-neutral-muted">
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 border-t border-border-premium/30 pt-4 mt-2">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="flex-1 text-center py-2.5 bg-primary-dark/5 hover:bg-primary-dark hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Detail Info
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai pengerjaan ${service.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Phone size={12} />
                      <span>Tanya WA</span>
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
              Belum Menemukan Spesifikasi Layanan yang Sesuai?
            </h2>
            <p className="text-neutral-muted text-sm leading-relaxed">
              Ceritakan kondisi rumah atau properti Anda secara rinci ke kami. Caturaya Living melayani pengerjaan sipil renovasi, pembuatan interior butik kustom, hingga fasad luar ruangan terpadu. Hubungi kami secara gratis.
            </p>
            <a 
              href={whatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg shadow-accent/20 transition-all group"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={16} />
              <span>Mulai Konsultasi Gratis</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

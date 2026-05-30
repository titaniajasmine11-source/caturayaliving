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
    <div className="bg-accent-light min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary font-medium">Layanan</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 border-b border-accent/30 pb-1 w-fit mb-2">
            <Compass size={12} className="text-accent animate-spin-slow" />
            <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent">
              Portal Layanan Lengkap
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.1]">
            Solusi Satu Atap — Interior, Eksterior & Konstruksi Sipil
          </h1>
          <p className="text-sm sm:text-base text-neutral-muted leading-relaxed">
            Eko Suyanto Workshop mengelola proyek properti Anda dari konsep hingga terpasang rapi. Tukang kayu, spesialis aluminium, instalatur PVC/HPL, dan tukang bangunan dikoordinasikan secara profesional di bawah satu pintu manajemen.
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
                  className={`text-[13px] font-semibold tracking-luxury-sm uppercase pb-4 relative transition-colors focus:outline-none cursor-pointer ${
                    isActive ? "text-accent" : "text-neutral-muted hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <IconComponent size={14} className={isActive ? "text-accent" : "text-neutral-muted"} />
                    <span>{cat.label}</span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeLayananTab"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
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
          <div className="bg-white border border-border-premium/45 p-6 sm:p-8 rounded-[2px] mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left shadow-sm">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-luxury-sm text-accent flex items-center gap-1.5">
                <span>Kategori:</span>
                <span className="bg-accent/5 border border-accent/15 px-2 py-0.5 rounded-[2px] font-semibold">{activeCategoryData.label}</span>
              </span>
              <p className="text-sm text-neutral-muted leading-relaxed max-w-xl">
                {activeCategoryData.description}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 text-xs font-semibold text-primary uppercase tracking-wide bg-accent-light/30 border border-border-premium/65 px-4 py-2 rounded-[2px]">
              <Shield size={12} className="text-accent mt-0.5" />
              <span>Garansi Kerapian Pengerjaan</span>
            </div>
          </div>
        )}

        {/* Services Grid with animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={service.slug}
                className="bg-white border border-border-premium/50 rounded-[2px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-500 flex flex-col h-full"
              >
                <div className="h-[220px] relative w-full overflow-hidden bg-accent-light/10">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill 
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-750" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-xs uppercase font-semibold tracking-wide text-accent px-3 py-1.5 rounded-[2px] border border-border-premium/30 shadow-sm flex items-center gap-1.5">
                    {activeCategoryData && (() => {
                      const CardIcon = categoryIconMap[activeCategoryData.icon] || Compass;
                      return <CardIcon size={10} className="text-accent" />;
                    })()}
                    <span>{activeCategoryData?.label}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-muted leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>
                    <p className="text-[13px] text-neutral-muted italic font-medium leading-relaxed bg-accent-light/40 border border-border-premium/20 p-3.5 rounded-[2px] mt-1">
                      {service.detail}
                    </p>

                    {/* Benefits Tags */}
                    {service.benefits && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {service.benefits.slice(0, 3).map((b: string) => (
                          <span key={b} className="text-xs uppercase tracking-luxury-sm bg-accent-light/70 border border-border-premium/30 px-2 py-0.5 rounded-[2px] text-neutral-muted font-medium">
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 border-t border-border-premium/20 pt-4 mt-2">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="flex-1 text-center py-2.5 border border-border-premium hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-white text-xs font-semibold uppercase tracking-wide rounded-[2px] transition-all duration-300"
                    >
                      Detail Info
                    </Link>
                    <a
                      href={whatsappUrl(`Halo Eko Suyanto Workshop, saya ingin berkonsultasi mengenai pengerjaan ${service.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark text-xs font-semibold uppercase tracking-wide rounded-[2px] shadow-sm transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <Phone size={11} />
                      <span>Tanya WA</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Block */}
        <section className="bg-primary text-white rounded-[2px] overflow-hidden p-8 sm:p-16 text-center mt-24 relative border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6 items-center">
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
              Belum Menemukan Spesifikasi Layanan yang Sesuai?
            </h2>
            <p className="text-neutral-muted text-sm sm:text-base leading-relaxed max-w-xl">
              Ceritakan kondisi rumah atau properti Anda secara rinci ke kami. Eko Suyanto Workshop melayani pengerjaan sipil renovasi, pembuatan interior butik kustom, hingga fasad luar ruangan terpadu. Hubungi kami secara gratis.
            </p>
            <a 
              href={whatsappUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary hover:text-primary-dark px-8 py-4 rounded-[2px] text-xs font-semibold uppercase tracking-wide shadow-lg transition-all group mt-2"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              <Phone size={13} />
              <span>Mulai Konsultasi Gratis</span>
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Shield,
  CheckCircle,
  MapPin,
  Sparkles,
  ChevronDown,
  Hammer,
  Users,
  Compass,
  ArrowUpRight,
  Heart,
  Layers,
  Sparkle
} from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import { serviceCategories, designStages, process } from "@/lib/content";

interface HomeClientProps {
  articles: any[];
  services: any[];
  portfolio: any[];
  areas: any[];
  faqs: any[];
  testimonials: any[];
}

export default function HomeClient({
  articles,
  services,
  portfolio,
  areas,
  faqs,
  testimonials
}: HomeClientProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const wa = whatsappUrl();

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  // Re-map 4 primary collections based on the Elm & Meadow look
  const collectionCollections = [
    {
      category: "Desain Interior",
      title: "Living Room Custom",
      image: "/images/areas/living-room/hero-living-room.webp",
      desc: "Backdrop TV panel kayu HPL, kabinet storage tersembunyi, & lighting aksen hangat.",
      slug: "interior-custom"
    },
    {
      category: "Dapur Butik",
      title: "Kitchen Set Custom",
      image: "/images/services/kitchen-set/hero-kitchen-set.webp",
      desc: "Kabinet presisi multipleks HPL premium, top table granit, and laci soft-close.",
      slug: "kitchen-set-custom"
    },
    {
      category: "Fabrikasi Aluminium",
      title: "Kusen Aluminium",
      image: "/images/services/kusen-aluminium/hero-kusen-aluminium.webp",
      desc: "Frame kusen aluminium graphite presisi, kokoh, kedap, & tahan lembap cuaca.",
      slug: "kusen-aluminium"
    },
    {
      category: "Struktur Eksterior",
      title: "Kanopi Minimalis",
      image: "/images/services/kanopi/hero-kanopi.webp",
      desc: "Kanopi carport kaca tempered tebal atau atap alderon dengan rangka baja graphite hitam.",
      slug: "kanopi"
    }
  ];

  return (
    <div className="bg-accent-light text-neutral-text min-h-screen">
      
      {/* ── 1. Hero Section (Elm & Meadow Styled) ── */}
      <section className="relative min-h-[95vh] flex items-center pt-28 pb-32 border-b border-border-premium/40 bg-accent-light">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Clean Editorial Typography */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-6 items-start"
          >
            <motion.div 
              variants={fadeIn} 
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full"
            >
              <Sparkle size={12} className="text-accent animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent leading-none">
                Mitra Kontraktor Terpercaya Anda
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-[54px] font-display font-medium text-primary tracking-tight leading-[1.1] max-w-md"
            >
              Create Your Ideal Living Space
            </motion.h1>

            <motion.p 
              variants={fadeIn} 
              className="text-sm sm:text-base text-neutral-muted leading-relaxed max-w-sm"
            >
              Solusi satu pintu pengerjaan kusen kayu & aluminium, perabotan kustom, kitchen set butik, plafon, hingga renovasi sipil bangunan di Sidareja, Cilacap.
            </motion.p>

            <motion.div variants={fadeIn} className="pt-2">
              <a 
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-md shadow-accent/15 hover:shadow-accent/25 transition-all duration-300"
                href={wa} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discover More
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean Lit Interior Photograph */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative h-[450px] sm:h-[550px] w-full rounded-[40px] overflow-hidden shadow-premium border border-border-premium/50 group"
          >
            <Image 
              src="/images/home/hero-home-interior.webp" 
              alt="Caturaya Living Premium Interior Setup" 
              fill 
              sizes="(max-width: 980px) 100vw, 60vw"
              className="object-cover transition-transform duration-[12s] group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Three Overlapping Value Cards (Elm & Meadow Styled) ── */}
      <section className="relative z-20 -mt-20 sm:-mt-24 mb-24 max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { 
              icon: <Layers size={18} />, 
              title: "Timeless Design", 
              desc: "Desain interior & eksterior yang tak lekang oleh waktu, menyatukan kehangatan kayu alami dan kepraktisan minimalis modern." 
            },
            { 
              icon: <Heart size={18} />, 
              title: "Relaxed Comfort", 
              desc: "Setiap sudut dirancang presisi untuk kenyamanan maksimal keluarga Anda, dari efisiensi sirkulasi dapur hingga keindahan fasad." 
            },
            { 
              icon: <Sparkle size={18} />, 
              title: "Curated Decor", 
              desc: "Pilihan material premium (kayu jati solid, aluminium kustom graphite, finishing HPL kustom) yang dikurasi khusus oleh tim spesialis." 
            },
          ].map((item) => (
            <motion.div 
              variants={fadeIn}
              key={item.title}
              className="bg-white rounded-[36px] p-8 sm:p-10 shadow-premium border border-border-premium/50 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-accent/10 border border-accent/15 rounded-xl shadow-sm text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                {item.icon}
              </div>
              <h3 className="text-lg font-display font-medium text-primary pt-2">{item.title}</h3>
              <p className="text-xs text-neutral-muted leading-relaxed">{item.desc}</p>
              
              <Link 
                href="/layanan" 
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-full mt-4 transition-colors"
              >
                <span>Shop Now</span>
                <ArrowRight size={10} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 3. Explore Our Collections Grid (Elm & Meadow Styled 4-Column) ── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-3 mb-16 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Layanan Unggulan</span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">Explore Our Collections</h2>
          <div className="w-8 h-[1px] bg-accent mx-auto mt-2"></div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collectionCollections.map((col) => (
            <motion.article 
              variants={fadeIn}
              key={col.title}
              className="bg-white border border-border-premium/50 rounded-[32px] p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full group"
            >
              {/* Vertical Rectangular Image */}
              <div className="h-[280px] w-full relative rounded-2xl overflow-hidden mb-5">
                <Image 
                  src={col.image} 
                  alt={col.title}
                  fill 
                  sizes="(max-width: 980px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              {/* Caption */}
              <div className="flex flex-col gap-2 flex-1 justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-accent font-sans">{col.category}</span>
                  <h3 className="text-base font-display font-medium text-primary group-hover:text-accent transition-colors leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-[11px] text-neutral-muted leading-relaxed line-clamp-3">
                    {col.desc}
                  </p>
                </div>
                
                <a 
                  href={whatsappUrl(`Halo Caturaya Living, saya tertarik dengan layanan ${col.title} dan ingin menanyakan estimasi awal.`)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 w-full py-2.5 bg-accent/5 hover:bg-accent text-accent hover:text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-all mt-4"
                >
                  <span>View More</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── 4. Bento Grid Layanan Seluruh Bidang ── */}
      <section className="py-24 bg-primary text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-neutral/20 via-primary-dark to-primary-dark pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Layanan Lengkap</span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                Koordinasikan Semua Kebutuhan Properti Anda
              </h2>
            </div>
            <Link 
              href="/layanan" 
              className="group flex items-center gap-2 border border-white/20 hover:border-accent hover:text-accent px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <span>Lihat Seluruh Layanan</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {serviceCategories.map((cat, index) => {
              const spanning = 
                index === 0 ? "md:col-span-7 h-[360px]" :
                index === 1 ? "md:col-span-5 h-[360px]" :
                index === 2 ? "md:col-span-4 h-[330px]" :
                index === 3 ? "md:col-span-4 h-[330px]" :
                "md:col-span-4 h-[330px]";
              
              const bgImages = [
                "/images/services/kusen-kayu/hero-kusen-kayu.png",
                "/images/services/kusen-aluminium/hero-kusen-aluminium.webp",
                "/images/services/hpl-finishing/hero-hpl-finishing.png",
                "/images/services/kitchen-set/hero-kitchen-set.webp",
                "/images/services/jasa-bangunan/hero-jasa-bangunan.png"
              ];

              return (
                <motion.article 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  key={cat.id}
                  className={`${spanning} relative rounded-[32px] overflow-hidden group shadow-lg border border-white/5 flex flex-col justify-end p-8`}
                >
                  <div className="absolute inset-0 bg-primary-dark z-0 pointer-events-none">
                    <Image 
                      src={bgImages[index] || "/images/home/hero-home-interior.webp"} 
                      alt={cat.label}
                      fill
                      className="object-cover opacity-25 group-hover:opacity-30 group-hover:scale-105 transition-all duration-[6s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="text-lg font-display font-medium text-white group-hover:text-accent transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-[11px] text-neutral-muted leading-relaxed max-w-sm">
                      {cat.description}
                    </p>
                    <Link 
                      href={`/layanan?kategori=${cat.id}`}
                      className="text-[10px] font-bold uppercase tracking-wider text-accent group-hover:text-white flex items-center gap-1 mt-2 transition-colors w-fit"
                    >
                      <span>Pelajari Layanan</span>
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Jaringan Tim Spesialis & Full Contractor ── */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="tim">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Parallax Image */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[550px] w-full group rounded-[36px] overflow-hidden border border-border-premium/50 shadow-premium">
            <Image
              src="/images/home/tim-kontraktor.png"
              alt="Tim spesialis Caturaya Living"
              fill
              sizes="(max-width: 980px) 100vw, 40vw"
              className="object-cover transition-transform duration-[8s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl border border-white/50 shadow-sm z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-accent block mb-1">Manajemen Terstruktur</span>
              <p className="text-[10px] text-neutral-muted leading-tight">Mengkoordinasikan tim spesialis kusen kayu, aluminium, HPL finishing, & bangunan sipil di Cilacap.</p>
            </div>
          </div>

          {/* Right Side: Specialists List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Tim Spesialis Kami</span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary leading-tight">
                Mitra Tukang Berpengalaman di Bidangnya
              </h2>
              <div className="w-8 h-[1px] bg-accent mt-2"></div>
            </div>
            
            <p className="text-sm text-neutral-muted leading-relaxed">
              Caturaya Living mempersatukan jaringan mitra tukang ahli Sidareja yang terampil bertahun-tahun di bidangnya. Semua tim dikoordinasikan langsung agar pengerjaan properti Anda selesai rapi, kokoh, and sesuai desain impian.
            </p>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {site.teamSpecialists.map((spec) => (
                <motion.div 
                  variants={fadeIn}
                  key={spec.role} 
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-border-premium/55 hover:border-accent/25 transition-all duration-300 shadow-sm"
                >
                  <span className="text-2xl mt-0.5 select-none">{spec.icon}</span>
                  <div className="flex flex-col gap-1">
                    <strong className="text-xs font-semibold text-primary">{spec.role}</strong>
                    <p className="text-[11px] text-neutral-muted leading-relaxed">{spec.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Area Rumah Slider ── */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Zonasi Area Rumah</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
              Pilih Bagian Rumah yang Ingin Dipercantik
            </h2>
          </div>
        </div>

        <div className="w-full overflow-x-auto py-4 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 px-6 w-max">
            {areas.map((area, idx) => (
              <Link 
                href={`/area-rumah/${area.slug}`} 
                key={area.slug}
                className="w-[280px] sm:w-[320px] h-[200px] relative rounded-[32px] overflow-hidden group shadow-premium flex flex-col justify-end p-6 border border-white/5"
              >
                <div className="absolute inset-0 bg-primary-dark z-0 pointer-events-none">
                  <Image 
                    src={area.image || "/images/home/hero-home-interior.webp"} 
                    alt={area.title}
                    fill
                    className="object-cover opacity-35 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[6s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-1">0{idx + 1}</span>
                  <h3 className="text-base font-display font-medium text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>{area.title}</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Portofolio Proyek ── */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="portofolio">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Katalog Portofolio</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">
              Hasil Realisasi Nyata Tim Caturaya Living
            </h2>
          </div>
          <Link 
            href="/portofolio" 
            className="group flex items-center gap-2 border border-primary/20 hover:border-accent hover:text-accent px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300"
          >
            <span>Lihat Semua Portofolio</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolio.slice(0, 6).map((item, index) => (
            <motion.article 
              variants={fadeIn}
              className="bg-white border border-border-premium/50 rounded-[32px] overflow-hidden group shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col h-full"
              key={item.title}
            >
              <div className="h-[230px] relative w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill 
                  sizes="(max-width: 980px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-accent px-3 py-1 rounded-full border border-white/50 shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-8 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-muted flex items-center gap-1.5">
                    <MapPin size={10} className="text-accent" />
                    <span>{item.location}</span>
                  </span>
                  <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-muted leading-relaxed line-clamp-3">
                    {item.material}.
                  </p>
                </div>
                
                <Link 
                  href={`/portofolio/${item.slug}`}
                  className="text-[10px] font-bold uppercase tracking-wider text-primary border-t border-border-premium/30 pt-4 flex items-center gap-1.5 group-hover:text-accent transition-colors mt-4 w-fit"
                >
                  <span>Lihat Studi Kasus</span>
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── 8. FAQ Accordion (Premium Animated) ── */}
      <section className="py-24 bg-accent-light border-t border-b border-border-premium/50" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Tanya Jawab</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-primary">
              Pertanyaan yang Sering Diajukan Customer
            </h2>
            <div className="w-8 h-[1px] bg-accent mx-auto mt-2"></div>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={faq.question}
                  className="bg-white border border-border-premium/50 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-accent/30"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-primary gap-4 focus:outline-none text-sm"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-accent flex-shrink-0"
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs text-neutral-muted leading-relaxed border-t border-border-premium/20 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Editorial Testimonial ── */}
      <section className="py-24 bg-primary text-accent-light relative">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Testimonial</span>
          
          <figure className="flex flex-col gap-4">
            <span className="text-5xl font-display text-accent select-none leading-none">“</span>
            <blockquote className="text-lg sm:text-xl font-display italic leading-relaxed max-w-2xl mx-auto text-white">
              Awalnya saya pikir harus cari banyak tukang berbeda. Ternyata cukup hubungi Caturaya Living, semua dikoordinasi — dari kusen, kitchen set, sampai plafon. Hasilnya rapi dan selesai tepat waktu.
            </blockquote>
            <div className="w-8 h-[1px] bg-accent mx-auto mt-2"></div>
            <figcaption className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Bapak Heri – Sidareja
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── 10. Kontak & Konsultasi ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-border-premium/50" id="kontak">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Konsultasi</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary leading-tight">
              Mulai Konsultasikan Proyek Properti Anda Sekarang
            </h2>
            <p className="text-sm text-neutral-muted leading-relaxed">
              Ceritakan ide pengerjaan properti Anda, kirim ukuran aktual atau foto lokasi jika ada. Tim Caturaya Living siap mewujudkan pengerjaan yang kokoh, fungsional, dan bernilai seni tinggi.
            </p>
            <div className="flex flex-col gap-4 text-xs text-neutral-muted mt-2">
              <div className="flex gap-2">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Sidareja, Cilacap, Jawa Tengah</strong><br />
                  Melayani pesanan area Sidareja, Tegalsari, Cipari, Kedungreja, Gandrungmangu, hingga Cilacap kota.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border border-border-premium/65 rounded-3xl p-8 flex flex-col gap-6 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
              <h3 className="text-base font-semibold text-primary">Kontak Konsultasi Cepat</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs border-b border-border-premium/30 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-muted uppercase tracking-wider font-bold">Tholib (WhatsApp Utama)</span>
                    <span className="font-semibold text-primary pt-0.5">{site.phonePrimaryLabel}</span>
                  </div>
                  <a 
                    href={whatsappUrl(undefined, site.phonePrimary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    <Phone size={14} />
                  </a>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-border-premium/30 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-muted uppercase tracking-wider font-bold">Eko (WhatsApp Alternatif)</span>
                    <span className="font-semibold text-primary pt-0.5">{site.phoneSecondaryLabel}</span>
                  </div>
                  <a 
                    href={whatsappUrl(undefined, site.phoneSecondary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </div>

              <a 
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-primary hover:bg-accent text-white text-center rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Mulai Konsultasi Online Gratis
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

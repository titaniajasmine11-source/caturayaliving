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
  Clock,
  MapPin,
  Sparkles,
  ChevronDown,
  Hammer,
  Wrench,
  Users,
  Compass,
  ArrowUpRight
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white text-neutral-text">
      {/* ── 1. Hero Section ── */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 bg-gradient-to-b from-accent-light/50 via-white to-white border-b border-border-premium/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Headline copy */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles size={14} className="text-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Full Kontraktor Properti · Sidareja, Cilacap
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1]"
            >
              Satu Kontraktor untuk <span className="font-display italic text-accent font-normal">Semua</span> Kebutuhan Properti Anda
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base sm:text-lg text-neutral-muted leading-relaxed max-w-xl">
              Dari kusen kayu & aluminium, perabotan rumah custom, kitchen set, HPL finishing, plafon, kanopi, hingga jasa bangunan — Caturaya Living koordinasikan semua tim spesialis untuk Anda, tanpa perlu cari banyak tukang.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                className="flex items-center justify-center gap-2.5 bg-primary hover:bg-accent text-white px-8 py-4 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-primary/15 hover:shadow-accent/20 transition-all duration-300 group"
                href={wa} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Phone size={16} />
                <span>Konsultasi Gratis via WhatsApp</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                className="flex items-center justify-center gap-2 border border-primary/20 hover:border-accent hover:text-accent px-8 py-4 rounded-xl text-sm font-semibold tracking-wide transition-colors"
                href="/portofolio"
              >
                <span>Lihat Portofolio</span>
              </Link>
            </motion.div>
            
            {/* Quick Service Tags */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-2 pt-4">
              {["Kusen Kayu & Aluminium", "Kitchen Set", "Perabotan Custom", "HPL Finishing", "Plafon", "Kanopi", "Jasa Bangunan", "Renovasi Total"].map(tag => (
                <span key={tag} className="text-xs font-medium bg-neutral-100/70 border border-neutral-200/50 px-3 py-1 rounded-md text-neutral-muted">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Collage with zoom effects */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative grid grid-cols-12 gap-4 h-[500px] sm:h-[600px] w-full"
          >
            {/* Floating luxury stats badge */}
            <div className="absolute top-8 left-8 z-20 glassmorphism p-4 rounded-2xl shadow-premium border border-white/40 flex flex-col gap-1 max-w-[150px]">
              <span className="text-2xl font-display font-bold text-accent">100+</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary leading-tight">Proyek Selesai di Cilacap</span>
            </div>

            {/* Main large image */}
            <div className="col-span-8 h-full relative rounded-3xl overflow-hidden shadow-premium group border border-border-premium/50">
              <Image 
                src="/images/home/hero-home-interior.webp" 
                alt="Fasad arsitektural premium Caturaya Living" 
                fill 
                sizes="(max-width: 980px) 100vw, 50vw"
                className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            </div>

            {/* Two secondary images on right */}
            <div className="col-span-4 flex flex-col gap-4 h-full justify-between">
              <div className="h-[48%] relative rounded-3xl overflow-hidden shadow-premium group border border-border-premium/50">
                <Image 
                  src="/images/services/kusen-kayu/hero-kusen-kayu.png" 
                  alt="Kusen kayu jati solid Caturaya Living" 
                  fill 
                  sizes="(max-width: 980px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                />
              </div>
              <div className="h-[48%] relative rounded-3xl overflow-hidden shadow-premium group border border-border-premium/50">
                <Image 
                  src="/images/services/kitchen-set/hero-kitchen-set.webp" 
                  alt="Kitchen set custom modern Caturaya Living" 
                  fill 
                  sizes="(max-width: 980px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Keunggulan Strip ── */}
      <section className="bg-primary py-8 text-white select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-x-12 gap-y-4 justify-between items-center text-xs font-semibold uppercase tracking-widest text-accent-light/70">
          <span className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Satu Kontraktor, Semua Tim</span>
          <span className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Survei Lokasi Gratis</span>
          <span className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> RAB Transparan</span>
          <span className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Custom Sesuai Ukuran</span>
          <span className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> WhatsApp Fast Response</span>
        </div>
      </section>

      {/* ── 3. Why Full Contractor Bento Grid ── */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="kenapa-kami">
        <div className="flex flex-col gap-4 mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Mengapa Caturaya Living?</span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">
            Satu Pintu untuk Semua Kebutuhan — dari Bangunan hingga Detail Interior
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { icon: <Users className="text-accent" size={24} />, title: "Satu Koordinator, Banyak Tim", desc: "Tidak perlu repot cari tukang kayu, aluminium, PVC, atau tukang bangunan sendiri. Kami koordinasikan semua tim spesialis." },
            { icon: <Compass className="text-accent" size={24} />, title: "RAB & Estimasi Transparan", desc: "Rencana Anggaran Biaya yang jelas, detail, dan jujur sejak awal. Tidak ada biaya kejutan siluman di tengah proyek." },
            { icon: <Hammer className="text-accent" size={24} />, title: "Tim Spesialis Berpengalaman", desc: "Pekerjaan ditangani langsung oleh tukang ahli di bidangnya masing-masing. Jaminan kerapian dan kekuatan konstruksi." },
            { icon: <MapPin className="text-accent" size={24} />, title: "Survei Lokasi Langsung", desc: "Kami meluncur langsung ke rumah Anda di area Sidareja, Cilacap, dan sekitarnya untuk pengukuran presisi & konsultasi tatap muka." },
            { icon: <Wrench className="text-accent" size={24} />, title: "Custom Presisi dari Nol", desc: "Semua diproduksi kustom menyesuaikan karakter ruang, selera desain, ukuran aktual di lokasi, serta budget Anda." },
            { icon: <Shield className="text-accent" size={24} />, title: "Tanggung Jawab & Garansi", desc: "Sebagai kontraktor utama, kami menggaransi kualitas material, instalasi yang aman, dan finishing rapi sampai serah terima." },
          ].map((item, index) => (
            <motion.div 
              variants={fadeIn}
              key={item.title}
              className="bg-accent-light/35 border border-border-premium/50 hover:border-accent/40 p-8 rounded-3xl transition-all duration-300 hover:shadow-premium group hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white border border-border-premium rounded-2xl shadow-sm mb-6 group-hover:scale-110 group-hover:bg-accent/5 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-sm text-neutral-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 4. Bento Grid Layanan Premium ── */}
      <section className="py-24 bg-primary text-white relative" id="layanan">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-neutral/20 via-primary-dark to-primary-dark pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Layanan Lengkap</span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                Semua Bidang Properti — Dari Kusen Kayu, Aluminium, hingga Renovasi Total
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
              // Custom grid spanning to create a premium Bento layout
              const spanning = 
                index === 0 ? "md:col-span-7 h-[380px]" :
                index === 1 ? "md:col-span-5 h-[380px]" :
                index === 2 ? "md:col-span-4 h-[350px]" :
                index === 3 ? "md:col-span-4 h-[350px]" :
                "md:col-span-4 h-[350px]";
              
              // Map categories to real visual imagery
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  key={cat.id}
                  className={`${spanning} relative rounded-3xl overflow-hidden group shadow-lg border border-white/5 flex flex-col justify-end p-8`}
                >
                  {/* Background Image with overlay */}
                  <div className="absolute inset-0 bg-primary-dark z-0 pointer-events-none">
                    <Image 
                      src={bgImages[index] || "/images/home/hero-home-interior.webp"} 
                      alt={cat.label}
                      fill
                      className="object-cover opacity-35 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[6s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="text-xl font-display font-medium text-white group-hover:text-accent transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-neutral-muted leading-relaxed max-w-sm">
                      {cat.description}
                    </p>
                    <Link 
                      href={`/layanan?kategori=${cat.id}`}
                      className="text-xs font-bold uppercase tracking-wider text-accent group-hover:text-white flex items-center gap-1 mt-2 transition-colors w-fit"
                    >
                      <span>Pelajari Layanan</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Jaringan Tim Mitra & Spesialis ── */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="tim">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Editorial Image & Parallax Frame */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[550px] w-full group rounded-3xl overflow-hidden border border-border-premium/50 shadow-premium">
            <Image
              src="/images/home/tim-kontraktor.png"
              alt="Tim spesialis Caturaya Living"
              fill
              sizes="(max-width: 980px) 100vw, 40vw"
              className="object-cover transition-transform duration-[8s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl border border-white/50 shadow-sm z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-accent block mb-1">Koordinasi Satu Pintu</span>
              <p className="text-[11px] text-neutral-muted leading-tight">Mempersatukan tukang kayu, aluminium, HPL finishing, & bangunan di bawah kendali manajemen yang rapi.</p>
            </div>
          </div>

          {/* Right Side: Description & Specialists List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Jaringan Tim Ahli</span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">
                Tukang Berpengalaman Sesuai Spesialisasinya
              </h2>
              <div className="w-12 h-1 bg-accent mt-2"></div>
            </div>
            
            <p className="text-neutral-muted leading-relaxed">
              Caturaya Living bukan sekadar satu tukang serba bisa. Kami bekerja dengan jaringan **mitra spesialis** yang memiliki keahlian tersertifikasi secara alamiah bertahun-tahun di bidangnya. Semua tim dikoordinasikan langsung agar selesai tepat waktu dan presisi.
            </p>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {site.teamSpecialists.map((spec) => (
                <motion.div 
                  variants={fadeIn}
                  key={spec.role} 
                  className="flex gap-4 p-4 rounded-2xl bg-accent-light/20 border border-border-premium/30 hover:border-accent/20 transition-all duration-300"
                >
                  <span className="text-2xl mt-1 select-none">{spec.icon}</span>
                  <div className="flex flex-col gap-1">
                    <strong className="text-sm font-semibold text-primary">{spec.role}</strong>
                    <p className="text-xs text-neutral-muted leading-relaxed">{spec.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. Area Rumah (Horizontal slider/list) ── */}
      <section className="py-24 bg-primary text-white overflow-hidden relative" id="area">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Eksplorasi Area Rumah</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
              Pilih Bagian Rumah yang Ingin Dibangun & Dipercantik
            </h2>
          </div>
        </div>

        {/* Marquee-like horizontal scrollable flex container */}
        <div className="w-full overflow-x-auto py-4 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 px-6 w-max">
            {areas.map((area, idx) => (
              <Link 
                href={`/area-rumah/${area.slug}`} 
                key={area.slug}
                className="w-[280px] sm:w-[320px] h-[200px] relative rounded-3xl overflow-hidden group shadow-premium flex flex-col justify-end p-6 border border-white/5"
              >
                <div className="absolute inset-0 bg-primary-dark z-0 pointer-events-none">
                  <Image 
                    src={area.image || "/images/home/hero-home-interior.webp"} 
                    alt={area.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-45 group-hover:scale-105 transition-all duration-[6s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">0{idx + 1}</span>
                  <h3 className="text-lg font-display font-medium text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
                    <span>{area.title}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Portofolio Proyek Terkini ── */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="portofolio">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Studi Kasus Portofolio</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">
              Hasil Pengerjaan Tim Caturaya Living di Cilacap & Sekitarnya
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
              <div className="h-[240px] relative w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill 
                  sizes="(max-width: 980px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[10px] uppercase font-bold tracking-widest text-accent px-3 py-1 rounded-full border border-white/50">
                  {item.category}
                </div>
              </div>
              <div className="p-8 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-muted flex items-center gap-1.5">
                    <MapPin size={10} className="text-accent" />
                    <span>{item.location}</span>
                  </span>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-muted leading-relaxed">
                    {item.material}.
                  </p>
                </div>
                
                <Link 
                  href={`/portofolio/${item.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-primary border-t border-border-premium/30 pt-4 flex items-center gap-1.5 group-hover:text-accent transition-colors mt-4 w-fit"
                >
                  <span>Lihat Studi Kasus</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── 8. FAQ Section with smooth Accordion ── */}
      <section className="py-24 bg-accent-light/30 border-t border-b border-border-premium/50" id="faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Tanya Jawab</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary">
              Pertanyaan yang Sering Diajukan Customer
            </h2>
            <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
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
                    className="w-full flex items-center justify-between p-6 text-left font-semibold text-primary gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-accent flex-shrink-0"
                    >
                      <ChevronDown size={16} />
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
                        <div className="px-6 pb-6 text-sm text-neutral-muted leading-relaxed border-t border-border-premium/20 pt-4">
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

      {/* ── 9. Testimonial (Editorial Quote Style) ── */}
      <section className="py-24 bg-primary text-accent-light relative">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Testimonial</span>
          
          <figure className="flex flex-col gap-6">
            <span className="text-6xl font-display text-accent select-none leading-none">“</span>
            <blockquote className="text-xl sm:text-2xl font-display font-medium text-white italic leading-relaxed max-w-2xl mx-auto">
              Awalnya saya pikir harus cari banyak tukang berbeda. Ternyata cukup hubungi Caturaya Living, semua dikoordinasi — dari kusen, kitchen set, sampai plafon. Hasilnya rapi dan selesai tepat waktu.
            </blockquote>
            <div className="w-8 h-0.5 bg-accent mx-auto mt-2"></div>
            <figcaption className="text-xs font-bold uppercase tracking-widest text-accent">
              Bapak Heri – Sidareja
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── 10. Kontak & Konsultasi Section ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-border-premium/50" id="kontak">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Hubungi Kami</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-primary leading-tight">
              Mulai Konsultasikan Proyek Properti Impian Anda Hari Ini
            </h2>
            <p className="text-neutral-muted leading-relaxed">
              Ceritakan ide pengerjaan rumah Anda, kirim ukuran aktual atau foto lokasi jika ada. Tim spesialis kami siap mewujudkan pengerjaan yang kokoh, fungsional, dan bernilai seni tinggi.
            </p>
            <div className="flex flex-col gap-4 text-sm text-neutral-muted mt-4">
              <div className="flex gap-2">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Sidareja, Cilacap, Jawa Tengah</strong><br />
                  Melayani pesanan area Sidareja, Tegalsari, Cipari, Kedungreja, Gandrungmangu, hingga Cilacap kota.
                </span>
              </div>
            </div>
          </div>

          {/* Cards Side */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-accent-light/40 border border-border-premium/60 rounded-3xl p-8 flex flex-col gap-6 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
              <h3 className="text-lg font-semibold text-primary">Kontak Konsultasi Cepat</h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm border-b border-border-premium/30 pb-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted uppercase tracking-wider font-bold">Tholib (WhatsApp Utama)</span>
                    <span className="font-semibold text-primary">{site.phonePrimaryLabel}</span>
                  </div>
                  <a 
                    href={whatsappUrl(undefined, site.phonePrimary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    <Phone size={16} />
                  </a>
                </div>

                <div className="flex justify-between items-center text-sm border-b border-border-premium/30 pb-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-muted uppercase tracking-wider font-bold">Eko (WhatsApp Alternatif)</span>
                    <span className="font-semibold text-primary">{site.phoneSecondaryLabel}</span>
                  </div>
                  <a 
                    href={whatsappUrl(undefined, site.phoneSecondary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>

              <a 
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-primary hover:bg-accent text-white text-center rounded-2xl text-sm font-semibold tracking-wide shadow-md transition-colors"
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

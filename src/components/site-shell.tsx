"use client";

import { site, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/area-rumah", label: "Area Rumah" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/simulasi-harga", label: "Simulasi Harga" },
  { href: "/artikel", label: "Artikel" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md py-4 shadow-sm border-b border-border/40"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            className="flex items-center gap-3 font-display text-lg font-bold tracking-wide text-primary"
            href="/"
            aria-label="Caturaya Living Beranda"
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-accent/10 rounded-lg p-1.5 transition-transform duration-300 hover:rotate-12">
              <Image src="/images/logo-caturaya.png" alt="Caturaya Living Logo" width={28} height={28} priority />
            </div>
            <span className="hidden sm:inline-block tracking-widest text-base font-medium">CATURAYA LIVING</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Menu utama">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-accent"
                      : "text-neutral-text hover:text-accent"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeHeaderNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            className="hidden lg:flex items-center gap-2 bg-primary hover:bg-accent text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm shadow-primary/20 hover:shadow-accent/30"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Konsultasi cepat via WhatsApp"
          >
            <Phone size={14} />
            <span>Konsultasi</span>
          </a>

          {/* Hamburger button (Mobile) */}
          <button
            className="lg:hidden text-primary p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Buka menu navigasi"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.href}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-xl font-medium tracking-wide block py-2 border-b border-border/10 ${
                        isActive ? "text-accent font-semibold" : "text-neutral-text"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navigation.length * 0.05 }}
              className="flex flex-col gap-4"
            >
              <a
                className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl text-base font-semibold tracking-wide shadow-lg shadow-accent/20 transition-all duration-300"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Konsultasi cepat via WhatsApp"
              >
                <Phone size={18} />
                <span>Konsultasi WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary-dark text-accent-light pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-6">
            <Link className="flex items-center gap-3 font-display text-xl font-bold tracking-wider text-white" href="/">
              <div className="relative w-9 h-9 flex items-center justify-center bg-white/10 rounded-lg p-1.5">
                <Image src="/images/logo-caturaya.png" alt="Caturaya Living Logo" width={28} height={28} />
              </div>
              <span className="tracking-widest text-base font-medium">CATURAYA LIVING</span>
            </Link>
            <p className="text-neutral-muted text-sm leading-relaxed max-w-xs">
              {site.tagline} Kami berkomitmen memberikan kualitas terbaik dari desain, produksi, hingga instalasi akhir di lokasi.
            </p>
            <address className="not-italic text-sm text-neutral-muted flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Alamat Kantor:</strong><br />
                  {site.address}<br />
                  Kode Lokasi:{" "}
                  <a
                    href={`https://plus.codes/${site.locationCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover underline"
                  >
                    {site.locationCode}
                  </a>
                </span>
              </div>
            </address>
          </div>

          {/* Column 2: Layanan */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Layanan Kami
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-neutral-muted">
              {[
                { href: "/layanan/kusen-aluminium", label: "Kusen Aluminium" },
                { href: "/layanan/kitchen-set-custom", label: "Kitchen Set Custom" },
                { href: "/layanan/plafon-gypsum-pvc", label: "Plafon Gypsum & PVC" },
                { href: "/layanan/kanopi", label: "Kanopi Minimalis" },
                { href: "/layanan/pagar-gerbang", label: "Pagar & Gerbang" },
                { href: "/layanan/interior-custom", label: "Interior Custom" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Area Rumah */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Area Rumah
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-neutral-muted">
              {[
                { href: "/area-rumah/gerbang-pagar", label: "Gerbang & Pagar" },
                { href: "/area-rumah/teras-depan", label: "Teras Depan" },
                { href: "/area-rumah/living-room", label: "Ruang Keluarga" },
                { href: "/area-rumah/kitchen-dapur", label: "Dapur Bersih / Dapur" },
                { href: "/area-rumah/carport-kanopi", label: "Carport & Kanopi" },
                { href: "/area-rumah/ruko-tempat-usaha", label: "Ruko / Tempat Usaha" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent flex items-center gap-1 group">
                    <span>{link.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Hubungi Kami
            </h3>
            <div className="text-sm flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-neutral-muted">
                <span className="text-xs text-white font-medium">WhatsApp Utama (Tholib)</span>
                <a
                  href={whatsappUrl(undefined, site.phonePrimary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover font-semibold tracking-wide flex items-center gap-1.5"
                >
                  <Phone size={14} />
                  <span>{site.phonePrimaryLabel}</span>
                </a>
              </div>
              <div className="flex flex-col gap-1 text-neutral-muted">
                <span className="text-xs text-white font-medium">WhatsApp Alternatif (Eko)</span>
                <a
                  href={whatsappUrl(undefined, site.phoneSecondary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover font-semibold tracking-wide flex items-center gap-1.5"
                >
                  <Phone size={14} />
                  <span>{site.phoneSecondaryLabel}</span>
                </a>
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <span className="text-xs text-white font-medium">Ikuti Sosial Media</span>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/caturayaliving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-muted hover:bg-accent hover:text-white transition-all duration-300"
                    aria-label="Ikuti Caturaya Living di Instagram"
                  >
                    <svg
                      className="w-4 h-4 animate-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/caturayaliving"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-neutral-muted hover:bg-accent hover:text-white transition-all duration-300"
                    aria-label="Ikuti Caturaya Living di Facebook"
                  >
                    <svg
                      className="w-4 h-4 animate-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-muted text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Caturaya Living. Hak Cipta Dilindungi Undang-Undang.</span>
          <span className="tracking-wide">Premium Interior, Aluminium & Fasad Specialist di Sidareja, Cilacap</span>
        </div>
      </div>
    </footer>
  );
}

export function StickyWhatsapp() {
  return (
    <a
      className="fixed bottom-6 right-6 z-40 bg-accent hover:bg-accent-hover text-white flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-xl transition-all duration-300 animate-pulse-subtle"
      href={whatsappUrl("Halo Caturaya Living, saya ingin berkonsultasi mengenai proyek properti saya.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi layanan Caturaya Living via WhatsApp"
    >
      <Phone size={18} />
      <span className="hidden sm:inline">Tanya Kami</span>
    </a>
  );
}

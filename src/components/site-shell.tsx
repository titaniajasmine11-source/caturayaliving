"use client";

import { site, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/header.module.css";
import { useState } from "react";

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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Caturaya Living Beranda">
        <span className={styles.logoMark}>
          <Image src="/images/logo-caturaya.png" alt="Caturaya Living Logo" width={36} height={36} />
        </span>
        <span>Caturaya Living</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className={styles.nav} aria-label="Menu utama">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop CTA */}
      <a 
        className={styles.headerCta} 
        href={whatsappUrl()} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Konsultasi cepat via WhatsApp"
      >
        Konsultasi WhatsApp
      </a>

      {/* Hamburger button (Mobile) */}
      <button 
        className={styles.hamburger} 
        onClick={toggleMenu} 
        aria-label="Buka menu navigasi"
        aria-expanded={isMenuOpen}
        data-active={isMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Drawer Navigation */}
      <div className={styles.mobileNav} data-active={isMenuOpen}>
        <div className={styles.mobileLinks}>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <a 
          className={`${styles.headerCta} ${styles.mobileCta}`} 
          href={whatsappUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Konsultasi cepat via WhatsApp"
        >
          Konsultasi WhatsApp
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Column 1: Brand & Address */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoMark}>
              <Image src="/images/logo-caturaya.png" alt="Caturaya Living Logo" width={32} height={32} />
            </span>
            <span>Caturaya Living</span>
          </div>
          <p className={styles.footerDesc}>
            {site.tagline} Kami berkomitmen memberikan kualitas terbaik dari desain, produksi, hingga instalasi akhir di lokasi.
          </p>
          <address className={styles.footerAddress}>
            <strong>Alamat Kantor:</strong><br />
            {site.address}<br />
            Kode Lokasi: <a href={`https://plus.codes/${site.locationCode}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>{site.locationCode}</a>
          </address>
        </div>

        {/* Column 2: Layanan Quick Links */}
        <div>
          <h3 className={styles.footerTitle}>Layanan Kami</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/layanan/kusen-aluminium">Kusen Aluminium</Link></li>
            <li><Link href="/layanan/kitchen-set-custom">Kitchen Set Custom</Link></li>
            <li><Link href="/layanan/plafon-gypsum-pvc">Plafon Gypsum & PVC</Link></li>
            <li><Link href="/layanan/kanopi">Kanopi Minimalis</Link></li>
            <li><Link href="/layanan/pagar-gerbang">Pagar & Gerbang</Link></li>
            <li><Link href="/layanan/interior-custom">Interior Custom</Link></li>
          </ul>
        </div>

        {/* Column 3: Area Rumah Quick Links */}
        <div>
          <h3 className={styles.footerTitle}>Area Rumah</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/area-rumah/gerbang-pagar">Gerbang & Pagar</Link></li>
            <li><Link href="/area-rumah/teras-depan">Teras Depan</Link></li>
            <li><Link href="/area-rumah/living-room">Ruang Keluarga</Link></li>
            <li><Link href="/area-rumah/kitchen-dapur">Dapur Bersih / Dapur</Link></li>
            <li><Link href="/area-rumah/carport-kanopi">Carport & Kanopi</Link></li>
            <li><Link href="/area-rumah/ruko-tempat-usaha">Ruko / Tempat Usaha</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Socials */}
        <div className={styles.footerContactList}>
          <h3 className={styles.footerTitle}>Hubungi Kami</h3>
          <div className={styles.footerContactItem}>
            <strong>WhatsApp Utama (Tholib)</strong>
            <a href={whatsappUrl(undefined, site.phonePrimary)} target="_blank" rel="noopener noreferrer">
              {site.phonePrimaryLabel}
            </a>
          </div>
          <div className={styles.footerContactItem}>
            <strong>WhatsApp Alternatif (Eko)</strong>
            <a href={whatsappUrl(undefined, site.phoneSecondary)} target="_blank" rel="noopener noreferrer">
              {site.phoneSecondaryLabel}
            </a>
          </div>
          <div className={styles.footerContactItem}>
            <strong>Ikuti Sosial Media</strong>
            <div className={styles.footerSocials}>
              <a 
                className={styles.footerSocialLink} 
                href="https://instagram.com/caturayaliving" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Ikuti Caturaya Living di Instagram"
              >
                IG
              </a>
              <a 
                className={styles.footerSocialLink} 
                href="https://facebook.com/caturayaliving" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Ikuti Caturaya Living di Facebook"
              >
                FB
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className={styles.footerBottom}>
        <span>&copy; {new Date().getFullYear()} Caturaya Living. Hak Cipta Dilindungi Undang-Undang.</span>
        <span>Premium Interior, Aluminium & Fasad Specialist di Sidareja, Cilacap</span>
      </div>
    </footer>
  );
}

export function StickyWhatsapp() {
  return (
    <a 
      className={styles.sticky} 
      href={whatsappUrl("Halo Caturaya Living, saya ingin berkonsultasi mengenai proyek properti saya.")} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Hubungi layanan Caturaya Living via WhatsApp"
    >
      Konsultasi WhatsApp
    </a>
  );
}

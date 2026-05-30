import { ConsultationForm } from "@/components/consultation-form";
import { site, whatsappUrl } from "@/lib/site";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import homeStyles from "../styles/home.module.css";

export const metadata = {
  title: "Hubungi Caturaya Living | Jasa Konsultasi Properti Sidareja",
  description: "Kontak Caturaya Living untuk konsultasi interior custom, kusen aluminium, kitchen set, kanopi, pagar gerbang, dan plafon di Sidareja, Cilacap.",
};

export default function KontakPage() {
  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Hubungi Kami</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Konsultasi & Alamat Kantor</p>
        <h1>Hubungi Tim Caturaya Living</h1>
        <p>
          Kami siap membantu merapikan kebutuhan properti Anda. Kirimkan pesan melalui WhatsApp atau isi formulir konsultasi terstruktur di bawah untuk respon cepat dari tim kami.
        </p>
      </header>

      {/* Kontak grid section */}
      <section className={homeStyles.contact} style={{ border: "none", background: "none", padding: "0 0 60px 0" }}>
        <div>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700", marginBottom: "8px" }}>Kantor Fisik & Lokasi</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-neutral-dark)", marginBottom: "16px", fontWeight: "600" }}>
            Kunjungi Workshop Kami
          </h2>
          <p style={{ color: "var(--color-neutral)", fontSize: "14px", lineHeight: "1.6" }}>
            {site.address}.<br />
            Kode Plus Google Maps: <a href={`https://plus.codes/${site.locationCode}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>{site.locationCode}</a>
          </p>
          <p style={{ color: "var(--color-neutral-muted)", fontSize: "13px", marginTop: "16px" }}>
            Jam Operasional CS: Senin - Sabtu (08:00 - 17:00 WIB). Layanan survei lokasi dijadwalkan secara fleksibel sesuai kesepakatan.
          </p>
        </div>
        
        <div className={homeStyles.contactCard}>
          <strong>WhatsApp Utama (Tholib)</strong>
          <span>{site.phonePrimaryLabel}</span>
          <a className="primary" href={whatsappUrl(undefined, site.phonePrimary)} target="_blank" rel="noopener noreferrer">
            Hubungi Tholib
          </a>
          
          <strong style={{ marginTop: "16px" }}>WhatsApp Alternatif (Eko)</strong>
          <span>{site.phoneSecondaryLabel}</span>
          <a className="secondary" href={whatsappUrl("Halo Caturaya Living, saya ingin konsultasi.", site.phoneSecondary)} target="_blank" rel="noopener noreferrer">
            Hubungi Eko Suyanto
          </a>
        </div>
      </section>

      {/* Form konsultasi */}
      <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "40px" }}>
        <header className={styles.subpageHeader} style={{ borderBottom: "none", marginBottom: "24px", paddingBottom: 0 }}>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Formulir Pertanyaan Awal</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "600", color: "var(--color-neutral-dark)" }}>
            Isi Kebutuhan Proyek Anda
          </h2>
        </header>
        <ConsultationForm />
      </section>
    </main>
  );
}

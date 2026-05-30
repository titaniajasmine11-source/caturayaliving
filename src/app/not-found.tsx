import { whatsappUrl } from "@/lib/site";
import Link from "next/link";
import styles from "./styles/subpages.module.css";

export default function NotFound() {
  return (
    <main className={styles.subpageWrapper}>
      <section className={styles.subHero}>
        <p className={styles.articleMeta} style={{ fontSize: "16px", fontWeight: "700" }}>404 ERROR</p>
        <h1>Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke lokasi lain. Silakan kembali ke beranda atau hubungi kami langsung via WhatsApp untuk bantuan cepat.</p>
        
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
          <Link className="secondary" href="/" style={{ minHeight: "48px", padding: "12px 24px", display: "inline-flex", alignItems: "center" }}>
            Kembali ke Beranda
          </Link>
          <a className="primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ minHeight: "48px", padding: "12px 24px", display: "inline-flex", alignItems: "center" }}>
            Konsultasi WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

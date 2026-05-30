import { process } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import homeStyles from "../styles/home.module.css";

export const metadata = {
  title: "Tentang Caturaya Living | Jasa Renovasi & Interior Premium",
  description: "Mengenal Caturaya Living, spesialis interior, kusen aluminium, kitchen set, plafon, kanopi, dan pagar gerbang di area Sidareja, Cilacap.",
};

export default function TentangKamiPage() {
  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Tentang Kami</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Profil Perusahaan</p>
        <h1>Spesialis Interior, Aluminium & Eksterior Lokal Sidareja</h1>
        <p>
          Caturaya Living hadir sebagai mitra tepercaya bagi pemilik rumah, toko, dan ruko di Kabupaten Cilacap dan sekitarnya yang menginginkan pengerjaan konstruksi ringan arsitektural dengan ukuran pas, rapi, dan material berkualitas tinggi.
        </p>
      </header>

      {/* Brand Values / Keunggulan */}
      <section className={styles.richText} style={{ marginBottom: "60px" }}>
        <h2>Filosofi & Nilai Kerja Kami</h2>
        <p>
          Kami meyakini bahwa rumah yang tertata rapi akan menghadirkan kenyamanan bagi penghuninya. Oleh karena itu, dalam setiap proyek, kami berpegang pada lima nilai utama:
        </p>
        
        <ul className={styles.featureList}>
          <li><strong>Terstruktur:</strong> Perencanaan yang matang dengan alur kerja yang jelas bagi customer.</li>
          <li><strong>Rapi:</strong> Detail potongan, finishing sambungan, dan pemasangan presisi.</li>
          <li><strong>Transparan:</strong> Estimasi biaya awal yang jujur dan pemilihan material sesuai kesepakatan.</li>
          <li><strong>Fungsional:</strong> Desain layout dan storage yang disesuaikan dengan aktivitas harian Anda.</li>
          <li><strong>Lokal:</strong> Vendor lokal yang dekat, mudah dihubungi, dan siap memberikan garansi perawatan.</li>
        </ul>
      </section>

      {/* Alur Kerja */}
      <section className={homeStyles.process} style={{ borderRadius: "var(--radius-lg)" }}>
        <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700", display: "block", marginBottom: "12px" }}>Alur Kerja Terstruktur</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-neutral-dark)", marginBottom: "16px", fontWeight: "600" }}>
          Dari Ide Awal Hingga Serah Terima Kunci
        </h2>
        <p style={{ color: "var(--color-neutral)", fontSize: "14px", maxWidth: "600px", margin: "0 auto 36px" }}>
          Kami memastikan setiap langkah dikomunikasikan secara jelas agar keputusan renovasi properti Anda terasa tenang dan terkendali.
        </p>
        
        <div className={homeStyles.steps} style={{ marginBottom: "36px" }}>
          {process.map((step) => <span key={step}>{step}</span>)}
        </div>
        
        <a className="primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          Hubungi Tim Sekarang
        </a>
      </section>
    </main>
  );
}

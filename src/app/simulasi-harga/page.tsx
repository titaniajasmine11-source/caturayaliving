import { PriceSimulator } from "@/components/price-simulator";
import Link from "next/link";
import styles from "../styles/subpages.module.css";

export const metadata = {
  title: "Simulasi Harga Kitchen Set & Aluminium Premium | Caturaya Living",
  description: "Hitung perkiraan estimasi biaya awal kitchen set custom, kusen aluminium, pintu, dan plafon di area Sidareja, Cilacap.",
};

export default function SimulasiHargaPage() {
  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Simulasi Harga</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Kalkulator Estimasi Biaya</p>
        <h1>Simulasi Harga Proyek Rumah Anda</h1>
        <p>
          Gunakan simulator interaktif ini untuk memperkirakan biaya pekerjaan arsitektural interior dan eksterior Anda. Angka ini merupakan estimasi awal berdasarkan ukuran kasar demi mempermudah perencanaan budget Anda.
        </p>
      </header>

      <section style={{ marginTop: "20px" }}>
        <PriceSimulator />
      </section>
    </main>
  );
}

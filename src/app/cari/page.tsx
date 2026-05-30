import { ContentSearch } from "@/components/content-search";
import { getArticles, getPortfolio, getServices } from "@/lib/cms";
import Link from "next/link";
import styles from "../styles/subpages.module.css";

export const metadata = {
  title: "Cari Layanan & Inspirasi Properti | Caturaya Living",
  description: "Cari layanan kusen aluminium, kitchen set custom, plafon, kanopi, artikel panduan, dan studi kasus proyek di Caturaya Living.",
};

export default async function SearchPage() {
  const [articles, portfolio, services] = await Promise.all([getArticles(), getPortfolio(), getServices()]);
  const items = [
    ...services.map((service) => ({ title: service.title, summary: service.summary, href: `/layanan/${service.slug}`, type: "Layanan" })),
    ...portfolio.map((item) => ({ title: item.title, summary: `${item.category} di ${item.location}`, href: `/portofolio/${item.slug}`, type: "Portofolio" })),
    ...articles.map((article) => ({ title: article.title, summary: article.summary, href: `/artikel/${article.slug}`, type: "Artikel" })),
  ];

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Cari Konten</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Pencarian Cepat</p>
        <h1>Cari Inspirasi Desain & Layanan</h1>
        <p>
          Temukan dengan cepat referensi pengerjaan kusen aluminium, kitchen set custom, plafon PVC/gypsum, kanopi teras, studi kasus portofolio lapangan, serta panduan arsitektural kami.
        </p>
      </header>

      <section style={{ marginTop: "20px" }}>
        <ContentSearch items={items} />
      </section>
    </main>
  );
}

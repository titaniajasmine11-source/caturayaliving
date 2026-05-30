import { getArticles } from "@/lib/cms";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

export const metadata = {
  title: "Panduan & Artikel Properti Arsitektural | Caturaya Living",
  description: "Daftar panduan memilih kusen aluminium, kitchen set custom modern, plafon drop ceiling, kanopi teras, dan material properti di Cilacap.",
};

export default async function ArtikelPage() {
  const articles = await getArticles();
  const categories = [...new Set(articles.map((article) => article.category))];

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Artikel Panduan</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Pusat Edukasi & Rekomendasi</p>
        <h1>Artikel, Panduan & Edukasi Properti</h1>
        <p>
          Pelajari panduan komprehensif dari tim teknis kami sebelum menentukan pilihan material. Kami membagikan tips tata letak fungsional draf dapur, ketahanan profil kusen aluminium, hingga perencanaan anggaran renovasi ringan.
        </p>
      </header>

      {/* Filter pills */}
      <section style={{ marginTop: "20px" }}>
        <div className={styles.filterBar}>
          <Link href="/artikel" className={styles.activeFilter}>Semua Topik</Link>
          {categories.map((category) => (
            <Link href={`/artikel/kategori/${category.toLowerCase().replaceAll(" ", "-")}`} key={category}>
              {category}
            </Link>
          ))}
        </div>

        {/* Article Grid */}
        <div className={cardStyles.articleGrid}>
          {articles.map((article) => (
            <Link className={cardStyles.articleCard} href={`/artikel/${article.slug}`} key={article.slug} aria-label={`Baca panduan: ${article.title}`}>
              <span>{article.readTime}</span>
              <h3 style={{ marginTop: "4px" }}>{article.title}</h3>
              <p style={{ marginTop: "8px" }}>{article.summary}</p>
              
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-accent)", marginTop: "16px", display: "inline-block" }}>
                Kategori: {article.category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

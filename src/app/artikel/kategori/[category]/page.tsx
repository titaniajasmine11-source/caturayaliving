import { articles as staticArticles } from "@/lib/content";
import { getArticles } from "@/lib/cms";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

type Props = {
  params: Promise<{ category: string }>;
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export function generateStaticParams() {
  return [...new Set(staticArticles.map((article) => slugify(article.category)))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const title = category.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Panduan ${title} | Caturaya Living`,
    description: `Kumpulan artikel panduan teknis dan tips memilih material ${title} dari tim Caturaya Living Cilacap.`,
    openGraph: {
      title: `Panduan ${title} | Caturaya Living`,
      description: `Kumpulan artikel panduan teknis dan tips memilih material ${title} dari tim Caturaya Living Cilacap.`,
    }
  };
}

export default async function ArticleCategoryPage({ params }: Props) {
  const { category } = await params;
  const articles = await getArticles();
  const items = articles.filter((article) => slugify(article.category) === category);

  if (items.length === 0) {
    notFound();
  }

  const categoryName = items[0].category;

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/artikel">Artikel Panduan</Link>
        <span>Kategori: {categoryName}</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Kategori Edukasi Teknis</p>
        <h1>Artikel Seputar {categoryName}</h1>
        <p>
          Menampilkan seluruh panduan praktis dan artikel tips arsitektural yang masuk dalam kategori <strong>{categoryName}</strong> untuk membantu Anda merancang hunian yang lebih rapi dan kokoh.
        </p>
      </header>

      {/* Article list */}
      <section style={{ marginTop: "20px" }}>
        <div className={cardStyles.articleGrid}>
          {items.map((article) => (
            <Link className={cardStyles.articleCard} href={`/artikel/${article.slug}`} key={article.slug} aria-label={`Baca panduan: ${article.title}`}>
              <span>{article.readTime}</span>
              <h3 style={{ marginTop: "4px" }}>{article.title}</h3>
              <p style={{ marginTop: "8px" }}>{article.summary}</p>
              
              {/* Restored the missing category tag as documented in audit 2.5 */}
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

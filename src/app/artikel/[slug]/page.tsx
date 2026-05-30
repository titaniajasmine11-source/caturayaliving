import { articles as staticArticles } from "@/lib/content";
import { getArticles } from "@/lib/cms";
import { absoluteUrl, site, whatsappUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../../styles/subpages.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return staticArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} | Caturaya Living` : "Artikel Caturaya Living",
    description: article?.summary,
    alternates: article ? { canonical: absoluteUrl(`/artikel/${article.slug}`) } : undefined,
    openGraph: article ? {
      title: `${article.title} | Caturaya Living`,
      description: article.summary,
      url: absoluteUrl(`/artikel/${article.slug}`),
    } : undefined,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(`/artikel/${article.slug}`),
  };

  return (
    <main className={styles.subpageWrapper}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/artikel">Artikel Panduan</Link>
        <span>Detail Artikel</span>
      </nav>

      {/* Article Detail layout */}
      <article className={styles.articleDetail}>
        <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "32px" }}>
          <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>
            Topik: {article.category} &bull; Waktu Baca: {article.readTime}
          </p>
          <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)", marginTop: "12px" }}>{article.title}</h1>
          <p style={{ fontStyle: "italic", color: "var(--color-neutral-muted)", marginTop: "16px", fontSize: "15px" }}>{article.summary}</p>
        </header>

        <div className={styles.richText}>
          {article.sections.map((section) => (
            <section key={section.heading} className={styles.articleSection}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          
          <section className={styles.articleSection}>
            <h2>Langkah Selanjutnya</h2>
            <p>
              Kirimkan foto area lokasi, perkiraan ukuran ruangan, dan model inspirasi yang Anda inginkan melalui chat WhatsApp. Tim Caturaya Living akan membantu menganalisis kebutuhan awal, memberikan rekomendasi bahan baku optimal, serta menyusun estimasi anggaran proyek Anda secara transparan.
            </p>
          </section>
        </div>

        <div style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a 
            className="primary" 
            href={whatsappUrl(`Halo Caturaya Living, saya baru saja membaca artikel "${article.title}" dan ingin berkonsultasi mengenai topik tersebut untuk proyek rumah saya.`)} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Konsultasi mengenai topik artikel ini via WhatsApp"
            style={{ minHeight: "48px", padding: "12px 24px", display: "inline-flex", alignItems: "center" }}
          >
            Konsultasi Topik Ini
          </a>
          <Link 
            className="secondary" 
            href="/artikel" 
            style={{ minHeight: "48px", padding: "12px 24px", display: "inline-flex", alignItems: "center" }}
            aria-label="Kembali ke halaman daftar artikel panduan"
          >
            Semua Artikel
          </Link>
        </div>
      </article>
    </main>
  );
}

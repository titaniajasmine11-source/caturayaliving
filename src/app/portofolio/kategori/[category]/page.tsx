import { portfolio as staticPortfolio } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../../../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

type Props = {
  params: Promise<{ category: string }>;
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export function generateStaticParams() {
  return [...new Set(staticPortfolio.map((item) => slugify(item.category)))].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const title = category.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
  return {
    title: `Portofolio ${title} | Caturaya Living`,
    description: `Kumpulan hasil realisasi pengerjaan proyek ${title} di Sidareja, Cilacap, dan sekitarnya oleh Caturaya Living.`,
    openGraph: {
      title: `Portofolio ${title} | Caturaya Living`,
      description: `Kumpulan hasil realisasi pengerjaan proyek ${title} di Sidareja, Cilacap, dan sekitarnya oleh Caturaya Living.`,
    }
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;
  const portfolio = await getPortfolio();
  const items = portfolio.filter((item) => slugify(item.category) === category);

  if (items.length === 0) {
    notFound();
  }

  const categoryName = items[0].category;

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/portofolio">Portofolio</Link>
        <span>Kategori: {categoryName}</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Kategori Pengerjaan Proyek</p>
        <h1>Portofolio {categoryName}</h1>
        <p>
          Menampilkan seluruh studi kasus realisasi proyek properti Caturaya Living yang masuk dalam kategori <strong>{categoryName}</strong>. Pengerjaan rapi, transparan, dan presisi di area Sidareja, Cilacap.
        </p>
      </header>

      {/* Grid listing */}
      <section style={{ marginTop: "20px" }}>
        <div className={cardStyles.portfolioGrid}>
          {items.map((item, index) => (
            <article className={cardStyles.project} key={item.title}>
              <div className={cardStyles.projectImage}>
                <Image src={item.image} alt={`${item.title} - Kategori ${item.category}`} fill sizes="(max-width: 980px) 50vw, 33vw" />
                <span>0{index + 1}</span>
              </div>
              <div className={cardStyles.projectBody}>
                <span>{item.category} / {item.location}</span>
                <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "16px" }}>
                  {item.material}. Estimasi durasi {item.duration}.
                </p>
                
                <div style={{ display: "flex", gap: "10px", marginTop: "auto", flexWrap: "wrap" }}>
                  <Link 
                    href={`/portofolio/${item.slug}`} 
                    className="secondary"
                    style={{ fontSize: "11px", minHeight: "32px", padding: "0 12px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Tinjau studi kasus ${item.title}`}
                  >
                    Studi Kasus
                  </Link>
                  <a 
                    href={whatsappUrl(`Halo Caturaya Living, saya tertarik dengan hasil pengerjaan ${item.title} (kategori ${item.category}) dan ingin berkonsultasi mengenai proyek serupa.`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="primary"
                    style={{ fontSize: "11px", minHeight: "32px", padding: "0 12px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Tanya estimasi proyek serupa ${item.title} via WhatsApp`}
                  >
                    Tanya Proyek Serupa
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

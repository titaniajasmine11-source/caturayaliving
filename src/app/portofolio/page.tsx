import { getPortfolio } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

export const metadata = {
  title: "Portofolio Proyek Interior & Eksterior | Caturaya Living",
  description: "Studi kasus realisasi pengerjaan kitchen set, kusen aluminium pintu jendela, plafon PVC, kanopi tempered glass, dan gerbang pagar di Cilacap.",
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default async function PortofolioPage() {
  const portfolio = await getPortfolio();
  const categories = [...new Set(portfolio.map((item) => item.category))];

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Portofolio</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Galeri Hasil Realisasi</p>
        <h1>Studi Kasus Proyek Properti</h1>
        <p>
          Tinjau katalog hasil pengerjaan kami. Tiap studi kasus mendokumentasikan spesifikasi bahan baku, durasi pengerjaan, lokasi pemasangan, serta foto asli sebagai referensi proyek impian Anda.
        </p>
      </header>

      {/* Filter pills */}
      <section style={{ marginTop: "20px" }}>
        <div className={styles.filterBar}>
          <Link href="/portofolio" className={styles.activeFilter}>Semua Kategori</Link>
          {categories.map((category) => (
            <Link href={`/portofolio/kategori/${slugify(category)}`} key={category}>
              {category}
            </Link>
          ))}
        </div>

        {/* Portfolio Grids */}
        <div className={cardStyles.portfolioGrid}>
          {portfolio.map((item, index) => (
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
                    href={whatsappUrl(`Halo Caturaya Living, saya tertarik dengan hasil pengerjaan ${item.title} dan ingin berkonsultasi mengenai proyek serupa.`)} 
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

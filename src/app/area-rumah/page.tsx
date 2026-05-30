import { getAreas } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

export const metadata = {
  title: "Inspirasi Pengerjaan Berdasarkan Area Rumah | Caturaya Living",
  description: "Rencanakan renovasi ringan, kitchen set, plafon, kanopi, kusen aluminium, dan partisi berdasarkan bagian ruang rumah di Sidareja, Cilacap.",
};

export default async function AreaRumahPage() {
  const areas = await getAreas();

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Area Rumah</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Kategori Bagian Ruangan</p>
        <h1>Inspirasi Pengerjaan Area Rumah</h1>
        <p>
          Rencanakan penataan dan pembangunan berdasarkan bagian rumah Anda. Tiap area memiliki karakteristik arsitektural yang khas: ketahanan cuaca eksterior, penataan kabinet harian, efisiensi sirkulasi ruko, hingga privasi kamar utama.
        </p>
      </header>

      {/* Grid listing */}
      <section style={{ marginTop: "20px" }}>
        <div className={cardStyles.portfolioGrid}>
          {areas.map((area, index) => (
            <article className={cardStyles.project} key={area.slug}>
              <div className={cardStyles.projectImage}>
                <Image src={area.image} alt={`${area.title} Caturaya Living`} fill sizes="(max-width: 980px) 50vw, 33vw" />
                <span>0{index + 1}</span>
              </div>
              <div className={cardStyles.projectBody}>
                <span>Zonasi Properti</span>
                <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>{area.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "20px" }}>
                  {area.summary} <br />
                  <span style={{ fontSize: "11px", display: "inline-block", marginTop: "8px", color: "var(--color-accent)", fontWeight: "700" }}>
                    Rekomendasi: {area.recommended.join(", ")}
                  </span>
                </p>
                
                <div style={{ display: "flex", gap: "12px", marginTop: "auto", flexWrap: "wrap" }}>
                  <Link 
                    href={`/area-rumah/${area.slug}`} 
                    className="secondary"
                    style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Lihat rincian lengkap mengenai penataan area ${area.title}`}
                  >
                    Detail Area
                  </Link>
                  <a 
                    href={whatsappUrl(`Halo Caturaya Living, saya ingin konsultasi penataan untuk area ${area.title}.`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="primary"
                    style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Tanya mengenai penataan area ${area.title} via WhatsApp`}
                  >
                    Tanya Area WA
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

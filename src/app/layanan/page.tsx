import { getServices } from "@/lib/cms";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

export const metadata = {
  title: "Layanan Interior & Aluminium Premium | Caturaya Living",
  description: "Layanan kusen aluminium, pintu, jendela, kitchen set custom, plafon, kanopi carport, pagar minimalis, dan home finishing di Sidareja, Cilacap.",
};

export default async function LayananPage() {
  const services = await getServices();

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Layanan</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Solusi Kontraktor Konstruksi Ringan</p>
        <h1>Layanan Pekerjaan Arsitektural</h1>
        <p>
          Kami melayani pembuatan custom dari bahan aluminium pilihan hingga pengerjaan seni interior kayu mewah. Setiap produk disesuaikan dengan ukuran riil di lokasi, kebutuhan layout ruang, dan estimasi biaya yang transparan.
        </p>
      </header>

      {/* Grid of services in catalog format */}
      <section style={{ marginTop: "20px" }}>
        <div className={cardStyles.portfolioGrid}>
          {services.map((service) => (
            <article className={cardStyles.project} key={service.slug}>
              <div className={cardStyles.projectImage}>
                <Image src={service.image} alt={`${service.title} Caturaya Living`} fill sizes="(max-width: 980px) 50vw, 33vw" />
                <span style={{ background: "var(--color-accent)" }}>✓</span>
              </div>
              <div className={cardStyles.projectBody}>
                <span>Spesialis Properti</span>
                <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>{service.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "12px" }}>{service.summary}</p>
                <p style={{ fontSize: "12px", color: "var(--color-neutral-muted)", marginBottom: "20px" }}>{service.detail}</p>
                
                <div style={{ display: "flex", gap: "12px", marginTop: "auto", flexWrap: "wrap" }}>
                  <Link 
                    href={`/layanan/${service.slug}`} 
                    className="secondary" 
                    style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Lihat rincian lengkap mengenai ${service.title}`}
                  >
                    Detail Layanan
                  </Link>
                  <a 
                    href={whatsappUrl(`Halo Caturaya Living, saya ingin konsultasi mengenai layanan ${service.title}.`)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="primary" 
                    style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                    aria-label={`Konsultasi layanan ${service.title} via WhatsApp`}
                  >
                    Konsultasi WA
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

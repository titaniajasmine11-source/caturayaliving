import { getServices } from "@/lib/cms";
import { serviceCategories } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";
import layananStyles from "../styles/layanan.module.css";

export const metadata = {
  title: "Layanan Caturaya Living | Full Kontraktor Properti Sidareja",
  description: "Layanan lengkap properti: kusen kayu & aluminium, perabotan custom, kitchen set, HPL finishing, plafon, kanopi, partisi, jasa bangunan, dan renovasi total di Sidareja, Cilacap.",
};

export default async function LayananPage() {
  const allServices = await getServices();

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Layanan</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Full Kontraktor Properti</p>
        <h1>Semua Layanan — Interior, Eksterior & Jasa Bangunan</h1>
        <p>
          Caturaya Living mengelola proyek properti secara menyeluruh. Dari kusen kayu dan aluminium, perabotan custom, kitchen set, HPL finishing, plafon, kanopi, hingga jasa bangunan — semua dikerjakan oleh tim spesialis yang kami koordinasikan untuk Anda.
        </p>
      </header>

      {/* Layanan per Kategori */}
      {serviceCategories.map((cat) => {
        const catServices = allServices.filter(
          (s) => (s as { category?: string }).category === cat.id || cat.services.includes(s.slug)
        );
        if (catServices.length === 0) return null;

        return (
          <section key={cat.id} className={layananStyles.categorySection} id={cat.id}>
            <div className={layananStyles.categoryHeader}>
              <span className={layananStyles.categoryHeaderIcon}>{cat.icon}</span>
              <div>
                <h2>{cat.label}</h2>
                <p>{cat.description}</p>
              </div>
            </div>

            <div className={cardStyles.portfolioGrid}>
              {catServices.map((service) => (
                <article className={cardStyles.project} key={service.slug}>
                  <div className={cardStyles.projectImage}>
                    <Image 
                      src={service.image} 
                      alt={`${service.title} Caturaya Living`} 
                      fill 
                      sizes="(max-width: 980px) 50vw, 33vw" 
                    />
                    <span style={{ background: "var(--color-accent)", borderRadius: "var(--radius-sm)", width: "auto", padding: "3px 10px", borderRadius: "20px" }}>
                      {cat.icon}
                    </span>
                  </div>
                  <div className={cardStyles.projectBody}>
                    <span>{cat.label}</span>
                    <h3 style={{ fontSize: "19px" }}>{service.title}</h3>
                    <p style={{ fontSize: "13px", lineHeight: "1.5", marginBottom: "8px" }}>{service.summary}</p>
                    <p style={{ fontSize: "12px", color: "var(--color-neutral-muted)", marginBottom: "20px" }}>{service.detail}</p>
                    
                    {service.benefits && (
                      <div className={layananStyles.benefitTags}>
                        {service.benefits.slice(0, 3).map((b: string) => (
                          <span key={b} className={layananStyles.benefitTag}>{b}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                      <Link 
                        href={`/layanan/${service.slug}`}
                        className="secondary"
                        style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                        aria-label={`Lihat detail layanan ${service.title}`}
                      >
                        Detail
                      </Link>
                      <a 
                        href={whatsappUrl(`Halo Caturaya Living, saya ingin konsultasi mengenai layanan ${service.title}.`)} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="primary" 
                        style={{ fontSize: "12px", minHeight: "36px", padding: "0 16px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center" }}
                        aria-label={`Konsultasi ${service.title} via WhatsApp`}
                      >
                        Konsultasi WA
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA Bottom */}
      <section className={layananStyles.ctaSection}>
        <h2>Tidak Yakin Layanan Mana yang Anda Butuhkan?</h2>
        <p>Ceritakan kondisi dan kebutuhan properti Anda lewat WhatsApp. Tim kami akan bantu identifikasi solusi terbaik — tanpa biaya konsultasi.</p>
        <a 
          href={whatsappUrl()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="primary"
          aria-label="Konsultasi gratis via WhatsApp"
        >
          Konsultasi Gratis via WhatsApp
        </a>
      </section>
    </main>
  );
}

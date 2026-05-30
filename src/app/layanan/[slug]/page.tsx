import { areas, portfolio, services as staticServices } from "@/lib/content";
import { getServices } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";
import homeStyles from "../../styles/home.module.css";

const serviceSlugAliases: Record<string, string> = {
  "kitchen-set": "kitchen-set-custom",
  "pintu-aluminium": "pintu-jendela-aluminium",
  "jendela-aluminium": "pintu-jendela-aluminium",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  return {
    title: service ? `${service.title} Premium Sidareja Cilacap | Caturaya Living` : "Layanan Caturaya Living",
    description: service?.summary,
    alternates: service ? { canonical: absoluteUrl(`/layanan/${service.slug}`) } : undefined,
    openGraph: service ? {
      title: `${service.title} Premium Sidareja Cilacap | Caturaya Living`,
      description: service.summary,
      images: [{ url: absoluteUrl(service.image) }],
    } : undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = serviceSlugAliases[slug] ?? slug;
  const services = await getServices();
  const service = services.find((item) => item.slug === resolvedSlug);

  if (!service) {
    notFound();
  }

  const relatedPortfolio = portfolio.filter((item) => 
    service.title.toLowerCase().includes(item.category.toLowerCase()) || 
    item.category.toLowerCase().includes(service.title.split(" ")[0].toLowerCase())
  ).slice(0, 3);

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/layanan">Layanan</Link>
        <span>Detail: {service.title}</span>
      </nav>

      {/* Detail Layout */}
      <div className={styles.detailGrid}>
        {/* Left Content column */}
        <div className={styles.detailContent}>
          <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
            <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Layanan Spesialis Properti</p>
            <h1>{service.title}</h1>
            <p style={{ marginTop: "12px" }}>{service.summary}</p>
          </header>

          <div className={styles.detailImage}>
            <Image src={service.image} alt={`${service.title} Caturaya Living`} fill priority sizes="(max-width: 980px) 100vw, 60vw" />
          </div>

          <div className={styles.richText}>
            <h2>Lingkup Pekerjaan & Detail Layanan</h2>
            <p>{service.detail}</p>
            
            <h2 style={{ marginTop: "32px", marginBottom: "16px" }}>Keunggulan Utama Layanan</h2>
            <ul className={styles.featureList}>
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Deliverables section */}
          <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px", marginTop: "16px" }}>
            <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "20px" }}>
              <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Tahapan Deliverables</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--color-neutral-dark)", fontWeight: "600" }}>
                Apa yang Anda Dapatkan Sejak Konsultasi Awal?
              </h2>
            </header>
            <div className={homeStyles.steps}>
              {service.deliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          {/* Area Cocok */}
          <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px", marginTop: "16px" }}>
            <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "20px" }}>
              <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Kesesuaian Ruang</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--color-neutral-dark)", fontWeight: "600" }}>
                Bagian Ruangan yang Sering Membutuhkan Layanan Ini
              </h2>
            </header>
            <div className={homeStyles.areaList}>
              {areas.slice(0, 6).map((area) => (
                <Link href={`/area-rumah/${area.slug}`} key={area.slug}>
                  {area.title}
                </Link>
              ))}
            </div>
          </section>

          {/* Related portfolio projects */}
          {relatedPortfolio.length > 0 && (
            <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px", marginTop: "16px" }}>
              <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "24px" }}>
                <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Referensi Kasus</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--color-neutral-dark)", fontWeight: "600" }}>
                  Proyek Terkait Kategori {service.title.split(" ")[0]}
                </h2>
              </header>
              <div className={cardStyles.grid}>
                {relatedPortfolio.map((item) => (
                  <Link className={cardStyles.articleCard} href={`/portofolio/${item.slug}`} key={item.title}>
                    <span>{item.category} / {item.location}</span>
                    <h3>{item.title}</h3>
                    <p style={{ fontSize: "12px", marginTop: "8px" }}>{item.material}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Side: Sticky CTA */}
        <aside className={styles.sidebarCTA}>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Konsultasi Layanan</p>
          <h3>Diskusikan Proyek Rumah Anda</h3>
          <p>
            Konsultasikan rencana pemasangan {service.title.toLowerCase()} untuk rumah Anda secara detail. Kami akan memberikan perkiraan harga awal dan menjadwalkan survei lokasi Sidareja gratis.
          </p>
          
          <a 
            className="primary" 
            href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai kebutuhan layanan ${service.title} untuk rumah saya.`)} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Konsultasi layanan ${service.title} via WhatsApp`}
          >
            Chat WhatsApp
          </a>
          <Link className="secondary" href="/layanan" aria-label="Lihat seluruh katalog layanan Caturaya Living">
            Semua Layanan
          </Link>
        </aside>
      </div>
    </main>
  );
}

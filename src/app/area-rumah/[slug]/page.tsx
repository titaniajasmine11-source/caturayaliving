import { areas as staticAreas } from "@/lib/content";
import { getAreas, getServices } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";

const areaSlugAliases: Record<string, string> = {
  kitchen: "kitchen-dapur",
  "ruang-makan": "dining-area",
  mushola: "mushola-rumah",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const areas = await getAreas();
  const area = areas.find((item) => item.slug === slug);

  return {
    title: area ? `${area.title} | Area Rumah Caturaya Living` : "Area Rumah Caturaya Living",
    description: area?.summary,
    alternates: area ? { canonical: absoluteUrl(`/area-rumah/${area.slug}`) } : undefined,
    openGraph: area ? {
      title: `${area.title} | Caturaya Living`,
      description: area.summary,
      images: [{ url: absoluteUrl(area.image) }],
    } : undefined,
  };
}

export default async function AreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = areaSlugAliases[slug] ?? slug;
  const [areas, services] = await Promise.all([getAreas(), getServices()]);
  const area = areas.find((item) => item.slug === resolvedSlug);

  if (!area) {
    notFound();
  }

  const recommendedServices = services.filter((service) => 
    area.recommended.some((item) => service.title.includes(item) || item.includes(service.title.split(" ")[0]))
  );

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/area-rumah">Area Rumah</Link>
        <span>Detail Area: {area.title}</span>
      </nav>

      {/* Detail Layout */}
      <div className={styles.detailGrid}>
        {/* Left column content */}
        <div className={styles.detailContent}>
          <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
            <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Zonasi Tata Letak Ruangan</p>
            <h1>Penataan Area {area.title}</h1>
            <p style={{ marginTop: "12px" }}>{area.summary}</p>
          </header>

          <div className={styles.detailImage}>
            <Image src={area.image} alt={`Desain visual area ${area.title} Caturaya Living`} fill priority sizes="(max-width: 980px) 100vw, 60vw" />
          </div>

          <div className={styles.richText} style={{ marginTop: "16px" }}>
            <h2>Metode Perencanaan Tata Ruang</h2>
            <p>
              Tiap area rumah Anda dirancang menggunakan perhitungan sirkulasi jalur gerak yang cermat. Kami meyakini furniture custom arsitektural harus mampu meningkatkan nilai estetika visual sekaligus memudahkan aktivitas fungsional harian Anda.
            </p>
            <p>
              Rekomendasi spesifik kami bagi <strong>{area.title}</strong> adalah pengaplikasian kombinasi pekerjaan berikut: <strong>{area.recommended.join(", ")}</strong>. Hal ini memadukan kekuatan konstruksi struktural dan estetika minimalis modern.
            </p>
          </div>

          {/* Recommended Services lists */}
          <section style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px", marginTop: "24px" }}>
            <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 24 }}>
              <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Rekomendasi Pekerjaan Terkait</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--color-neutral-dark)", fontWeight: "600" }}>
                Layanan Pilihan Terbaik Untuk Area {area.title}
              </h2>
            </header>
            
            <div className={cardStyles.grid}>
              {recommendedServices.map((service) => (
                <Link className={cardStyles.card} href={`/layanan/${service.slug}`} key={service.slug}>
                  <span>{service.title.slice(0, 2).toUpperCase()}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right column sticky CTA */}
        <aside className={styles.sidebarCTA}>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Konsultasi Area</p>
          <h3>Tata Ulang Area {area.title}</h3>
          <p>
            Konsultasikan rencana renovasi ringan atau kustomisasi interior/eksterior untuk area {area.title.toLowerCase()} Anda. Tim lapangan kami siap menjadwalkan survei ke lokasi Anda.
          </p>
          
          <a 
            className="primary" 
            href={whatsappUrl(`Halo Caturaya Living, saya ingin berkonsultasi mengenai rencana penataan dan pekerjaan untuk area ${area.title} rumah saya.`)} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Konsultasi penataan area ${area.title} via WhatsApp`}
          >
            Tanya Area WA
          </a>
          <Link className="secondary" href="/area-rumah" aria-label="Lihat seluruh daftar area properti Caturaya Living">
            Eksplor Semua Area
          </Link>
        </aside>
      </div>
    </main>
  );
}

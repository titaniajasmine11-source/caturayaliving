import { portfolio as staticPortfolio } from "@/lib/content";
import { getPortfolio } from "@/lib/cms";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../styles/subpages.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return staticPortfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const item = portfolio.find((project) => project.slug === slug);

  return {
    title: item ? `${item.title} | Portofolio Caturaya Living` : "Portofolio Caturaya Living",
    description: item ? `Dokumentasi realisasi proyek ${item.title} (${item.material}) di ${item.location} oleh Caturaya Living.` : undefined,
    alternates: item ? { canonical: absoluteUrl(`/portofolio/${item.slug}`) } : undefined,
    openGraph: item ? {
      title: `${item.title} | Caturaya Living`,
      description: `Spesifikasi bahan ${item.material}. Pengerjaan durasi ${item.duration} di ${item.location}.`,
      images: [{ url: absoluteUrl(item.image) }],
    } : undefined,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolio();
  const item = portfolio.find((project) => project.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <Link href="/portofolio">Portofolio</Link>
        <span>Studi Kasus: {item.title}</span>
      </nav>

      {/* Detail Layout */}
      <div className={styles.detailGrid}>
        {/* Left Side: Images & Info */}
        <div className={styles.detailContent}>
          <header className={styles.subpageHeader} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
            <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>{item.category} / Proyek di {item.location}</p>
            <h1>{item.title}</h1>
          </header>

          <div className={styles.detailImage}>
            <Image src={item.image} alt={`Dokumentasi proyek ${item.title} oleh Caturaya Living`} fill priority sizes="(max-width: 980px) 100vw, 60vw" />
          </div>

          <div className={styles.richText}>
            <h2>Spesifikasi Bahan & Lingkup Pengerjaan</h2>
            <p>
              Proyek ini mencakup perancangan arsitektural dan pemasangan di lokasi menggunakan material pilihan <strong>{item.material}</strong> dengan durasi penyelesaian berkisar antara <strong>{item.duration}</strong>.
            </p>
            <p>
              Seluruh tahap pengerjaan dipantau secara detail mulai dari survei lokasi, pembuatan mock-up gambar kerja, hingga finishing akhir pembersihan di lapangan guna menjamin kerapian tingkat tinggi.
            </p>
            
            <ul className={styles.featureList}>
              <li>Material Utama Terpilih: {item.material.split(",")[0] || item.material}</li>
              <li>Lokasi Penempatan: Area {item.location}</li>
              <li>Estimasi Kecepatan: Selesai dalam {item.duration}</li>
              <li>Pengerjaan Rapi & Bergaransi Perawatan</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Sticky Call to Action */}
        <aside className={styles.sidebarCTA}>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Konsultasikan Proyek</p>
          <h3>Tertarik Dengan Hasil Pekerjaan Ini?</h3>
          <p>
            Kami dapat merealisasikan rancangan serupa atau mendesain konsep baru yang disesuaikan dengan dimensi ukuran, budget, dan karakter ruangan rumah Anda di area Sidareja, Cilacap.
          </p>
          
          <a 
            className="primary" 
            href={whatsappUrl(`Halo Caturaya Living, saya tertarik dengan hasil pengerjaan proyek ${item.title} dan ingin menanyakan estimasi biaya jika dipasang di rumah saya.`)} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Tanya estimasi proyek serupa ${item.title} via WhatsApp`}
          >
            Tanya Proyek Serupa
          </a>
          <Link className="secondary" href="/portofolio" aria-label="Lihat seluruh studi kasus Caturaya Living">
            Kembali ke Portofolio
          </Link>
        </aside>
      </div>
    </main>
  );
}

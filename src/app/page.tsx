import { designStages, process, serviceCategories } from "@/lib/content";
import { getAreas, getArticles, getFaqs, getPortfolio, getServices, getTestimonials } from "@/lib/cms";
import { site, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/home.module.css";
import cardStyles from "@/components/styles/cards.module.css";

const wa = whatsappUrl();

export const metadata = {
  title: "Caturaya Living | Full Kontraktor Properti – Interior, Eksterior & Bangunan Sidareja",
  description: "Caturaya Living adalah kontraktor full-service di Sidareja, Cilacap. Melayani kusen kayu & aluminium, perabotan custom, kitchen set, HPL finishing, plafon, kanopi, jasa bangunan, dan renovasi total.",
  openGraph: {
    title: "Caturaya Living | Full Kontraktor Properti Sidareja",
    description: "Satu koordinator untuk semua kebutuhan properti Anda: interior, eksterior, material kayu, aluminium, HPL, dan jasa bangunan.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default async function Home() {
  const [articles, services, portfolio, areas, faqs, testimonials] = await Promise.all([
    getArticles(),
    getServices(),
    getPortfolio(),
    getAreas(),
    getFaqs(),
    getTestimonials()
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    telephone: `+${site.phonePrimary}`,
    address: site.address,
    areaServed: ["Sidareja", "Cilacap", "Tegalsari", "Cipari", "Kedungreja"],
    description: site.tagline,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Properti",
      itemListElement: serviceCategories.map(cat => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cat.label,
          description: cat.description,
        }
      }))
    }
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero Section ── */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} style={{ color: "var(--color-accent)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px" }}>
            Full Kontraktor Properti · Sidareja, Cilacap & Sekitarnya
          </p>
          <h1>Satu Kontraktor untuk Semua Kebutuhan Properti Anda</h1>
          <p className={styles.lead}>
            Dari kusen kayu & aluminium, perabotan rumah custom, kitchen set, HPL finishing, plafon, kanopi, hingga jasa bangunan — Caturaya Living koordinasikan semua tim spesialis untuk Anda, tanpa perlu cari banyak tukang.
          </p>
          <div className={styles.heroActions}>
            <a 
              className={styles.primary} 
              href={wa} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Konsultasi gratis via WhatsApp"
            >
              Konsultasi Gratis via WhatsApp
            </a>
            <Link className={styles.secondary} href="/portofolio" aria-label="Lihat portofolio proyek Caturaya Living">
              Lihat Portofolio
            </Link>
          </div>
          
          {/* Cakupan Layanan Singkat */}
          <div className={styles.heroServiceTags}>
            {["Kusen Kayu & Aluminium", "Kitchen Set", "Perabotan Custom", "HPL Finishing", "Plafon", "Kanopi", "Jasa Bangunan", "Renovasi Total"].map(tag => (
              <span key={tag} className={styles.serviceTag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Premium Photography Collage */}
        <div className={styles.heroPanel} aria-label="Kolase karya arsitektural interior dan eksterior Caturaya Living">
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/home/hero-home-interior.webp" 
              alt="Fasad arsitektural premium menyatu dengan desain interior custom Caturaya Living" 
              fill 
              sizes="(max-width: 980px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/services/kusen-kayu/hero-kusen-kayu.png" 
              alt="Kusen kayu solid jati custom berkualitas tinggi Caturaya Living" 
              fill 
              sizes="(max-width: 980px) 50vw, 25vw"
            />
          </div>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/services/kitchen-set/hero-kitchen-set.webp" 
              alt="Kitchen set custom modern mewah kombinasi kayu dan HPL" 
              fill 
              sizes="(max-width: 980px) 50vw, 25vw"
            />
          </div>
        </div>
      </section>

      {/* ── Keunggulan Strip ── */}
      <section className={styles.strip} aria-label="Keunggulan singkat">
        <span>Satu Kontraktor, Semua Tim</span>
        <span>Survei Lokasi Gratis</span>
        <span>RAB Transparan</span>
        <span>Custom Sesuai Ukuran</span>
        <span>WhatsApp Fast Response</span>
      </section>

      {/* ── Why Full Contractor Section ── */}
      <section className={styles.section} id="kenapa-kami">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Mengapa Caturaya Living?</p>
            <h2>Satu Pintu untuk Semua Kebutuhan — dari Bangunan hingga Interior</h2>
          </div>
        </div>
        <div className={cardStyles.whyGrid}>
          {[
            { icon: "🔑", title: "Satu Koordinator, Banyak Tim", desc: "Tidak perlu repot cari tukang kayu, aluminium, PVC, atau tukang bangunan sendiri. Kami koordinasikan semua." },
            { icon: "📋", title: "RAB & Estimasi Transparan", desc: "Rencana Anggaran Biaya yang jelas sejak awal. Tidak ada biaya kejutan di tengah proyek." },
            { icon: "🛠️", title: "Tim Spesialis Berpengalaman", desc: "Setiap jenis pekerjaan dikerjakan oleh tim ahli di bidangnya: kayu, aluminium, HPL, finishing, bangunan." },
            { icon: "📍", title: "Survei Lokasi Langsung", desc: "Tim kami datang ke lokasi untuk mengukur, memahami kondisi, dan memberikan rekomendasi terbaik." },
            { icon: "⚙️", title: "Custom dari Nol", desc: "Semua dikerjakan custom sesuai ukuran, desain, dan kebutuhan spesifik rumah atau properti Anda." },
            { icon: "✅", title: "Garansi Pengerjaan", desc: "Kami bertanggung jawab penuh atas kualitas dan kerapian pekerjaan, sampai Anda puas." },
          ].map((item) => (
            <div className={cardStyles.whyCard} key={item.title}>
              <span className={cardStyles.whyIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Kategori Layanan ── */}
      <section className={`${styles.section} ${styles.dark}`} id="layanan">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow} style={{ color: "var(--color-accent)" }}>Layanan Lengkap</p>
            <h2>Semua Bidang Properti — Interior, Eksterior & Bangunan</h2>
          </div>
          <Link href="/layanan" aria-label="Lihat seluruh daftar layanan Caturaya Living">Lihat Semua Layanan</Link>
        </div>

        <div className={cardStyles.categoryTabGrid}>
          {serviceCategories.map((cat) => (
            <article className={cardStyles.categoryTabCard} key={cat.id}>
              <span className={cardStyles.categoryIcon}>{cat.icon}</span>
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
              <Link href={`/layanan?kategori=${cat.id}`} className={cardStyles.categoryLink} aria-label={`Lihat layanan ${cat.label}`}>
                Lihat Layanan →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Tim Spesialis ── */}
      <section className={styles.section} id="tim">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Jaringan Tim Mitra</p>
            <h2>Tim Spesialis di Balik Setiap Proyek Caturaya Living</h2>
          </div>
          <Link href="/tentang-kami" aria-label="Pelajari lebih lanjut tentang tim Caturaya Living">Tentang Kami</Link>
        </div>

        <div className={styles.teamGrid}>
          <div className={styles.teamImageCol}>
            <div className={styles.teamImageWrapper}>
              <Image
                src="/images/home/tim-kontraktor.png"
                alt="Tim spesialis Caturaya Living — tukang kayu, aluminium, HPL, dan tukang bangunan"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className={styles.teamContent}>
            <p style={{ color: "var(--color-neutral)", marginBottom: "32px", lineHeight: "1.7" }}>
              Caturaya Living bukan sekadar satu tukang. Di balik setiap proyek, ada jaringan tim spesialis yang bekerja sesuai keahlian masing-masing — dikoordinasikan langsung oleh kami agar proyek Anda selesai rapi, tepat waktu, dan sesuai ekspektasi.
            </p>
            <div className={styles.teamSpecialistGrid}>
              {site.teamSpecialists.map((spec) => (
                <div className={styles.specialistCard} key={spec.role}>
                  <span className={styles.specialistIcon}>{spec.icon}</span>
                  <div>
                    <strong>{spec.role}</strong>
                    <p>{spec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Layanan Unggulan (daftar cepat) ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Layanan Populer</p>
            <h2>Yang Paling Sering Kami Kerjakan untuk Customer</h2>
          </div>
          <Link href="/layanan" aria-label="Lihat seluruh daftar layanan Caturaya Living">Lihat Semua</Link>
        </div>
        
        <div className={cardStyles.grid}>
          {services.slice(0, 8).map((service) => (
            <article className={cardStyles.card} key={service.slug}>
              <span>{service.title.slice(0, 2).toUpperCase()}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <a 
                href={whatsappUrl(`Halo Caturaya Living, saya ingin tanya mengenai layanan ${service.title}.`)} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Tanya mengenai layanan ${service.title} via WhatsApp`}
              >
                Tanya layanan ini
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── Area Rumah ── */}
      <section className={`${styles.section} ${styles.dark}`} id="area">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow} style={{ color: "var(--color-accent)" }}>Area Rumah</p>
            <h2>Pilih Bagian Rumah yang Ingin Dibuat Lebih Rapi & Fungsional</h2>
          </div>
          <Link href="/area-rumah" aria-label="Eksplorasi area ruangan rumah Caturaya Living">Eksplorasi Area Rumah</Link>
        </div>
        
        <div className={styles.areaList}>
          {areas.map((area) => (
            <Link href={`/area-rumah/${area.slug}`} key={area.slug} aria-label={`Eksplorasi ruangan ${area.title}`}>
              {area.title}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Portofolio ── */}
      <section className={styles.section} id="portofolio">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Portofolio Proyek</p>
            <h2>Hasil Pengerjaan Interior, Eksterior & Bangunan di Area Cilacap</h2>
          </div>
          <Link href="/portofolio" aria-label="Lihat seluruh studi kasus proyek Caturaya Living">Lihat Portofolio</Link>
        </div>
        
        <div className={cardStyles.portfolioGrid}>
          {portfolio.slice(0, 6).map((item, index) => (
            <article className={cardStyles.project} key={item.title}>
              <div className={cardStyles.projectImage}>
                <Image src={item.image} alt={`${item.title} - Kategori ${item.category}`} fill sizes="(max-width: 980px) 50vw, 33vw" />
                <span>0{index + 1}</span>
              </div>
              <div className={cardStyles.projectBody}>
                <span>{item.category} / {item.location}</span>
                <h3>{item.title}</h3>
                <p>{item.material}. Estimasi durasi pengerjaan {item.duration}.</p>
                <Link href={`/portofolio/${item.slug}`} aria-label={`Lihat detail studi kasus ${item.title}`}>
                  Lihat Studi Kasus
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Alur Kerja Section ── */}
      <section className={styles.process}>
        <p className={styles.eyebrow}>Alur Kerja Kami</p>
        <h2>Proses Terstruktur — dari Konsultasi hingga Serah Terima</h2>
        <p style={{ color: "var(--color-neutral)", fontSize: "14px", maxWidth: "600px", margin: "0 auto 36px", textAlign: "center" }}>
          Setiap proyek dikelola dengan alur yang jelas agar Anda selalu tahu progres pengerjaan dan tidak ada kebingungan di tengah jalan.
        </p>
        <div className={styles.steps}>
          {process.map((step) => <span key={step}>{step}</span>)}
        </div>
      </section>

      {/* ── Visualizer Planner ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Visualisasi Bertahap</p>
            <h2>Sketsa Konsep, Gambar 2D/3D, Hingga Simulasi Rencana Pemasangan</h2>
          </div>
          <Link href="/planner" aria-label="Buka simulator visual plan Caturaya Living">Lihat Planner Preview</Link>
        </div>
        
        <div className={cardStyles.stageGrid}>
          {designStages.map((stage) => (
            <article className={cardStyles.stageCard} key={stage.title}>
              <div className={cardStyles.stageImage}>
                <Image src={stage.image} alt={`${stage.title} visualisasi Caturaya Living`} fill sizes="(max-width: 980px) 50vw, 25vw" />
                <span>{stage.label}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimoni ── */}
      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow} style={{ color: "var(--color-accent)" }}>Testimoni Pelanggan</p>
            <h2>Cerita Customer yang Sudah Kami Bantu Wujudkan Proyeknya</h2>
          </div>
        </div>
        
        <div className={cardStyles.quoteGrid}>
          {testimonials.map((item) => (
            <figure className={cardStyles.quote} key={item.name}>
              <blockquote>"{item.quote}"</blockquote>
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Artikel & Tips ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Panduan & Artikel</p>
            <h2>Tips Material, Layout, & Estimasi Budget untuk Proyek Properti Anda</h2>
          </div>
          <Link href="/artikel" aria-label="Baca panduan dan artikel seputar renovasi rumah">Baca Artikel</Link>
        </div>
        
        <div className={cardStyles.articleGrid}>
          {articles.slice(0, 3).map((article) => (
            <Link className={cardStyles.articleCard} href={`/artikel/${article.slug}`} key={article.slug} aria-label={`Baca artikel: ${article.title}`}>
              <span>{article.readTime}</span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Pertanyaan Umum</p>
            <h2>Hal-hal yang Sering Ditanyakan Sebelum Memulai Proyek</h2>
          </div>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Kontak ── */}
      <section className={styles.contact} id="kontak">
        <div>
          <p className={styles.eyebrow}>Kontak & Konsultasi</p>
          <h2>Mulai Proyek Anda Hari Ini — Konsultasi Pertama Gratis</h2>
          <p style={{ marginTop: "16px", color: "var(--color-neutral)", lineHeight: "1.7" }}>
            Ceritakan kebutuhan Anda, kirim foto lokasi, dan biarkan kami menyusun rencana terbaik untuk properti Anda.
          </p>
          <p style={{ marginTop: "12px", fontSize: "13px" }}>{site.address}.<br />Kode Plus: <strong>{site.locationCode}</strong>.</p>
        </div>
        
        <div className={styles.contactCard}>
          <strong>WhatsApp Utama</strong>
          <span>Tholib – {site.phonePrimaryLabel}</span>
          
          <strong>WhatsApp Alternatif</strong>
          <span>Eko Suyanto – {site.phoneSecondaryLabel}</span>
          
          <a 
            className={styles.primary} 
            href={wa} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Mulai berkonsultasi via WhatsApp chat"
          >
            Mulai Konsultasi Gratis
          </a>
        </div>
      </section>
    </main>
  );
}

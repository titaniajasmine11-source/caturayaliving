import { designStages, process } from "@/lib/content";
import { getAreas, getArticles, getFaqs, getPortfolio, getServices, getTestimonials } from "@/lib/cms";
import { site, whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/home.module.css";
import cardStyles from "@/components/styles/cards.module.css";

const wa = whatsappUrl();

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
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: `+${site.phonePrimary}`,
    address: site.address,
    areaServed: ["Sidareja", "Cilacap", "Tegalsari", "Cipari", "Kedungreja"],
    description: site.tagline,
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

      {/* Hero Section */}
      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} style={{ color: "var(--color-accent)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px" }}>
            Sidareja, Cilacap dan Sekitarnya
          </p>
          <h1>Solusi Interior, Aluminium & Fasad Rumah Premium di Sidareja</h1>
          <p className={styles.lead}>
            Caturaya Living membantu merapikan rumah Anda secara presisi. Mulai dari pengerjaan kusen, pintu, jendela aluminium, kitchen set custom mewah, plafon drop ceiling, kanopi kaca tempered, gerbang pagar minimalis, hingga interior custom dengan estimasi biaya transparan.
          </p>
          <div className={styles.heroActions}>
            <a 
              className={styles.primary} 
              href={wa} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Konsultasi cepat via WhatsApp"
            >
              Konsultasi via WhatsApp
            </a>
            <Link className={styles.secondary} href="/portofolio" aria-label="Lihat portofolio proyek Caturaya Living">
              Lihat Portofolio
            </Link>
          </div>
        </div>

        {/* Premium Photography Collage instead of CSS lines */}
        <div className={styles.heroPanel} aria-label="Kolase karya arsitektural interior dan eksterior Caturaya Living">
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/home/hero-home-interior.webp" 
              alt="Fasad arsitektural aluminium modern minimalis menyatu dengan desain interior kayu Caturaya Living" 
              fill 
              sizes="(max-width: 980px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/areas/teras-depan/hero-teras-depan.webp" 
              alt="Desain teras depan minimalis dan fasad outdoor karya Caturaya Living" 
              fill 
              sizes="(max-width: 980px) 50vw, 25vw"
            />
          </div>
          <div className={styles.heroImageWrapper}>
            <Image 
              src="/images/services/kitchen-set/hero-kitchen-set.webp" 
              alt="Kitchen set custom modern mewah kombinasi kayu arsitektural hangat" 
              fill 
              sizes="(max-width: 980px) 50vw, 25vw"
            />
          </div>
        </div>
      </section>

      {/* Prominent Category Cards */}
      <section className={styles.categoryGrid} aria-label="Kategori inspirasi ruang">
        {[
          ["Living Room", "Desain backdrop TV arsitektural, lemari custom, partisi, dan finishing ruang keluarga hangat.", "01"],
          ["Kitchen", "Dapur idaman dengan kitchen set custom modern yang mengikuti kepraktisan alur masak harian.", "02"],
          ["Exterior & Fasad", "Kusen aluminium presisi, kanopi carport tempered glass, gerbang dan pagar eksterior minimalis.", "03"],
        ].map(([title, copy, num]) => (
          <article className={cardStyles.categoryCard} key={title}>
            <div className={cardStyles.categoryImage}>{num}</div>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Keunggulan Strip */}
      <section className={styles.strip} aria-label="Keunggulan singkat">
        <span>Survei Lokasi Cepat</span>
        <span>Estimasi Biaya Jelas</span>
        <span>Custom Sesuai Ukuran</span>
        <span>WhatsApp Fast Response</span>
      </section>

      {/* Layanan Section */}
      <section className={styles.section} id="layanan">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Layanan Utama</p>
            <h2>Kebutuhan Rumah dari Fasad Depan hingga Dapur Belakang</h2>
          </div>
          <Link href="/layanan" aria-label="Lihat seluruh daftar layanan Caturaya Living">Lihat Semua Layanan</Link>
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

      {/* Area Rumah Section */}
      <section className={`${styles.section} ${styles.dark}`} id="area">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow} style={{ color: "var(--color-accent)" }}>Area Rumah</p>
            <h2>Pilih Bagian Rumah yang Ingin Dibuat Lebih Rapi & Fungsional</h2>
          </div>
          <Link href="/area-rumah" aria-label="Eksplorasi area ruangan rumah Caturaya Living">Eksplor Area Rumah</Link>
        </div>
        
        <div className={styles.areaList}>
          {areas.map((area) => (
            <Link href={`/area-rumah/${area.slug}`} key={area.slug} aria-label={`Eksplorasi ruangan ${area.title}`}>
              {area.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Portofolio Section */}
      <section className={styles.section} id="portofolio">
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Portofolio Proyek</p>
            <h2>Hasil Pengerjaan Interior & Eksterior di Area Cilacap</h2>
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

      {/* Visualizer Planner Intro Section */}
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

      {/* Alur Kerja Section */}
      <section className={styles.process}>
        <p className={styles.eyebrow}>Alur Kerja Kami</p>
        <h2>Proses Dibuat Jelas Agar Rencana Bangun & Renovasi Terasa Ringan</h2>
        <div className={styles.steps}>
          {process.map((step) => <span key={step}>{step}</span>)}
        </div>
      </section>

      {/* Testimoni Section */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Testimoni Pelanggan</p>
            <h2>Kesan Customer Lokal Setelah Berkonsultasi dan Serah Terima Proyek</h2>
          </div>
        </div>
        
        <div className={cardStyles.quoteGrid}>
          {testimonials.map((item) => (
            <figure className={cardStyles.quote} key={item.name}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SEO Articles Section */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Panduan & Artikel</p>
            <h2>Tips Menentukan Material, Layout, Serta Perkiraan Budget Properti</h2>
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

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionHeadContent}>
            <p className={styles.eyebrow}>Pertanyaan Umum</p>
            <h2>Beberapa Pertanyaan yang Sering Diajukan Customer Sebelum Memulai Proyek</h2>
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

      {/* Contact Section */}
      <section className={styles.contact} id="kontak">
        <div>
          <p className={styles.eyebrow}>Kontak & Alamat</p>
          <h2>Konsultasikan Kebutuhan Proyek Rumah Anda Secara Gratis</h2>
          <p style={{ marginTop: "16px" }}>{site.address}.<br />Kode Plus Google Maps: <strong>{site.locationCode}</strong>.</p>
        </div>
        
        <div className={styles.contactCard}>
          <strong>WhatsApp Utama</strong>
          <span>Tholib - {site.phonePrimaryLabel}</span>
          
          <strong>WhatsApp Alternatif</strong>
          <span>Eko Suyanto - {site.phoneSecondaryLabel}</span>
          
          <a 
            className={styles.primary} 
            href={wa} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Mulai berkonsultasi via WhatsApp chat"
          >
            Mulai Konsultasi
          </a>
        </div>
      </section>
    </main>
  );
}

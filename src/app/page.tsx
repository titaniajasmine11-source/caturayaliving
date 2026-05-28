import styles from "./page.module.css";

const whatsappText = encodeURIComponent(`Halo Caturaya Living, saya ingin konsultasi.

Nama:
Lokasi:
Kebutuhan:
Area rumah:
Ukuran perkiraan:
Budget perkiraan:
Kapan ingin dikerjakan:`);

const whatsappUrl = `https://wa.me/6285119467138?text=${whatsappText}`;

const services = [
  "Kusen Aluminium",
  "Pintu & Jendela Aluminium",
  "Kitchen Set Custom",
  "Plafon Gypsum/PVC",
  "Kanopi",
  "Partisi Ruangan",
  "Interior Custom",
  "Home Finishing",
];

const areas = [
  "Kitchen / Dapur",
  "Living Room",
  "Teras Depan",
  "Carport & Kanopi",
  "Master Room",
  "Ruko / Tempat Usaha",
];

const portfolio = [
  "Kitchen Set Minimalis di Sidareja",
  "Kusen Aluminium Rumah Tegalsari",
  "Plafon Ruang Tamu Sidareja",
  "Kanopi Carport Cilacap",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Caturaya Living">
          <span className={styles.mark}>CL</span>
          <span>Caturaya Living</span>
        </a>
        <nav className={styles.nav} aria-label="Menu utama">
          <a href="#layanan">Layanan</a>
          <a href="#area">Area Rumah</a>
          <a href="#portofolio">Portofolio</a>
          <a href="#kontak">Kontak</a>
        </nav>
        <a className={styles.headerCta} href={whatsappUrl} target="_blank" rel="noreferrer">
          Konsultasi WhatsApp
        </a>
      </header>

      <section id="top" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Sidareja, Cilacap dan sekitarnya</p>
          <h1>Solusi Interior, Aluminium & Finishing Rumah di Sidareja</h1>
          <p className={styles.lead}>
            Caturaya Living melayani pembuatan dan pemasangan kusen aluminium,
            pintu, jendela, kitchen set, plafon, partisi, kanopi, dan interior
            custom dengan proses jelas dari konsultasi sampai pemasangan.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noreferrer">
              Konsultasi via WhatsApp
            </a>
            <a className={styles.secondary} href="#portofolio">
              Lihat Portofolio
            </a>
          </div>
        </div>
        <div className={styles.heroPanel} aria-label="Ringkasan layanan">
          <span>Interior custom</span>
          <span>Aluminium</span>
          <span>Kitchen set</span>
          <span>Plafon</span>
          <strong>Dari desain, produksi, sampai pemasangan.</strong>
        </div>
      </section>

      <section className={styles.section} id="layanan">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Layanan utama</p>
          <h2>Kebutuhan rumah dari depan sampai belakang</h2>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <article className={styles.card} key={service}>
              <h3>{service}</h3>
              <p>
                Konsultasi bahan, ukuran, model, estimasi awal, produksi, dan
                pemasangan sesuai kondisi lokasi.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">Tanya layanan ini</a>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`} id="area">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Area rumah</p>
          <h2>Pilih berdasarkan bagian rumah yang ingin dirapikan</h2>
        </div>
        <div className={styles.areaList}>
          {areas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className={styles.section} id="portofolio">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Portofolio awal</p>
          <h2>Contoh struktur proyek yang siap diganti foto asli</h2>
        </div>
        <div className={styles.portfolioGrid}>
          {portfolio.map((item, index) => (
            <article className={styles.project} key={item}>
              <div className={styles.projectImage}>0{index + 1}</div>
              <h3>{item}</h3>
              <p>Lokasi lokal, jenis pekerjaan, material, durasi, dan hasil akhir akan ditampilkan rapi.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <p className={styles.eyebrow}>Alur kerja</p>
        <h2>Proses dibuat jelas agar customer mudah mengambil keputusan</h2>
        <div className={styles.steps}>
          {[
            "Konsultasi",
            "Kirim foto/ukuran",
            "Survei lokasi",
            "Penawaran harga",
            "Produksi",
            "Pemasangan",
          ].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="kontak">
        <div>
          <p className={styles.eyebrow}>Kontak</p>
          <h2>Konsultasikan kebutuhan rumah Anda</h2>
          <p>
            Jalan Seruni RT 09 RW 02, Desa Tegalsari, Kecamatan Sidareja,
            Kabupaten Cilacap, Jawa Tengah. Kode lokasi: GQ7C+79 Tegalsari.
          </p>
        </div>
        <div className={styles.contactCard}>
          <strong>WhatsApp utama</strong>
          <span>Tholib - 0851-1946-7138</span>
          <strong>WhatsApp alternatif</strong>
          <span>Eko Suyanto - 0895-7030-18230</span>
          <a className={styles.primary} href={whatsappUrl} target="_blank" rel="noreferrer">
            Mulai Konsultasi
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Caturaya Living</span>
        <span>Interior, aluminium, kitchen set, plafon, kanopi, partisi, dan home finishing.</span>
      </footer>

      <a className={styles.sticky} href={whatsappUrl} target="_blank" rel="noreferrer">
        Konsultasi WhatsApp
      </a>
    </main>
  );
}

import { process, serviceCategories } from "@/lib/content";
import { site, whatsappUrl } from "@/lib/site";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import homeStyles from "../styles/home.module.css";
import aboutStyles from "../styles/about.module.css";

export const metadata = {
  title: "Tentang Caturaya Living | Full Kontraktor Properti Sidareja, Cilacap",
  description: "Caturaya Living adalah full kontraktor properti di Sidareja, Cilacap. Satu koordinator untuk semua tim spesialis: tukang kayu, aluminium, PVC/HPL, kitchen set, dan tukang bangunan.",
};

export default function TentangKamiPage() {
  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Tentang Kami</span>
      </nav>

      {/* Hero Header */}
      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Profil Perusahaan</p>
        <h1>Full Kontraktor Properti — Satu Pintu, Semua Dikerjakan</h1>
        <p>
          Caturaya Living hadir sebagai <strong>kontraktor properti full-service</strong> di Sidareja, Cilacap dan sekitarnya. Kami tidak hanya mengerjakan satu bidang — kami mengkoordinasikan semua jenis pekerjaan properti, dari eksterior hingga interior, melalui jaringan tim spesialis yang sudah berpengalaman di bidangnya masing-masing.
        </p>
      </header>

      {/* Tentang Model Bisnis */}
      <section className={styles.richText} style={{ marginBottom: "60px" }}>
        <h2>Mengapa "Full Kontraktor" Itu Penting untuk Anda?</h2>
        <p>
          Kebanyakan pemilik rumah atau properti kesulitan saat harus mengelola banyak tukang secara terpisah — tukang kayu untuk kusen, tukang aluminium untuk pintu jendela, tukang PVC untuk plafon, lalu tukang bangunan untuk renovasi dinding atau lantai. Koordinasi ini membutuhkan waktu, energi, dan pengalaman teknis.
        </p>
        <p>
          <strong>Caturaya Living hadir sebagai satu pintu masuk.</strong> Anda cukup menghubungi kami, ceritakan kebutuhan proyek Anda, dan kami yang mengurus koordinasi seluruh tim spesialis — dari perencanaan, fabrikasi, pemasangan, hingga finishing akhir.
        </p>

        <h2>Apa yang Kami Kerjakan?</h2>
        <ul className={styles.featureList}>
          <li><strong>Kusen Kayu & Aluminium:</strong> Kusen pintu dan jendela dari kayu solid (jati, mahoni) maupun aluminium custom presisi.</li>
          <li><strong>Perabotan Rumah Custom:</strong> Meja, kursi, bufet, meja makan, rak buku, dan furniture kayu solid sesuai desain Anda.</li>
          <li><strong>Kitchen Set:</strong> Dapur custom dari desain hingga instalasi — kabinet, top table, backsplash, dengan material HPL, MDF, atau kayu solid.</li>
          <li><strong>HPL & PVC Finishing:</strong> Lapisan finishing HPL premium untuk kabinet, lemari, panel dinding — ratusan pilihan motif dan warna.</li>
          <li><strong>Plafon Gypsum & PVC:</strong> Pemasangan plafon untuk ruang tamu, kamar, dapur, ruko — flat ceiling maupun drop ceiling.</li>
          <li><strong>Kanopi:</strong> Kanopi carport, teras, dan area belakang dengan berbagai pilihan atap dan struktur rangka.</li>
          <li><strong>Partisi & Kaca:</strong> Partisi aluminium, kaca tempered, atau gypsum untuk membagi ruang dengan tetap menjaga estetika.</li>
          <li><strong>Pagar & Gerbang:</strong> Gerbang dan pagar custom untuk memperkuat fasad dan keamanan properti Anda.</li>
          <li><strong>Jasa Bangunan:</strong> Renovasi bangunan, pemasangan keramik, plesteran, dinding, dan pekerjaan sipil ringan hingga menengah.</li>
          <li><strong>Renovasi Total:</strong> Paket renovasi menyeluruh dengan semua tim spesialis dikelola dalam satu kontrak.</li>
        </ul>
      </section>

      {/* Tim Spesialis */}
      <section className={aboutStyles.teamSection}>
        <h2>Jaringan Tim Spesialis Kami</h2>
        <p>Di balik setiap proyek Caturaya Living, ada tim-tim ahli yang bekerja sesuai spesialisasi masing-masing:</p>
        
        <div className={aboutStyles.specialistGrid}>
          {site.teamSpecialists.map((spec) => (
            <div className={aboutStyles.specialistCard} key={spec.role}>
              <span className={aboutStyles.icon}>{spec.icon}</span>
              <div>
                <strong>{spec.role}</strong>
                <p>{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cakupan Layanan */}
      <section className={styles.richText} style={{ marginTop: "60px", marginBottom: "60px" }}>
        <h2>Lima Kategori Layanan Utama</h2>
        <div className={aboutStyles.categoryList}>
          {serviceCategories.map((cat) => (
            <div className={aboutStyles.categoryItem} key={cat.id}>
              <span>{cat.icon}</span>
              <div>
                <strong>{cat.label}</strong>
                <p>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filosofi & Nilai */}
      <section className={styles.richText} style={{ marginBottom: "60px" }}>
        <h2>Filosofi & Nilai Kerja Kami</h2>
        <p>Kami meyakini bahwa proyek properti yang baik dimulai dari komunikasi yang jelas dan rencana yang terstruktur. Oleh karena itu, dalam setiap proyek kami berpegang pada lima nilai utama:</p>
        
        <ul className={styles.featureList}>
          <li><strong>Terstruktur:</strong> Alur kerja yang jelas dari konsultasi hingga serah terima, agar Anda selalu tahu posisi progres proyek.</li>
          <li><strong>Transparan:</strong> RAB dan estimasi biaya yang jujur sejak awal. Tidak ada biaya tersembunyi atau kejutan di tengah proyek.</li>
          <li><strong>Rapi:</strong> Detail potongan, sambungan, dan finishing dikerjakan secara presisi oleh tim yang tepat di bidangnya.</li>
          <li><strong>Fungsional:</strong> Desain dan pengerjaan yang tidak hanya indah, tetapi juga memperhatikan kebutuhan dan aktivitas harian pengguna.</li>
          <li><strong>Lokal & Responsif:</strong> Kami berbasis di Sidareja, Cilacap — mudah dihubungi, cepat respons, dan bisa survei lokasi langsung.</li>
        </ul>
      </section>

      {/* Wilayah Layanan */}
      <section className={styles.richText} style={{ marginBottom: "60px" }}>
        <h2>Wilayah Layanan</h2>
        <p>Area utama kami mencakup:</p>
        <ul className={styles.featureList}>
          <li>Sidareja dan sekitarnya</li>
          <li>Kecamatan Cilacap (kota dan wilayah sekitar)</li>
          <li>Tegalsari, Cipari, Kedungreja</li>
          <li>Daerah lain di Kabupaten Cilacap (dikonsultasikan terlebih dahulu)</li>
        </ul>
      </section>

      {/* Alur Kerja */}
      <section className={homeStyles.process} style={{ borderRadius: "var(--radius-lg)" }}>
        <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700", display: "block", marginBottom: "12px" }}>Alur Kerja Terstruktur</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-neutral-dark)", marginBottom: "8px", fontWeight: "600" }}>
          Dari Konsultasi Pertama hingga Serah Terima Kunci
        </h2>
        <p style={{ color: "var(--color-neutral)", fontSize: "14px", maxWidth: "600px", margin: "0 auto 36px" }}>
          Kami memastikan setiap langkah dikomunikasikan dengan jelas agar proyek properti Anda terasa tenang dan terkendali.
        </p>
        
        <div className={homeStyles.steps} style={{ marginBottom: "36px" }}>
          {process.map((step) => <span key={step}>{step}</span>)}
        </div>
        
        <a className="primary" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          Hubungi Tim Sekarang — Gratis Konsultasi
        </a>
      </section>
    </main>
  );
}

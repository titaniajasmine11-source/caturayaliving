import styles from "../../components/styles/admin.module.css";

export const metadata = {
  title: "Operasional Digital Eko Suyanto Workshop",
  description: "Panduan operasional digital Eko Suyanto Workshop untuk Google Business Profile, kalender konten, SOP follow-up, dan workflow publikasi.",
  robots: { index: false, follow: false },
};

const googleBusiness = [
  "Lengkapi nama, kategori, alamat, jam layanan, nomor WhatsApp, dan area layanan.",
  "Upload logo, foto workshop/proyek, dan foto before-after setiap minggu.",
  "Gunakan posting Google Business untuk promo edukasi, portofolio, dan tips material.",
  "Minta review customer setelah serah terima pekerjaan.",
  "Balas semua review dengan bahasa lokal yang ramah dan profesional."
];

const socialWorkflow = [
  "Ambil foto/video vertikal saat survei, produksi, pemasangan, dan serah terima.",
  "Ubah satu proyek menjadi artikel, carousel Instagram, video pendek, dan post Google Business.",
  "Gunakan CTA yang sama: kirim foto lokasi, ukuran perkiraan, dan budget.",
  "Simpan semua caption dan ide di content_calendar.",
  "Review performa konten bulanan dari leads yang masuk."
];

const roles = [
  ["Super Admin", "Konfigurasi, user, backup, dan publish final."],
  ["Marketing", "Artikel, portofolio, kalender konten, dan SEO."],
  ["CS", "Lead, follow-up, jadwal survei, dan template WhatsApp."],
  ["Tim Lapangan", "Catatan survei, foto proyek, dan progress pemasangan."]
];

export default function OperasionalPage() {
  return (
    <main className={styles.adminDashboard}>
      <header className={styles.adminHeader} style={{ display: "block" }}>
        <p className={styles.eyebrow}>Internal Operasional Digital</p>
        <h1>Workflow Sistem Operasional Terintegrasi</h1>
        <p style={{ color: "var(--color-neutral-muted)", marginTop: "8px", fontSize: "14px" }}>
          Panduan harian tim dalam menyinkronkan data website, optimalisasi Google Business Profile, alur konten sosial media, dan koordinasi lapangan.
        </p>
      </header>

      <section style={{ marginTop: "24px" }}>
        <div className={styles.opsGrid}>
          <article className={styles.opsPanel}>
            <p className={styles.eyebrow}>Google Business Profile</p>
            <h2>Checklist Google Maps & Local SEO</h2>
            <ul className={styles.checkList}>
              {googleBusiness.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          
          <article className={styles.opsPanel}>
            <p className={styles.eyebrow}>Sosial Media</p>
            <h2>Workflow Distribusi Konten Proyek</h2>
            <ul className={styles.checkList}>
              {socialWorkflow.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          
          <article className={styles.opsPanelWide}>
            <p className={styles.eyebrow}>Peran Tim Proyek</p>
            <h2>Pembagian Tanggung Jawab Alur Dashboard & Lapangan</h2>
            <div className={styles.opsTable}>
              {roles.map(([role, detail]) => (
                <article key={role}>
                  <strong>{role}</strong>
                  <span style={{ fontSize: "13px", fontWeight: "normal", color: "var(--color-neutral)", textAlign: "left" }}>
                    {detail}
                  </span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

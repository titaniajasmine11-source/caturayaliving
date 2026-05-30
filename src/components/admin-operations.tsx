import { areas, articles, portfolio, services } from "@/lib/content";
import styles from "./styles/admin.module.css";

const priceRules = [
  ["Kitchen Set", "basic", "meter lari", "Rp1,8 jt", "Kabinet bawah/atas sederhana"],
  ["Kitchen Set", "standard", "meter lari", "Rp2,6 jt", "Material dan aksesoris menengah"],
  ["Kitchen Set", "premium", "meter lari", "Rp3,8 jt", "Finishing premium dan detail custom"],
  ["Aluminium", "standard", "m2", "Rp900 rb", "Kusen/pintu/jendela sesuai bukaan"],
  ["Plafon", "gypsum", "m2", "Rp165 rb", "Model datar indoor"],
  ["Kanopi", "galvanis", "m2", "Rp650 rb", "Rangka dan atap standar"],
  ["Partisi", "kaca", "m2", "Rp950 rb", "Partisi kaca/aluminium"],
];

const calendar = [
  ["Minggu 1", "Artikel", "Cara memilih kusen aluminium", "Draft"],
  ["Minggu 1", "Instagram", "Before-after kitchen set", "Idea"],
  ["Minggu 2", "Artikel", "Estimasi kitchen set custom", "Review"],
  ["Minggu 2", "TikTok", "Tips ukur dapur sebelum survei", "Idea"],
  ["Minggu 3", "Google Business", "Upload portofolio kanopi", "Approved"],
  ["Minggu 4", "Artikel", "Partisi ruko kecil", "Draft"],
];

const followUpSop = [
  "Lead baru dibalas maksimal 15 menit pada jam kerja.",
  "Jika lewat jam kerja, balas pagi hari berikutnya.",
  "Follow-up penawaran H+1, H+3, dan H+7.",
  "Jika belum siap, ubah status menjadi Follow-up Nanti.",
  "Semua survei wajib punya alamat, patokan, tanggal, jam, dan kebutuhan utama.",
];

const productionChecklist = [
  "Logo final, favicon, nomor WhatsApp, dan alamat sudah benar.",
  "Foto proyek asli mengganti visual placeholder prioritas homepage/portofolio.",
  "SUPABASE_SERVICE_ROLE_KEY dan ADMIN_TOKEN sudah ada di Vercel.",
  "SQL schema terbaru sudah dijalankan di Supabase.",
  "Form konsultasi, simulasi harga, planner, dan admin sudah diuji di HP.",
  "Service role key yang pernah terkirim di chat sudah di-rotate sebelum go-live.",
];

export function AdminOperations() {
  const cmsInventory = [
    ["Service", services.length, "Konten statis siap migrasi ke cms_items"],
    ["House Area", areas.length, "Konten statis siap migrasi ke cms_items"],
    ["Portfolio", portfolio.length, "Butuh foto proyek asli"],
    ["Article", articles.length, "Minimal SEO MVP terpenuhi"],
  ];

  return (
    <div className={styles.opsGrid}>
      <section className={styles.opsPanel}>
        <p className={styles.eyebrow}>Price rules</p>
        <h2>Baseline simulasi harga untuk admin</h2>
        <div className={styles.opsTable}>
          {priceRules.map(([service, pack, unit, price, notes]) => (
            <article key={`${service}-${pack}`}>
              <strong>{service} / {pack}</strong>
              <span>{unit} - {price}</span>
              <p>{notes}</p>
            </article>
          ))}
        </div>
      </section>
      
      <section className={styles.opsPanel}>
        <p className={styles.eyebrow}>Content calendar</p>
        <h2>Rencana konten 30 hari</h2>
        <div className={styles.opsTable}>
          {calendar.map(([week, channel, topic, status]) => (
            <article key={`${week}-${topic}`}>
              <strong>{week} / {channel}</strong>
              <span>{status}</span>
              <p>{topic}</p>
            </article>
          ))}
        </div>
      </section>
      
      <section className={styles.opsPanel}>
        <p className={styles.eyebrow}>SOP follow-up</p>
        <h2>Aturan CS agar lead tidak tercecer</h2>
        <ul className={styles.checkList}>
          {followUpSop.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      
      <section className={styles.opsPanel}>
        <p className={styles.eyebrow}>CMS inventory</p>
        <h2>Pemetaan konten ke dashboard</h2>
        <div className={styles.opsTable}>
          {cmsInventory.map(([type, total, notes]) => (
            <article key={type}>
              <strong>{type}</strong>
              <span>{total} item</span>
              <p>{notes}</p>
            </article>
          ))}
        </div>
      </section>
      
      <section className={styles.opsPanelWide}>
        <p className={styles.eyebrow}>Production checklist</p>
        <h2>Checklist sebelum website dipublikasikan penuh</h2>
        <ul className={styles.checkList}>
          {productionChecklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

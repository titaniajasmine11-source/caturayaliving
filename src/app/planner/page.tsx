import { VisualPlanner } from "@/components/visual-planner";
import { designStages } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/subpages.module.css";
import cardStyles from "@/components/styles/cards.module.css";
import homeStyles from "../styles/home.module.css";

export const metadata = {
  title: "Visual Planner Preview Arsitektural | Caturaya Living",
  description: "Preview konsep desain 2D/3D visual arsitektural interior dan eksterior Anda bersama Caturaya Living.",
};

export default function PlannerPage() {
  return (
    <main className={styles.subpageWrapper}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <span>Visual Planner</span>
      </nav>

      <header className={styles.subpageHeader}>
        <p className={styles.articleMeta} style={{ fontSize: "12px", fontWeight: "700" }}>Rancang Bangun Denah</p>
        <h1>Visual Konseptual Proyek Rumah</h1>
        <p>
          Kami memandu Anda dalam memahami konsep, tata letak, warna material, dan pembagian ruang secara transparan. Mulai dari sketsa konsep, denah 2D, pratinjau 3D realistis, hingga diagram tahapan progres pekerjaan arsitektural.
        </p>
      </header>

      <section style={{ marginBottom: "60px" }}>
        <header className={styles.subpageHeader} style={{ borderBottom: "none", marginBottom: "20px", paddingBottom: 0 }}>
          <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700" }}>Konfigurator Briefing</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "600", color: "var(--color-neutral-dark)" }}>
            Buat Rancangan Kasar Area Rumah Anda
          </h2>
        </header>
        <VisualPlanner />
      </section>

      <section style={{ marginBottom: "60px" }}>
        <div className={cardStyles.stageGrid}>
          {designStages.map((stage) => (
            <article className={cardStyles.stageCard} key={stage.title}>
              <div className={cardStyles.stageImage}>
                <Image src={stage.image} alt={`${stage.title} Caturaya Living`} fill sizes="(max-width: 980px) 50vw, 25vw" />
                <span>{stage.label}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className={homeStyles.process} style={{ borderRadius: "var(--radius-lg)" }}>
        <p className={styles.articleMeta} style={{ fontSize: "11px", fontWeight: "700", display: "block", marginBottom: "12px" }}>Output Konsultasi Desain</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--color-neutral-dark)", marginBottom: "16px", fontWeight: "600" }}>
          Ingin Visualisasi Khusus Untuk Rumah Anda?
        </h2>
        <p style={{ color: "var(--color-neutral)", fontSize: "14px", maxWidth: "600px", margin: "0 auto 24px" }}>
          Kirimkan foto lokasi, perkiraan ukuran, dan referensi model. Tim arsitektur kami akan memproses arahan visual (sketsa, 2D, atau 3D) yang sesuai kebutuhan Anda.
        </p>
        <a 
          className="primary" 
          href={whatsappUrl("Halo Caturaya Living, saya ingin konsultasi detail planner sketsa 2D/3D/4D untuk proyek rumah saya.")} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Mulai Diskusi Desain
        </a>
      </section>
    </main>
  );
}

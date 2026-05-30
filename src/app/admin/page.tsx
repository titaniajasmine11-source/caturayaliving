import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminOperations } from "@/components/admin-operations";
import { AdminResourceManager } from "@/components/admin-resource-manager";
import styles from "../../components/styles/admin.module.css";

export const metadata = {
  title: "Admin Ringkas | Eko Suyanto Workshop",
  description: "Dashboard ringkas Eko Suyanto Workshop untuk memantau konten dan lead lokal sementara.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className={styles.adminDashboard}>
      <header className={styles.adminHeader} style={{ display: "block" }}>
        <p className={styles.eyebrow}>Dashboard Kontrol Internal</p>
        <h1>Eko Suyanto Workshop Admin</h1>
        <p style={{ color: "var(--color-neutral-muted)", marginTop: "8px", fontSize: "14px" }}>
          CRM ringan untuk memantau data lead, memperbarui referensi harga, serta SOP tim lapangan dan checklist publikasi.
        </p>
      </header>
      
      <section style={{ marginBottom: "40px" }}>
        <AdminDashboard />
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <AdminResourceManager />
      </section>
      
      <section style={{ marginBottom: "40px" }}>
        <AdminOperations />
      </section>
    </main>
  );
}

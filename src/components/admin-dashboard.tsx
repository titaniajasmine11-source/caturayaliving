"use client";

import { areas, articles, portfolio, services } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles/admin.module.css";

const leadStatuses = [
  { value: "new", label: "Baru" },
  { value: "contacted", label: "Sudah Dihubungi" },
  { value: "consulting", label: "Konsultasi" },
  { value: "estimate_requested", label: "Minta Estimasi" },
  { value: "survey_scheduled", label: "Jadwal Survei" },
  { value: "survey_done", label: "Sudah Survei" },
  { value: "proposal_sent", label: "Penawaran" },
  { value: "negotiation", label: "Negosiasi" },
  { value: "won", label: "Closing" },
  { value: "lost", label: "Batal" },
  { value: "follow_up_later", label: "Follow-up Nanti" },
] as const;

const replyTemplates = [
  { label: "Balasan awal", text: "Halo Kak, terima kasih sudah menghubungi Caturaya Living.\n\nKami bantu untuk kebutuhan interior, aluminium, kitchen set, plafon, kanopi, dan home finishing di area Sidareja, Cilacap, dan sekitarnya.\n\nBoleh dibantu isi beberapa data dulu ya:\n1. Lokasi:\n2. Kebutuhan:\n3. Ukuran perkiraan:\n4. Ada foto lokasi/referensi?\n5. Kapan rencana pengerjaan?" },
  { label: "Follow-up estimasi", text: "Halo Kak, untuk estimasi awal kami perlu ukuran dan foto lokasi agar bisa memberi gambaran lebih tepat.\n\nJika ingin hasil lebih akurat, kami bisa jadwalkan survei lokasi." },
  { label: "Jadwal survei", text: "Baik Kak, untuk survei lokasi mohon konfirmasi:\nNama:\nAlamat lengkap:\nPatokan lokasi:\nHari/tanggal:\nJam:\nKebutuhan utama:" },
  { label: "Follow-up penawaran", text: "Halo Kak, kami ingin menindaklanjuti penawaran kebutuhan proyeknya. Apakah ada yang ingin ditanyakan atau disesuaikan dari bahan, model, atau budget?" },
] as const;

type LeadStatus = (typeof leadStatuses)[number]["value"];

type Lead = {
  id?: string;
  name: string;
  phone: string;
  location: string;
  need: string;
  area: string;
  size: string;
  budget: string;
  notes: string;
  createdAt?: string;
  created_at?: string;
  source: string;
  status?: LeadStatus;
  follow_up_at?: string;
  survey_date?: string;
  assigned_to?: string;
  offer_value?: number;
};

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [source, setSource] = useState<"loading" | "supabase" | "local">("loading");
  const [message, setMessage] = useState("Memuat lead...");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [manualLead, setManualLead] = useState({ name: "", phone: "", location: "", need: "Kitchen Set Custom", area: "Kitchen / Dapur", size: "", budget: "", notes: "", source: "manual_admin", status: "new" as LeadStatus });

  useEffect(() => {
    let active = true;

    async function loadLeads() {
      try {
        const response = await fetch("/api/admin/leads", { cache: "no-store" });
        const result = (await response.json()) as { ok?: boolean; configured?: boolean; leads?: Lead[]; error?: string };

        if (!active) return;

        if (result.ok && result.leads) {
          setLeads(result.leads);
          setSource("supabase");
          setMessage("Lead dimuat dari Supabase.");
          return;
        }

        if (response.status === 401) {
          loadLocalLeads("Token admin belum valid. Masukkan token untuk membuka lead Supabase.");
          return;
        }

        loadLocalLeads(result.configured === false ? "Supabase belum dikonfigurasi. Menampilkan fallback browser-local." : result.error ?? "Gagal memuat Supabase. Menampilkan fallback browser-local.");
      } catch {
        if (active) {
          loadLocalLeads("Gagal menghubungi API admin. Menampilkan fallback browser-local.");
        }
      }
    }

    function loadLocalLeads(statusMessage: string) {
      let localLeads: Lead[] = [];
      try {
        const parsed = JSON.parse(window.localStorage.getItem("caturaya-leads") ?? "[]") as unknown;
        localLeads = Array.isArray(parsed) ? parsed as Lead[] : [];
      } catch {
        localLeads = [];
      }
      setLeads(localLeads);
      setSource("local");
      setMessage(statusMessage);
    }

    loadLeads();

    return () => {
      active = false;
    };
  }, []);

  async function logout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Keluar dari sesi admin...");

    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      window.location.href = "/admin/login";
    } catch {
      setMessage("Gagal keluar dari sesi admin.");
    }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "caturaya-leads.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    const headers = ["name", "phone", "location", "need", "area", "size", "budget", "source", "status", "created_at", "notes"];
    const rows = filteredLeads.map((lead) => headers.map((key) => {
      const value = key === "created_at" ? lead.created_at ?? lead.createdAt ?? "" : String(lead[key as keyof Lead] ?? "");
      return `"${value.replaceAll('"', '""')}"`;
    }).join(","));
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "caturaya-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function createManualLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (source !== "supabase") {
      const lead = { ...manualLead, createdAt: new Date().toISOString() };
      const nextLeads = [lead, ...leads];
      window.localStorage.setItem("caturaya-leads", JSON.stringify(nextLeads.slice(0, 100)));
      setLeads(nextLeads);
      setMessage("Lead manual disimpan ke browser-local.");
      return;
    }

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(manualLead),
      });
      const result = (await response.json()) as { ok?: boolean; lead?: Lead; error?: string };

      if (!result.ok || !result.lead) {
        setMessage(result.error ?? "Gagal menambah lead manual.");
        return;
      }

      setLeads((current) => [result.lead as Lead, ...current]);
      setMessage("Lead manual ditambahkan ke Supabase.");
    } catch {
      setMessage("Gagal menghubungi API saat menambah lead manual.");
    }
  }

  async function updateLead(id: string | undefined, updates: Partial<Pick<Lead, "status" | "notes" | "follow_up_at" | "survey_date" | "assigned_to" | "offer_value">>) {
    if (!id || source !== "supabase") return;

    const previousLeads = leads;
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, ...updates } : lead));

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!result.ok) {
        setLeads(previousLeads);
        setMessage(result.error ?? "Gagal mengubah lead.");
      } else {
        setMessage("Lead diperbarui.");
      }
    } catch {
      setLeads(previousLeads);
      setMessage("Gagal menghubungi API saat mengubah lead.");
    }
  }

  async function sendCloudReply(phone: string, message: string) {
    try {
      const response = await fetch("/api/admin/whatsapp-cloud", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/^0/, "62").replace(/[^0-9]/g, ""), message }),
      });
      const result = (await response.json()) as { ok?: boolean; configured?: boolean; waUrl?: string; error?: string };

      if (!result.ok) {
        setMessage(result.error ?? "Gagal mengirim WhatsApp Cloud.");
        return;
      }

      if (result.configured === false && result.waUrl) {
        window.open(result.waUrl, "_blank", "noopener,noreferrer");
        setMessage("WhatsApp Cloud belum dikonfigurasi. Membuka fallback wa.me.");
        return;
      }

      setMessage("Pesan WhatsApp Cloud terkirim.");
    } catch {
      setMessage("Gagal menghubungi API WhatsApp Cloud.");
    }
  }

  const leadSources = [...new Set(leads.map((lead) => lead.source).filter(Boolean))];
  const filteredLeads = leads.filter((lead) => (statusFilter === "all" || (lead.status ?? "new") === statusFilter) && (sourceFilter === "all" || lead.source === sourceFilter));
  const newLeads = leads.filter((lead) => (lead.status ?? "new") === "new").length;
  const scheduledSurveys = leads.filter((lead) => lead.status === "survey_scheduled").length;
  const proposals = leads.filter((lead) => lead.status === "proposal_sent").length;
  const wonLeads = leads.filter((lead) => lead.status === "won").length;
  const today = new Date().toISOString().slice(0, 10);
  const followUpsDue = leads.filter((lead) => lead.follow_up_at && lead.follow_up_at.slice(0, 10) <= today && !["won", "lost"].includes(lead.status ?? "new")).length;
  const totalOfferValue = leads.reduce((total, lead) => total + (lead.offer_value ?? 0), 0);

  return (
    <div className={styles.adminGrid}>
      <section className={styles.adminStats}>
        <article><span>Layanan</span><strong>{services.length}</strong></article>
        <article><span>Area Rumah</span><strong>{areas.length}</strong></article>
        <article><span>Portofolio</span><strong>{portfolio.length}</strong></article>
        <article><span>Artikel</span><strong>{articles.length}</strong></article>
        <article><span>Leads</span><strong>{leads.length}</strong></article>
        <article><span>Baru</span><strong>{newLeads}</strong></article>
        <article><span>Survei</span><strong>{scheduledSurveys}</strong></article>
        <article><span>Penawaran</span><strong>{proposals}</strong></article>
        <article><span>Closing</span><strong>{wonLeads}</strong></article>
        <article><span>Follow-up</span><strong>{followUpsDue}</strong></article>
        <article style={{ gridColumn: "span 2" }}><span>Nilai Penawaran</span><strong>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalOfferValue)}</strong></article>
      </section>

      <section className={styles.adminPanel}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>{source === "supabase" ? "Koneksi Supabase Aktif" : "Sesi Offline (Local)"}</p>
          <h2>Kelola Prospek & Pelanggan Caturaya Living</h2>
          <p style={{ fontSize: "14px", color: "var(--color-neutral-muted)", marginBottom: "16px" }}>{message}</p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
            <form onSubmit={logout} className={styles.adminTokenForm}>
              <button className={styles.secondary} type="submit">Keluar Admin</button>
            </form>
            <button className={styles.secondary} type="button" onClick={exportJson}>Export JSON</button>
            <button className={styles.secondary} type="button" onClick={exportCsv}>Export CSV</button>
          </div>
        </div>

        <form className={styles.adminFilters} onSubmit={createManualLead}>
          <label>Status Filter
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">Semua Status</option>
              {leadStatuses.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
            </select>
          </label>
          
          <label>Sumber Filter
            <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
              <option value="all">Semua Sumber</option>
              {leadSources.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>

          <label>Nama Customer
            <input value={manualLead.name} onChange={(event) => setManualLead((current) => ({ ...current, name: event.target.value }))} placeholder="Nama customer" />
          </label>
          
          <label>No. WhatsApp
            <input value={manualLead.phone} onChange={(event) => setManualLead((current) => ({ ...current, phone: event.target.value }))} placeholder="08xx" />
          </label>

          <label>Lokasi Proyek
            <input value={manualLead.location} onChange={(event) => setManualLead((current) => ({ ...current, location: event.target.value }))} placeholder="Sidareja" />
          </label>

          <label>Kebutuhan
            <input value={manualLead.need} onChange={(event) => setManualLead((current) => ({ ...current, need: event.target.value }))} />
          </label>

          <label>Bagian Ruang
            <input value={manualLead.area} onChange={(event) => setManualLead((current) => ({ ...current, area: event.target.value }))} />
          </label>

          <label>Status Awal
            <select value={manualLead.status} onChange={(event) => setManualLead((current) => ({ ...current, status: event.target.value as LeadStatus }))}>
              {leadStatuses.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
            </select>
          </label>

          <label className={styles.fullField}>Catatan / Keterangan Proyek
            <input value={manualLead.notes} onChange={(event) => setManualLead((current) => ({ ...current, notes: event.target.value }))} placeholder="Masukkan catatan follow-up customer..." />
          </label>

          <button className={styles.primary} type="submit" style={{ gridColumn: "1 / span 2", marginTop: "12px" }}>Tambah Lead Manual</button>
        </form>

        <div className={styles.leadTable}>
          {filteredLeads.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px", color: "var(--color-neutral-muted)", fontSize: "14px" }}>
              Belum ada data lead yang cocok dengan filter yang dipilih.
            </p>
          ) : (
            filteredLeads.map((lead) => {
              const createdAt = lead.created_at ?? lead.createdAt ?? new Date().toISOString();
              const selectedTemplate = replyTemplates[0];

              return (
                <article key={lead.id ?? `${createdAt}-${lead.phone}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                    <strong>{lead.name} ({lead.phone})</strong>
                    <small>{new Date(createdAt).toLocaleString("id-ID")} / {lead.source}</small>
                  </div>
                  <span>Kebutuhan: <strong>{lead.need}</strong> - Area: <strong>{lead.area}</strong> - Alamat: <strong>{lead.location}</strong></span>
                  <p>{lead.notes || "Belum ada catatan detail follow-up."}</p>
                  
                  <div className={styles.leadActions}>
                    <a 
                      href={whatsappUrl(`Halo ${lead.name}, ${selectedTemplate.text}`, lead.phone.replace(/^0/, "62").replace(/[^0-9]/g, ""))} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      WA Balasan Awal
                    </a>
                    
                    <button type="button" onClick={() => sendCloudReply(lead.phone, `Halo ${lead.name}, ${selectedTemplate.text}`)}>
                      Cloud API
                    </button>
                    
                    {replyTemplates.slice(1).map((template) => (
                      <a 
                        href={whatsappUrl(template.text, lead.phone.replace(/^0/, "62").replace(/[^0-9]/g, ""))} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={template.label}
                      >
                        {template.label}
                      </a>
                    ))}
                  </div>

                  <label className={styles.statusControl}>
                    Ubah Status Prospek:
                    <select 
                      value={lead.status ?? "new"} 
                      onChange={(event) => updateLead(lead.id, { status: event.target.value as LeadStatus })} 
                      disabled={source !== "supabase" || !lead.id}
                    >
                      {leadStatuses.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
                    </select>
                  </label>

                  <div className={styles.adminFilters} style={{ border: "none", padding: 0, margin: "16px 0 0 0" }}>
                    <label>Jadwal Follow-up
                      <input type="datetime-local" value={lead.follow_up_at?.slice(0, 16) ?? ""} onChange={(event) => updateLead(lead.id, { follow_up_at: event.target.value })} disabled={source !== "supabase" || !lead.id} />
                    </label>
                    
                    <label>Tanggal Survei
                      <input type="datetime-local" value={lead.survey_date?.slice(0, 16) ?? ""} onChange={(event) => updateLead(lead.id, { survey_date: event.target.value })} disabled={source !== "supabase" || !lead.id} />
                    </label>
                    
                    <label>Petugas Survei / CS
                      <input value={lead.assigned_to ?? ""} onChange={(event) => updateLead(lead.id, { assigned_to: event.target.value })} disabled={source !== "supabase" || !lead.id} />
                    </label>
                    
                    <label>Nilai Penawaran (Rp)
                      <input type="number" min="0" value={lead.offer_value ?? ""} onChange={(event) => updateLead(lead.id, { offer_value: Number(event.target.value) })} disabled={source !== "supabase" || !lead.id} />
                    </label>
                    
                    <label className={styles.fullField}>Catatan & Perkembangan Follow-up
                      <input value={lead.notes ?? ""} onChange={(event) => updateLead(lead.id, { notes: event.target.value })} disabled={source !== "supabase" || !lead.id} />
                    </label>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import styles from "./styles/forms.module.css";
import { FormEvent, useState } from "react";

export function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    need: "Kitchen Set Custom",
    area: "Kitchen / Dapur",
    size: "",
    budget: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "fallback" | "invalid">("idle");

  const isSubmitting = status === "submitting";

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    // Reset validation error state as soon as user types
    if (status === "invalid" && field === "phone") {
      setStatus("idle");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPhone = form.phone.replace(/[^0-9]/g, "");

    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      setStatus("invalid");
      trackEvent("lead_validation_failed", { reason: "phone_length", input: form.phone });
      return;
    }

    setStatus("submitting");
    const lead = { ...form, createdAt: new Date().toISOString(), source: "contact-form" };
    let existing: typeof lead[] = [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem("caturaya-leads") ?? "[]") as unknown;
      existing = Array.isArray(parsed) ? parsed as typeof lead[] : [];
    } catch {
      existing = [];
    }
    window.localStorage.setItem("caturaya-leads", JSON.stringify([lead, ...existing].slice(0, 100)));
    trackEvent("lead_submit", { source: "contact-form", need: form.need, area: form.area });
    
    let isStored = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, phone: normalizedPhone }),
      });
      const result = (await response.json()) as { stored?: boolean };
      isStored = !!result.stored;
      setStatus(isStored ? "success" : "fallback");
    } catch {
      setStatus("fallback");
    }

    const message = `Halo Caturaya Living, saya ingin konsultasi.

Nama: ${form.name}
Nomor WhatsApp: ${form.phone}
Lokasi: ${form.location}
Kebutuhan: ${form.need}
Area rumah: ${form.area}
Ukuran perkiraan: ${form.size}
Budget perkiraan: ${form.budget}
Catatan: ${form.notes}`;

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");

    // Clear form after successful submit
    setForm({
      name: "",
      phone: "",
      location: "",
      need: "Kitchen Set Custom",
      area: "Kitchen / Dapur",
      size: "",
      budget: "",
      notes: "",
    });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label>
        Nama Lengkap
        <input 
          required 
          value={form.name} 
          onChange={(event) => update("name", event.target.value)} 
          placeholder="Nama Anda" 
          aria-required="true"
        />
      </label>
      
      <label 
        data-error={status === "invalid"} 
        data-error-msg="Format WhatsApp salah. Gunakan 10-15 digit angka (misal: 085119467138)."
      >
        Nomor WhatsApp (Aktif)
        <input 
          required 
          type="tel"
          value={form.phone} 
          onChange={(event) => update("phone", event.target.value)} 
          placeholder="Contoh: 085119467138" 
          aria-required="true"
          aria-invalid={status === "invalid"}
        />
      </label>

      <label>
        Lokasi Proyek / Alamat
        <input 
          required 
          value={form.location} 
          onChange={(event) => update("location", event.target.value)} 
          placeholder="Sidareja / Cilacap / Cipari" 
          aria-required="true"
        />
      </label>

      <label>
        Jenis Kebutuhan Pekerjaan
        <select value={form.need} onChange={(event) => update("need", event.target.value)}>
          <option>Kitchen Set Custom</option>
          <option>Kusen Aluminium</option>
          <option>Pintu & Jendela Aluminium</option>
          <option>Plafon Gypsum/PVC</option>
          <option>Kanopi Minimalis</option>
          <option>Pagar & Gerbang</option>
          <option>Partisi Ruangan</option>
          <option>Interior Custom</option>
          <option>Home Finishing</option>
        </select>
      </label>

      <label>
        Bagian Area Rumah
        <select value={form.area} onChange={(event) => update("area", event.target.value)}>
          <option>Kitchen / Dapur</option>
          <option>Living Room</option>
          <option>Teras Depan</option>
          <option>Carport & Kanopi</option>
          <option>Master Room</option>
          <option>Gerbang & Pagar</option>
          <option>Ruko / Tempat Usaha</option>
        </select>
      </label>

      <label>
        Ukuran Perkiraan (m / cm)
        <input 
          value={form.size} 
          onChange={(event) => update("size", event.target.value)} 
          placeholder="Contoh: 3 meter / 2 x 3 meter" 
        />
      </label>

      <label className={styles.fullField}>
        Estimasi Budget Proyek (Rp)
        <input 
          value={form.budget} 
          onChange={(event) => update("budget", event.target.value)} 
          placeholder="Contoh: 5 - 10 juta / Sesuai rekomendasi bahan" 
        />
      </label>

      <label className={styles.fullField}>
        Catatan Khusus / Permintaan Khusus
        <textarea 
          value={form.notes} 
          onChange={(event) => update("notes", event.target.value)} 
          placeholder="Ceritakan kebutuhan ruang Anda, referensi desain, warna favorit, atau kondisi lokasi..." 
        />
      </label>

      {/* Accessible Status Notices */}
      {status === "invalid" && (
        <p className={styles.formNotice} role="alert" aria-live="polite">
          Nomor WhatsApp tidak valid. Pastikan Anda memasukkan 10-15 digit angka yang benar.
        </p>
      )}
      {status === "success" && (
        <p className={styles.formNotice} data-type="success" role="alert" aria-live="polite">
          Data konsultasi Anda berhasil disimpan! Halaman WhatsApp Anda akan segera terbuka untuk follow-up cepat.
        </p>
      )}
      {status === "fallback" && (
        <p className={styles.formNotice} data-type="fallback" role="alert" aria-live="polite">
          Terima kasih! Data disimpan secara lokal di browser Anda. WhatsApp akan dibuka secara otomatis untuk mengirim pesan.
        </p>
      )}

      <button 
        className={styles.primary} 
        type="submit" 
        disabled={isSubmitting}
        aria-label="Kirim form konsultasi dan hubungi via WhatsApp"
      >
        {isSubmitting ? "Mengirim Data Proyek..." : "Kirim Konsultasi ke WhatsApp"}
      </button>
    </form>
  );
}

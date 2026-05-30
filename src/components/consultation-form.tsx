"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { FormEvent, useState } from "react";
import { Phone, CheckCircle2, AlertTriangle, Send } from "lucide-react";

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
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full text-left" onSubmit={submit}>
      
      {/* 1. Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Nama Lengkap</label>
        <input 
          required 
          value={form.name} 
          onChange={(event) => update("name", event.target.value)} 
          placeholder="Nama Anda" 
          aria-required="true"
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm text-primary focus:border-accent transition-colors"
        />
      </div>
      
      {/* 2. WhatsApp Number */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Nomor WhatsApp (Aktif)</label>
        <input 
          required 
          type="tel"
          value={form.phone} 
          onChange={(event) => update("phone", event.target.value)} 
          placeholder="Contoh: 085119467138" 
          aria-required="true"
          aria-invalid={status === "invalid"}
          className={`w-full bg-accent-light/35 border px-4 py-3 rounded-xl text-sm text-primary focus:border-accent transition-colors ${
            status === "invalid" ? "border-red-400 focus:border-red-500" : "border-border-premium/65"
          }`}
        />
      </div>

      {/* 3. Project Location */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Lokasi Proyek / Alamat</label>
        <input 
          required 
          value={form.location} 
          onChange={(event) => update("location", event.target.value)} 
          placeholder="Sidareja / Cilacap / Cipari" 
          aria-required="true"
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm text-primary focus:border-accent transition-colors"
        />
      </div>

      {/* 4. Type of Need */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Jenis Pekerjaan</label>
        <select 
          value={form.need} 
          onChange={(event) => update("need", event.target.value)}
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm font-semibold text-primary focus:border-accent transition-colors"
        >
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
      </div>

      {/* 5. House Area */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Bagian Ruang Rumah</label>
        <select 
          value={form.area} 
          onChange={(event) => update("area", event.target.value)}
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm font-semibold text-primary focus:border-accent transition-colors"
        >
          <option>Kitchen / Dapur</option>
          <option>Living Room</option>
          <option>Teras Depan</option>
          <option>Carport & Kanopi</option>
          <option>Master Room</option>
          <option>Gerbang & Pagar</option>
          <option>Ruko / Tempat Usaha</option>
        </select>
      </div>

      {/* 6. Estimated Size */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Ukuran Perkiraan (m / cm)</label>
        <input 
          value={form.size} 
          onChange={(event) => update("size", event.target.value)} 
          placeholder="Contoh: 3 meter / 2 x 3 meter" 
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm text-primary focus:border-accent transition-colors"
        />
      </div>

      {/* 7. Estimated Budget (Span 2) */}
      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Estimasi Anggaran Proyek (Rp)</label>
        <input 
          value={form.budget} 
          onChange={(event) => update("budget", event.target.value)} 
          placeholder="Contoh: 5 - 10 juta / Sesuai rekomendasi bahan" 
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm text-primary focus:border-accent transition-colors"
        />
      </div>

      {/* 8. Special Notes (Span 2) */}
      <div className="sm:col-span-2 flex flex-col gap-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-primary">Catatan Khusus / Permintaan Kustom</label>
        <textarea 
          value={form.notes} 
          onChange={(event) => update("notes", event.target.value)} 
          placeholder="Ceritakan kebutuhan ruang Anda, pilihan warna favorit, atau kondisi khusus di lokasi..." 
          className="w-full bg-accent-light/35 border border-border-premium/65 px-4 py-3 rounded-xl text-sm text-primary min-h-[100px] focus:border-accent transition-colors"
        />
      </div>

      {/* Form Status Warnings (Span 2) */}
      <div className="sm:col-span-2 flex flex-col gap-3">
        {status === "invalid" && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-xl flex items-center gap-2" role="alert" aria-live="polite">
            <AlertTriangle size={15} className="flex-shrink-0" />
            <span>Format WhatsApp salah. Gunakan 10-15 digit angka yang valid (misal: 085119467138).</span>
          </div>
        )}
        {status === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-xl flex items-center gap-2" role="alert" aria-live="polite">
            <CheckCircle2 size={15} className="flex-shrink-0" />
            <span>Data pengerjaan proyek berhasil tersimpan! Draf konsultasi WhatsApp akan terbuka secara otomatis.</span>
          </div>
        )}
        {status === "fallback" && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs p-4 rounded-xl flex items-center gap-2" role="alert" aria-live="polite">
            <CheckCircle2 size={15} className="flex-shrink-0" />
            <span>Terima kasih! Draf tersimpan secara lokal. Aplikasi WhatsApp akan segera terbuka untuk follow-up cepat.</span>
          </div>
        )}
      </div>

      {/* Submit Action Button (Span 2) */}
      <div className="sm:col-span-2 pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-label="Kirim form konsultasi dan hubungi via WhatsApp"
          className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Mengirim Data Proyek...</span>
          ) : (
            <>
              <Phone size={14} />
              <span>Kirim Konsultasi ke WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "./ui/modal";
import { ArrowRight, ArrowLeft, Send, CheckCircle2, Sofa, Hammer, Sparkles } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, label: "Layanan" },
  { id: 2, label: "Spesifikasi" },
  { id: 3, label: "Kontak" }
];

const needs = [
  "Kitchen Set Custom",
  "Kusen Kayu Solid",
  "Kusen Aluminium",
  "Plafon PVC/Gypsum",
  "Kanopi Carport",
  "Pagar & Gerbang",
  "Partisi Kaca",
  "Lemari & Wardrobe",
  "Perabotan Custom",
  "Jasa Bangunan / Renovasi",
  "HPL/PVC Finishing"
];

const areas = [
  "Dapur / Kitchen",
  "Ruang Tamu / Keluarga",
  "Kamar Tidur Utama",
  "Teras / Depan Rumah",
  "Taman / Carport",
  "Halaman Belakang",
  "Kamar Mandi",
  "Ruko / Tempat Usaha"
];

const materials = [
  { name: "Plywood Multiplek (Tukang Kayu)", desc: "Material kayu tebal 18mm kokoh untuk interior kabinet" },
  { name: "Aluminium Premium (Tukang Aluminium)", desc: "Tahan karat, kuat, tahan kelembaban cuaca pesisir" },
  { name: "Finishing HPL/PVC (Tukang HPL)", desc: "Pilihan warna kayu natural, serat matte, gloss modern" },
  { name: "Bata & Beton Sipil (Tukang Bangunan)", desc: "Renovasi terstruktur, keramik, pondasi, sipil" }
];

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    need: needs[0],
    area: areas[0],
    material: materials[0].name,
    size: "",
    budget: "",
    notes: ""
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectNeed = (need: string) => {
    setForm(f => ({ ...f, need }));
    handleNext();
  };

  const handleSelectArea = (area: string) => {
    setForm(f => ({ ...f, area }));
  };

  const handleSelectMaterial = (material: string) => {
    setForm(f => ({ ...f, material }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // Save to local storage leads fallback
    const lead = {
      ...form,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      source: "consultation-modal",
      status: "new"
    };

    let existing: typeof lead[] = [];
    try {
      const parsed = JSON.parse(window.localStorage.getItem("eko-workshop-leads") ?? "[]") as unknown;
      existing = Array.isArray(parsed) ? parsed as typeof lead[] : [];
    } catch {
      existing = [];
    }
    window.localStorage.setItem("eko-workshop-leads", JSON.stringify([lead, ...existing].slice(0, 100)));

    trackEvent("lead_submit", { source: "consultation-modal", need: form.need, area: form.area });

    // Call local API endpoint
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...lead, source: "consultation-modal" })
      });
    } catch (err) {
      console.error("Failed to post lead", err);
    }

    // Direct WhatsApp link opening
    const msg = `Halo Eko Suyanto Workshop, saya ingin mengajukan konsultasi proyek lewat website.
 
Nama: ${form.name}
WhatsApp: ${form.phone}
Lokasi Proyek: ${form.location || "-"}
Jenis Pekerjaan: ${form.need}
Area Ruang: ${form.area}
Material Utama: ${form.material}
Ukuran Perkiraan: ${form.size || "-"} m
Budget Kasar: Rp ${form.budget || "-"}
Catatan Penting: ${form.notes || "-"}`;

    setStatus("success");
    setTimeout(() => {
      window.open(whatsappUrl(msg), "_blank");
      // Reset & close
      setCurrentStep(1);
      setForm({
        name: "",
        phone: "",
        location: "",
        need: needs[0],
        area: areas[0],
        material: materials[0].name,
        size: "",
        budget: "",
        notes: ""
      });
      setStatus("idle");
      onClose();
    }, 1200);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konsultasi Proyek Eksklusif" size="lg">
      <div className="flex flex-col gap-6 w-full text-left">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-premium/30">
          <div className="flex gap-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors duration-300 ${
                  currentStep === s.id
                    ? "bg-accent border-accent text-primary"
                    : currentStep > s.id
                    ? "bg-primary border-primary text-white"
                    : "bg-transparent border-neutral-300 text-neutral-400"
                }`}>
                  {s.id}
                </span>
                <span className={`text-[10px] uppercase tracking-luxury-sm font-semibold transition-colors duration-300 ${
                  currentStep === s.id ? "text-accent" : "text-neutral-muted"
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
            Langkah {currentStep} dari 3
          </div>
        </div>

        {/* Form Steps Animation container */}
        <div className="min-h-[380px] flex flex-col justify-between">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8"
            >
              <CheckCircle2 size={48} className="text-accent animate-bounce" />
              <h4 className="text-lg font-semibold text-primary uppercase tracking-luxury">Rancangan Terkirim!</h4>
              <p className="text-sm text-neutral-muted max-w-sm">
                Rancangan konsultasi Anda telah disimpan. Sekarang mengalihkan ke WhatsApp untuk memulai percakapan langsung dengan Pak Eko.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-6">
              
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h4 className="text-base font-semibold text-primary mb-1">Pilih Kebutuhan Utama Proyek</h4>
                      <p className="text-xs text-neutral-muted">Silakan klik salah satu spesifikasi produk utama yang ingin direalisasikan.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {needs.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleSelectNeed(item)}
                          className={`px-3 py-2.5 rounded-[2px] border text-xs font-semibold text-left transition-all duration-300 ${
                            form.need === item
                              ? "bg-accent border-accent text-primary"
                              : "bg-white border-border-premium text-neutral-muted hover:border-accent hover:text-accent cursor-pointer"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h4 className="text-base font-semibold text-primary mb-1">Spesifikasi Detail Ruang & Material</h4>
                      <p className="text-xs text-neutral-muted">Sesuaikan jenis area ruangan dan bahan material utama yang diinginkan.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                      {/* Area Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Area Rumah / Proyek</label>
                        <select 
                          value={form.area} 
                          onChange={(e) => handleSelectArea(e.target.value)}
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          {areas.map(a => <option key={a}>{a}</option>)}
                        </select>
                      </div>

                      {/* Material Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Rekomendasi Tim Spesialis</label>
                        <select 
                          value={form.material} 
                          onChange={(e) => handleSelectMaterial(e.target.value)}
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          {materials.map(m => <option key={m.name}>{m.name}</option>)}
                        </select>
                      </div>

                      {/* Sizing Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Estimasi Ukuran Kasar (M² / Lari)</label>
                        <input 
                          type="text"
                          value={form.size} 
                          onChange={(e) => setForm(f => ({ ...f, size: e.target.value }))}
                          placeholder="Contoh: 3x4 meter atau 5 meter lari"
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none"
                        />
                      </div>

                      {/* Budget Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Target Alokasi Anggaran (Opsional)</label>
                        <input 
                          type="text"
                          value={form.budget} 
                          onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))}
                          placeholder="Contoh: 15.000.000"
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h4 className="text-base font-semibold text-primary mb-1">Informasi Kontak & Pengiriman</h4>
                      <p className="text-xs text-neutral-muted">Masukkan kontak Anda untuk validasi data pemesanan di dashboard admin.</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Nama Lengkap</label>
                          <input 
                            required
                            type="text"
                            value={form.name} 
                            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Nama Anda"
                            className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary transition-all duration-300 outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Nomor WhatsApp Aktif</label>
                          <input 
                            required
                            type="tel"
                            value={form.phone} 
                            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                            placeholder="Contoh: 085119467138"
                            className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary transition-all duration-300 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Alamat / Lokasi Proyek</label>
                        <input 
                          type="text"
                          value={form.location} 
                          onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
                          placeholder="Contoh: Desa Tegalsari RT 09, Sidareja"
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary transition-all duration-300 outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-luxury text-neutral-muted">Catatan Khusus Desain</label>
                        <textarea 
                          value={form.notes} 
                          onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                          placeholder="Masukkan rincian khusus jika ada (warna cat, tata letak, tanggal rencana survey lapangan)."
                          className="w-full bg-white border border-border-premium hover:border-accent/60 px-3 py-2.5 rounded-[2px] text-xs focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none min-h-[60px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border-premium/20 mt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-4 py-2 border rounded-[2px] transition-all cursor-pointer ${
                    currentStep === 1
                      ? "border-transparent text-neutral-300 cursor-not-allowed"
                      : "border-border-premium text-neutral-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  <ArrowLeft size={11} />
                  <span>Kembali</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1 bg-primary hover:bg-accent text-white hover:text-primary-dark text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-[2px] transition-all cursor-pointer shadow-sm"
                  >
                    <span>Lanjut</span>
                    <ArrowRight size={11} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!form.name || !form.phone}
                    className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-[2px] transition-all shadow-md ${
                      !form.name || !form.phone
                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed border-transparent"
                        : "bg-accent hover:bg-accent-hover text-primary cursor-pointer"
                    }`}
                  >
                    <Send size={11} />
                    <span>Kirim ke WhatsApp</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}

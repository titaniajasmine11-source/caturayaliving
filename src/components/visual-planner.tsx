"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./styles/planner.module.css";

const roomTemplates = ["Kitchen", "Living Room", "Master Room", "Teras/Carport", "Ruko/Tempat Usaha"];
const models = ["Linear", "L Shape", "U Shape", "Open Space", "Compact"];
const materials = ["Warm Wood", "Graphite", "Bronze", "White Clean", "Misty Gray"];
const catalog = ["Kabinet bawah", "Kabinet atas", "Kompor", "Sink", "Rak", "Jendela", "Pintu", "Backdrop TV", "Partisi", "Sofa", "Kanopi", "Pagar", "Plafon"];
type SavedDesign = { id: string; room: string; model: string; material: string; width: number; length: number; items: string[]; notes: string };

function loadSavedDesigns(): SavedDesign[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem("caturaya-designs") ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed as SavedDesign[] : [];
  } catch {
    return [];
  }
}

function positiveNumber(value: string, fallback = 1) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) && nextValue > 0 ? nextValue : fallback;
}

export function VisualPlanner() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState(roomTemplates[0]);
  const [model, setModel] = useState(models[1]);
  const [material, setMaterial] = useState(materials[0]);
  const [width, setWidth] = useState(3);
  const [length, setLength] = useState(4);
  const [items, setItems] = useState<string[]>(["Kabinet bawah", "Kabinet atas", "Jendela"]);
  const [notes, setNotes] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>(loadSavedDesigns);

  function toggleItem(item: string) {
    setItems((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  async function saveDesign() {
    const design = { id: new Date().toISOString(), room, model, material, width, length, items, notes };
    const nextDesigns = [design, ...savedDesigns].slice(0, 12);
    setSavedDesigns(nextDesigns);
    window.localStorage.setItem("caturaya-designs", JSON.stringify(nextDesigns));
    trackEvent("planner_save_design", { room, model, material, items: items.length });

    try {
      const response = await fetch("/api/designs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, phone, room, model, material, width, length, items, notes, source: "planner" }),
      });
      const result = (await response.json()) as { stored?: boolean };
      setSaveStatus(result.stored ? "Desain tersimpan ke server dan browser." : "Desain tersimpan di browser-local sebagai fallback.");
    } catch {
      setSaveStatus("Desain tersimpan di browser-local sebagai fallback.");
    }
  }

  function loadDesign(design: (typeof savedDesigns)[number]) {
    setRoom(design.room);
    setModel(design.model);
    setMaterial(design.material);
    setWidth(design.width);
    setLength(design.length);
    setItems(design.items);
    setNotes(design.notes);
  }

  const message = `Halo Caturaya Living, saya ingin konsultasi hasil planner.
 
Nama: ${name || "-"}
Nomor WhatsApp: ${phone || "-"}
Area: ${room}
Model: ${model}
Material/warna: ${material}
Ukuran kasar: ${width} x ${length} m
Elemen dipilih: ${items.join(", ")}
Catatan: ${notes || "-"}
 
Mohon dibantu arahan desain dan estimasi awal.`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">
      {/* Control Panel Column */}
      <div className="lg:col-span-7 bg-white border border-border-premium/50 rounded-[2px] p-6 sm:p-8 flex flex-col gap-5 shadow-premium">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Nama Lengkap</label>
            <input 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
              placeholder="Nama Anda" 
              className="w-full bg-accent-light/30 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 shadow-sm"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Nomor WhatsApp</label>
            <input 
              value={phone} 
              onChange={(event) => setPhone(event.target.value)} 
              placeholder="Contoh: 085119467138" 
              className="w-full bg-accent-light/30 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Bagian Ruang Proyek</label>
            <select 
              value={room} 
              onChange={(event) => setRoom(event.target.value)}
              className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-3 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              {roomTemplates.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Layout / Konsep</label>
            <select 
              value={model} 
              onChange={(event) => setModel(event.target.value)}
              className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-3 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              {models.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Warna / Material Utama</label>
            <select 
              value={material} 
              onChange={(event) => setMaterial(event.target.value)}
              className="w-full bg-accent-light/35 border border-border-premium hover:border-accent/60 px-3 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              {materials.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Lebar Area (meter)</label>
            <input 
              type="number" 
              min="1" 
              step="0.5" 
              value={width} 
              onChange={(event) => setWidth(positiveNumber(event.target.value))} 
              className="w-full bg-accent-light/30 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Panjang Area (meter)</label>
            <input 
              type="number" 
              min="1" 
              step="0.5" 
              value={length} 
              onChange={(event) => setLength(positiveNumber(event.target.value))} 
              className="w-full bg-accent-light/30 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted mb-1">Catatan Tambahan</label>
          <textarea 
            value={notes} 
            onChange={(event) => setNotes(event.target.value)} 
            placeholder="Contoh: ingin kitchen set kombinasi graphite, ada jendela di sisi atas." 
            className="w-full bg-accent-light/30 border border-border-premium hover:border-accent/60 px-4 py-3 rounded-[2px] text-sm focus:outline-none focus:border-accent text-primary placeholder-neutral-400 transition-all duration-300 outline-none focus:ring-1 focus:ring-accent/10 shadow-sm min-h-[80px] resize-y"
          />
        </div>

        <div className="text-left mt-2">
          <span className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted block mb-3">
            Pilih Elemen Interior / Eksterior (Klik untuk menambah)
          </span>
          <div className="flex flex-wrap gap-2">
            {catalog.map((item) => {
              const active = items.includes(item);
              return (
                <button 
                  className={`py-2 px-3.5 text-xs font-semibold rounded-[2px] border transition-all ${
                    active 
                      ? "bg-accent border-accent text-primary hover:text-primary-dark" 
                      : "bg-white border-border-premium text-neutral-muted hover:border-accent hover:text-accent cursor-pointer"
                  }`}
                  type="button" 
                  onClick={() => toggleItem(item)} 
                  key={item}
                  aria-pressed={active}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <button 
            className="w-full text-center py-3 border border-border-premium hover:border-primary text-xs font-semibold uppercase tracking-wide rounded-[2px] transition-all bg-white cursor-pointer" 
            type="button" 
            onClick={saveDesign}
          >
            Simpan Desain Lokal
          </button>
        </div>

        {saveStatus && (
          <p className="p-3 bg-accent/5 border border-accent/20 text-accent text-sm rounded-[2px] text-center font-medium" role="alert" aria-live="polite">
            {saveStatus}
          </p>
        )}

        {savedDesigns.length > 0 && (
          <div className="mt-4 pt-6 border-t border-border-premium/30 text-left">
            <span className="text-xs font-semibold uppercase tracking-luxury-sm text-neutral-muted block mb-3">
              Riwayat Desain Anda (Browser-Local)
            </span>
            <div className="flex flex-wrap gap-2">
              {savedDesigns.map((design) => (
                <button 
                  type="button" 
                  onClick={() => loadDesign(design)} 
                  key={design.id}
                  className="px-3 py-1.5 text-[13px] font-semibold bg-white border border-border-premium hover:border-accent hover:text-accent rounded-[2px] transition-all cursor-pointer"
                >
                  {design.room} ({design.model})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Visualizer Column */}
      <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28 w-full">
        {/* Architectural canvas room blueprint */}
        <div className={styles.roomPreview} data-material={material.toLowerCase().replaceAll(" ", "-")} aria-label="Kanvas denah arsitektural visualizer"> 
          <span className={styles.previewLabel}>{room} Blueprint</span>
          {items.includes("Kabinet bawah") && <i className={styles.previewCabinet} />}
          {items.includes("Kabinet atas") && <i className={styles.previewUpper} />}
          {items.includes("Jendela") && <i className={styles.previewWindow} />}
          {items.includes("Pintu") && <i className={styles.previewDoor} />}
          {items.includes("Sofa") && <i className={styles.previewSofa} />}
          {items.includes("Partisi") && <i className={styles.previewPartition} />}
          {items.includes("Backdrop TV") && <i className={styles.previewBackdrop} />}
          {items.includes("Kanopi") && <i className={styles.previewCanopy} />}
        </div>

        {/* Blueprint Estimate outcome card */}
        <div className="bg-white border border-border-premium/50 p-6 sm:p-8 rounded-[2px] shadow-premium text-left">
          <p className="text-xs font-semibold uppercase tracking-luxury-sm text-accent mb-2">
            Ringkasan Konseptual
          </p>
          <h4 className="text-lg font-semibold text-primary mb-2">
            {model} Layout / {material}
          </h4>
          <p className="text-sm text-neutral-muted leading-relaxed mb-6">
            Dimensi: {width} x {length} meter, dengan {items.length} elemen arsitektural terpasang dalam rencana blueprint.
          </p>
          <a 
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-accent hover:text-white text-white hover:text-primary-dark py-3.5 px-6 rounded-[2px] text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer shadow-md group"
            href={whatsappUrl(message)} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackEvent("planner_whatsapp", { room, model, material, items: items.length })}
            aria-label="Kirim rancangan denah ke WhatsApp Caturaya Living"
          >
            <span>Hubungi untuk Realisasi</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { whatsappUrl } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { useState } from "react";
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
      setSaveStatus(result.stored ? "Desain tersimpan ke Supabase dan browser." : "Desain tersimpan di browser-local sebagai fallback.");
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
    <div className={styles.plannerGrid}>
      <div className={styles.plannerControls}>
        <label>
          Nama Lengkap
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama Anda" />
        </label>
        
        <label>
          Nomor WhatsApp
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Contoh: 085119467138" />
        </label>

        <label>
          Bagian Ruang Proyek
          <select value={room} onChange={(event) => setRoom(event.target.value)}>
            {roomTemplates.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Model Tata Letak / Konsep
          <select value={model} onChange={(event) => setModel(event.target.value)}>
            {models.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Warna / Tekstur Material Utama
          <select value={material} onChange={(event) => setMaterial(event.target.value)}>
            {materials.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>

        <label>
          Lebar Area (meter)
          <input type="number" min="1" step="0.5" value={width} onChange={(event) => setWidth(positiveNumber(event.target.value))} />
        </label>

        <label>
          Panjang Area (meter)
          <input type="number" min="1" step="0.5" value={length} onChange={(event) => setLength(positiveNumber(event.target.value))} />
        </label>

        <label className={styles.fullField}>
          Catatan Tambahan
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Contoh: ingin kitchen set kombinasi graphite, ada jendela di sisi atas." />
        </label>

        <div style={{ marginTop: "12px", textAlign: "left" }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--color-neutral-dark)", display: "block", marginBottom: "8px" }}>
            Pilih Elemen Interior/Eksterior (Klik untuk menambah)
          </span>
          <div className={styles.itemCatalog}>
            {catalog.map((item) => {
              const active = items.includes(item);
              return (
                <button 
                  className={active ? styles.activeItem : ""} 
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

        <button className="secondary" style={{ marginTop: "12px", width: "100%" }} type="button" onClick={saveDesign}>
          Simpan Desain Lokal
        </button>

        {saveStatus && (
          <p className={styles.formNotice} role="alert" aria-live="polite" style={{ marginTop: "12px", padding: "12px", background: "var(--color-accent-light)", color: "var(--color-accent)", fontSize: "12px", borderRadius: "var(--radius-md)" }}>
            {saveStatus}
          </p>
        )}

        {savedDesigns.length > 0 && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-neutral-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
              Riwayat Desain Anda
            </span>
            <div className={styles.savedDesigns}>
              {savedDesigns.map((design) => (
                <button type="button" onClick={() => loadDesign(design)} key={design.id}>
                  {design.room} ({design.model})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className={styles.plannerPreview}>
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

        <div className={styles.estimateBox} style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)", padding: "28px", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
          <p className={styles.eyebrow} style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
            Ringkasan Konseptual
          </p>
          <strong style={{ display: "block", fontSize: "20px", color: "var(--color-neutral-dark)", marginBottom: "8px" }}>
            {model} Layout / {material}
          </strong>
          <span style={{ display: "block", fontSize: "13px", color: "var(--color-neutral-muted)", marginBottom: "16px" }}>
            Dimensi: {width} x {length} meter, dengan {items.length} elemen arsitektural terpasang.
          </span>
          <a 
            className="primary" 
            href={whatsappUrl(message)} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackEvent("planner_whatsapp", { room, model, material, items: items.length })}
            aria-label="Kirim rancangan denah ke WhatsApp Caturaya Living"
            style={{ width: "100%", display: "inline-flex" }}
          >
            Hubungi untuk Realisasi
          </a>
        </div>
      </aside>
    </div>
  );
}

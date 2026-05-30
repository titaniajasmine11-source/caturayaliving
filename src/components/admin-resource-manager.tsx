"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import styles from "./styles/admin.module.css";

type Resource = "price_rules" | "content_calendar" | "cms_items" | "project_media" | "team_members" | "vendors" | "invoices" | "payments";

const resources: Array<{ value: Resource; label: string }> = [
  { value: "price_rules", label: "Price Rules" },
  { value: "content_calendar", label: "Content Calendar" },
  { value: "cms_items", label: "CMS Items" },
  { value: "project_media", label: "Project Media" },
  { value: "team_members", label: "Team Members" },
  { value: "vendors", label: "Vendors" },
  { value: "invoices", label: "Invoices" },
  { value: "payments", label: "Payments" },
];

type ResourceItem = Record<string, unknown> & { id?: string };
type ResourceForm = Record<string, string | boolean>;

function getDefaultForm(resource: Resource): ResourceForm {
  if (resource === "price_rules") return { service: "Kitchen Set", package: "standard", unit: "meter", base_price: "2600000", minimum_order: "1", margin_percent: "0", notes: "", is_active: true };
  if (resource === "content_calendar") return { publish_date: new Date().toISOString().slice(0, 10), channel: "Artikel", topic: "", format: "Artikel SEO", status: "idea", owner: "Marketing", notes: "" };
  if (resource === "project_media") return { portfolio_slug: "", media_url: "", media_type: "image", caption: "", sort_order: "0", is_before: false, is_after: false, status: "draft" };
  if (resource === "team_members") return { name: "", role: "CS", phone: "", status: "active", notes: "" };
  if (resource === "vendors") return { name: "", category: "material", contact: "", status: "active", notes: "" };
  if (resource === "invoices") return { lead_id: "", customer_name: "", invoice_number: `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-001`, amount: "0", status: "draft", due_date: "", notes: "" };
  if (resource === "payments") return { invoice_id: "", amount: "0", method: "transfer", paid_at: "", status: "recorded", notes: "" };
  return { type: "article", title: "", slug: "", status: "draft", summary: "", body: "{}", seo_title: "", seo_description: "" };
}

export function AdminResourceManager() {
  const [resource, setResource] = useState<Resource>("price_rules");
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [form, setForm] = useState<ResourceForm>(getDefaultForm("price_rules"));
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("Memuat resource admin...");
  const [, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/admin/resources?resource=${resource}`, { cache: "no-store" });
        const result = (await response.json()) as { ok?: boolean; items?: ResourceItem[]; error?: string };

        if (!active) return;

        if (result.ok && result.items) {
          setItems(result.items);
          setMessage(`${result.items.length} item dimuat dari Supabase.`);
          return;
        }

        setItems([]);
        setMessage(result.error ?? "Resource belum tersedia atau Supabase belum dikonfigurasi.");
      } catch {
        if (active) {
          setItems([]);
          setMessage("Gagal menghubungi API resource admin.");
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [resource]);

  function changeResource(nextResource: Resource) {
    startTransition(() => {
      setResource(nextResource);
      setForm(getDefaultForm(nextResource));
      setEditingId("");
    });
  }

  async function loadItems(nextResource = resource) {
    try {
      const response = await fetch(`/api/admin/resources?resource=${nextResource}`, { cache: "no-store" });
      const result = (await response.json()) as { ok?: boolean; items?: ResourceItem[]; error?: string };

      if (result.ok && result.items) {
        setItems(result.items);
        setMessage(`${result.items.length} item dimuat dari Supabase.`);
        return;
      }

      setItems([]);
      setMessage(result.error ?? "Resource belum tersedia atau Supabase belum dikonfigurasi.");
    } catch {
      setItems([]);
      setMessage("Gagal menghubungi API resource admin.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => {
      if (["base_price", "minimum_order", "margin_percent", "sort_order", "amount"].includes(key)) return [key, Number(value)];
      if (key === "body" && typeof value === "string") {
        try {
          return [key, JSON.parse(value) as unknown];
        } catch {
          return [key, value];
        }
      }
      return [key, value];
    }));

    try {
      const response = await fetch(`/api/admin/resources?resource=${resource}${editingId ? `&id=${editingId}` : ""}`, {
        method: editingId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; item?: ResourceItem; error?: string };

      if (!result.ok || !result.item) {
        setMessage(result.error ?? "Gagal menyimpan item resource.");
        return;
      }

      setItems((current) => editingId ? current.map((item) => item.id === editingId ? result.item as ResourceItem : item) : [result.item as ResourceItem, ...current]);
      setEditingId("");
      setForm(getDefaultForm(resource));
      setMessage(editingId ? "Item resource diperbarui." : "Item resource tersimpan.");
    } catch {
      setMessage("Gagal menghubungi API saat menyimpan resource.");
    }
  }

  function updateField(key: string, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function editItem(item: ResourceItem) {
    const defaults = getDefaultForm(resource);
    const nextForm = Object.fromEntries(Object.keys(defaults).map((key) => {
      if (key === "body") return [key, JSON.stringify(item[key] ?? {}, null, 2)];
      return [key, typeof defaults[key] === "boolean" ? Boolean(item[key]) : String(item[key] ?? "")];
    })) as ResourceForm;
    setEditingId(item.id ?? "");
    setForm(nextForm);
    setMessage("Mode edit resource aktif.");
  }

  async function archiveItem(item: ResourceItem) {
    if (!item.id) return;

    const payload = resource === "price_rules" ? { is_active: false } : { status: "archived" };

    try {
      const response = await fetch(`/api/admin/resources?resource=${resource}&id=${item.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; item?: ResourceItem; error?: string };

      if (!result.ok || !result.item) {
        setMessage(result.error ?? "Gagal mengarsipkan resource.");
        return;
      }

      setItems((current) => current.map((currentItem) => currentItem.id === item.id ? result.item as ResourceItem : currentItem));
      setMessage(resource === "price_rules" ? "Price rule dinonaktifkan." : "Resource diarsipkan.");
    } catch {
      setMessage("Gagal menghubungi API saat mengarsipkan resource.");
    }
  }

  async function generateDraft() {
    const topic = String(form.topic || form.title || form.slug || "");

    if (!topic) {
      setMessage("Isi topic/title dulu sebelum membuat draft AI.");
      return;
    }

    try {
      const response = await fetch("/api/admin/ai-draft", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic, channel: String(form.channel || "CMS"), type: resource === "content_calendar" ? "caption" : "artikel" }),
      });
      const result = (await response.json()) as { ok?: boolean; draft?: string; error?: string; configured?: boolean };

      if (!result.ok || !result.draft) {
        setMessage(result.error ?? "Gagal membuat draft AI.");
        return;
      }

      setForm((current) => resource === "content_calendar" ? { ...current, notes: result.draft ?? "" } : { ...current, summary: result.draft?.slice(0, 300) ?? current.summary });
      setMessage(result.configured === false ? "Draft fallback dibuat. Provider AI belum dikonfigurasi." : "Draft AI dibuat.");
    } catch {
      setMessage("Gagal menghubungi API draft AI.");
    }
  }

  async function generateImage() {
    const prompt = [
      "Interior/home finishing realistic photo for Caturaya Living Sidareja Cilacap.",
      String(form.title || form.topic || form.service || form.slug || ""),
      String(form.summary || form.notes || ""),
      "modern Indonesian home, clean detail, no text, no watermark",
    ].filter(Boolean).join(" ");

    if (!String(form.title || form.slug || form.service || form.topic || "")) {
      setMessage("Isi title/slug/service/topic dulu sebelum generate image.");
      return;
    }

    try {
      const response = await fetch("/api/admin/image-draft", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const result = (await response.json()) as { ok?: boolean; imageDataUrl?: string; error?: string; configured?: boolean };

      if (!result.ok || !result.imageDataUrl) {
        setMessage(result.configured === false ? "Image API belum dikonfigurasi." : result.error ?? "Gagal generate image.");
        return;
      }

      setForm((current) => {
        const body = typeof current.body === "string" ? current.body : "{}";
        let parsedBody: Record<string, unknown> = {};

        try {
          const parsed = JSON.parse(body) as unknown;
          parsedBody = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
        } catch {
          parsedBody = {};
        }

        return { ...current, body: JSON.stringify({ ...parsedBody, image: result.imageDataUrl }, null, 2) };
      });
      setMessage("Image draft dibuat dan dimasukkan to body.image.");
    } catch {
      setMessage("Gagal menghubungi API image draft.");
    }
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>CRUD Admin</p>
        <h2>Kelola price rules, kalender konten, dan CMS items dari Supabase.</h2>
        <p style={{ fontSize: "14px", color: "var(--color-neutral-muted)" }}>{message}</p>
      </div>
      
      <div className={styles.adminFilters} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
        <label>Pilih Resource Tabel
          <select value={resource} onChange={(event) => changeResource(event.target.value as Resource)}>
            {resources.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
          </select>
        </label>
        <button className={styles.secondary} type="button" onClick={() => loadItems()} style={{ alignSelf: "flex-end", height: "40px" }}>Refresh Data</button>
      </div>

      <form className={styles.adminFilters} onSubmit={submit}>
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className={key === "body" ? styles.fullField : undefined}>
            Nama Kolom: <strong>{key}</strong>
            {key === "body" ? (
              <textarea value={String(value)} onChange={(event) => updateField(key, event.target.value)} style={{ minHeight: "150px", fontFamily: "var(--font-geist-mono), monospace" }} />
            ) : (
              <input value={String(value)} onChange={(event) => updateField(key, typeof value === "boolean" ? event.target.value === "true" : event.target.value)} />
            )}
          </label>
        ))}
        
        <div style={{ gridColumn: "1 / span 2", display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
          <button className={styles.primary} type="submit">
            {editingId ? "Update Item" : "Simpan Item Baru"}
          </button>
          
          {(resource === "content_calendar" || resource === "cms_items") && (
            <button className={styles.secondary} type="button" onClick={generateDraft}>Buat Draft Kalimat (AI)</button>
          )}
          
          {resource === "cms_items" && (
            <button className={styles.secondary} type="button" onClick={generateImage}>Generate Foto (AI)</button>
          )}
          
          {editingId && (
            <button className={styles.secondary} type="button" onClick={() => { setEditingId(""); setForm(getDefaultForm(resource)); }}>Batal Edit</button>
          )}
        </div>
      </form>

      <div className={styles.opsTable} style={{ marginTop: "32px" }}>
        {items.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "var(--color-neutral-muted)" }}>Tidak ada data item dalam tabel ini.</p>
        ) : (
          items.map((item) => (
            <article key={item.id ?? JSON.stringify(item)}>
              <strong>{String(item.title ?? item.topic ?? item.service ?? item.id)}</strong>
              <span>{String(item.status ?? item.package ?? item.channel ?? (item.is_active === false ? "non-aktif" : "aktif"))}</span>
              <p>{String(item.summary ?? item.notes ?? item.seo_description ?? "-")}</p>
              <div style={{ gridColumn: "span 2", display: "flex", gap: "8px", marginTop: "8px" }}>
                <button className={styles.secondary} type="button" onClick={() => editItem(item)} style={{ minHeight: "30px", padding: "4px 12px", fontSize: "11px" }}>Edit</button>
                <button className={styles.secondary} type="button" onClick={() => archiveItem(item)} style={{ minHeight: "30px", padding: "4px 12px", fontSize: "11px", color: "var(--color-error)" }}>
                  {resource === "price_rules" ? "Nonaktifkan" : "Arsipkan"}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

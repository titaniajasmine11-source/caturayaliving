import fs from "node:fs";

function loadEnv() {
  if (!fs.existsSync(".env.local")) return;
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    process.env[match[1]] ??= match[2].replace(/^['"]|['"]$/g, "");
  }
}

loadEnv();

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  authorization: `Bearer ${serviceKey}`,
  "content-type": "application/json",
  prefer: "resolution=merge-duplicates,return=minimal",
};

const seeds = {
  price_rules: [
    { service: "Kitchen Set", package: "basic", unit: "meter", base_price: 1800000, minimum_order: 1, margin_percent: 0, notes: "Kabinet bawah/atas sederhana", is_active: true },
    { service: "Kitchen Set", package: "standard", unit: "meter", base_price: 2600000, minimum_order: 1, margin_percent: 0, notes: "Material dan aksesoris menengah", is_active: true },
    { service: "Kitchen Set", package: "premium", unit: "meter", base_price: 3800000, minimum_order: 1, margin_percent: 0, notes: "Finishing premium", is_active: true },
    { service: "Kusen Aluminium", package: "standard", unit: "m2", base_price: 900000, minimum_order: 1, margin_percent: 0, notes: "Kusen/pintu/jendela sesuai bukaan", is_active: true },
    { service: "Plafon", package: "gypsum", unit: "m2", base_price: 165000, minimum_order: 1, margin_percent: 0, notes: "Model datar indoor", is_active: true },
    { service: "Kanopi", package: "galvanis", unit: "m2", base_price: 650000, minimum_order: 1, margin_percent: 0, notes: "Rangka dan atap standar", is_active: true },
    { service: "Partisi", package: "kaca", unit: "m2", base_price: 950000, minimum_order: 1, margin_percent: 0, notes: "Partisi kaca/aluminium", is_active: true },
  ],
  content_calendar: [
    { publish_date: new Date().toISOString().slice(0, 10), channel: "Artikel", topic: "Cara memilih kusen aluminium", format: "Artikel SEO", status: "idea", owner: "Marketing", notes: "Draft edukasi lokal Sidareja" },
    { publish_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), channel: "Instagram", topic: "Before-after kitchen set", format: "Carousel", status: "idea", owner: "Marketing", notes: "Butuh foto proyek asli" },
  ],
  cms_items: [
    { type: "faq", title: "Apakah bisa survei lokasi dulu?", slug: "faq-survei-lokasi", status: "published", summary: "Bisa. Untuk pekerjaan yang perlu ukuran presisi, survei lokasi membantu estimasi lebih akurat.", body: {}, seo_title: "", seo_description: "" },
    { type: "testimonial", title: "Customer Sidareja", slug: "customer-sidareja", status: "published", summary: "Komunikasi jelas dari awal, pilihan bahan dijelaskan, dan hasilnya rapi.", body: {}, seo_title: "", seo_description: "" },
  ],
  team_members: [
    { name: "Admin CS", role: "CS", phone: "", status: "active", notes: "Follow-up lead website" },
    { name: "Admin Marketing", role: "Marketing", phone: "", status: "active", notes: "Artikel, portofolio, kalender konten" },
  ],
};

for (const [table, rows] of Object.entries(seeds)) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers,
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    console.error(`${table}: failed - ${await response.text()}`);
    process.exitCode = 1;
  } else {
    console.log(`${table}: seeded ${rows.length}`);
  }
}

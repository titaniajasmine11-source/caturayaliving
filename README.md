# Eko Suyanto Workshop

Website MVP untuk Eko Suyanto Workshop, layanan interior, aluminium, kitchen set, plafon, kanopi, partisi, dan home finishing di Sidareja, Cilacap, dan sekitarnya.

## Stack

- Next.js
- TypeScript
- CSS Modules
- Vercel-ready

## Halaman

- `/` — homepage marketing
- `/layanan` — daftar layanan utama
- `/area-rumah` — kebutuhan berdasarkan area rumah
- `/portofolio` — studi kasus/portfolio awal
- `/tentang-kami` — profil brand lokal
- `/kontak` — kontak dan CTA WhatsApp
- `/artikel` — daftar artikel SEO
- `/artikel/[slug]` — detail artikel SEO
- `/simulasi-harga` — simulasi estimasi multi-layanan
- `/planner` — configurator visual dan saved design
- `/admin` — dashboard CRM, CRUD resource, dan operasional internal
- `/operasional` — checklist Google Business, sosial media, dan workflow tim

## Konten

Konten utama dikelola dari:

- `src/lib/site.ts` untuk identitas site, URL, alamat, dan nomor WhatsApp.
- `src/lib/content.ts` untuk layanan, area rumah, portofolio, artikel, FAQ, proses, dan testimoni.

Sebelum production, ganti `site.url` ke domain final dan masukkan foto proyek asli ke `public`.

## Supabase Leads

Project disiapkan untuk menyimpan form konsultasi, saved design planner, CRM, price rules, content calendar, dan CMS items ke Supabase.

Environment yang dibutuhkan di Vercel:

- `SUPABASE_URL=https://ddfweujqtqjxdvznauvu.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `ADMIN_TOKEN=...` untuk membuka lead Supabase di `/admin` dan endpoint `/api/admin/leads`
- `IMAGE_API_URL=https://<worker>.workers.dev` untuk fitur Generate Image admin opsional
- `IMAGE_API_KEY=...` API key Worker image generator

SQL schema lengkap tersedia di `supabase/schema.sql` dan mencakup:

- `leads`
- `saved_designs`
- `price_rules`
- `content_calendar`
- `cms_items`

Jika env belum lengkap, form tetap fallback ke WhatsApp dan localStorage browser.

Dashboard `/admin` akan membaca dan mengelola data Supabase jika env tersedia. Jika `ADMIN_TOKEN` diset, login melalui `/admin/login` atau masukkan token yang sama di form admin.

Untuk development lokal, buat `.env.local` dengan `ADMIN_TOKEN` acak yang kuat. Isi `SUPABASE_SERVICE_ROLE_KEY` hanya jika ingin menguji baca/tulis lead Supabase dari mesin lokal.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Project ini disiapkan untuk deploy gratis di Vercel.

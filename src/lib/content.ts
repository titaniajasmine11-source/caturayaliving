// ─── Kategori Layanan (untuk tampilan terorganisir) ───────────────────────────
export const serviceCategories = [
  {
    id: "kayu",
    label: "Kayu & Perabotan",
    icon: "🪵",
    description: "Dikerjakan oleh tim tukang kayu berpengalaman dengan material pilihan.",
    services: ["kusen-kayu", "perabotan-custom", "lemari-custom", "backdrop-tv", "rak-kabinet"],
  },
  {
    id: "aluminium",
    label: "Aluminium & Kaca",
    icon: "🔩",
    description: "Fabrikasi aluminium presisi untuk eksterior dan interior rumah & ruko.",
    services: ["kusen-aluminium", "pintu-jendela-aluminium", "partisi-ruangan", "pagar-gerbang", "kanopi"],
  },
  {
    id: "finishing",
    label: "HPL, PVC & Finishing",
    icon: "🎨",
    description: "Material finishing modern yang tahan lama, variatif, dan mudah dirawat.",
    services: ["hpl-finishing", "plafon-gypsum-pvc", "plafon-pvc", "plafon-gypsum", "home-finishing"],
  },
  {
    id: "interior",
    label: "Interior & Kitchen",
    icon: "🛋️",
    description: "Desain dan instalasi interior custom menyesuaikan karakter dan fungsi ruang.",
    services: ["kitchen-set-custom", "interior-custom", "backdrop-tv", "lemari-custom"],
  },
  {
    id: "bangunan",
    label: "Jasa Bangunan",
    icon: "🧱",
    description: "Pekerjaan sipil ringan hingga renovasi berat oleh tim tukang bangunan terlatih.",
    services: ["jasa-bangunan", "renovasi-ringan", "renovasi-total"],
  },
];

export const services = [
  // KAYU & PERABOTAN
  { title: "Kusen Kayu", slug: "kusen-kayu", category: "kayu", summary: "Kusen pintu dan jendela dari kayu solid berkualitas tinggi, hangat dan kokoh.", detail: "Menggunakan kayu jati, mahoni, atau kayu lokal pilihan. Cocok untuk rumah bergaya tropis, klasik, dan modern-natural.", image: "/images/services/kusen-kayu/hero-kusen-kayu.png", benefits: ["Material alami & hangat", "Kekuatan tinggi", "Ukiran custom bisa", "Nilai estetika tinggi"], deliverables: ["Pilihan jenis kayu", "Pengukuran bukaan", "Produksi frame kayu", "Pemasangan & finishing"] },
  { title: "Perabotan Rumah Custom", slug: "perabotan-custom", category: "kayu", summary: "Meja, kursi, bufet, meja makan, dan perabotan rumah custom sesuai desain Anda.", detail: "Dibuat oleh tukang kayu berpengalaman. Pilihan material: kayu solid, multipleks HPL, atau kombinasi kayu-besi.", image: "/images/services/perabotan/hero-perabotan.png", benefits: ["Ukuran persis sesuai ruang", "Material pilihan sendiri", "Desain unik personal", "Lebih awet dari produk pabrikan"], deliverables: ["Konsultasi desain", "Pilihan material & finishing", "Produksi custom", "Pengiriman & instalasi"] },
  { title: "Lemari Custom", slug: "lemari-custom", category: "kayu", summary: "Lemari pakaian, lemari display, atau storage custom sesuai ukuran ruang.", detail: "Solusi untuk kamar, ruang keluarga, area usaha, dan rumah dengan ukuran tidak standar.", image: "/images/services/lemari/hero-lemari.png", benefits: ["Storage maksimal", "Sesuai ukuran ruang", "Model fleksibel", "Ruang lebih tertata"], deliverables: ["Ukur kebutuhan storage", "Layout sekat", "Pilihan finishing", "Produksi custom"] },
  { title: "Rak / Kabinet", slug: "rak-kabinet", category: "kayu", summary: "Rak dan kabinet custom untuk dapur, ruang keluarga, ruko, atau area display.", detail: "Dirancang untuk menyimpan barang lebih rapi tanpa mengganggu sirkulasi ruang.", image: "/images/services/rak-kabinet/hero-rak-kabinet.png", benefits: ["Barang tertata", "Display lebih rapi", "Ukuran fleksibel", "Cocok rumah/usaha"], deliverables: ["Desain rak", "Pembagian storage", "Pilihan material", "Pemasangan kabinet"] },
  { title: "Backdrop TV", slug: "backdrop-tv", category: "kayu", summary: "Backdrop TV custom agar ruang keluarga punya titik fokus yang rapi dan modern.", detail: "Bisa dikombinasikan dengan kabinet, rak display, panel, dan jalur kabel tersembunyi.", image: "/images/areas/living-room/hero-living-room.webp", benefits: ["Ruang lebih fokus", "Kabel lebih rapi", "Bisa tambah storage", "Tampilan premium"], deliverables: ["Sketsa backdrop", "Layout panel", "Rekomendasi finishing", "Instalasi di lokasi"] },

  // ALUMINIUM & KACA
  { title: "Kusen Aluminium", slug: "kusen-aluminium", category: "aluminium", summary: "Kusen rapi, ringan, tahan lembap, dan mudah dirawat untuk rumah maupun ruko.", detail: "Cocok untuk pintu, jendela, partisi kaca, dan area yang butuh finishing modern.", image: "/images/services/kusen-aluminium/hero-kusen-aluminium.webp", benefits: ["Tahan lembap", "Perawatan mudah", "Ukuran custom", "Tampilan modern"], deliverables: ["Pengukuran bukaan", "Rekomendasi profil", "Pilihan kaca dan warna", "Pemasangan di lokasi"] },
  { title: "Pintu & Jendela Aluminium", slug: "pintu-jendela-aluminium", category: "aluminium", summary: "Pembuatan pintu dan jendela aluminium custom sesuai ukuran bukaan di lokasi.", detail: "Termasuk konsultasi profil, warna, kaca, aksesoris, dan pola bukaan.", image: "/images/services/kusen-aluminium/hero-kusen-aluminium.webp", benefits: ["Bukaan lebih presisi", "Cocok rumah/ruko", "Pilihan kaca fleksibel", "Finishing bersih"], deliverables: ["Survey bukaan", "Desain pola bukaan", "Produksi frame", "Instalasi dan pengecekan"] },
  { title: "Partisi Ruangan", slug: "partisi-ruangan", category: "aluminium", summary: "Partisi aluminium, kaca, gypsum, atau custom untuk membagi ruang tanpa terasa sempit.", detail: "Ideal untuk ruang keluarga, kantor kecil, toko, dan area usaha.", image: "/images/services/partisi/hero-partisi.png", benefits: ["Zonasi ruang jelas", "Tidak selalu perlu dinding", "Privasi lebih baik", "Bisa semi-transparan"], deliverables: ["Analisis fungsi ruang", "Pilihan material", "Ukuran partisi", "Pemasangan akhir"] },
  { title: "Kanopi", slug: "kanopi", category: "aluminium", summary: "Kanopi carport, teras, atau area belakang dengan struktur yang disesuaikan lokasi.", detail: "Pilihan konsep minimalis, industrial, atau fungsional untuk perlindungan panas dan hujan.", image: "/images/services/kanopi/hero-kanopi.webp", benefits: ["Area lebih teduh", "Struktur sesuai lokasi", "Pilihan atap fleksibel", "Melindungi carport/teras"], deliverables: ["Cek titik tumpuan", "Rekomendasi rangka", "Estimasi material", "Pemasangan struktur"] },
  { title: "Pagar / Gerbang", slug: "pagar-gerbang", category: "aluminium", summary: "Pagar dan gerbang custom untuk memperkuat fasad, keamanan, dan kesan pertama rumah.", detail: "Membantu memilih pola, rangka, bukaan, dan finishing yang sesuai ukuran depan rumah.", image: "/images/services/pagar-gerbang/hero-pagar-gerbang.png", benefits: ["Fasad lebih rapi", "Keamanan meningkat", "Ukuran custom", "Tahan cuaca"], deliverables: ["Ukur area depan", "Konsep pola", "Pilihan material", "Pemasangan gerbang"] },

  // HPL, PVC & FINISHING
  { title: "HPL Finishing", slug: "hpl-finishing", category: "finishing", summary: "Finishing HPL (High Pressure Laminate) premium untuk kabinet, lemari, dan panel dinding.", detail: "HPL tersedia ratusan pilihan warna, motif, dan tekstur. Tahan goresan, lembap, dan mudah dibersihkan.", image: "/images/services/hpl-finishing/hero-hpl-finishing.png", benefits: ["Ratusan pilihan warna", "Tahan goresan & lembap", "Mudah dibersihkan", "Tampilan premium"], deliverables: ["Konsultasi warna & motif", "Pengukuran bidang", "Cutting & laminasi HPL", "Pemasangan presisi"] },
  { title: "Plafon Gypsum/PVC", slug: "plafon-gypsum-pvc", category: "finishing", summary: "Plafon untuk ruang tamu, kamar, dapur, ruko, dan area renovasi ringan.", detail: "Membantu ruangan terlihat lebih rapi, terang, dan nyaman dengan pilihan material tepat.", image: "/images/services/plafon/hero-plafon.webp", benefits: ["Ruang lebih clean", "Titik lampu tertata", "Opsi gypsum/PVC", "Cocok renovasi ringan"], deliverables: ["Cek tinggi ruang", "Rencana titik lampu", "Rekomendasi material", "Pemasangan plafon"] },
  { title: "Home Finishing", slug: "home-finishing", category: "finishing", summary: "Paket finishing rumah agar detail akhir terlihat bersih, serasi, dan siap digunakan.", detail: "Membantu menyatukan pekerjaan plafon, aluminium, partisi, kanopi, dan interior.", image: "/images/services/home-finishing/hero-home-finishing.png", benefits: ["Detail akhir lebih rapi", "Pekerjaan lebih terkoordinasi", "Cocok rumah baru/renovasi", "Prioritas budget jelas"], deliverables: ["Checklist finishing", "Urutan pekerjaan", "Estimasi bertahap", "Serah terima"] },

  // INTERIOR & KITCHEN
  { title: "Kitchen Set Custom", slug: "kitchen-set-custom", category: "interior", summary: "Kitchen set yang disesuaikan dengan alur masak, ukuran ruang, dan budget.", detail: "Mulai dari kabinet bawah, kabinet atas, top table, backsplash, hingga storage tambahan. Material: multipleks HPL, MDF, atau solid wood.", image: "/images/services/kitchen-set/hero-kitchen-set.webp", benefits: ["Storage lebih rapi", "Layout sesuai kebiasaan", "Material bisa disesuaikan", "Preview visual lebih jelas"], deliverables: ["Layout kabinet", "Rekomendasi material", "Visual 3D awal", "Produksi dan pemasangan"] },
  { title: "Interior Custom", slug: "interior-custom", category: "interior", summary: "Elemen interior custom untuk membuat rumah lebih tertata dan sesuai karakter penghuni.", detail: "Meliputi backdrop, kabinet, storage, rak, meja, dan detail finishing lain.", image: "/images/areas/living-room/hero-living-room.webp", benefits: ["Desain sesuai ruang", "Rumah terasa selesai", "Storage lebih efisien", "Visual lebih personal"], deliverables: ["Moodboard konsep", "Sketsa/visual", "Produksi custom", "Finishing dan instalasi"] },

  // JASA BANGUNAN
  { title: "Jasa Bangunan & Renovasi", slug: "jasa-bangunan", category: "bangunan", summary: "Pekerjaan bangunan menyeluruh: dari pondasi, dinding, keramik, hingga renovasi total.", detail: "Tim tukang bangunan kami menangani pekerjaan sipil ringan hingga berat: pembuatan dinding, pemasangan keramik, plesteran, dan renovasi ruangan.", image: "/images/services/jasa-bangunan/hero-jasa-bangunan.png", benefits: ["Tim berpengalaman", "Koordinasi langsung", "Estimasi jelas & transparan", "Bisa paket full project"], deliverables: ["Survey lokasi", "RAB (Rencana Anggaran Biaya)", "Pekerjaan sipil terstruktur", "Serah terima bersih"] },
  { title: "Renovasi Ringan", slug: "renovasi-ringan", category: "bangunan", summary: "Renovasi ringan untuk memperbaiki tampilan dan fungsi rumah tanpa bongkar besar.", detail: "Fokus pada pekerjaan finishing, plafon, partisi, kabinet, aluminium, dan detail interior.", image: "/images/services/home-finishing/hero-home-finishing.png", benefits: ["Tidak perlu bongkar besar", "Prioritas pekerjaan jelas", "Budget lebih terkendali", "Rumah terasa baru"], deliverables: ["Checklist kondisi", "Urutan renovasi", "Estimasi tahap", "Eksekusi finishing"] },
  { title: "Renovasi Total", slug: "renovasi-total", category: "bangunan", summary: "Renovasi menyeluruh dari awal: bangunan, interior, finishing, dan semua detailnya.", detail: "Kami koordinasi semua tim: tukang bangunan, kayu, aluminium, PVC/HPL, kitchen set — dalam satu proyek terpadu.", image: "/images/services/jasa-bangunan/hero-jasa-bangunan.png", benefits: ["Satu kontraktor semua tim", "Koordinasi lebih mudah", "Tidak perlu cari vendor sendiri", "Progres termonitor"], deliverables: ["Desain konsep", "RAB lengkap", "Pekerjaan multi-tim terpadu", "Finishing & serah terima"] },
  { title: "Plafon PVC", slug: "plafon-pvc", category: "finishing", summary: "Plafon PVC untuk area yang butuh perawatan mudah dan tampilan praktis.", detail: "Cocok untuk area tertentu yang membutuhkan material ringan dan mudah dibersihkan.", image: "/images/services/plafon/hero-plafon.webp", benefits: ["Mudah dibersihkan", "Tahan lembap", "Pemasangan praktis", "Pilihan motif"], deliverables: ["Ukur plafon", "Pilih motif", "Rangka plafon", "Pemasangan PVC"] },
  { title: "Plafon Gypsum", slug: "plafon-gypsum", category: "finishing", summary: "Plafon gypsum untuk tampilan ruang yang lebih clean, halus, dan mudah dibentuk.", detail: "Ideal untuk ruang tamu, kamar, dan area yang ingin terlihat lebih modern.", image: "/images/services/plafon/hero-plafon.webp", benefits: ["Tampilan halus", "Bisa drop ceiling", "Lampu lebih tertata", "Kesan modern"], deliverables: ["Rencana plafon", "Titik lampu", "Rangka gypsum", "Finishing akhir"] },
];



export const areas = [
  { title: "Gerbang & Pagar", slug: "gerbang-pagar", summary: "Area depan yang membentuk kesan pertama rumah and butuh material tahan cuaca.", image: "/images/areas/gerbang-pagar/hero-gerbang-pagar.png", recommended: ["Kanopi", "Aluminium", "Home Finishing"] },
  { title: "Teras Depan", slug: "teras-depan", summary: "Ruang transisi untuk menerima tamu, bersantai, dan memperkuat fasad rumah.", image: "/images/areas/teras-depan/hero-teras-depan.webp", recommended: ["Kanopi", "Plafon", "Partisi"] },
  { title: "Living Room", slug: "living-room", summary: "Ruang keluarga yang perlu terasa rapi, nyaman, dan punya titik fokus visual.", image: "/images/areas/living-room/hero-living-room.webp", recommended: ["Interior Custom", "Partisi", "Plafon"] },
  { title: "Kitchen / Dapur", slug: "kitchen-dapur", summary: "Area kerja harian yang membutuhkan layout efisien dan storage mudah dijangkau.", image: "/images/areas/kitchen/hero-kitchen.webp", recommended: ["Kitchen Set Custom", "Plafon", "Home Finishing"] },
  { title: "Master Room", slug: "master-room", summary: "Kamar utama yang membutuhkan storage, pencahayaan, dan detail personal.", image: "/images/areas/master-room/hero-master-room.webp", recommended: ["Interior Custom", "Partisi", "Plafon"] },
  { title: "Carport & Kanopi", slug: "carport-kanopi", summary: "Area kendaraan yang perlu perlindungan panas hujan dan struktur aman.", image: "/images/areas/carport-kanopi/hero-carport-kanopi.webp", recommended: ["Kanopi", "Aluminium", "Home Finishing"] },
  { title: "Halaman Belakang", slug: "halaman-belakang", summary: "Area servis atau santai yang bisa dibuat lebih teduh dan fungsional.", image: "/images/areas/halaman-belakang/hero-halaman-belakang.webp", recommended: ["Kanopi", "Partisi", "Plafon"] },
  { title: "Ruko / Tempat Usaha", slug: "ruko-tempat-usaha", summary: "Ruang usaha kecil yang membutuhkan tampilan rapi, efisien, dan mudah dirawat.", image: "/images/areas/ruko-usaha/hero-ruko-usaha.png", recommended: ["Partisi Ruangan", "Aluminium", "Interior Custom"] },
  { title: "Ruang Keluarga", slug: "ruang-keluarga", summary: "Area berkumpul keluarga yang membutuhkan storage, backdrop, dan suasana nyaman.", image: "/images/areas/living-room/hero-living-room.webp", recommended: ["Backdrop TV", "Interior Custom", "Rak / Kabinet"] },
  { title: "Kamar Anak", slug: "kamar-anak", summary: "Kamar anak yang perlu aman, rapi, dan mudah berubah mengikuti kebutuhan usia.", image: "/images/services/lemari/hero-lemari.png", recommended: ["Lemari Custom", "Rak / Kabinet", "Interior Custom"] },
  { title: "Kamar Tamu", slug: "kamar-tamu", summary: "Kamar tambahan yang perlu simple, bersih, dan tetap fungsional saat digunakan.", image: "/images/services/lemari/hero-lemari.png", recommended: ["Lemari Custom", "Plafon Gypsum/PVC", "Home Finishing"] },
  { title: "Dining Area", slug: "dining-area", summary: "Area makan yang bisa dibuat lebih hangat dengan kabinet, lighting, dan finishing dinding.", image: "/images/areas/dining-area/hero-dining-area.webp", recommended: ["Interior Custom", "Rak / Kabinet", "Plafon Gypsum"] },
  { title: "Kamar Mandi", slug: "kamar-mandi", summary: "Area basah yang perlu material mudah dirawat dan detail finishing rapi.", image: "/images/areas/kamar-mandi/hero-kamar-mandi.webp", recommended: ["Home Finishing", "Aluminium", "Renovasi Ringan"] },
  { title: "Mushola Rumah", slug: "mushola-rumah", summary: "Sudut ibadah yang tenang, bersih, dan bisa dilengkapi storage kecil.", image: "/images/services/partisi/hero-partisi.png", recommended: ["Interior Custom", "Rak / Kabinet", "Partisi Ruangan"] },
  { title: "Laundry Area", slug: "laundry-area", summary: "Area cuci yang perlu rak, kabinet, dan perlindungan agar tetap rapi.", image: "/images/areas/laundry-area/hero-laundry-area.webp", recommended: ["Rak / Kabinet", "Kanopi", "Home Finishing"] },
  { title: "Gudang", slug: "gudang", summary: "Area penyimpanan yang perlu rak kuat, sirkulasi, dan pembagian barang jelas.", image: "/images/areas/gudang/hero-gudang.webp", recommended: ["Rak / Kabinet", "Partisi Ruangan", "Home Finishing"] },
  { title: "Taman Depan", slug: "taman-depan", summary: "Area hijau depan rumah yang memperkuat fasad dan kenyamanan visual.", image: "/images/areas/taman-depan/hero-taman-depan.webp", recommended: ["Kanopi", "Pagar / Gerbang", "Home Finishing"] },
];

export const portfolioCategories = ["Semua", "Kayu & Perabotan", "Aluminium", "Kitchen Set", "HPL & Finishing", "Plafon", "Kanopi", "Partisi", "Interior", "Bangunan"];

export const portfolio = [
  { title: "Kitchen Set Minimalis Sidareja", category: "Kitchen Set", slug: "kitchen-set", location: "Sidareja", material: "Kabinet custom multipleks HPL, top table granit, backsplash", duration: "7-14 hari", image: "/images/services/kitchen-set/hero-kitchen-set.webp" },
  { title: "Kusen Aluminium Rumah Tegalsari", category: "Aluminium", slug: "aluminium", location: "Tegalsari", material: "Profil aluminium graphite, kaca bening 5mm", duration: "3-7 hari", image: "/images/services/kusen-aluminium/hero-kusen-aluminium.webp" },
  { title: "Plafon Drop Ceiling Ruang Tamu", category: "Plafon", slug: "plafon", location: "Sidareja", material: "Gypsum rangka hollow, finishing cat putih", duration: "2-5 hari", image: "/images/services/plafon/hero-plafon.webp" },
  { title: "Kanopi Carport Tempered Glass", category: "Kanopi", slug: "kanopi", location: "Cilacap", material: "Rangka besi hollow, atap tempered glass 8mm", duration: "3-6 hari", image: "/images/services/kanopi/hero-kanopi.webp" },
  { title: "Partisi Kaca Area Usaha Cipari", category: "Partisi", slug: "partisi", location: "Cipari", material: "Frame aluminium silver, kaca 6mm sandblast", duration: "3-5 hari", image: "/images/services/partisi/hero-partisi.png" },
  { title: "Backdrop TV Panel Kayu Ruang Keluarga", category: "Interior", slug: "interior", location: "Kedungreja", material: "Panel HPL motif kayu, kabinet bawah, jalur LED", duration: "5-10 hari", image: "/images/areas/living-room/hero-living-room.webp" },
  { title: "Gerbang Minimalis Besi Hollow", category: "Aluminium", slug: "gerbang-minimalis", location: "Tegalsari", material: "Rangka besi hollow, finishing cat bronze graphite", duration: "4-8 hari", image: "/images/services/pagar-gerbang/hero-pagar-gerbang.png" },
  { title: "Lemari HPL Custom Master Room", category: "HPL & Finishing", slug: "lemari-master-room", location: "Sidareja", material: "Multipleks HPL motif kayu warm oak, soft-close", duration: "7-12 hari", image: "/images/services/lemari/hero-lemari.png" },
  { title: "Kusen Kayu Jati Rumah Klasik", category: "Kayu & Perabotan", slug: "kusen-kayu-jati", location: "Sidareja", material: "Kayu jati solid, profil ukir minimalis, finishing politur", duration: "10-18 hari", image: "/images/services/kusen-kayu/hero-kusen-kayu.png" },
  { title: "Perabotan Ruang Makan Custom", category: "Kayu & Perabotan", slug: "perabotan-ruang-makan", location: "Cilacap", material: "Meja makan kayu solid, kursi custom, bufet", duration: "14-21 hari", image: "/images/services/perabotan/hero-perabotan.png" },
  { title: "Finishing HPL Kitchen Set Ruko", category: "HPL & Finishing", slug: "hpl-kitchen-ruko", location: "Cipari", material: "HPL motif marble, kabinet atas-bawah, wastafel", duration: "5-9 hari", image: "/images/services/hpl-finishing/hero-hpl-finishing.png" },
  { title: "Renovasi Kamar Mandi + Keramik", category: "Bangunan", slug: "renovasi-kamar-mandi", location: "Kedungreja", material: "Pasang keramik 60x60, dinding mozaik, shower area", duration: "5-8 hari", image: "/images/services/jasa-bangunan/hero-jasa-bangunan.png" },
  { title: "Renovasi Teras & Kanopi Minimalis", category: "Kanopi", slug: "renovasi-teras", location: "Cilacap", material: "Kanopi atap alderon, plafon teras, cat ulang", duration: "6-10 hari", image: "/images/services/home-finishing/hero-home-finishing.png" },
  { title: "Rak Display Ruko Produk Lokal", category: "Interior", slug: "rak-display-ruko", location: "Cipari", material: "Rak display HPL, kabinet bawah, backdrop brand", duration: "5-9 hari", image: "/images/areas/ruko-usaha/hero-ruko-usaha.png" },
];

export const designStages = [
  { title: "Sketsa Konsep", label: "Sketch", image: "/images/visual-sketch.svg", description: "Arah bentuk, komposisi ruang, dan ide awal sebelum masuk ukuran detail." },
  { title: "Layout 2D", label: "2D", image: "/images/visual-2d.svg", description: "Rencana denah, posisi kabinet, bukaan, jalur gerak, dan pembagian fungsi ruang." },
  { title: "Visual 3D", label: "3D", image: "/images/visual-3d.svg", description: "Preview suasana material, warna, pencahayaan, dan proporsi interior sebelum produksi." },
  { title: "Preview 4D", label: "4D", image: "/images/visual-4d.svg", description: "Simulasi konsep bertahap untuk menjelaskan urutan pekerjaan, progres, dan pengalaman ruang." },
];

export const process = ["Konsultasi & Ceritakan Kebutuhan", "Kirim Foto & Ukuran Lokasi", "Survei Lokasi", "RAB & Penawaran Harga", "Koordinasi Tim Spesialis", "Produksi & Fabrikasi", "Pemasangan di Lokasi", "Finishing & Serah Terima"];

export const testimonials = [
  { quote: "Awalnya saya pikir harus cari banyak tukang berbeda. Ternyata cukup hubungi Caturaya Living, semua dikoordinasi — dari kusen, kitchen set, sampai plafon. Hasilnya rapi dan selesai tepat waktu.", name: "Bapak Heri – Sidareja" },
  { quote: "Kitchen set kayu HPL-nya bagus banget, beda dari toko biasa. Finishing rapi dan ukurannya pas banget dengan dapur saya yang tidak standar.", name: "Ibu Sari – Tegalsari" },
  { quote: "Renovasi kamar mandi plus pasang kusen aluminium baru. Komunikasi tim responsif, estimasi harga jelas sejak awal, tidak ada biaya kejutan.", name: "Bapak Doni – Cilacap" },
  { quote: "Perabotan custom ruang tamu yang saya minta sesuai ekspektasi. Kayu solid asli, finishing halus, dan pengiriman tepat waktu.", name: "Ibu Wati – Kedungreja" },
  { quote: "Satu nomor WhatsApp sudah bisa urus semua kebutuhan renovasi. Gak perlu repot cari tukang satu-satu. Sangat membantu!", name: "Bapak Eko – Cipari" },
];

export const faqs = [
  { question: "Apa itu full kontraktor? Apakah Caturaya Living bisa mengerjakan semua jenis proyek?", answer: "Ya. Sebagai full kontraktor, kami mengelola proyek dari awal sampai selesai — termasuk koordinasi tim tukang kayu, aluminium, PVC/HPL, dan tukang bangunan. Anda cukup satu kali konsultasi untuk semua kebutuhan." },
  { question: "Apakah melayani kusen kayu, bukan hanya aluminium?", answer: "Tentu. Kami melayani kusen dari kayu solid (jati, mahoni, kayu lokal) maupun aluminium sesuai kebutuhan dan budget Anda." },
  { question: "Bisakah memesan perabotan rumah custom seperti meja, kursi, atau bufet?", answer: "Bisa. Tim tukang kayu kami mengerjakan berbagai perabotan custom: meja makan, kursi, bufet, rak buku, dan furniture lain sesuai desain dan ukuran ruang Anda." },
  { question: "Apa itu HPL dan kenapa direkomendasikan untuk finishing?", answer: "HPL (High Pressure Laminate) adalah lapisan finishing modern yang kuat, tahan goresan, tahan lembap, dan tersedia ratusan pilihan motif dan warna. Cocok untuk kitchen set, lemari, dan kabinet." },
  { question: "Apakah bisa menangani renovasi bangunan seperti pasang keramik atau dinding?", answer: "Bisa. Kami memiliki tim tukang bangunan untuk pekerjaan sipil ringan hingga berat: pemasangan keramik, plesteran, pembuatan dinding, dan renovasi ruangan secara menyeluruh." },
  { question: "Apakah bisa survei lokasi dulu sebelum estimasi?", answer: "Bisa dan sangat disarankan. Survei lokasi membantu kami mengukur langsung, memahami kondisi, dan memberikan estimasi harga yang lebih akurat." },
  { question: "Bagaimana cara memulai proyek dengan Caturaya Living?", answer: "Mudah — hubungi kami lewat WhatsApp, ceritakan kebutuhan Anda, kirim foto lokasi jika ada, lalu kami atur jadwal konsultasi atau survei. Tidak ada biaya untuk konsultasi awal." },
  { question: "Apakah melayani area luar Sidareja?", answer: "Ya. Area utama kami adalah Sidareja, Cilacap, Tegalsari, Cipari, dan Kedungreja. Lokasi lebih jauh bisa dikonsultasikan terlebih dahulu tergantung jenis dan skala pekerjaan." },
];

export const articles = [
  {
    slug: "cara-memilih-kusen-aluminium",
    title: "Cara Memilih Kusen Aluminium untuk Rumah Sidareja",
    summary: "Pahami profil, warna, kaca, dan kebutuhan bukaan sebelum menentukan kusen aluminium.",
    category: "Aluminium",
    tags: ["kusen", "jendela", "material"],
    readTime: "4 menit",
    sections: [
      { heading: "Sesuaikan profil dengan ukuran bukaan", body: "Bukaan besar membutuhkan profil yang lebih kokoh agar pintu atau jendela tetap stabil saat digunakan setiap hari." },
      { heading: "Pertimbangkan warna dan kaca", body: "Warna graphite, hitam, bronze, atau silver memberi kesan berbeda. Kaca bening, es, atau riben bisa dipilih sesuai privasi dan cahaya." },
      { heading: "Cek kondisi dinding", body: "Dinding yang tidak siku atau area lembap perlu diperhatikan sejak awal supaya pemasangan lebih rapi." },
    ],
  },
  {
    slug: "estimasi-kitchen-set-custom",
    title: "Apa yang Mempengaruhi Estimasi Kitchen Set Custom?",
    summary: "Ukuran, material, aksesoris, top table, dan layout dapur sangat mempengaruhi biaya kitchen set.",
    category: "Kitchen Set",
    tags: ["dapur", "budget", "storage"],
    readTime: "5 menit",
    sections: [
      { heading: "Panjang kabinet dan layout", body: "Kitchen set lurus, L-shape, dan U-shape punya kebutuhan material dan aksesoris berbeda." },
      { heading: "Pilihan finishing", body: "Finishing menentukan tampilan dan perawatan. Pilihan yang tepat membantu dapur tetap mudah dibersihkan." },
      { heading: "Aksesoris storage", body: "Rak piring, laci, engsel soft-close, dan kabinet tinggi bisa meningkatkan fungsi sekaligus biaya." },
    ],
  },
  {
    slug: "plafon-gypsum-vs-pvc",
    title: "Plafon Gypsum vs PVC: Mana yang Cocok?",
    summary: "Keduanya punya karakter berbeda untuk tampilan, perawatan, dan kebutuhan ruang.",
    category: "Plafon",
    tags: ["gypsum", "pvc", "renovasi"],
    readTime: "4 menit",
    sections: [
      { heading: "Gypsum untuk tampilan clean", body: "Gypsum cocok untuk ruang tamu dan kamar karena tampilannya halus serta mudah dibuat drop ceiling." },
      { heading: "PVC untuk area praktis", body: "PVC lebih tahan lembap dan mudah dibersihkan, cocok untuk area tertentu yang butuh perawatan sederhana." },
      { heading: "Perhatikan pencahayaan", body: "Titik lampu dan tinggi plafon perlu direncanakan agar ruangan terasa lapang dan nyaman." },
    ],
  },
  {
    slug: "tips-rumah-lebih-rapi",
    title: "Tips Membuat Rumah Terlihat Lebih Rapi dengan Interior Custom",
    summary: "Storage, partisi, warna, dan titik fokus ruangan bisa membuat rumah terasa lebih lega.",
    category: "Interior",
    tags: ["storage", "partisi", "ruang keluarga"],
    readTime: "3 menit",
    sections: [
      { heading: "Mulai dari storage", body: "Kabinet dan rak custom membantu barang punya tempat tetap sehingga ruangan tidak mudah terlihat penuh." },
      { heading: "Gunakan partisi seperlunya", body: "Partisi bisa membagi fungsi ruang tanpa harus membangun dinding permanen." },
      { heading: "Buat satu titik fokus", body: "Backdrop TV, kabinet display, atau kitchen set bisa menjadi anchor visual yang membuat ruangan terasa selesai." },
    ],
  },
  {
    slug: "jasa-interior-sidareja",
    title: "Jasa Interior Sidareja untuk Rumah dan Ruko",
    summary: "Panduan memilih vendor lokal yang paham ukuran, kebiasaan ruang, dan kebutuhan finishing setempat.",
    category: "Interior",
    tags: ["sidareja", "vendor lokal", "ruko"],
    readTime: "4 menit",
    sections: [
      { heading: "Vendor lokal lebih mudah survei", body: "Lokasi yang dekat memudahkan komunikasi, pengukuran, dan penyesuaian detail saat pekerjaan berjalan." },
      { heading: "Lihat alur kerja", body: "Pilih vendor yang bisa menjelaskan tahapan konsultasi, estimasi, produksi, pemasangan, dan serah terima." },
      { heading: "Siapkan referensi", body: "Foto inspirasi dan foto lokasi membantu vendor memahami style dan batasan ruang sejak awal." },
    ],
  },
  {
    slug: "jasa-kanopi-sidareja",
    title: "Jasa Kanopi Sidareja untuk Carport dan Teras",
    summary: "Hal yang perlu diperhatikan sebelum membuat kanopi untuk carport, teras, atau halaman belakang.",
    category: "Kanopi",
    tags: ["kanopi", "carport", "teras"],
    readTime: "4 menit",
    sections: [
      { heading: "Periksa titik tumpuan", body: "Kanopi perlu struktur yang aman. Titik tumpuan, bentang, dan kondisi dinding harus dicek sebelum menentukan rangka." },
      { heading: "Pilih atap sesuai fungsi", body: "Area carport, teras, dan halaman belakang bisa membutuhkan karakter atap berbeda terkait panas, cahaya, dan suara hujan." },
      { heading: "Sesuaikan dengan fasad", body: "Model kanopi sebaiknya menyatu dengan warna kusen, pagar, dan tampilan depan rumah." },
    ],
  },
  {
    slug: "backdrop-tv-ruang-keluarga",
    title: "Backdrop TV Ruang Keluarga: Fungsi, Storage, dan Tampilan",
    summary: "Backdrop TV bisa menjadi titik fokus ruang keluarga sekaligus menyembunyikan kabel dan menambah storage.",
    category: "Interior",
    tags: ["backdrop", "living room", "storage"],
    readTime: "4 menit",
    sections: [
      { heading: "Tentukan titik fokus", body: "Backdrop membantu ruang keluarga terlihat lebih selesai karena ada area visual utama yang tertata." },
      { heading: "Rencanakan kabel dan perangkat", body: "Posisi stop kontak, jalur kabel, router, dan perangkat hiburan perlu dipikirkan sejak awal." },
      { heading: "Gabungkan dengan storage", body: "Kabinet bawah atau rak display membuat backdrop lebih fungsional, bukan hanya dekoratif." },
    ],
  },
  {
    slug: "lemari-custom-kamar",
    title: "Lemari Custom Kamar: Cara Membuat Storage Lebih Efisien",
    summary: "Lemari custom membantu memaksimalkan ruang kamar dengan ukuran dan pembagian storage sesuai kebutuhan.",
    category: "Interior",
    tags: ["lemari", "kamar", "storage"],
    readTime: "4 menit",
    sections: [
      { heading: "Hitung jenis barang", body: "Pakaian gantung, lipat, tas, sepatu, dan barang kecil perlu tempat berbeda agar lemari tidak cepat berantakan." },
      { heading: "Perhatikan bukaan pintu", body: "Ruang sempit bisa memakai pintu sliding atau pembagian kabinet yang tidak mengganggu jalur gerak." },
      { heading: "Pilih finishing yang mudah dirawat", body: "Finishing yang tepat membuat lemari lebih tahan penggunaan harian dan tetap terlihat rapi." },
    ],
  },
  {
    slug: "renovasi-ringan-rumah-lama",
    title: "Renovasi Ringan Rumah Lama Tanpa Bongkar Besar",
    summary: "Renovasi ringan bisa dimulai dari plafon, kusen, partisi, kabinet, dan finishing visual yang paling terlihat.",
    category: "Renovasi",
    tags: ["renovasi", "rumah lama", "finishing"],
    readTime: "5 menit",
    sections: [
      { heading: "Prioritaskan area terlihat", body: "Ruang tamu, dapur, dan teras sering memberi dampak visual paling besar untuk renovasi tahap awal." },
      { heading: "Buat urutan pekerjaan", body: "Urutan yang jelas membantu menghindari pekerjaan ulang dan membuat budget lebih terkendali." },
      { heading: "Gunakan survei lokasi", body: "Rumah lama sering punya ukuran tidak standar, sehingga survei membantu mengurangi risiko salah produksi." },
    ],
  },
  {
    slug: "partisi-ruangan-ruko",
    title: "Partisi Ruangan untuk Ruko dan Tempat Usaha Kecil",
    summary: "Partisi membantu membagi area layanan, display, admin, atau storage tanpa membangun dinding permanen.",
    category: "Partisi",
    tags: ["partisi", "ruko", "usaha"],
    readTime: "4 menit",
    sections: [
      { heading: "Tentukan fungsi tiap zona", body: "Partisi harus mengikuti aktivitas usaha, bukan hanya membagi ruang secara visual." },
      { heading: "Pilih material sesuai kebutuhan", body: "Kaca memberi kesan terbuka, gypsum lebih tertutup, dan aluminium cocok untuk kombinasi yang praktis." },
      { heading: "Jaga sirkulasi pelanggan", body: "Jalur masuk, kasir, display, dan ruang tunggu perlu tetap mudah dipahami pelanggan." },
    ],
  },
  {
    slug: "jasa-kusen-aluminium-sidareja",
    title: "Jasa Kusen Aluminium Sidareja: Panduan Memilih Bahan dan Model",
    summary: "Panduan lokal memilih profil, warna, kaca, dan vendor kusen aluminium untuk rumah Sidareja.",
    category: "Aluminium",
    tags: ["sidareja", "kusen", "aluminium"],
    readTime: "5 menit",
    sections: [
      { heading: "Pilih profil sesuai bukaan", body: "Bukaan pintu dan jendela besar membutuhkan profil lebih kokoh agar frame stabil dan tidak mudah berubah bentuk." },
      { heading: "Sesuaikan warna dengan fasad", body: "Graphite, hitam, bronze, atau silver bisa dipilih mengikuti warna pagar, kanopi, dan cat depan rumah." },
      { heading: "Gunakan survei lokasi", body: "Survei membantu mengecek dinding, ukuran, siku, dan detail pemasangan sebelum produksi." },
    ],
  },
  {
    slug: "cara-memilih-kanopi-carport",
    title: "Cara Memilih Kanopi untuk Carport Rumah",
    summary: "Tips memilih rangka, atap, kemiringan, dan model kanopi agar carport lebih aman dan rapi.",
    category: "Kanopi",
    tags: ["kanopi", "carport", "fasad"],
    readTime: "4 menit",
    sections: [
      { heading: "Mulai dari fungsi", body: "Carport butuh perlindungan panas hujan, tetapi tetap harus mempertimbangkan cahaya, suara hujan, dan tampilan fasad." },
      { heading: "Periksa bentang dan tumpuan", body: "Semakin lebar bentang, struktur rangka perlu dihitung lebih hati-hati supaya aman dipakai jangka panjang." },
      { heading: "Samakan dengan tampilan rumah", body: "Model kanopi sebaiknya menyatu dengan pagar, kusen, dan warna depan rumah." },
    ],
  },
  {
    slug: "tips-renovasi-rumah-sidareja",
    title: "Tips Renovasi Ringan Rumah Sidareja Tanpa Bongkar Besar",
    summary: "Renovasi bisa dimulai dari area yang paling terlihat agar rumah terasa rapi tanpa biaya terlalu berat.",
    category: "Renovasi",
    tags: ["renovasi", "sidareja", "finishing"],
    readTime: "5 menit",
    sections: [
      { heading: "Prioritaskan area depan dan ruang tamu", body: "Teras, kusen, plafon, dan ruang tamu memberi dampak visual besar karena paling sering dilihat tamu." },
      { heading: "Buat urutan pekerjaan", body: "Urutan yang jelas mengurangi risiko bongkar ulang dan membantu budget dibagi per tahap." },
      { heading: "Gunakan ukuran aktual", body: "Rumah lama sering tidak presisi, sehingga pengukuran langsung lebih aman dibanding perkiraan." },
    ],
  },
  {
    slug: "inspirasi-ruang-tamu-minimalis",
    title: "Inspirasi Ruang Tamu Minimalis agar Lebih Rapi dan Nyaman",
    summary: "Backdrop, kabinet, pencahayaan, dan partisi ringan bisa membuat ruang tamu terlihat lebih selesai.",
    category: "Interior",
    tags: ["ruang tamu", "backdrop", "minimalis"],
    readTime: "4 menit",
    sections: [
      { heading: "Buat titik fokus", body: "Backdrop TV atau panel dinding membantu ruang tamu punya anchor visual yang rapi." },
      { heading: "Tambahkan storage tertutup", body: "Kabinet bawah, rak display, dan lemari kecil membantu barang tidak terlihat berantakan." },
      { heading: "Pilih warna hangat", body: "Kombinasi putih, beige, wood, dan graphite membuat ruang terasa bersih tetapi tetap hangat." },
    ],
  },
  {
    slug: "inspirasi-dapur-minimalis",
    title: "Inspirasi Dapur Minimalis untuk Rumah Lokal",
    summary: "Dapur minimalis perlu layout efisien, storage cukup, dan material yang mudah dirawat harian.",
    category: "Kitchen Set",
    tags: ["dapur", "kitchen set", "minimalis"],
    readTime: "4 menit",
    sections: [
      { heading: "Ikuti alur masak", body: "Posisi sink, kompor, meja persiapan, dan kabinet sebaiknya mengikuti kebiasaan masak keluarga." },
      { heading: "Maksimalkan kabinet atas", body: "Kabinet atas membantu menyimpan barang ringan tanpa memenuhi meja dapur." },
      { heading: "Pilih finishing mudah dibersihkan", body: "Material dan finishing menentukan perawatan dapur, terutama untuk area dekat kompor dan sink." },
    ],
  },
];

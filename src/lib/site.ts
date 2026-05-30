export const site = {
  name: "Eko Suyanto Workshop",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekosuyanto.vercel.app",
  tagline: "Full kontraktor properti: interior, eksterior, kusen kayu & aluminium, kitchen set, perabotan custom, HPL/PVC finishing, plafon, kanopi, pagar, dan jasa bangunan.",
  description: "Eko Suyanto Workshop adalah kontraktor properti full-service di Sidareja, Cilacap. Kami mengelola proyek interior & eksterior secara menyeluruh dengan jaringan tim spesialis: tukang kayu, aluminium, PVC/HPL, dan tukang bangunan.",
  phonePrimary: "6285119467138",
  phonePrimaryLabel: "0851-1946-7138",
  phoneSecondary: "62895703018230",
  phoneSecondaryLabel: "0895-7030-18230",
  address: "Jalan Seruni RT 09 RW 02, Desa Tegalsari, Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah",
  locationCode: "GQ7C+79 Tegalsari",
  teamSpecialists: [
    { role: "Tukang Kayu", icon: "Hammer", description: "Kusen kayu solid, perabotan custom, lemari, kabinet, dan furniture ukir." },
    { role: "Tukang Aluminium", icon: "Wrench", description: "Kusen, pintu, jendela, partisi kaca, kanopi, pagar, dan gerbang aluminium." },
    { role: "Tukang PVC & HPL", icon: "Paintbrush", description: "Finishing HPL premium, panel PVC, plafon, dan pelapis dinding modern." },
    { role: "Tukang Bangunan", icon: "HardHat", description: "Renovasi sipil, pemasangan keramik, plesteran, dinding, dan pondasi ringan." },
    { role: "Tim Kitchen Set", icon: "CookingPot", description: "Kitchen set custom dari desain hingga instalasi, material multiplek & MDF." },
    { role: "Tim Interior", icon: "Sofa", description: "Backdrop, rak display, lemari pakaian, dan elemen dekoratif interior." },
  ],
};

export function whatsappUrl(message?: string, phone = site.phonePrimary) {
  const text = encodeURIComponent(
    message ??
      `Halo Eko Suyanto Workshop, saya ingin konsultasi proyek.

Nama:
Lokasi / Alamat:
Jenis Pekerjaan (interior/eksterior/bangunan):
Detail Kebutuhan:
Ukuran Perkiraan:
Referensi Desain:
Budget Perkiraan:
Target Selesai:`,
  );

  return `https://wa.me/${phone}?text=${text}`;
}

export function absoluteUrl(path = "") {
  return new URL(path, site.url).toString();
}

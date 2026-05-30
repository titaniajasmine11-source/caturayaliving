export const site = {
  name: "Caturaya Living",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://caturayaliving.vercel.app",
  tagline: "Interior, aluminium, kitchen set, plafon, kanopi, partisi, dan home finishing.",
  phonePrimary: "6285119467138",
  phonePrimaryLabel: "0851-1946-7138",
  phoneSecondary: "62895703018230",
  phoneSecondaryLabel: "0895-7030-18230",
  address: "Jalan Seruni RT 09 RW 02, Desa Tegalsari, Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah",
  locationCode: "GQ7C+79 Tegalsari",
};

export function whatsappUrl(message?: string, phone = site.phonePrimary) {
  const text = encodeURIComponent(
    message ??
      `Halo Caturaya Living, saya ingin konsultasi.

Nama:
Lokasi:
Kebutuhan:
Area rumah:
Ukuran perkiraan:
Referensi desain:
Budget perkiraan:
Kapan ingin dikerjakan:`,
  );

  return `https://wa.me/${phone}?text=${text}`;
}

export function absoluteUrl(path = "") {
  return new URL(path, site.url).toString();
}

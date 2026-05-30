import { PriceSimulator } from "@/components/price-simulator";
import Link from "next/link";
import { Calculator, Compass } from "lucide-react";

export const metadata = {
  title: "Simulasi Harga Kitchen Set & Aluminium Premium | Caturaya Living",
  description: "Hitung perkiraan estimasi biaya awal kitchen set custom, kusen aluminium, pintu, dan plafon di area Sidareja, Cilacap.",
};

export default function SimulasiHargaPage() {
  return (
    <main className="bg-white min-h-screen text-neutral-text pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-neutral-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Beranda</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-primary">Simulasi Harga</span>
        </nav>

        {/* Page Header */}
        <header className="max-w-3xl flex flex-col gap-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full w-fit">
            <Calculator size={14} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Kalkulator Anggaran Mandiri
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-primary tracking-tight leading-[1.1]">
            Simulasi Harga Proyek Rumah Anda
          </h1>
          <p className="text-base sm:text-lg text-neutral-muted leading-relaxed">
            Gunakan simulator kalkulator interaktif ini untuk memperkirakan kisaran biaya pekerjaan interior, eksterior, maupun konstruksi sipil. Angka ini disusun berdasarkan basis data harga pasaran riil untuk mempermudah perencanaan budget awal Anda.
          </p>
        </header>

        {/* Price Simulator Component */}
        <section className="mt-8">
          <PriceSimulator />
        </section>
      </div>
    </main>
  );
}

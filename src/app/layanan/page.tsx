import { getServices } from "@/lib/cms";
import { serviceCategories } from "@/lib/content";
import LayananClient from "@/components/LayananClient";
import { Suspense } from "react";

export const metadata = {
  title: "Layanan Eko Suyanto Workshop | Jasa Interior & Aluminium Premium Sidareja Cilacap",
  description: "Solusi arsitektural premium untuk interior, eksterior, kusen aluminium, kitchen set, plafon, kanopi, pagar, dan home finishing di Sidareja, Cilacap, Jawa Tengah.",
};

export default async function LayananPage() {
  const allServices = await getServices();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-accent-light pt-48 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-muted">Memuat Layanan...</span>
        </div>
      </div>
    }>
      <LayananClient 
        allServices={allServices}
        serviceCategories={serviceCategories}
      />
    </Suspense>
  );
}

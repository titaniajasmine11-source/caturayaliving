import { getPortfolio } from "@/lib/cms";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata = {
  title: "Portofolio Proyek Interior & Eksterior | Eko Suyanto Workshop",
  description: "Studi kasus realisasi pengerjaan kitchen set, kusen aluminium pintu jendela, plafon PVC, kanopi tempered glass, dan gerbang pagar di Cilacap.",
};

export default async function PortofolioPage() {
  const portfolio = await getPortfolio();

  return (
    <PortfolioClient portfolio={portfolio} />
  );
}

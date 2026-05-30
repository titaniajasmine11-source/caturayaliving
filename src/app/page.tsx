import { serviceCategories } from "@/lib/content";
import { getAreas, getArticles, getFaqs, getPortfolio, getServices, getTestimonials } from "@/lib/cms";
import { site } from "@/lib/site";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Caturaya Living | Full Kontraktor Properti – Interior, Eksterior & Bangunan Sidareja",
  description: "Caturaya Living adalah kontraktor full-service di Sidareja, Cilacap. Melayani kusen kayu & aluminium, perabotan custom, kitchen set, HPL finishing, plafon, kanopi, jasa bangunan, dan renovasi total.",
  openGraph: {
    title: "Caturaya Living | Full Kontraktor Properti Sidareja",
    description: "Satu koordinator untuk semua kebutuhan properti Anda: interior, eksterior, material kayu, aluminium, HPL, dan jasa bangunan.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default async function Home() {
  const [articles, services, portfolio, areas, faqs, testimonials] = await Promise.all([
    getArticles(),
    getServices(),
    getPortfolio(),
    getAreas(),
    getFaqs(),
    getTestimonials()
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    telephone: `+${site.phonePrimary}`,
    address: site.address,
    areaServed: ["Sidareja", "Cilacap", "Tegalsari", "Cipari", "Kedungreja"],
    description: site.tagline,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Properti",
      itemListElement: serviceCategories.map(cat => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cat.label,
          description: cat.description,
        }
      }))
    }
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeClient 
        articles={articles}
        services={services}
        portfolio={portfolio}
        areas={areas}
        faqs={faqs}
        testimonials={testimonials}
      />
    </>
  );
}

import type { MetadataRoute } from "next";
import { areas, articles, portfolio, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/layanan", "/area-rumah", "/portofolio", "/simulasi-harga", "/planner", "/tentang-kami", "/kontak", "/artikel", "/operasional", "/cari"];
  const articleCategories = [...new Set(articles.map((article) => article.category.toLowerCase().replaceAll(" ", "-")))];
  const portfolioCategories = [...new Set(portfolio.map((item) => item.category.toLowerCase().replaceAll(" ", "-")))];
  const serviceAliases = ["/layanan/kitchen-set", "/layanan/pintu-aluminium", "/layanan/jendela-aluminium"];
  const areaAliases = ["/area-rumah/kitchen", "/area-rumah/ruang-makan", "/area-rumah/mushola"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/artikel/${article.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/layanan/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...serviceAliases.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...areas.map((area) => ({
      url: absoluteUrl(`/area-rumah/${area.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...areaAliases.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...portfolio.map((item) => ({
      url: absoluteUrl(`/portofolio/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articleCategories.map((category) => ({
      url: absoluteUrl(`/artikel/kategori/${category}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...portfolioCategories.map((category) => ({
      url: absoluteUrl(`/portofolio/kategori/${category}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

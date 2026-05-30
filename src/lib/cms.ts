import { areas, articles, faqs, portfolio, services, testimonials } from "@/lib/content";

type CmsItem = {
  type: string;
  title: string;
  slug: string;
  summary?: string;
  body?: unknown;
  seo_title?: string;
  seo_description?: string;
};

type Body = Record<string, unknown>;

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !apiKey) return null;
  return { supabaseUrl, apiKey };
}

async function getCmsItems(type: string) {
  const config = getSupabaseConfig();
  if (!config) return [] as CmsItem[];

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/cms_items?type=eq.${type}&status=eq.published&select=type,title,slug,summary,body,seo_title,seo_description&order=updated_at.desc`, {
      headers: {
        apikey: config.apiKey,
        authorization: `Bearer ${config.apiKey}`,
        "content-type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];
    return (await response.json()) as CmsItem[];
  } catch {
    return [];
  }
}

function bodyObject(value: unknown): Body {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Body : {};
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function articleSections(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const section = item as { heading?: unknown; body?: unknown };
    return typeof section.heading === "string" && typeof section.body === "string" ? [{ heading: section.heading, body: section.body }] : [];
  });
}

export async function getArticles() {
  const cmsArticles = await getCmsItems("article");
  const mapped = cmsArticles.map((item) => {
    const body = bodyObject(item.body);
    return {
      slug: item.slug,
      title: item.title,
      summary: item.summary ?? item.seo_description ?? "Panduan Caturaya Living.",
      category: typeof body.category === "string" ? body.category : "Artikel",
      tags: stringArray(body.tags),
      readTime: typeof body.readTime === "string" ? body.readTime : "4 menit",
      sections: articleSections(body.sections),
    };
  });

  const cmsSlugs = new Set(mapped.map((item) => item.slug));
  return [...mapped, ...articles.filter((item) => !cmsSlugs.has(item.slug))];
}

export async function getServices() {
  const cmsServices = await getCmsItems("service");
  const mapped = cmsServices.map((item) => {
    const body = bodyObject(item.body);
    return {
      slug: item.slug,
      title: item.title,
      summary: item.summary ?? item.seo_description ?? "Layanan Caturaya Living.",
      detail: typeof body.detail === "string" ? body.detail : item.summary ?? "Konsultasikan kebutuhan ukuran, bahan, dan model sesuai lokasi.",
      image: typeof body.image === "string" ? body.image : "/images/visual-3d.svg",
      benefits: stringArray(body.benefits),
      deliverables: stringArray(body.deliverables),
    };
  });

  const cmsSlugs = new Set(mapped.map((item) => item.slug));
  return [...mapped, ...services.filter((item) => !cmsSlugs.has(item.slug))];
}

export async function getPortfolio() {
  const cmsPortfolio = await getCmsItems("portfolio");
  const mapped = cmsPortfolio.map((item) => {
    const body = bodyObject(item.body);
    return {
      slug: item.slug,
      title: item.title,
      category: typeof body.category === "string" ? body.category : "Interior",
      location: typeof body.location === "string" ? body.location : "Sidareja",
      material: typeof body.material === "string" ? body.material : item.summary ?? "Material dan detail mengikuti kebutuhan proyek.",
      duration: typeof body.duration === "string" ? body.duration : "Menyesuaikan survei",
      image: typeof body.image === "string" ? body.image : "/images/visual-3d.svg",
    };
  });

  const cmsSlugs = new Set(mapped.map((item) => item.slug));
  return [...mapped, ...portfolio.filter((item) => !cmsSlugs.has(item.slug))];
}

export async function getAreas() {
  const cmsAreas = await getCmsItems("area");
  const mapped = cmsAreas.map((item) => {
    const body = bodyObject(item.body);
    return {
      slug: item.slug,
      title: item.title,
      summary: item.summary ?? item.seo_description ?? "Inspirasi area rumah Caturaya Living.",
      image: typeof body.image === "string" ? body.image : "/images/visual-2d.svg",
      recommended: stringArray(body.recommended),
    };
  });

  const cmsSlugs = new Set(mapped.map((item) => item.slug));
  return [...mapped, ...areas.filter((item) => !cmsSlugs.has(item.slug))];
}

export async function getFaqs() {
  const cmsFaqs = await getCmsItems("faq");
  const mapped = cmsFaqs.map((item) => ({
    question: item.title,
    answer: item.summary ?? (typeof bodyObject(item.body).answer === "string" ? bodyObject(item.body).answer as string : "Hubungi Caturaya Living untuk detail lebih lanjut."),
  }));

  const cmsQuestions = new Set(mapped.map((item) => item.question));
  return [...mapped, ...faqs.filter((item) => !cmsQuestions.has(item.question))];
}

export async function getTestimonials() {
  const cmsTestimonials = await getCmsItems("testimonial");
  const mapped = cmsTestimonials.map((item) => {
    const body = bodyObject(item.body);
    return {
      quote: item.summary ?? (typeof body.quote === "string" ? body.quote : "Customer puas dengan komunikasi dan hasil pengerjaan Caturaya Living."),
      name: item.title,
    };
  });

  const cmsNames = new Set(mapped.map((item) => item.name));
  return [...mapped, ...testimonials.filter((item) => !cmsNames.has(item.name))];
}

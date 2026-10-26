import { assetPath } from "../lib/assets";
import { stories } from "./site";

export const articleCategories = [
  "All Articles",
  "Company News",
  "Sustainability",
  "Community",
  "People",
  "Environmental Stewardship",
] as const;

export type ArticleCategory = (typeof articleCategories)[number];

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<ArticleCategory, "All Articles">;
  date: string;
  href: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

// Curated published stories; covers may use the site's editorial landscape imagery.
export const newsArticles: NewsArticle[] = [
  {
    id: "mining-forest-program",
    title: "Communities for Conservation: Growing a Greener Future",
    excerpt:
      "The Mining Forest Program brings communities together to restore forest areas and strengthen environmental stewardship.",
    category: "Sustainability",
    date: "2026-07-21",
    href: stories[2].href,
    image: assetPath("assets/approach-planting.png"),
    imageAlt: "Editorial image of hands planting a seedling in the soil",
  },
  {
    id: "biodiversity-assessment",
    title: "Protecting Our Natural Heritage Through Biodiversity Assessment",
    excerpt:
      "PMC and MMPRC assess local ecosystems to support conservation and guide environmental management.",
    category: "Environmental Stewardship",
    date: "2026-07-17",
    href: stories[1].href,
    image: assetPath("assets/approach-lake.png"),
    imageAlt: "Editorial landscape of a lake surrounded by forested mountains",
  },
  {
    id: "manobo-heritage",
    title: "A New Chapter for Manobo Heritage Preservation",
    excerpt:
      "A groundbreaking ceremony marks the beginning of the Manobo Heritage Learning Center in Bunawan.",
    category: "Community",
    date: "2026-06-18",
    href: "https://www.philsaga.com/news/groundbreaking-ceremony-marks-the-new-era-for-manobo-heritage-preservation",
    image: assetPath("assets/article-manobo.jpg"),
    imageAlt:
      "Community representatives and Philsaga personnel at the Manobo Heritage Learning Center groundbreaking",
    imagePosition: "center 43%",
  },
  {
    id: "fire-safety",
    title: "Strengthening Fire Safety and Emergency Preparedness",
    excerpt:
      "MMPRC employees practise emergency response through a fire drill and safety orientation.",
    category: "Company News",
    date: "2026-06-12",
    href: "https://www.philsaga.com/news/mmprc-conducts-fire-drill-in-support-of-fire-safety-compliance",
    image: assetPath("assets/article-fire-drill.jpg"),
    imageAlt:
      "Emergency responders practising a rescue during MMPRC’s fire drill",
  },
  {
    id: "cooperative-assembly",
    title: "Growing Together: The PGECC Cooperative Assembly",
    excerpt:
      "The employee cooperative holds its fifth annual general assembly.",
    category: "People",
    date: "2026-03-21",
    href: "https://www.philsaga.com/news/5th-annual-regular-general-assembly-of-pgecc-mpc",
    image: assetPath("assets/article-cooperative.jpg"),
    imageAlt: "PGECC Multipurpose Cooperative’s annual general assembly",
  },
  {
    id: "barangay-health",
    title: "Supporting Stronger Barangay Health Services",
    excerpt:
      "Medicine and medical equipment support communities in Wasian and Libuac.",
    category: "Community",
    date: "2026-03-16",
    href: "https://www.philsaga.com/news/mmprc-strengthens-barangay-health-services-with-turnover-of-medicines-and-medical-apparatus",
    image: assetPath("assets/article-health.jpg"),
    imageAlt:
      "Barangay representatives receiving medicines and medical equipment from MMPRC",
    imagePosition: "center 53%",
  },
  {
    id: "environmental-audit",
    title: "A Shared Commitment to Environmental Standards",
    excerpt:
      "The first EMS internal audit of 2026 supports environmental compliance.",
    category: "Environmental Stewardship",
    date: "2026-02-16",
    href: "https://www.philsaga.com/news/first-cycle-ems-internal-audit-2026",
    image: assetPath("assets/article-ems-audit.jpg"),
    imageAlt:
      "The team participating in the 2026 environmental management system internal audit",
  },
];

export function filterNewsArticles(category: ArticleCategory, search: string) {
  const query = search.trim().toLocaleLowerCase();

  return newsArticles.filter((article) => {
    const text =
      `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase();

    return (
      (category === "All Articles" || article.category === category) &&
      (!query || text.includes(query))
    );
  });
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

import { assetPath } from "../lib/assets";

export const reliefArticle = {
  id: "bislig-relief",
  file: "article-bislig-relief.html",
  title:
    "PMC-MMPRC Foundation, Inc. Extends Aid to 48 Household Fire Victims in Bislig City",
  excerpt:
    "Relief supplies and essential assistance help families in Bislig City begin rebuilding.",
  category: "Corporate Social Responsibility",
  date: "2026-08-18",
  author: "PMC-MMPRC Foundation, Inc.",
  location:
    "Purok 6, Maraville District, Barangay Tabon, Bislig City, Surigao del Sur",
  source:
    "https://www.philsaga.com/news/pmc-mmprc-foundation-inc-extends-aid-to-48-household-fire-victims-in-bislig-city",
  href: assetPath("article-bislig-relief.html"),
  image: assetPath("assets/article-relief-illustration.png"),
  imageAlt:
    "Editorial illustration of volunteers distributing relief packages and roofing materials to a community",
  announcement: assetPath("assets/article-bislig-relief.png"),
};

export const reliefSections = [
  { id: "supporting-families", label: "Supporting Families After the Fire" },
  { id: "help-where-it-matters", label: "Help Where It Matters" },
  { id: "assistance-provided", label: "Key Assistance Provided" },
  { id: "article-photos", label: "Relief Operation Announcement" },
  { id: "related-articles", label: "Related Articles" },
];

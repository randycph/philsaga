import { assetPath } from "../lib/assets";

export interface SitemapLink {
  label: string;
  href: string;
  children?: SitemapLink[];
}

export interface SitemapGroup {
  title: string;
  links: SitemapLink[];
}

const companySection = (section: string) => {
  return assetPath(`about.html?section=${section}#company-information`);
};

const articleCategory = (category: string) => {
  return assetPath(`articles.html?category=${encodeURIComponent(category)}`);
};

export const sitemapGroups: SitemapGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: assetPath("#home") },
      {
        label: "About Us",
        href: assetPath("about.html"),
        children: [
          { label: "Our History", href: companySection("history") },
          { label: "Our Values", href: companySection("tiger") },
          { label: "Leadership", href: companySection("pmc-board") },
        ],
      },
      { label: "Sustainability", href: assetPath("#sustainability") },
      { label: "Community", href: assetPath("#community") },
      { label: "Careers", href: assetPath("careers.html") },
      { label: "Contact", href: assetPath("contact.html") },
    ],
  },
  {
    title: "Sustainability & Community",
    links: [
      { label: "Sustainability Overview", href: assetPath("#sustainability") },
      {
        label: "Environmental Stewardship",
        href: articleCategory("Environmental Stewardship"),
      },
      {
        label: "Social Development & Management Program (SDMP)",
        href: assetPath("#sustainability"),
      },
      { label: "Community Programs", href: assetPath("#community") },
      {
        label: "Health and Wellness",
        href: "https://www.philsaga.com/the-vein/HEALTH",
      },
      {
        label: "Education",
        href: "https://www.philsaga.com/the-vein/EDUCATION",
      },
      {
        label: "Livelihood",
        href: "https://www.philsaga.com/the-vein/LIVELIHOOD",
      },
      { label: "Annual Reports", href: assetPath("annual-reports.html") },
    ],
  },
  {
    title: "News & Media",
    links: [
      { label: "News & Articles", href: assetPath("articles.html") },
      {
        label: "Photo Story: Community in Focus",
        href: assetPath("article-community-in-focus.html"),
      },
      {
        label: "Film: Solidarity Movement",
        href: assetPath("article-solidarity-movement.html"),
      },
      { label: "The Vein", href: "https://www.philsaga.com/the-vein" },
      { label: "Company News", href: articleCategory("Company News") },
      { label: "Community News", href: articleCategory("Community") },
      { label: "Sustainability", href: articleCategory("Sustainability") },
      { label: "People", href: articleCategory("People") },
      {
        label: "Environmental Stewardship",
        href: articleCategory("Environmental Stewardship"),
      },
      {
        label: "Latest Article: Bislig Relief Assistance",
        href: assetPath("article-bislig-relief.html"),
      },
    ],
  },
  {
    title: "Our Departments",
    links: [
      {
        label: "ASID",
        href: "https://www.philsaga.com/the-vein/department-11",
      },
      {
        label: "COMREL",
        href: "https://www.philsaga.com/the-vein/department-1",
      },
      {
        label: "Exploration",
        href: "https://www.philsaga.com/the-vein/department-2",
      },
      {
        label: "Human Resources",
        href: "https://www.philsaga.com/the-vein/department-5",
      },
      {
        label: "MEPEO",
        href: "https://www.philsaga.com/the-vein/department-6",
      },
      {
        label: "Mill Division",
        href: "https://www.philsaga.com/the-vein/department-3",
      },
      { label: "PMFI", href: "https://www.philsaga.com/the-vein/department-8" },
      {
        label: "Safety",
        href: "https://www.philsaga.com/the-vein/department-4",
      },
      {
        label: "Security",
        href: "https://www.philsaga.com/the-vein/department-7",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Publications — The Vein",
        href: "https://www.philsaga.com/the-vein",
      },
      { label: "Annual Reports", href: assetPath("annual-reports.html") },
      { label: "Supplier Portal", href: "https://vendor.philsaga.com" },
      { label: "ISO 14001:2015", href: companySection("iso") },
      { label: "Environmental Policy", href: companySection("policy") },
      {
        label: "Data Privacy Policy",
        href: "https://www.philsaga.com/data-privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "https://www.philsaga.com/terms-and-conditions",
      },
      { label: "Sitemap", href: assetPath("sitemap.html") },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: assetPath("contact.html") },
      { label: "Careers", href: assetPath("careers.html") },
      { label: "Hospital", href: assetPath("hospital.html") },
      { label: "Community Programs", href: assetPath("#community") },
    ],
  },
];

export function filterSitemapGroups(search: string) {
  const query = search.trim().toLocaleLowerCase();

  return sitemapGroups
    .map((group, index) => {
      const matchesGroup = group.title.toLocaleLowerCase().includes(query);
      const links = group.links.flatMap((link) => {
        if (
          !query ||
          matchesGroup ||
          link.label.toLocaleLowerCase().includes(query)
        ) {
          return [link];
        }

        const children = link.children?.filter((child) =>
          child.label.toLocaleLowerCase().includes(query),
        );

        if (children?.length) {
          return [{ ...link, children }];
        }

        return [];
      });

      return { ...group, index, links };
    })
    .filter((group) => group.links.length > 0);
}

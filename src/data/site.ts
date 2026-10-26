import { assetPath } from "../lib/assets";

export const site = {
  name: "Philsaga Mining Corporation",
  tagline: "A Socially Responsible and Environment Friendly Company",
  location: "Rosario, Agusan del Sur",
  phone: "(082) 235 0045",
  phoneHref: "tel:+63822350045",
  email: "info@philsaga.com",
  facebook: "https://facebook.com/philsagaminingcorp",
  intro:
    "Founded in 2000, Philsaga Mining Corporation (PMC) is a company dealing in the exploration and extraction of gold. The gold is then processed by its affiliate, the Mindanao Mineral Processing and Refining Corporation (MMPRC). This came about through the acquisition of properties and interest of Banahaw Mining and Development Corporation.",
  heroSubline:
    "Philsaga Mining Corporation: exploring and extracting gold in Mindanao since 2000.",
  heroLines: ["A Socially Responsible", "and Environment", "Friendly Company"],
  vision:
    "To be the leading, world class, highly sustainable mining company delivering excellent value to all stakeholders.",
  mission:
    "We are a highly-motivated team committed to growth by discovering mineral resources and operating within the highest mining industry standards, and with strict adherence to our corporate, social and environmental responsibilities.",
  valuesClosing:
    "We will succeed through Teamwork, Act with Integrity to Achieve Growth, Commit to Excellence and Operate with Responsibility.",
  sdmp: "SDMP is a five-year comprehensive plan geared towards sustained improvement in the living standards of host and neighboring communities by creating responsible, self-reliant and resource-based communities capable of developing, implementing and managing community development programs, projects, and activities in a manner consistent with the principles of sustainable development.",
  copyright:
    "Copyright © 2026 All Rights Reserved. Philsaga Mining Corporation. ",
};

export interface LinkItem {
  label: string;
  href: string;
}

export const navLinks: LinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: assetPath("about.html") },
  { label: "News & Articles", href: assetPath("articles.html") },
];

export const sustainabilityLinks: LinkItem[] = [
  { label: "The Vien", href: "https://www.philsaga.com/the-vein" },
  { label: "Annual Reports", href: assetPath("annual-reports.html") },
  { label: "Hospital Services", href: assetPath("hospital.html") },
];

export const mobileNavLinks: LinkItem[] = [
  ...navLinks,
  ...sustainabilityLinks,
  { label: "Careers", href: assetPath("careers.html") },
  { label: "Contact", href: "#contact" },
];

export const legalLinks: LinkItem[] = [
  { label: "Site Map", href: "https://www.philsaga.com/sitemap" },
  {
    label: "Terms & Conditions",
    href: "https://www.philsaga.com/terms-and-conditions",
  },
  {
    label: "Data Privacy Policy",
    href: "https://www.philsaga.com/data-privacy-policy",
  },
];

export const footerLinks: LinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: assetPath("about.html") },
  { label: "Community Programs", href: "#community" },
  { label: "Supplier Portal", href: "https://vendor.philsaga.com" },
  { label: "The Vein", href: "https://www.philsaga.com/the-vein" },
  { label: "Career", href: assetPath("careers.html") },
  legalLinks[0],
];

export const footerLegalLinks: LinkItem[] = [
  { label: "Terms of Use", href: legalLinks[1].href },
  { label: "Privacy Policy", href: legalLinks[2].href },
];

export const faqs = [
  {
    question: "Where is Philsaga Mining Corporation located?",
    answer: "PMC is based in Rosario, Agusan del Sur, Philippines.",
  },
  {
    question: "What does PMC do?",
    answer:
      "PMC explores for and extracts gold. Its affiliate, Mindanao Mineral Processing and Refining Corporation (MMPRC), processes the gold.",
  },
  {
    question: "What is the Social Development & Management Program?",
    answer:
      "SDMP is a five-year comprehensive plan supporting sustained improvement in the living standards of host and neighboring communities.",
  },
];

export const values = [
  { word: "Teamwork", meaning: "We succeed together." },
  { word: "Integrity", meaning: "We act with honesty and do what is right." },
  {
    word: "Growth",
    meaning:
      "We commit to achieving growth for our people, our communities, and our company.",
  },
  {
    word: "Excellence",
    meaning: "We hold ourselves to the highest standards.",
  },
  {
    word: "Responsibility",
    meaning: "We operate with accountability to people and planet.",
  },
];

export interface Story {
  title: string;
  category: string;
  href: string;
  image?: string;
}

export const stories: Story[] = [
  {
    title:
      "PMC-MMPRC Foundation, Inc. Extends Aid to 48 Household Fire Victims in Bislig City",
    category: "Community support",
    href: "https://www.philsaga.com/news/pmc-mmprc-foundation-inc-extends-aid-to-48-household-fire-victims-in-bislig-city",
    image: assetPath("assets/story-1.jpg"),
  },
  {
    title: "PMC and MMPRC Conduct Biodiversity Assessment",
    category: "Environmental stewardship",
    href: "https://www.philsaga.com/news/pmc-and-mmprc-conduct-biodiversity-assessment",
    image: assetPath("assets/story-2.jpg"),
  },
  {
    title:
      "Communities for Conservation: PMC and MMPRC Launch Mining Forest Program on National Arbor Day",
    category: "Growing together",
    href: "https://www.philsaga.com/news/communities-for-conservation-pmc-and-mmprc-launch-mining-forest-program-on-national-arbor-day",
    image: assetPath("assets/story-3.jpg"),
  },
];

export const programs: Story[] = [
  {
    title:
      "Provision of Medical Equipment for Barangay Health Workers in Agusan del Sur",
    category: "Health & well-being",
    href: "https://www.philsaga.com/news/provision-of-medical-equipment-a-lifeline-for-barangay-health-workers-in-agusan-del-sur",
  },
  {
    title:
      "Revitalizing Coconut Farming in Brgy. Consuelo through Public-Private Partnership",
    category: "Sustainable livelihoods",
    href: "https://www.philsaga.com/news/revitalizing-coconut-farming-in-brgy-consuelo-through-public-private-partnership",
  },
  {
    title: "Motor Parts Trading Project: Boosting the Local Economy",
    category: "Local enterprise",
    href: "https://www.philsaga.com/news/motor-parts-trading-project-boosting-the-local-economy",
  },
  {
    title: "Supporting Libertad Vendors Association",
    category: "Community partnerships",
    href: "https://www.philsaga.com/news/supporting-libertad-vendors-association",
  },
];

export interface VideoItem {
  title: string;
  duration: string;
  description: string;
  image: string;
  source: string;
  href: string;
}

export const videos: VideoItem[] = [
  {
    title: "Silver Years, Golden Legacy",
    duration: "07:00",
    description:
      "Celebrating 25 years of Philsaga Mining Corporation: a story of resilience, shared purpose, and the people and communities behind our golden legacy.",
    image: assetPath("assets/hero-poster.jpg"),
    source: "https://www.philsaga.com/storage/videos/PMC%20Silver%20Anniv.mov",
    href: "https://www.philsaga.com/video/silver-years-golden-legacy",
  },
  {
    title: "Solidarity Movement",
    duration: "06:37",
    description:
      "Employees, community figures, and officials came together at Philsaga Mining Corporation on April 3, 2023. Watch the highlights of the solidarity movement.",
    image: "https://www.philsaga.com/videos/thumbnails/solidarity.png",
    source: "https://www.philsaga.com/videos/SOLIDARITY_MOVEMENT.mp4",
    href: "https://www.philsaga.com/video/solidarity-movement",
  },
  {
    title: "PMC gives rice sacks to Farmers in Brgy Consuelo",
    duration: "01:18",
    description:
      "Through its Social Development and Management Program, PMC provided rice seeds to 177 farmers in Brgy. Consuelo during a turn-over ceremony on May 29, 2022.",
    image: "https://www.philsaga.com/videos/thumbnails/a.png",
    source: "https://www.philsaga.com/videos/Consuelo-Farm%20inputs.mp4",
    href: "https://www.philsaga.com/video/video1",
  },
  {
    title: "PMC Provides Learning Materials for San Marcos Daycare",
    duration: "01:05",
    description:
      "PMC partnered with Brgy. San Marcos through its Social Development and Management Program to provide school supplies to about 40 daycare pupils and learning materials for their center.",
    image: "https://www.philsaga.com/videos/thumbnails/b.png",
    source: "https://www.philsaga.com/videos/DCC.mp4",
    href: "https://www.philsaga.com/video/video2",
  },
];

export const copy = {
  discover: "Discover Our Story",
  communityCta: "Our Community Programs",
  aboutEyebrow: "Rooted in Mindanao. Driven by purpose.",
  aboutHeading: "Philsaga Mining Corporation",
  valuesEyebrow: "Our core values",
  valuesHeading: "The way of the tiger.",
  sdmpEyebrow: "Progress with purpose",
  sdmpHeading: "Social Development & Management Program",
  communityEyebrow: "People at the heart of progress",
  communityHeading: "Stronger communities. Shared futures.",
  archive: "Would you like to access our archived community programs?",
  videoEyebrow: "Our people. Our stories.",
  videoHeading: "A closer look at Philsaga.",
  footerHeading: "Strength from the ground up.",
};

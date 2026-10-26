export const companyLinks = [
  {
    id: "tiger",
    label: "The Way of the Tiger",
    category: "Our Values",
    title: "The Way of the Tiger",
    source: "https://www.philsaga.com/the-way-of-the-tiger",
  },
  {
    id: "history",
    label: "History",
    category: "Company History",
    title: "Tenement Background History",
    source: "https://www.philsaga.com/history",
  },
  {
    id: "iso",
    label: "ISO 14001:2015",
    category: "Environmental Standards",
    title: "PMC and MMPRC’s EMS Journey",
    source: "https://www.philsaga.com/about-us/iso-140012015",
  },
  {
    id: "policy",
    label: "Environmental Policy Statement",
    category: "Our Environmental Policy",
    title: "Environmental Policy Statement",
    source: "https://www.philsaga.com/about-us/environmental-policy-statement",
  },
  {
    id: "pmc-board",
    label: "PMC Board of Directors",
    category: "Our Leadership",
    title: "PMC Board of Directors",
    source: "https://www.philsaga.com/about-us/pmc-board-of-directors-2",
  },
  {
    id: "mmprc-board",
    label: "MMPRC Board of Directors",
    category: "Our Leadership",
    title: "MMPRC Board of Directors",
    source: "https://www.philsaga.com/about-us/mmprc-board-of-directors",
  },
  {
    id: "phsfi-board",
    label: "Board of Trustees of PHSFI",
    category: "Foundation Leadership",
    title: "Board of Trustees of PHSFI",
    source: "https://www.philsaga.com/about-us/board-of-trustees-of-phsfi-2",
  },
] as const;

export type CompanySectionId = (typeof companyLinks)[number]["id"];

export const companyHistory = [
  {
    year: "1986",
    description:
      "Central Mindanao Mining Corporation, Incorporated (CMMCI) establishes a 100-tonne-per-day cyanidation plant at Bayugan 3, Rosario, Agusan del Sur.",
  },
  {
    year: "1987",
    description:
      "On February 14, CMMCI agrees with Banahaw Mining and Development Corporation (BMDC) on arrangements covering 18 mining claims.",
  },
  {
    year: "1996",
    description:
      "A December 18 deed assigns 37 mining claims from BMDC to Base Metal Mineral Resources Corporation, including the earlier agreement.",
  },
  {
    year: "2003",
    description:
      "On February 28, Filminera Resources Corporation executes a transfer deed with Philsaga covering rights to APSA No. 000084-XIII and approved small-scale mining permits.",
  },
  {
    year: "2008",
    description:
      "On March 11, the government grants MPSA No. 262-2008-XIII to Philsaga through the Department of Environment and Natural Resources.",
  },
];

export const companyBoards = {
  "pmc-board": [
    { name: "Ronald C. Villanueva", role: "Chairman" },
    { name: "Raul C. Villanueva", role: "Director / President" },
    { name: "Ferdinand A. Cortes", role: "Director / Vice President" },
    {
      name: "Marie Glenn Cedeno-Sorila",
      role: "Director / Corporate Secretary",
    },
    { name: "Armando B. Dy", role: "Director / Treasurer" },
  ],
  "mmprc-board": [
    { name: "Paul Ryan Welker", role: "Non-Executive Chairman" },
    { name: "Raul Villanueva", role: "Director / President" },
    { name: "Marie Glenn Sorila", role: "Director / Corporate Secretary" },
    { name: "James Llorca", role: "Director" },
    { name: "Nicola Gill", role: "Director" },
  ],
  "phsfi-board": [
    { name: "Raul Villanueva", role: "Chairman" },
    { name: "Arthur Afdal", role: "Trustee / President" },
    { name: "Adelyne Costelo-Abrea", role: "Trustee / Vice President" },
    { name: "Armand Dy", role: "Trustee / Treasurer" },
    { name: "Marie Glenn Sorila", role: "Trustee / Corporate Secretary" },
  ],
};

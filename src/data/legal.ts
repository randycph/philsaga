export interface LegalDocument {
  file: string;
  title: string;
  description: string;
  introduction: string;
  source: string;
  published?: string;
  sections: Array<{
    id: string;
    title: string;
    text: string;
  }>;
}

export const legalDocuments: Record<"privacy" | "terms", LegalDocument> = {
  privacy: {
    file: "data-privacy-policy.html",
    title: "Data Privacy Policy",
    description:
      "Philsaga’s approach to personal information, privacy rights, and data protection.",
    introduction:
      "An overview of how Philsaga handles personal information and supports your privacy rights.",
    source: "https://www.philsaga.com/data-privacy-policy",
    published: "10 January 2019",
    sections: [
      {
        id: "personal-information",
        title: "Personal information",
        text: "Collected information may include contact details, identification, device identifiers, employment records, and business or financial data.",
      },
      {
        id: "collection-and-use",
        title: "Collection & use",
        text: "Information comes from transactions, recruitment, interactions, and public or commercial sources. It supports services, operations, compliance, and records. The policy describes cookies and Google Analytics.",
      },
      {
        id: "sharing-and-retention",
        title: "Sharing & retention",
        text: "Permitted recipients include affiliates, partners, providers, and authorities, including overseas recipients. Retention follows business needs and applicable requirements.",
      },
      {
        id: "data-protection",
        title: "Data protection",
        text: "Philsaga describes organizational, physical, and technical safeguards, trained employees, and protections when engaging service providers.",
      },
      {
        id: "privacy-rights",
        title: "Your privacy rights",
        text: "The policy recognizes access, correction, objection, erasure or blocking, portability, and other DPA rights. Send written requests, consent withdrawals, or record updates to info@philsaga.com.",
      },
      {
        id: "children-and-amendments",
        title: "Children & amendments",
        text: "People under 18 require a parent or guardian’s consent. Amendments apply when posted on the website.",
      },
    ],
  },
  terms: {
    file: "terms-and-conditions.html",
    title: "Terms and Conditions",
    description:
      "Philsaga’s published terms covering website use, copyright, and hyperlinks.",
    introduction:
      "An overview of the published conditions governing the Philsaga website and its content.",
    source: "https://www.philsaga.com/terms-and-conditions",
    sections: [
      {
        id: "company-and-disclaimer",
        title: "Company & disclaimer",
        text: "“Philsaga,” “we,” and “us” refer to Philsaga Mining Corporation, based in Bayugan 3, Rosario, Agusan del Sur 8504. Telephone: (082) 235-0045.",
      },
      {
        id: "copyright-and-content",
        title: "Copyright & content",
        text: "The published terms restrict unauthorized use of the company name and reproduction, distribution, alteration, or publication of protected website material. Written permission is required.",
      },
      {
        id: "links-to-this-website",
        title: "Links to this website",
        text: "The terms permit identified, noncommercial homepage links, subject to their conditions. Deep linking, framing, and similar reuse require prior authorization. Requests should identify the linking URL.",
      },
      {
        id: "external-sites-and-liability",
        title: "External sites & liability",
        text: "External links are provided for convenience. Philsaga disclaims responsibility for third-party content and describes limitations of liability for website use, errors, omissions, and resulting losses.",
      },
    ],
  },
};

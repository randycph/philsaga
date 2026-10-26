import { site } from "./site";

export const contactOffices = [
  {
    id: "davao",
    name: "Davao Corporate Office",
    shortName: "Head Office",
    city: "Davao City",
    address: "C.P. Garcia Highway, Sasa, Davao City 8000, Philippines",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Philsaga%20Mining%20Corporation%20C.P.%20Garcia%20Highway%20Sasa%20Davao%20City",
  },
  {
    id: "agusan",
    name: "Agusan Office",
    shortName: "Agusan Office",
    city: "Rosario, Agusan del Sur",
    address: "Bayugan 3, Rosario, Agusan del Sur 8504, Philippines",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Philsaga%20Mining%20Corporation%20Bayugan%203%20Rosario%20Agusan%20del%20Sur",
  },
];

export const inquiryTypes = [
  "General inquiry",
  "Community programs",
  "Partnerships",
  "Supplier inquiry",
  "Careers",
  "Media inquiry",
] as const;

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  inquiry: string;
  subject: string;
  message: string;
}

export function createContactDraft(message: ContactMessage) {
  const subject = `[${message.inquiry}] ${message.subject}`.replace(
    /[\r\n]+/g,
    " ",
  );
  const body = [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Phone: ${message.phone || "Not provided"}`,
    `Inquiry type: ${message.inquiry}`,
    "",
    message.message,
  ].join("\r\n");

  return {
    subject,
    body,
    href: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${site.email}\nSubject: ${subject}\n\n${body}`,
  };
}

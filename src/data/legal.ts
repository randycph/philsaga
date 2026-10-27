import privacyText from "./legal/privacy.txt?raw";
import termsText from "./legal/terms.txt?raw";

export type LegalBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "list"; items: string[] };

export interface LegalDocument {
  file: string;
  title: string;
  description: string;
  published?: string;
  introduction: LegalBlock[];
  sections: Array<{
    id: string;
    title: string;
    blocks: LegalBlock[];
  }>;
}

function parseLegalText(text: string) {
  const introduction: LegalBlock[] = [];
  const sections: LegalDocument["sections"] = [];
  let blocks = introduction;
  let previousWasParagraph = false;

  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      const title = line.slice(3);
      const section = {
        id: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-$/, ""),
        title,
        blocks: [] as LegalBlock[],
      };

      sections.push(section);
      blocks = section.blocks;
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "heading", text: line.slice(4) });
    } else if (line.startsWith("- ")) {
      const previous = blocks.at(-1);

      if (previous?.type === "list") {
        previous.items.push(line.slice(2));
      } else {
        blocks.push({ type: "list", items: [line.slice(2)] });
      }
    } else if (line.trim()) {
      const previous = blocks.at(-1);

      if (previousWasParagraph && previous?.type === "paragraph") {
        previous.text += `\n${line}`;
      } else {
        blocks.push({ type: "paragraph", text: line });
      }
    }

    previousWasParagraph =
      Boolean(line.trim()) && !line.startsWith("#") && !line.startsWith("- ");
  }

  return { introduction, sections };
}

export const legalDocuments: Record<"privacy" | "terms", LegalDocument> = {
  privacy: {
    file: "data-privacy-policy.html",
    title: "Data Privacy Policy",
    description:
      "Philsaga Mining Corporation’s Data Privacy Policy, including personal data collection, processing, protection, and your privacy rights.",
    published: "10 January 2019",
    ...parseLegalText(privacyText),
  },
  terms: {
    file: "terms-and-conditions.html",
    title: "Terms and Conditions",
    description:
      "Philsaga Mining Corporation’s terms and conditions covering its disclaimer, copyright, and hyperlinks.",
    ...parseLegalText(termsText),
  },
};

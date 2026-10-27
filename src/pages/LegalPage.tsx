import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Mail,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { legalDocuments, type LegalBlock } from "../data/legal";
import { assetPath } from "../lib/assets";
import "./LegalPage.css";

function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "list") {
      return (
        <ul key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "heading") {
      return <h3 key={index}>{block.text}</h3>;
    }

    return <p key={index}>{block.text}</p>;
  });
}

export function LegalPage({ documentId }: { documentId: "privacy" | "terms" }) {
  const document = legalDocuments[documentId];
  const [activeSection, setActiveSection] = useState(document.sections[0].id);
  const companion =
    legalDocuments[documentId === "privacy" ? "terms" : "privacy"];
  const Icon = documentId === "privacy" ? ShieldCheck : Scale;

  useEffect(() => {
    setActiveSection(document.sections[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-110px 0px -55% 0px" },
    );

    document.sections.forEach((section) => {
      const element = window.document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [document]);

  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <header className="legal-container legal-header">
        <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
          <a href={assetPath("#home")}>Home</a>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page">{document.title}</span>
        </nav>
        <div className="legal-header__layout">
          <div>
            <p className="legal-eyebrow">Policies & Information</p>
            <h1 id="legal-title">{document.title}</h1>
            <div className="legal-header__meta">
              <span>Philsaga Mining Corporation</span>
              {document.published && (
                <span>Published statement · {document.published}</span>
              )}
            </div>
          </div>
          <span className="legal-header__emblem" aria-hidden="true">
            <Icon strokeWidth={1.1} />
          </span>
        </div>
      </header>

      <div className="legal-container legal-layout">
        <aside className="legal-sidebar">
          <nav className="legal-contents" aria-label="On this page">
            <h2>On this page</h2>
            {document.sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={
                  activeSection === section.id ? "location" : undefined
                }
                onClick={() => {
                  setActiveSection(section.id);
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="legal-contact">
            <Mail size={21} aria-hidden="true" />
            <h2>Contact Philsaga</h2>
            <a href="mailto:info@philsaga.com">
              info@philsaga.com <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </aside>

        <div className="legal-reading">
          <div className="legal-document">
            {document.introduction.length > 0 && (
              <div className="legal-document__introduction">
                <LegalContent blocks={document.introduction} />
              </div>
            )}
            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id}>
                <span className="legal-document__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{section.title}</h2>
                  <LegalContent blocks={section.blocks} />
                </div>
              </section>
            ))}
          </div>
          <a className="legal-companion" href={assetPath(companion.file)}>
            <span>
              <small>Also read</small>
              {companion.title}
            </span>
            <ArrowRight size={21} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

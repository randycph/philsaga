import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Leaf,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  companyBoards,
  companyHistory,
  companyLinks,
  type CompanySectionId,
} from "../data/company";
import { values } from "../data/site";
import { assetPath } from "../lib/assets";

function PublishedDocument({ file, title }: { file: string; title: string }) {
  return (
    <a
      className="company-document"
      href={assetPath(`assets/${file}`)}
      target="_blank"
      rel="noreferrer"
    >
      <img src={assetPath(`assets/${file}`)} alt={title} loading="lazy" />
      <span>
        {title}
        <ExternalLink size={15} aria-hidden="true" />
      </span>
    </a>
  );
}

function CompanyContent({ id }: { id: CompanySectionId }) {
  if (id === "history") {
    return (
      <>
        <p className="company-panel__intro">
          Philsaga’s mine lies within MPSA No. 262-2008-XIII, which comprises 48
          P.D. 463 mining claims totaling 3,888 hectares. Its roots include 18
          claims initially staked by Central Mindanao Mining Corporation,
          Incorporated.
        </p>
        <ol className="company-timeline">
          {companyHistory.map((event) => (
            <li key={event.year}>
              <strong>{event.year}</strong>
              <p>{event.description}</p>
            </li>
          ))}
        </ol>
      </>
    );
  }

  if (id === "tiger") {
    return (
      <>
        <p className="company-panel__intro">
          Our vision, mission, and five TIGER values guide the way we work
          together and the responsibilities we share.
        </p>
        <div className="company-purpose-cards">
          <article>
            <h4>Our Vision</h4>
            <p>
              Lead through sustainable mining and create lasting value for our
              stakeholders.
            </p>
          </article>
          <article>
            <h4>Our Mission</h4>
            <p>
              Develop resources responsibly, operate to high industry standards,
              and fulfill our corporate, social, and environmental commitments
              as one motivated team.
            </p>
          </article>
        </div>
        <div className="company-values">
          {values.map((value) => (
            <article key={value.word}>
              <span>{value.word[0]}</span>
              <div>
                <h4>{value.word}</h4>
                <p>{value.meaning}</p>
              </div>
            </article>
          ))}
        </div>
      </>
    );
  }

  if (id === "iso") {
    return (
      <>
        <p className="company-panel__intro">
          PMC and MMPRC built an Environmental Management System around ISO
          14001 to strengthen environmental performance, resource conservation,
          and compliance.
        </p>
        <div className="company-ems-milestones">
          <article>
            <ShieldCheck aria-hidden="true" />
            <strong>2015</strong>
            <span>EMS launched on November 6</span>
          </article>
          <article>
            <Leaf aria-hidden="true" />
            <strong>2016</strong>
            <span>Initial ISO 14001:2004 certification</span>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <strong>2018</strong>
            <span>Transition to ISO 14001:2015</span>
          </article>
        </div>
        <h4 className="company-panel__subheading">Published Certificate</h4>
        <p className="company-panel__intro">
          The published certificate was issued on June 23, 2025, with an expiry
          date of June 22, 2028. Open either page to read the complete document.
        </p>
        <div className="company-documents">
          <PublishedDocument
            file="company-iso-pmc.png"
            title="ISO 14001:2015 Certificate — Page 1"
          />
          <PublishedDocument
            file="company-iso-mmprc.png"
            title="ISO 14001:2015 Certificate — Page 2"
          />
        </div>
      </>
    );
  }

  if (id === "policy") {
    return (
      <>
        <p className="company-panel__intro">
          Read the published environmental policy for PMC and MMPRC in English
          or Bisaya. Each document opens at full size.
        </p>
        <div className="company-documents">
          <PublishedDocument
            file="company-policy-en.png"
            title="Environmental Policy Statement — English"
          />
          <PublishedDocument
            file="company-policy-bisaya.png"
            title="Palisiya sa Kinaiyahan — Bisaya"
          />
        </div>
      </>
    );
  }

  const board = companyBoards[id];

  return (
    <>
      <p className="company-panel__intro">
        Leadership as published on Philsaga Mining Corporation’s official
        company pages.
      </p>
      <div className="company-leadership">
        {board.map((person) => (
          <article key={person.name}>
            <span className="company-leadership__icon">
              <Users aria-hidden="true" size={23} />
            </span>
            <div>
              <h4>{person.name}</h4>
              <p>{person.role}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function CompanyInformation() {
  const [activeIndex, setActiveIndex] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = companyLinks[activeIndex];
  const previous = companyLinks[activeIndex - 1];
  const next = companyLinks[activeIndex + 1];

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    const index = companyLinks.findIndex((link) => link.id === section);

    if (index >= 0) {
      setActiveIndex(index);
    }
  }, []);

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let target = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      target = (index + 1) % companyLinks.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      target = (index - 1 + companyLinks.length) % companyLinks.length;
    } else if (event.key === "Home") {
      target = 0;
    } else if (event.key === "End") {
      target = companyLinks.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section
      id="company-information"
      className="company-information about-page__container"
      aria-labelledby="company-information-title"
    >
      <div className="company-information__heading">
        <p className="about-page__eyebrow">Explore Our Company</p>
        <h2 id="company-information-title">
          Our Story, Standards & Leadership
        </h2>
        <p>
          Learn more about Philsaga Mining Corporation through our key
          information, policies, and governance.
        </p>
      </div>
      <div className="company-information__layout">
        <label className="company-mobile-selector">
          <span>Company information section</span>
          <select
            value={selected.id}
            onChange={(event) => {
              setActiveIndex(
                companyLinks.findIndex(
                  (link) => link.id === event.target.value,
                ),
              );
            }}
          >
            {companyLinks.map((link) => (
              <option value={link.id} key={link.id}>
                {link.label}
              </option>
            ))}
          </select>
        </label>
        <div
          className="company-quicklinks"
          role="tablist"
          aria-label="Company quick links"
          aria-orientation="vertical"
        >
          {companyLinks.map((link, index) => (
            <button
              type="button"
              key={link.id}
              id={`company-tab-${link.id}`}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`company-panel-${link.id}`}
              tabIndex={activeIndex === index ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => {
                setActiveIndex(index);
              }}
              onKeyDown={(event) => {
                navigateTabs(event, index);
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{link.label}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="company-information__panels">
          {companyLinks.map((link, index) => (
            <div
              key={link.id}
              id={`company-panel-${link.id}`}
              role="tabpanel"
              aria-labelledby={`company-tab-${link.id}`}
              tabIndex={0}
              hidden={activeIndex !== index}
              className="company-panel"
            >
              <p className="company-panel__eyebrow">
                {String(index + 1).padStart(2, "0")} / {link.category}
              </p>
              <h3>{link.title}</h3>
              <CompanyContent id={link.id} />
            </div>
          ))}
        </div>
      </div>
      <div className="company-gallery" aria-label="A closer look at Philsaga">
        <img
          src={assetPath("assets/loading-truck.png")}
          alt="Mine headframe and processing infrastructure set among forested hills"
          loading="lazy"
        />
        <img
          src={assetPath("assets/careers-team.png")}
          alt="Team members overlooking the processing plant"
          loading="lazy"
        />
        <img
          src={assetPath("assets/about-fullwidth.png")}
          alt="Worker wearing a PHILSAGA shirt overlooking operations"
          loading="lazy"
        />
      </div>
      <nav
        className="company-section-navigation"
        aria-label="Explore company sections"
      >
        {previous ? (
          <a
            href="#company-information"
            onClick={() => {
              setActiveIndex(activeIndex - 1);
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>
              <small>Previous</small>
              <strong>{previous.label}</strong>
            </span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a
            href="#company-information"
            onClick={() => {
              setActiveIndex(activeIndex + 1);
            }}
          >
            <span>
              <small>Next</small>
              <strong>Explore {next.label}</strong>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <span />
        )}
      </nav>
      <p className="company-information__source">
        Read the{" "}
        <a href={selected.source} target="_blank" rel="noreferrer">
          official {selected.label} page{" "}
          <ExternalLink size={11} aria-hidden="true" />
        </a>
        .
      </p>
    </section>
  );
}

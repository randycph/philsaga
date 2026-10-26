import { ArrowRight, ChartNoAxesCombined, Leaf, Users } from "lucide-react";
import { assetPath } from "../lib/assets";
import { CompanyInformation } from "../components/CompanyInformation";
import "./AboutPage.css";

const companyPillars = [
  {
    title: "Responsible Mining",
    description:
      "Developing resources while protecting the environment for future generations.",
    icon: Leaf,
  },
  {
    title: "Stronger Communities",
    description:
      "Supporting the growth and well-being of our host communities.",
    icon: Users,
  },
  {
    title: "Lasting Value",
    description:
      "Creating opportunities and contributing to a more progressive Philippines.",
    icon: ChartNoAxesCombined,
  },
];

export function AboutPage() {
  return (
    <div className="about-page" id="about">
      <section className="about-banner" aria-labelledby="about-title">
        <img
          className="about-banner__landscape"
          src={assetPath("assets/sdmp-forest-bg.png")}
          alt=""
        />
        <img
          className="about-banner__worker"
          src={assetPath("assets/about-fullwidth.png")}
          alt="Worker wearing a yellow reflective shirt with PHILSAGA across the back, overlooking the processing plant"
          fetchPriority="high"
        />
        <div className="about-banner__shade" aria-hidden="true" />
        <div className="about-banner__ribbon" aria-hidden="true" />
        <div className="about-page__container about-banner__content">
          <p className="about-page__eyebrow">About Us</p>
          <h1 id="about-title">
            Building
            <br />
            Better Futures
          </h1>
          <p>
            We are Philsaga Mining Corporation, a company committed to
            responsible mining, sustainable development, and lasting value for
            our people, our communities, and our environment.
          </p>
        </div>
      </section>

      <section
        className="company-overview"
        aria-labelledby="company-overview-title"
      >
        <div className="about-page__container company-overview__layout">
          <div className="company-overview__copy">
            <p className="about-page__eyebrow">Our Company</p>
            <h2 id="company-overview-title">
              A Stronger Philippines
              <br />
              Through Responsible Mining
            </h2>
            <p>
              Philsaga Mining Corporation (PMC) operates with a clear purpose —
              to develop our mineral resources responsibly while creating shared
              value for our employees, host communities, and the Philippine
              economy.
            </p>
            <p>
              We are committed to safe and sustainable operations, environmental
              stewardship, and meaningful partnerships that help build a
              brighter and more resilient future.
            </p>
            <a href="#company-information" className="about-page__button">
              Learn More About PMC <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="company-overview__art">
            <img
              src={assetPath("assets/loading-truck.png")}
              alt="Philsaga mining facilities and surrounding green hills"
            />
            <span aria-hidden="true" />
          </div>
        </div>
        <div className="about-page__container company-pillars">
          {companyPillars.map(({ title, description, icon: Icon }) => (
            <article key={title}>
              <span>
                <Icon aria-hidden="true" strokeWidth={1.7} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <CompanyInformation />

      <section
        className="company-tomorrow"
        aria-labelledby="company-tomorrow-title"
      >
        <img
          src={assetPath("assets/sdmp-forest-bg.png")}
          alt="Forested mountains and misty valleys at sunrise"
          loading="lazy"
        />
        <div className="company-tomorrow__panel" aria-hidden="true" />
        <div className="about-page__container company-tomorrow__content">
          <p className="about-page__eyebrow">A Brighter Tomorrow</p>
          <h2 id="company-tomorrow-title">Progress built on purpose.</h2>
          <p>
            Together with our people, partners, and communities, we continue to
            create sustainable opportunities for generations to come.
          </p>
          <a href="#contact" className="about-page__button">
            Get in Touch <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

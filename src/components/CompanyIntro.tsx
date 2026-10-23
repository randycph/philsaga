import { ArrowRight, HardHat, Mountain, UsersRound } from "lucide-react";
import { uiCopy } from "../data/ui";
import "./CompanyIntro.css";

const statistics = [
  { value: "2000+", label: "People Empowered", icon: UsersRound },
  { value: "25+", label: "Years of Operations", icon: HardHat },
  { value: "50M+ MT", label: "Total Resources", icon: Mountain },
];

export function CompanyIntro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="company-about">
      <div className="company-about__main">
        <div className="company-about__marker" aria-hidden="true">
          02
          <span />
        </div>
        <div className="company-about__copy">
          <p className="company-about__eyebrow">
            <span />
            About Us
          </p>
          <h2 id="about-heading">
            Rooted
            <br />
            in Progress
          </h2>
          <p className="company-about__description">
            Philsaga Mining Corporation is committed to responsible mining that
            creates lasting value for communities, the environment, and future
            generations.
          </p>
          <a className="company-about__link" href={uiCopy.httpsWwwPhilsagaComAboutUs}>
            Learn More
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="company-about__art">
          <img
            src="/assets/about-fullwidth.png"
            alt="Mining worker overlooking a processing plant and forested mountains"
            width={1448}
            height={1088}
            loading="lazy"
          />
        </div>
      </div>
      <div className="company-about__statistics">
        {statistics.map(({ value, label, icon: Icon }) => (
          <div className="company-about__stat" key={label}>
            <Icon aria-hidden="true" />
            <div>
              <p className="company-about__value">{value}</p>
              <p className="company-about__label">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

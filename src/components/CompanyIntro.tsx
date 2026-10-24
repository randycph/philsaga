import { ArrowRight, HardHat, Pickaxe, ContactRound } from "lucide-react";
import { uiCopy } from "../data/ui";
import "./CompanyIntro.css";
import { assetPath } from "./Shared";
import { useCountUp } from "../hooks/useCountUp";

const statistics = [
  { value: 2000, suffix: "+", label: "People Empowered", icon: ContactRound },
  { value: 25, suffix: "+", label: "Years of Operations", icon: HardHat },
  { value: 50, suffix: "M+ MT", label: "Total Resources", icon: Pickaxe },
];

function Statistic({
  value,
  suffix,
  label,
  icon: Icon,
}: (typeof statistics)[number]) {
  const { ref, value: animatedValue } = useCountUp(value);

  return (
    <div className="company-about__stat">
      <Icon aria-hidden="true" />
      <div>
        <p className="company-about__value">
          <span className="sr-only">{value}{suffix}</span>
          <span aria-hidden="true">
            <span
              ref={ref}
              className="inline-block"
              style={{ minWidth: `${String(value).length}ch` }}
            >
              {animatedValue}
            </span>
            {suffix}
          </span>
        </p>
        <p className="company-about__label">{label}</p>
      </div>
    </div>
  );
}

export function CompanyIntro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="company-about">
      <div className="company-about__main">
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
          <a className="section-text-cta company-about__link">
            Learn More
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="company-about__art">
          <img
            src={assetPath("assets/about-fullwidth.png")}
            alt="Mining worker overlooking a processing plant and forested mountains"
            width={1448}
            height={1088}
            loading="lazy"
          />
        </div>
      </div>
      <div className="company-about__statistics">
        {statistics.map((statistic) => (
          <Statistic key={statistic.label} {...statistic} />
        ))}
      </div>
    </section>
  );
}

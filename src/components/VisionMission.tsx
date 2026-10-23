import { ArrowRight } from "lucide-react";
import "./PurposeSections.css";

export function VisionMission() {
  return (
    <>
      <section className="editorial-purpose" aria-labelledby="purpose-heading">
        <img className="editorial-purpose__photo" src="/assets/purpose-mine.png" alt="Haul truck carrying rock through a mine" loading="lazy" />
        <div className="editorial-purpose__amber" aria-hidden="true" />
        <div className="editorial-purpose__panel" aria-hidden="true" />
        <div className="editorial-marker" aria-hidden="true">
          03
          <span />
        </div>
        <div className="editorial-purpose__copy">
          <p className="editorial-eyebrow">Our Purpose</p>
          <h2 id="purpose-heading">Looking beyond<br />the horizon.</h2>
          <p className="editorial-description">
            We strive to unlock opportunities, drive inclusive growth, and build
            a more resilient tomorrow through responsible mining.
          </p>
          <a className="editorial-purpose__link" href="https://www.philsaga.com/about-us">
            <span><ArrowRight aria-hidden="true" /></span>
            Our Purpose
          </a>
        </div>
      </section>
      <section className="editorial-approach" aria-labelledby="approach-heading">
        <div className="editorial-marker" aria-hidden="true">
          04
          <span />
        </div>
        <div className="editorial-approach__copy">
          <p className="editorial-eyebrow">Our Approach</p>
          <h2 id="approach-heading">Purpose in<br />every operation.</h2>
          <p className="editorial-description">
            Our work goes beyond mining. We aim to create positive and lasting
            impact by supporting local communities, protecting the environment,
            and building shared opportunities.
          </p>
          <a className="editorial-approach__link" href="https://www.philsaga.com/about-us">
            Learn More
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="editorial-approach__art">
          <img className="editorial-approach__planting" src="/assets/approach-planting.png" alt="Gloved worker planting a seedling" loading="lazy" />
          <img className="editorial-approach__seedling" src="/assets/approach-seedling.png" alt="Young plant taking root in rocky soil" loading="lazy" />
          <img className="editorial-approach__mountains" src="/assets/approach-mountains.png" alt="Forested mountains and mist-filled valleys" loading="lazy" />
        </div>
      </section>
    </>
  );
}

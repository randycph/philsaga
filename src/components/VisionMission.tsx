import { ArrowRight } from "lucide-react";
import "./PurposeSections.css";

export function VisionMission() {
  return (
    <>
      <section className="editorial-purpose" aria-labelledby="purpose-heading">
        <img className="editorial-purpose__photo" src="/assets/purpose-mine.png" alt="Haul truck carrying rock through a mine" loading="lazy" />
        <div className="editorial-purpose__amber" aria-hidden="true" />
        <div className="editorial-purpose__panel" aria-hidden="true" />
        <div className="editorial-purpose__copy">
          <p className="editorial-eyebrow">Our Vision</p>
          <h2 id="purpose-heading">Looking beyond<br />the horizon.</h2>
          <p className="editorial-description">
           To be the leading, world class, highly sustainable mining company delivering excellent value to all stakeholders.
          </p>
          <a className="section-text-cta editorial-approach__link editorial-purpose__link !text-white" >
            Our Purpose
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <section id="mission" className="editorial-approach" aria-labelledby="approach-heading">
        <div className="editorial-approach__copy">
          <p className="editorial-eyebrow">Our Mission</p>
          <h2 id="approach-heading">Purpose in<br />every operation.</h2>
          <p className="editorial-description">
            We are a highly-motivated team committed to growth by discovering mineral resources and operating within the highest mining industry standards, and with strict adherence to our corporate, social and environmental responsibilities.
          </p>
          <a className="section-text-cta editorial-approach__link">
            Learn More
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="editorial-approach__art">
          <img className="editorial-approach__worker" src="/assets/mission-worker.png" alt="Worker tending rocky soil" loading="lazy" />
          <img className="editorial-approach__lake" src="/assets/mission-lake.png" alt="Forested lake surrounded by tropical mountains" loading="lazy" />
          <span className="editorial-approach__accent" aria-hidden="true" />
          <span className="editorial-approach__accent editorial-approach__accent--green" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}

import { ChartNoAxesCombined, Leaf, Shield, UsersRound, ArrowRight } from "lucide-react";
import "./PurposeSections.css";

const cards = [
  { title: "Teamwork", description: "We achieve more together.", icon: UsersRound },
  { title: "Integrity", description: "We do what is right, always.", icon: Shield },
  { title: "Growth", description: "We grow our people, our communities, and our company.", icon: ArrowRight },
  { title: "Excellence", description: "We pursue continuous improvement.", icon: ChartNoAxesCombined },
  { title: "Responsibility", description: "We care for people, communities and the environment.", icon: Leaf },
];

export function TigerValues() {
  return (
    <section id="values" className="editorial-values" aria-labelledby="values-heading">
      <div className="editorial-marker" aria-hidden="true">
        05
        <span />
      </div>
      <div className="editorial-values__heading">
        <div>
          <p className="editorial-eyebrow">Our Values</p>
          <h2 id="values-heading">The way of the tiger.</h2>
        </div>
        <p>
          These values guide our decisions, our actions, and our commitment to a
          better tomorrow.
        </p>
      </div>
      <div className="editorial-values__cards">
        {cards.map(({ title, description, icon: Icon }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

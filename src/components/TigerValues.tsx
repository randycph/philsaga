import { ChartNoAxesCombined, Trees, ShieldCheck, UsersRound, TrendingUp, Award } from "lucide-react";
import "./PurposeSections.css";

const cards = [
  { title: "Teamwork", description: "We achieve more together.", icon: UsersRound },
  { title: "Integrity", description: "We do what is right, always.", icon: ShieldCheck },
  { title: "Growth", description: "We grow our people, our communities, and our company.", icon: TrendingUp },
  { title: "Excellence", description: "We pursue continuous improvement.", icon: Award },
  { title: "Responsibility", description: "We care for people, communities and the environment.", icon: Trees },
];

export function TigerValues() {
  return (
    <section id="values" className="editorial-values" aria-labelledby="values-heading">
      <div className="editorial-values__heading">
        <div>
          <p className="editorial-eyebrow">Our Values</p>
          <h2 id="values-heading">The way of the <em className="text-[#f6931c]">Tiger.</em></h2>
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
            <h3>
              <span className="text-[#f6931c]">{title.charAt(0)}</span>
              {title.slice(1)}
            </h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

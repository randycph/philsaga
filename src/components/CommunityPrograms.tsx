import { HandCoins, HeartPulse, Sprout, Handshake } from "lucide-react";
import "./CommunityMedia.css";

const priorities = [
  { title: "Community Development", description: "Supporting programs that improve quality of life.", icon: Handshake },
  { title: "Health and Wellness", description: "Promoting healthier and safer communities.", icon: HeartPulse },
  { title: "Environment Protection", description: "Responsible resource management for a greener tomorrow.", icon: Sprout },
  { title: "Livelihood Support", description: "Empowering local economies through skills and opportunities.", icon: HandCoins },
];

export function CommunityPrograms() {
  return (
    <section id="community" aria-labelledby="community-heading" className="community-strip">
      <div className="community-strip__copy">
        <p className="editorial-eyebrow">Community Impact</p>
        <h2 id="community-heading">Stronger communities.<br />Shared futures.</h2>
        <p>
          We work hand in hand with our host communities to create opportunities,
          strengthen resilience, and build a better tomorrow.
        </p>
      </div>
      <div className="community-strip__priorities">
        {priorities.map(({ title, description, icon: Icon }) => (
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

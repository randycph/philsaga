import { uiCopy } from "../data/ui";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, site, values } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cn } from "../lib/utils";
import { container, Eyebrow, heading, Reveal } from "./Shared";

gsap.registerPlugin(ScrollTrigger);

export function TigerValues() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        onUpdate: (self) => {
          setActive(
            Math.min(
              Math.floor(self.progress * values.length),
              values.length - 1,
            ),
          );
        },
      });
    });

    return () => {
      media.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      id="values"
      aria-labelledby="values-heading"
      className="border-y border-white/10 bg-surface py-24 lg:flex lg:min-h-dvh lg:items-center lg:py-32"
    >
      <div className={container}>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{copy.valuesEyebrow}</Eyebrow>
            <h2 id="values-heading" className={heading}>
              {copy.valuesHeading}
            </h2>
          </div>
          <p className="max-w-xs text-base leading-[1.7] text-muted-foreground">
            {uiCopy.fiveValuesOneSharedCommitmentToThePeople}
          </p>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal className="relative overflow-hidden rounded-2xl bg-paper p-6 md:p-10">
            {/* TODO: Replace pic5.png with a transparent, high-resolution tiger cutout. */}
            <img
              src="/assets/pic5.png"
              alt={
                uiCopy.tigerRepresentingTeamworkIntegrityGrowthExcellenceAndResponsibility
              }
              width={731}
              height={510}
              loading="lazy"
              className="aspect-[731/510] w-full rounded-lg object-contain"
            />
            <p className="mt-6 border-t border-black/10 pt-5 text-sm font-medium text-background/70">
              {uiCopy.theStrengthBehindEverythingWeDo}
            </p>
          </Reveal>
          <div className="relative">
            <div className={cn("hidden", !reducedMotion && "lg:block")}>
              <div
                className="mb-8 flex gap-2"
                aria-label={`Value ${active + 1} of 5: ${values[active].word}`}
              >
                {values.map((value, index) => (
                  <span
                    key={value.word}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      index === active ? "w-16 bg-primary" : "w-8 bg-white/15",
                    )}
                  />
                ))}
              </div>
              <div aria-live="polite" className="min-h-56">
                <p className="mb-5 font-heading text-sm text-muted-foreground">
                  {uiCopy.label0}
                  {active + 1}
                  {uiCopy.label05}
                </p>
                <h3 className="font-heading text-[clamp(32px,3.5vw,56px)] font-semibold tracking-tight">
                  <span className="text-7xl text-tiger">
                    {values[active].word[0]}
                  </span>
                  {values[active].word.slice(1)}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-[1.7] text-muted-foreground">
                  {values[active].meaning}
                </p>
              </div>
            </div>
            <div className={cn("space-y-8", !reducedMotion && "lg:hidden")}>
              {values.map((value) => (
                <Reveal
                  key={value.word}
                  className="border-b border-white/10 pb-6"
                >
                  <h3 className="font-heading text-3xl font-semibold tracking-tight">
                    <span className="text-tiger">{value.word[0]}</span>
                    {value.word.slice(1)}
                  </h3>
                  <p className="mt-3 leading-[1.7] text-muted-foreground">
                    {value.meaning}
                  </p>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-[1.8] text-muted-foreground">
              {site.valuesClosing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { uiCopy } from "../data/ui";
import { ArrowUpRight } from "lucide-react";
import { copy, site } from "../data/site";
import { useCountUp } from "../hooks/useCountUp";
import { container, Eyebrow, heading, Reveal } from "./Shared";
import { Button } from "./ui/button";

export function CompanyIntro() {
  const founded = useCountUp(2000);
  const years = useCountUp(25);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-28 py-24 lg:py-32"
    >
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <img
              src="/assets/E15.png"
              alt={uiCopy.philsagaMineHeadframeInRosarioAgusanDelSur}
              width={1575}
              height={1280}
              loading="lazy"
              className="aspect-[5/5.2] w-full rounded-2xl object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/20 bg-background/80 px-5 py-4 backdrop-blur-md">
              <span className="text-sm">{uiCopy.rosarioAgusanDelSur}</span>
              <span className="size-2 rounded-full bg-primary" />
            </div>
          </Reveal>
          <Reveal>
            <Eyebrow>{copy.aboutEyebrow}</Eyebrow>
            <h2 id="about-heading" className={heading}>
              {copy.aboutHeading}
            </h2>
            <p className="mt-7 text-base leading-[1.85] text-muted-foreground md:text-lg">
              {site.intro}
            </p>
            <Button asChild className="mt-8">
              <a href={uiCopy.httpsWwwPhilsagaComAboutUs}>
                {uiCopy.learnMore2}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
        </div>
        <Reveal className="mt-16 grid gap-8 border-y border-white/10 py-10 sm:grid-cols-3 md:mt-20 md:py-12">
          <div className="sm:border-r sm:border-white/10">
            <p className="font-heading text-5xl font-semibold tracking-tight text-primary">
              <span ref={founded.ref}>{founded.value}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {uiCopy.foundedInMindanao}
            </p>
          </div>
          <div className="sm:border-r sm:border-white/10 sm:pl-6">
            <p className="font-heading text-5xl font-semibold tracking-tight text-primary">
              <span ref={years.ref}>{years.value}</span>
              {uiCopy.label}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {uiCopy.yearsOfOperation}
            </p>
          </div>
          <div className="sm:pl-6">
            <p className="font-heading text-4xl font-semibold tracking-tight text-primary">
              {uiCopy.iso}
              <span className="text-xl md:text-2xl xl:text-3xl">
                {uiCopy.label140012015}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {uiCopy.certifiedEnvironmentalManagement}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

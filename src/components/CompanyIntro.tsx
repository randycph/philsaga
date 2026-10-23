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
      className="scroll-mt-28 px-4 py-4 md:px-8 md:py-6"
    >
      <div className="mx-auto max-w-[1440px] overflow-hidden border border-black/10 shadow-sm">
        <div className="relative isolate grid min-h-[520px] items-stretch overflow-hidden bg-[#f4f2ed] md:min-h-[540px] lg:min-h-[560px] lg:grid-cols-[0.8fr_1.2fr]">
          <img src="/assets/about-fullwidth.png" alt="" aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-right md:w-1/2" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-3 bg-[#18321f]/80" />
          <span aria-hidden="true" className="absolute left-5 top-12 z-10 hidden font-heading text-sm font-semibold tracking-wide text-foreground/70 md:block lg:left-8">02<span className="mx-auto mt-3 block h-12 w-px bg-foreground/30" /></span>
          <Reveal className="flex flex-col justify-center bg-[#f4f2ed] px-10 py-16 md:px-20 md:pl-32 lg:pl-36" parallax>
            <Eyebrow>{copy.aboutEyebrow}</Eyebrow>
            <h2 id="about-heading" className={heading}>
              Rooted
              <br />
              in Progress
            </h2>
            <p className="mt-7 max-w-lg text-base leading-[1.75] text-muted-foreground md:text-lg">
              Philsaga Mining Corporation is committed to responsible mining that creates lasting value for communities, the environment, and future generations.
            </p>
            <Button asChild variant="ghost" className="mt-8 w-fit border-b border-primary/40 px-0 text-primary">
              <a href={uiCopy.httpsWwwPhilsagaComAboutUs}>
                {uiCopy.learnMore2}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
          <div className="min-h-[260px] lg:min-h-full" aria-hidden="true" />
        </div>
        <Reveal className="mt-16 grid gap-8 border-y border-black/10 py-10 sm:grid-cols-3 md:mt-20 md:py-12">
          <div className="sm:border-r sm:border-black/10">
            <p className="font-heading text-7xl font-semibold tracking-tight text-primary">
              <span ref={founded.ref}>{founded.value}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {uiCopy.foundedInMindanao}
            </p>
          </div>
          <div className="sm:border-r sm:border-black/10 sm:pl-6">
            <p className="font-heading text-7xl font-semibold tracking-tight text-primary">
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

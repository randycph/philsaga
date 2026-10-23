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
      className="scroll-mt-28 py-12 lg:py-16"
    >
      <div className={container}>
        <div className="grid items-stretch overflow-hidden bg-[#f4f2ed] lg:min-h-[500px] lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col justify-center px-8 py-12 md:px-14 lg:px-16" parallax>
            <Eyebrow>{copy.aboutEyebrow}</Eyebrow>
            <h2 id="about-heading" className={heading}>
              Rooted
              <br />
              in Progress
            </h2>
            <p className="mt-7 max-w-lg text-base leading-[1.75] text-muted-foreground md:text-lg">
              {site.intro}
            </p>
            <Button asChild variant="ghost" className="mt-8 w-fit px-0 text-primary">
              <a href={uiCopy.httpsWwwPhilsagaComAboutUs}>
                {uiCopy.learnMore2}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden bg-[#15291d] lg:min-h-full" parallax>
            <img
              src="/assets/about-mining.png"
              alt={uiCopy.philsagaMiningOperationsInMindanao}
              width={1448}
              height={1088}
              loading="lazy"
              className="absolute inset-0 size-full object-cover grayscale"
            />
            <img
              src="/assets/about-mining.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover [clip-path:polygon(57%_0,79%_0,59%_100%,37%_100%)]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[#f28c18] [clip-path:polygon(67%_0,70%_0,50%_100%,47%_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[#073c27]/90 [clip-path:polygon(73%_0,84%_0,64%_100%,53%_100%)]" />
            <img
              src="/assets/about-worker.png"
              alt="Mining worker wearing a hard hat and high visibility jacket"
              width={1280}
              height={1280}
              className="absolute bottom-[-12%] right-[-5%] z-10 w-[68%] max-w-[650px]"
            />
          </Reveal>
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

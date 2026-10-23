import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { uiCopy } from "../data/ui";
import { copy, stories } from "../data/site";
import {
  Carousel,
  CarouselItem,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./Shared";

export function Sdmp() {
  return (
    <section
      id="sustainability"
      aria-labelledby="sdmp-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#102d23] py-20 text-[#faf7f1] sm:py-24 lg:py-28"
      style={{
        backgroundImage: "url('/assets/sdmp-forest-bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061b18]/95 via-[#09251f]/80 to-[#09251f]/55"
      />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:px-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12 lg:px-16 xl:px-20">
        <div className="max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] text-[#f3a23a]">
            <span className="h-px w-7 bg-[#f3a23a]" />
            {copy.sdmpEyebrow}
          </p>
          <h2
            id="sdmp-heading"
            className="max-w-[20ch] font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[clamp(2.25rem,2.3vw,2.625rem)]"
          >
            {copy.sdmpHeading}
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[#f4f1e8]/85 sm:text-base">
            We invest in programs that support host communities, strengthen
            livelihoods, and promote environmental stewardship.
          </p>
          <a
            href="#community"
            className="mt-7 inline-flex min-h-12 items-center gap-4 rounded-full border border-[#d5ddcf]/60 bg-[#1f5130]/90 px-6 text-sm font-semibold text-[#faf7f1] transition-colors hover:bg-[#2b6540] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3a23a]"
          >
            Our Community Programs
            <ArrowRight className="size-4" />
          </a>
          <a
            href={uiCopy.httpsWwwPhilsagaComAnnualReports}
            className="mt-5 flex w-fit items-center gap-3 text-sm text-[#f4f1e8]/75 transition-colors hover:text-white"
          >
            <FileText className="size-4 text-[#f3a23a]" strokeWidth={1.6} />
            {uiCopy.sdmpAnnualAccomplishmentReport}
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="min-w-0 lg:pl-2">
          <Carousel label={uiCopy.socialDevelopmentAndManagementProgramStories}>
            {stories.map((story) => (
              <CarouselItem key={story.title}>
                <Card className="group flex h-full min-h-[330px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#08231f]/95 text-[#faf7f1] shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
                  <a href={story.href} aria-label={story.title}>
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </a>
                  <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-5">
                    <p className="mb-3 text-xs font-semibold tracking-wide text-[#f3a23a]">
                      {story.category}
                    </p>
                    <h3 className="line-clamp-3 font-heading text-lg font-medium leading-snug tracking-tight text-white">
                      <a href={story.href} className="hover:text-[#f6c57f]">
                        {story.title}
                      </a>
                    </h3>
                    <a
                      href={story.href}
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#f4f1e8]/90 hover:text-white"
                    >
                      {uiCopy.readTheStory}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

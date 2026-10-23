import { uiCopy } from "../data/ui";
import { ArrowUpRight, FileText } from "lucide-react";
import { copy, site, stories } from "../data/site";
import {
  container,
  Eyebrow,
  heading,
  ImageWithFallback,
  Reveal,
  TextLink,
} from "./Shared";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselItem } from "./ui/carousel";
import { Button } from "./ui/button";

export function Sdmp() {
  return (
    <section
      id="sustainability"
      aria-labelledby="sdmp-heading"
      className="scroll-mt-28 py-24 lg:py-32"
    >
      <div className={container}>
        <Reveal className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>{copy.sdmpEyebrow}</Eyebrow>
            <h2 id="sdmp-heading" className={heading}>
              {copy.sdmpHeading}
            </h2>
          </div>
          <p className="self-end text-base leading-[1.85] text-muted-foreground">
            {site.sdmp}
          </p>
        </Reveal>
        <Reveal>
          <Carousel label={uiCopy.socialDevelopmentAndManagementProgramStories}>
            {stories.map((story) => (
              <CarouselItem key={story.title}>
                <Card className="group flex h-full flex-col">
                  <a
                    href={story.href}
                    aria-label={story.title}
                    className="overflow-hidden"
                  >
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="mb-4 text-sm text-primary">
                      {story.category}
                    </p>
                    <h3 className="mb-6 font-heading text-xl font-medium leading-snug tracking-tight">
                      <a href={story.href} className="hover:text-primary">
                        {story.title}
                      </a>
                    </h3>
                    <div className="mt-auto">
                      <TextLink href={story.href}>
                        {uiCopy.readTheStory}
                      </TextLink>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </Carousel>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-7 rounded-2xl border border-primary/20 bg-forest/20 p-7 md:p-10">
          <div className="flex items-center gap-5">
            <FileText
              className="hidden size-10 text-primary sm:block"
              strokeWidth={1.3}
            />
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {uiCopy.accountabilityInAction}
              </p>
              <h3 className="font-heading text-xl font-medium md:text-2xl">
                {uiCopy.sdmpAnnualAccomplishmentReport}
              </h3>
            </div>
          </div>
          <Button asChild>
            <a href={uiCopy.httpsWwwPhilsagaComAnnualReports}>
              {uiCopy.viewReport}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

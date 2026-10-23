import { uiCopy } from "../data/ui";
import { ArrowRight } from "lucide-react";
import { copy, programs } from "../data/site";
import {
  container,
  Eyebrow,
  heading,
  ImageWithFallback,
  Reveal,
  TextLink,
} from "./Shared";
import { Card, CardContent } from "./ui/card";

export function CommunityPrograms() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="scroll-mt-28 border-t border-white/10 bg-surface py-24 lg:py-32"
    >
      <div className={container}>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{copy.communityEyebrow}</Eyebrow>
            <h2 id="community-heading" className={`${heading} max-w-3xl`}>
              {copy.communityHeading}
            </h2>
          </div>
          <p className="max-w-xs text-base leading-[1.7] text-muted-foreground">
            {uiCopy.ourFeaturedCommunityPrograms}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <Reveal key={program.title} className="h-full">
              <Card className="flex h-full flex-col bg-background">
                <a href={program.href} aria-label={program.title}>
                  <ImageWithFallback src={program.image} alt={program.title} />
                </a>
                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-4 text-sm text-primary">
                    {program.category}
                  </p>
                  <h3 className="mb-6 font-heading text-lg font-medium leading-relaxed tracking-tight">
                    {program.title}
                  </h3>
                  <div className="mt-auto">
                    <TextLink href={program.href}>{uiCopy.learnMore}</TextLink>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-5 border-y border-white/10 py-8">
          <p className="text-base text-muted-foreground">{copy.archive}</p>
          <a
            href={uiCopy.httpsWwwPhilsagaComNews}
            className="flex items-center gap-3 text-sm font-semibold text-primary hover:underline"
          >
            {uiCopy.goToArchivePage}
            <ArrowRight className="size-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

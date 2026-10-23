import { uiCopy } from "../data/ui";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Leaf } from "lucide-react";
import { copy, site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { container } from "./Shared";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useLayoutEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      setDesktop(query.matches);
    };

    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (!desktop || reducedMotion || !video.current) {
      return;
    }

    const media = video.current;
    let context: gsap.Context | undefined;
    let slowSeeks = 0;
    let seekStarted = 0;
    let looping = false;
    const onSeeked = () => {
      if (seekStarted && performance.now() - seekStarted > 220) {
        slowSeeks += 1;
      }

      if (slowSeeks >= 5 && !looping) {
        looping = true;
        media.loop = true;
        media.playbackRate = 0.7;
        void media.play().catch(() => {});
      }
    };

    const setup = () => {
      if (!Number.isFinite(media.duration) || context) {
        return;
      }

      context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => {
              if (!looping && !media.seeking) {
                seekStarted = performance.now();
                media.currentTime = Math.min(
                  self.progress * media.duration,
                  media.duration - 0.05,
                );
              }
            },
          },
        });

        timeline.fromTo(
          "[data-hero-line]",
          { opacity: 0.92, y: 18 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.4 },
          0,
        );
        timeline.to(
          "[data-scroll-indicator]",
          { opacity: 0, duration: 0.1 },
          0,
        );
      }, root);

      // The video can load after the tiger trigger; calculate the upstream pin first.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    media.addEventListener("loadedmetadata", setup);
    media.addEventListener("seeked", onSeeked);
    setup();

    return () => {
      media.removeEventListener("loadedmetadata", setup);
      media.removeEventListener("seeked", onSeeked);
      media.pause();
      context?.revert();
    };
  }, [desktop, reducedMotion]);

  return (
    <section
      ref={root}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[850px] flex-col justify-end overflow-hidden bg-background pb-10 pt-40 lg:h-dvh lg:min-h-[780px]"
    >
      <img
        src="/assets/hero-poster.jpg"
        alt={uiCopy.philsagaMiningOperationsInMindanao}
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      {desktop && !reducedMotion && (
        <video
          ref={video}
          muted
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/assets/intro3.webm" type="video/webm" />
          <source src="/assets/intro3.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/65 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      <div className={cnHeroContainer}>
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/35 bg-background/35 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
          <Leaf className="size-4" />
          {uiCopy.responsibleMiningLastingImpact}
        </div>
        <h1
          id="hero-heading"
          className="max-w-[1100px] font-heading text-[clamp(40px,min(5.55vw,9vh),96px)] font-semibold leading-[1.12] tracking-[-0.055em]"
        >
          {site.heroLines.map((line, index) => (
            <span
              key={line}
              data-hero-line
              className={index === 2 ? "block text-primary" : "block"}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-[1.7] text-white/75 md:text-lg">
          {site.heroSubline}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild>
            <a href={uiCopy.about}>
              {copy.discover}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={uiCopy.community}>
              {copy.communityCta}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
        <div className="mt-16 flex items-end justify-between border-t border-white/15 pt-6">
          <a
            href={uiCopy.about}
            data-scroll-indicator
            className="flex items-center gap-3 text-sm text-white/70"
          >
            <ArrowDown className="size-4 text-primary" />
            {uiCopy.scrollToDiscover}
          </a>
          <p className="hidden text-right text-sm leading-relaxed text-white/65 sm:block">
            {uiCopy.rootedInMindanao}
            <br />
            {uiCopy.committedToABetterTomorrow}
          </p>
        </div>
      </div>
    </section>
  );
}

const cnHeroContainer = `${container} relative z-10 mt-10`;

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const media = video.current;
    const queries = gsap.matchMedia();

    if (!media) {
      return;
    }

    const setup = () => {
      queries.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const playhead = { time: 0 };
          let desiredTime = 0;
          const seek = () => {
            if (
              !media.seeking &&
              Math.abs(media.currentTime - desiredTime) > 0.04
            ) {
              media.currentTime = desiredTime;
            }
          };

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=180%",
              pin: true,
              scrub: 0.6,
              refreshPriority: 2,
            },
          });

          timeline.to(
            playhead,
            {
              time: Math.max(0, media.duration - 0.05),
              ease: "none",
              duration: 1,
              onUpdate: () => {
                desiredTime = playhead.time;
                seek();
              },
            },
            0,
          );
          timeline.fromTo(
            media,
            { scale: 1.12 },
            { scale: 1, duration: 1, ease: "none" },
            0,
          );
          timeline.fromTo(
            "[data-film-progress]",
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "none" },
            0,
          );
          timeline.to(
            "[data-film-opening]",
            { opacity: 0, duration: 0.18 },
            0.22,
          );
          timeline.fromTo(
            "[data-film-headframe]",
            { opacity: 0 },
            { opacity: 1, duration: 0.18 },
            0.22,
          );
          timeline.to(
            "[data-film-headframe]",
            { opacity: 0, duration: 0.2 },
            0.65,
          );
          timeline.fromTo(
            "[data-film-photo]",
            { scale: 1.08 },
            { scale: 1, duration: 1, ease: "none" },
            0,
          );
          media.addEventListener("seeked", seek);
          ScrollTrigger.sort();
          ScrollTrigger.refresh();

          return () => {
            media.removeEventListener("seeked", seek);
          };
        },
      );
    };

    if (media.readyState >= 1) {
      setup();
    } else {
      media.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      media.removeEventListener("loadedmetadata", setup);
      queries.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      aria-label={site.name}
      className="relative h-[82svh] min-h-[480px] overflow-hidden bg-paper md:h-svh"
    >
      <h1 className="sr-only">{site.name}</h1>
      <img
        src="/assets/hero-poster.jpg"
        alt="PMC introduction film"
        width={640}
        height={360}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={video}
        muted
        playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 hidden size-full object-cover md:block motion-reduce:hidden"
      >
        <source src="/assets/intro3.mp4" type="video/mp4" />
        <source src="/assets/intro3.webm" type="video/webm" />
      </video>
      <img
        data-film-photo
        data-film-headframe
        src="/assets/E15.png"
        alt=""
        width={1575}
        height={1280}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-0"
      />
      <img
        data-film-photo
        data-film-opening
        src="/assets/pic4.png"
        alt="Philsaga miners at work underground"
        width={852}
        height={608}
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/10">
        <div data-film-progress className="h-full origin-left bg-primary" />
      </div>
    </section>
  );
}

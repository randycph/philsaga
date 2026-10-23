import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const media = video.current;
    const trackElement = track.current;
    const hintElement = hint.current;

    if (!media || !trackElement || !hintElement || reducedMotion) {
      return;
    }

    let trigger: ScrollTrigger | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let frameRequest = 0;
    let desiredTime = 0;
    let lastSeekAt = 0;

    const seekToDesiredTime = () => {
      if (media.seeking) {
        return;
      }

      const now = performance.now();

      if (now - lastSeekAt < 40) {
        cancelAnimationFrame(frameRequest);
        frameRequest = requestAnimationFrame(seekToDesiredTime);
        return;
      }

      if (Math.abs(media.currentTime - desiredTime) < 0.035) {
        return;
      }

      lastSeekAt = now;
      media.currentTime = desiredTime;
    };

    const onSeeked = () => {
      if (Math.abs(media.currentTime - desiredTime) >= 0.035) {
        cancelAnimationFrame(frameRequest);
        frameRequest = requestAnimationFrame(seekToDesiredTime);
      }
    };

    const createScrollTrigger = () => {
      if (trigger || !Number.isFinite(media.duration) || media.duration <= 0) {
        return;
      }

      const playhead = { time: 0 };
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: seekToDesiredTime,
        },
      });

      timeline.to(playhead, {
        time: media.duration,
        duration: 1,
        ease: "none",
        onUpdate: () => {
          desiredTime = playhead.time;
        },
      });
      timeline.to(hintElement, { opacity: 0, duration: 0.05 }, 0);
      trigger = timeline.scrollTrigger;
      media.addEventListener("seeked", onSeeked);
      ScrollTrigger.refresh();
    };

    if (media.readyState >= HTMLMediaElement.HAVE_METADATA) {
      createScrollTrigger();
    } else {
      media.addEventListener("loadedmetadata", createScrollTrigger, {
        once: true,
      });
    }

    return () => {
      media.removeEventListener("loadedmetadata", createScrollTrigger);
      media.removeEventListener("seeked", onSeeked);
      cancelAnimationFrame(frameRequest);
      trigger?.kill();
      timeline?.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={track} className="relative h-[300vh]" aria-label={site.name}>
      <section
        id="hero"
        className="sticky top-0 h-svh min-h-[480px] w-full overflow-hidden bg-stone-950"
      >
        <h1 className="sr-only">{site.name}</h1>
        <video
          ref={video}
          muted
          playsInline
          onLoadedMetadata={() => {
            if (video.current && video.current.duration > 2) {
              video.current.currentTime = 2;
            }
          }}
          preload={reducedMotion ? "none" : "auto"}
          poster="/assets/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 size-full origin-top scale-[1.12] object-cover object-top"
        >
          {!reducedMotion && (
            <>
              <source src="/assets/intro3.mp4" type="video/mp4" />
              <source src="/assets/intro3.webm" type="video/webm" />
            </>
          )}
        </video>
        {!reducedMotion && (
          <span
            ref={hint}
            className="pointer-events-none absolute inset-x-0 bottom-7 text-center font-sans text-[10px] tracking-[0.2em] text-white/80"
          >
            Scroll
          </span>
        )}
      </section>
    </div>
  );
}

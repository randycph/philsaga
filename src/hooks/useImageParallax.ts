import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useImageParallax() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        document
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((frame) => {
            const image = frame.querySelector("img");

            if (!image) {
              return;
            }

            gsap.fromTo(
              image,
              { yPercent: -6, scale: 1.18 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          });
      },
    );

    return () => {
      media.revert();
    };
  }, []);
}

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealGroups = [
  "main > aside > .page-container",
  ".company-about__copy",
  ".company-about__statistics",
  ".editorial-purpose__copy",
  ".editorial-approach__copy",
  ".editorial-values__heading",
  ".editorial-values__cards",
  "#sustainability > .page-container > div:first-child",
  ".community-strip__copy",
  ".community-strip__priorities",
  ".community-media__copy",
  ".site-footer__main",
  ".site-footer__legal",
];

export function useEntranceAnimations() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const removeFocusListeners: Array<() => void> = [];

      gsap.fromTo(
        "header > .page-container > *",
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
      );

      gsap.fromTo(
        "#hero",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          clearProps: "opacity",
        },
      );

      revealGroups.forEach((selector) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((group) => {
          const isFooter = group.closest("footer") !== null;

          Array.from(group.children).forEach((element, index) => {
            const animation = gsap.fromTo(
              element,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                delay: Math.min(index * 0.09, 0.36),
                ease: "power3.out",
                clearProps: "opacity,transform",
                scrollTrigger: {
                  // Footer children may never reach 92% at the end of the page.
                  trigger: isFooter ? group : element,
                  start: isFooter ? "top bottom" : "top 92%",
                  once: true,
                },
              },
            );

            // Reveal focused content immediately for keyboard navigation.
            const revealOnFocus = () => {
              animation.progress(1);
              animation.scrollTrigger?.kill();
            };

            element.addEventListener("focusin", revealOnFocus);
            removeFocusListeners.push(() => {
              element.removeEventListener("focusin", revealOnFocus);
            });
          });
        });
      });

      return () => {
        removeFocusListeners.forEach((removeListener) => {
          removeListener();
        });
      };
    });

    return () => {
      media.revert();
    };
  }, []);
}

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({ duration: 1.1 });
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      const target = hash ? document.getElementById(hash.slice(1)) : null;

      if (!hash || !target) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", hash);

      // A numeric top target stays stable while ScrollTrigger adjusts its pins.
      const isHome = hash === "#home";
      const headerHeight = document.querySelector("header")?.clientHeight ?? 0;

      lenis.scrollTo(isHome ? 0 : target, {
        offset: isHome ? 0 : -headerHeight,
        immediate: isHome,
      });
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    document.addEventListener("click", navigate);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("click", navigate);
      lenis.destroy();
    };
  }, [reducedMotion]);
}

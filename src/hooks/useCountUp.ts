import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (reducedMotion || hasStarted.current || !ref.current) {
      setValue(target);
      return;
    }

    let frame = 0;
    setValue(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        hasStarted.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };

        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, reducedMotion]);

  return { ref, value };
}

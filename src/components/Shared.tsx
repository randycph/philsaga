import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Leaf } from "lucide-react";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const container = "mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20";
export const heading = "font-heading text-4xl font-semibold leading-[1.15] tracking-[-0.045em] md:text-5xl lg:text-6xl";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 text-sm font-medium tracking-wide text-primary">
      <span className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-[opacity,translate] duration-600 ease-out", visible ? "translate-y-0 opacity-100" : "opacity-0", !visible && !reducedMotion && "translate-y-6", className)}
    >
      {children}
    </div>
  );
}

export function ImageWithFallback({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={cn("flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-forest/70 via-surface to-background", className)} role="img" aria-label={`${alt}: photograph unavailable`}>
        <Leaf className="size-12 text-primary/70" strokeWidth={1} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={500}
      loading="lazy"
      onError={() => {
        setFailed(true);
      }}
      className={cn("aspect-[16/10] w-full object-cover", className)}
    />
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
      {children}
      <ArrowUpRight className="size-4" />
    </a>
  );
}

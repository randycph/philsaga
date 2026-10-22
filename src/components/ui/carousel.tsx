import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./button";

export function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className="focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          api?.scrollPrev();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          api?.scrollNext();
        }
      }}
    >
      <div ref={ref} className="overflow-hidden"><div className="-ml-6 flex items-stretch">{children}</div></div>
      <div className="mt-7 flex justify-end gap-3">
        <Button variant="outline" disabled={!canPrev} aria-label="Previous story" className="size-12 rounded-full p-0" onClick={() => { api?.scrollPrev(); }}><ArrowLeft className="size-5" /></Button>
        <Button variant="outline" disabled={!canNext} aria-label="Next story" className="size-12 rounded-full p-0" onClick={() => { api?.scrollNext(); }}><ArrowRight className="size-5" /></Button>
      </div>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full pl-6 md:basis-1/2 xl:basis-1/3">
      {children}
    </div>
  );
}

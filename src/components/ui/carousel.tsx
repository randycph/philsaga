import { uiCopy } from "../../data/ui";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./button";

export function Carousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
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
      <div ref={ref} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="-ml-6 flex items-stretch">{children}</div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
        <div className="flex min-w-0 items-center gap-4">
          <span
            aria-live="polite"
            className="shrink-0 font-mono text-xs tracking-[0.16em] text-[#f3a23a]"
          >
            {String(selectedIndex + 1).padStart(2, "0")}
            <span className="px-1.5 text-white/40">/</span>
            {String(snapCount).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5" aria-label="Choose story group">
            {Array.from({ length: snapCount }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to story group ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                className={`h-1 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3a23a] ${
                  index === selectedIndex
                    ? "w-7 bg-[#f3a23a]"
                    : "w-3 bg-white/35 hover:bg-white/70"
                }`}
                onClick={() => {
                  api?.scrollTo(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <Button
            type="button"
            variant="outline"
            disabled={!canPrev}
            aria-label={uiCopy.previousStory}
            className="size-9 min-h-0 min-w-0 rounded-full border-[#a9873c] bg-[#08151d26] p-0 text-white transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:border-[#f6931c] hover:bg-[#f6931c] hover:text-[#102b2b] hover:shadow-[0_0_0_6px_#f6931c33] active:scale-[0.92] disabled:border-white/15 disabled:bg-transparent disabled:text-white/40"
            onClick={() => {
              api?.scrollPrev();
            }}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!canNext}
            aria-label={uiCopy.nextStory}
            className="size-9 min-h-0 min-w-0 rounded-full border-[#a9873c] bg-[#08151d26] p-0 text-white transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:border-[#f6931c] hover:bg-[#f6931c] hover:text-[#102b2b] hover:shadow-[0_0_0_6px_#f6931c33] active:scale-[0.92] disabled:border-white/15 disabled:bg-transparent disabled:text-white/40"
            onClick={() => {
              api?.scrollNext();
            }}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className="min-w-0 shrink-0 grow-0 basis-full pl-6 md:basis-[72%] xl:basis-[43%]"
    >
      {children}
    </div>
  );
}



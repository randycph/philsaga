import "./CommunityMedia.css";
import { uiCopy } from "../data/ui";
import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowRight, ArrowUp, Play } from "lucide-react";
import { videos, type VideoItem } from "../data/site";
import { ImageWithFallback, TextLink } from "./Shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [failed, setFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = videos[activeIndex];
  const thumbnails = Array.from(
    { length: Math.min(3, Math.max(0, videos.length - 1)) },
    (_, offset) => {
      const index = (activeIndex + offset + 1) % videos.length;

      return { video: videos[index], index };
    },
  );

  const showNextVideo = () => {
    setActiveIndex((index) => (index + 1) % videos.length);
  };

  const showPreviousVideo = () => {
    setActiveIndex((index) => (index - 1 + videos.length) % videos.length);
  };

  const animateArrowClick = (event: MouseEvent<HTMLButtonElement>) => {
    gsap.fromTo(
      event.currentTarget,
      { scale: 0.86 },
      { scale: 1, duration: 0.42, ease: "back.out(2)" },
    );
  };

  const playVideo = (video: VideoItem) => {
    setFailed(false);
    setSelected(video);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".community-media__featured",
        { autoAlpha: 0, y: 12, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      );
      gsap.fromTo(
        ".community-media__thumbnails button",
        { autoAlpha: 0, y: -9 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.07,
          ease: "power2.out",
        },
      );
    }, section);

    return () => context.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="videos"
      aria-labelledby="video-heading"
      className="community-media community-media--forest"
    >
      <div className="community-strip__marker" aria-hidden="true">
        08
        <span />
      </div>
      <div className="community-media__copy">
        <p className="editorial-eyebrow community-media__eyebrow">Our Stories</p>
        <h2 id="video-heading">A closer look<br />at Philsaga.</h2>
        <p>Explore our journey, milestones,<br />and the people behind our progress.</p>
        <a
          className="community-media__watch"
          href={uiCopy.httpsWwwPhilsagaComVideos}
          target="_blank"
          rel="noreferrer"
        >
          <span><Play fill="currentColor" aria-hidden="true" /></span>
          Watch All Videos
          <ArrowRight aria-hidden="true" className="community-media__watch-arrow" />
        </a>
      </div>
      <div className="community-media__gallery">
        <button
          className="community-media__featured"
          aria-label={`${uiCopy.videoPlayPrefix} ${featured.title}`}
          onClick={() => {
            playVideo(featured);
          }}
        >
          <ImageWithFallback key={featured.title} src={featured.image} alt={featured.title} className="community-media__image" />
          <span className="community-media__play"><Play fill="currentColor" aria-hidden="true" /></span>
        </button>
        <div className="community-media__thumbnails" aria-label="Select featured video">
          {thumbnails.map(({ video, index }) => (
            <button
              key={video.title}
              aria-label={`Select ${video.title}`}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <ImageWithFallback src={video.image} alt={video.title} className="community-media__image" />
            </button>
          ))}
        </div>
        <div className="community-media__controls">
          <button aria-label="Next video" onClick={(event) => {
            animateArrowClick(event);
            showNextVideo();
          }}>
            <ArrowUp aria-hidden="true" />
          </button>
          <button aria-label="Previous video" onClick={(event) => {
            animateArrowClick(event);
            showPreviousVideo();
          }}>
            <ArrowDown aria-hidden="true" />
          </button>
        </div>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      >
        <DialogContent>
          <DialogTitle className="pr-12 font-heading text-2xl">
            {selected?.title}
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {selected?.description}
          </DialogDescription>
          {selected && !failed && (
            <video
              key={selected.source}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={selected.image}
              aria-label={selected.title}
              onError={() => {
                setFailed(true);
              }}
              className="mt-6 aspect-video w-full rounded-lg bg-black"
            >
              <source src={selected.source} />
            </video>
          )}
          {failed && (
            <p className="mt-6 rounded-sm bg-background p-5 leading-relaxed">
              {uiCopy.thisVideoIsCurrentlyUnavailableFromPmcS}
            </p>
          )}
          {selected && (
            <div className="mt-5">
              <TextLink href={selected.href}>
                {uiCopy.openOriginalVideoPage}
              </TextLink>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

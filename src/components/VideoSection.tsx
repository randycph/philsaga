import { uiCopy } from "../data/ui";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { copy, videos, type VideoItem } from "../data/site";
import {
  container,
  Eyebrow,
  heading,
  ImageWithFallback,
  Reveal,
  TextLink,
} from "./Shared";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

export function VideoSection() {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [failed, setFailed] = useState(false);
  const featured = videos[0];

  const playVideo = (video: VideoItem) => {
    setFailed(false);
    setSelected(video);
  };

  return (
    <section
      id="videos"
      aria-labelledby="video-heading"
      className="py-24 lg:py-32"
    >
      <div className={container}>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>{copy.videoEyebrow}</Eyebrow>
            <h2 id="video-heading" className={heading}>
              {copy.videoHeading}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {uiCopy.companyAvpAndVideoClips}
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href={uiCopy.httpsWwwPhilsagaComVideos}>
              {uiCopy.viewAllVideos}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </Reveal>
        <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-surface lg:grid lg:grid-cols-[1.5fr_1fr]">
          <button
            onClick={() => {
              playVideo(featured);
            }}
            aria-label={`${uiCopy.videoPlayPrefix} ${featured.title}`}
            className="group relative min-h-72 overflow-hidden focus-visible:outline-4 focus-visible:outline-primary focus-visible:-outline-offset-4"
          >
            <ImageWithFallback
              src={featured.image}
              alt={featured.title}
              className="h-full min-h-72 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full border border-white/30 bg-primary text-background">
                <Play className="ml-1 size-7" fill="currentColor" />
              </span>
            </span>
            <span className="absolute bottom-5 right-5 rounded bg-background/80 px-3 py-1.5 text-sm">
              {featured.duration}
            </span>
          </button>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="mb-5 text-sm text-primary">
              {uiCopy.label25YearsOfSharedPurpose}
            </p>
            <h3 className="font-heading text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-5 line-clamp-3 text-base leading-[1.8] text-muted-foreground">
              {featured.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button
                onClick={() => {
                  playVideo(featured);
                }}
              >
                <Play className="size-4" />
                {uiCopy.playVideo}
              </Button>
              <TextLink href={featured.href}>{uiCopy.readMore}</TextLink>
            </div>
          </div>
        </Reveal>
        <div className="mt-7 grid gap-7 md:grid-cols-2">
          {videos.slice(1).map((video) => (
            <Reveal
              key={video.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-surface sm:grid sm:grid-cols-[0.8fr_1fr] md:block xl:grid"
            >
              <button
                onClick={() => {
                  playVideo(video);
                }}
                aria-label={`${uiCopy.videoPlayPrefix} ${video.title}`}
                className="relative block h-full w-full focus-visible:outline-4 focus-visible:outline-primary"
              >
                <ImageWithFallback
                  src={video.image}
                  alt={video.title}
                  className="h-full min-h-52"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/20">
                  <Play className="size-10 rounded-full bg-background/70 p-2" />
                </span>
                <span className="absolute bottom-3 right-3 rounded bg-background/80 px-2 py-1 text-sm">
                  {video.duration}
                </span>
              </button>
              <div className="p-6">
                <h3 className="font-heading text-xl font-medium leading-snug">
                  {video.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-[1.8] text-muted-foreground">
                  {video.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Button
                    variant="outline"
                    className="min-h-10 px-3 py-2"
                    onClick={() => {
                      playVideo(video);
                    }}
                  >
                    <Play className="size-3.5" />
                    {uiCopy.playVideo}
                  </Button>
                  <TextLink href={video.href}>{uiCopy.readMore}</TextLink>
                </div>
              </div>
            </Reveal>
          ))}
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
            <p className="mt-6 rounded-xl bg-background p-5 leading-relaxed">
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

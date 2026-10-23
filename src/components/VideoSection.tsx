import "./CommunityMedia.css";
import { uiCopy } from "../data/ui";
import { useState } from "react";
import { ArrowDown, ArrowUp, Play } from "lucide-react";
import { videos, type VideoItem } from "../data/site";
import { ImageWithFallback, TextLink } from "./Shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

export function VideoSection() {
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

  const playVideo = (video: VideoItem) => {
    setFailed(false);
    setSelected(video);
  };

  return (
    <section
      id="videos"
      aria-labelledby="video-heading"
      className="community-media community-media--forest"
    >
      <div className="community-strip__marker" aria-hidden="true">
        08
        <span />
      </div>
      <div className="community-media__copy">
        <span className="community-media__rule" aria-hidden="true" />
        <h2 id="video-heading">A closer look<br />at Philsaga.</h2>
        <p>Explore our journey, milestones,<br />and the people behind our progress.</p>
        <button className="community-media__watch" onClick={() => {
          playVideo(featured);
        }}>
          <span><Play fill="currentColor" aria-hidden="true" /></span>
          Watch Video
        </button>
      </div>
      <div className="community-media__gallery">
        <button
          className="community-media__featured"
          aria-label={`${uiCopy.videoPlayPrefix} ${featured.title}`}
          onClick={() => {
            playVideo(featured);
          }}
        >
          <ImageWithFallback src={featured.image} alt={featured.title} className="community-media__image" />
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
          <button aria-label="Next video" onClick={showNextVideo}>
            <ArrowUp aria-hidden="true" />
          </button>
          <button aria-label="Previous video" onClick={showPreviousVideo}>
            <ArrowDown aria-hidden="true" />
          </button>
          <a href={uiCopy.httpsWwwPhilsagaComVideos} aria-label="View all videos">+</a>
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

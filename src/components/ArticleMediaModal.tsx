import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Images,
  Pause,
  Play,
} from "lucide-react";
import type { NewsArticle } from "../data/articles";
import { ArticleVideo } from "./ArticleVideo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import "./ArticleMediaModal.css";

export function ArticleMediaModal({
  article,
  onClose,
  onRestoreFocus,
  initialIndex = 0,
}: {
  article: NewsArticle;
  onClose: () => void;
  onRestoreFocus: () => void;
  initialIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const media = article.media;
  const images = media?.type === "gallery" ? media.images : [];
  const activeImage = images[activeIndex];
  const count = images.length;

  function selectImage(index: number) {
    setPlaying(false);
    setImageFailed(false);
    setActiveIndex((index + count) % count);
  }

  useEffect(() => {
    if (!playing || hovering || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setImageFailed(false);
      setActiveIndex((index) => (index + 1) % count);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [playing, hovering, count]);

  useEffect(() => {
    function pauseWhenHidden() {
      if (document.hidden) {
        setPlaying(false);
      }
    }

    document.addEventListener("visibilitychange", pauseWhenHidden);

    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, []);

  useEffect(() => {
    if (count > 1) {
      const nextImage = new Image();
      nextImage.src = images[(activeIndex + 1) % count].image;
    }
  }, [activeIndex, images, count]);

  if (!media) {
    return null;
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent
        className={`article-media-modal article-media-modal--${media.type}`}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onRestoreFocus();
        }}
        onFocusCapture={(event) => {
          if (!event.target.closest("[data-gallery-playback]")) {
            setPlaying(false);
          }
        }}
        onKeyDown={(event) => {
          if (
            media.type !== "gallery" ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
          ) {
            return;
          }

          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            selectImage(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
      >
        <header className="article-media-modal__header">
          <p className="article-media-modal__eyebrow">
            {media.type === "gallery" ? (
              <Images size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
            {media.type === "gallery" ? "Photo story" : "Film"}
            <span aria-hidden="true" />
            {article.category}
          </p>
          <DialogTitle className="article-media-modal__title">
            {article.title}
          </DialogTitle>
          <DialogDescription className="article-media-modal__description">
            {article.excerpt}
          </DialogDescription>
        </header>

        {media.type === "gallery" && activeImage ? (
          <>
            <div className="article-gallery">
              <div
                className="article-gallery__stage"
                onMouseEnter={() => {
                  setHovering(true);
                }}
                onMouseLeave={() => {
                  setHovering(false);
                }}
              >
                {imageFailed ? (
                  <p className="article-gallery__error">
                    This photograph couldn’t be loaded. Try the next image or
                    open the original story.
                  </p>
                ) : (
                  <img
                    key={activeImage.image}
                    src={activeImage.image}
                    alt={activeImage.alt}
                    onError={() => {
                      setImageFailed(true);
                      setPlaying(false);
                    }}
                  />
                )}
                <span className="article-gallery__counter" aria-hidden="true">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span>/ {String(count).padStart(2, "0")}</span>
                </span>
              </div>
              <div className="article-gallery__detail">
                <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
                  <p className="article-gallery__position">
                    Photograph {activeIndex + 1} of {count}
                  </p>
                  <h3>{activeImage.title}</h3>
                  <p className="article-gallery__caption">
                    {activeImage.description}
                  </p>
                </div>
                <div className="article-gallery__controls">
                  <div className="article-gallery__navigation">
                    <button
                      type="button"
                      onClick={() => {
                        selectImage(activeIndex - 1);
                      }}
                      disabled={count < 2}
                    >
                      <ArrowLeft size={17} aria-hidden="true" /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        selectImage(activeIndex + 1);
                      }}
                      disabled={count < 2}
                    >
                      Next <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="article-gallery__playback"
                    data-gallery-playback
                    aria-pressed={playing}
                    disabled={count < 2}
                    onClick={() => {
                      setPlaying(!playing);
                    }}
                  >
                    {playing ? (
                      <Pause size={14} aria-hidden="true" />
                    ) : (
                      <Play size={14} aria-hidden="true" />
                    )}
                    {playing ? "Pause slideshow" : "Play slideshow"}
                    <span>5 sec</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="article-gallery__thumbnails"
              aria-label="Choose a photograph"
            >
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.image}
                  aria-label={`View photograph ${index + 1}: ${image.title}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => {
                    selectImage(index);
                  }}
                >
                  <img src={image.image} alt="" loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
              <p>
                Photography from The Vein
                <br />
                Philsaga Mining Corporation
              </p>
            </div>
          </>
        ) : media.type === "video" ? (
          <ArticleVideo article={article} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

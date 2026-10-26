import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { site, stories } from "../data/site";
import { assetPath } from "../lib/assets";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Hero.css";

// Editorial cover images are separate from the original article thumbnails.
const featuredArticles = [
  {
    ...stories[0],
    headline: "Helping Bislig rebuild",
    description:
      "Supporting 48 fire-affected families with essential supplies and materials to help rebuild their homes and lives.",
    cover: assetPath("assets/loading-truck.png"),
    position: "center 60%",
  },
  {
    ...stories[1],
    headline: "Protecting what matters",
    description:
      "A closer look at the ecosystems around our operations, through PMC and MMPRC’s biodiversity assessment.",
    cover: assetPath("assets/approach-lake.png"),
    position: "center",
  },
  {
    ...stories[2],
    headline: "Growing a greener tomorrow",
    description:
      "Communities come together for the Mining Forest Program, restoring forest areas and planting for the future.",
    cover: assetPath("assets/approach-seedling.png"),
    position: "center",
  },
];

const slideDuration = 7000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClickUntil = useRef(0);
  const reducedMotion = useReducedMotion();
  const playing = !paused && !hovered && visible && !reducedMotion;
  const article = featuredArticles[activeIndex];

  useEffect(() => {
    const element = section.current;

    if (!element) {
      return;
    }

    let accumulatedDistance = 0;
    let lastWheelAt = 0;
    let lastSlideAt = -Infinity;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      const horizontalDistance = event.shiftKey ? event.deltaY : event.deltaX;

      if (
        horizontalDistance === 0 ||
        (!event.shiftKey && Math.abs(event.deltaX) <= Math.abs(event.deltaY))
      ) {
        return;
      }

      // Consume horizontal gestures only, leaving normal page scrolling available.
      event.preventDefault();
      const now = performance.now();
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientWidth
            : 1;

      if (
        now - lastWheelAt > 180 ||
        Math.sign(accumulatedDistance) !== Math.sign(horizontalDistance)
      ) {
        accumulatedDistance = 0;
      }

      lastWheelAt = now;
      accumulatedDistance += horizontalDistance * unit;

      // Trackpad momentum must not run through several articles in one gesture.
      if (Math.abs(accumulatedDistance) < 45 || now - lastSlideAt < 650) {
        return;
      }

      const direction = accumulatedDistance > 0 ? 1 : -1;
      setActiveIndex((index) => {
        return (
          (index + direction + featuredArticles.length) %
          featuredArticles.length
        );
      });
      setPaused(true);
      accumulatedDistance = 0;
      lastSlideAt = now;
    };

    element.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && !document.hidden);
    });
    if (section.current) {
      observer.observe(section.current);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % featuredArticles.length);
    }, slideDuration);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [activeIndex, playing]);

  function selectSlide(index: number) {
    setActiveIndex((index + featuredArticles.length) % featuredArticles.length);
    setPaused(true);
  }

  return (
    <section
      ref={section}
      id="hero"
      className="article-hero"
      aria-label="Featured articles"
      aria-roledescription="carousel"
      onTouchStart={(event) => {
        if (event.touches.length !== 1) {
          touchStart.current = null;
          return;
        }

        touchStart.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;

        if (!start || event.touches.length > 0) {
          return;
        }

        const distanceX = start.x - event.changedTouches[0].clientX;
        const distanceY = start.y - event.changedTouches[0].clientY;

        if (
          Math.abs(distanceX) > 50 &&
          Math.abs(distanceX) > Math.abs(distanceY)
        ) {
          selectSlide(activeIndex + (distanceX > 0 ? 1 : -1));
          suppressClickUntil.current = performance.now() + 400;
        }
      }}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
      onClickCapture={(event) => {
        if (performance.now() < suppressClickUntil.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onFocusCapture={() => {
        setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          selectSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <h1 className="sr-only">{site.name}</h1>
      <div className="article-hero__images" aria-hidden="true">
        {featuredArticles.map((item, index) => (
          <img
            key={item.href}
            src={item.cover}
            alt=""
            fetchPriority={index === 0 ? "high" : "auto"}
            className={index === activeIndex ? "is-active" : ""}
            style={{ objectPosition: item.position }}
          />
        ))}
      </div>
      <div className="article-hero__shade" aria-hidden="true" />
      <div className="article-hero__ribbon" aria-hidden="true" />
      <div className="article-hero__stage">
        <div
          className="article-hero__copy"
          aria-live={playing ? "off" : "polite"}
          aria-atomic="true"
        >
          <div
            key={article.href}
            className="article-hero__story"
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${featuredArticles.length}`}
          >
            <p className="article-hero__category">{article.category}</p>
            <h2>{article.headline}</h2>
            <p className="article-hero__description">{article.description}</p>
            <a
              className="article-hero__cta"
              href={article.href}
              aria-label={`Read the article: ${article.title}`}
            >
              Read the Article
              <ArrowRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div
          className="article-hero__pagination"
          aria-label="Choose featured article"
        >
          {featuredArticles.map((item, index) => (
            <button
              key={item.href}
              type="button"
              aria-label={`Show article ${index + 1}: ${item.headline}`}
              aria-pressed={index === activeIndex}
              onClick={() => {
                selectSlide(index);
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <div className="article-hero__controls">
          {!reducedMotion && (
            <button
              type="button"
              className="article-hero__play"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => {
                setPaused(!paused);
              }}
            >
              {paused ? (
                <Play size={17} aria-hidden="true" />
              ) : (
                <Pause size={17} aria-hidden="true" />
              )}
            </button>
          )}
          <button
            type="button"
            aria-label="Previous article"
            onClick={() => {
              selectSlide(activeIndex - 1);
            }}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next article"
            onClick={() => {
              selectSlide(activeIndex + 1);
            }}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="article-hero__rail" aria-label="Featured stories">
        {featuredArticles.map((item, index) => (
          <button
            key={item.href}
            type="button"
            className={`article-hero__card ${index === activeIndex ? "is-active" : ""}`}
            aria-label={`Show ${item.headline}`}
            aria-pressed={index === activeIndex}
            onClick={() => {
              selectSlide(index);
            }}
          >
            <span className="article-hero__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <img src={item.cover} alt="" width={168} height={108} />
            <span className="article-hero__card-copy">
              <span className="article-hero__card-category">
                {item.category}
              </span>
              <span className="article-hero__card-title">{item.headline}</span>
              <span className="article-hero__card-action">
                Explore story <ArrowRight size={15} aria-hidden="true" />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

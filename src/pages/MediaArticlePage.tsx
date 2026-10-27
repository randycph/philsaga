import { useRef, useState, type MouseEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Expand,
  Images,
  Play,
} from "lucide-react";
import { ArticleMediaModal } from "../components/ArticleMediaModal";
import { ArticleVideo } from "../components/ArticleVideo";
import { formatArticleDate, newsArticles } from "../data/articles";
import { assetPath } from "../lib/assets";
import "./MediaArticlePage.css";

export function MediaArticlePage({ articleId }: { articleId: string }) {
  const article = newsArticles.find((story) => story.id === articleId);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryTrigger = useRef<HTMLButtonElement | null>(null);

  if (!article?.media) {
    return null;
  }

  const media = article.media;
  const imageOnly = article.galleryPresentation === "images-only";
  const format =
    media.type === "gallery"
      ? imageOnly
        ? "Photo gallery"
        : "Photo story"
      : "Film";
  const otherMedia = newsArticles.find(
    (story) => story.media && story.id !== article.id,
  );

  function openGallery(event: MouseEvent<HTMLButtonElement>, index: number) {
    galleryTrigger.current = event.currentTarget;
    setSelectedImage(index);
  }

  return (
    <article
      className={`media-story ${imageOnly ? "media-story--images-only" : ""}`}
      aria-labelledby="media-story-title"
    >
      <header className="media-story__header media-story__container">
        <nav className="media-story__breadcrumbs" aria-label="Breadcrumb">
          <a href={assetPath("#home")}>Home</a>
          <ChevronRight size={12} aria-hidden="true" />
          <a href={assetPath("articles.html")}>News & Articles</a>
          <ChevronRight size={12} aria-hidden="true" />
          <span aria-current="page">{format}</span>
        </nav>
        <div className="media-story__meta">
          <span>
            {media.type === "gallery" ? (
              <Images size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
            {format}
          </span>
          <span>{article.category}</span>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        </div>
        <h1 id="media-story-title">{article.title}</h1>
        {!imageOnly && <p className="media-story__deck">{article.excerpt}</p>}
        {!imageOnly && (
          <div className="media-story__byline">
            <img src={assetPath("assets/pmc-logo.png")} alt="" />
            <span>Philsaga Mining Corporation</span>
          </div>
        )}
      </header>

      <div className="media-story__container media-story__content">
        {!imageOnly &&
          article.content?.map((section) => (
            <section className="media-story__body" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

        {media.type === "gallery" ? (
          <section
            className="media-story__gallery"
            aria-labelledby="article-gallery-heading"
          >
            <div className="media-story__gallery-heading">
              <div className={imageOnly ? "sr-only" : undefined}>
                <p>In pictures</p>
                <h2 id="article-gallery-heading">
                  {imageOnly
                    ? "Photo gallery"
                    : "A closer look at our communities"}
                </h2>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  openGallery(event, 0);
                }}
              >
                <Expand size={16} aria-hidden="true" /> Open gallery{" "}
                <span>{media.images.length} photographs</span>
              </button>
            </div>
            <div
              className={`media-story__photo-grid ${imageOnly ? "media-story__photo-grid--images-only" : ""}`}
            >
              {media.images.map((image, index) => (
                <figure key={image.image}>
                  <button
                    type="button"
                    aria-label={`Open photograph ${index + 1}: ${image.title}`}
                    onClick={(event) => {
                      openGallery(event, index);
                    }}
                  >
                    <img
                      src={image.image}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <span>
                      <Expand size={16} aria-hidden="true" /> View photograph
                    </span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </button>
                  {!imageOnly && (
                    <figcaption>
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <section className="media-story__video" aria-label="Watch the film">
            <ArticleVideo article={article} />
          </section>
        )}

        <nav
          className="media-story__navigation"
          aria-label="Article navigation"
        >
          <a href={assetPath("articles.html")}>
            <ArrowLeft size={17} aria-hidden="true" /> All articles
          </a>
          {otherMedia && (
            <a href={otherMedia.href}>
              <span>
                <small>
                  {otherMedia.media?.type === "gallery"
                    ? "Explore the photo story"
                    : "Watch the film"}
                </small>
                {otherMedia.title}
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
        </nav>
      </div>

      {selectedImage !== null && (
        <ArticleMediaModal
          article={article}
          initialIndex={selectedImage}
          onClose={() => {
            setSelectedImage(null);
          }}
          onRestoreFocus={() => {
            galleryTrigger.current?.focus();
          }}
        />
      )}
    </article>
  );
}

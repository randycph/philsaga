import { useState } from "react";
import type { NewsArticle } from "../data/articles";
import { formatArticleDate } from "../data/articles";
import "./ArticleMediaModal.css";

export function ArticleVideo({ article }: { article: NewsArticle }) {
  const [failed, setFailed] = useState(false);
  const media = article.media;

  if (media?.type !== "video") {
    return null;
  }

  function handleError() {
    setFailed(true);
  }

  return (
    <div className="article-film">
      <video
        controls
        playsInline
        preload="metadata"
        poster={article.image}
        aria-label={article.title}
        onError={handleError}
      >
        <source src={media.video} type="video/mp4" onError={handleError} />
        Your browser cannot play this video.
      </video>
      <div className="article-film__footer">
        {failed ? (
          <p role="alert">
            The film couldn’t be loaded.{" "}
            <a href={media.source} target="_blank" rel="noreferrer">
              Watch it on Philsaga’s website.
            </a>
          </p>
        ) : (
          <p>
            A Philsaga Mining Corporation film ·{" "}
            {formatArticleDate(article.date)}
          </p>
        )}
      </div>
    </div>
  );
}

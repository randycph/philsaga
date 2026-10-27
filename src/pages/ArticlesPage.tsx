import { useEffect, useState } from "react";
import { ArrowRight, Images, Mail, Play, Search, X } from "lucide-react";
import {
  articleCategories,
  articleYears,
  filterNewsArticles,
  formatArticleDate,
  newsArticles,
  type ArticleCategory,
  type NewsArticle,
} from "../data/articles";
import { site } from "../data/site";
import { assetPath } from "../lib/assets";
import "./ArticlesPage.css";

function ArticleCard({
  article,
  compact = false,
}: {
  article: NewsArticle;
  compact?: boolean;
}) {
  const actionLabel =
    article.media?.type === "gallery"
      ? "Read story"
      : article.media?.type === "video"
        ? "Watch film"
        : "Read More";

  return (
    <article className={`news-card ${compact ? "news-card--compact" : ""}`}>
      <a
        href={article.href}
        className="news-card__image"
        aria-label={`${actionLabel}: ${article.title}`}
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          style={{ objectPosition: article.imagePosition }}
          loading="lazy"
        />
        <span className="news-card__badge">{article.category}</span>
        {article.media && (
          <span className="news-card__format">
            {article.media.type === "gallery" ? (
              <>
                <Images size={14} aria-hidden="true" />{" "}
                {article.media.images.length} photographs
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" aria-hidden="true" /> Film
              </>
            )}
          </span>
        )}
        {article.media?.type === "video" && (
          <span className="news-card__play" aria-hidden="true">
            <Play size={22} fill="currentColor" />
          </span>
        )}
      </a>
      <div className="news-card__content">
        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
        <h2>
          <a href={article.href}>{article.title}</a>
        </h2>
        {!compact && <p>{article.excerpt}</p>}
        <a
          className="news-card__read"
          href={article.href}
          aria-label={`${actionLabel}: ${article.title}`}
        >
          {actionLabel} <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ArticlesPage() {
  const [category, setCategory] = useState<ArticleCategory>("All Articles");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const results = filterNewsArticles(category, query, year);
  const featured = newsArticles[0];

  useEffect(() => {
    const selectedCategory = new URLSearchParams(window.location.search).get(
      "category",
    );
    const match = articleCategories.find((item) => item === selectedCategory);

    if (match) {
      setCategory(match);
    }

    const selectedYear = new URLSearchParams(window.location.search).get(
      "year",
    );

    if (selectedYear && articleYears.includes(selectedYear)) {
      setYear(selectedYear);
    }

    const mediaId = new URLSearchParams(window.location.search).get("media");
    const mediaArticle = newsArticles.find(
      (article) => article.id === mediaId && article.media,
    );

    if (mediaArticle?.file) {
      window.location.replace(mediaArticle.href);
    }
  }, []);

  function clearFilters() {
    setCategory("All Articles");
    setQuery("");
    setYear("");
  }

  return (
    <div className="articles-page">
      <section className="news-banner" aria-labelledby="news-title">
        <img
          src={assetPath("assets/purpose-mine.png")}
          alt="Haul truck travelling along a winding mine road at sunrise"
          fetchPriority="high"
        />
        <div className="news-banner__shade" aria-hidden="true" />
        <div className="news-banner__contours" aria-hidden="true" />
        <div className="news-container news-banner__content">
          <p className="news-eyebrow">News & Articles</p>
          <h1 id="news-title">
            Stories that
            <br />
            Move Communities
            <br />
            Forward.
          </h1>
          <p>
            Explore our latest news, stories, and insights on sustainable
            mining, community development, and the people behind our progress.
          </p>
        </div>
      </section>

      <div className="news-container news-layout">
        <section className="news-main" aria-label="Browse articles">
          <div
            className="news-filters"
            role="group"
            aria-label="Filter articles by category"
          >
            {articleCategories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => {
                  setCategory(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "article" : "articles"}{" "}
            found{category !== "All Articles" ? ` in ${category}` : ""}
            {year ? ` from ${year}` : ""}
            {query.trim() ? ` for ${query.trim()}` : ""}.
          </p>
          {results.length > 0 ? (
            <div
              className={`news-grid ${results.length === 8 ? "news-grid--balanced" : ""}`}
            >
              {results.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  compact={index > (results.length === 8 ? 1 : 2)}
                />
              ))}
            </div>
          ) : (
            <div className="news-empty">
              <Search size={32} aria-hidden="true" />
              <h2>No articles match your search.</h2>
              <p>Try another keyword, category, or year.</p>
              <button type="button" onClick={clearFilters}>
                Show all articles <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        <aside className="news-sidebar" aria-label="Article search and filters">
          <label className="news-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </label>
          {(query !== "" || category !== "All Articles" || year !== "") && (
            <button type="button" className="news-clear" onClick={clearFilters}>
              Clear filters <X size={14} aria-hidden="true" />
            </button>
          )}
          <div className="news-categories">
            <h2>Categories</h2>
            <div role="group" aria-label="Article categories">
              {articleCategories.map((item) => {
                const count = filterNewsArticles(item, query, year).length;
                return (
                  <button
                    type="button"
                    key={item}
                    aria-pressed={category === item}
                    onClick={() => {
                      setCategory(item);
                    }}
                  >
                    <span>{item}</span>
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <section
            className="news-categories"
            aria-labelledby="news-year-heading"
          >
            <h2 id="news-year-heading">Filter by Year</h2>
            <div role="group" aria-label="Filter articles by year">
              <button
                type="button"
                aria-pressed={year === ""}
                onClick={() => {
                  setYear("");
                }}
              >
                <span>All Years</span>
                <span>{filterNewsArticles(category, query).length}</span>
              </button>
              {articleYears.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={year === item}
                  onClick={() => {
                    setYear(item);
                  }}
                >
                  <span>{item}</span>
                  <span>
                    {filterNewsArticles(category, query, item).length}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <a
            href={featured.href}
            className="news-featured"
            aria-label={`Featured article: ${featured.title}`}
          >
            <img
              src={assetPath("assets/approach-seedling.png")}
              alt=""
              loading="lazy"
            />
            <div>
              <p>Featured Article</p>
              <h2>
                A Cleaner,
                <br />
                Greener Tomorrow
              </h2>
              <div className="news-featured__bottom">
                <time dateTime={featured.date}>
                  {formatArticleDate(featured.date)}
                </time>
                <span>
                  <ArrowRight size={19} aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
          <div className="news-updates">
            <Mail size={32} aria-hidden="true" />
            <div>
              <h2>Get the Latest Updates</h2>
              <p>
                Follow Philsaga for news, community stories, and company
                announcements.
              </p>
            </div>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Follow us on Facebook <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

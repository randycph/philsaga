import { useState } from "react";
import { ArrowRight, Mail, Search, X } from "lucide-react";
import {
  articleCategories,
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
  return (
    <article className={`news-card ${compact ? "news-card--compact" : ""}`}>
      <a
        href={article.href}
        className="news-card__image"
        aria-label={`Read ${article.title}`}
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          style={{ objectPosition: article.imagePosition }}
          loading="lazy"
        />
        <span className="news-card__badge">{article.category}</span>
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
          aria-label={`Read more: ${article.title}`}
        >
          Read More <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ArticlesPage() {
  const [category, setCategory] = useState<ArticleCategory>("All Articles");
  const [query, setQuery] = useState("");
  const results = filterNewsArticles(category, query);
  const featured = newsArticles[0];

  function clearFilters() {
    setCategory("All Articles");
    setQuery("");
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
            {query.trim() ? ` for ${query.trim()}` : ""}.
          </p>
          {results.length > 0 ? (
            <div className="news-grid">
              {results.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  compact={index > 2}
                />
              ))}
            </div>
          ) : (
            <div className="news-empty">
              <Search size={32} aria-hidden="true" />
              <h2>No articles match your search.</h2>
              <p>Try another keyword or browse a different category.</p>
              <button type="button" onClick={clearFilters}>
                Show all articles <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        <aside
          className="news-sidebar"
          aria-label="Article search and categories"
        >
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
          {(query !== "" || category !== "All Articles") && (
            <button type="button" className="news-clear" onClick={clearFilters}>
              Clear filters <X size={14} aria-hidden="true" />
            </button>
          )}
          <div className="news-categories">
            <h2>Categories</h2>
            <div role="group" aria-label="Article categories">
              {articleCategories.map((item) => {
                const count =
                  item === "All Articles"
                    ? newsArticles.length
                    : newsArticles.filter(
                        (article) => article.category === item,
                      ).length;
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

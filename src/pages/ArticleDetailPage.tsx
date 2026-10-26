import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ExternalLink,
  House,
  Link,
  MapPin,
  Package,
  Users,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  reliefArticle as article,
  reliefSections,
} from "../data/article-detail";
import {
  formatArticleDate,
  newsArticles,
  type NewsArticle,
} from "../data/articles";
import { site } from "../data/site";
import { assetPath } from "../lib/assets";
import "./ArticleDetailPage.css";

function RelatedStory({ story }: { story: NewsArticle }) {
  return (
    <a className="story-related-card" href={story.href}>
      <div className="story-related-card__photo">
        <img src={story.image} alt={story.imageAlt} loading="lazy" />
        <span>{story.category}</span>
      </div>
      <div className="story-related-card__copy">
        <time dateTime={story.date}>{formatArticleDate(story.date)}</time>
        <h3>{story.title}</h3>
        <span className="story-round-arrow" aria-hidden="true">
          <ArrowRight size={17} />
        </span>
      </div>
    </a>
  );
}

export function ArticleDetailPage() {
  const [activeSection, setActiveSection] = useState(reliefSections[0].id);
  const [copyStatus, setCopyStatus] = useState("");
  const [shareUrl, setShareUrl] = useState(article.source);
  const related = newsArticles.filter((story) => story.id !== article.id);
  const encodedUrl = encodeURIComponent(shareUrl);

  useEffect(() => {
    setShareUrl(window.location.href.split("#")[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-110px 0px -55% 0px" },
    );

    reliefSections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopyStatus("");
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copyStatus]);

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus("Article link copied.");
    } catch {
      setCopyStatus("Copy the article URL from your browser’s address bar.");
    }
  }

  return (
    <div className="article-detail-page">
      <article aria-labelledby="story-title">
        <header className="story-header">
          <img
            className="story-header__background"
            src={article.image}
            alt=""
          />
          <div className="story-container">
            <nav className="story-breadcrumbs" aria-label="Breadcrumb">
              <a href={assetPath("#home")}>Home</a>
              <ChevronRight size={12} aria-hidden="true" />
              <a href={assetPath("articles.html")}>News & Articles</a>
              <ChevronRight size={12} aria-hidden="true" />
              <span aria-current="page">{article.category}</span>
            </nav>
            <div className="story-header__copy">
              <p className="story-eyebrow">
                {article.category}
                <span aria-hidden="true">|</span>
                <time dateTime={article.date}>18 August 2026</time>
              </p>
              <h1 id="story-title">{article.title}</h1>
              <p className="story-deck">{article.excerpt}</p>
              <div className="story-byline">
                <span className="story-author">
                  <img src={assetPath("assets/pmc-logo.png")} alt="" />
                  {article.author}
                </span>
                <div className="story-share" aria-label="Share this article">
                  <span>Share this article</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Share article on Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Share article on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Share article on X"
                  >
                    <FaXTwitter />
                  </a>
                  <button
                    type="button"
                    onClick={copyArticleLink}
                    aria-label="Copy article link"
                  >
                    {copyStatus === "Article link copied." ? (
                      <Check size={15} />
                    ) : (
                      <Link size={15} />
                    )}
                  </button>
                </div>
              </div>
              <p className="story-copy-status" role="status" aria-live="polite">
                {copyStatus}
              </p>
            </div>
          </div>
        </header>

        <figure className="story-cover">
          <img
            src={article.image}
            alt={article.imageAlt}
            fetchPriority="high"
          />
          <figcaption>
            Editorial illustration of community relief support. The published
            operation announcement appears below.
          </figcaption>
        </figure>

        <div className="story-container story-reading-layout">
          <div className="story-body">
            <p>
              PMC-MMPRC Foundation, Inc. delivered relief to 48 fire-affected
              households in Barangay Tabon, Bislig City, Surigao del Sur.
            </p>
            <section id="supporting-families">
              <h2>Supporting Families After the Fire</h2>
              <p>
                The operation supplied materials for rebuilding homes alongside
                everyday essentials for affected families.
              </p>
            </section>
            <section
              id="assistance-provided"
              className="story-assistance"
              aria-label="Key assistance provided"
            >
              <div>
                <Users aria-hidden="true" />
                <strong>
                  48<span>Families</span>
                </strong>
                <p>Households supported in Bislig City.</p>
              </div>
              <div>
                <House aria-hidden="true" />
                <strong>
                  480<span>Roofing Sheets</span>
                </strong>
                <p>Corrugated sheets for rebuilding.</p>
              </div>
              <div>
                <Package aria-hidden="true" />
                <strong>
                  50<span>Rice Sacks</span>
                </strong>
                <p>Five kilograms per sack.</p>
              </div>
            </section>
            <section id="help-where-it-matters">
              <h2>Help Where It Matters</h2>
              <p>
                Assistance also included 50 family-size pots and pans, 50
                sleeping mats, and 50 blankets. Bereaved families received
                burial assistance, while the barangay government received cash
                support.
              </p>
              <p>
                Barangay Captain Hon. Eladio A. Galano expressed the community’s
                appreciation for the assistance and its role in helping
                residents rebuild.
              </p>
              <div className="story-purpose">
                <span aria-hidden="true">“</span>
                <div>
                  <h3>Rebuilding homes. Restoring hope.</h3>
                  <p>
                    Practical support for families as they recover together.
                  </p>
                  <span>Community relief · Bislig City</span>
                </div>
              </div>
            </section>
            <section id="article-photos" className="story-announcement">
              <h2>Relief Operation Announcement</h2>
              <figure>
                <a
                  href={article.announcement}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open the published relief operation announcement"
                >
                  <img
                    src={article.announcement}
                    alt="Published Philsaga relief goods operation announcement, dated August 18, 2026, in Barangay Tabon, Bislig City"
                    loading="lazy"
                  />
                  <span>
                    View announcement{" "}
                    <ExternalLink size={15} aria-hidden="true" />
                  </span>
                </a>
                <figcaption>
                  Announcement graphic published with the original story.
                </figcaption>
              </figure>
            </section>
            <div className="story-source">
              <a href={article.source} target="_blank" rel="noreferrer">
                Read the original article{" "}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <a href={assetPath("articles.html")}>
                <ArrowLeft size={14} aria-hidden="true" /> Back to all articles
              </a>
            </div>
          </div>

          <aside className="story-sidebar" aria-label="Article information">
            <nav
              className="story-sidebar-card story-toc"
              aria-label="On this page"
            >
              <h2>On This Page</h2>
              {reliefSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={
                    activeSection === section.id ? "location" : undefined
                  }
                  onClick={() => {
                    setActiveSection(section.id);
                  }}
                >
                  {section.label}
                </a>
              ))}
            </nav>
            <section className="story-sidebar-card story-details">
              <h2>Article Details</h2>
              <dl>
                <div>
                  <Users aria-hidden="true" />
                  <dt>Category</dt>
                  <dd>{article.category}</dd>
                </div>
                <div>
                  <CalendarDays aria-hidden="true" />
                  <dt>Date</dt>
                  <dd>
                    <time dateTime={article.date}>August 18, 2026</time>
                  </dd>
                </div>
                <div>
                  <MapPin aria-hidden="true" />
                  <dt>Location</dt>
                  <dd>{article.location}</dd>
                </div>
              </dl>
            </section>
            <section className="story-sidebar-card">
              <h2>Related Article</h2>
              <RelatedStory
                story={
                  related.find((story) => story.id === "barangay-health") ||
                  related[0]
                }
              />
            </section>
          </aside>
        </div>
      </article>

      <section
        id="related-articles"
        className="story-more"
        aria-labelledby="story-more-title"
      >
        <div className="story-container">
          <div className="story-more__heading">
            <h2 id="story-more-title" className="story-eyebrow">
              More Stories from PMC
            </h2>
            <a href={assetPath("articles.html")}>
              View All Articles <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="story-more__grid">
            {related
              .filter((story) => story.id !== "barangay-health")
              .slice(0, 3)
              .map((story) => (
                <RelatedStory story={story} key={story.id} />
              ))}
          </div>
        </div>
      </section>
      <section
        className="story-updates"
        style={{
          backgroundImage: `linear-gradient(110deg,#032820 0%,#032820f5 53%,#03282060 100%),url(${assetPath("assets/approach-mountains.png")})`,
        }}
        aria-labelledby="story-updates-title"
      >
        <div className="story-container">
          <div>
            <p className="story-eyebrow">Stay Updated</p>
            <h2 id="story-updates-title">
              Get the Latest News
              <br />
              and Stories from PMC
            </h2>
            <p>
              Follow our community programs, sustainability initiatives, and
              company news.
            </p>
          </div>
          <a
            className="story-button"
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF aria-hidden="true" /> Follow Us on Facebook{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

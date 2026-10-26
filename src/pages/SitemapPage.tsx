import { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { filterSitemapGroups } from "../data/sitemap";
import { assetPath } from "../lib/assets";
import "./SitemapPage.css";

export function SitemapPage() {
  const [query, setQuery] = useState("");
  const groups = filterSitemapGroups(query);

  return (
    <div className="sitemap-page">
      <section className="sitemap-hero" aria-labelledby="sitemap-title">
        <img
          src={assetPath("assets/careers-team.png")}
          alt="Philsaga team members overlooking the processing plant and forested mountains"
          fetchPriority="high"
        />
        <div className="sitemap-hero__shade" aria-hidden="true" />
        <div className="sitemap-container sitemap-hero__copy">
          <p className="sitemap-eyebrow">Explore PMC</p>
          <h1 id="sitemap-title">Website Sitemap</h1>
          <p>Find your way through our stories, services, and resources.</p>
        </div>
      </section>

      <section
        className="sitemap-container sitemap-directory"
        aria-labelledby="sitemap-directory-title"
      >
        <div className="sitemap-directory__heading">
          <div>
            <p className="sitemap-eyebrow">Site Structure</p>
            <h2 id="sitemap-directory-title">Explore our website</h2>
            <p>
              A complete list of pages and sections to help you find the
              information you need about Philsaga Mining Corporation.
            </p>
          </div>
          <label className="sitemap-search">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">Search the sitemap</span>
            <input
              type="search"
              aria-label="Search the sitemap"
              placeholder="Search a page or topic…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                }}
                aria-label="Clear sitemap search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {groups.length} {groups.length === 1 ? "section" : "sections"} found
          {query.trim() ? ` for ${query.trim()}` : ""}.
        </p>
        {groups.length > 0 ? (
          <div className="sitemap-grid">
            {groups.map((group) => (
              <section
                className="sitemap-group"
                key={group.title}
                aria-labelledby={`sitemap-group-${group.index}`}
              >
                <h3 id={`sitemap-group-${group.index}`}>
                  <span aria-hidden="true">
                    {String(group.index + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>
                        <span>{link.label}</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </a>
                      {link.children && (
                        <ul>
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <a href={child.href}>{child.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="sitemap-empty">
            <Search size={32} aria-hidden="true" />
            <h3>No pages match your search.</h3>
            <p>Try a page name, department, or another topic.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
              }}
            >
              Show all pages <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>

      <section
        className="sitemap-help"
        style={{
          backgroundImage: `linear-gradient(100deg,#032a23 25%,#032a23e6 54%,#032a2333 100%),url(${assetPath("assets/approach-mountains.png")})`,
        }}
        aria-labelledby="sitemap-help-title"
      >
        <div className="sitemap-container">
          <div>
            <p className="sitemap-eyebrow">Need More Information?</p>
            <h2 id="sitemap-help-title">Can’t find what you’re looking for?</h2>
            <p>
              If you need further assistance or have specific enquiries, our
              team is ready to help.
            </p>
          </div>
          <a href={assetPath("contact.html")}>
            Contact Us <ArrowRight size={19} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Download,
  FileText,
  Mail,
  Search,
  X,
} from "lucide-react";
import {
  annualReports,
  featuredReport,
  filterAnnualReports,
  reportsSource,
  type AnnualReport,
} from "../data/reports";
import { site } from "../data/site";
import { assetPath } from "../lib/assets";
import "./AnnualReportsPage.css";

function requestReport(year: number) {
  return `mailto:${site.email}?subject=${encodeURIComponent(`Request for ${year} SDMP Annual Accomplishment Report`)}`;
}

function ReportActions({
  report,
  primary = false,
}: {
  report: AnnualReport;
  primary?: boolean;
}) {
  if (!report.pdf) {
    return (
      <div className="report-actions">
        <a
          href={requestReport(report.year)}
          className={primary ? "reports-button" : "reports-text-link"}
          aria-label={`Request the ${report.year} report by email`}
        >
          <Mail size={17} aria-hidden="true" />
          Request Report <ArrowRight size={16} aria-hidden="true" />
        </a>
        {primary && (
          <a
            href="#report-archive"
            className="reports-button reports-button--outline"
          >
            Browse Archive <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="report-actions">
      <a
        href={report.pdf}
        target="_blank"
        rel="noreferrer"
        className={primary ? "reports-button" : "reports-text-link"}
        aria-label={`View ${report.year} SDMP report`}
      >
        <FileText size={17} aria-hidden="true" />
        View Report <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        href={report.pdf}
        download={`PMC-SDMP-Annual-Report-${report.year}.pdf`}
        className={
          primary
            ? "reports-button reports-button--outline"
            : "reports-text-link"
        }
        aria-label={`Download ${report.year} SDMP report PDF`}
      >
        <Download size={17} aria-hidden="true" />
        Download PDF
      </a>
    </div>
  );
}

function ReportBook() {
  return (
    <figure className="reports-book-scene">
      <div
        className="reports-book"
        role="img"
        aria-label={`Illustrative cover for the ${featuredReport.year} SDMP Annual Accomplishment Report`}
      >
        <div className="reports-book__spine" />
        <div className="reports-book__front">
          <img
            className="reports-book__logo"
            src={assetPath("assets/pmc-logo.png")}
            alt=""
          />
          <div className="reports-book__title">
            <strong>SDMP</strong>
            <span>
              Annual Accomplishment
              <br />
              Report
            </span>
            <b>{featuredReport.year}</b>
          </div>
          <img
            className="reports-book__photo"
            src={assetPath("assets/approach-planting.png")}
            alt=""
          />
          <div className="reports-book__gold" />
          <p>
            Social Development
            <br />& Management Program
          </p>
        </div>
      </div>
      {/* {!featuredReport.available && (
        <figcaption>Illustrative cover · PDF currently unavailable</figcaption>
      )} */}
    </figure>
  );
}

export function AnnualReportsPage() {
  const [year, setYear] = useState("");
  const [query, setQuery] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const results = filterAnnualReports(year, query, availableOnly);
  const recent = results.filter((report) => report.year >= 2022);
  const legacy = results.filter((report) => report.year <= 2021);
  const midpoint = Math.ceil(legacy.length / 2);
  const hasFilters = Boolean(year || query || availableOnly);

  function clearFilters() {
    setYear("");
    setQuery("");
    setAvailableOnly(false);
  }

  return (
    <div className="annual-reports-page">
      <section className="reports-banner" aria-labelledby="reports-title">
        <img
          src={assetPath("assets/loading-truck.png")}
          alt="Philsaga mine headframe and operations surrounded by forested hills"
          fetchPriority="high"
        />
        <div className="reports-banner__shade" aria-hidden="true" />
        <div className="reports-banner__ribbon" aria-hidden="true" />
        <div className="reports-container reports-banner__content">
          <p className="reports-eyebrow">Publications / SDMP</p>
          <h1 id="reports-title">
            Annual
            <br />
            Accomplishment
            <br />
            Reports
          </h1>
          <p>
            Discover the progress, partnerships, and community initiatives
            documented through our Social Development & Management Program.
          </p>
        </div>
      </section>

      <section
        className="reports-feature"
        aria-labelledby="latest-report-title"
      >
        <div className="reports-feature__landscape">
          <img src={assetPath("assets/sdmp-forest-bg.png")} alt="" />
          <div />
        </div>
        <div className="reports-container reports-feature__layout">
          <div className="reports-feature__copy">
            <p className="reports-eyebrow">
              {featuredReport.available
                ? "Latest Available Report"
                : "Latest Report Listing"}
            </p>
            <p className="reports-feature__year">{featuredReport.year}</p>
            <h2 id="latest-report-title">
              SDMP Annual
              <br />
              Accomplishment Report
            </h2>
            <p>
              Explore our Social Development & Management Program and the
              partnerships that support sustainable progress in our host and
              neighboring communities.
            </p>
            <p className="reports-feature__period">
              Reporting period: January 1 – December 31, {featuredReport.year}
            </p>
            {!featuredReport.available && (
              <p className="reports-availability">
                The {featuredReport.year} report is listed in the official
                archive, but its PDF is currently unavailable online. Contact us
                to request a copy.
              </p>
            )}
            <ReportActions report={featuredReport} primary />
          </div>
          <ReportBook />
        </div>
      </section>

      <section
        id="report-archive"
        className="reports-archive reports-container"
        aria-labelledby="archive-title"
      >
        <div className="reports-archive__heading">
          <div>
            <p className="reports-eyebrow">Explore the Archive</p>
            <h2 id="archive-title">Past Reports</h2>
            <p>
              Browse our SDMP Annual Accomplishment Reports and explore our
              commitment to host communities and sustainable development through
              the years.
            </p>
          </div>
          <div className="reports-filters">
            <div className="reports-filters__fields">
              <label>
                <span className="sr-only">Filter reports by year</span>
                <select
                  value={year}
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                >
                  <option value="">All Years</option>
                  {annualReports
                    .filter((report) => report.year !== featuredReport.year)
                    .map((report) => (
                      <option value={report.year} key={report.year}>
                        {report.year}
                      </option>
                    ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </label>
              <label className="reports-filters__search">
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search reports</span>
                <input
                  type="search"
                  placeholder="Search reports by year…"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </label>
            </div>
            <div className="reports-filters__options">
              <label>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(event) => {
                    setAvailableOnly(event.target.checked);
                  }}
                />
                Available PDFs only
              </label>
              {hasFilters && (
                <button type="button" onClick={clearFilters}>
                  Clear filters <X size={13} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {results.length} {results.length === 1 ? "report" : "reports"} found
          {availableOnly ? " with available PDFs" : ""}.
        </p>
        {recent.length > 0 && (
          <div className="reports-recent">
            {recent.map((report) => (
              <article key={report.year} className="report-card">
                <img src={report.image} alt={report.imageAlt} loading="lazy" />
                <div>
                  <p className="report-card__year">{report.year}</p>
                  <h3>
                    SDMP Annual
                    <br />
                    Accomplishment Report
                  </h3>
                  <p>
                    Reporting period: January 1 – December 31, {report.year}.
                  </p>
                  <span className="report-card__availability">
                    PDF currently unavailable
                  </span>
                  <ReportActions report={report} />
                </div>
              </article>
            ))}
          </div>
        )}
        {legacy.length > 0 && (
          <div className="reports-complete">
            <div className="reports-complete__heading">
              <span aria-hidden="true" />
              <h3>Complete Archive</h3>
            </div>
            <p>View and download available reports from 2009 to 2021.</p>
            <div className="reports-complete__columns">
              {[legacy.slice(0, midpoint), legacy.slice(midpoint)]
                .filter((group) => group.length > 0)
                .map((group) => (
                  <ul key={group[0].year}>
                    {group.map((report) => (
                      <li key={report.year} className="report-row">
                        <a
                          href={report.pdf!}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${report.year} SDMP report`}
                        >
                          <FileText size={18} aria-hidden="true" />
                          <strong>{report.year}</strong>
                          <span>SDMP Annual Accomplishment Report</span>
                          <ArrowRight size={16} aria-hidden="true" />
                        </a>
                        <a
                          href={report.pdf!}
                          download={`PMC-SDMP-Annual-Report-${report.year}.pdf`}
                          aria-label={`Download ${report.year} SDMP report PDF`}
                          className="report-row__download"
                        >
                          <Download size={16} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
            </div>
          </div>
        )}
        {results.length === 0 && (
          <div className="reports-empty">
            <Search size={30} aria-hidden="true" />
            <h3>No reports match your search.</h3>
            <p>Try a different year or clear your filters.</p>
            <button type="button" onClick={clearFilters}>
              Show all reports <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="reports-source">
          Archive years follow{" "}
          <a href={reportsSource} target="_blank" rel="noreferrer">
            Philsaga’s published report directory
          </a>
          . PDF availability checked October 26, 2026.
        </p>
      </section>

      <section
        className="reports-commitment"
        aria-labelledby="reports-commitment-title"
      >
        <img
          src={assetPath("assets/article-manobo.jpg")}
          alt="Philsaga and community representatives at a community development project groundbreaking"
          loading="lazy"
        />
        <div className="reports-commitment__panel" aria-hidden="true" />
        <div className="reports-container reports-commitment__content">
          <p className="reports-eyebrow">Our Commitment</p>
          <h2 id="reports-commitment-title">
            Progress is a<br />
            shared responsibility.
          </h2>
          <p>
            Through our Social Development & Management Program, we work hand in
            hand with our host communities to create lasting positive change.
          </p>
          <a href={assetPath("#community")} className="reports-button">
            Explore Our Community Programs{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  ChartNoAxesCombined,
  ChevronDown,
  HardHat,
  HeartHandshake,
  Search,
  Settings,
  ShieldCheck,
  Sprout,
  Users,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../components/ui/dialog";
import {
  careerJobs,
  careersSource,
  emptyCareerFilters,
  filterCareerJobs,
  type CareerFilters,
  type CareerJob,
} from "../data/careers";
import { assetPath } from "../lib/assets";
import "./CareersPage.css";

const benefits = [
  {
    title: "Meaningful Work",
    description: "Contribute to projects that create lasting positive impact.",
    icon: Users,
  },
  {
    title: "Career Growth",
    description: "Opportunities to learn, lead, and advance.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Health & Safety",
    description: "A shared commitment to a safe and supportive workplace.",
    icon: ShieldCheck,
  },
  {
    title: "Community Impact",
    description: "Be part of initiatives that uplift local communities.",
    icon: Sprout,
  },
  {
    title: "People First",
    description: "Bring your talent, dedication, and ideas to our team.",
    icon: Award,
  },
];

const filterOptions = [
  { key: "department", label: "Department", placeholder: "All Departments" },
  { key: "location", label: "Location", placeholder: "All Locations" },
  {
    key: "experience",
    label: "Experience level",
    placeholder: "All Experience Levels",
  },
] as const;

const pageSize = 3;

export function CareersPage() {
  const [draftFilters, setDraftFilters] =
    useState<CareerFilters>(emptyCareerFilters);
  const [filters, setFilters] = useState<CareerFilters>(emptyCareerFilters);
  const [page, setPage] = useState(0);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const results = filterCareerJobs(filters);
  const visibleJobs = results.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(results.length / pageSize);
  const hasFilters = Object.values(filters).some((value) => value !== "");

  function searchJobs(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilters({ ...draftFilters });
    setPage(0);
  }

  function clearFilters() {
    setDraftFilters(emptyCareerFilters);
    setFilters(emptyCareerFilters);
    setPage(0);
  }

  return (
    <div className="careers-page">
      <section className="careers-banner" aria-labelledby="careers-title">
        <img
          src={assetPath("assets/careers-team.png")}
          alt="Two Philsaga team members overlooking the processing plant at sunrise"
          fetchPriority="high"
        />
        <div className="careers-banner__shade" aria-hidden="true" />
        <div className="careers-contours" aria-hidden="true" />
        <div className="careers-container careers-banner__content">
          <p className="careers-eyebrow">Careers at PMC</p>
          <h1 id="careers-title">
            Build a Meaningful
            <br />
            Career with Us
          </h1>
          <p>
            Be part of a team that powers progress. At PMC, you’ll grow your
            skills, make a real impact, and help build a more sustainable future
            for our people and communities.
          </p>
          <a href="#open-positions" className="careers-button">
            View Open Positions <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="careers-why careers-container"
        aria-labelledby="careers-why-title"
      >
        <div className="careers-why__intro">
          <p className="careers-eyebrow">Why Join PMC</p>
          <h2 id="careers-why-title">
            More Than a Job.
            <br />A Bigger Purpose.
          </h2>
          <p>
            We invest in our people. When you grow, our communities and the
            country grow, too.
          </p>
        </div>
        <div className="careers-benefits">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article key={title}>
              <span className="careers-icon">
                <Icon aria-hidden="true" strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="open-positions"
        className="careers-openings careers-container"
        aria-labelledby="positions-title"
      >
        <form
          className="careers-filters"
          aria-label="Search jobs"
          onSubmit={searchJobs}
        >
          <label className="careers-filters__search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search jobs</span>
            <input
              type="search"
              placeholder="Search jobs (e.g. engineer, nurse)"
              value={draftFilters.query}
              onChange={(event) => {
                setDraftFilters({ ...draftFilters, query: event.target.value });
              }}
            />
          </label>
          {filterOptions.map(({ key, label, placeholder }) => (
            <label className="careers-filters__select" key={key}>
              <span className="sr-only">{label}</span>
              <select
                value={draftFilters[key]}
                onChange={(event) => {
                  setDraftFilters({
                    ...draftFilters,
                    [key]: event.target.value,
                  });
                }}
              >
                <option value="">{placeholder}</option>
                {[...new Set(careerJobs.map((job) => job[key]))]
                  .sort()
                  .map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </label>
          ))}
          <button className="careers-button careers-button--dark" type="submit">
            Search Jobs <ArrowRight size={17} aria-hidden="true" />
          </button>
          {hasFilters && (
            <button
              type="button"
              className="careers-clear"
              onClick={clearFilters}
            >
              Clear filters <X size={14} aria-hidden="true" />
            </button>
          )}
        </form>
        <div className="careers-results">
          <div className="careers-results__heading">
            <div>
              <p className="careers-eyebrow">Open Positions</p>
              <h2 id="positions-title">Join Our Team</h2>
            </div>
            <p role="status" aria-live="polite">
              {results.length > 0
                ? `Showing ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, results.length)} of ${results.length} positions`
                : "No matching positions"}
            </p>
          </div>
          <div className="careers-job-list">
            {visibleJobs.map((job) => {
              const Icon =
                job.department === "Health Services"
                  ? HeartHandshake
                  : job.department === "Operations"
                    ? HardHat
                    : Settings;
              return (
                <article key={job.id} className="careers-job">
                  <span className="careers-icon">
                    <Icon aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <div className="careers-job__title">
                    <h3>{job.title}</h3>
                    <p>
                      {job.department}
                      <span aria-hidden="true">|</span>
                      {job.location === "Not specified"
                        ? "Location not listed"
                        : job.location}
                    </p>
                  </div>
                  <p className="careers-job__summary">{job.summary}</p>
                  <button
                    type="button"
                    className="careers-job__details"
                    aria-label={`View details for ${job.title}`}
                    onClick={() => {
                      setSelectedJob(job);
                    }}
                  >
                    View Details <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
            {results.length === 0 && (
              <div className="careers-empty">
                <Search size={28} aria-hidden="true" />
                <h3>No positions match your search.</h3>
                <p>Try a different keyword or broaden your filters.</p>
                <button type="button" onClick={clearFilters}>
                  Show all positions <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          {pageCount > 1 && (
            <nav className="careers-pagination" aria-label="Job results pages">
              <button
                type="button"
                aria-label="Previous job results"
                disabled={page === 0}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <span>
                Page {page + 1} of {pageCount}
              </span>
              <button
                type="button"
                aria-label="Next job results"
                disabled={page + 1 === pageCount}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
          <p className="careers-source">
            Listings from{" "}
            <a href={careersSource} target="_blank" rel="noreferrer">
              PMC’s official careers page
            </a>
            . Availability and full requirements are confirmed there.
          </p>
        </div>
      </section>

      <section
        className="careers-future"
        aria-labelledby="careers-future-title"
      >
        <img
          src={assetPath("assets/careers-future.png")}
          alt="Philsaga employee looking toward the plant and forested mountains"
          loading="lazy"
        />
        <div className="careers-future__panel" aria-hidden="true" />
        <div className="careers-container careers-future__content">
          <div>
            <p className="careers-eyebrow">Our People</p>
            <h2 id="careers-future-title">
              Help Shape a Stronger,
              <br />
              Brighter Tomorrow.
            </h2>
            <p>
              Join PMC and be part of a team that values people, protects the
              environment, and builds opportunities for generations to come.
            </p>
          </div>
          <a className="careers-button" href="#open-positions">
            Explore Opportunities <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <Dialog
        open={selectedJob !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedJob(null);
          }
        }}
      >
        <DialogContent className="careers-job-dialog max-w-2xl rounded-xl bg-[#faf8f3] p-7 sm:p-10">
          {selectedJob && (
            <>
              <p className="careers-eyebrow">Careers at PMC</p>
              <DialogTitle className="mt-5 pr-7 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {selectedJob.title}
              </DialogTitle>
              <DialogDescription className="mt-4 text-base leading-7 text-[#5d6b6b]">
                {selectedJob.summary}
              </DialogDescription>
              <dl className="careers-job-dialog__facts">
                <div>
                  <dt>Department</dt>
                  <dd>{selectedJob.department}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{selectedJob.location}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{selectedJob.experience}</dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-6 text-[#5d6b6b]">
                Read the complete requirements and select this position on the
                official careers page to submit your application.
              </p>
              <a
                href={careersSource}
                className="careers-button"
                target="_blank"
                rel="noreferrer"
              >
                Continue to Application{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

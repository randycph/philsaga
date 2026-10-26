import { useRef, useState } from "react";
import {
  Ambulance,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  FlaskConical,
  Heart,
  Image as ImageIcon,
  MapPin,
  Phone,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  filterHospitalRates,
  formatHospitalRate,
  hospitalCategories,
  hospitalInfo,
  type HospitalDepartment,
} from "../data/hospital";
import { site } from "../data/site";
import { assetPath } from "../lib/assets";
import "./HospitalPage.css";

const serviceCards = [
  {
    title: "Emergency Care",
    description:
      "Emergency medical services for employees and the surrounding communities.",
    icon: Ambulance,
  },
  {
    title: "X-ray & Imaging",
    description:
      "Diagnostic imaging services to support assessment and treatment.",
    icon: ImageIcon,
  },
  {
    title: "Clinical Laboratory",
    description:
      "Laboratory testing across hematology, chemistry, and immunology.",
    icon: FlaskConical,
  },
  {
    title: "Preventive Care",
    description:
      "Health education, preventive programs, and community outreach.",
    icon: Heart,
  },
];

const departments = [
  { id: "xray", label: "X-ray Procedures", icon: ImageIcon },
  { id: "laboratory", label: "Clinical Laboratory", icon: FlaskConical },
] as const;

const pageSize = 8;

export function HospitalPage() {
  const [department, setDepartment] = useState<HospitalDepartment>("xray");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const departmentTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const results = filterHospitalRates(department, category, query);
  const visibleRows = results.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(results.length / pageSize);
  const categories = hospitalCategories(department);
  const allLabel =
    department === "xray" ? "All X-ray Procedures" : "All Laboratory Tests";
  const selectedCategory =
    categories.find((item) => item.id === category)?.category || allLabel;

  function selectDepartment(value: HospitalDepartment) {
    setDepartment(value);
    setCategory("");
    setQuery("");
    setPage(0);
  }

  function selectCategory(value: string) {
    setCategory(value);
    setPage(0);
  }

  function clearSearch() {
    setCategory("");
    setQuery("");
    setPage(0);
  }

  return (
    <div className="hospital-page">
      <section className="hospital-banner" aria-labelledby="hospital-title">
        <img
          src={assetPath("assets/hospital-slide-7.png")}
          alt="Philsaga Mining Hospital healthcare team caring for a young patient"
          fetchPriority="high"
        />
        <div className="hospital-banner__panel" aria-hidden="true" />
        <div className="hospital-container hospital-banner__content">
          <p className="hospital-eyebrow">Philsaga Mining Hospital</p>
          <h1 id="hospital-title">
            Care That
            <br />
            Goes Beyond.
          </h1>
          <p>
            Providing quality and accessible healthcare services to our
            employees, their families, and the surrounding communities of Agusan
            del Sur.
          </p>
          <a href="#hospital-services" className="hospital-button">
            Explore Our Services <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="hospital-intro"
        aria-labelledby="hospital-intro-title"
      >
        <div className="hospital-container hospital-intro__layout">
          <div className="hospital-intro__copy">
            <p className="hospital-eyebrow">Our Hospital</p>
            <h2 id="hospital-intro-title">
              Compassionate Care,
              <br />
              Close to Home.
            </h2>
            <p>
              Philsaga Mining Hospital supports the health and well-being of
              employees, their families, and the communities around our
              operations in Agusan del Sur.
            </p>
            <p>
              Our care extends from emergency and preventive services to
              community health education and outreach.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="hospital-button">
                  Learn More About Our Hospital{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl rounded-xl bg-[#faf8f3]">
                <DialogTitle className="pr-8 text-2xl font-semibold tracking-tight">
                  Hospital Services Guide
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-6 text-[#68766f]">
                  Read the hospital’s published guide to outpatient care,
                  laboratory services, and community health programs.
                </DialogDescription>
                <a
                  className="hospital-guide"
                  href={assetPath("assets/hospital-services.jpg")}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={assetPath("assets/hospital-services.jpg")}
                    alt="Philsaga Mining Hospital’s published medical services guide"
                  />
                  <span>
                    Open full-size service guide{" "}
                    <ExternalLink size={15} aria-hidden="true" />
                  </span>
                </a>
              </DialogContent>
            </Dialog>
          </div>
          <div className="hospital-intro__photo">
            <img
              src={assetPath("assets/hospital-slide-3.png")}
              alt="A healthcare professional checking an employee’s blood pressure"
              loading="lazy"
            />
            <span aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        id="hospital-services"
        className="hospital-services"
        aria-labelledby="hospital-services-title"
      >
        <div className="hospital-container hospital-services__heading">
          <div>
            <p className="hospital-eyebrow">Medical Services</p>
            <h2 id="hospital-services-title">
              Comprehensive Healthcare
              <br />
              for Our People and Communities
            </h2>
            <p>
              Medical services designed to support the health needs of our
              employees, their families, and our neighboring communities.
            </p>
          </div>
          <div className="hospital-services__photo">
            <img
              src={assetPath("assets/hospital-slide-1.png")}
              alt="A laboratory professional using a microscope at Philsaga Mining Hospital"
              loading="lazy"
            />
          </div>
        </div>
        <div className="hospital-container hospital-service-cards">
          {serviceCards.map(({ title, description, icon: Icon }) => (
            <article key={title}>
              <span>
                <Icon aria-hidden="true" strokeWidth={1.6} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="hospital-rates"
        className="hospital-rates hospital-container"
        aria-labelledby="hospital-rates-title"
      >
        <p className="hospital-eyebrow">Procedures & Fees</p>
        <h2 id="hospital-rates-title">Procedures & Laboratory Rates</h2>
        <p className="hospital-rates__intro">
          Browse our X-ray and Clinical Laboratory services and their published
          rates.
        </p>
        <div className="hospital-rates__toolbar">
          <div
            className="hospital-departments"
            role="tablist"
            aria-label="Medical procedure departments"
          >
            {departments.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                id={`hospital-tab-${id}`}
                ref={(element) => {
                  departmentTabs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={department === id}
                aria-controls="hospital-rate-panel"
                tabIndex={department === id ? 0 : -1}
                onClick={() => {
                  selectDepartment(id);
                }}
                onKeyDown={(event) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const target =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 1
                          : 1 - index;
                    selectDepartment(departments[target].id);
                    departmentTabs.current[target]?.focus();
                  }
                }}
              >
                <Icon size={26} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <label className="hospital-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search procedures</span>
            <input
              type="search"
              placeholder="Search procedures…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
            />
          </label>
        </div>
        <div
          id="hospital-rate-panel"
          role="tabpanel"
          aria-labelledby={`hospital-tab-${department}`}
          className="hospital-rate-panel"
        >
          <div
            className="hospital-rate-categories"
            role="group"
            aria-label="Procedure categories"
          >
            <button
              type="button"
              aria-pressed={category === ""}
              onClick={() => {
                selectCategory("");
              }}
            >
              {allLabel}
            </button>
            {categories.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={category === item.id}
                onClick={() => {
                  selectCategory(item.id);
                }}
              >
                {item.category}
              </button>
            ))}
          </div>
          <div className="hospital-rate-results">
            <label className="hospital-mobile-category">
              <span>Procedure category</span>
              <span>
                <select
                  value={category}
                  onChange={(event) => {
                    selectCategory(event.target.value);
                  }}
                >
                  <option value="">{allLabel}</option>
                  {categories.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.category}
                    </option>
                  ))}
                </select>
                <ChevronDown size={17} aria-hidden="true" />
              </span>
            </label>
            <div className="hospital-rate-results__heading">
              <h3>{selectedCategory}</h3>
              {(query || category) && (
                <button type="button" onClick={clearSearch}>
                  Clear filters <X size={13} aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {results.length}{" "}
              {results.length === 1 ? "procedure" : "procedures"} found in{" "}
              {department === "xray"
                ? "X-ray Procedures"
                : "Clinical Laboratory"}
              .
            </p>
            {results.length > 0 ? (
              <>
                <table className="hospital-rate-table">
                  <caption className="sr-only">
                    {selectedCategory}: published procedure rates in Philippine
                    pesos
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Procedure</th>
                      <th scope="col">Rate (PHP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((procedure) => (
                      <tr key={`${procedure.category}-${procedure.name}`}>
                        <td>{procedure.name}</td>
                        <td>{formatHospitalRate(procedure.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="hospital-table-footer">
                  <span>
                    Showing {page * pageSize + 1}–
                    {Math.min((page + 1) * pageSize, results.length)} of{" "}
                    {results.length} procedures
                  </span>
                  {pageCount > 1 && (
                    <nav aria-label="Procedure result pages">
                      <button
                        type="button"
                        aria-label="Previous procedures"
                        disabled={page === 0}
                        onClick={() => {
                          setPage(page - 1);
                        }}
                      >
                        <ArrowLeft size={15} aria-hidden="true" />
                      </button>
                      <span>
                        {page + 1} / {pageCount}
                      </span>
                      <button
                        type="button"
                        aria-label="Next procedures"
                        disabled={page + 1 === pageCount}
                        onClick={() => {
                          setPage(page + 1);
                        }}
                      >
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </div>
              </>
            ) : (
              <div className="hospital-empty">
                <Search size={28} aria-hidden="true" />
                <h4>No procedures match your search.</h4>
                <p>Try another procedure name or clear the filters.</p>
                <button type="button" onClick={clearSearch}>
                  Show all procedures{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="hospital-lab-callout">
          <img
            src={assetPath("assets/hospital-slide-1.png")}
            alt=""
            loading="lazy"
          />
          <div>
            <h3>
              {department === "xray"
                ? "View Clinical Laboratory Rates"
                : "View X-ray Procedure Rates"}
            </h3>
            <p>
              Explore the complete list of{" "}
              {department === "xray" ? "laboratory tests" : "X-ray procedures"}{" "}
              and published rates.
            </p>
          </div>
          <a
            href="#hospital-rates"
            onClick={() => {
              selectDepartment(department === "xray" ? "laboratory" : "xray");
            }}
          >
            Go to {department === "xray" ? "Laboratory" : "X-ray"} Rates{" "}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <p className="hospital-rate-source">
          Rates from the{" "}
          <a href={hospitalInfo.source} target="_blank" rel="noreferrer">
            official hospital price list
          </a>
          , checked {hospitalInfo.checkedOn}. Confirm current rates and service
          availability with the hospital.
        </p>
      </section>

      <section
        className="hospital-outreach"
        aria-labelledby="hospital-outreach-title"
      >
        <div className="hospital-outreach__photo">
          <img
            src={assetPath("assets/article-health.jpg")}
            alt="Community health workers receiving medicines and medical equipment from MMPRC"
            loading="lazy"
          />
        </div>
        <div className="hospital-container hospital-outreach__layout">
          <div>
            <p className="hospital-eyebrow">Community Outreach</p>
            <h2 id="hospital-outreach-title">
              Healthier People.
              <br />
              Stronger Communities.
            </h2>
            <p>
              Our commitment reaches beyond clinical care. Community outreach
              and health education help support healthier, more resilient
              communities in Agusan del Sur.
            </p>
            <a href={assetPath("#community")} className="hospital-button">
              Our Community Programs <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        className="hospital-visit"
        aria-labelledby="hospital-visit-title"
      >
        <img
          src={assetPath("assets/hospital-slide-3.png")}
          alt="Healthcare consultation at Philsaga Mining Hospital"
          loading="lazy"
        />
        <div className="hospital-visit__panel" aria-hidden="true" />
        <div className="hospital-container hospital-visit__content">
          <p className="hospital-eyebrow">Visit Our Hospital</p>
          <h2 id="hospital-visit-title">Philsaga Mining Hospital</h2>
          <p className="hospital-visit__location">
            <MapPin size={21} aria-hidden="true" />
            {hospitalInfo.location}
          </p>
          <p>
            Supporting our employees, their families, and the surrounding
            communities with compassionate care and a commitment to well-being.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="hospital-button">
                Contact the Hospital <ArrowRight size={17} aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-xl bg-[#faf8f3] p-7 sm:p-10">
              <DialogTitle className="pr-8 text-2xl font-semibold tracking-tight">
                Contact Philsaga Mining Hospital
              </DialogTitle>
              <DialogDescription className="mt-4 text-sm leading-7 text-[#68766f]">
                For hospital enquiries, use the company contact below and ask to
                be connected to Philsaga Mining Hospital.
              </DialogDescription>
              <div className="hospital-contact-details">
                <p>
                  <MapPin aria-hidden="true" />
                  {hospitalInfo.location}
                </p>
                <a href={site.phoneHref}>
                  <Phone aria-hidden="true" />
                  <span>
                    <small>Company contact</small>
                    {site.phone}
                  </span>
                </a>
                <a href={hospitalInfo.source} target="_blank" rel="noreferrer">
                  <ExternalLink aria-hidden="true" />
                  Official hospital page
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}

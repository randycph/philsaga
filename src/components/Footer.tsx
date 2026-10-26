import { ChevronRight, ChevronUp, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { uiCopy } from "../data/ui";
import { assetPath } from "./Shared";
import { footerLegalLinks, footerLinks, site } from "../data/site";

const footerLinkGroups = [
  footerLinks.slice(0, 3),
  [
    ...footerLinks.slice(3, 5),
    { label: "Sustainability", href: "#sustainability" },
  ],
  [
    ...footerLinks.slice(5),
    { label: "News", href: assetPath("articles.html") },
    { label: "Annual Reports", href: assetPath("annual-reports.html") },
    { label: "Hospital", href: assetPath("hospital.html") },
    { label: "Contact", href: assetPath("contact.html") },
  ],
];

export function Footer({ interiorPage = false }: { interiorPage?: boolean }) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  function resolveLink(href: string) {
    if (interiorPage && href.startsWith("#") && href !== "#contact") {
      return assetPath(href);
    }

    return href;
  }

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setShowScrollToTop(
        scrollableHeight > 0 && window.scrollY / scrollableHeight > 0.5,
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const resizeObserver = new ResizeObserver(updateVisibility);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__main">
        <a
          href={resolveLink(uiCopy.home)}
          aria-label={uiCopy.philsagaMiningCorporationHome}
        >
          <img src={assetPath("assets/pmc-logo.png")} alt="PMC" />
          <span>
            A Socially Responsible &
            <br />
            Environment Friendly Company
          </span>
        </a>
        <div className="site-footer__socials">
          <a href={site.facebook} aria-label="Facebook">
            <FaFacebookF aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@PhilsagaMiningCorporation"
            aria-label="YouTube"
          >
            <FaYoutube aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/company/philsaga-mining-corporation/"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </div>
      </div>
      <address className="site-footer__contact">
        <div className="flex items-center gap-2">
          <MapPin aria-hidden="true" className="w-4 h-4" />
          <span>{site.location}, Philippines</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone aria-hidden="true" className="w-4 h-4" />
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
        <div className="flex items-center gap-2">
          <Mail aria-hidden="true" className="w-4 h-4" />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </address>
      <nav className="site-footer__links" aria-label={uiCopy.footerNavigation}>
        {footerLinkGroups.map((links) => (
          <ul key={links[0].label}>
            {links.map((link) => (
              <li key={link.label}>
                <a href={resolveLink(link.href)}>
                  <ChevronRight aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </nav>
      <div className="site-footer__legal">
        <div className="site-footer__copyright">
          <p>{site.copyright}</p>
          <nav aria-label="Legal">
            {footerLegalLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
            <a href={assetPath("sitemap.html")}>Sitemap</a>
          </nav>
        </div>
        <p className="site-footer__credit">
          Developed by{" "}
          <a href="https://www.webfocus.ph" target="_blank" rel="noreferrer">
            Webfocus Solutions Inc
          </a>
        </p>
      </div>
      {showScrollToTop && (
        <a
          href={interiorPage ? "#main" : uiCopy.home}
          data-scroll-to-top
          className="site-footer__back-to-top"
          aria-label="Scroll to top"
        >
          <ChevronUp aria-hidden="true" />
        </a>
      )}
    </footer>
  );
}

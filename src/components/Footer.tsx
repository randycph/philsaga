import { ChevronRight, ChevronUp } from "lucide-react";
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
    { label: "News", href: "https://www.philsaga.com/news" },
    { label: "Contact", href: "#contact" },
  ],
];

export function Footer() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
        <a href={uiCopy.home} aria-label={uiCopy.philsagaMiningCorporationHome}>
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
        <span>{site.location}, Philippines</span>
        <a href={site.phoneHref}>{site.phone}</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>
      <nav className="site-footer__links" aria-label={uiCopy.footerNavigation}>
        {footerLinkGroups.map((links) => (
          <ul key={links[0].label}>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>
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
            <a href="https://www.philsaga.com/sitemap">Sitemap</a>
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
          href={uiCopy.home}
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

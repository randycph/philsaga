import { Facebook, Linkedin, Youtube } from "lucide-react";
import { uiCopy } from "../data/ui";
import { footerLegalLinks, site } from "../data/site";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__main">
        <a href={uiCopy.home} aria-label={uiCopy.philsagaMiningCorporationHome}>
          <img src="/assets/pmc-logo.png" alt="PMC" />
          <span>
            A Socially Responsible &
            <br />
            Environment Friendly Company
          </span>
        </a>
        <nav aria-label={uiCopy.footerNavigation}>
          <a href={uiCopy.about}>About</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#community">Programs</a>
          <a href="https://www.philsaga.com/news">News</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="site-footer__socials">
          <a href={site.facebook} aria-label="Facebook">
            <Facebook />
          </a>
          <a
            href="https://www.youtube.com/@PhilsagaMiningCorporation"
            aria-label="YouTube"
          >
            <Youtube />
          </a>
          <a
            href="https://www.linkedin.com/company/philsaga-mining-corporation/"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>
      </div>
      <div className="site-footer__legal">
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
    </footer>
  );
}

import { uiCopy } from "../data/ui";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { copy, faqs, footerLinks, footerLegalLinks, site } from "../data/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { container, heading } from "./Shared";

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="footer-heading"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/10"
    >
      <img
        src="/assets/foot-bg.png"
        alt={uiCopy.aerialViewOfThePhilsagaProcessingPlant}
        width={2300}
        height={479}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-background/85" />
      <div className={`${container} relative py-20 md:py-24`}>
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/15 pb-12">
          <h2 id="footer-heading" className={`${heading} max-w-2xl`}>
            {copy.footerHeading}
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-background hover:bg-orange-300"
          >
            {uiCopy.getInTouch}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="grid gap-12 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <a
              href={uiCopy.home}
              aria-label={uiCopy.philsagaMiningCorporationHome}
            >
              <img
                src="/assets/logo_2xb.png"
                alt={uiCopy.pmcAndMmprcASociallyResponsibleAndEnvironment}
                width={1030}
                height={147}
                loading="lazy"
                className="w-full max-w-sm rounded bg-white p-2"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-muted-foreground">
              {site.tagline}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" />
              {site.location}
            </p>
          </div>
          <nav
            aria-label={uiCopy.footerNavigation}
            className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="space-y-5">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 text-sm"
            >
              <Phone className="size-4 text-primary" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-sm"
            >
              <Mail className="size-4 text-primary" />
              {site.email}
            </a>
            <div className="flex items-center gap-5">
              <img
                src="/assets/ISO-LOGO.png"
                alt={uiCopy.iso140012015CertifiedByCertificationInternational}
                width={391}
                height={390}
                loading="lazy"
                className="size-20 rounded bg-white p-1"
              />
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded bg-paper p-2"
              >
                <img
                  src="/assets/fb9.png"
                  alt={uiCopy.followPhilsagaOnFacebook}
                  width={367}
                  height={102}
                  loading="lazy"
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-sm text-muted-foreground">
          <div>
            <p>{site.copyright}</p>
            <div className="mt-3 flex flex-wrap gap-4">
              {footerLegalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <nav aria-label={uiCopy.quickLinks} className="flex flex-wrap gap-5">
            <a href={uiCopy.home}>{uiCopy.home2}</a>
            <a href={uiCopy.about}>{uiCopy.aboutUs}</a>
            <a href={uiCopy.httpsWwwPhilsagaComCareers}>{uiCopy.careers}</a>
            <Dialog>
              <DialogTrigger className="hover:text-primary">
                {uiCopy.faqs}
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogTitle className="font-heading text-2xl">
                  {uiCopy.faqs}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">
                  {site.name}
                </DialogDescription>
                <div className="mt-6 space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-heading text-lg font-semibold">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base leading-[1.7] text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <a href={`mailto:${site.email}`}>{uiCopy.contact}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

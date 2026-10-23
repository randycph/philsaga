import { ChevronRight, ArrowUp, Mail } from "lucide-react";
import { uiCopy } from "../data/ui";
import { faqs, footerLinks, footerLegalLinks, site } from "../data/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const footerLinkColumns = [
  footerLinks.slice(0, 3),
  footerLinks.slice(3, 5),
  footerLinks.slice(5),
];

export function Footer() {
  return (
    <footer
      id="contact"
      aria-labelledby="footer-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#0b151b] text-[#f2eee7]"
    >
      <img
        src="/assets/foot-bg.png"
        alt=""
        aria-hidden="true"
        width={2300}
        height={479}
        loading="lazy"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div
        aria-hidden="true"
            className="absolute inset-0 bg-[#08151d]/45"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-5 border-b border-white/15 py-8 sm:flex-row sm:items-center sm:gap-6 md:py-10">
          <a
            href={uiCopy.home}
            aria-label={uiCopy.philsagaMiningCorporationHome}
            className="flex w-fit shrink-0 items-center gap-5"
          >
            <span className="block h-[66px] w-[88px] shrink-0">
              <img
                src="/assets/pmc-logo.png"
                alt="PMC logo"
                width={688}
                height={514}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="hidden h-16 border-l border-white/20 sm:block" />
          </a>
          <p
            id="footer-heading"
            className="max-w-2xl text-sm leading-6 text-white/90 sm:text-base"
          >
            <span className="font-semibold">A Socially Responsible &amp;</span>{" "}
            Environment Friendly Company
          </p>
        </div>

        <nav
          aria-label={uiCopy.footerNavigation}
          className="grid grid-cols-1 gap-x-12 gap-y-4 border-b border-white/15 py-8 text-sm sm:grid-cols-3 sm:py-10 md:gap-x-20 md:py-12"
        >
          {footerLinkColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex w-fit items-center gap-2.5 text-white/90 transition-colors hover:text-[#f5a623]"
                >
                  <ChevronRight className="size-3.5 text-[#f5a623] transition-transform group-hover:translate-x-0.5" />
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="relative border-t border-white/5 bg-black/20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-6 py-7 text-sm text-white/65 md:flex-row md:items-center md:px-12 lg:px-16 xl:px-20">
          <div className="space-y-2">
            <p>{site.copyright}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {footerLegalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  <a
                    href={link.href}
                    className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          <nav
            aria-label={uiCopy.quickLinks}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
          >
            <a href={uiCopy.home} className="hover:text-white">
              {uiCopy.home2}
            </a>
            <span aria-hidden="true">/</span>
            <a href={uiCopy.about} className="hover:text-white">
              {uiCopy.aboutUs}
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={uiCopy.httpsWwwPhilsagaComCareers}
              className="hover:text-white"
            >
              {uiCopy.careers}
            </a>
            <span aria-hidden="true">/</span>
            <Dialog>
              <DialogTrigger className="hover:text-white">
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
            <span aria-hidden="true">/</span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="size-3.5" />
              {uiCopy.contact}
            </a>
          </nav>

          <a
            href={uiCopy.home}
            aria-label="Back to top"
            className="absolute bottom-6 right-5 hidden size-10 items-center justify-center bg-black/35 text-white transition-colors hover:bg-[#f28c1b] sm:flex md:static md:shrink-0"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

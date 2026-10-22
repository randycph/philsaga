import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { copy, footerLinks, legalLinks, site } from "../data/site";
import { container, heading } from "./Shared";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="footer-heading" className="relative scroll-mt-28 overflow-hidden border-t border-white/10">
      <img src="/assets/foot-bg.png" alt="Aerial view of the Philsaga processing plant" width={2300} height={479} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-background/85" />
      <div className={`${container} relative py-20 md:py-24`}>
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/15 pb-12"><h2 id="footer-heading" className={`${heading} max-w-2xl`}>{copy.footerHeading}</h2><a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-lg bg-primary px-6 py-4 text-sm font-semibold text-background hover:bg-orange-300">Get in touch<ArrowUpRight className="size-4" /></a></div>
        <div className="grid gap-12 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div><a href="#home" aria-label="Philsaga Mining Corporation home"><img src="/assets/logo_2xb.png" alt="PMC and MMPRC: A Socially Responsible and Environment Friendly Company" width={1030} height={147} loading="lazy" className="w-full max-w-sm rounded bg-white p-2" /></a><p className="mt-5 max-w-xs text-sm leading-[1.8] text-muted-foreground">{site.tagline}</p><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" />{site.location}</p></div>
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">{footerLinks.map((link) => (<a key={link.label} href={link.href} className="text-white/80 hover:text-primary">{link.label}</a>))}</nav>
          <div className="space-y-5"><a href={site.phoneHref} className="flex items-center gap-3 text-sm"><Phone className="size-4 text-primary" />{site.phone}</a><a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm"><Mail className="size-4 text-primary" />{site.email}</a><div className="flex items-center gap-5"><img src="/assets/ISO-LOGO.png" alt="ISO 14001:2015 certified by Certification International" width={391} height={390} loading="lazy" className="size-20 rounded bg-white p-1" /><a href={site.facebook} target="_blank" rel="noreferrer" className="rounded bg-paper p-2"><img src="/assets/fb9.png" alt="Follow Philsaga on Facebook" width={367} height={102} loading="lazy" className="h-8 w-auto" /></a></div></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-sm text-muted-foreground"><div><p>{site.copyright}</p><div className="mt-3 flex flex-wrap gap-4">{legalLinks.slice(1).map((link) => (<a key={link.label} href={link.href} className="hover:text-primary">{link.label}</a>))}</div></div><nav aria-label="Quick links" className="flex flex-wrap gap-5"><a href="#home">Home</a><a href="#about">About Us</a><a href="https://www.philsaga.com/careers">Careers</a><a href="https://www.philsaga.com/contact">FAQs</a><a href={`mailto:${site.email}`}>Contact</a></nav></div>
      </div>
    </footer>
  );
}

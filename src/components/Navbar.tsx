import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowUpRight, ChevronDown, MapPin, Menu, Phone, Search } from "lucide-react";
import { legalLinks, navLinks, site, sustainabilityLinks, footerLinks } from "../data/site";
import { cn } from "../lib/utils";
import { container } from "./Shared";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

export function Navbar() {
  const [scrolled, setScrolled] = useState(window.scrollY > 80);
  const [query, setQuery] = useState("");
  const results = [...navLinks, ...sustainabilityLinks, ...footerLinks].filter((link, index, links) => {
    return link.label.toLowerCase().includes(query.toLowerCase()) && links.findIndex((item) => item.label === link.label) === index;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-300", scrolled ? "bg-background/95 backdrop-blur-xl" : "bg-background/20")}>
      <div className="hidden border-b border-white/10 md:block">
        <div className={cn(container, "flex min-h-10 items-center justify-between gap-4 text-sm text-white/75")}>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><MapPin className="size-3.5 text-primary" />{site.location}</span>
            <a href={site.phoneHref} className="flex items-center gap-2"><Phone className="size-3.5 text-primary" />{site.phone}</a>
          </div>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-primary">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className={cn(container, "flex h-20 items-center justify-between gap-5 lg:h-24")}>
        <a href="#home" aria-label="Philsaga Mining Corporation home" className="flex shrink-0 items-center gap-3">
          <span className="block h-[51px] w-[106px] overflow-hidden rounded bg-white">
            <img src="/assets/logo_2xb.png" alt="PMC and MMPRC emblems" width={1030} height={147} className="h-[51px] w-auto max-w-none" />
          </span>
          <span className="hidden border-l border-white/20 pl-3 font-heading text-sm font-semibold leading-snug tracking-tight xl:block">PHILSAGA MINING<br /><span className="text-[14px] font-normal tracking-widest text-white/60">CORPORATION</span></span>
        </a>
        <NavigationMenu.Root className="relative hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavigationMenu.Item key={link.label}>
                <NavigationMenu.Link href={link.href} className="py-4 hover:text-primary">{link.label}</NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="flex items-center gap-2 py-4 hover:text-primary">Sustainability<ChevronDown className="size-3.5" /></NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full rounded-xl border border-white/10 bg-surface p-3 shadow-xl">
                {sustainabilityLinks.map((link) => (
                  <NavigationMenu.Link key={link.label} href={link.href} className="block whitespace-nowrap rounded-lg px-4 py-3 hover:bg-white/10">{link.label}</NavigationMenu.Link>
                ))}
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item><NavigationMenu.Link href="https://www.philsaga.com/careers" className="hover:text-primary">Careers</NavigationMenu.Link></NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="flex items-center gap-2 md:gap-4">
          <Dialog>
            <DialogTrigger asChild><Button variant="ghost" className="size-11 min-h-11 px-0" aria-label="Search website"><Search className="size-5" /></Button></DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogTitle className="pr-10 font-heading text-2xl">Search Philsaga</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground">Find company information, community programs, and reports.</DialogDescription>
              <label htmlFor="site-search" className="sr-only">Search pages</label>
              <input id="site-search" value={query} onChange={(event) => { setQuery(event.target.value); }} placeholder="What are you looking for?" className="mt-6 w-full rounded-lg border border-white/20 bg-background px-4 py-3 focus:outline-primary" />
              <ul className="mt-4 space-y-1">
                {results.map((link) => (
                  <li key={link.label}><a href={link.href} className="flex justify-between rounded-lg px-3 py-3 hover:bg-white/10">{link.label}<ArrowUpRight className="size-4" /></a></li>
                ))}
                {results.length === 0 && <li className="p-3 text-muted-foreground">No matching pages. Try “community” or “report”.</li>}
              </ul>
            </DialogContent>
          </Dialog>
          <Button asChild className="hidden px-5 sm:inline-flex"><a href="#contact">Contact<ArrowUpRight className="size-4" /></a></Button>
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" className="size-11 px-0 lg:hidden" aria-label="Open navigation"><Menu className="size-6" /></Button></SheetTrigger>
            <SheetContent>
              <SheetTitle className="mt-10 font-heading text-2xl">Philsaga</SheetTitle>
              <SheetDescription className="mt-3 text-sm text-muted-foreground">{site.tagline}</SheetDescription>
              <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile navigation">
                {[...navLinks, ...sustainabilityLinks, { label: "Careers", href: "https://www.philsaga.com/careers" }, { label: "Contact", href: "#contact" }].map((link) => (
                  <SheetClose asChild key={link.label}><a href={link.href} className="border-b border-white/10 py-4 text-lg hover:text-primary">{link.label}</a></SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

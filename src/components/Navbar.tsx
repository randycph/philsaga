import { uiCopy } from "../data/ui";
import type { SitePage } from "../App";
import { useEffect, useState } from "react";
import * as NavigationMenu from "./ui/navigation-menu";
import { ArrowUpRight, ChevronDown, Menu, Search } from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import {
  navLinks,
  site,
  sustainabilityLinks,
  footerLinks,
  mobileNavLinks,
} from "../data/site";
import { cn } from "../lib/utils";
import { assetPath } from "./Shared";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";

export function Navbar({ page = "home" }: { page?: SitePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  function resolveLink(href: string) {
    if (page !== "home" && href.startsWith("#") && href !== "#contact") {
      return assetPath(href);
    }

    return href;
  }
  const results = [...navLinks, ...sustainabilityLinks, ...footerLinks].filter(
    (link, index, links) => {
      return (
        link.label.toLowerCase().includes(query.toLowerCase()) &&
        links.findIndex((item) => item.label === link.label) === index
      );
    },
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-black/10 transition-all duration-300",
        scrolled
          ? "bg-background/65 shadow-sm backdrop-blur-xl"
          : "bg-background/75 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "page-container flex items-center justify-between gap-2 transition-all duration-300 sm:gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
          scrolled ? "h-16 lg:h-[72px]" : "h-16 lg:h-24",
        )}
      >
        <a
          href={resolveLink(uiCopy.home)}
          aria-label={uiCopy.philsagaMiningCorporationHome}
          className="flex shrink-0 items-center gap-3 lg:min-w-0"
        >
          <span
            className={cn(
              "block shrink-0 transition-all duration-300 lg:max-w-full",
              scrolled
                ? "h-12 w-[100px] sm:h-[68px] sm:w-[478px] lg:w-[clamp(280px,32vw,478px)]"
                : "h-12 w-[100px] sm:h-[76px] sm:w-[531px] lg:w-[clamp(280px,32vw,531px)]",
            )}
          >
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={assetPath("assets/pmc-mmprc.png")}
              />
              <img
                src={assetPath("assets/logo-long.png")}
                alt={uiCopy.pmcAndMmprcASociallyResponsibleAndEnvironment}
                width={1030}
                height={147}
                className="h-full w-full object-contain"
              />
            </picture>
          </span>
        </a>
        <NavigationMenu.Root className="relative hidden lg:block lg:justify-self-center">
          <NavigationMenu.List className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavigationMenu.Item
                key={link.label}
                className={
                  link.label === "News & Articles"
                    ? "hidden xl:block"
                    : undefined
                }
              >
                <NavigationMenu.Link
                  href={resolveLink(link.href)}
                  aria-current={
                    (page === "about" && link.label === "About Us") ||
                    (page === "articles" && link.label === "News & Articles")
                      ? "page"
                      : undefined
                  }
                  className="py-4 hover:text-primary"
                >
                  {link.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="flex items-center gap-2 py-4 hover:text-primary">
                {uiCopy.sustainability}
                <ChevronDown className="size-3.5" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full rounded-sm border border-black/10 bg-surface p-3 shadow-xl">
                {sustainabilityLinks.map((link) => (
                  <NavigationMenu.Link
                    key={link.label}
                    href={resolveLink(link.href)}
                    className="block whitespace-nowrap rounded-lg px-4 py-3 hover:bg-black/5"
                  >
                    {link.label}
                  </NavigationMenu.Link>
                ))}
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href={uiCopy.httpsWwwPhilsagaComCareers}
                aria-current={page === "careers" ? "page" : undefined}
                className="hover:text-primary"
              >
                {uiCopy.careers}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-4 lg:justify-self-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="size-11 min-h-11 px-0"
                aria-label={uiCopy.searchWebsite}
              >
                <Search className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogTitle className="pr-10 font-heading text-2xl">
                {uiCopy.searchPhilsaga}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground">
                {uiCopy.findCompanyInformationCommunityProgramsAndReports}
              </DialogDescription>
              <label htmlFor="site-search" className="sr-only">
                {uiCopy.searchPages}
              </label>
              <input
                id="site-search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                placeholder={uiCopy.whatAreYouLookingFor}
                className="mt-6 w-full rounded-lg border border-black/20 bg-background px-4 py-3 focus:outline-primary"
              />
              <ul className="mt-4 space-y-1">
                {results.map((link) => (
                  <li key={link.label}>
                    <DialogClose asChild>
                      <a
                        href={resolveLink(link.href)}
                        className="flex justify-between rounded-lg px-3 py-3 hover:bg-black/5"
                      >
                        {link.label}
                        <ArrowUpRight className="size-4" />
                      </a>
                    </DialogClose>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="p-3 text-muted-foreground">
                    {uiCopy.noMatchingPagesTryCommunityOrReport}
                  </li>
                )}
              </ul>
            </DialogContent>
          </Dialog>
          <img
            src={assetPath("assets/ISO-LOGO.png")}
            alt={uiCopy.certificationInternationalIso140012015}
            width={391}
            height={390}
            className="size-10 shrink-0 object-contain sm:size-12"
          />
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label={uiCopy.followUsOnFacebook}
            className="group relative flex size-11 shrink-0 items-center justify-center rounded-full border border-[#102b2b]/15 text-[#102b2b] transition-colors duration-200 hover:border-[#102b2b] hover:bg-[#102b2b] hover:text-[#ffb20b] focus-visible:bg-[#102b2b] focus-visible:text-[#ffb20b]"
          >
            <FaFacebookF className="size-4" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="pointer-events-none invisible absolute right-0 top-full mt-3 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#102b2b] px-4 py-2.5 text-xs font-medium text-white opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              {uiCopy.followUsOnFacebook}
            </span>
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="size-11 px-0 lg:hidden"
                aria-label={uiCopy.openNavigation}
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetClose asChild>
                <a
                  href={resolveLink(uiCopy.home)}
                  aria-label={uiCopy.philsagaMiningCorporationHome}
                  className="flex w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:mt-10"
                >
                  <img
                    src={assetPath("assets/pmc-mmprc.png")}
                    alt={uiCopy.pmcAndMmprcEmblems}
                    width={100}
                    height={48}
                    className="h-12 w-[100px] object-contain"
                  />
                </a>
              </SheetClose>
              <SheetTitle className="mt-5 font-heading text-2xl">
                {uiCopy.philsaga}
              </SheetTitle>
              <SheetDescription className="mt-3 text-sm text-muted-foreground">
                {site.tagline}
              </SheetDescription>
              <nav
                className="mt-10 flex flex-col gap-2"
                aria-label={uiCopy.mobileNavigation}
              >
                {mobileNavLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={resolveLink(link.href)}
                      className="border-b border-black/10 py-4 text-lg hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div
                role="group"
                aria-label={uiCopy.certificationAndSocialMedia}
                className="mt-6 flex flex-1 flex-col gap-4"
              >
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-[#102b2b] text-white">
                    <FaFacebookF className="size-5" aria-hidden="true" />
                  </span>
                  {uiCopy.followUsOnFacebook}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <div className="mt-auto flex items-center gap-3">
                  <img
                    src={assetPath("assets/ISO-LOGO.png")}
                    alt={uiCopy.certificationInternationalIso140012015}
                    width={391}
                    height={390}
                    className="size-14 shrink-0 rounded bg-white p-1"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {uiCopy.iso140012015Certified}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {uiCopy.certifiedByCertificationInternational}
                    </p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

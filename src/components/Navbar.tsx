import { uiCopy } from "../data/ui";
import { useEffect, useState } from "react";
import * as NavigationMenu from "./ui/navigation-menu";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";
import {
  navLinks,
  site,
  sustainabilityLinks,
  footerLinks,
  mobileNavLinks,
} from "../data/site";
import { cn } from "../lib/utils";
import { container } from "./Shared";
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(window.scrollY > 80);
  const [query, setQuery] = useState("");
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
          ? "bg-background/95 shadow-sm backdrop-blur-xl"
          : "bg-background/75 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          container,
          "flex items-center justify-between gap-5 transition-all duration-300",
          scrolled ? "h-[72px]" : "h-20 lg:h-24",
        )}
      >
        <a
          href={uiCopy.home}
          aria-label={uiCopy.philsagaMiningCorporationHome}
          className="flex shrink-0 items-center gap-3"
        >
          <span className={cn("block shrink-0 transition-all duration-300", scrolled ? "h-[68px] w-[478px]" : "h-[76px] w-[531px]")}>
            <img
              src="/assets/logo-long.png"
              alt={uiCopy.pmcAndMmprcASociallyResponsibleAndEnvironment}
              width={1030}
              height={147}
              className="h-full w-full object-contain"
            />
          </span>
        </a>
        <NavigationMenu.Root className="relative hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavigationMenu.Item key={link.label}>
                <NavigationMenu.Link
                  href={link.href}
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
                    href={link.href}
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
                className="hover:text-primary"
              >
                {uiCopy.careers}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="flex items-center gap-2 md:gap-4">
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
                        href={link.href}
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
              <SheetTitle className="mt-10 font-heading text-2xl">
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
                      href={link.href}
                      className="border-b border-black/10 py-4 text-lg hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

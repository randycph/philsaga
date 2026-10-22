import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "../data/site";
import { container } from "./Shared";

export function TrustStrip() {
  return (
    <aside aria-label="Certification and social media" className="border-y border-white/10 bg-surface">
      <div className={`${container} flex flex-wrap items-center justify-between gap-6 py-7`}>
        <div className="flex items-center gap-4">
          <img src="/assets/ISO-LOGO.png" alt="Certification International ISO 14001:2015" width={391} height={390} loading="lazy" className="size-14 rounded bg-white p-1" />
          <div><p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-4 text-primary" />ISO 14001:2015 Certified</p><p className="mt-1 text-sm text-muted-foreground">Certified by Certification International</p></div>
        </div>
        <a href={site.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-5 rounded-lg bg-paper px-4 py-2 focus-visible:outline-2 focus-visible:outline-primary">
          <img src="/assets/fb9.png" alt="Follow us on Facebook" width={367} height={102} loading="lazy" className="h-9 w-auto" /><ArrowUpRight className="size-4 text-background" />
        </a>
      </div>
    </aside>
  );
}

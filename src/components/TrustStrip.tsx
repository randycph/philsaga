import { uiCopy } from "../data/ui";
import { assetPath } from "./Shared";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { site } from "../data/site";
import { container } from "./Shared";

export function TrustStrip() {
  return (
    <aside
      aria-label={uiCopy.certificationAndSocialMedia}
      className="border-y border-black/10 bg-white"
    >
      <div
        className={`${container} flex flex-wrap items-center justify-between gap-6 py-7`}
      >
        <div className="flex items-center gap-4">
          <img
            src={assetPath("assets/ISO-LOGO.png")}
            alt={uiCopy.certificationInternationalIso140012015}
            width={391}
            height={390}
            loading="lazy"
            className="size-14 rounded bg-white p-1"
          />
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-primary" />
              {uiCopy.iso140012015Certified}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {uiCopy.certifiedByCertificationInternational}
            </p>
          </div>
        </div>
        <a
          href={site.facebook}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-5 rounded-lg bg-paper px-4 py-2 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <img
            src={assetPath("assets/fb9.png")}
            alt={uiCopy.followUsOnFacebook}
            width={367}
            height={102}
            loading="lazy"
            className="h-9 w-auto"
          />
          <ArrowUpRight className="size-4 text-foreground" />
        </a>
      </div>
    </aside>
  );
}

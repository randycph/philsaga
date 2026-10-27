import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import PerfectScrollbar from "perfect-scrollbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./HomepageAnnouncement.css";

export function HomepageAnnouncement() {
  const [open, setOpen] = useState(false);
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!scrollElement) {
      return;
    }

    const scrollbar = new PerfectScrollbar(scrollElement, {
      suppressScrollX: true,
      wheelPropagation: false,
      minScrollbarLength: 40,
    });
    const thumb = scrollElement.querySelector<HTMLElement>(".ps__thumb-y");

    function updateAccessibleValue() {
      if (!scrollElement || !thumb) {
        return;
      }

      thumb.setAttribute(
        "aria-valuemax",
        String(
          Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight),
        ),
      );
      thumb.setAttribute(
        "aria-valuenow",
        String(Math.round(scrollElement.scrollTop)),
      );
    }

    thumb?.setAttribute("role", "scrollbar");
    thumb?.setAttribute("aria-label", "Scroll public notice");
    thumb?.setAttribute("aria-orientation", "vertical");
    thumb?.setAttribute("aria-controls", "public-notice-content");
    thumb?.setAttribute("aria-valuemin", "0");

    const observer = new ResizeObserver(() => {
      scrollbar.update();
      updateAccessibleValue();
    });
    observer.observe(scrollElement);

    if (scrollElement.firstElementChild) {
      observer.observe(scrollElement.firstElementChild);
    }

    updateAccessibleValue();
    scrollElement.addEventListener("scroll", updateAccessibleValue);

    return () => {
      observer.disconnect();
      scrollElement.removeEventListener("scroll", updateAccessibleValue);
      scrollbar.destroy();
    };
  }, [scrollElement]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="homepage-announcement"
        overlayClassName="homepage-announcement__overlay"
        closeClassName="homepage-announcement__close"
      >
        <p className="homepage-announcement__eyebrow">
          <Megaphone size={28} aria-hidden="true" />
          Public Announcement
        </p>
        <DialogTitle className="homepage-announcement__title">
          Notice to the Public
        </DialogTitle>
        <DialogDescription className="sr-only">
          Notice concerning the Decisions dated 30 April 2026 of the Regional
          Trial Court Branch 10 of Davao City.
        </DialogDescription>
        <div
          className="homepage-announcement__notice"
          ref={setScrollElement}
          role="region"
          aria-label="Court decisions notice"
          tabIndex={0}
          data-lenis-prevent
        >
          <div id="public-notice-content">
            <p>
              Everyone is put on notice that the Regional Trial Court Branch 10
              of Davao City has rendered its Decisions in the intra-corporate
              cases against Joseph Mahusay, et al. where Mahusay, Austria, and
              other persons acting on their behalf are permanently enjoined from
              presenting themselves as the legitimate shareholders, directors,
              and officers of Philsaga Management and Holdings, Inc. and its
              subsidiaries Philsaga Development Corporation, and Philsaga Mining
              Corporation. All transactions or representations by Mahusay, et al
              involving the Philsaga Group are unauthorized, illegal, and void.
              Anyone transacting with them on matters relating to the Philsaga
              Group do so at their own risk and shall not be recognized by the
              Philsaga Group.
            </p>
            <p className="homepage-announcement__effective-date">
              <strong>
                The Decisions dated 30 April 2026 are immediately executory.
              </strong>
            </p>
            <ol className="homepage-announcement__cases">
              <li>
                <h3>
                  In the Injunction case entitled Joseph P. Mahusay vs. Raul C.
                  Villanueva, the Court declared:
                </h3>
                <blockquote>
                  <p>
                    In fine, the petitioner (<em>Mahusay</em>) has no right to
                    be protected, and no violation of such right can be
                    attributed to the respondent (<em>Villanueva</em>).
                    Accordingly, there is no basis for the Court to enjoin the
                    respondent (Villanueva) from acting as a director and as
                    President of PMHI.
                  </p>
                  <p>
                    WHEREFORE, this case for INJUNCTION WITH APPLICATION FOR
                    PRELIMINARY INJUNCTION AND/OR TEMPORARY RESTRAINING ORDER
                    entitled &quot;JOSEPH P. MAHUSAY v. RAUL C.
                    VILLANUEVA&quot;, is hereby DISMISSED for lack of merit.
                  </p>
                  <p className="homepage-announcement__ordered">SO ORDERED.</p>
                </blockquote>
              </li>
              <li>
                <h3>
                  In the Quo Warranto case entitled Raul C. Villanueva, Marie
                  Glenn Cedeno-Sorila, and Armando B. Dy vs. Joseph Mahusay,
                  Ramon Austria, Peter Alphonso, Patrick Warr, the Court
                  decided:
                </h3>
                <blockquote>
                  <p>WHEREFORE, judgment is hereby rendered as follows:</p>
                  <ol>
                    <li>
                      Declaring permanent the preliminary writ of injunction
                      (against Mahusay, et al) issued on 13 June 2024;
                    </li>
                    <li>
                      Declaring Plaintiffs Raul C. Villanueva, Marie Glenn
                      Cedeno-Sorila, and Armando B. Dy remain as the rightful
                      directors and officers of PMHI and their previous
                      termination as Director, Chairman, and President,
                      Corporate Secretary, and Treasurer of PMHI, respectively,
                      as invalid;
                    </li>
                    <li>
                      Nullifying the declaration of vacancies in the Board of
                      Directors of PMHI and appointing defendants Mahusay and
                      Austria thereof;
                    </li>
                    <li>
                      All resolutions passed, submissions filed, contracts
                      signed, and acts performed including the declaration of
                      vacancies in the Board of Directors of PMHI and the
                      termination of plaintiffs (
                      <em>Villanueva, Cedeno-Sorila, Dy</em>) from their post as
                      directors and officers of PMHI made by defendants Mahusay
                      and Austria or by persons acting on their behalf as
                      purported stockholders and officers of PMHI are declared
                      null and void.
                    </li>
                  </ol>
                  <p className="homepage-announcement__ordered">SO ORDERED.</p>
                </blockquote>
              </li>
            </ol>
          </div>
        </div>
        <div className="homepage-announcement__actions">
          {/* Enable this action when the announcement destination is available.
          <button type="button" className="homepage-announcement__read">
            Read Announcement
          </button>
          */}
          {/* <DialogClose className="homepage-announcement__dismiss">
            Dismiss
          </DialogClose> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

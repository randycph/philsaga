import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import "./HomepageAnnouncement.css";

export function HomepageAnnouncement() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

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
          Community Scholarship Program Now Open
        </DialogTitle>
        <DialogDescription className="homepage-announcement__description">
          PMC is now accepting applications for the 2025 Community Scholarship
          Program, supporting deserving students in adjacent host communities.
          Together, we build stronger communities through education.
        </DialogDescription>
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

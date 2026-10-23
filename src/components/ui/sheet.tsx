import type { ComponentProps } from "react";
import { DialogContent } from "./dialog";
import "./sheet.css";

export {
  Dialog as Sheet,
  DialogTrigger as SheetTrigger,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
  DialogClose as SheetClose,
} from "./dialog";

export function SheetContent(props: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      {...props}
      className="mobile-navigation-sheet inset-y-0 left-auto right-0 h-dvh max-h-dvh w-[min(90vw,400px)] translate-x-0 translate-y-0 rounded-none border-l border-black/10 bg-[#f6f4ef] p-7 text-[#102b2b] shadow-[-24px_0_80px_rgba(0,0,0,0.16)] sm:p-8"
    />
  );
}

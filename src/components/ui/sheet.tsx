import type { ComponentProps } from "react";
import { DialogContent } from "./dialog";

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
      className="inset-y-0 left-auto right-0 h-dvh max-h-dvh w-[min(90vw,400px)] translate-x-0 translate-y-0 rounded-none p-8"
    />
  );
}

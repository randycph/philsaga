import { uiCopy } from "../../data/ui";
import * as Primitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogTitle = Primitive.Title;
export const DialogDescription = Primitive.Description;
export const DialogClose = Primitive.Close;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" />
      <Primitive.Content
        data-lenis-prevent
        className={cn(
          "fixed left-1/2 top-1/2 z-[101] max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/15 bg-surface p-6 text-foreground shadow-2xl focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <Primitive.Close className="absolute right-4 top-4 rounded-lg bg-background p-2 focus-visible:outline-2 focus-visible:outline-primary">
          <X className="size-5" />
          <span className="sr-only">{uiCopy.close}</span>
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  );
}

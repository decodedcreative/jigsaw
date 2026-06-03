import { cva } from "class-variance-authority";

export const toastRegionStyles = {
  viewport: cva(
    [
      "fixed z-[100] flex max-h-screen gap-2 p-4 pointer-events-none",
      "w-max max-w-[min(100vw-2rem,24rem)]",
    ],
    {
      variants: {
        position: {
          // RAC queue is newest-first; flex direction is inverted vs the old append-order queue
          // so the newest toast still sits nearest the anchored corner.
          "top-left": "top-0 left-0 flex-col items-start",
          "top-center": "top-0 left-1/2 flex-col -translate-x-1/2 items-center",
          "top-right": "top-0 right-0 flex-col items-end",
          "bottom-left": "bottom-0 left-0 flex-col-reverse items-start",
          "bottom-center": "bottom-0 left-1/2 flex-col-reverse -translate-x-1/2 items-center",
          "bottom-right": "bottom-0 right-0 flex-col-reverse items-end",
        },
      },
      defaultVariants: { position: "bottom-right" },
    }
  ),
};

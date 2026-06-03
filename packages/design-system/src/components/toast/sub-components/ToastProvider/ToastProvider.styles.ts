import { cva } from "class-variance-authority";

export const toastProviderStyles = {
  viewport: cva(
    [
      "fixed z-[100] flex max-h-screen gap-2 p-4 pointer-events-none",
      "w-max max-w-[min(100vw-2rem,24rem)]",
    ],
    {
      variants: {
        position: {
          // Newest toast sits nearest the anchored corner (edge of the viewport).
          "top-left": "top-0 left-0 flex-col-reverse items-start",
          "top-center": "top-0 left-1/2 flex-col-reverse -translate-x-1/2 items-center",
          "top-right": "top-0 right-0 flex-col-reverse items-end",
          "bottom-left": "bottom-0 left-0 flex-col items-start",
          "bottom-center": "bottom-0 left-1/2 flex-col -translate-x-1/2 items-center",
          "bottom-right": "bottom-0 right-0 flex-col items-end",
        },
      },
      defaultVariants: { position: "bottom-right" },
    }
  ),
};

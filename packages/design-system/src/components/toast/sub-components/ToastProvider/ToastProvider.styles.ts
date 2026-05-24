import { cva } from "class-variance-authority";

export const toastProviderStyles = {
  viewport: cva(
    ["fixed z-50 flex flex-col gap-2 p-4", "max-h-screen w-full sm:max-w-md"],
    {
      variants: {
        position: {
          "top-left": "top-0 left-0",
          "top-center": "top-0 left-1/2 -translate-x-1/2",
          "top-right": "top-0 right-0",
          "bottom-left": "bottom-0 left-0",
          "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
          "bottom-right": "bottom-0 right-0",
        },
      },
      defaultVariants: { position: "bottom-right" },
    }
  ),
};

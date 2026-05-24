import { cva } from "class-variance-authority";

export const tooltipStyles = {
  content: cva(
    [
      "z-50 px-3 py-1.5 text-sm rounded-md shadow-md",
      "bg-surface-inverse text-foreground-inverse",
      "animate-in fade-in-0 zoom-in-95",
      "data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95",
    ],
    {
      variants: {
        placement: {
          top: "mb-2",
          bottom: "mt-2",
          left: "mr-2",
          right: "ml-2",
        },
      },
      defaultVariants: { placement: "top" },
    }
  ),
  arrow: cva("fill-surface-inverse"),
};

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

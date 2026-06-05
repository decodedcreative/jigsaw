import { cva } from "class-variance-authority";

export const formStoryStyles = {
  canvas: cva("", {
    variants: {
      width: {
        default: "w-[360px]",
        wide: "w-[560px]",
      },
    },
    defaultVariants: { width: "default" },
  }),
  footer: cva([
    "flex items-center gap-3 mt-6 pt-6 border-t border-border-default",
  ]),
};

/** Input slot overrides for side-by-side label demos in Form stories. */
export const sideLabelInputStoryStyles = {
  wrapper: cva([
    "grid w-full grid-cols-[7.5rem_1fr] gap-x-4 gap-y-1 items-start",
  ]),
  label: cva(["mb-0 pt-2 text-right"]),
  input: cva(["col-start-2 row-start-1 min-w-0"]),
  description: cva(["col-start-2 row-start-2 mt-0"]),
};

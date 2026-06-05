import { cva } from "class-variance-authority";
import { formStyles } from "./Form.styles";

export const formStoryStyles = {
  canvas: cva("", {
    variants: {
      width: {
        default: "w-[360px]",
        wide: "w-[640px]",
      },
    },
    defaultVariants: { width: "default" },
  }),
  footer: cva([
    "flex items-center gap-3 mt-6 pt-6 border-t border-border-default",
    formStyles.sideLabelControlStart(),
  ]),
};

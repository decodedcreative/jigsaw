import { cva } from "class-variance-authority";

export const formStyles = {
  form: cva(["flex flex-col"]),
  fieldset: cva(["border-0 p-0 m-0"]),
  legend: cva(["text-lg font-semibold text-foreground-primary mb-4"]),
  fields: cva(["flex flex-col gap-4"]),
  actions: cva([
    "flex items-center gap-3 mt-6 pt-6 border-t border-border-default",
  ]),
};

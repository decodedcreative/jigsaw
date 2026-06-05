import { cva } from "class-variance-authority";

export const formStyles = {
  form: cva(["flex flex-col", "group/form-label"]),
  field: cva([
    "group-data-[label-position=side]/form-label:grid",
    "group-data-[label-position=side]/form-label:w-full",
    "group-data-[label-position=side]/form-label:grid-cols-[7.5rem_1fr]",
    "group-data-[label-position=side]/form-label:gap-x-4",
    "group-data-[label-position=side]/form-label:gap-y-1",
    "group-data-[label-position=side]/form-label:items-start",
  ]),
  fieldLabel: cva([
    "group-data-[label-position=side]/form-label:mb-0",
    "group-data-[label-position=side]/form-label:pt-2",
    "group-data-[label-position=side]/form-label:text-right",
  ]),
  fieldBody: cva([
    "group-data-[label-position=top]/form-label:contents",
    "group-data-[label-position=side]/form-label:col-start-2",
    "group-data-[label-position=side]/form-label:flex",
    "group-data-[label-position=side]/form-label:min-w-0",
    "group-data-[label-position=side]/form-label:flex-col",
  ]),
  /** Aligns block content with the control column (label width + gap). */
  sideLabelControlStart: cva([
    "group-data-[label-position=side]/form-label:ml-[8.5rem]",
  ]),
};

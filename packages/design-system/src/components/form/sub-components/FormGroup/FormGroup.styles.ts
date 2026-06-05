import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const formGroupStyles = {
  section: cva(["flex flex-col gap-4 mb-12"]),
  title: cva([formStyles.sideLabelControlStart()]),
};

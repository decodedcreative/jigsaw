import type { QueuedToast } from "react-stately/useToastState";
import type { VariantProps } from "class-variance-authority";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { ToastContent } from "../../Toast.types";
import type { toastItemStyles } from "./ToastItem.styles";

type ToastItemComponentVariants = VariantProps<typeof toastItemStyles.component>;

export type ToastVariant = NonNullable<ToastItemComponentVariants["variant"]>;

/** All variant values supported by `toastItemStyles` — kept in sync via `satisfies`. */
export const toastVariants = [
  "default",
  "success",
  "warning",
  "error",
  "info",
] as const satisfies readonly ToastVariant[];

export type ToastItemProps = {
  toast: QueuedToast<ToastContent>;
  classNameOverrides?: ClassNameOverrides<typeof toastItemStyles>;
};

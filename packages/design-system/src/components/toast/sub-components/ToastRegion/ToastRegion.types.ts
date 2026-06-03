import type { VariantProps } from "class-variance-authority";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { toastRegionStyles } from "./ToastRegion.styles";

type ToastViewportVariants = VariantProps<typeof toastRegionStyles.viewport>;

export type ToastPosition = NonNullable<ToastViewportVariants["position"]>;

/** All position values supported by `toastRegionStyles` — kept in sync via `satisfies`. */
export const toastPositions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const satisfies readonly ToastPosition[];

export type ToastRegionProps = {
  /** Queue id — must match `region` passed to {@link toast}. Defaults to `"default"`. */
  region?: string;
  position?: ToastPosition;
  classNameOverrides?: ClassNameOverrides<typeof toastRegionStyles>;
};

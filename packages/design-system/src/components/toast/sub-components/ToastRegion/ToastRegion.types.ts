import type { VariantProps } from "class-variance-authority";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { toastRegionStyles } from "./ToastRegion.styles";

type ToastViewportVariants = VariantProps<typeof toastRegionStyles.component>;

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

export type ToastRegionProps = RefProp<HTMLDivElement> & {
  /** Queue id — must match `region` passed to {@link toast}. Defaults to `"default"`. */
  region?: string;
  position?: ToastPosition;
  classNameOverrides?: ClassNameOverrides<typeof toastRegionStyles>;
  /** Extra classes for the root region, merged last via `twMerge` (wins conflicts). */
  className?: string;
  /**
   * Accessible name for the region landmark. Defaults to React Aria's
   * "N notifications". When you mount more than one region, give each its own
   * name (e.g. "Alerts", "Messages") so screen reader users can tell them apart;
   * Jigsaw warns in development if two mounted regions share a name.
   */
  "aria-label"?: string;
};

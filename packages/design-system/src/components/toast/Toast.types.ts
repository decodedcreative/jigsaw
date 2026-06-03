import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { ToastVariant } from "./sub-components/ToastItem/ToastItem.types";

export type { ToastVariant } from "./sub-components/ToastItem/ToastItem.types";
export { toastVariants } from "./sub-components/ToastItem/ToastItem.types";
export type { ToastPosition, ToastRegionProps } from "./sub-components/ToastRegion/ToastRegion.types";
export { toastPositions } from "./sub-components/ToastRegion/ToastRegion.types";

/** Content stored in the toast queue for each notification. */
export interface ToastContent {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  /** Overrides the default icon for this variant. */
  icon?: PhosphorIcon;
  /** Merged onto the toast root via `twMerge`. */
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/** Identifies a {@link ToastRegion} queue. Use any string — queues are created on demand. */
export type ToastRegionId = string;

/** Routing / timing options for the two-argument {@link toast} call form. */
export type ToastCallOptions = {
  /** Target {@link ToastRegion} id. Defaults to `"default"`. */
  region?: ToastRegionId;
  /** Auto-dismiss after ms. `0` keeps the toast open until closed manually. Default: 5000. */
  duration?: number;
};

/** Options accepted by {@link toast}. */
export type ToastOptions = ToastContent & ToastCallOptions;

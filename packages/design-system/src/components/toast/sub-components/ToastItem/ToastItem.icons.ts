import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import type { ToastVariant } from "./ToastItem.styles";

/** Default Phosphor icons per toast variant (overridable via the `icon` prop). */
export const toastVariantIcons: Record<ToastVariant, PhosphorIcon> = {
  default: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: XCircleIcon,
  info: InfoIcon,
};

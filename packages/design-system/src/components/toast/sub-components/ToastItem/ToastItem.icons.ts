import { CheckCircleIcon } from "@phosphor-icons/react/CheckCircle";
import { InfoIcon } from "@phosphor-icons/react/Info";
import { WarningIcon } from "@phosphor-icons/react/Warning";
import { XCircleIcon } from "@phosphor-icons/react/XCircle";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { ToastVariant } from "./ToastItem.types";

/** Default Phosphor icons per toast variant (overridable via the `icon` prop). */
export const toastVariantIcons: Record<ToastVariant, PhosphorIcon> = {
  default: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: XCircleIcon,
  info: InfoIcon,
};

import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { toastProviderStyles } from "./ToastProvider.styles";

type ToastViewportVariants = VariantProps<typeof toastProviderStyles.viewport>;

export type ToastPosition = NonNullable<ToastViewportVariants["position"]>;

/** All position values supported by `toastProviderStyles` — kept in sync via `satisfies`. */
export const toastPositions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const satisfies readonly ToastPosition[];

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  classNameOverrides?: ClassNameOverrides<typeof toastProviderStyles>;
};

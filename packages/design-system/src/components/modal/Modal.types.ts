import type { ReactNode } from "react";
import type { ModalOverlayProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type ModalProps = WithoutClassName<ModalOverlayProps> & {
  children?: ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

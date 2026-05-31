import type { ReactElement, ReactNode } from "react";
import type { ModalOverlayProps } from "react-aria-components";
import type { ButtonProps } from "../button/Button";
import type { ClassNameOverrides, WithoutClassName } from "../../types/component-props";
import type { modalStyles } from "./Modal.styles";

export type ModalTriggerElement = ReactElement<ButtonProps>;

export type ModalProps = WithoutClassName<Omit<ModalOverlayProps, "children">> & {
  cancelLabel?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof modalStyles>;
  footer?: ReactNode;
  header?: ReactNode;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  title: string;
  trigger?: ModalTriggerElement;
};

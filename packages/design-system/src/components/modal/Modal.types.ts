import type { ReactElement, ReactNode } from "react";
import type { ModalOverlayProps } from "react-aria-components";
import type { ButtonProps } from "../button/Button";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { modalStyles } from "./Modal.styles";

export type ModalTriggerElement = ReactElement<ButtonProps>;

type ModalPropsShared = WithoutClassName<Omit<ModalOverlayProps, "children">> & {
  /** Label for the header close button. Defaults to `"Close"`. */
  closeLabel?: string;
  /** Label for the wired footer cancel button. Defaults to `"Cancel"`. */
  cancelLabel?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof modalStyles>;
  /**
   * Footer actions. Pass `Button` elements with `slot="close"` to dismiss the
   * modal after `onPress`.
   */
  footer?: ReactNode;
  /**
   * When `footer` is set, defaults to `true` so confirmation dialogs get a
   * wired cancel button. Set explicitly when there is no footer action.
   */
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  trigger?: ModalTriggerElement;
};

export type ModalProps = ModalPropsShared &
  (
    | { title: string; header?: never }
    | { header: ReactNode; title?: never }
  );

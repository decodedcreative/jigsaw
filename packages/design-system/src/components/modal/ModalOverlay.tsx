"use client";

import { XIcon } from "@phosphor-icons/react/X";
import {
  Dialog as ReactAriaDialog,
  Heading as ReactAriaHeading,
  Button as ReactAriaButton,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import { Button } from "../button/Button";
import { modalStyles } from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

type ModalOverlayProps = Omit<ModalProps, "trigger">;

export const ModalOverlay = ({
  cancelLabel = "Cancel",
  children,
  classNameOverrides,
  className,
  closeLabel = "Close",
  footer,
  header,
  showCancelButton,
  showCloseButton = true,
  title,
  ...props
}: ModalOverlayProps) => {
  const classNames = useGetClassNames(modalStyles, classNameOverrides, {
    overlay: {},
    component: {},
    dialog: {},
    header: {},
    title: {},
    closeButton: {},
    content: {},
    footer: {},
  });
  const rootClassName = useRootClassName(classNames.component, className);
  const shouldShowCancelButton = showCancelButton ?? footer != null;
  const hasFooter = shouldShowCancelButton || footer != null;

  return (
    <ReactAriaModalOverlay {...props} className={classNames.overlay}>
      <ReactAriaModal className={rootClassName}>
        <ReactAriaDialog className={classNames.dialog}>
          {({ close }) => (
            <>
              {header != null ? (
                <div className={classNames.header}>{header}</div>
              ) : (
                <div className={classNames.header}>
                  <ReactAriaHeading slot="title" className={classNames.title}>
                    {title}
                  </ReactAriaHeading>
                  {showCloseButton ? (
                    <ReactAriaButton
                      aria-label={closeLabel}
                      onPress={close}
                      className={classNames.closeButton}
                    >
                      <Icon icon={XIcon} size="lg" />
                    </ReactAriaButton>
                  ) : null}
                </div>
              )}
              {children != null ? <div className={classNames.content}>{children}</div> : null}
              {hasFooter ? (
                <div className={classNames.footer}>
                  {shouldShowCancelButton ? (
                    <Button variant="secondary" onPress={close}>
                      {cancelLabel}
                    </Button>
                  ) : null}
                  {footer}
                </div>
              ) : null}
            </>
          )}
        </ReactAriaDialog>
      </ReactAriaModal>
    </ReactAriaModalOverlay>
  );
};

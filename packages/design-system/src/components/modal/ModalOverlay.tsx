"use client";

import { XIcon } from "@phosphor-icons/react";
import {
  Dialog as ReactAriaDialog,
  Heading as ReactAriaHeading,
  Button as ReactAriaButton,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { Button } from "../button/Button";
import { modalStyles } from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

type ModalOverlayProps = Omit<ModalProps, "trigger">;

export const ModalOverlay = ({
  cancelLabel = "Cancel",
  children,
  classNameOverrides,
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
  const shouldShowCancelButton = showCancelButton ?? footer != null;
  const hasFooter = shouldShowCancelButton || footer != null;

  return (
    <ReactAriaModalOverlay className={classNames.overlay} {...props}>
      <ReactAriaModal className={classNames.component}>
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
                    <ReactAriaButton onPress={close} className={classNames.closeButton}>
                      <XIcon className="h-5 w-5" weight="bold" aria-hidden />
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

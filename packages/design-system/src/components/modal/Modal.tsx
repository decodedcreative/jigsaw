"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  Modal as ReactAriaModal,
  ModalOverlay,
  Heading,
  Button,
  type DialogProps,
  type ModalOverlayProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { modalStyles } from "./Modal.styles";

export type ModalProps = ModalOverlayProps & {
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const Modal = ({ children, classNameOverrides, ...props }: ModalProps) => {
  const classNames = useGetClassNames(modalStyles, classNameOverrides, {
    overlay: {},
    modal: {},
    header: {},
    title: {},
    closeButton: {},
    body: {},
    footer: {},
  });

  return (
    <ModalOverlay className={classNames.overlay} {...props}>
      <ReactAriaModal className={classNames.modal}>{children}</ReactAriaModal>
    </ModalOverlay>
  );
};

Modal.displayName = "DS_Modal";

export type ModalContentProps = Omit<DialogProps, "children"> & {
  title?: string;
  showCloseButton?: boolean;
  children?: React.ReactNode | ((args: { close: () => void }) => React.ReactNode);
  classNameOverrides?: Record<string, string[]>;
};

export const ModalContent = ({
  title,
  showCloseButton = true,
  children,
  classNameOverrides,
  ...props
}: ModalContentProps) => {
  const classNames = useGetClassNames(modalStyles, classNameOverrides, {
    overlay: {},
    modal: {},
    header: {},
    title: {},
    closeButton: {},
    body: {},
    footer: {},
  });

  return (
    <Dialog className="outline-none" {...props}>
      {({ close }) => (
        <>
          {(title || showCloseButton) && (
            <div className={classNames.header}>
              {title && (
                <Heading slot="title" className={classNames.title}>
                  {title}
                </Heading>
              )}
              {showCloseButton && (
                <Button onPress={close} className={classNames.closeButton}>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
              )}
            </div>
          )}
          <div className={classNames.body}>
            {typeof children === "function" ? children({ close }) : children}
          </div>
        </>
      )}
    </Dialog>
  );
};

ModalContent.displayName = "DS_ModalContent";

export const ModalTrigger = DialogTrigger;

export type ModalFooterProps = {
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const ModalFooter = ({ children, classNameOverrides }: ModalFooterProps) => {
  const classNames = useGetClassNames(modalStyles, classNameOverrides, { footer: {} });
  return <div className={classNames.footer}>{children}</div>;
};

ModalFooter.displayName = "DS_ModalFooter";

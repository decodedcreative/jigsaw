"use client";

import type { FC } from "react";
import {
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { modalStyles } from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

export const Modal: FC<ModalProps> = ({ children, classNameOverrides, ...props }: ModalProps) => {
  const classNames = useGetClassNames(modalStyles, classNameOverrides, {
    overlay: {},
    modal: {},
  });

  return (
    <ReactAriaModalOverlay className={classNames.overlay} {...props}>
      <ReactAriaModal className={classNames.modal}>{children}</ReactAriaModal>
    </ReactAriaModalOverlay>
  );
};

Modal.displayName = "DS_Modal";

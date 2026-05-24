"use client";

import type { FC } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import {
  Dialog as ReactAriaDialog,
  Heading as ReactAriaHeading,
  Button as ReactAriaButton,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { modalContentStyles } from "./ModalContent.styles";
import type { ModalContentProps } from "./ModalContent.types";

export const ModalContent: FC<ModalContentProps> = ({
  title,
  showCloseButton = true,
  children,
  classNameOverrides,
  ...props
}: ModalContentProps) => {
  const classNames = useGetClassNames(modalContentStyles, classNameOverrides, {
    header: {},
    title: {},
    closeButton: {},
    body: {},
  });

  return (
    <ReactAriaDialog className="outline-none" {...props}>
      {({ close }) => (
        <>
          {(title || showCloseButton) && (
            <div className={classNames.header}>
              {title && (
                <ReactAriaHeading slot="title" className={classNames.title}>
                  {title}
                </ReactAriaHeading>
              )}
              {showCloseButton && (
                <ReactAriaButton onPress={close} className={classNames.closeButton}>
                  <Icon icon={XIcon} size="lg" />
                </ReactAriaButton>
              )}
            </div>
          )}
          <div className={classNames.body}>
            {typeof children === "function" ? children({ close }) : children}
          </div>
        </>
      )}
    </ReactAriaDialog>
  );
};

ModalContent.displayName = "DS_ModalContent";

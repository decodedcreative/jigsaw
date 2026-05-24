"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { modalFooterStyles } from "./ModalFooter.styles";
import type { ModalFooterProps } from "./ModalFooter.types";

export const ModalFooter: FC<ModalFooterProps> = ({ children, classNameOverrides }: ModalFooterProps) => {
  const classNames = useGetClassNames(modalFooterStyles, classNameOverrides, { footer: {} });
  return <div className={classNames.footer}>{children}</div>;
};

ModalFooter.displayName = "DS_ModalFooter";

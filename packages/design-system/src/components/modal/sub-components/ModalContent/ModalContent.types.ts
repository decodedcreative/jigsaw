import type * as React from "react";
import type { DialogProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type ModalContentProps = WithoutClassName<Omit<DialogProps, "children">> & {
  title?: string;
  showCloseButton?: boolean;
  children?: React.ReactNode | ((args: { close: () => void }) => React.ReactNode);
  classNameOverrides?: Record<string, string[]>;
};

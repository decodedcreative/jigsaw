"use client";

import type { FC } from "react";
import { ListBoxItem as ReactAriaListBoxItem } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { selectItemStyles } from "./SelectItem.styles";
import type { SelectItemProps } from "./SelectItem.types";

export const SelectItem: FC<SelectItemProps> = ({ children, ...props }: SelectItemProps) => {
  const classNames = useGetClassNames(selectItemStyles, undefined, { item: {} });
  return (
    <ReactAriaListBoxItem className={classNames.item} {...props}>
      {children}
    </ReactAriaListBoxItem>
  );
};

SelectItem.displayName = "DS_SelectItem";

"use client";

import { ListBoxItem as ReactAriaListBoxItem } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { selectStyles } from "./Select.styles";
import { useSelectContext } from "./SelectContext";
import type { SelectItemProps } from "./Select.types";

export const SelectItem = ({ children, ...props }: SelectItemProps) => {
  const select = useSelectContext();
  const classNames = useGetClassNames(
    selectStyles,
    select?.itemClassNameOverride ? { item: select.itemClassNameOverride } : undefined,
    {}
  );

  return (
    <ReactAriaListBoxItem className={classNames.item} {...props}>
      {children}
    </ReactAriaListBoxItem>
  );
};

SelectItem.displayName = "DS_Select.Item";

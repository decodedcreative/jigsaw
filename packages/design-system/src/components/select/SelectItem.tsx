"use client";

import { ListBoxItem as ReactAriaListBoxItem } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { selectStyles } from "./Select.styles";
import { useSelectContext } from "./SelectContext";
import type { SelectItemProps } from "./Select.types";

export const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
  const select = useSelectContext();
  const classNames = useGetClassNames(
    selectStyles,
    select?.itemClassNameOverride ? { item: select.itemClassNameOverride } : undefined,
    {}
  );
  const rootClassName = useRootClassName(classNames.item, className);

  return (
    <ReactAriaListBoxItem {...props} className={rootClassName}>
      {children}
    </ReactAriaListBoxItem>
  );
};

SelectItem.displayName = "DS_Select.Item";

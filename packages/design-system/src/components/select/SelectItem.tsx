"use client";

import { ListBoxItem as ReactAriaListBoxItem } from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { selectStyles } from "./Select.styles";
import { useSelectContext } from "./SelectContext";
import type { SelectItemProps } from "./Select.types";

export const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
  const select = useSelectContext();
  const parts = usePartProps("select", selectStyles,
    select?.itemClassNameOverride ? { item: select.itemClassNameOverride } : undefined,
    {}
  );
  const rootClassName = useRootClassName(parts.item.className, className);

  return (
    <ReactAriaListBoxItem {...props} {...parts.item} className={rootClassName}>
      {children}
    </ReactAriaListBoxItem>
  );
};

SelectItem.displayName = "DS_Select.Item";

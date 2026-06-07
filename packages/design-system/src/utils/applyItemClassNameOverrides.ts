import {
  Children,
  cloneElement,
  isValidElement,
  type ElementType,
  type ReactNode,
} from "react";

type ItemWithClassNameOverrides<TOverrides> = {
  itemClassNameOverrides?: TOverrides;
};

/**
 * Injects shared `itemClassNameOverrides` into direct child item components.
 * Used by compound components (e.g. RadioGroup) so group-level styling applies
 * to every item without exposing the prop on the public item API.
 */
export function applyItemClassNameOverrides<
  TOverrides,
  TItemProps extends ItemWithClassNameOverrides<TOverrides>,
>(
  children: ReactNode,
  ItemComponent: ElementType<TItemProps>,
  itemClassNameOverrides?: TOverrides
): ReactNode {
  if (!itemClassNameOverrides) return children;

  return Children.map(children, (child) => {
    if (!isValidElement<TItemProps>(child) || child.type !== ItemComponent) {
      return child;
    }

    return cloneElement(child, { itemClassNameOverrides } satisfies Partial<TItemProps>);
  });
}

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

const flattenChildren = (children: ReactNode): ReactNode[] => {
  const result: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Fragment) {
      result.push(...flattenChildren(child.props.children));
    } else {
      result.push(child);
    }
  });

  return result;
};

const hasPropsToInject = (props: Record<string, unknown>) =>
  Object.entries(props).some(([key, value]) => {
    if (value === undefined) return false;
    if (key === "hasError" && value === false) return false;
    return true;
  });

/**
 * Clones matching child components and merges shared props onto them.
 * Flattens Fragment wrappers. Used by compound components (e.g. RadioGroup)
 * to pass group-level state to items without exposing internal props publicly.
 */
export function cloneMatchingChildren<TItemProps extends Record<string, unknown>>(
  children: ReactNode,
  ItemComponent: ElementType<TItemProps>,
  propsToInject: Partial<TItemProps>,
  mergeProps?: (
    child: ReactElement<TItemProps>,
    props: Partial<TItemProps>
  ) => Partial<TItemProps>
): ReactNode {
  if (!hasPropsToInject(propsToInject)) return children;

  return flattenChildren(children).map((child) => {
    if (!isValidElement<TItemProps>(child) || child.type !== ItemComponent) {
      return child;
    }

    const merged = mergeProps?.(child, propsToInject) ?? propsToInject;
    return cloneElement(child, merged satisfies Partial<TItemProps>);
  });
}

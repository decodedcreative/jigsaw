import type { DisclosureProps as ReactAriaDisclosureProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type DisclosureProps = WithoutClassName<ReactAriaDisclosureProps> & {
  title: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

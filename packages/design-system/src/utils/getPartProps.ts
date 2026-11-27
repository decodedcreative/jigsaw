import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";
import { getClassNames } from "./getClassNames";

/**
 * The props every part of a component gets: its classes, plus `data-scope`
 * and `data-part`, so an app can target the part in CSS, tests or analytics
 * without relying on class names: `[data-scope="button"][data-part="text"]`.
 */
export type PartProps = {
  className: string;
  "data-scope": string;
  "data-part": string;
};

/**
 * Each part's props, keyed by the styles object's parts.
 *
 * `scope` is the styles export's name without `Styles`, in kebab case:
 * `buttonStyles` is `"button"` and `navigationLinkStyles` is
 * `"navigation-link"`. `data-part` comes from the styles object's keys, the
 * same names `classNameOverrides` takes, so the two can't drift apart.
 * `src/components/data-parts.test.tsx` checks both.
 *
 * Spread a part's props after the app's props, so an app can't replace the
 * component's `data-scope` and `data-part` by accident.
 *
 * Server-safe. Client components use `usePartProps`, which memoises this and
 * prefers the `ThemeProvider`'s `twMerge`.
 */
export const getPartProps = <
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  scope: string,
  styles: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  variants: Partial<Record<keyof TStyles, Record<string, unknown>>> = {},
  twMergeFn = getTwMerge(),
): Record<keyof TStyles, PartProps> => {
  const classNames = getClassNames(
    styles,
    classNameOverrides,
    variants,
    twMergeFn,
  );
  return Object.keys(styles).reduce(
    (acc, key) => {
      const part = key as keyof TStyles;
      acc[part] = {
        className: classNames[part],
        "data-scope": scope,
        "data-part": key,
      };
      return acc;
    },
    {} as Record<keyof TStyles, PartProps>,
  );
};

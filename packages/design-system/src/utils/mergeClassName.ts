import { getTwMerge, type TwMergeFn } from "../theme/config";

/**
 * Merges a component's root slot classes with a consumer `className` (JSW-118).
 *
 * RSC-safe counterpart to `useRootClassName` for presentational components:
 * no hooks or context, uses the module-level merge from `configureTwMerge` /
 * `configureTheme`. Consumer classes are applied last, so they win conflicts
 * against both CVA defaults and `classNameOverrides.component`.
 */
export function mergeClassName(
  slotClassName: string,
  className?: string,
  twMergeFn: TwMergeFn = getTwMerge()
): string {
  return className ? twMergeFn(slotClassName, className) : slotClassName;
}

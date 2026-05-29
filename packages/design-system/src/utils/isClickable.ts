type ClickableInput = {
  as?: string;
  onClick?: unknown;
  href?: unknown;
};

/**
 * Whether a polymorphic element is interactive, for styling intent
 * (hover/focus/cursor). An element is considered clickable when it has an
 * `onClick` handler, or when it is an anchor (`as="a"`) with an `href`.
 */
export const isClickable = ({ as, onClick, href }: ClickableInput): boolean =>
  typeof onClick === "function" || (as === "a" && Boolean(href));

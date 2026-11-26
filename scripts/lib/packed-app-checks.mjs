/**
 * Pure helpers for scripts/test-packed.mjs, kept separate so they can be
 * unit tested without building an app.
 */

/**
 * The page routes in a Next.js app-router build, from
 * `.next/app-path-routes-manifest.json`. Leaves out route handlers, Next's
 * own pages such as `/_not-found`, and dynamic routes, which need a value
 * to open.
 *
 * @param {Record<string, string>} manifest  Maps `/(app)/team/page` to `/team`.
 */
export function pageRoutes(manifest) {
  return Object.entries(manifest)
    .filter(([entry]) => entry.endsWith("/page"))
    .map(([, route]) => route)
    .filter(
      (route) =>
        !route
          .split("/")
          .some((segment) => segment.startsWith("_") || segment.includes("[")),
    )
    .sort();
}

/**
 * Classes that only mark an element for other selectors, or that a library
 * adds for its own use, so they're expected to have no rule of their own.
 */
const MARKER_CLASS =
  /^(group|peer)(\/.+)?$|^react-aria-|^__next|^dark$|^light$/;

/** Turns a CSS-escaped class name back into the class, such as `hover\:bg-x` into `hover:bg-x`. */
export function unescapeCssIdentifier(identifier) {
  return identifier
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/\\(.)/g, "$1");
}

/** Every class name a list of selectors mentions. */
export function classesInSelectors(selectorTexts) {
  const classes = new Set();
  const pattern = /\.((?:\\[0-9a-fA-F]{1,6}\s?|\\.|[\w-])+)/g;
  for (const selector of selectorTexts) {
    for (const match of selector.matchAll(pattern))
      classes.add(unescapeCssIdentifier(match[1]));
  }
  return classes;
}

/**
 * The classes used on the page that no CSS rule mentions. A Jigsaw class
 * missing from the app's CSS usually means Tailwind didn't scan the
 * package's files, because `tailwind.css` points at a folder the package
 * doesn't publish.
 *
 * @param {string[]} classes  Every class on the page.
 * @param {string[]} selectorTexts  Every selector in the page's stylesheets.
 */
export function classesWithoutCss(classes, selectorTexts) {
  const styled = classesInSelectors(selectorTexts);
  return classes
    .filter((name) => !styled.has(name) && !MARKER_CLASS.test(name))
    .sort();
}

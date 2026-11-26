/**
 * Helpers for story play functions (JSW-129).
 *
 * Keyboard checks go on the stories people browse when they leave the story
 * looking as it did when it opened (focus, open and close, toggle twice).
 * Checks that leave a visible result, such as typing or submitting a form,
 * go on a hidden test story instead, so opening a story never shows the
 * result of a test.
 */

/**
 * Parameters for a test-only story. Chromatic skips it: the visible stories
 * already cover how it looks.
 *
 * Also give the story `tags: ["!dev", "!autodocs"]`, written out in the story.
 * `!dev` hides it from the sidebar and `!autodocs` from the docs page, and the
 * story test runner still runs it. Storybook reads tags statically, so they
 * can't come from a shared constant.
 */
export const TEST_ONLY_PARAMETERS = { chromatic: { disableSnapshot: true } };

/**
 * Blur the focused element at the end of a play function on a browsed story,
 * so the story (and its Chromatic snapshot) doesn't open with a focus ring.
 */
export function clearFocus() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
}

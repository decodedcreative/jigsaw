/**
 * Intentional inline-SVG exceptions for the Adopt Icon epic (JSW-38 / JSW-43).
 *
 * These are not Phosphor icon glyphs — they are structural chrome or third-party
 * brand marks that must not go through the design-system `Icon` wrapper.
 *
 * Reference list for inline SVGs not yet routed through `Icon`. See `@see` in source files.
 */

/** Design-system component paths (structural SVG, not icon glyphs). */
export const DESIGN_SYSTEM_ICON_SVG_EXCEPTIONS = [
  "packages/design-system/src/components/checkbox/Checkbox.tsx",
  "packages/design-system/src/components/disclosure/Disclosure.tsx",
  "packages/design-system/src/components/tooltip/Tooltip.tsx",
] as const;

/** Storybook example paths (OAuth / trademark SVGs). */
export const STORYBOOK_ICON_SVG_EXCEPTIONS = [
  "apps/storybook/stories/examples/sign-in/components/GoogleIcon.tsx",
  "apps/storybook/stories/examples/sign-in/components/GitHubIcon.tsx",
] as const;

/** Web app paths (OAuth / trademark SVGs). */
export const WEB_ICON_SVG_EXCEPTIONS = [
  "apps/web/src/components/oauth/GoogleIcon.tsx",
  "apps/web/src/components/oauth/GitHubIcon.tsx",
] as const;

export const ICON_SVG_EXCEPTIONS = [
  ...DESIGN_SYSTEM_ICON_SVG_EXCEPTIONS,
  ...STORYBOOK_ICON_SVG_EXCEPTIONS,
  ...WEB_ICON_SVG_EXCEPTIONS,
] as const;

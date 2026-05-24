import { cva } from "class-variance-authority";

/** Named body-text presets — prefer these over composing Text props. */
export const textPresetStyles = {
  /** Page / section subtitle beneath a heading. */
  subheading: cva(["text-sm text-foreground-secondary"]),
  /** Standalone UI message — empty states, confirmations. */
  notice: cva(["text-base font-medium text-foreground-primary"]),
  /** Primary line on list/card rows (names, action titles). */
  title: cva(["text-sm font-medium text-foreground-primary"]),
  /** Supporting detail — emails, descriptions, pref helper copy. */
  caption: cva(["text-xs text-foreground-secondary"]),
  /** Tertiary supplementary text — timestamps, counts. */
  detail: cva(["text-xs text-foreground-muted"]),
  /** Label for a grouped block of content — e.g. date headers in a list. */
  sectionLabel: cva(["text-xs font-semibold uppercase tracking-wider text-foreground-muted"]),
  /** Large numeric / metric display. */
  stat: cva(["font-sans text-2xl font-bold text-foreground-primary"]),
};

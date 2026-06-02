import type { ComponentSection, SectionLink } from "./Introduction.stories.types";

// ---------------------------------------------------------------------------
// Story ID helpers
// ---------------------------------------------------------------------------
export function docsPath(title: string) {
  const id = title.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-");
  return `/?path=/docs/${id}--docs`;
}

export function storyPath(title: string, story = "default") {
  const id = title.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-");
  return `/?path=/story/${id}--${story}`;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
export const tokenSections: SectionLink[] = [
  {
    title: "Color Palette",
    description: "Base palette — all named colours across the navy, orange, and grey scales.",
    href: docsPath("Design Tokens/Color Palette"),
    icon: "🎨",
  },
  {
    title: "Semantic Colors",
    description: "Intent-based tokens: surface, text, border, interactive, feedback, and more.",
    href: docsPath("Design Tokens/Semantic Colors"),
    icon: "🪄",
  },
  {
    title: "Typography",
    description: "Font families, sizes, weights, and line-height scale.",
    href: docsPath("Design Tokens/Typography"),
    icon: "Aa",
  },
  {
    title: "Spacing",
    description: "Consistent spacing scale used for padding, margin, and gap utilities.",
    href: docsPath("Design Tokens/Spacing"),
    icon: "⬜",
  },
  {
    title: "Border Radius",
    description: "Corner-radius tokens from sharp to pill-shaped.",
    href: docsPath("Design Tokens/Border Radius"),
    icon: "▢",
  },
  {
    title: "Shadows",
    description: "Elevation scale from flush to floating.",
    href: docsPath("Design Tokens/Shadows"),
    icon: "🌑",
  },
];

export const exampleSections: SectionLink[] = [
  {
    title: "Sign In",
    description: "Email/password form with OAuth buttons, remember-me, and a success state.",
    href: storyPath("Examples/Sign In"),
    icon: "🔐",
  },
  {
    title: "Account Settings",
    description: "Tabbed settings page covering profile, notifications, appearance, and danger zone.",
    href: storyPath("Examples/Account Settings"),
    icon: "⚙️",
  },
  {
    title: "Team Directory",
    description: "Searchable member grid with role badges, status indicators, and modal actions.",
    href: storyPath("Examples/Team Directory"),
    icon: "👥",
  },
  {
    title: "Notifications",
    description: "Toast trigger panel, a live notification feed, and a Disclosure FAQ.",
    href: storyPath("Examples/Notifications"),
    icon: "🔔",
  },
];

export const componentSections: ComponentSection[] = [
  { title: "Avatar", description: "User identity display with initials, optional image, and status." },
  { title: "Badge", description: "Small label for status, counts, or categories." },
  { title: "Button", description: "Primary action trigger with multiple variants and sizes." },
  { title: "Card", description: "Surface container for grouped content." },
  { title: "Checkbox", description: "Boolean toggle with indeterminate state support." },
  { title: "CheckboxGroup", description: "Accessible group of related checkboxes." },
  { title: "Disclosure", description: "Collapsible panel with animated open/close." },
  { title: "Form", description: "Layout and validation wrapper for form fields." },
  { title: "Input", description: "Single-line text entry with label and error state." },
  { title: "Link", description: "Navigational anchor with consistent styling." },
  { title: "Modal", description: "Focused dialog overlay for important actions." },
  { title: "Navigation", description: "App-level nav with active-route highlighting." },
  { title: "NumberField", description: "Numeric input with increment/decrement controls." },
  { title: "RadioGroup", description: "Exclusive selection from a set of options." },
  { title: "SearchField", description: "Search input with clear button." },
  { title: "Select", description: "Accessible dropdown for picking one option." },
  { title: "Skeleton", description: "Placeholder shimmer for loading states." },
  { title: "Tabs", description: "Horizontal tab bar for switching between panels." },
  { title: "Text", description: "Typographic primitive with semantic variants." },
  { title: "Textarea", description: "Multi-line text entry with auto-resize option." },
  { title: "Toast", description: "Transient notification that auto-dismisses." },
  { title: "Tooltip", description: "Contextual label that appears on hover or focus." },
];

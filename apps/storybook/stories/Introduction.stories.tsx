import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  Disclosure,
  Input,
  Link,
  NumberField,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  SelectItem,
  Skeleton,
  SkeletonText,
  Tab,
  TabList,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  TooltipTrigger,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Story ID helpers
// ---------------------------------------------------------------------------
function docsPath(title: string) {
  const id = title.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-");
  return `/?path=/docs/${id}--docs`;
}

function storyPath(title: string, story = "default") {
  const id = title.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-");
  return `/?path=/story/${id}--${story}`;
}

// ---------------------------------------------------------------------------
// Component preview widgets — small, pointer-events-none snapshots
// ---------------------------------------------------------------------------
function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center bg-surface-muted rounded-md h-20 overflow-hidden pointer-events-none select-none px-3"
      aria-hidden
    >
      <div className="flex items-center justify-center gap-2 scale-90 origin-center w-full">
        {children}
      </div>
    </div>
  );
}

const previews: Record<string, React.ReactNode> = {
  Avatar: (
    <Preview>
      <Avatar size="md">
        <AvatarFallback>JH</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size="xs">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    </Preview>
  ),

  Badge: (
    <Preview>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
    </Preview>
  ),

  Button: (
    <Preview>
      <Button size="sm">Primary</Button>
      <Button variant="secondary" size="sm">Secondary</Button>
    </Preview>
  ),

  Card: (
    <Preview>
      <Card className="w-36 !p-3">
        <CardTitle className="text-xs">Card title</CardTitle>
        <CardContent className="!p-0 mt-1">
          <p className="text-[10px] text-text-secondary leading-tight">
            A short description.
          </p>
        </CardContent>
      </Card>
    </Preview>
  ),

  Checkbox: (
    <Preview>
      <div className="flex flex-col gap-1.5">
        <Checkbox defaultSelected>Checked</Checkbox>
        <Checkbox>Unchecked</Checkbox>
      </div>
    </Preview>
  ),

  CheckboxGroup: (
    <Preview>
      <div className="flex flex-col gap-1.5">
        <Checkbox defaultSelected>Option A</Checkbox>
        <Checkbox defaultSelected>Option B</Checkbox>
        <Checkbox>Option C</Checkbox>
      </div>
    </Preview>
  ),

  Disclosure: (
    <Preview>
      <Disclosure defaultExpanded className="w-40" title="FAQ item">
        <p className="text-[10px] text-text-secondary">Answer content goes here.</p>
      </Disclosure>
    </Preview>
  ),

  Form: (
    <Preview>
      <div className="flex flex-col gap-1.5 w-36">
        <div className="h-4 w-16 rounded bg-border-default" />
        <div className="h-6 w-full rounded border border-border-default bg-surface-default" />
        <div className="h-5 w-20 rounded bg-interactive-accent" />
      </div>
    </Preview>
  ),

  Input: (
    <Preview>
      <div className="w-36 scale-90">
        <Input label="Email" placeholder="you@example.com" />
      </div>
    </Preview>
  ),

  Link: (
    <Preview>
      <Link href="#">Learn more →</Link>
    </Preview>
  ),

  Modal: (
    <Preview>
      <div className="w-36 border border-border-default rounded-lg bg-surface-default shadow-lg p-3">
        <p className="text-[10px] font-semibold text-text-primary mb-1">Dialog title</p>
        <p className="text-[9px] text-text-secondary leading-tight mb-2">Are you sure you want to continue?</p>
        <div className="flex gap-1 justify-end">
          <div className="h-4 w-10 rounded bg-border-default" />
          <div className="h-4 w-10 rounded bg-interactive-accent" />
        </div>
      </div>
    </Preview>
  ),

  Navigation: (
    <Preview>
      <div className="w-40 h-7 bg-navy-900 rounded-md flex items-center justify-between px-2">
        <span className="text-[9px] font-bold text-white">Jigsaw</span>
        <div className="flex gap-2">
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
          <div className="h-1.5 w-6 rounded-full bg-orange-400" />
        </div>
      </div>
    </Preview>
  ),

  NumberField: (
    <Preview>
      <div className="w-28 scale-90">
        <NumberField label="Qty" defaultValue={3} />
      </div>
    </Preview>
  ),

  RadioGroup: (
    <Preview>
      <RadioGroup label="Plan" defaultValue="pro">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>
    </Preview>
  ),

  SearchField: (
    <Preview>
      <div className="w-36 scale-90">
        <SearchField label="Search" placeholder="Search…" />
      </div>
    </Preview>
  ),

  Select: (
    <Preview>
      <div className="w-32 scale-90">
        <Select label="Role" placeholder="Pick one">
          <SelectItem id="admin">Admin</SelectItem>
          <SelectItem id="editor">Editor</SelectItem>
        </Select>
      </div>
    </Preview>
  ),

  Skeleton: (
    <Preview>
      <div className="flex flex-col gap-1.5 w-32">
        <Skeleton height={10} width="100%" />
        <SkeletonText width="80%" />
        <SkeletonText width="60%" />
      </div>
    </Preview>
  ),

  Tabs: (
    <Preview>
      <Tabs className="w-40">
        <TabList>
          <Tab id="a">Overview</Tab>
          <Tab id="b">Details</Tab>
        </TabList>
      </Tabs>
    </Preview>
  ),

  Text: (
    <Preview>
      <div className="flex flex-col items-start gap-0.5">
        <Text variant="heading-sm">Heading</Text>
        <Text variant="body-sm" className="text-text-secondary">Body text</Text>
        <Text variant="caption">Caption</Text>
      </div>
    </Preview>
  ),

  Textarea: (
    <Preview>
      <div className="w-36 scale-90">
        <Textarea label="Notes" placeholder="Write something…" rows={2} />
      </div>
    </Preview>
  ),

  Toast: (
    <Preview>
      <div className="flex flex-col gap-1.5 w-36">
        <div className="flex items-start gap-1.5 bg-feedback-success-subtle border border-feedback-success rounded-md p-2">
          <div className="w-2 h-2 mt-0.5 rounded-full bg-feedback-success shrink-0" />
          <div>
            <p className="text-[9px] font-semibold text-text-primary">Saved!</p>
            <p className="text-[8px] text-text-secondary">Your changes were saved.</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 bg-feedback-error-subtle border border-feedback-error rounded-md p-2">
          <div className="w-2 h-2 mt-0.5 rounded-full bg-feedback-error shrink-0" />
          <div>
            <p className="text-[9px] font-semibold text-text-primary">Error</p>
            <p className="text-[8px] text-text-secondary">Something went wrong.</p>
          </div>
        </div>
      </div>
    </Preview>
  ),

  Tooltip: (
    <Preview>
      <TooltipTrigger defaultOpen delay={0}>
        <Button size="sm" variant="secondary">Hover me</Button>
        <Tooltip>Helpful context</Tooltip>
      </TooltipTrigger>
    </Preview>
  ),
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const tokenSections = [
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

const exampleSections = [
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

const componentSections: { title: string; description: string }[] = [
  { title: "Avatar", description: "User identity display with image or initials fallback." },
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

// ---------------------------------------------------------------------------
// Card components
// ---------------------------------------------------------------------------
function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {children}
    </div>
  );
}

function TokenCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon?: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-1 p-4 rounded-lg border border-border-default bg-surface-default hover:border-interactive-accent hover:shadow-md transition-all duration-150 no-underline"
    >
      {icon && (
        <span className="text-2xl mb-1 leading-none" aria-hidden>
          {icon}
        </span>
      )}
      <span className="text-sm font-semibold text-text-primary group-hover:text-interactive-accent transition-colors">
        {title}
      </span>
      <span className="text-xs text-text-secondary leading-relaxed">{description}</span>
    </a>
  );
}

function ComponentCard({
  href,
  title,
  description,
  preview,
}: {
  href: string;
  title: string;
  description: string;
  preview?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-lg border border-border-default bg-surface-default hover:border-interactive-accent hover:shadow-md transition-all duration-150 no-underline overflow-hidden"
    >
      {/* Preview area */}
      {preview ?? (
        <div className="flex items-center justify-center bg-surface-muted h-20" aria-hidden />
      )}
      {/* Label */}
      <div className="px-4 py-3 border-t border-border-subtle">
        <span className="text-sm font-semibold text-text-primary group-hover:text-interactive-accent transition-colors block">
          {title}
        </span>
        <span className="text-xs text-text-secondary leading-relaxed">{description}</span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function WelcomeContent() {
  return (
    <div data-theme="dark" className="font-sans text-text-primary bg-surface-default min-h-screen p-8 md:p-12">
      {/* Hero */}
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 bg-surface-muted text-text-secondary text-xs font-mono px-3 py-1 rounded-full mb-4">
          @jigsaw/design-system
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-3">Jigsaw</h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          The design system and component library for this monorepo. Built on a two-layer token
          architecture — a base colour palette and semantic intent tokens — with accessible
          components powered by React Aria.
        </p>
      </div>

      {/* Tokens */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-1">Design Tokens</h2>
        <p className="text-sm text-text-secondary max-w-2xl">
          Tokens are the single source of truth for colour, spacing, typography, and elevation.
          Generated from{" "}
          <code className="font-mono text-xs bg-surface-muted px-1 py-0.5 rounded">
            packages/tokens
          </code>{" "}
          via Style Dictionary and consumed by Tailwind and CSS variables.
        </p>
        <CardGrid>
          {tokenSections.map((t) => (
            <TokenCard key={t.title} href={t.href} icon={t.icon} title={t.title} description={t.description} />
          ))}
        </CardGrid>
      </section>

      {/* Components */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-1">Components</h2>
        <p className="text-sm text-text-secondary max-w-2xl">
          {componentSections.length} production-ready components. Each story documents variants,
          states, accessibility props, and Tailwind integration.
        </p>
        <CardGrid>
          {componentSections.map((c) => (
            <ComponentCard
              key={c.title}
              href={docsPath(`Design System/${c.title}`)}
              title={c.title}
              description={c.description}
              preview={previews[c.title]}
            />
          ))}
        </CardGrid>
      </section>

      {/* Examples */}
      <section className="max-w-5xl mb-12">
        <h2 className="text-xl font-semibold text-text-primary mb-1">Examples</h2>
        <p className="text-sm text-text-secondary max-w-2xl">
          Full-page compositions showing how components work together in realistic product scenarios.
        </p>
        <CardGrid>
          {exampleSections.map((e) => (
            <TokenCard key={e.title} href={e.href} icon={e.icon} title={e.title} description={e.description} />
          ))}
        </CardGrid>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl border-t border-border-subtle pt-6 text-xs text-text-muted">
        <p>
          Tokens and components are versioned together in the monorepo under{" "}
          <code className="font-mono">packages/tokens</code> and{" "}
          <code className="font-mono">packages/design-system</code>.
        </p>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------
const meta = {
  title: "Introduction/Welcome",
  parameters: {
    layout: "fullscreen",
    docs: { disable: true },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => <WelcomeContent />,
};

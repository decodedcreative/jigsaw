import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

/**
 * Custom SVG when Phosphor cannot represent the glyph (e.g. brand marks).
 * Pass paths as `children`, set `viewBox`, and assign fills with `--icon-fill-*` on `style`
 * plus `data-fill` on each path.
 */
const meta: Meta<typeof Icon> = {
  title: "Design System/Icon/Custom SVG",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Use **duotone** (\`primary\` + \`secondary\`) for two fills, or **multipath** (up to four slots) for brand-style icons.

\`\`\`tsx
<Icon
  viewBox="0 0 24 24"
  style={{ "--icon-fill-primary": "#2563eb", "--icon-fill-secondary": "#93c5fd" }}
>
  <path data-fill="secondary" d="…" />
  <path data-fill="primary" d="…" />
</Icon>
\`\`\`

Paths without \`data-fill\` inherit \`currentColor\` from \`tone\` on the parent or svg.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/** Two fills — `primary` and `secondary` slots. */
export const Duotone: Story = {
  render: () => (
    <Icon
      size="xl"
      viewBox="0 0 32 32"
      style={{
        "--icon-fill-primary": "#2563eb",
        "--icon-fill-secondary": "#93c5fd",
      }}
      aria-hidden
    >
      <path data-fill="secondary" d="M4 4h24v24H4z" />
      <path
        data-fill="primary"
        d="M16 6l3 9h9l-7.5 5.5 3 9L16 24l-7.5 5.5 3-9L4 15h9z"
      />
    </Icon>
  ),
};

/** Three or more fills — e.g. brand marks with fixed palette slots. */
export const Multipath: Story = {
  render: () => (
    <Icon
      size="lg"
      viewBox="0 0 24 24"
      style={{
        "--icon-fill-primary": "#4285F4",
        "--icon-fill-secondary": "#34A853",
        "--icon-fill-tertiary": "#FBBC05",
        "--icon-fill-quaternary": "#EA4335",
      }}
      aria-hidden
    >
      <path
        data-fill="primary"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        data-fill="secondary"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        data-fill="tertiary"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        data-fill="quaternary"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </Icon>
  ),
};

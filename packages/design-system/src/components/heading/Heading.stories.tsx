import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { H1, H2, H3 } from "./Heading.aliases";
import { Heading } from "./Heading";

const meta = {
  title: "Design System/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    muted: { control: "boolean" },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    as: "h2",
    children: "Section heading",
  },
};

export const PageTitle: Story = {
  args: {
    as: "h1",
    children: "Page title",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading as="h1">Heading level 1 (h1)</Heading>
      <Heading as="h2">Heading level 2 (h2)</Heading>
      <Heading as="h3">Heading level 3 (h3)</Heading>
      <Heading as="h4">Heading level 4 (h4)</Heading>
      <Heading as="h5">Heading level 5 (h5)</Heading>
      <Heading as="h6">Heading level 6 (h6)</Heading>
    </div>
  ),
};

/** Semantic level and visual size can diverge for accessible document outline. */
export const SemanticVsVisual: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Heading as="h1">Page title (h1)</Heading>
      <Heading as="h2" size="h3" muted>
        Supporting line styled smaller (h2 semantics, h3 appearance)
      </Heading>
      <Heading as="h3" size="h2">
        Prominent card title (h3 semantics, h2 appearance)
      </Heading>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    as: "h3",
    muted: true,
    children: "Muted subsection heading",
  },
};

export const Aliases: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <H1>Page title (H1)</H1>
      <H2>Section title (H2)</H2>
      <H3 size="h2">Prominent card title (H3 semantics, h2 appearance)</H3>
    </div>
  ),
};

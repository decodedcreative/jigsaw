import type { Meta, StoryObj } from "@storybook/react";
import { getClassNames } from "@utils";
import { Form } from "./index";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { formStoryStyles, sideLabelInputStoryStyles } from "./Form.stories.styles";

const meta = {
  title: "Design System/Form",
  component: Form,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const sideLabelInputClassNameOverrides = getClassNames(sideLabelInputStoryStyles);

/**
 * - **Form.Group** — titled section for stacking related fields (layout only).
 * - **CheckboxGroup / RadioGroup** — use their own `label` when the section is a single field group; skip Form.Group.
 */
export const Default: Story = {
  render: () => {
    const classNames = getClassNames(formStoryStyles, {}, { canvas: { width: "default" } });

    return (
      <div className={classNames.canvas}>
        <Form>
          <Form.Group title="Account details">
            <Input label="Name" />
            <Input label="Email" type="email" />
          </Form.Group>
          <div className={classNames.footer}>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </div>
    );
  },
};

/**
 * Labels beside controls (fixed label column). Same `label` prop on each field;
 * layout is CSS grid on Input until `labelPosition="side"` (or Form context) ships.
 */
export const InlineLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Prototype for horizontal form labels. Each field still owns its label via the `label` prop; alignment uses shared `classNameOverrides` on Input. Select and other controls would need the same grid treatment or a built-in layout variant.",
      },
    },
  },
  render: () => {
    const classNames = getClassNames(formStoryStyles, {}, { canvas: { width: "wide" } });

    return (
      <div className={classNames.canvas}>
        <Form>
          <Form.Group title="Account details">
            <Input
              label="Name"
              defaultValue="James Howell"
              classNameOverrides={sideLabelInputClassNameOverrides}
            />
            <Input
              label="Email"
              type="email"
              defaultValue="james@example.com"
              classNameOverrides={sideLabelInputClassNameOverrides}
            />
            <Input
              label="Phone"
              type="tel"
              description="Optional. Include country code."
              classNameOverrides={sideLabelInputClassNameOverrides}
            />
            <Input
              label="Username"
              defaultValue="j"
              errorMessage="Username must be at least 3 characters."
              classNameOverrides={sideLabelInputClassNameOverrides}
            />
          </Form.Group>
          <div className={classNames.footer}>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </div>
    );
  },
};

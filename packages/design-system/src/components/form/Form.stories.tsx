import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./index";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Form",
  component: Form,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/** App-layer footer layout (see Account Settings `FormFooter` example). */
const formFooterClassName =
  "flex items-center gap-3 mt-6 pt-6 border-t border-border-default";

/**
 * - **Form.Group** — titled section for stacking related fields (layout only).
 * - **CheckboxGroup / RadioGroup** — use their own `label` when the section is a single field group; skip Form.Group.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Form>
        <Form.Group title="Account details">
          <Input label="Name" />
          <Input label="Email" type="email" />
        </Form.Group>
        <div className={formFooterClassName}>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  ),
};

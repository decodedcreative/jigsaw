import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormGroup } from "./index";
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

/** Example footer layout — use Tailwind at the app layer; ButtonGroup may replace this later. */
const formFooterClassName =
  "flex items-center gap-3 mt-6 pt-6 border-t border-border-default";

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Form>
        <FormGroup title="Account details">
          <Input label="Name" />
          <Input label="Email" type="email" />
        </FormGroup>
        <div className={formFooterClassName}>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  ),
};

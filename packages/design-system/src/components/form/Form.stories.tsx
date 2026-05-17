import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormFieldset, FormActions } from "./Form";
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

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Form>
        <FormFieldset legend="Account details">
          <Input label="Name" />
          <Input label="Email" type="email" />
        </FormFieldset>
        <FormActions>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Save</Button>
        </FormActions>
      </Form>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormFieldset } from "./index";
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
        <FormFieldset label="Account details">
          <Input label="Name" />
          <Input label="Email" type="email" />
        </FormFieldset>
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
          <Button>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </Form>
    </div>
  ),
};

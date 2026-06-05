import type { Meta, StoryObj } from "@storybook/react";
import { getClassNames } from "@utils";
import { Form } from "./index";
import { Input } from "../input/Input";
import { Select, SelectItem } from "../select/Select";
import { Button } from "../button/Button";
import { formStoryStyles } from "./Form.stories.styles";

const meta = {
  title: "Design System/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "`Form` wraps React Aria's form primitive for submission and validation.",
          "",
          'Set `labelPosition="side"` on `Form` to left-align labels for labelled fields (`Input`, `Select`, etc.) inside the form.',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const SideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Form-level `labelPosition="side"` left-aligns labels in a fixed column. Fields still own their labels via the `label` prop.',
      },
    },
  },
  render: () => {
    const classNames = getClassNames(formStoryStyles, {}, { canvas: { width: "wide" } });

    return (
      <div className={classNames.canvas}>
        <Form labelPosition="side">
          <Form.Group title="Account details">
            <Input label="Name" defaultValue="James Howell" />
            <Input label="Email" type="email" defaultValue="james@example.com" />
            <Input label="Phone" type="tel" description="Optional. Include country code." />
            <Input
              label="Username"
              defaultValue="j"
              errorMessage="Username must be at least 3 characters."
            />
            <Select label="Role" defaultSelectedKey="editor">
              <SelectItem id="viewer">Viewer</SelectItem>
              <SelectItem id="editor">Editor</SelectItem>
              <SelectItem id="admin">Admin</SelectItem>
            </Select>
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
